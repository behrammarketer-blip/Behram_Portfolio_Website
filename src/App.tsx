import {useEffect, useState} from 'react';
import {ArrowUp} from 'lucide-react';
import {AboutAndServices} from './components/AboutAndServices';
import {ContactAndFooter} from './components/ContactAndFooter';
import {ExperienceAndPortfolio} from './components/ExperienceAndPortfolio';
import {HeroSection} from './components/HeroSection';
import {
  CvPreviewModal,
  ProjectDetailModal,
  ServiceDetailModal,
} from './components/Modals';
import {Navbar} from './components/Navbar';
import {QuickEditStudio} from './components/QuickEditStudio';
import {SkillsEducationWhy} from './components/SkillsEducationWhy';
import {DEFAULT_PORTFOLIO_CONFIG} from './data/defaultPortfolio';
import type {PortfolioConfig, ProjectItem, ServiceItem} from './types/portfolio';

const TRACKED_SECTIONS = [
  'home',
  'about',
  'services',
  'experience',
  'portfolio',
  'skills',
  'contact',
] as const;

export default function App() {
  const [config, setConfig] = useState<PortfolioConfig>(DEFAULT_PORTFOLIO_CONFIG);
  const [activeSection, setActiveSection] = useState<string>('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editorTab, setEditorTab] = useState<
    'contact' | 'experience' | 'projects' | 'inquiries'
  >('contact');
  const [preselectedService, setPreselectedService] = useState('');

  // Load any saved Quick-Edit overrides from backend with safe deep contact merge
  useEffect(() => {
    let active = true;
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.portfolio) {
          setConfig({
            ...DEFAULT_PORTFOLIO_CONFIG,
            ...data.portfolio,
            contact: {
              ...DEFAULT_PORTFOLIO_CONFIG.contact,
              ...(data.portfolio.contact || {}),
            },
          });
        }
      })
      .catch(() => {
        // Fallback smoothly to default portfolio config
      });
    return () => {
      active = false;
    };
  }, []);

  // Ensure canonical URL is dynamically attached on client
  useEffect(() => {
    const canonicalHref = `${window.location.origin}${window.location.pathname}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalHref;
  }, []);

  // Track active navigation section & Back-to-Top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 560);

      const scrollOffset = window.scrollY + 140;
      let current = 'home';
      for (const id of TRACKED_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollOffset) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  const handleOpenEditor = (
    tab: 'contact' | 'experience' | 'projects' | 'inquiries',
  ) => {
    setEditorTab(tab);
    setEditorOpen(true);
  };

  const handleSaveConfig = async (next: PortfolioConfig): Promise<boolean> => {
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(next),
      });
      if (res.ok) {
        setConfig(next);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleResetConfig = async () => {
    try {
      await fetch('/api/portfolio/reset', {method: 'POST'});
    } catch {
      // Ignore network failure and reset client state
    }
    setConfig(DEFAULT_PORTFOLIO_CONFIG);
  };

  const CATEGORY_TO_SERVICE: Record<string, string> = {
    'Digital Marketing Campaigns': 'Digital Marketing Strategy',
    'Social Media Marketing': 'Social Media Marketing',
    'SEO Projects': 'Search Engine Optimization (SEO)',
    'Paid Advertising': 'Paid Advertising',
    'Brand Development': 'Content Marketing',
    'Lead Generation': 'Lead Generation',
  };

  const handleInquireFromModal = (serviceOrCategory: string) => {
    setSelectedService(null);
    setSelectedProject(null);
    setPreselectedService(CATEGORY_TO_SERVICE[serviceOrCategory] || serviceOrCategory);
    navigateToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <Navbar
        brandName={config.fullName}
        activeSection={activeSection}
        onNavigate={navigateToSection}
      />

      <main>
        <HeroSection
          config={config}
          onNavigate={navigateToSection}
          onOpenCvModal={() => setCvModalOpen(true)}
        />

        <AboutAndServices
          config={config}
          onSelectService={(srv) => setSelectedService(srv)}
        />

        <ExperienceAndPortfolio
          config={config}
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenEditor={handleOpenEditor}
        />

        <SkillsEducationWhy />

        <ContactAndFooter
          config={config}
          preselectedService={preselectedService}
          onNavigate={navigateToSection}
          onOpenEditor={handleOpenEditor}
        />
      </main>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          aria-label="Back to top"
          className="fixed right-5 bottom-5 z-30 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-[#0F172A] shadow-md transition-colors hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {/* Interactive Modals & Quick-Edit Studio */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onInquireService={handleInquireFromModal}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEditProject={() => {
          setSelectedProject(null);
          handleOpenEditor('projects');
        }}
        onInquireCategory={(category) => handleInquireFromModal(category)}
      />

      <CvPreviewModal
        isOpen={cvModalOpen}
        config={config}
        onClose={() => setCvModalOpen(false)}
        onOpenEditor={() => {
          setCvModalOpen(false);
          handleOpenEditor('experience');
        }}
      />

      <QuickEditStudio
        isOpen={editorOpen}
        initialTab={editorTab}
        config={config}
        onClose={() => setEditorOpen(false)}
        onSaveConfig={handleSaveConfig}
        onResetConfig={handleResetConfig}
      />
    </div>
  );
}
