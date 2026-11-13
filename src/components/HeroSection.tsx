import {ArrowRight, Download, Compass, BarChart3, Globe2} from 'lucide-react';
import {motion} from 'motion/react';
import {PORTFOLIO_ASSETS} from '../data/assets';
import {VERIFIED_HIGHLIGHTS} from '../data/defaultPortfolio';
import type {PortfolioConfig} from '../types/portfolio';
import {ResilientImage} from './ResilientImage';

interface HeroSectionProps {
  config: PortfolioConfig;
  onNavigate: (sectionId: string) => void;
  onOpenCvModal: () => void;
}

export function HeroSection({config, onNavigate, onOpenCvModal}: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#F8FAFC] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Subtle Light Architectural Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -top-32 right-[-8%] h-[480px] w-[480px] rounded-full bg-[#2563EB]/[0.06] blur-[110px]" />
        <div className="absolute top-1/3 left-[-10%] h-[380px] w-[380px] rounded-full bg-[#0284C7]/[0.05] blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.04) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Split-Screen Hero */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Narrative & Primary Actions */}
          <motion.div
            initial={{opacity: 0, y: 14}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
            className="flex flex-col justify-center lg:col-span-7"
          >
            <p className="mb-4 font-mono text-xs font-semibold tracking-[0.12em] uppercase text-[#2563EB]">
              Digital Marketing Strategist <span aria-hidden="true">·</span> Growth Marketer
            </p>

            <h1
              className="font-display text-3xl font-bold tracking-tight text-[#0F172A] sm:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
              style={{textWrap: 'balance'}}
            >
              {config.headline}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
              {config.heroSummary}
            </p>

            {/* Primary CTA Group */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white whitespace-nowrap shrink-0 shadow-xs transition-colors duration-150 hover:bg-[#1D4ED8]"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-[#0F172A] whitespace-nowrap shrink-0 shadow-2xs transition-colors duration-150 hover:border-slate-300 hover:bg-slate-50"
              >
                <span>Explore My Work</span>
              </button>

              <button
                type="button"
                onClick={onOpenCvModal}
                className="inline-flex items-center gap-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-[#475569] whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#0F172A]"
              >
                <Download className="h-4 w-4 text-[#2563EB]" aria-hidden="true" />
                <span>Download My CV</span>
              </button>
            </div>

            {/* Clean Unboxed Geographic & Availability Note */}
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-200 pt-5 text-xs text-[#475569]">
              <span>{config.contact.location}</span>
              <span aria-hidden="true">·</span>
              <span>{config.contact.availability}</span>
            </div>
          </motion.div>

          {/* Right Column: User-Uploaded Portrait Displayed Cleanly Without Occlusion */}
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1]}}
            className="relative flex flex-col lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#0B1020] shadow-md">
              <div className="aspect-[4/5] w-full">
                <ResilientImage
                  src={PORTFOLIO_ASSETS.portrait}
                  alt="Behram Shah — Digital Marketing Strategist with 4+ years of experience"
                  fallbackTitle="Behram Shah — Digital Marketing Strategist"
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            {/* Clean Architectural Strategy Accents */}
            <div className="mt-3 grid grid-cols-3 gap-3">
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-2xs">
                <Compass className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                <span className="truncate text-xs font-medium text-[#334155]">Strategy</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-2xs">
                <BarChart3 className="h-4 w-4 shrink-0 text-[#0284C7]" aria-hidden="true" />
                <span className="truncate text-xs font-medium text-[#334155]">Acquisition</span>
              </div>
              <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 shadow-2xs">
                <Globe2 className="h-4 w-4 shrink-0 text-[#2563EB]" aria-hidden="true" />
                <span className="truncate text-xs font-medium text-[#334155]">Global Reach</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width Verified Experience Strip */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-2xs sm:grid-cols-2 lg:grid-cols-4">
          {VERIFIED_HIGHLIGHTS.map((item) => (
            <div
              key={item.value}
              className="bg-white px-6 py-5 transition-colors duration-150 hover:bg-slate-50"
            >
              <p className="font-display text-lg font-bold tracking-tight text-[#0F172A] tabular-nums">
                {item.value}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-[#475569]">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
