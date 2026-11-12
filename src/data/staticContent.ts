import { ToolkitResource } from '../types';

export const EVENT_INFO = {
  eventName: "Digital Corps Empowerment Initiative",
  edition: "Independent Digital Skills & AI Empowerment 2026",
  organizers: "Independent Digital Innovation Partners supporting NYSC Corps Members",
  overview: "A lightweight, mobile-first gateway designed to help serving corps members discover practical AI tools, career-ready tech tracks, and community problem-solving without heavy internet usage.",
  submissionDeadline: "Today at 17:00 WAT",
  isSubmissionsOpen: true,
};

export const PRIVACY_NOTICE = {
  title: "Digital Corps Hub Privacy & Data Protection Notice",
  effectiveDate: "Service Year 2026/2027",
  summary: "Digital Corps Hub is an independent platform supporting corps members' digital skills and community engagement. It is not an official NYSC platform, and participation records do not replace official NYSC CDS reporting, biometric attendance, or official clearance procedures.",
  dataController: "Digital Corps Hub Independent Tech Coordinators & Platform Administrators",
  contactEmail: "privacy@digitalcorpshub.ng",
  contactPhone: "+234 811 050 2600",
  keyPoints: [
    {
      heading: "Independent Platform Disclaimer",
      detail: "Digital Corps Hub is an independent initiative supporting corps members. It is NOT an official NYSC portal, and its records do NOT substitute for official NYSC CDS clearance, monthly biometric verification, or official reporting."
    },
    {
      heading: "Purpose of Processing",
      detail: "Participant data is collected solely to allocate platoon challenge entries, rank challenge quiz results, and facilitate voluntary skill track follow-ups and learning roadmaps."
    },
    {
      heading: "Who Manages Your Data",
      detail: "Records are stored in a dedicated, secured Google Cloud Firestore database managed by authorized independent platform administrators."
    },
    {
      heading: "Strict PII Minimization",
      detail: "We only collect necessary registration details (full name, phone/WhatsApp number, email address, NYSC state code, and camp platoon). We NEVER request or store BVN, NIN, banking credentials, passwords, OTPs, or sensitive financial information."
    },
    {
      heading: "Independent & Granular Consent",
      detail: "Consent to join state peer WhatsApp channels and consent to receive future opportunity announcements are separate checkboxes. Both start unchecked by default. Opting out never restricts access to educational toolkits or challenge briefs."
    },
    {
      heading: "How to Request Deletion or Correction",
      detail: "You may request correction or complete removal of your record at any time by emailing privacy@digitalcorpshub.ng or contacting the Help Desk at 08110502600 with your State Code or Registration Pass Code."
    },
    {
      heading: "Secure Architecture & Offline Accessibility",
      detail: "Participant contact information is protected behind strict security rules. All learning tracks, starter toolkit prompt packs, and guides are cached locally in the web application, minimizing mobile data consumption."
    }
  ]
};

