export type ProjectCategory =
  | 'Digital Marketing Campaigns'
  | 'Social Media Marketing'
  | 'SEO Projects'
  | 'Paid Advertising'
  | 'Brand Development'
  | 'Lead Generation';

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  employmentDates: string;
  logoLabel: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  isEditablePlaceholder?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: ProjectCategory;
  industry: string;
  overview: string;
  responsibilities: string[];
  strategyImplemented: string;
  toolsUsed: string[];
  resultsImpact: string;
  thumbnailKey: 'strategy' | 'social' | 'seo';
  isTemplatePlaceholder?: boolean;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  shortDescription: string;
  extendedOverview: string;
  capabilities: string[];
  deliverables: string[];
  iconName:
    | 'Compass'
    | 'Share2'
    | 'Search'
    | 'Target'
    | 'FileText'
    | 'TrendingUp';
}

export interface ContactInfo {
  email: string;
  whatsapp: string;
  linkedin: string;
  github: string;
  facebook: string;
  instagram: string;
  location: string;
  availability: string;
}

export interface PortfolioConfig {
  fullName: string;
  professionalTitle: string;
  headline: string;
  heroSummary: string;
  aboutSummary: string[];
  contact: ContactInfo;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
}

export interface InquiryFormInput {
  fullName: string;
  email: string;
  companyName: string;
  serviceRequired: string;
  projectBudget: string;
  projectDetails: string;
}

export interface InquiryRecord extends InquiryFormInput {
  id: string;
  submittedAt: string;
}
