import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS_BANK: QuizQuestion[] = [
  // 1. Practical AI Literacy
  {
    id: 'q-ai-1',
    category: 'ai_literacy',
    categoryLabel: 'Practical AI Literacy',
    question: 'When asking an AI tool like Google Gemini or ChatGPT to write an official letter for your PPA, what is the best prompting technique?',
    options: [
      'Type "write a letter" and let the AI guess all the details',
      'Give clear context: state your role, the recipient, the objective, key facts, and desired tone',
      'Paste entire sensitive confidential office files and ask for a summary',
      'Use single-word prompts repeatedly until it produces what you need'
    ],
    correctIndex: 1,
    explanation: 'Providing context (Role + Goal + Constraints + Tone) gives precise, usable outputs and saves you editing time.'
  },
  {
    id: 'q-ai-2',
    category: 'ai_literacy',
    categoryLabel: 'Practical AI Literacy',
    question: 'What is an "AI hallucination" when working with Large Language Models (LLMs)?',
    options: [
      'When your phone battery drains quickly during an AI query',
      'When an AI generates convincing-sounding information, citations, or facts that are completely made up',
      'When an AI model refuses to answer a question due to slow internet',
      'When the screen brightness changes automatically while using a chatbot'
    ],
    correctIndex: 1,
    explanation: 'LLMs predict word patterns and can confidently state false facts or fake case law. Always fact-check critical information.'
  },
  {
    id: 'q-ai-3',
    category: 'ai_literacy',
    categoryLabel: 'Practical AI Literacy',
    question: 'Which of the following is a safe and high-leverage way for an NYSC teacher or intern to use AI at their PPA?',
    options: [
      'Generating lesson plans, quiz ideas, and creative classroom analogies for students',
      'Letting the AI automatically grade student exam scripts without any human review',
      'Submitting AI-generated reports to school principals without reading them first',
      'Uploading student names and private contact numbers into an unverified third-party app'
    ],
    correctIndex: 0,
    explanation: 'AI excels as a teaching assistant for brainstorms, lesson outlines, and worksheet templates, but a human must always review the work.'
  },
  {
    id: 'q-ai-4',
    category: 'ai_literacy',
    categoryLabel: 'Practical AI Literacy',
    question: 'How can you best prevent an AI tool from generating generic, robotic-sounding text?',
    options: [
      'Ask the AI to "write faster"',
      'Provide a few real sample sentences in the prompt and specify your exact target audience and tone',
      'Repeat the exact same prompt five times in a row',
      'Only use paid versions of every AI software'
    ],
    correctIndex: 1,
    explanation: 'Few-shot prompting (providing examples of your preferred style and tone) guides the model to mimic your exact voice.'
  },

  // 2. Responsible AI Use & Data Ethics
  {
    id: 'q-ethics-1',
    category: 'responsible_ai',
    categoryLabel: 'Responsible AI Use',
    question: 'Why should you NEVER paste personal details like BVN, NIN, bank account numbers, or client passwords into public AI chatbots?',
    options: [
      'It slows down your phone internet data connection',
      'Public models may log conversations for model training or expose data through security vulnerabilities',
      'AI tools automatically charge your bank account when they see a BVN',
      'The chatbot will automatically shut down your phone'
    ],
    correctIndex: 1,
    explanation: 'Never enter confidential data, BVN, NIN, or passwords into public LLMs. Treat public AI inputs like public noticeboards.'
  },
  {
    id: 'q-ethics-2',
    category: 'responsible_ai',
    categoryLabel: 'Responsible AI Use',
    question: 'If you use AI to draft a Community Development Service (CDS) proposal, what is your ethical responsibility before submitting to NYSC coordinators?',
    options: [
      'Submit it immediately without verification to beat the deadline',
      'Claim the entire text was written by an international consultant',
      'Review every budget figure, verify local community facts, and ensure the plan is practically feasible',
      'Add watermarks of third-party AI companies to make it look official'
    ],
    correctIndex: 2,
    explanation: 'You remain 100% accountable for the proposals and plans you submit. You must verify facts, budgets, and feasibility.'
  },

  // 3. Digital Safety & Cyber Hygiene
  {
    id: 'q-safety-1',
    category: 'digital_safety',
    categoryLabel: 'Digital Safety',
    question: 'What is the most secure method to safeguard your email, NYSC dashboard, and WhatsApp accounts against takeover?',
    options: [
      'Using your birth year or surname as the password so you never forget it',
      'Enabling Two-Factor Authentication (2FA) using an authenticator app or distinct PIN',
      'Sharing your login details with platoon friends for safe keeping',
      'Leaving your browser logged in on camp cyber-café computers'
    ],
    correctIndex: 1,
    explanation: '2FA adds a critical second barrier. Even if someone steals your password, they cannot access your account without your second factor.'
  },
  {
    id: 'q-safety-2',
    category: 'digital_safety',
    categoryLabel: 'Digital Safety',
    question: 'While connected to open, unencrypted public Wi-Fi at camp or an event hall, which activity carries the HIGHEST security risk?',
    options: [
      'Reading public news websites with standard HTTPS',
      'Checking sports scores without logging in',
      'Logging into mobile banking or entering debit card details on unverified connections',
      'Viewing static educational PDF documents'
    ],
    correctIndex: 2,
    explanation: 'Rogue hotspots can intercept network traffic. Avoid financial transactions and sensitive logins over unsecured public Wi-Fi.'
  },
  {
    id: 'q-safety-3',
    category: 'digital_safety',
    categoryLabel: 'Digital Safety',
    question: 'What should you do if a stranger or acquaintance asks you to "forward the 6-digit WhatsApp code sent to your phone"?',
    options: [
      'Send it immediately to be polite and helpful',
      'Never send it! That 6-digit code is the registration verification code that allows them to hijack your WhatsApp account',
      'Post the 6-digit code on your WhatsApp status',
      'Send only the first 3 digits'
    ],
    correctIndex: 1,
    explanation: 'Never share SMS verification codes with anyone. WhatsApp SMS codes are used exclusively by fraudsters to take over your account.'
  },

  // 4. Online Scams & Nigerian Context
  {
    id: 'q-scam-1',
    category: 'online_scams',
    categoryLabel: 'Online Scams & Fraud Defense',
    question: 'You receive an urgent WhatsApp message with a link claiming: "Federal Govt ₦50,000 Special NYSC Camp Allowance Approved! Click here now to claim before portal closes today." What is the correct action?',
    options: [
      'Click immediately and input your BVN and ATM card PIN to receive the money',
      'Forward the message to all your platoon WhatsApp groups so others can benefit',
      'Recognize it as phishing, do not click or enter details, and verify only on the official NYSC portal (nysc.org.ng)',
      'Reply to the message with your phone number and state code'
    ],
    correctIndex: 2,
    explanation: 'Phishing scams exploit urgency and free money claims. NYSC and government agencies communicate through official channels, never via random viral links.'
  },
  {
    id: 'q-scam-2',
    category: 'online_scams',
    categoryLabel: 'Online Scams & Fraud Defense',
    question: 'An unknown Facebook account messages you: "Guaranteed relocation to Lagos/Abuja for ₦25,000. Send payment to this private account now." How should you handle this?',
    options: [
      'Negotiate the price down to ₦15,000 and send half upfront',
      'Recognize this as a classic relocation scam; official NYSC redeployment is handled strictly through the official portal with zero unofficial cash payments',
      'Send your call-up letter and state code to their DM',
      'Tell them to relocate your whole squad together'
    ],
    correctIndex: 1,
    explanation: 'Fake redeployment schemes scam hundreds of unsuspecting corps members every year. Official NYSC procedures never require private payments.'
  },
  {
    id: 'q-scam-3',
    category: 'online_scams',
    categoryLabel: 'Online Scams & Fraud Defense',
    question: 'Which of the following is a red flag indicating a remote job or freelance offer is fraudulent?',
    options: [
      'The client asks for a portfolio or samples of your previous work',
      'The client asks you to pay a "registration fee", "laptop clearance fee", or "security deposit" before starting work',
      'The client schedules an interview over Google Meet or Zoom',
      'The client provides a clear scope of work and contract'
    ],
    correctIndex: 1,
    explanation: 'Legitimate employers and freelance clients PAY you for work; they never require you to pay upfront fees to get hired.'
  },

  // 5. Productivity Tools
  {
    id: 'q-prod-1',
    category: 'productivity',
    categoryLabel: 'Productivity Tools',
    question: 'Which free Google Workspace tool is best suited for collaborating live with fellow corps members on a platoon presentation in real time?',
    options: [
      'Google Slides with shared view/edit permissions',
      'Sending 20 different versions of a PowerPoint file via Bluetooth',
      'Writing the whole presentation on WhatsApp status',
      'Taking photos of handwritten notes on paper'
    ],
    correctIndex: 0,
    explanation: 'Cloud tools like Google Slides and Google Docs enable multiple team members to edit simultaneously and save versions automatically.'
  },
  {
    id: 'q-prod-2',
    category: 'productivity',
    categoryLabel: 'Productivity Tools',
    question: 'If you want to quickly clean and calculate monthly attendance or allowance figures in Google Sheets or Excel, which formula combination is most efficient?',
    options: [
      'Manually adding every row with a handheld calculator',
      'Using SUM, AVERAGE, and basic conditional formulas like COUNTIF / SUMIFS',
      'Converting all cells to emojis',
      'Writing a 10-page text essay in cell A1'
    ],
    correctIndex: 1,
    explanation: 'Formulas like SUM and COUNTIF automate arithmetic and condition-checking across thousands of rows in seconds.'
  },

  // 6. Digital Careers & Freelancing
  {
    id: 'q-career-1',
    category: 'digital_careers',
    categoryLabel: 'Digital Careers & Freelancing',
    question: 'What is the most convincing asset a corps member can build during their service year to land remote digital clients or tech jobs?',
    options: [
      'A generic CV that says "hardworking individual who can do anything"',
      'A tangible public portfolio showing 3 to 5 real projects (e.g. sample designs, cleaned datasets, or written articles)',
      'A collection of 50 participation certificates without any proof of work',
      'A long social media bio with buzzwords like "Guru" and "Ninja"'
    ],
    correctIndex: 1,
    explanation: 'Clients and employers care about proof of competence. A concrete portfolio showing actual solved problems beats generic claims every time.'
  },
  {
    id: 'q-career-2',
    category: 'digital_careers',
    categoryLabel: 'Digital Careers & Freelancing',
    question: 'How can a corps member serving in a rural or semi-urban community turn their digital skills into immediate community income?',
    options: [
      'Waiting until the service year ends before learning any practical tool',
      'Helping local small businesses, schools, or clinics set up Google Business profiles, social media flyers, and basic record keeping',
      'Complaining about poor electricity without seeking power bank / local hub alternatives',
      'Paying unverified agencies to write their CV'
    ],
    correctIndex: 1,
    explanation: 'Micro-digitization of local businesses (Google Maps listings, Canva designs, bookkeeping) creates immediate local value and freelancing income.'
  }
];

/**
 * Returns a randomized 10-question round ensuring representation from all core topics.
 */
export function getQuizRound(totalQuestions: number = 10): QuizQuestion[] {
  // Ensure we include questions from diverse categories
  const categories: QuizQuestion['category'][] = [
    'ai_literacy',
    'responsible_ai',
    'digital_safety',
    'online_scams',
    'productivity',
    'digital_careers'
  ];

  const pool = [...QUIZ_QUESTIONS_BANK];
  // Shuffle the pool using Fisher-Yates
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  // Pick balanced questions
  const selected: QuizQuestion[] = [];
  const usedIds = new Set<string>();

  // Ensure at least one from each major category if available
  for (const cat of categories) {
    const match = pool.find((q) => q.category === cat && !usedIds.has(q.id));
    if (match) {
      selected.push(match);
      usedIds.add(match.id);
    }
  }

  // Fill up the rest up to totalQuestions
  for (const q of pool) {
    if (selected.length >= totalQuestions) break;
    if (!usedIds.has(q.id)) {
      selected.push(q);
      usedIds.add(q.id);
    }
  }

  // Shuffle selected questions so order is randomized
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  return selected.slice(0, totalQuestions);
}