// 5. DIGITAL CORPS STARTER TOOLKIT: 7 Locally Stored Resources
export const STARTER_TOOLKIT: ToolkitResource[] = [
  {
    id: 'toolkit-prompts',
    title: 'Useful AI Prompts for NYSC Corpers',
    category: 'prompts',
    shortDesc: 'General-purpose productivity prompts tailored for Nigerian school teachers, administrative interns, and community workers.',
    copyableContent: `=== GENERAL AI PRODUCTIVITY PROMPTS ===

1. FAST LOCAL TRANSLATION & DIALECT SIMPLIFICATION:
"Act as an educational linguist in Nigeria. Simplify this complex health advisory into clear, friendly Pidgin English suitable for WhatsApp voice broadcast to rural market traders: [PASTE TEXT HERE]"

2. PPA WEEKLY ACTIVITY SUMMARY:
"I am an NYSC corps member serving as [ROLE] at [ORGANIZATION]. Here are my notes from this week: [PASTE BULLETS]. Format these into a formal 4-bullet weekly accomplishment log for my supervisor."

3. SECONDARY SCHOOL LESSON PLAN GENERATOR:
"You are a Nigerian secondary school teacher following the NERDC syllabus. Create a 40-minute interactive lesson plan for [CLASS, e.g. SS1] on [TOPIC]. Include: 1 relatable everyday Nigerian example, 3 core teaching points, 2 class questions, and 1 homework question."

4. COMMUNITY NEEDS ASSESSMENT SURVEY:
"Generate 5 clear, culturally respectful survey questions to ask youth leaders in a rural host community regarding solar street lighting and security."`,
    actionChecklist: [
      'Copy prompt into Gemini or ChatGPT',
      'Replace bracketed placeholders with your specific PPA context',
      'Review output for local cultural appropriateness'
    ]
  },
  {
    id: 'toolkit-cv-cover-letter',
    title: 'CV and Cover-Letter Prompts',
    category: 'career',
    shortDesc: 'ATS-tailored prompts to transform academic projects and NYSC PPA duties into compelling graduate job applications.',
    copyableContent: `=== CV & COVER LETTER REFINEMENT PROMPTS ===

1. CONVERTING PPA DUTIES INTO HIGH-IMPACT BULLETS:
"I graduated with a degree in [YOUR DEGREE] and am serving in NYSC at [PPA TYPE, e.g. public secondary school / accounting firm]. 
Rewrite these basic responsibilities into 3 strong, metric-driven CV bullet points starting with strong action verbs:
- Taught math to 90 students
- Recorded student marks in Excel
- Helped organize sports day"

2. TAILORED COVER LETTER FOR NIGERIAN GRADUATE TRAINEE:
"Act as a professional career coach in Lagos. Write a concise 3-paragraph graduate trainee cover letter for [COMPANY NAME] for the role of [ROLE NAME]. Highlight my analytical mindset, adaptability demonstrated during NYSC service in [STATE], and enthusiasm for continuous learning. Keep it under 250 words and avoid clichés like 'I am thrilled to apply'."

3. IDENTIFYING ATS KEYWORD GAPS:
"Compare my CV: [PASTE YOUR CV] against this job advert: [PASTE JOB DESCRIPTION]. List the top 5 missing technical keywords and recommend where to naturally incorporate them."`,
    actionChecklist: [
      'Include your actual NYSC State Code and degree',
      'Keep your final resume to exactly 1 page',
      'Export as PDF named: FirstName_Surname_CV.pdf'
    ]
  },
  {
    id: 'toolkit-interview-prep',
    title: 'Interview Preparation Toolkit',
    category: 'career',
    shortDesc: 'Simulate realistic behavioral and technical interview questions for Nigerian corporate and remote tech roles.',
    copyableContent: `=== INTERVIEW SIMULATOR PROMPTS ===

1. MOCK INTERVIEWER PROMPT:
"Act as a senior hiring manager at a leading Nigerian fintech. I am an NYSC corps member applying for an entry-level [ROLE: e.g. Junior Data Analyst / Operations Associate]. Ask me 1 behavioral question using the STAR technique (Situation, Task, Action, Result). Wait for my answer, provide constructive feedback, and then ask the next question."

2. ANSWERING THE "TELL ME ABOUT YOURSELF" QUESTION:
"Help me structure a 90-second answer to 'Tell me about yourself'. 
My background:
- Degree: [YOUR COURSE, e.g., Economics]
- Current role: NYSC Graduate Intern at [PPA]
- Key digital skills learned: [e.g. Google Sheets, Python basics, Canva]
- Career goal: [e.g., Tech sales / Business analysis in Lagos]
Deliver a natural, confident script with clear transition markers."

3. QUESTIONS TO ASK THE INTERVIEWER AT THE END:
"Generate 3 smart, memorable questions an applicant should ask a Nigerian tech company interviewer that show high engagement with their product and work culture."`,
    actionChecklist: [
      'Practice answering out loud using your phone voice recorder',
      'Structure every story using STAR: Situation, Task, Action, Result',
      'Research the company products on Google before the call'
    ]
  },
  {
    id: 'toolkit-business-ideas',
    title: 'Business Idea Generation & Validation',
    category: 'business',
    shortDesc: 'Brainstorm low-capital SAED venture concepts and digital micro-services that generate income during service year.',
    copyableContent: `=== MICRO-BUSINESS GENERATOR PROMPTS ===

1. LOW-CAPITAL LOCAL COMMUNITY BUSINESS:
"I am an NYSC corps member serving in [CITY / TOWN, STATE]. I have N30,000 to N50,000 starter capital. Suggest 3 ethical micro-business ideas that solve an everyday problem for residents, teachers, or corps members. For each idea include: estimated startup costs, weekly revenue potential, and required tools."

2. DIGITAL SERVICE MONETIZATION IN CAMP / PPA:
"I know how to use Canva and Google Sheets. List 4 specific digital services I can offer to local schools, supermarkets, pharmacies, or fellow corpers for N5,000 to N15,000 per job."

3. VALUE PROPOSITION & WHATSAPP PITCH:
"Draft a warm, persuasive 4-sentence WhatsApp pitch offering digital bookkeeping setup to small shop owners in my host community. Emphasize how it stops stock leakages and simplifies profit calculations."`,
    actionChecklist: [
      'Validate your idea with at least 5 potential customers before spending capital',
      'Keep operating overhead near zero by using free mobile tools',
      'Separate personal allawee from business cash flows'
    ]
  },
  {
    id: 'toolkit-portfolio-checklist',
    title: 'Digital Portfolio Checklist',
    category: 'career',
    shortDesc: 'A step-by-step checklist to showcase tangible evidence of your skills without paying for expensive domain hosting.',
    copyableContent: `=== PORTFOLIO SETUP CHECKLIST ===

1. PLATFORM SELECTION (100% FREE):
[ ] Google Drive Folder: Set to 'Anyone with the link can view'.
[ ] GitHub Pages or Notion Page: For web projects and case studies.
[ ] Behance / Canva Portfolio: For graphic design and social media creative work.

2. ESSENTIAL ARTIFACTS TO INCLUDE:
[ ] Project 1: A spreadsheet dashboard solving an inventory or budgeting problem.
[ ] Project 2: A 5-slide CDS sponsorship deck or business proposal.
[ ] Project 3: A content sample (article, newsletter, or educational prompt guide).

3. CASE STUDY FORMAT:
- Context: What was the problem and who was the user?
- Tools: Which software or AI tools were used?
- Outcome: What measurable result was achieved? (e.g. Saved 3 hours weekly).

4. LINK SHARING ETIQUETTE:
- Shorten links using clean naming (e.g., bit.ly/FirstName-Portfolio).
- Test opening the link in an incognito window to verify public view permissions.`,
    actionChecklist: [
      'Create 1 Google Drive portfolio folder with 3 sample work files',
      'Add the link to your resume header and LinkedIn profile',
      'Verify mobile responsiveness on your phone browser'
    ]
  },
  {
    id: 'toolkit-30-day-plan',
    title: '30-Day Digital Skill Action Plan',
    category: 'plan',
    shortDesc: 'A structured daily roadmap balancing PPA teaching/office duties with 45 minutes of self-paced digital skill mastery.',
    copyableContent: `=== 30-DAY NYSC DIGITAL SKILL ROADMAP ===

WEEK 1 (DAYS 1–7): FOUNDATIONS & TOOL SETUP
- Day 1-2: Pick 1 learning track (Spreadsheets, AI Content, Design, or VA).
- Day 3-4: Set up dedicated Google Drive folder and bookmark documentation.
- Day 5-7: Complete 3 introductory video lessons and take clean notes.

WEEK 2 (DAYS 8–14): GUIDED PRACTICE
- Day 8-10: Recreate 2 professional sample templates from scratch.
- Day 11-12: Test prompt variations on Gemini to solve sample problems.
- Day 13-14: Document your roadblocks and review free cheat sheets.

WEEK 3 (DAYS 15–21): FIRST PRACTICAL MINI-PROJECT
- Day 15-18: Build a real project for your PPA, CDS group, or platoon.
- Day 19-21: Gather feedback from 2 fellow corps members and refine.

WEEK 4 (DAYS 22–30): PORTFOLIO & VISIBILITY
- Day 22-25: Write a 1-page case study summarizing your mini-project.
- Day 26-28: Upload project to portfolio and update resume / LinkedIn.
- Day 29-30: Share your learning reflection on LinkedIn or peer tech channel.`,
    actionChecklist: [
      'Dedicate 45 minutes every evening after PPA duties',
      'Download learning videos during off-peak night data bundles',
      'Pair up with a platoon study partner for weekly accountability'
    ]
  },
  {
    id: 'toolkit-fraud-awareness',
    title: 'Online Scam and Fraud Awareness Guide',
    category: 'security',
    shortDesc: 'Essential defense protocols protecting corps members from fake job offers, phishing links, and Mami market scams.',
    copyableContent: `=== SECURITY & ANTI-FRAUD PROTOCOL ===

1. RED FLAGS IN NYSC PPA & JOB ADVERTS:
- Any employer asking you to pay money for "registration", "interview processing", "uniforms", or "aptitude test". Genuine employers NEVER ask candidates to pay!
- Offers promising N200,000+ monthly for "typing words" or "viewing ads" with no interview.
- Requests for your bank OTP, debit card PIN, or internet banking password.

2. SAFE BANKING HABITS IN CAMP:
- Never disclose your BVN or NIN to unofficial agents under canopies without NYSC staff presence.
- Legitimate bank account opening requires zero upfront cash deposits.
- Set up SMS/Email transaction alerts and use official mobile banking apps only on your personal smartphone.

3. PHONE & DATA SECURITY:
- Turn on 2-Factor Authentication (2FA) on your Google account and WhatsApp.
- Avoid logging into personal email on shared cybercafe computers in town.
- If you lose your phone, block your SIM card immediately via your telecom network provider.`,
    actionChecklist: [
      'Enable 2-Step Verification in WhatsApp Settings -> Account',
      'Never share an SMS verification code with anyone over phone or text',
      'Report suspected scam postings to your Camp Director or LGI'
    ]
  }
];

