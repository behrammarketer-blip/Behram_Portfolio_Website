import {useEffect, useState} from 'react';
import {
  CheckCircle2,
  Loader2,
  RefreshCw,
  RotateCcw,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import type {InquiryRecord, PortfolioConfig} from '../types/portfolio';
import {deleteInquiry, listInquiries} from '../utils/portfolioClient';

interface QuickEditStudioProps {
  isOpen: boolean;
  initialTab: 'contact' | 'experience' | 'projects' | 'inquiries';
  config: PortfolioConfig;
  onClose: () => void;
  onSaveConfig: (next: PortfolioConfig) => Promise<boolean>;
  onResetConfig: () => Promise<void>;
}

export function QuickEditStudio({
  isOpen,
  initialTab,
  config,
  onClose,
  onSaveConfig,
  onResetConfig,
}: QuickEditStudioProps) {
  const [activeTab, setActiveTab] = useState<'contact' | 'experience' | 'projects' | 'inquiries'>(
    initialTab,
  );
  const [draft, setDraft] = useState<PortfolioConfig>(config);
  const [saving, setSaving] = useState(false);
  const [savedNotice, setSavedNotice] = useState('');
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    setDraft(config);
  }, [config, isOpen]);

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const items = await listInquiries();
      setInquiries(items);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    if (isOpen && activeTab === 'inquiries') {
      fetchInquiries();
    }
  }, [isOpen, activeTab]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSave = async () => {
    setSaving(true);
    setSavedNotice('');
    const ok = await onSaveConfig(draft);
    setSaving(false);
    if (ok) {
      setSavedNotice('Changes saved to server and applied across portfolio & CV.');
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    const next = await deleteInquiry(id);
    setInquiries(next);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quick-edit-title"
      onClick={onClose}
    >
      <div
        className="flex h-full w-full max-w-2xl flex-col border-l border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h3 id="quick-edit-title" className="font-display text-lg font-bold text-[#0F172A]">
              Quick-Edit Studio &amp; Inquiries
            </h3>
            <p className="text-xs text-[#475569]">
              Update placeholders, contact info, sample projects, and review submitted leads
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Quick-Edit Studio"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-200 bg-[#F8FAFC] px-6 py-3">
          {(
            [
              {id: 'contact', label: 'Contact & Social'},
              {id: 'experience', label: 'Experience'},
              {id: 'projects', label: 'Case Studies'},
              {id: 'inquiries', label: 'Client Inquiries'},
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#475569] hover:bg-slate-200/70 hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {savedNotice && (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
              <span>{savedNotice}</span>
            </div>
          )}

          {activeTab === 'contact' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A]">
                  Professional Email
                </label>
                <input
                  type="text"
                  value={draft.contact.email}
                  onChange={(e) =>
                    setDraft({...draft, contact: {...draft.contact, email: e.target.value}})
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0F172A]">
                  WhatsApp / Phone Number
                </label>
                <input
                  type="text"
                  value={draft.contact.whatsapp}
                  onChange={(e) =>
                    setDraft({...draft, contact: {...draft.contact, whatsapp: e.target.value}})
                  }
                  className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A]">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="text"
                    value={draft.contact.linkedin}
                    onChange={(e) =>
                      setDraft({...draft, contact: {...draft.contact, linkedin: e.target.value}})
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A]">
                    GitHub Profile URL
                  </label>
                  <input
                    type="text"
                    value={draft.contact.github}
                    onChange={(e) =>
                      setDraft({...draft, contact: {...draft.contact, github: e.target.value}})
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A]">
                    Facebook URL
                  </label>
                  <input
                    type="text"
                    value={draft.contact.facebook}
                    onChange={(e) =>
                      setDraft({...draft, contact: {...draft.contact, facebook: e.target.value}})
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A]">
                    Instagram URL
                  </label>
                  <input
                    type="text"
                    value={draft.contact.instagram}
                    onChange={(e) =>
                      setDraft({...draft, contact: {...draft.contact, instagram: e.target.value}})
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A]">Location</label>
                  <input
                    type="text"
                    value={draft.contact.location}
                    onChange={(e) =>
                      setDraft({...draft, contact: {...draft.contact, location: e.target.value}})
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0F172A]">Availability</label>
                  <input
                    type="text"
                    value={draft.contact.availability}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        contact: {...draft.contact, availability: e.target.value},
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-200 bg-[#F8FAFC] px-3.5 py-2.5 text-sm text-[#0F172A] focus:border-[#2563EB] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              {draft.experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className="space-y-4 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5"
                >
                  <p className="font-mono text-xs font-semibold text-[#2563EB]">
                    Experience {(index + 1).toString().padStart(2, '0')}
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const next = [...draft.experiences];
                          next[index] = {
                            ...exp,
                            company: e.target.value,
                            isEditablePlaceholder: false,
                          };
                          setDraft({...draft, experiences: next});
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Official Job Title
                      </label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => {
                          const next = [...draft.experiences];
                          next[index] = {...exp, position: e.target.value};
                          setDraft({...draft, experiences: next});
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Employment Dates
                      </label>
                      <input
                        type="text"
                        value={exp.employmentDates}
                        onChange={(e) => {
                          const next = [...draft.experiences];
                          next[index] = {...exp, employmentDates: e.target.value};
                          setDraft({...draft, experiences: next});
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0F172A]">
                        Logo Monogram (2–3 chars)
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        value={exp.logoLabel}
                        onChange={(e) => {
                          const next = [...draft.experiences];
                          next[index] = {...exp, logoLabel: e.target.value};
                          setDraft({...draft, experiences: next});
                        }}
                        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Role Description
                    </label>
                    <textarea
                      rows={3}
                      value={exp.description}
                      onChange={(e) => {
                        const next = [...draft.experiences];
                        next[index] = {...exp, description: e.target.value};
                        setDraft({...draft, experiences: next});
                      }}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Notable Highlights (one per line)
                    </label>
                    <textarea
                      rows={2}
                      value={exp.achievements.join('\n')}
                      onChange={(e) => {
                        const next = [...draft.experiences];
                        next[index] = {
                          ...exp,
                          achievements: e.target.value
                            .split('\n')
                            .map((s) => s.trim())
                            .filter(Boolean),
                        };
                        setDraft({...draft, experiences: next});
                      }}
                      className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="space-y-6">
              {draft.projects.map((proj, index) => (
                <div
                  key={proj.id}
                  className="space-y-3.5 rounded-xl border border-slate-200 bg-[#F8FAFC] p-5"
                >
                  <p className="font-mono text-xs font-semibold text-[#2563EB]">{proj.category}</p>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Project Title
                    </label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[index] = {
                          ...proj,
                          title: e.target.value,
                          isTemplatePlaceholder: false,
                        };
                        setDraft({...draft, projects: next});
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Industry
                    </label>
                    <input
                      type="text"
                      value={proj.industry}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[index] = {...proj, industry: e.target.value};
                        setDraft({...draft, projects: next});
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Project Overview
                    </label>
                    <textarea
                      rows={2}
                      value={proj.overview}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[index] = {...proj, overview: e.target.value};
                        setDraft({...draft, projects: next});
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0F172A]">
                      Results &amp; Measurable Impact
                    </label>
                    <input
                      type="text"
                      value={proj.resultsImpact}
                      onChange={(e) => {
                        const next = [...draft.projects];
                        next[index] = {...proj, resultsImpact: e.target.value};
                        setDraft({...draft, projects: next});
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-[#0F172A] focus:border-[#2563EB] focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#475569]">
                  Stored client inquiries submitted via the Contact form
                </p>
                <button
                  type="button"
                  onClick={fetchInquiries}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-[#F8FAFC] px-3 py-1.5 text-xs font-medium text-[#0F172A] hover:border-[#2563EB]"
                >
                  <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Refresh</span>
                </button>
              </div>

              {loadingInquiries ? (
                <div className="flex items-center justify-center py-12 text-[#475569]">
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                </div>
              ) : inquiries.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-8 text-center">
                  <p className="text-sm font-medium text-[#0F172A]">No inquiries recorded yet.</p>
                  <p className="mt-1 text-xs text-[#475569]">
                    Submissions from the Contact form will appear here immediately.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-sm font-bold text-[#0F172A]">
                            {item.fullName}{' '}
                            <span className="font-normal text-[#475569]">
                              ({item.companyName})
                            </span>
                          </p>
                          <p className="mt-0.5 text-xs font-medium text-[#2563EB]">
                            {item.email} · {item.serviceRequired}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(item.id)}
                          aria-label={`Delete inquiry from ${item.fullName}`}
                          className="rounded-lg p-1.5 text-[#475569] hover:bg-rose-50 hover:text-rose-600"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-[#475569]">
                        {item.projectDetails}
                      </p>
                      <p className="mt-2 font-mono text-[11px] text-slate-500 tabular-nums">
                        Budget: {item.projectBudget} ·{' '}
                        {new Date(item.submittedAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {activeTab !== 'inquiries' && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 bg-[#F8FAFC] px-6 py-4">
            <button
              type="button"
              onClick={onResetConfig}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-[#475569] hover:text-[#0F172A]"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Defaults</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8] disabled:opacity-60"
            >
              {saving ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
