export interface MegaMenuLink {
  title: string;
  href: string;
}

export interface MegaMenuCategory {
  heading: string;
  links: MegaMenuLink[];
}

export interface FeaturedCard {
  title: string;
  desc: string;
  image?: string;
}

export interface MegaMenuConfig {
  categories: MegaMenuCategory[];
  featured: {
    heading: string;
    cards: FeaturedCard[];
  };
  /** Map link title to featured content override */
  linkFeatured?: Record<string, { cards: FeaturedCard[] }>;
}

export const megaMenus: Record<string, MegaMenuConfig> = {
  Solutions: {
    categories: [
      {
        heading: "AI SERVICES",
        links: [
          { title: "Generative AI Strategy", href: "#" },
          { title: "LLM Integration", href: "#" },
          { title: "AI Product Design", href: "#" },
          { title: "Model Fine-Tuning", href: "#" },
          { title: "AI Audits", href: "#" },
          { title: "Enterprise AI", href: "#" },
        ],
      },
      {
        heading: "DATA & INFRASTRUCTURE",
        links: [
          { title: "Data Engineering", href: "#" },
          { title: "Data Pipelines", href: "#" },
          { title: "Cloud Architecture", href: "#" },
          { title: "MLOps", href: "#" },
          { title: "Data Governance", href: "#" },
        ],
      },
      {
        heading: "ADVISORY",
        links: [
          { title: "AI Readiness Assessment", href: "#" },
          { title: "Technology Roadmaps", href: "#" },
          { title: "Responsible AI", href: "#" },
          { title: "Vendor Selection", href: "#" },
        ],
      },
    ],
    featured: {
      heading: "FOR PROFESSIONALS",
      cards: [
        { title: "Attra for Enterprise", desc: "Scalable AI solutions for Fortune 500 companies", image: "explore-strategy" },
        { title: "Partner Program", desc: "Join our network of AI implementation partners", image: "explore-enterprise" },
      ],
    },
    linkFeatured: {
      "Generative AI Strategy": {
        cards: [
          { title: "Generative AI Strategy", desc: "Build a comprehensive generative AI roadmap for your organization", image: "explore-strategy" },
          { title: "Strategy Case Study", desc: "How we helped a Fortune 500 deploy generative AI at scale", image: "explore-enterprise" },
        ],
      },
      "LLM Integration": {
        cards: [
          { title: "LLM Integration", desc: "Seamlessly integrate large language models into your workflows", image: "explore-enterprise" },
          { title: "Integration Toolkit", desc: "Our proprietary tools for rapid LLM deployment", image: "explore-strategy" },
        ],
      },
      "Enterprise AI": {
        cards: [
          { title: "Enterprise AI Platform", desc: "End-to-end AI platform built for enterprise scale", image: "explore-enterprise" },
          { title: "Enterprise Case Study", desc: "10x productivity gains with our enterprise AI solution", image: "explore-strategy" },
        ],
      },
      "Cloud Architecture": {
        cards: [
          { title: "Cloud Architecture", desc: "Design scalable cloud infrastructure for AI workloads", image: "explore-strategy" },
          { title: "Architecture Guide", desc: "Best practices for cloud-native AI deployments", image: "explore-enterprise" },
        ],
      },
    },
  },
  Industries: {
    categories: [
      {
        heading: "SECTORS",
        links: [
          { title: "Financial Services", href: "#" },
          { title: "Healthcare", href: "#" },
          { title: "Government", href: "#" },
          { title: "Retail & E-Commerce", href: "#" },
          { title: "Manufacturing", href: "#" },
          { title: "Media & Entertainment", href: "#" },
        ],
      },
      {
        heading: "USE CASES",
        links: [
          { title: "Fraud Detection", href: "#" },
          { title: "Clinical NLP", href: "#" },
          { title: "Personalization", href: "#" },
          { title: "Demand Forecasting", href: "#" },
          { title: "Document Intelligence", href: "#" },
        ],
      },
      {
        heading: "COMPLIANCE",
        links: [
          { title: "HIPAA AI", href: "#" },
          { title: "SOC 2 AI", href: "#" },
          { title: "GDPR AI", href: "#" },
          { title: "FedRAMP AI", href: "#" },
        ],
      },
    ],
    featured: {
      heading: "FEATURED",
      cards: [
        { title: "AI in Healthcare", desc: "FDA-compliant AI systems for clinical environments", image: "explore-healthcare" },
        { title: "Case Study: 10x Lift", desc: "How we helped a Fortune 500 retailer deploy AI", image: "explore-enterprise" },
      ],
    },
    linkFeatured: {
      "Healthcare": {
        cards: [
          { title: "Healthcare AI", desc: "FDA-compliant AI for clinical decision support", image: "explore-healthcare" },
          { title: "Clinical NLP Suite", desc: "Extract insights from medical records at scale", image: "explore-insights" },
        ],
      },
      "Financial Services": {
        cards: [
          { title: "FinTech AI", desc: "AI-powered risk assessment and fraud prevention", image: "explore-strategy" },
          { title: "Trading Intelligence", desc: "Real-time market analysis with neural networks", image: "explore-enterprise" },
        ],
      },
    },
  },
  Insights: {
    categories: [
      {
        heading: "CONTENT",
        links: [
          { title: "Research Papers", href: "#" },
          { title: "Blog", href: "#" },
          { title: "Webinars", href: "#" },
          { title: "Podcasts", href: "#" },
          { title: "Newsletter", href: "#" },
        ],
      },
      {
        heading: "TOOLS",
        links: [
          { title: "AI Maturity Index", href: "#" },
          { title: "ROI Calculator", href: "#" },
          { title: "AI Use Case Library", href: "#" },
          { title: "Free Assessments", href: "#" },
        ],
      },
      {
        heading: "COMMUNITY",
        links: [
          { title: "Events", href: "#" },
          { title: "AI Leaders Forum", href: "#" },
          { title: "Open Source", href: "#" },
        ],
      },
    ],
    featured: {
      heading: "LATEST",
      cards: [
        { title: "2026 AI Outlook", desc: "Our annual report on the state of enterprise AI", image: "explore-insights" },
        { title: "AI Ethics Guide", desc: "A practical framework for responsible AI deployment", image: "explore-strategy" },
      ],
    },
    linkFeatured: {
      "Research Papers": {
        cards: [
          { title: "Latest Research", desc: "Cutting-edge papers from our AI research team", image: "explore-insights" },
          { title: "Open Publications", desc: "Peer-reviewed contributions to the AI community", image: "explore-strategy" },
        ],
      },
    },
  },
};

export const navLinks = ["Solutions", "Industries", "Insights"];
