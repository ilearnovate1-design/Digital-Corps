import { AcademyCourse } from '../../types';
import { GROW_BUSINESS_MODULES_1_TO_3 } from './growBusinessModules1to3';
import { GROW_BUSINESS_MODULES_4_TO_6 } from './growBusinessModules4to6';

export const COURSE_GROW_YOUR_BUSINESS_ONLINE: AcademyCourse = {
  courseId: 'grow-your-business-online',
  categoryId: 'digital_business_entrepreneurship',
  title: 'Grow Your Business Online',
  subtitle: 'Practical Digital Marketing, Customer Acquisition and Online Business Growth.',
  description:
    'This practical course teaches entrepreneurs, small business owners, freelancers, aspiring business owners and young professionals how to establish a strong online presence, promote products and services, attract potential customers, convert enquiries into sales and grow a sustainable business using digital tools.',
  difficulty: 'Beginner to Intermediate',
  targetAudience:
    'Entrepreneurs, small business owners, freelancers, aspiring business owners, NYSC corps members, and young professionals looking to build and scale a digital customer acquisition and sales engine.',
  entryRequirements:
    'A smartphone or computer with internet access, an active email address, and readiness to build or promote a real or proposed product or service.',
  requirements: [
    'An Android/iOS smartphone or laptop with basic internet connectivity',
    'An active personal or business email address (Gmail recommended)',
    'A real or proposed product, skill, or service you want to market online',
    'Willingness to complete practical weekly exercises and the final launch capstone'
  ],
  expectedDuration: '3–4 Weeks',
  themeColor: 'rose',
  iconName: 'Rocket',
  active: true,
  version: '2026.1',
  learningObjectives: [
    {
      id: 'GYB-FND-01',
      code: 'GYB-FND-01',
      title: 'Online Business Foundation & Value Proposition',
      description:
        'Define an online business model, craft clear Nigerian customer personas, and articulate a trustworthy value proposition and brand identity.'
    },
    {
      id: 'GYB-PRS-02',
      code: 'GYB-PRS-02',
      title: 'Professional Digital Presence & Discoverability',
      description:
        'Set up optimised social media business profiles, WhatsApp Business catalogues & automation tools, and Google Business Profile / local discovery channels.'
    },
    {
      id: 'GYB-CNT-03',
      code: 'GYB-CNT-03',
      title: 'Content Creation & Editorial Planning',
      description:
        'Design persuasive graphics and short-form content with Canva and responsible AI prompting, organized into a 7-day social media content calendar.'
    },
    {
      id: 'GYB-ACQ-04',
      code: 'GYB-ACQ-04',
      title: 'Customer Acquisition & Targeted Promotion',
      description:
        'Attract prospective buyers using organic social SEO, community partnerships, micro-influencer collaborations, and beginner-safe Meta ad planning.'
    },
    {
      id: 'GYB-CNV-05',
      code: 'GYB-CNV-05',
      title: 'Lead Conversion, Digital Payments & Retention',
      description:
        'Qualify customer enquiries, collect verified digital payments safely, manage order fulfilment, handle complaints gracefully, and protect customer data.'
    },
    {
      id: 'GYB-SCL-06',
      code: 'GYB-SCL-06',
      title: 'Performance Analytics & Sustainable Scaling',
      description:
        'Track core revenue, conversion, and net profit metrics weekly, run simple marketing optimisation tests, and execute a 90-day growth roadmap.'
    }
  ],
  modules: [...GROW_BUSINESS_MODULES_1_TO_3, ...GROW_BUSINESS_MODULES_4_TO_6],
  capstoneProject: {
    title: 'BUILD AND LAUNCH YOUR ONLINE BUSINESS',
    overview:
      'Bring together everything learned across Modules 1–6 by designing and launching a complete, market-ready digital marketing and sales launch kit for your real or proposed Nigerian business, product, or freelance service.',
    deliverables: [
      '1. Business Profile & Value Proposition',
      '2. Customer Persona',
      '3. Digital Channels Setup Evidence (Facebook/Instagram + WhatsApp Business + Google Business Profile or suitable alternative)',
      '4. Social Media Content Samples (at least 5 promotional designs/posts)',
      '5. 7-Day Content Calendar',
      '6. Customer Acquisition Campaign Plan (organic, referral, influencer, or paid)',
      '7. Sales Conversion Script & Order Management Template',
      '8. Payment & Delivery Plan',
      '9. Weekly Performance Tracking Sheet',
      '10. 90-Day Online Growth Plan',
      '11. Supporting Links & Uploaded Materials',
      '12. Final Capstone Submission Summary'
    ],
    instructions: [
      'Select one concrete product business, food/catering brand, agribusiness, local service, or freelance digital skill as your Capstone venture.',
      'Document your one-page Business Profile, Value Proposition, and primary Customer Persona (from Module 1).',
      'Provide links or evidence of your optimised Social Media Business Page, WhatsApp Business profile/catalogue, and Google Business Profile (or explain your verified service-area/online discovery setup if you lack an eligible storefront).',
      'Attach or link at least 5 promotional graphics/posts plus your 7-Day Content Calendar covering balanced content pillars (Module 3).',
      'Include your Customer Acquisition Campaign Plan with budget/channel rationale (Module 4), your WhatsApp Sales Script, Payment Verification & Order Management template (Module 5), and your Weekly Performance Sheet + 90-Day Growth Plan (Module 6).',
      'Save drafts at any time as you progress through the modules, review all 12 checklist items, and submit for Coordinator/Admin rubric review.'
    ],
    assessmentCriteria: [
      'Clarity of Business Foundation & Target Audience (15%)',
      'Digital Presence Quality (15%)',
      'Content & Creative Quality (15%)',
      'Customer Acquisition Strategy (15%)',
      'Sales Conversion & Customer Workflow (15%)',
      'Performance Tracking Plan (10%)',
      'Practicality & Completeness (15%)'
    ],
    rubric: [
      {
        id: 'rub_foundation',
        criterion: 'Clarity of Business Foundation & Target Audience',
        description:
          'Clear business profile, well-defined Nigerian customer persona, transparent Naira pricing, and distinct value proposition.',
        weight: 15
      },
      {
        id: 'rub_presence',
        criterion: 'Digital Presence Quality',
        description:
          'Optimised social media bio/CTA, WhatsApp Business catalogue & automated greeting/quick replies, and Google Business Profile or viable online discovery alternative.',
        weight: 15
      },
      {
        id: 'rub_content',
        criterion: 'Content & Creative Quality',
        description:
          'At least 5 clean, readable promotional samples and a realistic 7-day content calendar balanced across pillars with strong CTAs.',
        weight: 15
      },
      {
        id: 'rub_acquisition',
        criterion: 'Customer Acquisition Strategy',
        description:
          'Practical organic, partnership, micro-influencer, or Meta ad campaign matched to realistic budget, target location, and unit economics.',
        weight: 15
      },
      {
        id: 'rub_conversion',
        criterion: 'Sales Conversion & Customer Workflow',
        description:
          'Structured enquiry-to-order script, fake-alert-safe payment verification, order tracking template, delivery plan, and after-sales privacy/retention workflow.',
        weight: 15
      },
      {
        id: 'rub_tracking',
        criterion: 'Performance Tracking Plan',
        description:
          'Working weekly KPI tracking table capturing reach, enquiries, conversion rate, revenue, costs, and net profit.',
        weight: 10
      },
      {
        id: 'rub_completeness',
        criterion: 'Practicality & Completeness',
        description:
          'All 12 deliverables addressed coherently with realistic 90-day milestones, supporting links, and evidence ready for real market execution.',
        weight: 15
      }
    ],
    submissionGuidelines:
      'Submit your structured Capstone workspace inside the Academy portal with supporting Google Drive / Canva / social links and optional file/screenshot attachments. Drafts are saved automatically and can be updated if an Admin requests revisions.'
  },
  finalAssessment: [
    // Module 1 (4 questions)
    {
      id: 'fa_gyb_01',
      moduleId: 'mod_gyb_1',
      relatedLessonId: 'lesson_gyb_1_1',
      questionText:
        'A fresh graduate in Enugu wants to launch a healthy packed-lunch business with limited capital (₦85,000). Which online business approach best protects cash flow and reduces spoilage?',
      options: [
        'Spend ₦80,000 renting a shop first and cook 50 plates daily hoping walk-ins appear',
        'Operate a scheduled WhatsApp pre-order menu where customers book and pay deposits before cooking begins',
        'Post random photos once a month without stating prices or delivery times',
        'Wait until she saves ₦2,000,000 before taking a single customer order'
      ],
      correctAnswer: 1,
      explanation:
        'A scheduled WhatsApp pre-order model aligns ingredient costs directly with confirmed buyer demand and eliminates upfront shop rent.'
    },
    {
      id: 'fa_gyb_02',
      moduleId: 'mod_gyb_1',
      relatedLessonId: 'lesson_gyb_1_2',
      questionText:
        'What is the core purpose of creating a detailed customer persona before designing flyers or running ads?',
      options: [
        'To invent fictional followers for your Instagram profile',
        'To clearly understand your ideal buyer’s pain points, budget comfort, and online hangouts so messaging and offers convert',
        'To guarantee every person in Nigeria buys your product on day one',
        'To avoid stating product prices publicly'
      ],
      correctAnswer: 1,
      explanation:
        'Customer personas guide platform choice, language, pricing tiers, and content angles based on real buyer needs rather than guesswork.'
    },
    {
      id: 'fa_gyb_03',
      moduleId: 'mod_gyb_1',
      relatedLessonId: 'lesson_gyb_1_3',
      questionText:
        'Which value proposition statement communicates the strongest, clearest reason for a busy Lagos professional to choose your laundry service?',
      options: [
        '"We wash clothes better than everyone else in Nigeria."',
        '"24-hour doorstep pickup and crisp ironed delivery in Ikeja & Lekki—fixed ₦6,500 weekly bag with zero lost items."',
        '"Send a DM to ask how our service works."',
        '"Luxury premium world-class fabric care solutions."'
      ],
      correctAnswer: 1,
      explanation:
        'Strong value propositions state the specific audience, measurable benefit (24-hour doorstep pickup/delivery), transparent price, and key trust reassurance.'
    },
    {
      id: 'fa_gyb_04',
      moduleId: 'mod_gyb_1',
      relatedLessonId: 'lesson_gyb_1_3',
      questionText:
        'Why does transparent Naira (₦) pricing on product posts generally build more online trust than "DM for price"?',
      options: [
        'Because social media hides posts that lack currency symbols',
        'Because buyers immediately qualify themselves, feel respected, and spend less time suspecting arbitrary pricing',
        'Because customers never negotiate when prices are shown',
        'Because WhatsApp bans users who receive price questions'
      ],
      correctAnswer: 1,
      explanation: 'Clear pricing signals professionalism, reduces friction, and filters serious buyers into your inbox.'
    },

    // Module 2 (4 questions)
    {
      id: 'fa_gyb_05',
      moduleId: 'mod_gyb_2',
      relatedLessonId: 'lesson_gyb_2_1',
      questionText:
        'Which three elements belong in an optimised Instagram or Facebook business biography?',
      options: [
        'Your BVN, home street number, and personal zodiac sign',
        'What you offer/solve, your city or delivery coverage, and a clear call-to-action link',
        'Twenty unrelated hashtags and motivational quotes only',
        'A competitor’s phone number and blank profile picture'
      ],
      correctAnswer: 1,
      explanation:
        'Within seconds, visitors need to see what you sell, whether you deliver to their location, and how to order immediately.'
    },
    {
      id: 'fa_gyb_06',
      moduleId: 'mod_gyb_2',
      relatedLessonId: 'lesson_gyb_2_2',
      questionText:
        'A corps member running a snack brand alone misses leads while in morning lectures or PPA work. Which WhatsApp Business setup solves this cleanly?',
      options: [
        'Delete WhatsApp until evening',
        'Configure an informative Business Profile, populated Product Catalogue, Greeting Message, Away Message, and Quick Replies',
        'Reply "busy" with no price details whenever possible',
        'Use three separate personal SIM cards without labels'
      ],
      correctAnswer: 1,
      explanation:
        'WhatsApp Business automation (greeting/away messages) plus a visible Catalogue lets prospects browse prices and wait confidently for replies.'
    },
    {
      id: 'fa_gyb_07',
      moduleId: 'mod_gyb_2',
      relatedLessonId: 'lesson_gyb_2_3',
      questionText:
        'A remote UI/UX freelancer works strictly from a shared hostel bedroom with no public storefront or customer-facing signage. How should they handle Google Business Profile (GBP)?',
      options: [
        'Register a random busy shopping plaza address they do not occupy',
        'Do not fabricate an ineligible physical storefront; focus instead on an optimised LinkedIn profile, portfolio site, and WhatsApp Business catalogue (or GBP Service-Area rules only if genuinely eligible)',
        'Pay an unverified agent to bypass Google address checks with fake photos',
        'Refuse to work with online clients'
      ],
      correctAnswer: 1,
      explanation:
        'Google Business Profile eligibility requires real in-person customer contact at the stated address or valid service area; online-only businesses should use portfolio sites, directories, and social SEO rather than faking locations.'
    },
    {
      id: 'fa_gyb_08',
      moduleId: 'mod_gyb_2',
      relatedLessonId: 'lesson_gyb_2_3',
      questionText:
        'For an eligible brick-and-mortar hair salon in Abuja, which action most improves local Google Maps visibility and trust?',
      options: [
        'Leaving business hours blank and ignoring customer reviews',
        'Maintaining accurate address/hours, uploading genuine recent photos, and politely replying to every customer review',
        'Changing the business name every week',
        'Deleting positive customer comments'
      ],
      correctAnswer: 1,
      explanation:
        'Complete, up-to-date NAP details (Name, Address, Phone), fresh visual proof, and responsive review management signal active local relevance.'
    },

    // Module 3 (4 questions)
    {
      id: 'fa_gyb_09',
      moduleId: 'mod_gyb_3',
      relatedLessonId: 'lesson_gyb_3_1',
      questionText:
        'Why should a skincare or electronics vendor mix educational and trust-building posts with direct "Buy Now" promos?',
      options: [
        'Because Instagram charges extra for promotional flyers',
        'Because buyers at earlier awareness and consideration stages need education and real proof before trusting a purchase',
        'Because promotional posts are illegal in Nigeria',
        'Because educational posts automatically ship packages'
      ],
      correctAnswer: 1,
      explanation:
        'Constant hard-selling exhausts followers; mixing tips, behind-the-scenes proof, and offers builds authority and warms prospects to buy.'
    },
    {
      id: 'fa_gyb_10',
      moduleId: 'mod_gyb_3',
      relatedLessonId: 'lesson_gyb_3_2',
      questionText:
        'When using Gemini or ChatGPT to generate social media captions and product ads for Nigerian customers, what is the critical human step before posting?',
      options: [
        'Copy and paste American slang, USD prices, and unverified claims directly without reading',
        'Edit for natural Nigerian context, verify all product facts and Naira prices, and keep your authentic brand voice',
        'Ask the AI to invent fake five-star customer testimonials',
        'Remove all calls to action'
      ],
      correctAnswer: 1,
      explanation:
        'Responsible AI use pairs AI drafting speed with human fact-checking, Naira localisation, and genuine customer truthfulness.'
    },
    {
      id: 'fa_gyb_11',
      moduleId: 'mod_gyb_3',
      relatedLessonId: 'lesson_gyb_3_2',
      questionText:
        'Which Canva design habit makes mobile promotional flyers far easier for busy buyers to read on WhatsApp Status and Instagram?',
      options: [
        'Using five clashing neon colours and tiny 8pt paragraphs covering the whole image',
        'Maintaining high text-to-background contrast, max 2 clean fonts, plenty of breathing room, and a clear single CTA',
        'Stretching the product photo horizontally until distorted',
        'Hiding the product behind giant watermarks'
      ],
      correctAnswer: 1,
      explanation:
        'Mobile feeds move fast; strong hierarchy, crisp product focus, high contrast, and whitespace let viewers grasp the offer within 2 seconds.'
    },
    {
      id: 'fa_gyb_12',
      moduleId: 'mod_gyb_3',
      relatedLessonId: 'lesson_gyb_3_3',
      questionText:
        'How does organizing a 7-Day Social Media Content Calendar around 4 Content Pillars help a busy solo entrepreneur?',
      options: [
        'It eliminates daily "what should I post?" panic and enables batch-creating graphics/videos in one focused sitting',
        'It forces you to post 12 times per hour every day',
        'It automatically pays your internet subscription',
        'It prevents customers from commenting on posts'
      ],
      correctAnswer: 0,
      explanation:
        'Content pillars create repeatable variety (educate, demonstrate proof, behind-the-scenes, promote) so batch production becomes fast and sustainable.'
    },

    // Module 4 (4 questions)
    {
      id: 'fa_gyb_13',
      moduleId: 'mod_gyb_4',
      relatedLessonId: 'lesson_gyb_4_1',
      questionText:
        'How can a small Nigerian business attract high-intent local buyers on Instagram and TikTok organically without spending money on ads?',
      options: [
        'Use a private account and remove all text from captions',
        'Place service + city keywords in display names, captions, and on-screen video text, plus join relevant local groups and partner with complementary vendors',
        'Buy 10,000 inactive bot followers',
        'Spam "check my page" on celebrity funeral posts'
      ],
      correctAnswer: 1,
      explanation:
        'Social SEO keywords, respectful community engagement, and non-competing partner cross-promotions attract genuine local searchers organically.'
    },
    {
      id: 'fa_gyb_14',
      moduleId: 'mod_gyb_4',
      relatedLessonId: 'lesson_gyb_4_2',
      questionText:
        'An Ibadan catering startup takes orders via WhatsApp conversation and wants to test a ₦15,000 5-day Meta campaign. Which Ads Manager setup is most sensible?',
      options: [
        'Awareness objective targeting all 36 states with no price shown',
        'Engagement / Click-to-WhatsApp Messaging objective targeting Ibadan neighbourhoods with a clear starter package visual and price',
        'App Install objective pointing to a broken website',
        'Targeting audiences outside Nigeria for next-day hot lunch delivery'
      ],
      correctAnswer: 1,
      explanation:
        'Click-to-WhatsApp Messaging restricted to deliverable local neighbourhoods aligns ad spend directly with feasible, profitable conversations.'
    },
    {
      id: 'fa_gyb_15',
      moduleId: 'mod_gyb_4',
      relatedLessonId: 'lesson_gyb_4_2',
      questionText:
        'You spent ₦20,000 on an Instagram ad that delivered 40 WhatsApp conversations and 5 paid orders at ₦18,000 each (₦90,000 total sales). What was your Cost Per Conversation and basic Return on Ad Spend (ROAS)?',
      options: [
        '₦500 per conversation and 4.5x ROAS',
        '₦4,000 per conversation and 0.5x ROAS',
        '₦200 per conversation and 10x ROAS',
        '₦5,000 per conversation and 2.0x ROAS'
      ],
      correctAnswer: 0,
      explanation: '₦20,000 ÷ 40 conversations = ₦500/conversation; ₦90,000 revenue ÷ ₦20,000 ad spend = 4.5x ROAS.'
    },
    {
      id: 'fa_gyb_16',
      moduleId: 'mod_gyb_4',
      relatedLessonId: 'lesson_gyb_4_3',
      questionText:
        'Why should every micro-influencer or referral partner be assigned a unique discount code or custom tracked WhatsApp link?',
      options: [
        'So you can objectively track enquiries and orders per creator instead of guessing which collaboration paid off',
        'Because Nigerian law prohibits sharing normal links',
        'To prevent customers from completing payment',
        'To lower product quality'
      ],
      correctAnswer: 0,
      explanation: 'Attribution codes reveal true sales ROI per partner so future budget goes only to effective creators.'
    },

    // Module 5 (4 questions)
    {
      id: 'fa_gyb_17',
      moduleId: 'mod_gyb_5',
      relatedLessonId: 'lesson_gyb_5_1',
      questionText:
        'A prospect messages "How much is the corporate shirt?" Which reply follows best sales-conversion practice?',
      options: [
        '"14k."',
        '"Good afternoon! Our tailored corporate shirt is ₦14,000 (sizes S–XXL). Lagos delivery is ₦2,500. Which size/colour would you like and what is your delivery area?"',
        '"Check highlights, everything is there."',
        'Ignore the message until next week'
      ],
      correctAnswer: 1,
      explanation: 'The Answer + Clarify + Next Step reply builds rapport, prevents dead ends, and moves the buyer toward ordering.'
    },
    {
      id: 'fa_gyb_18',
      moduleId: 'mod_gyb_5',
      relatedLessonId: 'lesson_gyb_5_2',
      questionText:
        'Which payment verification habit protects an online seller against fake bank transfer alert scams?',
      options: [
        'Accepting any crisp PDF receipt sent on WhatsApp as final proof',
        'Confirming settled credit directly inside your own banking app or Paystack/Flutterwave dashboard before dispatching items',
        'Asking the buyer’s friend to confirm by voice note',
        'Shipping goods immediately whenever someone sends an SMS alert text'
      ],
      correctAnswer: 1,
      explanation: 'Only direct verification inside your authenticated bank account or gateway dashboard confirms real settled funds.'
    },
    {
      id: 'fa_gyb_19',
      moduleId: 'mod_gyb_5',
      relatedLessonId: 'lesson_gyb_5_2',
      questionText:
        'Why is separating your business bank account from your personal spending account essential even when starting small?',
      options: [
        'It makes tracking true cash flow, restocking capital, and profit clear while increasing customer payment trust',
        'Because personal accounts cannot receive mobile transfers',
        'Because Canva refuses exports without a corporate account',
        'So you never have to count expenses'
      ],
      correctAnswer: 0,
      explanation: 'Separate accounts stop personal expenses from silently draining business restocking capital.'
    },
    {
      id: 'fa_gyb_20',
      moduleId: 'mod_gyb_5',
      relatedLessonId: 'lesson_gyb_5_3',
      questionText:
        'Before sharing a glowing WhatsApp customer review screenshot on your Instagram page, what responsible data practice must you follow?',
      options: [
        'Publish the customer’s full phone number and street address clearly',
        'Blur out phone numbers, home addresses, and sensitive payment details (and ask consent where appropriate)',
        'Add the customer to 10 unrelated broadcast lists',
        'Edit the message to claim benefits the product does not have'
      ],
      correctAnswer: 1,
      explanation: 'Blurring personally identifiable information respects NDPA privacy standards and protects buyer safety.'
    },

    // Module 6 (4 questions)
    {
      id: 'fa_gyb_21',
      moduleId: 'mod_gyb_6',
      relatedLessonId: 'lesson_gyb_6_1',
      questionText:
        'Last week your beauty brand had 60 WhatsApp enquiries and 15 confirmed paid orders. What was your Enquiry-to-Order Conversion Rate?',
      options: ['15%', '25%', '40%', '60%'],
      correctAnswer: 1,
      explanation: '15 orders ÷ 60 enquiries × 100 = 25% enquiry conversion rate.'
    },
    {
      id: 'fa_gyb_22',
      moduleId: 'mod_gyb_6',
      relatedLessonId: 'lesson_gyb_6_1',
      questionText:
        'Your monthly sales hit ₦400,000, while stock & packaging cost ₦230,000, Meta ads cost ₦35,000, and unrecovered rider/data costs were ₦25,000. What is your Net Profit?',
      options: ['₦400,000', '₦170,000', '₦110,000', '₦290,000'],
      correctAnswer: 2,
      explanation: '₦400,000 revenue − (₦230,000 + ₦35,000 + ₦25,000) total costs = ₦110,000 net profit.'
    },
    {
      id: 'fa_gyb_23',
      moduleId: 'mod_gyb_6',
      relatedLessonId: 'lesson_gyb_6_2',
      questionText:
        'Your Reels get 5,000 views and 120 profile visits, yet only 3 people tap your WhatsApp link to enquire. Which area most likely needs immediate improvement?',
      options: [
        'Profile bio clarity, visible proof/pricing on top pinned posts, and CTA link placement',
        'Buying a second smartphone',
        'Stopping video creation completely',
        'Increasing delivery fee silently'
      ],
      correctAnswer: 0,
      explanation:
        'High profile visits paired with near-zero link clicks point to a leaky landing profile—unclear bio, missing trust proof, or weak CTA.'
    },
    {
      id: 'fa_gyb_24',
      moduleId: 'mod_gyb_6',
      relatedLessonId: 'lesson_gyb_6_3',
      questionText:
        'Which sequence best represents sustainable scaling from a solo online side-hustle to a dependable MSME?',
      options: [
        'Triple ad spend first while ignoring late deliveries and mixed personal funds',
        'Validate winning products -> track weekly profit -> write simple SOP checklists & separate finances -> formalise (e.g., CAC) and scale capacity step by step',
        'Delete financial spreadsheets once sales exceed 10 orders a month',
        'Rely exclusively on viral giveaways with zero profit margin'
      ],
      correctAnswer: 1,
      explanation:
        'Sustainable growth pairs proven offers and financial clarity with documented SOPs, operational capacity, and timely business formalisation.'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredModuleChecksCount: 6,
    requiredFinalAssessmentPassScore: 70,
    requireCapstoneSubmission: true,
    requireCapstoneApproval: false
  }
};