export const AI_CHALLENGE_DETAILS = {
  theme: "AI for Community Impact: Solving Local Challenges in Nigeria",
  overview: "Use practical AI tools to design a realistic, low-cost solution to an everyday challenge experienced by Nigerian youths or rural host communities in sectors such as agriculture, primary health, literacy, SME trade, or safety.",
  rules: [
    "Teams must consist of 1 to 5 serving corps members (or solo participants).",
    "Solutions must be executable with basic mobile phones, SMS/WhatsApp, or low-cost tools.",
    "Proposals must include a realistic 30-day action plan that can be piloted in an LGA.",
    "No paid software required: all solutions must leverage free or open-source tiers.",
    "Plagiarism is strictly prohibited: AI can assist your planning, but your local community context must be genuine."
  ],
  actionPlanRequirement: "Every submission must specify a 30-Day Action Plan outlining: Week 1 stakeholder engagement, Week 2 tool setup, Week 3 community pilot, and Week 4 impact measurement.",
  rubric: [
    { criteria: "Relevance & Need", weight: "30%", detail: "Does this address a real Nigerian community or youth hardship?" },
    { criteria: "Practical Feasibility", weight: "30%", detail: "Can it be executed under N50,000 budget on basic Android phones?" },
    { criteria: "Use of AI", weight: "20%", detail: "Smart application of prompt engineering, automated workflows, or language translation." },
    { criteria: "30-Day Action Plan", weight: "20%", detail: "Clarity and realism of the 4-week rollout roadmap." }
  ],
  examplePrompt: `"Act as a social impact technologist in Nigeria. Smallholder tomato farmers in our host community lose 30% of their yield to pest rot and lack weather advice in Hausa.
Help us design an SMS and WhatsApp advisory workflow using Gemini 2.5 Flash:
1. Draft 3 prompt templates that convert technical pest guidelines into simple Hausa/Pidgin tips.
2. Outline a 30-day pilot roadmap to reach 50 farmers through local cooperative leaders.
3. List minimal tools required (total budget under N40,000)."`
};
