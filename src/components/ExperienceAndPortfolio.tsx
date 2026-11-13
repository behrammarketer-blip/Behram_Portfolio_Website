import {useMemo, useState} from 'react';
import {ArrowUpRight, Briefcase, Edit3, FolderOpen} from 'lucide-react';
import {PORTFOLIO_ASSETS} from '../data/assets';
import {PROJECT_CATEGORIES} from '../data/defaultPortfolio';
import type {PortfolioConfig, ProjectCategory, ProjectItem} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface ExperienceAndPortfolioProps {
  config: PortfolioConfig;
  onSelectProject: (project: ProjectItem) => void;
  onOpenEditor: (tab: 'contact' | 'experience' | 'projects' | 'inquiries') => void;
}

export function ExperienceAndPortfolio({
  config,
  onSelectProject,
  onOpenEditor,
}: ExperienceAndPortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | ProjectCategory>('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return config.projects;
    return config.projects.filter((project) => project.category === selectedCategory);
  }, [config.projects, selectedCategory]);

  return (
    <>
      {/* PAGE 4: PROFESSIONAL EXPERIENCE */}
      <section
        id="experience"
        className="border-t border-slate-200 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                Career Timeline
              </p>
              <h2
                className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
                style={{textWrap: 'balance'}}
              >
                My Professional Journey.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                Four years of marketing leadership and hands-on client work across Code Alpha and the IT Directorate Gilgit-Baltistan.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenEditor('experience')}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-[#F8FAFC] px-4 py-2.5 text-xs font-semibold text-[#0F172A] whitespace-nowrap shrink-0 transition-colors hover:border-[#2563EB]"
            >
              <Edit3 className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Edit Experience Details</span>
            </button>
          </div>

          {/* Vertical Timeline */}
          <div className="relative mt-12 space-y-8 pl-6 sm:pl-10 before:absolute before:top-2 before:bottom-2 before:left-[11px] sm:before:left-[19px] before:w-px before:bg-slate-200">
            {config.experiences.map((exp, idx) => (
              <article
                key={exp.id}
                className="relative rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8"
              >
                {/* Timeline node */}
                <div
                  aria-hidden="true"
                  className="absolute -left-[25px] sm:-left-[33px] top-8 flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#2563EB] bg-white"
                >
                  <span className="h-2 w-2 rounded-full bg-[#2563EB]" />
                </div>

                <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-6 md:flex-row md:items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white font-display text-sm font-bold text-[#2563EB] shadow-2xs">
                      {exp.logoLabel || (idx + 1).toString().padStart(2, '0')}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-[#475569]">
                        <span className="font-mono tabular-nums font-semibold text-[#2563EB]">
                          Experience {(idx + 1).toString().padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{exp.employmentDates}</span>
                      </div>
                      <h3 className="mt-1 font-display text-xl font-bold text-[#0F172A]">
                        {exp.position}
                      </h3>
                      <p className="text-sm font-medium text-[#475569]">{exp.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-[#475569]">
                    <Briefcase className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                    <span>Digital Marketing Role</span>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-[#475569] sm:text-base">
                  {exp.description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                      Core Responsibilities
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {exp.responsibilities.map((item, rIdx) => (
                        <li
                          key={rIdx}
                          className="flex items-start gap-2.5 text-sm text-[#475569]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-display text-xs font-semibold uppercase tracking-wider text-[#0F172A]">
                      Notable Highlights
                    </h4>
                    <ul className="mt-3 space-y-2">
                      {exp.achievements.map((item, aIdx) => (
                        <li
                          key={aIdx}
                          className="flex items-start gap-2.5 text-sm text-[#475569]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0284C7]"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PAGE 5: PORTFOLIO / SELECTED PROJECTS */}
      <section
        id="portfolio"
        className="border-t border-slate-200 bg-[#F8FAFC] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                Selected Case Studies
              </p>
              <h2
                className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
                style={{textWrap: 'balance'}}
              >
                Work That Reflects My Marketing Journey.
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[#475569]">
                Structured portfolio templates representing each marketing discipline. Replace sample entries with client-approved project details and outcomes anytime via Quick-Edit.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenEditor('projects')}
              className="inline-flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-[#0F172A] whitespace-nowrap shrink-0 shadow-2xs transition-colors hover:border-[#2563EB]"
            >
              <Edit3 className="h-3.5 w-3.5 text-[#2563EB]" aria-hidden="true" />
              <span>Customize Case Studies</span>
            </button>
          </div>

          {/* Interactive Category Filter Controls */}
          <div
            role="tablist"
            aria-label="Portfolio categories"
            className="mt-10 flex flex-wrap items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1.5 shadow-2xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'All'}
              onClick={() => setSelectedCategory('All')}
              className={`rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === 'All'
                  ? 'bg-[#2563EB] text-white'
                  : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100'
              }`}
            >
              All Projects
            </button>
            {PROJECT_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-3.5 py-2 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#2563EB] text-white'
                    : 'text-[#475569] hover:text-[#0F172A] hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Project Cards Grid */}
          {filteredProjects.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
              <FolderOpen className="h-8 w-8 text-[#475569]" aria-hidden="true" />
              <p className="mt-3 font-display text-base font-semibold text-[#0F172A]">
                No projects listed under this category yet.
              </p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="mt-4 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1D4ED8]"
              >
                Show All Projects
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => {
                const thumbSrc = PORTFOLIO_ASSETS.thumbnails[project.thumbnailKey];
                return (
                  <article
                    key={project.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:shadow-md"
                  >
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="relative aspect-[4/3] w-full overflow-hidden text-left"
                      aria-label={`Open details for ${project.title}`}
                    >
                      <ResilientImage
                        src={thumbSrc}
                        alt={`${project.title} — ${project.category} visual preview`}
                        fallbackTitle={project.title}
                        className="h-full w-full"
                        imgClassName="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>

                    <div className="flex flex-1 flex-col justify-between p-6">
                      <div>
                        {/* Clean unboxed metadata row */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#475569]">
                          <span className="font-semibold text-[#2563EB]">{project.category}</span>
                          {project.isTemplatePlaceholder && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>Editable Template</span>
                            </>
                          )}
                        </div>

                        <h3 className="mt-2.5 font-display text-lg font-bold tracking-tight text-[#0F172A]">
                          {project.title}
                        </h3>

                        <p className="mt-1 text-xs text-[#475569]">
                          Industry: {project.industry}
                        </p>

                        <p className="mt-3 text-sm leading-relaxed text-[#475569] line-clamp-3">
                          {project.overview}
                        </p>

                        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-[#475569]">
                          Tools: {project.toolsUsed.join(' · ')}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                        >
                          <span>View Case Study</span>
                          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
