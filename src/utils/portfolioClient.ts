import {DEFAULT_PORTFOLIO_CONFIG} from '../data/defaultPortfolio';
import type {InquiryFormInput, InquiryRecord, PortfolioConfig} from '../types/portfolio';

const PORTFOLIO_STORAGE_KEY = 'behram_portfolio_config_v1';
const INQUIRIES_STORAGE_KEY = 'behram_portfolio_inquiries_v1';

function mergePortfolioWithDefaults(partial: Partial<PortfolioConfig>): PortfolioConfig {
  return {
    ...DEFAULT_PORTFOLIO_CONFIG,
    ...partial,
    contact: {
      ...DEFAULT_PORTFOLIO_CONFIG.contact,
      ...(partial.contact || {}),
    },
  };
}

function readLocalPortfolio(): PortfolioConfig | null {
  try {
    const raw = window.localStorage.getItem(PORTFOLIO_STORAGE_KEY);
    if (!raw) return null;
    return mergePortfolioWithDefaults(JSON.parse(raw) as Partial<PortfolioConfig>);
  } catch {
    return null;
  }
}

function writeLocalPortfolio(config: PortfolioConfig | null): void {
  try {
    if (!config) {
      window.localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
    } else {
      window.localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(config));
    }
  } catch {
    // Ignore storage quota errors
  }
}

function readLocalInquiries(): InquiryRecord[] {
  try {
    const raw = window.localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalInquiries(records: InquiryRecord[]): void {
  try {
    window.localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(records.slice(0, 100)));
  } catch {
    // Ignore storage quota errors
  }
}

async function tryJsonFetch(input: RequestInfo, init?: RequestInit): Promise<Response | null> {
  try {
    const res = await fetch(input, init);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return null;
    }
    return res;
  } catch {
    return null;
  }
}

export async function loadPortfolioConfig(): Promise<PortfolioConfig> {
  const res = await tryJsonFetch('./api/portfolio');
  if (res && res.ok) {
    const data = await res.json();
    if (data?.portfolio) {
      return mergePortfolioWithDefaults(data.portfolio);
    }
    return DEFAULT_PORTFOLIO_CONFIG;
  }
  return readLocalPortfolio() || DEFAULT_PORTFOLIO_CONFIG;
}

export async function savePortfolioConfig(next: PortfolioConfig): Promise<boolean> {
  writeLocalPortfolio(next);
  const res = await tryJsonFetch('./api/portfolio', {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(next),
  });
  if (res) {
    return res.ok;
  }
  // Static hosting (GitHub Pages / Vercel Vite) persists cleanly to localStorage
  return true;
}

export async function resetPortfolioConfig(): Promise<void> {
  writeLocalPortfolio(null);
  await tryJsonFetch('./api/portfolio/reset', {method: 'POST'});
}

export async function listInquiries(): Promise<InquiryRecord[]> {
  const res = await tryJsonFetch('./api/inquiries');
  if (res && res.ok) {
    const data = await res.json();
    return Array.isArray(data.inquiries) ? data.inquiries : [];
  }
  return readLocalInquiries();
}

export async function deleteInquiry(id: string): Promise<InquiryRecord[]> {
  const res = await tryJsonFetch(`./api/inquiries/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  });
  if (res && res.ok) {
    const data = await res.json();
    return Array.isArray(data.inquiries) ? data.inquiries : [];
  }
  const next = readLocalInquiries().filter((item) => item.id !== id);
  writeLocalInquiries(next);
  return next;
}

export interface SubmitInquiryResult {
  ok: boolean;
  mode: 'server' | 'static';
  inquiry?: InquiryRecord;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitInquiry(form: InquiryFormInput): Promise<SubmitInquiryResult> {
  const res = await tryJsonFetch('./api/inquiries', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(form),
  });

  if (res) {
    const payload = await res.json();
    if (!res.ok) {
      return {
        ok: false,
        mode: 'server',
        error: payload?.error || 'Unable to submit inquiry. Please try again.',
        fieldErrors: payload?.fieldErrors,
      };
    }
    return {
      ok: true,
      mode: 'server',
      inquiry: payload.inquiry,
    };
  }

  // Static hosting fallback (GitHub Pages / Vercel Vite static build)
  const record: InquiryRecord = {
    id: `inq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    companyName: form.companyName.trim() || 'Not specified',
    serviceRequired: form.serviceRequired.trim(),
    projectBudget: form.projectBudget.trim() || 'Not specified',
    projectDetails: form.projectDetails.trim(),
    submittedAt: new Date().toISOString(),
  };

  const existing = readLocalInquiries();
  writeLocalInquiries([record, ...existing]);

  return {
    ok: true,
    mode: 'static',
    inquiry: record,
  };
}
