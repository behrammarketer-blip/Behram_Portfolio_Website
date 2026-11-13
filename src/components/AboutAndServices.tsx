import {
  ArrowUpRight,
  Compass,
  FileText,
  Search,
  Share2,
  Target,
  TrendingUp,
} from 'lucide-react';
import {PORTFOLIO_ASSETS} from '../data/assets';
import {SERVICES_LIST} from '../data/defaultPortfolio';
import type {PortfolioConfig, ServiceItem} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface AboutAndServicesProps {
  config: PortfolioConfig;
  onSelectService: (service: ServiceItem) => void;
}

const SERVICE_ICONS = {
  Compass,
  Share2,
  Search,
  Target,
  FileText,
  TrendingUp,
};

const ABOUT_PILLARS = [
  {
    label: 'Professional Journey',
    detail: 'Four years of practical execution across local and international client engagements.',
  },
  {
    label: 'Approach to Marketing',
    detail: 'Aligning audience research and creative clarity directly with commercial objectives.',
  },
  {
    label: 'Business Foundation',
    detail: "Bachelor's degree in Business Management from Karakoram International University.",
  },
  {
    label: 'Core Values',
    detail: 'Strategic rigor, transparent communication, and sustainable brand credibility.',
  },
];

export function AboutAndServices({config, onSelectService}: AboutAndServicesProps) {
  return (
    <>
      {/* PAGE 2: ABOUT ME */}
      <section
        id="about"
        className="border-t border-slate-200 bg-white py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: Visual & Core Pillars */}
            <div className="lg:col-span-5">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
                About Behram Shah
              </p>
              <h2
                className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
                style={{textWrap: 'balance'}}
              >
                Beyond Marketing. Building Digital Growth.
              </h2>

              <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-[#F8FAFC] shadow-xs">
                <div className="aspect-[4/5] w-full bg-[#0B1020]">
                  <ResilientImage
                    src={PORTFOLIO_ASSETS.portrait}
                    alt="Behram Shah — Digital Marketing Strategist"
                    fallbackTitle="Behram Shah"
                    className="h-full w-full"
                    imgClassName="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="border-t border-slate-200 bg-white p-5">
                  <p className="font-display text-sm font-semibold text-[#0F172A]">
                    Business Management Meets Digital Execution
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                    Integrating academic management training with four years of real-world campaign delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative Biography & Structured Pillars */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div className="space-y-5 text-base leading-relaxed text-[#475569] sm:text-[1.0625rem]">
                {config.aboutSummary.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 0 || idx === config.aboutSummary.length - 1
                        ? 'text-[#0F172A] font-medium'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 border-t border-slate-200 pt-8">
                {ABOUT_PILLARS.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-xl border border-slate-200 bg-[#F8FAFC] p-5"
                  >
                    <h3 className="font-display text-sm font-semibold text-[#0F172A]">
                      {pillar.label}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#475569]">
                      {pillar.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE 3: SERVICES */}
      <section
        id="services"
        className="border-t border-slate-200 bg-[#F8FAFC] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#2563EB]">
              Services &amp; Capabilities
            </p>
            <h2
              className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl"
              style={{textWrap: 'balance'}}
            >
              Strategic Digital Marketing Services That Move Businesses Forward.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#475569]">
              Focused disciplines grounded in four years of practical execution—structured to attract qualified prospects, strengthen brand presence, and support sustainable revenue growth.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES_LIST.map((service) => {
              const Icon = SERVICE_ICONS[service.iconName];
              return (
                <article
                  key={service.id}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 sm:p-7 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2563EB]/40 hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-[#F8FAFC] text-[#2563EB] transition-colors group-hover:bg-[#2563EB] group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <span className="font-mono text-xs font-medium text-[#475569] tabular-nums">
                        {service.index}
                      </span>
                    </div>

                    <h3 className="mt-6 font-display text-xl font-bold tracking-tight text-[#0F172A]">
                      {service.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-[#475569]">
                      {service.shortDescription}
                    </p>

                    <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5">
                      {service.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2.5 text-sm text-[#334155]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2563EB]"
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onSelectService(service)}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8]"
                    >
                      <span>Learn More</span>
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
