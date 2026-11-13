import {
  Award,
  CheckCircle2,
  Compass,
  Globe,
  GraduationCap,
  Layers,
  MessageSquare,
  Target,
} from 'lucide-react';
import {PORTFOLIO_ASSETS} from '../data/assets';
import {
  BUSINESS_SKILLS,
  MARKETING_SKILLS,
  WHY_WORK_ITEMS,
} from '../data/defaultPortfolio';
import {ResilientImage} from './ResilientImage';

const WHY_ICONS = [Award, Globe, Compass, Layers, MessageSquare, Target];

export function SkillsEducationWhy() {
  return (
    <>
      {/* PAGE 6: SKILLS & EXPERTISE */}
      <section
        id="skills"
        className="border-t border-slate-200 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
              Core Competencies
            </p>
            <h2
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
              style={{textWrap: 'balance'}}
            >
              Skills That Drive Digital Success.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#475569]">
              A dual discipline pairing digital channel execution with structured business management training.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Marketing Skills */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-7">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="font-display text-xl font-bold text-[#0F172A]">
                  Marketing Skills
                </h3>
                <span className="font-mono text-xs font-semibold text-[#2563EB] tabular-nums">
                  {MARKETING_SKILLS.length} Disciplines
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {MARKETING_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-colors hover:border-[#2563EB]/40"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#2563EB]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-sm font-semibold text-[#0F172A]">
                        {skill.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#475569]">{skill.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Skills */}
            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-8 lg:col-span-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="font-display text-xl font-bold text-[#0F172A]">
                  Business Skills
                </h3>
                <span className="font-mono text-xs font-semibold text-[#0284C7] tabular-nums">
                  {BUSINESS_SKILLS.length} Foundations
                </span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3">
                {BUSINESS_SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-2xs transition-colors hover:border-[#0284C7]/40"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#0284C7]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-display text-sm font-semibold text-[#0F172A]">
                        {skill.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#475569]">{skill.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 7: EDUCATION */}
      <section
        id="education"
        className="border-t border-slate-200 bg-[#F8FAFC] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
              Credentials
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
              Academic Background.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs lg:grid-cols-12">
            <div className="relative min-h-[260px] lg:col-span-5">
              <ResilientImage
                src={PORTFOLIO_ASSETS.education}
                alt="Karakoram International University campus framed by mountains in Gilgit-Baltistan"
                fallbackTitle="Karakoram International University"
                className="h-full w-full"
                imgClassName="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#475569]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#2563EB]">
                  <GraduationCap className="h-4 w-4" aria-hidden="true" />
                  Recently Completed
                </span>
                <span aria-hidden="true">·</span>
                <span>Gilgit-Baltistan, Pakistan</span>
              </div>

              <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
                Bachelor&apos;s in Business Management
              </h3>

              <p className="mt-1.5 text-base font-semibold text-[#2563EB]">
                Karakoram International University
              </p>

              <p className="mt-5 text-sm leading-relaxed text-[#475569] sm:text-base">
                My academic journey in Business Management has provided me with a foundation in business strategy, management, organizational development, and decision-making. Combined with my practical digital marketing experience, this knowledge allows me to approach marketing from both creative and business perspectives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 8: WHY WORK WITH ME? */}
      <section
        id="why-me"
        className="border-t border-slate-200 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
              Partnership Value
            </p>
            <h2
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
              style={{textWrap: 'balance'}}
            >
              Why Businesses Choose to Work With Me.
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_WORK_ITEMS.map((item, idx) => {
              const Icon = WHY_ICONS[idx % WHY_ICONS.length];
              return (
                <div
                  key={item.index}
                  className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-6 sm:p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:bg-white hover:shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#2563EB] transition-transform duration-200 group-hover:scale-105">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <span className="font-mono text-xs font-medium text-[#475569] tabular-nums">
                      {item.index}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-bold tracking-tight text-[#0F172A]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#475569]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
