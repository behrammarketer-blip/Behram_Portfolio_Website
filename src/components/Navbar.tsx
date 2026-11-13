import {useEffect, useState} from 'react';
import {ArrowUpRight, Menu, X} from 'lucide-react';

interface NavbarProps {
  brandName: string;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  {id: 'home', label: 'Home'},
  {id: 'about', label: 'About'},
  {id: 'services', label: 'Services'},
  {id: 'experience', label: 'Experience'},
  {id: 'portfolio', label: 'Portfolio'},
  {id: 'skills', label: 'Skills'},
  {id: 'contact', label: 'Contact'},
] as const;

export function Navbar({brandName, activeSection, onNavigate}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/90 shadow-xs'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
          {/* Zone 1: Single-element Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('home');
            }}
            className="font-display text-base sm:text-lg font-bold tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
          >
            {brandName.toUpperCase()}
          </a>

          {/* Zone 2: Single-line Text Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#475569]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#0F172A] ${
                    isActive ? 'text-[#0F172A] font-semibold' : 'text-[#475569]'
                  }`}
                >
                  {item.label}
                  <span
                    className={`absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#2563EB] transition-transform duration-150 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 transition-colors duration-150 hover:bg-[#1D4ED8]"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0F172A] transition-colors hover:border-slate-300"
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-white/98 backdrop-blur-lg pt-20 px-6 pb-8 lg:hidden flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-slate-100 text-[#0F172A] border border-slate-200 font-semibold'
                      : 'text-[#475569] hover:bg-slate-50 hover:text-[#0F172A]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs font-mono text-[#2563EB]">Current</span>
                  )}
                </a>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-slate-200">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('contact');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563EB] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              <span>Let&apos;s Work Together</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      )}
    </>
  );
}
