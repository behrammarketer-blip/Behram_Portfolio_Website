import type {PortfolioConfig, ProjectCategory, ServiceItem} from '../types/portfolio';

export const PROJECT_CATEGORIES: readonly ProjectCategory[] = [
  'Digital Marketing Campaigns',
  'Social Media Marketing',
  'SEO Projects',
  'Paid Advertising',
  'Brand Development',
  'Lead Generation',
];

export const VERIFIED_HIGHLIGHTS = [
  {
    value: '4+ Years',
    label: 'Hands-On Digital Marketing Experience',
  },
  {
    value: 'Local & Global',
    label: 'Client & Market Collaboration',
  },
  {
    value: 'Code Alpha & ITD GB',
    label: 'Lead Digital & Social Media Marketing',
  },
  {
    value: 'B.S. Management',
    label: 'Karakoram International University',
  },
] as const;

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'digital-marketing-strategy',
    index: '01',
    title: 'Digital Marketing Strategy',
    shortDescription:
      'Structured growth roadmaps aligning audience insights, competitive positioning, and multi-channel execution with core business objectives.',
    extendedOverview:
      'Every sustainable digital initiative begins with commercial clarity. Combining Business Management principles with practical channel experience, I build structured marketing plans designed to guide brand positioning, channel allocation, and measurable evaluation.',
    capabilities: [
      'Marketing strategy development',
      'Audience research',
      'Competitor analysis',
      'Campaign planning',
      'Marketing performance evaluation',
    ],
    deliverables: [
      'Audience & Market Segmentation Brief',
      'Competitive Positioning Audit',
      'Quarterly Channel & Campaign Roadmap',
      'KPI Framework & Reporting Cadence',
    ],
    iconName: 'Compass',
  },
  {
    id: 'social-media-marketing',
    index: '02',
    title: 'Social Media Marketing',
    shortDescription:
      'Consistent brand storytelling, editorial calendars, and audience-focused growth systems built to strengthen visibility and engagement.',
    extendedOverview:
      'Social channels act as the public front door of modern businesses. I help brands establish coherent visual and editorial voices, plan structured content pillars, and foster meaningful community engagement across core platforms.',
    capabilities: [
      'Social media strategy',
      'Content planning',
      'Brand positioning',
      'Social media growth',
      'Audience engagement',
    ],
    deliverables: [
      'Platform-Specific Positioning Strategy',
      'Monthly Editorial & Content Calendar',
      'Creative Messaging & Hook Guidelines',
      'Engagement & Growth Review',
    ],
    iconName: 'Share2',
  },
  {
    id: 'search-engine-optimization',
    index: '03',
    title: 'Search Engine Optimization (SEO)',
    shortDescription:
      'Search-first architecture, keyword mapping, and on-page optimization engineered to build durable organic discovery over time.',
    extendedOverview:
      'Organic search captures high-intent demand without relying solely on ad spend. My SEO approach focuses on clean site structure, intent-aligned keyword research, technical hygiene, and content optimization that compounds visibility.',
    capabilities: [
      'Keyword research',
      'On-page SEO',
      'Technical SEO',
      'Content optimization',
      'Organic visibility improvement',
    ],
    deliverables: [
      'Search Intent & Keyword Architecture',
      'On-Page Metadata & Heading Optimization',
      'Technical Crawl & Indexing Audit',
      'Content Gap & Optimization Plan',
    ],
    iconName: 'Search',
  },
  {
    id: 'paid-advertising',
    index: '04',
    title: 'Paid Advertising',
    shortDescription:
      'Targeted Meta and Google Ads campaign structuring, creative testing, and ongoing optimization focused on qualified traffic.',
    extendedOverview:
      'Paid media requires disciplined budget stewardship and clear audience segmentation. I structure, launch, and refine Meta and Google Ads campaigns with continuous testing of messaging, targeting, and landing alignment.',
    capabilities: [
      'Meta advertising',
      'Google Ads',
      'Campaign optimization',
      'Audience targeting',
      'Advertising performance analysis',
    ],
    deliverables: [
      'Campaign Architecture & Funnel Segmentation',
      'Audience & Keyword Targeting Setup',
      'Ad Copy & Creative Testing Matrix',
      'Performance Analysis & Budget Reallocation',
    ],
    iconName: 'Target',
  },
  {
    id: 'content-marketing',
    index: '05',
    title: 'Content Marketing',
    shortDescription:
      'Clear, persuasive marketing copy and strategic storytelling tailored to educate prospects and reinforce brand authority.',
    extendedOverview:
      'Effective content bridges the gap between customer questions and business solutions. I plan and refine editorial assets, landing page copy, and brand narratives that communicate credibility and guide prospects forward.',
    capabilities: [
      'Content strategy',
      'Content planning',
      'Brand storytelling',
      'Marketing copy',
      'Content optimization',
    ],
    deliverables: [
      'Brand Voice & Messaging Hierarchy',
      'Pillar Content & Topic Mapping',
      'Conversion-Focused Landing & Ad Copy',
      'Existing Asset Refresh & Optimization',
    ],
    iconName: 'FileText',
  },
  {
    id: 'lead-generation',
    index: '06',
    title: 'Lead Generation',
    shortDescription:
      'Intentional acquisition funnels combining targeted outreach, conversion optimization, and structured campaign analysis.',
    extendedOverview:
      'Visibility only matters when it translates into real business conversations. I design end-to-end lead generation workflows that connect audience targeting, value propositions, and frictionless inquiry paths.',
    capabilities: [
      'Lead generation strategies',
      'Audience targeting',
      'Conversion optimization',
      'Lead funnel planning',
      'Campaign analysis',
    ],
    deliverables: [
      'Offer & Lead Magnet Positioning',
      'Multi-Step Funnel & Landing Wireframe',
      'Conversion Friction Audit',
      'Lead Quality & Channel Attribution Review',
    ],
    iconName: 'TrendingUp',
  },
];

