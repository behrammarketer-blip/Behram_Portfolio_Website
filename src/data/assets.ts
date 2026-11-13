import educationCampusImg from '../assets/images/education_kiu_visual_1794575928831.jpg';
import projectStrategyImg from '../assets/images/project_strategy_analytics_1794575929151.jpg';
import projectSocialImg from '../assets/images/project_social_brand_1794575929492.jpg';
import projectSeoImg from '../assets/images/project_seo_performance_1794575929631.jpg';

export const PORTFOLIO_ASSETS = {
  portrait: '/assets/aistudio/Behram_Shah__Digital_Marketing_Strategist_e47781c7.png',
  education: educationCampusImg,
  thumbnails: {
    strategy: projectStrategyImg,
    social: projectSocialImg,
    seo: projectSeoImg,
  },
} as const;
