import {useEffect} from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  Edit3,
  Printer,
  X,
} from 'lucide-react';
import {PORTFOLIO_ASSETS} from '../data/assets';
import {BUSINESS_SKILLS, MARKETING_SKILLS} from '../data/defaultPortfolio';
import type {PortfolioConfig, ProjectItem, ServiceItem} from '../types/portfolio';
import {downloadCvFile} from '../utils/cvGenerator';
import {ResilientImage} from './ResilientImage';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquireService: (serviceTitle: string) => void;
}

export function ServiceDetailModal({
  service,
  onClose,
  onInquireService,
}: ServiceModalProps) {
  useEffect(() => {
    if (!service) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [service, onClose]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p className="font-mono text-xs font-semibold text-[#2563EB]">
              Service {service.index}
            </p>
            <h3
              id="service-modal-title"
              className="mt-1 font-display text-2xl font-bold text-[#0F172A]"
            >
              {service.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close service details"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-[#F8FAFC] text-[#475569] hover:text-[#0F172A]"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-[#475569] sm:text-base">
          {service.extendedOverview}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Core Capabilities
            </h4>
            <ul className="mt-3 space-y-2.5">
              {service.capabilities.map((cap) => (
                <li key={cap} className="flex items-start gap-2.5 text-sm text-[#475569]">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]"
                    aria-hidden="true"
                  />
                  <span>{cap}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
            <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
              Typical Deliverables
            </h4>
            <ul className="mt-3 space-y-2.5">
              {service.deliverables.map((del) => (
                <li key={del} className="flex items-start gap-2.5 text-sm text-[#475569]">
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0284C7]"
                    aria-hidden="true"
                  />
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#475569] hover:text-[#0F172A]"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => onInquireService(service.title)}
            className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
          >
            <span>Discuss {service.title}</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onEditProject: () => void;
  onInquireCategory: (category: string) => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onEditProject,
  onInquireCategory,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <ResilientImage
            src={PORTFOLIO_ASSETS.thumbnails[project.thumbnailKey]}
            alt={project.title}
            fallbackTitle={project.title}
            className="h-full w-full"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close case study"
            className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-[#0F172A] backdrop-blur-sm hover:bg-white"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#475569]">
            <span className="font-semibold text-[#2563EB]">{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.industry}</span>
            {project.isTemplatePlaceholder && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-[#0284C7]">Editable Case Study Template</span>
              </>
            )}
          </div>

          <h3
            id="project-modal-title"
            className="mt-2 font-display text-2xl font-bold text-[#0F172A] sm:text-3xl"
          >
            {project.title}
          </h3>

          <div className="mt-6 space-y-6">
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                Project Overview
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#475569] sm:text-base">
                {project.overview}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                  My Responsibilities
                </h4>
                <ul className="mt-3 space-y-2">
                  {project.responsibilities.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#475569]">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
                <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                  Strategy Implemented
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-[#475569]">
                  {project.strategyImplemented}
                </p>
                <p className="mt-4 border-t border-slate-200 pt-3 text-xs text-[#475569]">
                  <span className="font-semibold text-[#0F172A]">Tools Used:</span>{' '}
                  {project.toolsUsed.join(' · ')}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5">
              <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
                Results &amp; Measurable Impact
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-[#0F172A]">
                {project.resultsImpact}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5">
            <button
              type="button"
              onClick={onEditProject}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-xs font-semibold text-[#0F172A] hover:border-[#2563EB]"
            >
              <Edit3 className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Edit Case Study</span>
            </button>

            <button
              type="button"
              onClick={() => onInquireCategory(project.category)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
            >
              <span>Inquire About Similar Work</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface CvModalProps {
  isOpen: boolean;
  config: PortfolioConfig;
  onClose: () => void;
  onOpenEditor: () => void;
}

export function CvPreviewModal({
  isOpen,
  config,
  onClose,
  onOpenEditor,
}: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-[#F8FAFC] px-6 py-4">
          <div>
            <h3 id="cv-modal-title" className="font-display text-lg font-bold text-[#0F172A]">
              Curriculum Vitae — {config.fullName}
            </h3>
            <p className="text-xs text-[#475569]">
              Dynamically generated from your current profile and Quick-Edit entries
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenEditor}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] hover:border-[#2563EB]"
            >
              <Edit3 className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Edit CV Fields</span>
            </button>

            <button
              type="button"
              onClick={() => downloadCvFile(config)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Download CV</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[#0F172A] hover:border-slate-300"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close CV preview"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#475569] hover:text-[#0F172A]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Clean Printable CV Preview */}
        <div className="overflow-y-auto bg-white p-6 sm:p-10 text-slate-900">
          <div className="border-b-2 border-[#0F172A] pb-4">
            <h4 className="font-display text-2xl font-bold text-[#0F172A]">
              {config.fullName}
            </h4>
            <p className="mt-1 text-sm font-semibold text-[#2563EB]">
              {config.professionalTitle}
            </p>
            <p className="mt-2 text-xs text-slate-600">
              {config.contact.location} · Email: {config.contact.email} · WhatsApp:{' '}
              {config.contact.whatsapp} · LinkedIn: {config.contact.linkedin} · GitHub:{' '}
              {config.contact.github}
            </p>
          </div>

          <div className="mt-5">
            <h5 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Professional Summary
            </h5>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {config.heroSummary}
            </p>
          </div>

          <div className="mt-5">
            <h5 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Professional Experience
            </h5>
            <div className="mt-3 space-y-4">
              {config.experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      {exp.position} — <span className="text-[#2563EB]">{exp.company}</span>
                    </p>
                    <span className="text-xs text-slate-500">{exp.employmentDates}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-700">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h5 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Education
            </h5>
            <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
              <p className="text-sm font-bold text-slate-900">
                Bachelor&apos;s in Business Management —{' '}
                <span className="font-semibold text-[#2563EB]">
                  Karakoram International University
                </span>
              </p>
              <span className="text-xs text-slate-500">Recently Completed</span>
            </div>
            <p className="mt-1 text-xs text-slate-600">Gilgit-Baltistan, Pakistan</p>
          </div>

          <div className="mt-5">
            <h5 className="border-b border-slate-200 pb-1 text-xs font-bold uppercase tracking-wider text-[#0F172A]">
              Skills &amp; Expertise
            </h5>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              <strong>Marketing:</strong> {MARKETING_SKILLS.map((s) => s.name).join(' · ')}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-slate-700">
              <strong>Business:</strong> {BUSINESS_SKILLS.map((s) => s.name).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