export const MARKETING_SKILLS = [
  {name: 'Digital Marketing Strategy', focus: 'Roadmaps & Growth Planning'},
  {name: 'Social Media Marketing', focus: 'Brand Presence & Community'},
  {name: 'SEO', focus: 'On-Page, Technical & Visibility'},
  {name: 'Paid Advertising', focus: 'Meta & Google Campaign Delivery'},
  {name: 'Content Marketing', focus: 'Storytelling & Marketing Copy'},
  {name: 'Lead Generation', focus: 'Funnels & Conversion Paths'},
  {name: 'Audience Research', focus: 'Segmentation & Buyer Insights'},
  {name: 'Marketing Analytics', focus: 'Performance Evaluation & Reporting'},
  {name: 'Brand Positioning', focus: 'Messaging & Competitive Clarity'},
  {name: 'Campaign Management', focus: 'End-to-End Execution'},
] as const;

export const BUSINESS_SKILLS = [
  {name: 'Business Management', focus: 'Operations & Commercial Fundamentals'},
  {name: 'Strategic Planning', focus: 'Objective-Driven Decision Making'},
  {name: 'Communication', focus: 'Clear Stakeholder Alignment'},
  {name: 'Leadership', focus: 'Team & Initiative Ownership'},
  {name: 'Problem Solving', focus: 'Structured Bottleneck Analysis'},
  {name: 'Client Relationship Management', focus: 'Local & International Collaboration'},
] as const;

export const WHY_WORK_ITEMS = [
  {
    index: '01',
    title: 'Four Years of Practical Experience',
    description:
      'Hands-on execution across real business campaigns, moving beyond theory into day-to-day digital marketing delivery.',
  },
  {
    index: '02',
    title: 'Exposure to Local and International Markets',
    description:
      'Experience collaborating with diverse clients and adapting messaging for varied regional and international audiences.',
  },
  {
    index: '03',
    title: 'Business-Oriented Marketing Approach',
    description:
      'Grounded in a Bachelor’s degree in Business Management, ensuring campaigns serve broader commercial objectives.',
  },
  {
    index: '04',
    title: 'Strategic Thinking and Problem Solving',
    description:
      'Methodical analysis of audience behavior, positioning gaps, and channel performance before committing resources.',
  },
  {
    index: '05',
    title: 'Professional Communication',
    description:
      'Transparent updates, structured documentation, and dependable coordination with founders, teams, and agencies.',
  },
  {
    index: '06',
    title: 'Focus on Meaningful Business Growth',
    description:
      'Prioritizing qualified visibility, brand credibility, and sustainable customer acquisition over vanity metrics.',
  },
] as const;

