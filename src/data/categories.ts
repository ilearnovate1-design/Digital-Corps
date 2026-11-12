import { QuizCategory } from '../types';

export const QUIZ_CATEGORIES: QuizCategory[] = [
  {
    id: 'ai_emerging_tech',
    name: 'AI & Emerging Technology',
    shortDesc: 'Prompt engineering, Gemini & LLMs, generative tools, computer vision, and responsible AI.',
    description: 'Test your practical understanding of prompting large language models, mitigating hallucinations, ethical AI guidelines, and deploying generative AI in everyday work.',
    iconName: 'BrainCircuit',
    instructions: 'You will answer 10 rapid-fire questions covering practical prompting, prompt structuring, AI hallucinations, and data privacy with generative models. 6/10 qualifies for camp leaderboard points.',
    active: true,
    questionCount: 30,
    durationMinutes: 5,
    durationSeconds: 300,
    qualificationThreshold: 6,
    associatedTrackId: 'track-ai-content',
    themeColor: 'emerald'
  },
  {
    id: 'career_employability',
    name: 'Career & Employability',
    shortDesc: 'ATS resume formatting, LinkedIn positioning, Upwork freelancing, and remote interviews.',
    description: 'Assess your readiness to win remote contracts, pass international applicant tracking systems (ATS), optimize professional digital profiles, and communicate in remote teams.',
    iconName: 'Briefcase',
    instructions: 'You will answer 10 questions on building recruiter-ready resumes, winning first freelance proposals, international remote workplace etiquette, and portfolio presentation.',
    active: true,
    questionCount: 30,
    durationMinutes: 5,
    durationSeconds: 300,
    qualificationThreshold: 6,
    associatedTrackId: 'track-remote-careers',
    themeColor: 'blue'
  },
  {
    id: 'digital_business_entrepreneurship',
    name: 'Digital Business & Entrepreneurship',
    shortDesc: 'WhatsApp Business, social commerce, e-commerce stores, digital payments, and CAC compliance.',
    description: 'Evaluate practical strategies for selling products online, running social media ads, integrating Nigerian fintech payments (Paystack, Flutterwave), and retaining customers.',
    iconName: 'TrendingUp',
    instructions: 'You will answer 10 questions covering social media storefronts, digital payment integration, customer conversion funnels, and small business growth strategies in Nigeria.',
    active: true,
    questionCount: 30,
    durationMinutes: 5,
    durationSeconds: 300,
    qualificationThreshold: 6,
    associatedTrackId: 'track-digital-design',
    themeColor: 'purple'
  },
  {
    id: 'digital_literacy_safety',
    name: 'Digital Literacy & Online Safety',
    shortDesc: 'Cyber hygiene, phishing & 419 scam detection, password managers, NDPR, and 2FA protection.',
    description: 'Verify your digital self-defense capabilities against bank phishing SMS, unauthorized SIM swap scams, social media account hijacking, and data privacy breaches.',
    iconName: 'ShieldCheck',
    instructions: 'You will answer 10 questions on spotting sophisticated scam tactics, configuring multi-factor authentication, protecting BVN/NIN credentials, and maintaining personal cyber hygiene.',
    active: true,
    questionCount: 30,
    durationMinutes: 5,
    durationSeconds: 300,
    qualificationThreshold: 6,
    associatedTrackId: 'track-ai-content',
    themeColor: 'amber'
  },
  {
    id: 'productivity_digital_tools',
    name: 'Productivity & Digital Tools',
    shortDesc: 'Google Workspace, Canva design, Notion organization, cloud storage, and async collaboration.',
    description: 'Demonstrate proficiency in Google Docs, Google Drive file sharing permissions, Canva mobile graphics, Trello task boards, and asynchronous team communication.',
    iconName: 'Zap',
    instructions: 'You will answer 10 questions covering cloud document collaboration, graphic layout basics, calendar scheduling across time zones, and daily workplace productivity.',
    active: true,
    questionCount: 30,
    durationMinutes: 5,
    durationSeconds: 300,
    qualificationThreshold: 6,
    associatedTrackId: 'track-virtual-assistant',
    themeColor: 'teal'
  },
  {
    id: 'data_digital_skills',
    name: 'Data & Digital Skills',
    shortDesc: 'Spreadsheets (Excel & Sheets), XLOOKUP, data cleaning, pivot tables, and chart dashboards.',
    description: 'Master practical numbers skills: calculating sums and percentages, cleaning messy phone number formats, building pivot tables, and visualizing trends with charts.',
    iconName: 'BarChart2',
    instructions: 'You will answer 10 questions covering essential spreadsheet formulas, data hygiene, attendance analysis, and clear visual presentation of numbers.',
    active: true,
    questionCount: 30,
    durationMinutes: 5,
    durationSeconds: 300,
    qualificationThreshold: 6,
    associatedTrackId: 'track-data-sheets',
    themeColor: 'rose'
  }
];

export function getCategoryById(id: string): QuizCategory | undefined {
  return QUIZ_CATEGORIES.find((c) => c.id === id);
}
