import { CourseModule } from '../../types';

export const GROW_BUSINESS_MODULES_1_TO_3: CourseModule[] = [
  // =========================================================================
  // MODULE 1: BUILDING YOUR ONLINE BUSINESS FOUNDATION
  // =========================================================================
  {
    moduleId: 'mod_gyb_1',
    courseId: 'grow-your-business-online',
    sequence: 1,
    sequenceLabel: 'Module 1',
    title: 'Building Your Online Business Foundation',
    description:
      'Help learners understand their business model, define their ideal customers, and craft a clear value proposition and trustworthy brand identity.',
    learningObjectiveIds: ['GYB-FND-01'],
    lessons: [
      {
        lessonId: 'lesson_gyb_1_1',
        moduleId: 'mod_gyb_1',
        courseId: 'grow-your-business-online',
        title: 'Understanding the Digital Business Landscape',
        sequence: 1,
        sequenceLabel: 'Lesson 1.1',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['GYB-FND-01'],
        introduction:
          'Running a business online does not mean simply posting product photos on your WhatsApp status whenever you remember. It means intentionally using digital channels to attract enquiries, build buyer trust, collect payments smoothly, and deliver value reliably—even without renting an expensive physical shop.',
        lessonContent: [
          'What It Means to Run a Business Online: An online business uses internet-connected tools (such as WhatsApp Business, Instagram, TikTok, Google Business Profile, payment links, and digital spreadsheets) to perform core commercial activities: marketing, customer communication, order taking, and record keeping.',
          'Core Online Business Models for Nigerian Beginners: (1) Product-Based Social Commerce — selling clothing, skincare, snacks, or household items via Instagram, TikTok, and WhatsApp with dispatch delivery. (2) Food & Catering Pre-Order Model — taking lunch bowls, cakes, or small-chops bookings online in advance to avoid food waste. (3) Agribusiness Direct-to-Consumer — sourcing garri, palm oil, catfish, or honey in bulk and selling neatly packaged portions to urban buyers. (4) Freelancing & Digital Services — offering graphic design, tutoring, social media management, photography, or CV writing remotely. (5) Home-Based & Hybrid Retail — combining neighbourhood walk-in sales with online orders across your town or state.',
          'Physical-Only vs. Selling Online: A physical shop relies heavily on passers-by within walking or driving distance and incurs high fixed rent (often ₦300,000–₦1,500,000+ per year in Nigerian cities), electricity/fuel bills, and fixed opening hours. Selling online lowers startup overhead, lets customers browse your catalogue 24/7, and allows a single vendor to serve buyers across multiple neighbourhoods or states using dispatch riders and interstate parks.',
          'Key Opportunities & Realities in Nigeria: High mobile smartphone usage and widespread messaging culture make conversational selling via WhatsApp and social video highly practical. However, online trust is earned slowly because buyers worry about delivery delays or receiving items different from photos. Consistent clarity, transparent pricing in Nigerian Naira (₦), and reliable fulfilment separate serious online businesses from hobby sellers.'
        ],
        stepByStepInstructions: [
          'Write down the exact product or service you currently offer or plan to launch within the next 30 days.',
          'Choose one primary online business model from the five common models (e.g., Pre-order Catering, Social Commerce Fashion, or Digital Service Freelancing).',
          'List three startup costs you save by starting online instead of renting a physical shop (e.g., annual shop rent, signage, shop furniture).',
          'Identify two logistical requirements you must solve to serve online customers reliably (e.g., dispatch rider rates within your city, packaging materials, or stable internet data).'
        ],
        nigerianContextExamples: [
          'Fashion & Clothing: A corps member in Ibadan starts a ready-to-wear corporate shirt page from home with ₦65,000 initial stock instead of paying ₦450,000/year for a boutique space, allocating ₦8,000 to clean packaging and product photography.',
          'Food & Catering: A home-based baker in Enugu avoids unsold spoilage by operating a Wednesday-to-Friday WhatsApp pre-order menu for ₦4,500 bento cakes and meat-pie boxes delivered every Saturday.',
          'Agribusiness: A poultry and fish farmer in Abeokuta packages smoked catfish in ₦6,000 and ₦12,000 sealed packs and markets them to busy civil servants via Instagram Reels and WhatsApp groups.'
        ],
        toolsAndResources: [
          'WhatsApp Business (Free mobile storefront & messaging)',
          'Instagram / TikTok / Facebook Pages (Discovery channels)',
          'Google Docs or Notes App (Business planning)',
          'Local dispatch services / waybill parks (Order fulfilment)'
        ],
        practicalDemonstration:
          'Worked Cost Comparison Example (Lagos/Abuja Starter Clothing Seller):\n• Physical Shop Option: Annual shop rent (₦600,000) + basic shelves & painting (₦120,000) + generator/fuel reserve (₦80,000) = ₦800,000 before buying a single shirt.\n• Online-First Starter Option: Initial 15-piece inventory (₦90,000) + plain white cardboard backdrop & packaging bags (₦10,000) + mobile data & small starter promotion test (₦15,000) = ₦115,000 total launch budget.\nResult: The online-first seller preserves capital for inventory restocking and learns what styles customers actually buy before considering a physical showroom.',
        keyTakeaways: [
          'Running a business online requires structured channels for discovery, conversation, payment, and fulfilment—not random posting.',
          'Online models drastically reduce fixed rent barriers for Nigerian youths, freelancers, and home-based entrepreneurs.',
          'Success online depends on clear product presentation, transparent pricing, and dependable delivery.',
          'Note: Third-party social platforms and delivery partner fees change periodically; always verify current terms before pricing your items.'
        ],
        handsOnExercise: {
          title: 'Map Your Online Business Model',
          task: 'Select a real or proposed business and compare how it would operate online versus in a physical-only shop.',
          steps: [
            'Name your business concept and list 3 specific products or services with estimated Naira (₦) prices.',
            'Select your primary online business model (social commerce, pre-order catering, service agency, agribusiness, or hybrid retail).',
            'List 3 advantages you gain by operating online and 2 trust challenges you must overcome for Nigerian buyers.'
          ],
          deliverable: 'A half-page Online Business Model Summary in your notebook or Google Docs.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_1_1_1',
            questionText: 'What is the biggest financial advantage of launching an online-first business compared to renting a physical retail shop?',
            options: [
              'Online businesses never need to pay suppliers for stock',
              'It eliminates heavy upfront shop rent and fixed overhead while allowing 24/7 customer discovery',
              'Social media platforms pay every business owner a monthly salary',
              'Customers never ask questions about product quality online'
            ],
            correctAnswer: 1,
            explanation: 'Starting online avoids large annual rent and shop furnishing expenses, letting beginners invest scarce capital into stock, packaging, and customer acquisition.'
          },
          {
            id: 'kc_gyb_1_1_2',
            questionText: 'Why does a WhatsApp pre-order model work particularly well for Nigerian food and catering businesses?',
            options: [
              'Because food businesses are banned from opening physical kitchens',
              'Because taking orders and deposits in advance prevents perishable food waste and protects cash flow',
              'Because WhatsApp cooks and delivers the food automatically',
              'Because customers prefer waiting three weeks for lunch'
            ],
            correctAnswer: 1,
            explanation: 'Pre-orders align ingredient purchasing directly with confirmed demand, drastically reducing spoilage and wasted capital.'
          },
          {
            id: 'kc_gyb_1_1_3',
            questionText: 'Which combination best describes what makes a seller a true online business rather than a casual poster?',
            options: [
              'Posting blurry screenshots once a month without prices',
              'Having clear product information, structured customer communication, reliable payment methods, and predictable fulfilment',
              'Copying competitor photos and turning off phone notifications',
              'Using five different personal phone numbers with no catalogue'
            ],
            correctAnswer: 1,
            explanation: 'A real online business operates a repeatable system across discovery, enquiry handling, payment verification, and delivery.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'SMEDAN Nigeria MSME Support Portal',
            description: 'Official Small and Medium Enterprises Development Agency of Nigeria resources for Nigerian entrepreneurs.',
            url: 'https://smedan.gov.ng'
          },
          {
            title: 'Google Digital Garage: Fundamentals of Digital Marketing',
            description: 'Free introductory digital marketing modules for beginners (availability and curriculum subject to Google updates).'
          }
        ]
      },
      {
        lessonId: 'lesson_gyb_1_2',
        moduleId: 'mod_gyb_1',
        courseId: 'grow-your-business-online',
        title: 'Identifying Your Target Customers',
        sequence: 2,
        sequenceLabel: 'Lesson 1.2',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['GYB-FND-01'],
        introduction:
          'When asked "Who is your customer?", beginners often reply "Everybody!" Trying to sell to everybody makes your marketing message vague and forgettable. Defining a clear target customer makes your content sharper and attracts buyers who are actually willing to pay.',
        lessonContent: [
          'Understanding Customer Needs vs. Wants: Every purchase solves a functional need (saving time, looking presentable, feeding a family, learning a skill) or an emotional need (feeling confident, trusted, or respected). Customers do not buy a ₦15,000 hair care bundle just for ingredients—they buy healthy hair without breakage or embarrassment.',
          'Defining Ideal Customers: Segment your market using practical traits: Age range, Location (e.g., Lagos Mainland vs. nationwide students), Income/Spending capacity, Occupation or life stage (e.g., NYSC corps members, busy office bankers, university undergraduates, new mothers), and Preferred online platforms (Instagram, TikTok, Facebook groups, or WhatsApp).',
          'Creating a Simple Customer Persona: A customer persona is a 1-paragraph realistic profile of your best buyer. It captures: Who they are, Their daily routine, Their biggest frustration related to your offer, Their objections before paying, and Where they spend time online.',
          'Purchasing Behaviour & Customer Value: Understand how your ideal buyer decides to purchase. Do they buy impulsively on payday? Do they compare 3 vendors on Instagram first? Do they ask a spouse or friend? Understanding customer value means looking beyond one single sale—a loyal buyer of skincare, food, or tutoring services can purchase repeatedly for years if cared for properly.'
        ],
        stepByStepInstructions: [
          'Avoid "everyone" and pick 1 primary customer group you can realistically reach and serve well this month.',
          'Write a persona name (e.g., "Amaka, Busy Young Banker") and fill in her city, age bracket, monthly budget comfort zone, and top social platforms.',
          'List 3 specific frustrations your persona faces when buying from existing vendors (e.g., late delivery, unclear sizing, slow replies).',
          'Write down the exact proof your persona needs before sending a bank transfer (e.g., clear real-life videos, transparent price tags, delivery timeline).'
        ],
        nigerianContextExamples: [
          'Beauty & Personal Care: Instead of targeting "all women", a natural body butter seller targets "working women aged 24–38 in Abuja and Lagos who experience dry skin in air-conditioned offices and spend ₦8,000–₦18,000 monthly on gentle skincare."',
          'Education & Training: An online Excel tutor targets "final-year university students and serving NYSC corps members preparing for corporate graduate trainee assessments who can afford ₦7,500 for a weekend practical bootcamp."',
          'Photography & Creative Services: A mobile product photographer targets "home-based small food and fashion vendors on Instagram who lose sales because their indoor phone photos look dark."'
        ],
        toolsAndResources: [
          'Google Docs / Notion (Customer Persona Worksheet)',
          'Instagram & TikTok Comments (Observing real customer questions)',
          'WhatsApp Polls / Google Forms (Short 3-question audience feedback survey)'
        ],
        practicalDemonstration:
          'Sample Customer Persona (Home Catering Business):\n• Persona Name: Chinedu, 29, Tech Support Officer working hybrid in Yaba, Lagos.\n• Challenge: Works 9 AM–6 PM, too exhausted to cook wholesome Nigerian soups on weekdays, dislikes oily roadside takeout.\n• Budget & Frequency: Spends ₦12,000–₦18,000 per week on packed food bowls.\n• Buying Objections: Worries about hygiene, small portion sizes, and rider delays past 2 PM.\n• Channels Used: WhatsApp Status, Instagram, and X (Twitter).\nNotice how knowing Chinedu immediately tells the caterer what to post: hygienic kitchen prep reels, clear 1-litre bowl measurements, and guaranteed 12:30 PM office lunch delivery!',
        keyTakeaways: [
          'If you try to speak to everyone in your marketing, you connect strongly with no one.',
          'A clear customer persona clarifies your pricing, product packaging, tone of voice, and platform choice.',
          'Understanding why buyers hesitate (risk, quality doubts, hidden prices) helps you answer objections proactively.'
        ],
        handsOnExercise: {
          title: 'Build Two Customer Personas for Your Business',
          task: 'Draft one Primary Customer Persona and one Secondary Customer Persona using the structured template.',
          steps: [
            'Define demographics: Persona nickname, age range, city/town, and occupation.',
            'Document 3 core needs/pain points and 2 common objections before buying.',
            'Identify the top 2 social channels where this persona discovers new vendors.'
          ],
          deliverable: 'Two structured Customer Persona cards (minimum 120 words total).'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_1_2_1',
            questionText: 'Why is defining a specific target customer more effective than marketing to "everybody"?',
            options: [
              'Because the law forbids selling to more than ten people',
              'It allows you to tailor your product messaging, pricing, and platform choices directly to buyers most likely to purchase',
              'It guarantees you will never need to improve your product',
              'It stops competitors from seeing your Instagram account'
            ],
            correctAnswer: 1,
            explanation: 'Focused messaging speaks directly to specific needs and budgets, making marketing more persuasive and cost-effective.'
          },
          {
            id: 'kc_gyb_1_2_2',
            questionText: 'Which piece of information is MOST useful inside a practical customer persona?',
            options: [
              'The customer’s favourite colour of primary school uniform',
              'Their core frustrations, spending comfort zone, buying objections, and preferred online platforms',
              'Their mother’s maiden name and BVN',
              'Their exact house street number'
            ],
            correctAnswer: 1,
            explanation: 'Knowing customer pain points, budget range, objections, and online hangouts directly guides content creation and channel selection.'
          },
          {
            id: 'kc_gyb_1_2_3',
            questionText: 'How can a beginner gather real insight about customer purchasing behaviour without spending money on agencies?',
            options: [
              'Guess what customers want without asking anyone',
              'Read comment sections on competitor pages, run short WhatsApp polls, and interview 5–10 potential buyers',
              'Buy 5,000 fake followers online',
              'Wait five years before launching any product'
            ],
            correctAnswer: 1,
            explanation: 'Real customer conversations, social comments, and quick polls expose actual questions and frustrations at zero cost.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'HubSpot Buyer Persona Guide',
            description: 'Practical breakdown of how small businesses organize customer insights into actionable personas.'
          }
        ]
      },
      {
        lessonId: 'lesson_gyb_1_3',
        moduleId: 'mod_gyb_1',
        courseId: 'grow-your-business-online',
        title: 'Developing Your Value Proposition and Business Identity',
        sequence: 3,
        sequenceLabel: 'Lesson 1.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['GYB-FND-01'],
        introduction:
          'Hundreds of vendors sell thrift clothes, wigs, cakes, or graphic design on Instagram. Your Value Proposition and Brand Identity explain—within five seconds—why a buyer should trust and choose your business instead of scrolling to the next page.',
        lessonContent: [
          'What Makes a Business Different: Differentiation does not always mean inventing something never seen before. In Nigerian small business markets, differentiation often comes from Reliability (on-time delivery), Clarity (exact prices and sizing charts shown upfront), Packaging (clean, tamper-proof delivery), Specialization (focusing on tall women’s trousers or diabetic-friendly snacks), or Exceptional Communication.',
          'Developing a Clear Value Proposition: Use this simple 4-part formula: "We help [Target Customer] achieve [Desired Outcome / Solve Specific Pain] through [Your Product/Service] without [Common Frustration]." Clear language beats fancy buzzwords.',
          'Business Naming & Positioning: Choose a name that is easy to spell, easy to pronounce on radio or WhatsApp voice notes, memorable, and not confusingly similar to an existing registered trademark. Keep handles consistent across Instagram, TikTok, Facebook, and WhatsApp (e.g., `@nairabowlkitchen` everywhere).',
          'Brand Identity & Customer Trust: Visual consistency (1–2 readable fonts, 2 consistent brand colours, a clear logo or clean portrait for freelancers) signals seriousness. Clearly listing what you sell, starting prices in Naira (₦), service locations, and honest turnaround times reduces buyer anxiety immediately.'
        ],
        stepByStepInstructions: [
          'Write your one-sentence Value Proposition using the formula: "We help [Target Customer] get [Benefit] with [Offer], without [Key Frustration]."',
          'Choose or refine a short, memorable business name and check if the matching username handle is available on Instagram and TikTok.',
          'Pick 2 core brand colours (one primary colour like deep forest green or navy, one accent colour like warm gold) and 1–2 readable fonts in Canva.',
          'Write crisp descriptions for your top 3–5 products or services including exact specifications and transparent Naira (₦) prices.'
        ],
        nigerianContextExamples: [
          'Retail & Small Shops: Instead of "We sell everything cheap", a bedding vendor positions as: "We supply breathable, fade-free 100% cotton bedsheets for Nigerian heat—exact mattress sizes clearly labelled from ₦18,500, dispatched within 24 hours in Lagos."',
          'Freelancing & Digital Services: A corps member freelancer writes: "I design clean, mobile-friendly Canva price menus and product flyers for Nigerian food and beauty vendors within 48 hours—starting at ₦5,000 per design."',
          'Home-Based Business: A spice producer positions around hygiene: "Sun-dried, stone-free ginger, turmeric, and suya spice blends sealed in moisture-proof jars for busy families and diaspora gifting."'
        ],
        toolsAndResources: [
          'Canva (Free Logo & Brand Kit colour palette picker)',
          'CAC Public Search Portal (crp.cac.gov.ng — to check name availability in Nigeria)',
          'Namecheckr / Social Handle Search (Checking username consistency)'
        ],
        practicalDemonstration:
          'Before vs. After Value Proposition Rewrite:\n• Weak Generic Statement: "Welcome to Ada’s Glam World. We sell quality skincare and fragrances. DM for enquiries. God bless you."\n• Strong Value Proposition Statement: "Gentle, NAFDAC-friendly shea & turmeric skincare formulated for melanin-rich skin in humid Nigerian weather. Transparent sets from ₦9,500. Same-day Abuja dispatch before 2 PM."\nNotice how the second version communicates customer focus, safety consciousness, transparent starting price, and clear fulfilment speed.',
        keyTakeaways: [
          'A clear value proposition tells buyers who you serve, what problem you solve, and why you are dependable.',
          'Consistency in business name, social handles, colours, and tone builds instant credibility online.',
          'Defining products clearly with honest specs and Naira pricing prevents wasted DMs and builds trust.'
        ],
        handsOnExercise: {
          title: 'Write Your Value Proposition & Product Offer Sheet',
          task: 'Draft your business identity foundation and clear offer list.',
          steps: [
            'Write a 1–2 sentence Value Proposition using the 4-part formula.',
            'Select 2 brand colours and a consistent social handle format.',
            'List 3 core products/services with clear titles, 2 key benefits each, and realistic Naira (₦) prices.'
          ],
          deliverable: 'Your Value Proposition statement and 3-item Offer Sheet.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_1_3_1',
            questionText: 'What is the primary purpose of a Value Proposition for an online business?',
            options: [
              'To list your private home address on social media',
              'To clearly communicate who you help, the benefit you deliver, and why a customer should choose you over alternatives',
              'To sound as complicated and technical as possible',
              'To promise every buyer guaranteed overnight wealth'
            ],
            correctAnswer: 1,
            explanation: 'A value proposition immediately explains your unique benefit to your target buyer so they understand why to buy from you.'
          },
          {
            id: 'kc_gyb_1_3_2',
            questionText: 'Which practice best strengthens brand identity and customer trust for a beginner vendor?',
            options: [
              'Using a completely different business name on WhatsApp, Instagram, and TikTok',
              'Using consistent handles, 2 clean brand colours, readable flyers, and upfront Naira pricing',
              'Changing your logo every three days',
              'Writing "No refunds, no questions" as your main bio line'
            ],
            correctAnswer: 1,
            explanation: 'Visual and naming consistency plus transparent pricing makes small businesses look trustworthy and established.'
          },
          {
            id: 'kc_gyb_1_3_3',
            questionText: 'Why is it helpful to search the CAC portal (crp.cac.gov.ng) early when naming a Nigerian business?',
            options: [
              'To see if your preferred business name is likely distinct and avoid building a brand around a taken name',
              'Because the CAC automatically gives free laptops to visitors',
              'Because Instagram requires a CAC certificate before creating an account',
              'To check competitor bank account balances'
            ],
            correctAnswer: 0,
            explanation: 'Checking name availability early saves you from costly rebranding later when you formalize your business.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'CAC Public Name Search Portal',
            description: 'Check Nigerian business name availability directly on the Corporate Affairs Commission public search tool.',
            url: 'https://search.cac.gov.ng'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 1 Assignment: One-Page Online Business Profile',
      description:
        'Develop a one-page online business profile describing the business, target customers, products or services, and unique value proposition.',
      deliverables: [
        'Business Name, handle idea, and chosen online business model (1 paragraph)',
        'Primary Target Customer Persona (demographics, needs, pain points, buying habits)',
        'Core Product or Service List (3–5 items with clear descriptions and Naira ₦ pricing)',
        'Unique Value Proposition statement answering why customers should buy from you'
      ],
      submissionNote: 'Keep this one-page profile saved—it forms Deliverables 1, 2, and 3 of your final Capstone Project!'
    },
    knowledgeCheck: [
      {
        id: 'mc_gyb_1_1',
        questionText: 'Which online business model is best suited for a small food caterer wanting to eliminate unsold daily food waste?',
        options: [
          'Renting a 50-seat restaurant immediately with bank loans',
          'Pre-order catering with upfront deposits and scheduled delivery days',
          'Cooking randomly every morning and hoping walk-in guests appear',
          'Shipping cooked soup internationally without refrigeration'
        ],
        correctAnswer: 1,
        explanation: 'Scheduled pre-orders ensure you only purchase ingredients and cook for confirmed paying customers.'
      },
      {
        id: 'mc_gyb_1_2',
        questionText: 'What is the main risk of defining your target audience as "everybody in Nigeria"?',
        options: [
          'Your marketing message becomes too generic and fails to resonate strongly with buyers most likely to purchase',
          'Social media apps charge extra money for broad audiences',
          'You will run out of phone storage',
          'Customers will only pay in foreign currency'
        ],
        correctAnswer: 0,
        explanation: 'Targeted messaging tailored to specific customer pain points and budgets converts far better than vague appeals to everyone.'
      },
      {
        id: 'mc_gyb_1_3',
        questionText: 'Which element belongs in a strong Customer Persona?',
        options: [
          'Random guesses about celebrity lifestyles',
          'The buyer’s key problem, monthly budget comfort zone, buying objections, and active online channels',
          'Their secret banking PIN',
          'Only their shoe size regardless of what you sell'
        ],
        correctAnswer: 1,
        explanation: 'Practical personas capture buyer motivations, objections, budget, and preferred platforms so you can market effectively.'
      },
      {
        id: 'mc_gyb_1_4',
        questionText: 'In the Value Proposition formula, what should follow "without..."?',
        options: [
          'Without paying the vendor',
          'Without the common frustration or risk customers dislike in existing options (e.g., hidden fees or delivery delays)',
          'Without showing any product pictures',
          'Without using the internet'
        ],
        correctAnswer: 1,
        explanation: 'Addressing the main frustration buyers hate proves you understand their experience and differentiate positively.'
      },
      {
        id: 'mc_gyb_1_5',
        questionText: 'Why should an online business maintain consistent names, handles, and visual colours across platforms?',
        options: [
          'It builds brand recognition and reassures cautious buyers that the business is legitimate and organized',
          'It disables customer comments automatically',
          'It doubles internet download speed',
          'It is mandatory before opening a WhatsApp account'
        ],
        correctAnswer: 0,
        explanation: 'Consistent branding across touchpoints makes a small vendor appear dependable, memorable, and easy to verify.'
      }
    ]
  },

  // =========================================================================
  // MODULE 2: BUILDING YOUR DIGITAL PRESENCE
  // =========================================================================
  {
    moduleId: 'mod_gyb_2',
    courseId: 'grow-your-business-online',
    sequence: 2,
    sequenceLabel: 'Module 2',
    title: 'Building Your Digital Presence',
    description:
      'Enable learners to create professional, discoverable, and trustworthy digital channels across social media, WhatsApp Business, and Google Business Profile.',
    learningObjectiveIds: ['GYB-PRS-02'],
    lessons: [
      {
        lessonId: 'lesson_gyb_2_1',
        moduleId: 'mod_gyb_2',
        courseId: 'grow-your-business-online',
        title: 'Creating a Professional Social Media Business Presence',
        sequence: 1,
        sequenceLabel: 'Lesson 2.1',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['GYB-PRS-02'],
        introduction:
          'You do not need to be active on seven platforms at once. Picking the right 1 or 2 platforms where your customers already spend time—and setting up a crisp, trustworthy business profile—turns profile visitors into genuine enquiries.',
        lessonContent: [
          'Choosing the Right Social Media Platforms: Match platform strength to your business. Visual products (fashion, beauty, catering, crafts, photography) thrive on Instagram and TikTok. Community-driven local services, estate supplies, and B2B retail perform strongly on Facebook Pages and local groups. Freelancers, trainers, and B2B consultants benefit from LinkedIn alongside Instagram or X.',
          'Creating a Facebook Business Page: Separate from your personal Facebook profile! Use your personal account to create a Page under Meta Business Suite. Set the proper category (e.g., Clothing Brand, Catering Service, Educational Consultant), upload a sharp profile logo/photo and a clean cover banner showing what you offer and how to order.',
          'Setting Up an Instagram Professional Account: Switch from a Personal account to a Professional Account (Business or Creator) in Settings → Account Type and Tools. A Professional account unlocks Insights (reach, profile visits, top posts), industry category labels, and direct Contact buttons (Call / Email / WhatsApp).',
          'Optimising Biographies, Contact Details & Calls to Action: Your bio has roughly 150 characters—make every word earn its space: Line 1 = What you sell & for whom; Line 2 = Location / Delivery coverage; Line 3 = Trust signal or turnaround time; Line 4 = Clear Call to Action ("Tap below to order on WhatsApp ↓"). Put a working link (`wa.me/234...` or link-in-bio) in the website slot.'
        ],
        stepByStepInstructions: [
          'Pick 1 primary discovery platform (e.g., Instagram or TikTok) plus 1 supporting platform (e.g., Facebook Page) based on where your Module 1 persona hangs out.',
          'Switch your Instagram account to a Professional Business Account and create a dedicated Facebook Business Page linked to it.',
          'Design a high-contrast profile picture (clean logo or clear smiling headshot for solo freelancers) that stays readable even at tiny thumbnail size.',
          'Rewrite your Bio using the 4-line template (Offer + Location/Delivery + Proof/Turnaround + Direct CTA) and test your WhatsApp link (`https://wa.me/23480XXXXXXXX`).'
        ],
        nigerianContextExamples: [
          'Fashion & Clothing: An Ankara accessories brand uses Instagram + TikTok to showcase fabric close-ups and styling videos, linking directly to a `wa.me/234...` order chat in its bio.',
          'Education & Training: A JAMB/IELTS online tutor runs a Facebook Business Page aimed at parents and university applicants, featuring an explicit "Book Free Diagnostic Call" WhatsApp CTA button.',
          'Retail & Small Shops: A home appliance repair technician in Port Harcourt optimizes a Facebook Business Page with exact local neighbourhoods covered (GRA, Rumuokoro, Ada George) and a direct phone call button.'
        ],
        toolsAndResources: [
          'Instagram Professional Account & Meta Business Suite (Free)',
          'Facebook Business Pages (Free local storefront & community sharing)',
          'WhatsApp Click-to-Chat Link (`https://wa.me/234...`)',
          'Canva (Free profile cover banners and highlight covers)'
        ],
        practicalDemonstration:
          'Optimising an Instagram Bio (Real Before/After):\n• Poor Bio: "CEO | Blessed | Love Jesus | DM for business | No time wasters"\n• Optimised Business Bio:\n  "Homemade Healthy Granola & Tiger-Nut Drinks 🥣\n   Made fresh weekly in Ibadan • Nationwide Waybill\n   Packs from ₦3,500 • Hygienically sealed\n   👇 Tap link to order on WhatsApp"\n  Link: `https://wa.me/2348012345678?text=Hello%20I%20would%20like%20to%20order`',
        keyTakeaways: [
          'Focus on 1–2 platforms where your buyers actively shop rather than spreading yourself thinly everywhere.',
          'Always use a Professional/Business account instead of a personal account so you get analytics and contact buttons.',
          'A clear bio + working Call-to-Action link converts casual viewers into WhatsApp enquiries effortlessly.'
        ],
        handsOnExercise: {
          title: 'Optimise Your Social Media Bio & Profile Checklist',
          task: 'Draft and configure an optimised Business Bio and CTA link for Instagram or Facebook.',
          steps: [
            'Choose your primary social platform and switch/create a Business profile.',
            'Write your 4-line Bio covering Offer, Delivery Area, Starting Price/Proof, and CTA.',
            'Create and test a pre-filled WhatsApp `wa.me` link so clicking it opens your chat cleanly.'
          ],
          deliverable: 'Screenshot or written copy of your optimised social bio and tested CTA link.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_2_1_1',
            questionText: 'Why should an entrepreneur switch their Instagram account from Personal to Professional (Business)?',
            options: [
              'Personal accounts cannot upload photos',
              'Professional accounts unlock audience analytics (Insights), business category tags, and clickable Contact/Action buttons',
              'Professional accounts automatically buy inventory for you',
              'It hides your posts from potential customers'
            ],
            correctAnswer: 1,
            explanation: 'Professional accounts provide performance analytics and native contact buttons needed to measure reach and capture enquiries.'
          },
          {
            id: 'kc_gyb_2_1_2',
            questionText: 'Which element should ALWAYS appear in an effective social media business bio?',
            options: [
              'A confusing quote with no mention of what you sell',
              'What you offer, where you deliver/serve, and a clear Call to Action with a working contact/order link',
              'Your personal bank PIN',
              'An apology for replying late'
            ],
            correctAnswer: 1,
            explanation: 'Visitors decide in seconds whether your page matches their need; clear offer, location, and CTA link prevent drop-off.'
          },
          {
            id: 'kc_gyb_2_1_3',
            questionText: 'What is the safest strategy for a beginner choosing social media platforms?',
            options: [
              'Try to post 10 times daily on 8 different platforms immediately',
              'Master 1–2 platforms where your target customers already search and buy before expanding',
              'Only use platforms you personally dislike even if your buyers are elsewhere',
              'Refuse to add a phone number or link anywhere'
            ],
            correctAnswer: 1,
            explanation: 'Consistent excellence on 1–2 high-fit platforms beats burned-out inconsistency across too many channels.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'Meta Business Help Center',
            description: 'Official guides on setting up Facebook Pages and Instagram Professional profiles (features may update over time).'
          }
        ]
      },
      {
        lessonId: 'lesson_gyb_2_2',
        moduleId: 'mod_gyb_2',
        courseId: 'grow-your-business-online',
        title: 'WhatsApp Business for Customer Engagement',
        sequence: 2,
        sequenceLabel: 'Lesson 2.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['GYB-PRS-02'],
        introduction:
          'In Nigeria, WhatsApp is where most digital conversations turn into actual bank transfers. Installing the dedicated WhatsApp Business app transforms an ordinary chat line into a structured mini-storefront that saves hours of repetitive typing.',
        lessonContent: [
          'Installing & Configuring WhatsApp Business: Download the free "WhatsApp Business" app (with the "B" logo) from Google Play Store or Apple App Store. Keep in mind that WhatsApp Business features and policies may evolve over time. Using a dedicated business SIM or dual-SIM number helps separate work chats from family messages.',
          'Creating a Professional Business Profile & Business Hours: Under Business Tools → Business Profile, add your business name, category, short description, email, social links, and clear Business Hours (e.g., Monday–Saturday, 8:00 AM–6:00 PM). Setting clear hours manages customer expectations politely.',
          'Creating Product & Service Catalogues: Upload up to 10 crisp photos per item, item title, exact price in Naira (₦), clear size/quantity details, and optional item code. You can share a single product card or your entire catalogue link directly inside any chat—customers can browse and add items to a cart without asking "how much is this one?" 20 times.',
          'Greeting Messages, Away Messages & Quick Replies: Configure a Greeting Message for first-time enquiries ("Welcome to [Brand]! Here is our price guide..."), an Away Message outside working hours so buyers know when you will respond, and Quick Replies with shortcuts like `/prices`, `/delivery`, `/payment`, and `/faq`. Use Chat Labels ("New Lead", "Awaiting Payment", "Paid - To Ship", "Delivered") to stay organized.'
        ],
        stepByStepInstructions: [
          'Install WhatsApp Business and complete every field in Settings → Business Tools → Business Profile (Logo, Category, Description, Hours, Email).',
          'Add at least 3–5 products or service packages to your WhatsApp Catalogue with bright photos, clear titles, descriptions, and Naira (₦) prices.',
          'Turn on an automated Greeting Message welcoming new contacts and pointing them to your Catalogue.',
          'Turn on an Away Message for closed hours and create 4 Quick Replies (`/delivery`, `/account`, `/hours`, `/refund`).',
          'Create 4 colour-coded Chat Labels: New Enquiry, Pending Payment, Paid/Processing, and Completed.'
        ],
        nigerianContextExamples: [
          'Food & Catering: A shawarma & grill vendor configures a WhatsApp Catalogue with clear combo prices (₦3,500 Classic, ₦5,000 Jumbo, ₦1,500 Delivery Add-on) and uses `/zones` Quick Reply to send delivery fees by neighbourhood instantly.',
          'Freelancing & Digital Services: A video editor lists 3 service packages in the WhatsApp Catalogue (Reel Edit ₦10,000, Event Highlight ₦25,000, Monthly Retainer ₦80,000) so prospective clients see clear rates before booking a call.',
          'Retail & Small Shops: A pharmacy/wellness cosmetics shop uses Labels ("Paid - Dispatch", "Restock Notify") to ensure zero paid orders are ever forgotten during busy weekend rushes.'
        ],
        toolsAndResources: [
          'WhatsApp Business App (Android / iOS — Free core business tools)',
          'Canva (Creating neat catalogue cover cards)',
          'Chat Labels & Broadcast Lists (Note: broadcast only reaches contacts who saved your number)'
        ],
        practicalDemonstration:
          'Example Quick Reply Library for Any Nigerian Online Vendor:\n1. Shortcut `/delivery`: "Delivery within [City] costs ₦1,500–₦2,500 via dispatch rider (same-day for orders confirmed before 1 PM). Interstate parks/waybill from ₦3,500 depending on state."\n2. Shortcut `/pay`: "To confirm your order, please pay into [Bank Name] • [Account No] • [Business Account Name] or use our payment link: [Link]. Kindly share your delivery address & active phone number once done."\n3. Shortcut `/greet`: "Hello! Thank you for messaging [Brand Name]. Tap our Catalogue icon at the top right to view items & prices, or reply with what you need today!"',
        keyTakeaways: [
          'WhatsApp Business turns repetitive chats into fast, organized customer service using Catalogues, Quick Replies, and Labels.',
          'Setting clear business hours + an Away Message protects your rest while reassuring late-night browsers.',
          'Chat Labels prevent missed deliveries and help you follow up unpaid leads systematically.'
        ],
        handsOnExercise: {
          title: 'Configure Your WhatsApp Business Tools Pack',
          task: 'Set up your WhatsApp Business profile (or write the exact configuration pack if preparing before SIM activation).',
          steps: [
            'Draft your Business Profile description and operating hours.',
            'Prepare 3 Catalogue entries with item name, price (₦), and 2-line description.',
            'Write 1 Greeting Message, 1 Away Message, and 3 Quick Replies (`/delivery`, `/pay`, `/faq`).'
          ],
          deliverable: 'Screenshots of your WhatsApp Business setup or a complete written configuration sheet.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_2_2_1',
            questionText: 'How does the WhatsApp Business Catalogue reduce friction for online shoppers?',
            options: [
              'It hides all product prices so buyers must beg for quotes',
              'It lets customers browse photos, descriptions, and Naira prices anytime and send specific product enquiries in one tap',
              'It automatically sends money from the seller to the customer',
              'It deletes old chats every morning'
            ],
            correctAnswer: 1,
            explanation: 'A visual, priced catalogue answers routine product questions upfront and speeds up order selection.'
          },
          {
            id: 'kc_gyb_2_2_2',
            questionText: 'What is the best use of WhatsApp Business "Labels"?',
            options: [
              'Tagging chats by stage such as New Lead, Pending Payment, Paid/To Ship, and Delivered so orders never slip through the cracks',
              'Changing the colour of Instagram photos',
              'Sending spam messages to random people',
              'Blocking customers who ask about delivery'
            ],
            correctAnswer: 0,
            explanation: 'Labels act as a simple CRM pipeline inside WhatsApp, helping you track order fulfilment and follow-ups.'
          },
          {
            id: 'kc_gyb_2_2_3',
            questionText: 'When is a WhatsApp Business "Away Message" most useful?',
            options: [
              'During working hours when you are actively replying',
              'Outside business hours (e.g., nights or Sundays) to politely inform customers when you will respond',
              'Instead of creating a product catalogue',
              'Only after deleting your account'
            ],
            correctAnswer: 1,
            explanation: 'Away messages reassure late-night enquirers that their message was received and set clear response expectations.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'WhatsApp Business Official Help Center',
            description: 'Step-by-step documentation on Catalogues, Messaging Tools, and WhatsApp Commerce Policies (subject to Meta updates).'
          }
        ]
      },
      {
        lessonId: 'lesson_gyb_2_3',
        moduleId: 'mod_gyb_2',
        courseId: 'grow-your-business-online',
        title: 'Google Business Profile and Online Discoverability',
        sequence: 3,
        sequenceLabel: 'Lesson 2.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['GYB-PRS-02'],
        introduction:
          'When someone searches Google Maps for "cake baker near Wuse 2", "barber in Surulere", or "laptop repair in Nsukka", Google displays local listings through Google Business Profile (GBP). Understanding how GBP works—and what alternatives exist if you operate purely online without a physical shop—gives your business powerful search visibility.',
        lessonContent: [
          'Understanding Local Business Visibility: Search intent is gold. Unlike social media where people are scrolling for entertainment, people searching on Google Search and Google Maps already want to buy right now. Google Business Profile (formerly Google My Business) is a free listing showing your business name, phone number, hours, photos, directions, website/WhatsApp link, and customer reviews.',
          'Eligibility Rules & Important Alternatives (Read Carefully): Google Business Profile requires either (a) a staffed physical storefront with permanent signage where customers visit during stated hours, OR (b) a legitimate service-area business that visits or delivers to customers face-to-face (with your home street hidden if you do not serve walk-ins). Purely online-only businesses or virtual resellers without an eligible storefront or in-person service area are NOT eligible under Google guidelines—and verification rules or platform policies may change at any time. Never fake an address or buy unverified pins!',
          'Documented Alternatives for Online-Only / Home-Based Beginners: If you do not yet meet Google Business Profile eligibility, build search discoverability through: (1) A clean one-page portfolio/store link (Google Sites, Carrd, Selar, or Mainstack) indexed with clear city/product keywords; (2) An active Facebook Business Page + Instagram account using local hashtags and location tags; (3) Reputable Nigerian directories or marketplace listings where allowed.',
          'Managing Photos, Updates & Customer Reviews (For Eligible Profiles): Upload bright real photos (exterior signage if storefront, products, team at work), publish weekly Google Updates/Offers, keep hours accurate on public holidays, and politely invite satisfied clients to leave genuine, honest reviews—then reply courteously to every review (both positive and critical).'
        ],
        stepByStepInstructions: [
          'Check Eligibility Honestly: Determine whether your business has a staffed physical location or in-person local service area (eligible for GBP) OR is purely online/home-reseller (use free alternatives below).',
          'If Eligible: Visit `business.google.com`, enter your exact business name and primary category, choose Storefront or Service Area (hide home address if no walk-ins), add your WhatsApp/phone/hours, and complete Google’s current verification step (video/phone/postcard—methods vary by region).',
          'If Not Eligible Yet (Online-Only Alternative): Create a free 1-page storefront or portfolio on Google Sites, Carrd, or Mainstack containing your city, service keywords, prices, and WhatsApp button so Google Search can still index your business.',
          'Collect Honest Reviews & Social Proof: After delivering great service, send buyers your review link (or ask for WhatsApp feedback permission) and respond professionally to every comment.'
        ],
        nigerianContextExamples: [
          'Eligible Storefront / Service Area Example: A tailoring studio in Ikeja with shop signage sets up a verified Google Business Profile showing opening hours (Mon–Sat 9 AM–6 PM), bridal/corporate sewing photos, and phone number—attracting urgent alteration customers searching Google Maps.',
          'Eligible Service-Area Example: A mobile event photographer in Uyo lists as a Service Area Business covering Akwa Ibom without exposing their home residence on the map.',
          'Non-Eligible Online Alternative Example: A corps member dropshipping phone accessories from their shared lodge skips fake GBP pins and instead builds a free Google Sites mini-catalogue titled "Affordable Laptop & Phone Accessories in Makurdi" linked in their Instagram & Facebook bios.'
        ],
        toolsAndResources: [
          'Google Business Profile (`https://business.google.com` — eligibility & verification rules apply)',
          'Google Sites (`https://sites.google.com` — free, zero-cost searchable 1-page site)',
          'Mainstack / Selar / Carrd (Lightweight mobile storefront pages)'
        ],
        practicalDemonstration:
          'How to Ask a Satisfied Customer for a Review (Without Being Pushy):\n"Hi [Customer Name], thank you again for trusting [Brand Name] with your [Product/Service]! Because we are a growing local business, honest reviews help new customers trust us. If you had a great experience, could you spare 30 seconds to leave a quick review here? [Direct Link]. Wishing you a wonderful week!"\nAnd when replying to a 5-star review: "Thank you so much, [Name]! We truly enjoyed baking your mum’s birthday cake in Garki and look forward to serving you again."',
        keyTakeaways: [
          'Google Business Profile captures high-intent local buyers actively searching on Google Search and Maps.',
          'Follow Google’s eligibility rules strictly—if you are online-only without a qualifying location/service area, use a searchable 1-page site and Facebook Page instead.',
          'Authentic customer reviews and accurate contact hours dramatically boost local trust.'
        ],
        handsOnExercise: {
          title: 'Local Discoverability Plan (GBP or Online Alternative)',
          task: 'Determine your eligibility and prepare your discoverability profile.',
          steps: [
            'State clearly whether your business qualifies for Google Business Profile (storefront vs. service area) or needs the online-only alternative.',
            'Write your 100-word SEO-friendly business description including your city/neighbourhood and top 3 services/products.',
            'Draft a polite 2-sentence review request message plus a sample owner reply.'
          ],
          deliverable: 'Your Discoverability Setup Note + Review Request & Reply Script.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_2_3_1',
            questionText: 'Why is Google Search / Google Business Profile traffic often called "high-intent" traffic?',
            options: [
              'Because people searching on Google are actively looking for a specific solution or nearby vendor right now',
              'Because Google forces people to buy items against their will',
              'Because only millionaires use Google Maps',
              'Because listings cost ₦500,000 per month'
            ],
            correctAnswer: 0,
            explanation: 'Users typing "dry cleaner near me" or "cake shop in Yaba" already intend to purchase, unlike passive social scrollers.'
          },
          {
            id: 'kc_gyb_2_3_2',
            questionText: 'What should a purely online home-based seller without an eligible physical shop or in-person service area do regarding Google Business Profile?',
            options: [
              'Invent a fake street address at a busy shopping plaza',
              'Respect eligibility guidelines and instead use a searchable 1-page website (like Google Sites/Carrd), Facebook Page, and clear local keywords',
              'Quit running their business entirely',
              'Use a competitor’s shop address as their own'
            ],
            correctAnswer: 1,
            explanation: 'Faking addresses violates platform policies and risks suspension. Using an indexed landing page + social pages builds legitimate search presence.'
          },
          {
            id: 'kc_gyb_2_3_3',
            questionText: 'What is the best way to handle customer reviews on Google Business Profile or social pages?',
            options: [
              'Buy fake reviews from strangers',
              'Invite real customers to leave honest reviews and respond politely to both praise and criticism',
              'Never reply to anyone',
              'Insult customers who ask questions'
            ],
            correctAnswer: 1,
            explanation: 'Authentic reviews plus gracious, professional owner responses show prospective buyers that you care about service quality.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'Google Business Profile Guidelines',
            description: 'Review current eligibility, verification, and service-area rules directly from Google Help.',
            url: 'https://support.google.com/business'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 2 Assignment: Digital Presence & WhatsApp Setup',
      description:
        'Create or improve a business social media presence and set up a WhatsApp Business profile. Include screenshots or links as evidence, and explain alternatives if you do not have an eligible physical business location.',
      deliverables: [
        'Link or screenshot of an optimised Instagram Professional or Facebook Business Page (bio, category, CTA link)',
        'Screenshots or full configuration script of your WhatsApp Business profile, 3+ catalogue items, Greeting/Away messages, and Quick Replies',
        'Short explanation covering your Google Business Profile setup OR your documented searchable alternative (e.g., Google Sites/Mainstack/Facebook) if you operate purely online'
      ],
      submissionNote: 'Save your screenshots and links in a Google Doc or Drive folder for your final Capstone submission.'
    },
    knowledgeCheck: [
      {
        id: 'mc_gyb_2_1',
        questionText: 'Which combination makes a social media business bio effective at driving enquiries?',
        options: [
          'Quotes, emojis only, and "DM for price"',
          'Clear product/service summary, delivery area, starting price or proof, and a clickable WhatsApp/order link',
          'Listing ten unrelated personal hobbies',
          'Turning your account private so strangers cannot view products'
        ],
        correctAnswer: 1,
        explanation: 'Public visibility, clarity of offer/location, and an easy one-tap CTA maximize incoming enquiries.'
      },
      {
        id: 'mc_gyb_2_2',
        questionText: 'Which WhatsApp Business tool lets you send bank transfer details or delivery rates in two seconds using a shortcut like `/pay`?',
        options: [
          'Quick Replies',
          'Wallpaper settings',
          'Status privacy',
          'Voice note speed'
        ],
        correctAnswer: 0,
        explanation: 'Quick Replies save reusable message templates triggered by `/` shortcuts.'
      },
      {
        id: 'mc_gyb_2_3',
        questionText: 'Why should an eligible home-based service provider (like a mobile makeup artist) select "Service Area" instead of displaying a private home address on Google Business Profile?',
        options: [
          'It protects family privacy while still letting nearby customers find them across covered towns or LGAs',
          'It makes their phone battery last ten days',
          'It lets them charge customers without delivering services',
          'It hides their phone number from everyone'
        ],
        correctAnswer: 0,
        explanation: 'Service-area configuration supports businesses that travel to clients without exposing private residential addresses or claiming non-existent walk-in shops.'
      },
      {
        id: 'mc_gyb_2_4',
        questionText: 'If a business is purely online-only without a qualifying physical shop or face-to-face service area, what is the recommended alternative to Google Business Profile?',
        options: [
          'Registering a fake address at a random fuel station',
          'Publishing a keyword-rich 1-page storefront (e.g., Google Sites, Mainstack, or Carrd) plus an optimised Facebook Business Page',
          'Deleting all social media accounts',
          'Using only SMS text messages'
        ],
        correctAnswer: 1,
        explanation: 'Legitimate searchable 1-page web profiles and optimised social pages provide discoverability without violating Google listing policies.'
      },
      {
        id: 'mc_gyb_2_5',
        questionText: 'What is the purpose of switching from a regular WhatsApp Messenger account to WhatsApp Business for commercial selling?',
        options: [
          'To access catalogues, business hours, greeting/away automation, quick replies, and customer labels',
          'To stop receiving messages from customers',
          'To get free unlimited data bundles',
          'To convert Naira into Dollars automatically'
        ],
        correctAnswer: 0,
        explanation: 'WhatsApp Business is specifically built with free storefront and workflow tools for small enterprises.'
      }
    ]
  },

  // =========================================================================
  // MODULE 3: CONTENT CREATION AND SOCIAL MEDIA MARKETING
  // =========================================================================
  {
    moduleId: 'mod_gyb_3',
    courseId: 'grow-your-business-online',
    sequence: 3,
    sequenceLabel: 'Module 3',
    title: 'Content Creation and Social Media Marketing',
    description:
      'Teach learners to plan content pillars, design sharp promotional graphics with Canva and AI, and maintain a practical 7-day social media content calendar.',
    learningObjectiveIds: ['GYB-CNT-03'],
    lessons: [
      {
        lessonId: 'lesson_gyb_3_1',
        moduleId: 'mod_gyb_3',
        courseId: 'grow-your-business-online',
        title: 'Understanding Content Marketing',
        sequence: 1,
        sequenceLabel: 'Lesson 3.1',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['GYB-CNT-03'],
        introduction:
          'Posting "Buy Now! ₦5,000!" every single day pushes followers away because nobody follows an account just to watch non-stop commercials. Content marketing earns attention and buyer confidence by mixing helpful, interesting, trust-building, and promotional posts.',
        lessonContent: [
          'What Content Marketing Means: Content marketing is creating useful photos, videos, carousels, and written posts that attract your target buyers, educate them about your industry, build emotional trust, and smoothly guide them toward purchasing.',
          'The 4 Types of Business Content: (1) Educational ("3 ways to store fresh catfish so it stays crispy"); (2) Trust-Building / Social Proof (behind-the-scenes hygiene checks, order packing videos, honest customer feedback); (3) Entertaining / Relatable (short skits or memes about everyday customer situations in your niche); (4) Promotional (clear product showcase, bundle prices, seasonal offers, and explicit order CTA).',
          'Understanding Customer Buying Stages: Most people seeing your brand for the first time are at the Awareness stage—not ready to pay yet. As they watch how-to tips and packaging videos (Consideration stage), trust grows. When they need the item or see a clear bundle offer (Decision stage), your brand is top of mind.',
          'Choosing Suitable Formats: Single sharp product flyers (WhatsApp Status & Instagram feed), swipeable Carousels (educational step-by-step checklists), and 15–45 second vertical videos/Reels/TikToks (product demonstrations, before-and-after transformations, voiceover tips).'
        ],
        stepByStepInstructions: [
          'Audit your last 10 posts (or competitor pages) and classify each post as Educational, Trust-Building, Entertaining, or Promotional.',
          'Adopt a healthy beginner ratio: roughly 60–70% helpful/trust-building/relatable content and 30–40% direct promotional offers.',
          'Choose 2 primary formats you can produce comfortably every week with just a smartphone (e.g., 1 Canva flyer/carousel + 2 short 20-second vertical videos).',
          'Match one specific customer question to each buying stage so every post moves someone closer to buying.'
        ],
        nigerianContextExamples: [
          'Agriculture & Agribusiness: A honey seller in Kaduna stops posting only bottles and shares a 25-second video showing how raw honey behaves in water alongside packaging hygiene—enquiries rise because buyers trust purity.',
          'Retail & Small Shops: A phone accessories vendor posts a short carousel: "3 signs your fast charger is damaging your battery" (Educational) followed by Slide 4 showcasing their genuine ₦8,500 UK-used/certified cable with warranty (Promotional).',
          'Education & Training: A phonics & numeracy home tutor posts a 30-second video teaching parents one easy reading game at home, ending with "Message for ₦15,000/month weekend classes in Kubwa."'
        ],
        toolsAndResources: [
          'Instagram Reels / TikTok / YouTube Shorts (Vertical discovery video)',
          'Canva Carousels (Educational multi-slide graphics)',
          'WhatsApp Status (Daily conversational selling & behind-the-scenes updates)'
        ],
        practicalDemonstration:
          'Mapping 1 Product Across 4 Content Types (Example: Skincare Shea Cream at ₦4,500):\n• Educational Carousel: "Why applying cream on damp skin locks moisture 2x longer during Harmattan."\n• Trust-Building Video: "Watch us whip and seal today’s fresh batch with sanitized jars."\n• Relatable/Entertaining Reel: "POV: When your roommate keeps dipping into your ₦4,500 body butter."\n• Promotional Flyer: "Harmattan Rescue Duo: Whipped Shea + Body Oil for ₦8,000 (Save ₦1,000). Tap bio link to order!"',
        keyTakeaways: [
          'Effective business accounts mix educational, trust-building, relatable, and promotional posts rather than shouting "Buy now!" constantly.',
          'Match content depth to customer buying stages—first educate and prove quality, then ask for the sale.',
          'Consistent simple smartphone formats beat complicated productions you can only post once a quarter.'
        ],
        handsOnExercise: {
          title: 'Create 4 Content Ideas Across the Content Mix',
          task: 'Pick one core product or service from your business and brainstorm one post idea for each of the four content types.',
          steps: [
            'Write 1 Educational post idea teaching something useful.',
            'Write 1 Trust-Building post idea showing process, quality, or packing.',
            'Write 1 Entertaining/Relatable idea tied to your customer’s daily life.',
            'Write 1 Promotional offer post with exact Naira pricing and CTA.'
          ],
          deliverable: 'A 4-row Content Mix Planning Table.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_3_1_1',
            questionText: 'Why do accounts that post ONLY "Buy Now" promotional flyers every day often get low engagement?',
            options: [
              'Because followers want value, proof, and relatable content—not non-stop advertisements with zero trust building',
              'Because social media platforms delete promotional words automatically',
              'Because buyers prefer not knowing what is for sale',
              'Because flyers cannot be viewed on Android devices'
            ],
            correctAnswer: 0,
            explanation: 'Balancing helpful, trust-building, and promotional content keeps audiences engaged while warming prospects up to buy.'
          },
          {
            id: 'kc_gyb_3_1_2',
            questionText: 'Which type of post is a behind-the-scenes clip showing neat packaging and accurate order weighing?',
            options: [
              'Pure spam',
              'Trust-building / Social proof content',
              'Paid television commercial',
              'Financial balance sheet'
            ],
            correctAnswer: 1,
            explanation: 'Showing your care, hygiene, and real fulfilment process reassures sceptical first-time buyers.'
          },
          {
            id: 'kc_gyb_3_1_3',
            questionText: 'Which format works especially well on Instagram and LinkedIn for teaching a 4-step tip?',
            options: [
              'A multi-slide Educational Carousel',
              'A blurry 1-pixel image',
              'An empty black screen',
              'A voice note with no text'
            ],
            correctAnswer: 0,
            explanation: 'Swipeable carousels present step-by-step advice cleanly and encourage saves and shares.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'Instagram Creators Educational Tips',
            description: 'Platform guidance on storytelling hooks, carousels, and Reels structure.'
          }
        ]
      },
      {
        lessonId: 'lesson_gyb_3_2',
        moduleId: 'mod_gyb_3',
        courseId: 'grow-your-business-online',
        title: 'Creating Business Content with Canva and AI',
        sequence: 2,
        sequenceLabel: 'Lesson 3.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['GYB-CNT-03'],
        introduction:
          'You do not need expensive graphic designers or studio equipment to create clean flyers, product ads, and short videos. Combining Canva’s free mobile templates with AI assistants like ChatGPT or Gemini lets you produce high-clarity marketing materials in minutes.',
        lessonContent: [
          'Introduction to Canva for Business: Canva is available free on Android, iOS, and web (with optional paid Pro features; features and pricing may change). Start with the right canvas size: `1080 × 1080` or `1080 × 1350` (4:5 portrait occupies more mobile screen space) for feed posts/ads, and `1080 × 1920` for WhatsApp Status, Reels, and TikTok.',
          'Designing Clean Promotional Graphics & Product Ads: Follow the Rule of 3: Maximum 2 fonts (one bold headline font, one clean body font), maximum 2–3 brand colours, and plenty of breathing space around your product photo. Every promotional flyer needs: (1) Attention headline ("Fresh Weekend Suya Box"), (2) Bright clear product photo, (3) Exact Naira price ("₦6,500"), and (4) Prominent CTA ("Order on WhatsApp: 080...").',
          'Creating Short-Form Video Content on a Phone: Wipe your camera lens before shooting! Stand facing a bright window or shaded outdoor courtyard (never stand with a bright window behind you). Shoot 3–5 short 3-second clips showing the product in use, stitch them inside CapCut or Canva Video, add large legible captions for people watching on mute, and open with a visual/text hook in the first 3 seconds.',
          'Using ChatGPT or Gemini for Content Ideas, Captions & Responsible AI: Use structured AI prompts (Role + Business + Audience + Offer + Tone + CTA) to brainstorm 10 video hooks, carousel outlines, or persuasive WhatsApp broadcast copy. Always review and edit AI outputs carefully: remove robotic clichés ("delve into", "unlock your potential"), replace Dollars with Naira (₦), verify every claim or product detail so you never publish fabricated benefits, and never share private customer names or phone numbers inside public AI prompts.'
        ],
        stepByStepInstructions: [
          'Open Canva and choose an Instagram Portrait (`1080 × 1350`) or Square (`1080 × 1080`) template that has uncluttered layout and clear typography.',
          'Replace template colours with your 2 brand colours, swap in a crisp natural-light photo of your product, and verify the headline + Naira price can be read easily without zooming on a small phone screen.',
          'Prompt ChatGPT or Gemini with your business details to draft 3 caption variations: one short punchy caption, one storytelling caption, and one urgent weekend offer caption.',
          'Edit the AI draft personally so it sounds natural to Nigerian buyers, double-check prices and delivery terms, and add clear hashtags + WhatsApp CTA.'
        ],
        nigerianContextExamples: [
          'Food & Catering: A pastry vendor uses Canva to design a clean 4:5 flyer showing a close-up meat-pie box photo taken beside a kitchen window, bold headline "Weekend Pastry Box", price "₦7,500 (6 Meat Pies + 4 Sausage Rolls)", and "Pre-order closes Friday 4 PM".',
          'Photography & Creative Services: A portrait photographer uses Gemini to brainstorm 7 Reel ideas answering client worries ("What colours photograph best outdoors in Lagos sun?") rather than copying generic foreign tips.',
          'Beauty & Personal Care: A hair vendor rejects an AI-generated caption claiming "cures baldness overnight" (unsafe, misleading claim) and edits it responsibly to "nourishes dry scalp and reduces breakage with consistent weekly use."'
        ],
        toolsAndResources: [
          'Canva Mobile / Web (Free graphic & short video design; Pro optional)',
          'CapCut / InShot (Beginner-friendly mobile video trimming & captions)',
          'Google Gemini / ChatGPT (Content brainstorming & caption drafting)'
        ],
        practicalDemonstration:
          'Copy-and-Paste AI Caption Prompt Template:\n"Act as a practical social media marketer for a Nigerian small business. My business sells [product/service, e.g., handmade Ankara laptop sleeves] at [price, e.g., ₦9,500] to [target customer, e.g., young professionals and corps members in Abuja]. Write 3 social media captions (under 90 words each): (1) Educational tip, (2) Problem-solution hook, (3) Limited weekend bundle offer. Keep the tone warm, natural, and clear without clichés. End each with a WhatsApp order Call to Action."',
        keyTakeaways: [
          'Keep promotional graphics uncluttered—large headline, crisp natural-light photo, Naira price, and single CTA.',
          'In short video, clean lighting, clear audio/captions, and a strong 3-second opening hook matter far more than expensive cameras.',
          'AI speeds up brainstorming and caption writing, but humans must edit tone, verify facts, and remove exaggerated claims.'
        ],
        handsOnExercise: {
          title: 'Design a Promotional Flyer + AI-Assisted Caption',
          task: 'Produce one clean promotional asset and pair it with an edited AI-assisted caption.',
          steps: [
            'Create a `1080 × 1350` or `1080 × 1080` Canva promotional flyer for one product/service with clear Naira pricing and CTA.',
            'Run the practical AI prompt above using Gemini or ChatGPT.',
            'Human-edit the output to ensure natural Nigerian phrasing, accurate specs, and zero false promises.'
          ],
          deliverable: '1 exported Canva flyer graphic + 1 final human-edited promotional caption.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_3_2_1',
            questionText: 'Which 4 elements should every clear promotional product flyer contain?',
            options: [
              '15 paragraphs of small text, 6 different fonts, no price, and a blurry background',
              'Clear headline, crisp product photo, transparent Naira (₦) price, and a single Call to Action',
              'Only your personal selfie and favourite song lyrics',
              'Hidden contact details so followers have to guess how to reach you'
            ],
            correctAnswer: 1,
            explanation: 'Clean hierarchy (headline, photo, price, CTA) lets mobile users absorb your offer in under 3 seconds.'
          },
          {
            id: 'kc_gyb_3_2_2',
            questionText: 'What is the most important responsible-AI check before publishing an AI-written marketing caption?',
            options: [
              'Copy and paste immediately without reading it',
              'Verify every product claim, replace foreign currency/clichés with accurate local details, and remove exaggerated promises',
              'Paste private customer phone numbers into the AI chat',
              'Ask the AI to invent fake five-star reviews'
            ],
            correctAnswer: 1,
            explanation: 'Responsible marketers verify accuracy, protect customer privacy, and never publish fabricated claims or fake reviews.'
          },
          {
            id: 'kc_gyb_3_2_3',
            questionText: 'Why should you add large on-screen text captions to short promotional Reels or TikToks?',
            options: [
              'Many mobile users watch short videos with sound muted or in noisy environments, and captions clarify your hook immediately',
              'Because phone speakers cannot play music in Nigeria',
              'To cover up the entire product so viewers cannot see it',
              'Because captions automatically double your product price'
            ],
            correctAnswer: 0,
            explanation: 'Readable captions retain silent scrollers and reinforce key benefits and prices visually.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'Canva Design School',
            description: 'Free beginner visual layout and typography tutorials inside Canva’s learning hub.'
          }
        ]
      },
      {
        lessonId: 'lesson_gyb_3_3',
        moduleId: 'mod_gyb_3',
        courseId: 'grow-your-business-online',
        title: 'Building a Social Media Content Calendar',
        sequence: 3,
        sequenceLabel: 'Lesson 3.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['GYB-CNT-03'],
        introduction:
          'Waking up every morning wondering "what should I post today?" leads to burnout and weeks of silence. A weekly Content Calendar built around 3–4 Content Pillars turns content creation into a calm 2-hour weekly habit.',
        lessonContent: [
          'What Are Content Pillars? Content pillars are 3 to 4 repeatable themes your page talks about every week so you never run out of ideas. Example for a Clothing Business: Pillar 1 = Styling & Sizing Guides; Pillar 2 = Behind-the-Scenes & Fabric Quality; Pillar 3 = Customer Fit Reviews & Unboxing; Pillar 4 = New Arrivals & Bundle Offers.',
          'Planning Weekly Content Without Burnout: Batch-create! Spend 1 hour every Saturday afternoon taking photos/short clips and designing 4–5 Canva graphics, then write captions in one sitting. Consistency (e.g., 4 quality posts per week + daily WhatsApp Status updates) beats posting 6 times one day and disappearing for 3 weeks.',
          'Writing Captions with Structure & CTAs: Follow Hook → Value/Story → Offer → Clear Call to Action. Examples of strong CTAs: "Reply \'MENU\' on WhatsApp", "Save this post for your next outfit shopping", "Tap the link in bio before slots close at 5 PM".',
          'Scheduling & Measuring Engagement: Meta Business Suite allows free scheduling for Facebook and Instagram posts (features subject to Meta changes). Each Sunday, spend 10 minutes reviewing Insights: Which post got the most Saves, Shares, Profile Visits, or WhatsApp Link Clicks? Likes feel nice, but Saves, Shares, and DMs/Clicks predict real sales!'
        ],
        stepByStepInstructions: [
          'Define 4 Content Pillars tailored specifically to your business niche and target customer.',
          'Create a simple 7-day table (Monday to Sunday) assigning: Day, Content Pillar, Format (Reel/Carousel/Flyer/Status), Topic/Hook, and Call to Action.',
          'Schedule or prepare 3–5 feed posts in advance using Meta Business Suite or a Drafts folder, plus simple daily WhatsApp Status updates.',
          'Set a weekly 10-minute Sunday review checking Saves, Shares, Profile Visits, and incoming WhatsApp enquiries.'
        ],
        nigerianContextExamples: [
          'Agribusiness: A palm oil & crayfish vendor schedules Monday (Storage tip carousel), Wednesday (Market sourcing reel), Friday (Customer delivery feedback screenshot), Saturday (5-Litre Payday Combo Flyer)—avoiding last-minute panic on busy market days.',
          'Freelancing & Digital Services: A CV writer posts Monday (Common CV mistake), Tuesday (Before/After CV bullet makeover), Thursday (Interview tip on WhatsApp Status), Saturday ("3 slots open for CV + LinkedIn revamp at ₦12,000").',
          'Home-Based Business: A student/corper running a laundry pickup service uses Saturday morning to schedule all Instagram & Facebook posts for the week using free Meta Business Suite so classes or PPA duties do not interrupt visibility.'
        ],
        toolsAndResources: [
          'Google Sheets / Notebook (7-Day Content Calendar Grid)',
          'Meta Business Suite Planner (Free Facebook & Instagram scheduling)',
          'Instagram & TikTok Insights (Tracking Saves, Shares, Reach, Link Clicks)'
        ],
        practicalDemonstration:
          '7-Day Content Calendar Blueprint (Sample Fashion Retail Brand):\n• Mon: Pillar 1 (Educational Carousel) — "3 fabrics that keep you cool in Lagos traffic" | CTA: Save for later.\n• Tue: WhatsApp Status Only — Behind-the-scenes ironing & quality check clips.\n• Wed: Pillar 2 (Short Reel, 20s) — "How our ₦12,000 linen shirt fits sizes M–XL" | CTA: Message `LINEN` on WhatsApp.\n• Thu: Pillar 3 (Social Proof Graphic) — Verified delivery unboxing clip + customer message.\n• Fri: Pillar 4 (Promotional Flyer) — "2-Shirt Weekend Bundle: ₦22,000 + Free Ikeja Delivery" | CTA: Tap bio link.\n• Sat: Community Poll on Stories/Status — "Which colour restock next week: Olive or Navy?"\n• Sun: Weekly Analytics Review + Batch Content Prep for next week.',
        keyTakeaways: [
          '3–4 Content Pillars eliminate "what do I post today?" stress permanently.',
          'Batch-creating and scheduling content weekly keeps your business visible even during busy workdays.',
          'Measure Saves, Shares, Profile Visits, and Enquiry DMs—not just vanity likes.'
        ],
        handsOnExercise: {
          title: 'Build Your Complete 7-Day Content Calendar',
          task: 'Draft a full Monday-to-Sunday content schedule for your business.',
          steps: [
            'List your 4 Content Pillars at the top of the page.',
            'Fill in all 7 days with Platform, Format, Working Headline/Hook, and specific Call to Action.',
            'Highlight which 2 metrics you will review at the end of the 7 days.'
          ],
          deliverable: 'Your completed 7-Day Social Media Content Calendar.'
        },
        knowledgeCheck: [
          {
            id: 'kc_gyb_3_3_1',
            questionText: 'What are "Content Pillars" in a social media content calendar?',
            options: [
              'Concrete pillars outside a physical shop',
              '3 to 4 recurring core themes your business rotates through each week so content stays focused and easy to plan',
              'Expensive software costing ₦100,000/month',
              'Random viral dance videos unrelated to your business'
            ],
            correctAnswer: 1,
            explanation: 'Content pillars give structure to your weekly planning and help audiences clearly associate your brand with specific expertise.'
          },
          {
            id: 'kc_gyb_3_3_2',
            questionText: 'Which engagement metrics usually indicate stronger buying or referral interest than a quick passive Like?',
            options: [
              'Saves, Shares, Profile Visits, and WhatsApp Link Clicks / DMs',
              'How many seconds it took to upload the photo',
              'Your own view count from refreshing the page',
              'Changing your username twice'
            ],
            correctAnswer: 0,
            explanation: 'Saves, Shares, and Clicks show active intent, reference value, and willingness to enquire.'
          },
          {
            id: 'kc_gyb_3_3_3',
            questionText: 'Why do experienced small business marketers recommend "batch-creating" content once a week?',
            options: [
              'It saves hours of daily stress, maintains steady posting consistency, and keeps visual quality unified',
              'Because phones only turn on cameras on Saturdays',
              'Because scheduling posts deletes comments',
              'To avoid talking to customers'
            ],
            correctAnswer: 0,
            explanation: 'Batching photography, Canva design, and caption writing frees up weekdays for order fulfilment and customer service.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'Meta Business Suite Content Planner Guide',
            description: 'Overview of free scheduling and post insights across Facebook and Instagram.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 3 Assignment: 5 Promotional Designs & 7-Day Content Calendar',
      description:
        'Create five promotional content designs and a seven-day content calendar for a real or proposed business.',
      deliverables: [
        '5 promotional content designs created in Canva (or image + caption mockups covering different offers/angles with transparent Naira pricing & clear CTAs)',
        '4 defined Content Pillars tailored to your chosen business',
        'A complete 7-Day Content Calendar table specifying Day, Pillar, Format, Hook, Caption summary, and CTA'
      ],
      submissionNote: 'These designs and your 7-day calendar fulfill Deliverables 7 and 8 of your Capstone Project.'
    },
    knowledgeCheck: [
      {
        id: 'mc_gyb_3_1',
        questionText: 'Which mix of content best builds a loyal audience that converts into paying customers?',
        options: [
          '100% urgent sales flyers with zero educational or behind-the-scenes context',
          'A balanced mix of Educational, Trust-Building, Relatable/Entertaining, and Promotional posts',
          'Posting personal political rants daily on your business handle',
          'Posting once every four months'
        ],
        correctAnswer: 1,
        explanation: 'Balancing value, proof, personality, and clear offers warms audiences naturally toward buying.'
      },
      {
        id: 'mc_gyb_3_2',
        questionText: 'When designing a product ad in Canva, what helps mobile viewers understand your offer instantly?',
        options: [
          'Using 6 decorative script fonts and tiny paragraphs',
          'Maximum 2 clean fonts, high contrast, one bright product photo, clear Naira price, and a single CTA',
          'Hiding the product behind bright stickers',
          'Omitting both price and contact information'
        ],
        correctAnswer: 1,
        explanation: 'Visual simplicity and prominent pricing/CTA reduce friction for busy mobile scrollers.'
      },
      {
        id: 'mc_gyb_3_3',
        questionText: 'What is the safest and most effective rule when using ChatGPT or Gemini to draft promotional captions?',
        options: [
          'Ask AI to invent fake customer testimonials and medical guarantees',
          'Use AI for ideas and structure, then edit personally for Nigerian context, accuracy, and honest claims',
          'Paste full customer names and bank details into AI prompts',
          'Publish everything unedited even when prices are listed in Dollars'
        ],
        correctAnswer: 1,
        explanation: 'Human editing guarantees truthful claims, Naira accuracy, authentic tone, and customer privacy.'
      },
      {
        id: 'mc_gyb_3_4',
        questionText: 'Which structure makes social media captions convert better?',
        options: [
          'Hook → Useful Value or Product Benefit → Transparent Offer/Price → Clear Call to Action',
          'A single period mark with no words',
          '50 random hashtags and zero explanation',
          'Complaining about low likes'
        ],
        correctAnswer: 0,
        explanation: 'A strong hook stops scrolling, value builds desire, and a clear CTA tells the buyer exactly how to order.'
      },
      {
        id: 'mc_gyb_3_5',
        questionText: 'Which practice keeps small business owners consistent on social media during busy weeks?',
        options: [
          'Waiting for inspiration every morning at 11 AM',
          'Batch-creating designs/videos weekly around 3–4 Content Pillars and scheduling them ahead of time',
          'Deleting posts after 10 minutes',
          'Buying automated bot comments'
        ],
        correctAnswer: 1,
        explanation: 'Content pillars + weekly batching keep channels active without disrupting daily operations.'
      }
    ]
  }
];