export const DEFAULT_PORTFOLIO_CONFIG: PortfolioConfig = {
  fullName: 'Behram Shah',
  professionalTitle: 'Digital Marketing Strategist | Growth Marketing Specialist',
  headline: 'Turning Digital Strategies Into Measurable Business Growth.',
  heroSummary:
    "I'm Behram Shah, a Digital Marketing Professional with 4+ years of experience helping local and international businesses strengthen their online presence, reach the right audience, and grow through strategic digital marketing.",
  aboutSummary: [
    "I'm Behram Shah, a passionate Digital Marketing Professional with four years of hands-on experience working with local and international clients.",
    'Throughout my professional journey, I have developed practical experience in digital marketing, business promotion, online brand development, and strategic marketing initiatives.',
    'My experience includes working as a Lead Digital Marketer at Code Alpha, where I contributed to digital marketing activities and professional team responsibilities.',
    "Alongside my professional journey, I have recently completed my Bachelor's degree in Business Management from Karakoram International University, Gilgit-Baltistan.",
    'My educational background has strengthened my understanding of business operations, management, marketing principles, and strategic decision-making.',
    'I believe successful digital marketing is not simply about getting attention. It is about understanding business objectives, reaching the right audience, creating meaningful connections, and building sustainable growth.',
  ],
  contact: {
    email: 'berham.marketer@gmail.com',
    whatsapp: '03554324571',
    linkedin: 'https://www.linkedin.com/in/behram-shah-21053844b/',
    github: 'https://github.com/behrammarketer-blip',
    facebook: '[YOUR FACEBOOK PROFILE]',
    instagram: '[YOUR INSTAGRAM PROFILE]',
    location: 'Gilgit-Baltistan, Pakistan',
    availability: 'Open to local and international opportunities',
  },
  experiences: [
    {
      id: 'exp-code-alpha',
      company: 'Code Alpha',
      position: 'Lead Digital Marketer',
      employmentDates: 'Previous Role',
      logoLabel: 'CA',
      description:
        'Worked as a Lead Digital Marketer at Code Alpha, contributing to digital marketing activities, marketing initiatives, and professional responsibilities focused on online business growth.',
      responsibilities: [
        'Led digital marketing initiatives supporting online visibility and business growth.',
        'Coordinated campaign planning, audience outreach, and brand positioning efforts.',
        'Collaborated with cross-functional team members to align marketing execution with project goals.',
      ],
      achievements: [
        'Directed multi-channel marketing initiatives and brand positioning workflows.',
      ],
      isEditablePlaceholder: false,
    },
    {
      id: 'exp-it-directorate-gb',
      company: 'IT Directorate Gilgit-Baltistan',
      position: 'Social Media Marketer',
      employmentDates: 'Previous Role',
      logoLabel: 'ITD',
      description:
        'Worked as a Social Media Marketer at the IT Directorate Gilgit-Baltistan, contributing to digital marketing initiatives, social media communication, and audience engagement across regional digital channels.',
      responsibilities: [
        'Planned and managed social media marketing campaigns and content calendars.',
        'Strengthened digital visibility, brand consistency, and public audience engagement.',
        'Coordinated messaging strategies aligned with organizational communication goals.',
      ],
      achievements: [
        'Supported regional digital outreach and structured social media positioning.',
      ],
      isEditablePlaceholder: false,
    },
  ],
  projects: [
    {
      id: 'proj-campaign-framework',
      title: 'Integrated Multi-Channel Growth Campaign',
      category: 'Digital Marketing Campaigns',
      industry: '[Add Client Industry — e.g., B2B Services / E-Commerce]',
      overview:
        'Editable case study template showcasing end-to-end digital campaign planning, channel alignment, and structured performance evaluation.',
      responsibilities: [
        'Conducted audience research and competitive positioning analysis.',
        'Defined multi-channel campaign roadmap and messaging hierarchy.',
        'Evaluated campaign performance and refined targeting priorities.',
      ],
      strategyImplemented:
        'Aligned brand positioning across search, social, and landing touchpoints to guide qualified prospects through a cohesive customer journey.',
      toolsUsed: ['Google Analytics', 'Meta Business Suite', 'Keyword Planner', 'Editorial Calendar'],
      resultsImpact: '[Add verified campaign outcomes, KPIs, or client-approved metrics here]',
      thumbnailKey: 'strategy',
      isTemplatePlaceholder: true,
    },
    {
      id: 'proj-social-positioning',
      title: 'Social Media Presence & Brand Positioning Program',
      category: 'Social Media Marketing',
      industry: '[Add Client Industry — e.g., Hospitality / Consumer Brand]',
      overview:
        'Editable case study template demonstrating structured content pillars, visual consistency, and audience engagement workflows.',
      responsibilities: [
        'Built platform-specific content calendars and brand voice guidelines.',
        'Coordinated creative direction and audience engagement routines.',
        'Tracked reach, engagement quality, and audience growth trends.',
      ],
      strategyImplemented:
        'Replaced ad-hoc posting with structured weekly thematic pillars balancing educational value, brand storytelling, and direct inquiry prompts.',
      toolsUsed: ['Meta Business Suite', 'LinkedIn Campaign Tools', 'Content Calendar', 'Canva / Design Briefs'],
      resultsImpact: '[Add verified organic reach, engagement, or follower growth evidence here]',
      thumbnailKey: 'social',
      isTemplatePlaceholder: true,
    },
    {
      id: 'proj-seo-architecture',
      title: 'Technical & On-Page SEO Visibility Initiative',
      category: 'SEO Projects',
      industry: '[Add Client Industry — e.g., Technology / Regional Enterprise]',
      overview:
        'Editable case study template highlighting keyword intent mapping, on-page structure, and technical search optimization.',
      responsibilities: [
        'Performed keyword research and search-intent clustering for core service pages.',
        'Optimized title tags, meta descriptions, semantic headings, and internal links.',
        'Identified technical crawl bottlenecks and structured schema markup.',
      ],
      strategyImplemented:
        'Prioritized high-intent commercial keywords paired with clean semantic page hierarchy to improve search engine comprehension and organic click-through.',
      toolsUsed: ['Google Search Console', 'Keyword Research Tools', 'Technical Audit Checklist', 'Schema.org'],
      resultsImpact: '[Add verified search ranking improvements or organic traffic outcomes here]',
      thumbnailKey: 'seo',
      isTemplatePlaceholder: true,
    },
    {
      id: 'proj-paid-acquisition',
      title: 'Targeted Meta & Google Ads Acquisition Funnel',
      category: 'Paid Advertising',
      industry: '[Add Client Industry — e.g., Professional Services / Retail]',
      overview:
        'Editable case study template outlining paid media campaign structuring, audience segmentation, and continuous optimization.',
      responsibilities: [
        'Structured search and social ad groups aligned to distinct buyer intent stages.',
        'Wrote conversion-oriented ad copy variations for iterative A/B testing.',
        'Monitored spend efficiency, click behavior, and landing page alignment.',
      ],
      strategyImplemented:
        'Segmented cold awareness audiences from high-intent search and retargeting cohorts to focus budget on prospects most likely to convert.',
      toolsUsed: ['Google Ads', 'Meta Ads Manager', 'Conversion Tracking', 'Analytics Reporting'],
      resultsImpact: '[Add verified cost-per-lead, ROAS, or qualified traffic metrics here]',
      thumbnailKey: 'strategy',
      isTemplatePlaceholder: true,
    },
    {
      id: 'proj-brand-identity',
      title: 'Digital Brand Development & Messaging Refresh',
      category: 'Brand Development',
      industry: '[Add Client Industry — e.g., Emerging Startup / Consultancy]',
      overview:
        'Editable case study template illustrating how business strategy informs online brand identity, positioning, and digital voice.',
      responsibilities: [
        'Audited existing brand touchpoints for clarity and market differentiation.',
        'Developed core value proposition statements and audience-facing copy.',
        'Established consistent visual and verbal standards across digital profiles.',
      ],
      strategyImplemented:
        'Translated core business management strengths into clear, trustworthy messaging tailored to international decision-makers.',
      toolsUsed: ['Competitor Matrix', 'Brand Messaging Playbook', 'Web Copy Frameworks'],
      resultsImpact: '[Add verified brand recall, inquiry quality, or stakeholder feedback here]',
      thumbnailKey: 'social',
      isTemplatePlaceholder: true,
    },
    {
      id: 'proj-lead-funnel',
      title: 'B2B & Service Lead Generation Architecture',
      category: 'Lead Generation',
      industry: '[Add Client Industry — e.g., Agency / Local & International B2B]',
      overview:
        'Editable case study template focused on turning digital visibility into structured, high-intent business inquiries.',
      responsibilities: [
        'Mapped buyer friction points from initial ad click to contact submission.',
        'Redesigned inquiry form structure and service qualification prompts.',
        'Evaluated lead quality across organic and paid acquisition channels.',
      ],
      strategyImplemented:
        'Streamlined conversion pathways with clear service scoping, trust indicators, and direct communication options.',
      toolsUsed: ['Funnel Analytics', 'Landing Page Optimization', 'CRM / Inquiry Tracking'],
      resultsImpact: '[Add verified conversion rate or qualified inquiry metrics here]',
      thumbnailKey: 'seo',
      isTemplatePlaceholder: true,
    },
  ],
};
