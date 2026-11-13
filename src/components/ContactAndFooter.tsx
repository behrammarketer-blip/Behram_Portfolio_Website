import {useEffect, useState} from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Edit3,
  Github,
  Linkedin,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Share2,
} from 'lucide-react';
import {SERVICES_LIST} from '../data/defaultPortfolio';
import type {InquiryFormInput, InquiryRecord, PortfolioConfig} from '../types/portfolio';

interface ContactAndFooterProps {
  config: PortfolioConfig;
  preselectedService: string;
  onNavigate: (sectionId: string) => void;
  onOpenEditor: (tab: 'contact' | 'experience' | 'projects' | 'inquiries') => void;
}

function isPlaceholderValue(val: string): boolean {
  const trimmed = val.trim();
  return !trimmed || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}

function formatWhatsAppUrl(raw: string, message: string): string | null {
  if (isPlaceholderValue(raw)) return null;
  let digits = raw.replace(/[^\d]/g, '');
  if (digits.length < 7) return null;
  // Convert Pakistani local mobile format (03XXXXXXXXX) to international 923XXXXXXXXX
  if (digits.length === 11 && digits.startsWith('03')) {
    digits = `92${digits.slice(1)}`;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function normalizeExternalUrl(raw: string): string | null {
  if (isPlaceholderValue(raw)) return null;
  const trimmed = raw.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export function ContactAndFooter({
  config,
  preselectedService,
  onNavigate,
  onOpenEditor,
}: ContactAndFooterProps) {
  const [form, setForm] = useState<InquiryFormInput>({
    fullName: '',
    email: '',
    companyName: '',
    serviceRequired: preselectedService || SERVICES_LIST[0].title,
    projectBudget: '',
    projectDetails: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<InquiryRecord | null>(null);

  useEffect(() => {
    if (preselectedService) {
      setForm((prev) => ({...prev, serviceRequired: preselectedService}));
    }
  }, [preselectedService]);

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (form.fullName.trim().length < 2) {
      errors.fullName = 'Please enter your full name.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!form.serviceRequired.trim()) {
      errors.serviceRequired = 'Please choose a service.';
    }
    if (form.projectDetails.trim().length < 15) {
      errors.projectDetails = 'Please describe your project goals (at least 15 characters).';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');

    const errors = validateClient();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus('error');
      return;
    }

    setFieldErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(form),
      });

      const payload = await response.json();
      if (!response.ok) {
        if (payload?.fieldErrors) {
          setFieldErrors(payload.fieldErrors);
        }
        setServerError(payload?.error || 'Unable to submit inquiry. Please try again.');
        setStatus('error');
        return;
      }

      setSubmittedRecord(payload.inquiry);
      setStatus('success');
      setForm({
        fullName: '',
        email: '',
        companyName: '',
        serviceRequired: SERVICES_LIST[0].title,
        projectBudget: '',
        projectDetails: '',
      });
    } catch {
      setServerError('Network error while contacting the server. Please try again.');
      setStatus('error');
    }
  };

  const whatsappUrl = formatWhatsAppUrl(
    config.contact.whatsapp,
    `Hello Behram, I'd like to discuss ${form.serviceRequired || 'digital marketing services'}.`,
  );
  const linkedinUrl = normalizeExternalUrl(config.contact.linkedin);
  const githubUrl = normalizeExternalUrl(config.contact.github);
  const facebookUrl = normalizeExternalUrl(config.contact.facebook);
  const instagramUrl = normalizeExternalUrl(config.contact.instagram);

  return (
    <>
      {/* PAGE 9: CONTACT */}
      <section
        id="contact"
        className="border-t border-slate-200 bg-[#F8FAFC] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Direct Details & WhatsApp Integration */}
            <div className="lg:col-span-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                Start a Conversation
              </p>
              <h2
                className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
                style={{textWrap: 'balance'}}
              >
                Let&apos;s Build Something That Grows.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[#475569]">
                Have a business that needs a stronger digital presence? Looking for a dedicated digital marketing professional? Let&apos;s connect and explore how we can work together.
              </p>

              <div className="mt-8 space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="font-display text-sm font-semibold text-[#0F172A]">
                    Direct Contact Details
                  </h3>
                  <button
                    type="button"
                    onClick={() => onOpenEditor('contact')}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8]"
                  >
                    <Edit3 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Edit</span>
                  </button>
                </div>

                <div className="space-y-3.5 text-sm">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-[#475569]">Email</p>
                      {isPlaceholderValue(config.contact.email) ? (
                        <button
                          type="button"
                          onClick={() => onOpenEditor('contact')}
                          className="mt-0.5 text-left font-medium text-[#0F172A] hover:text-[#2563EB]"
                        >
                          {config.contact.email}
                        </button>
                      ) : (
                        <a
                          href={`mailto:${config.contact.email}`}
                          className="mt-0.5 block font-medium text-[#0F172A] hover:text-[#2563EB]"
                        >
                          {config.contact.email}
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MessageCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0284C7]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-xs text-[#475569]">WhatsApp / Phone</p>
                      {whatsappUrl ? (
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block font-medium text-[#0F172A] hover:text-[#2563EB]"
                        >
                          {config.contact.whatsapp}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenEditor('contact')}
                          className="mt-0.5 text-left font-medium text-[#0F172A] hover:text-[#2563EB]"
                        >
                          {config.contact.whatsapp}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Linkedin className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-[#475569]">LinkedIn</p>
                      {linkedinUrl ? (
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block font-medium text-[#0F172A] hover:text-[#2563EB] break-all"
                        >
                          {config.contact.linkedin}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenEditor('contact')}
                          className="mt-0.5 text-left font-medium text-[#0F172A] hover:text-[#2563EB]"
                        >
                          {config.contact.linkedin}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Github className="mt-0.5 h-4 w-4 shrink-0 text-[#0F172A]" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-[#475569]">GitHub</p>
                      {githubUrl ? (
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-0.5 block font-medium text-[#0F172A] hover:text-[#2563EB] break-all"
                        >
                          {config.contact.github}
                        </a>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onOpenEditor('contact')}
                          className="mt-0.5 text-left font-medium text-[#0F172A] hover:text-[#2563EB]"
                        >
                          {config.contact.github}
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0284C7]" aria-hidden="true" />
                    <div>
                      <p className="text-xs text-[#475569]">Location &amp; Availability</p>
                      <p className="mt-0.5 font-medium text-[#0F172A]">
                        {config.contact.location}
                      </p>
                      <p className="mt-0.5 text-xs text-[#475569]">
                        {config.contact.availability}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#2563EB]/30 bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#0F172A] transition-colors hover:border-[#2563EB] hover:bg-blue-50"
                    >
                      <MessageCircle className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>Message Directly on WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenEditor('contact')}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#475569] transition-colors hover:border-[#2563EB] hover:text-[#0F172A]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>Configure WhatsApp Number in Quick-Edit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Validated Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs">
                {status === 'success' && submittedRecord ? (
                  <div
                    role="status"
                    className="flex flex-col items-start rounded-xl border border-emerald-200 bg-emerald-50/70 p-6"
                  >
                    <div className="flex items-center gap-2.5 text-emerald-700">
                      <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                      <h3 className="font-display text-lg font-bold text-[#0F172A]">
                        Inquiry Recorded
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                      Thank you, <span className="font-semibold text-[#0F172A]">{submittedRecord.fullName}</span>. Your project inquiry for{' '}
                      <span className="font-semibold text-[#0F172A]">{submittedRecord.serviceRequired}</span> has been saved by the server.
                    </p>
                    <p className="mt-3 font-mono text-xs text-[#475569] tabular-nums">
                      Reference: {submittedRecord.id} · {new Date(submittedRecord.submittedAt).toLocaleString()}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setStatus('idle');
                          setSubmittedRecord(null);
                        }}
                        className="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
                      >
                        Send Another Inquiry
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenEditor('inquiries')}
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-[#0F172A] hover:border-slate-300"
                      >
                        View Recorded Inquiries
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    {status === 'error' && serverError && (
                      <div
                        role="alert"
                        className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"
                      >
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" aria-hidden="true" />
                        <span>{serverError}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-xs font-semibold text-[#0F172A]"
                        >
                          Full Name <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          id="fullName"
                          name="fullName"
                          type="text"
                          required
                          value={form.fullName}
                          onChange={(e) => setForm({...form, fullName: e.target.value})}
                          placeholder="Your full name"
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none"
                        />
                        {fieldErrors.fullName && (
                          <p className="mt-1.5 text-xs text-rose-600">{fieldErrors.fullName}</p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-semibold text-[#0F172A]"
                        >
                          Email Address <span className="text-[#2563EB]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({...form, email: e.target.value})}
                          placeholder="name@company.com"
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none"
                        />
                        {fieldErrors.email && (
                          <p className="mt-1.5 text-xs text-rose-600">{fieldErrors.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-xs font-semibold text-[#0F172A]"
                        >
                          Company Name
                        </label>
                        <input
                          id="companyName"
                          name="companyName"
                          type="text"
                          value={form.companyName}
                          onChange={(e) => setForm({...form, companyName: e.target.value})}
                          placeholder="Company or organization"
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="serviceRequired"
                          className="block text-xs font-semibold text-[#0F172A]"
                        >
                          Service Required <span className="text-[#2563EB]">*</span>
                        </label>
                        <select
                          id="serviceRequired"
                          name="serviceRequired"
                          value={form.serviceRequired}
                          onChange={(e) => setForm({...form, serviceRequired: e.target.value})}
                          className="mt-2 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                        >
                          {SERVICES_LIST.map((srv) => (
                            <option key={srv.id} value={srv.title}>
                              {srv.title}
                            </option>
                          ))}
                          <option value="Full-Scope Digital Marketing">
                            Full-Scope Digital Marketing
                          </option>
                          <option value="Consultation / Advisory">
                            Consultation / Advisory
                          </option>
                        </select>
                        {fieldErrors.serviceRequired && (
                          <p className="mt-1.5 text-xs text-rose-600">
                            {fieldErrors.serviceRequired}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="projectBudget"
                        className="block text-xs font-semibold text-[#0F172A]"
                      >
                        Project Budget <span className="font-normal text-[#475569]">(Optional)</span>
                      </label>
                      <select
                        id="projectBudget"
                        name="projectBudget"
                        value={form.projectBudget}
                        onChange={(e) => setForm({...form, projectBudget: e.target.value})}
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                      >
                        <option value="">Prefer to discuss scope first</option>
                        <option value="Under $1,000">Under $1,000</option>
                        <option value="$1,000 – $3,000">$1,000 – $3,000</option>
                        <option value="$3,000 – $7,500">$3,000 – $7,500</option>
                        <option value="$7,500+">$7,500+</option>
                        <option value="Monthly Retainer">Monthly Retainer</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="projectDetails"
                        className="block text-xs font-semibold text-[#0F172A]"
                      >
                        Project Details <span className="text-[#2563EB]">*</span>
                      </label>
                      <textarea
                        id="projectDetails"
                        name="projectDetails"
                        rows={4}
                        required
                        value={form.projectDetails}
                        onChange={(e) => setForm({...form, projectDetails: e.target.value})}
                        placeholder="Share your business goals, target market, current challenges, or timeline..."
                        className="mt-2 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-3 text-sm text-[#0F172A] placeholder-slate-400 focus:border-[#2563EB] focus:bg-white focus:outline-none"
                      />
                      {fieldErrors.projectDetails && (
                        <p className="mt-1.5 text-xs text-rose-600">
                          {fieldErrors.projectDetails}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-60"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                          <span>Submitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" aria-hidden="true" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="font-display text-lg font-bold tracking-tight text-[#0F172A]">
                BEHRAM SHAH
              </p>
              <p className="mt-1 text-xs font-semibold text-[#2563EB]">
                Digital Marketing Strategist | Growth Marketing Professional
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#475569]">
                &ldquo;Helping businesses build stronger digital identities and meaningful online growth.&rdquo;
              </p>
            </div>

            <div className="md:col-span-4">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                Quick Links
              </h3>
              <ul className="mt-4 grid grid-cols-2 gap-y-2.5 gap-x-4 text-sm text-[#475569]">
                {(['home', 'about', 'services', 'experience', 'portfolio', 'contact'] as const).map(
                  (id) => (
                    <li key={id}>
                      <a
                        href={`#${id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(id);
                        }}
                        className="capitalize transition-colors hover:text-[#0F172A]"
                      >
                        {id}
                      </a>
                    </li>
                  ),
                )}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                Connect
              </h3>
              <ul className="mt-4 space-y-2.5 text-sm text-[#475569]">
                <li>
                  {linkedinUrl ? (
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Linkedin className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenEditor('contact')}
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Linkedin className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>LinkedIn (Add Link)</span>
                    </button>
                  )}
                </li>
                <li>
                  {githubUrl ? (
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Github className="h-4 w-4 text-[#0F172A]" aria-hidden="true" />
                      <span>GitHub</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenEditor('contact')}
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Github className="h-4 w-4 text-[#0F172A]" aria-hidden="true" />
                      <span>GitHub (Add Link)</span>
                    </button>
                  )}
                </li>
                <li>
                  {whatsappUrl ? (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#0284C7]" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenEditor('contact')}
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <MessageCircle className="h-4 w-4 text-[#0284C7]" aria-hidden="true" />
                      <span>WhatsApp (Add Number)</span>
                    </button>
                  )}
                </li>
                <li>
                  {facebookUrl ? (
                    <a
                      href={facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Share2 className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>Facebook</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenEditor('contact')}
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Share2 className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                      <span>Facebook (Add Link)</span>
                    </button>
                  )}
                </li>
                <li>
                  {instagramUrl ? (
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Share2 className="h-4 w-4 text-[#0284C7]" aria-hidden="true" />
                      <span>Instagram</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenEditor('contact')}
                      className="inline-flex items-center gap-2 hover:text-[#0F172A]"
                    >
                      <Share2 className="h-4 w-4 text-[#0284C7]" aria-hidden="true" />
                      <span>Instagram (Add Link)</span>
                    </button>
                  )}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-[#475569] sm:flex-row sm:items-center">
            <p>&copy; 2026 {config.fullName}. All Rights Reserved.</p>
            <button
              type="button"
              onClick={() => onOpenEditor('contact')}
              className="inline-flex items-center gap-1.5 font-medium text-[#475569] transition-colors hover:text-[#0F172A]"
            >
              <Edit3 className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Quick-Edit Profile &amp; Inquiries</span>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
