import { AcademyCourse } from '../../types';

export const COURSE_DIGITAL_ENTREPRENEURSHIP: AcademyCourse = {
  courseId: 'course_digital_entrepreneurship',
  categoryId: 'digital_business_entrepreneurship',
  title: 'Digital Entrepreneurship and Online Business',
  description: 'A hands-on, practical guide to starting, managing, and scaling an online business in Nigeria. Master market research, social commerce, WhatsApp Business funnels, Nigerian fintech payments (Paystack, Flutterwave), bookkeeping, and customer retention.',
  targetAudience: 'Serving NYSC Corps Members, aspiring digital entrepreneurs, side-hustlers, artisans, and small business owners seeking sustainable digital revenue.',
  entryRequirements: 'A smartphone or computer with internet access and basic social media or messaging familiarity.',
  expectedDuration: '4 Weeks (Self-Paced • 12 Core Lessons)',
  themeColor: 'purple',
  iconName: 'TrendingUp',
  active: true,
  version: '2026.1',
  learningObjectives: [
    {
      id: 'ENT-FND-01',
      code: 'ENT-FND-01',
      title: 'Digital Business Models & Idea Validation',
      description: 'Differentiate digital business models, conduct low-cost market research, and validate customer demand before spending capital.'
    },
    {
      id: 'ENT-MKT-02',
      code: 'ENT-MKT-02',
      title: 'Online Storefronts & Social Media Marketing',
      description: 'Set up WhatsApp Business catalogs, landing pages, content marketing calendars, and promotional copywriting.'
    },
    {
      id: 'ENT-SLS-03',
      code: 'ENT-SLS-03',
      title: 'Digital Payments & Fintech Integration',
      description: 'Integrate automated payment gateways (Paystack/Flutterwave), verify receipts, prevent fraud, and manage customer retention.'
    },
    {
      id: 'ENT-OPS-04',
      code: 'ENT-OPS-04',
      title: 'Operations, Bookkeeping & Sustainable Scaling',
      description: 'Track revenue and expenses with digital spreadsheets, monitor customer lifetime value, and build strategic growth partnerships.'
    }
  ],
  modules: [
    {
      moduleId: 'mod_ent_1',
      courseId: 'course_digital_entrepreneurship',
      sequence: 1,
      sequenceLabel: 'Module 1',
      title: 'Digital Entrepreneurship Fundamentals',
      description: 'Understand the mechanics of online businesses, customer problem discovery, and value proposition design.',
      learningObjectiveIds: ['ENT-FND-01'],
      lessons: [
        {
          lessonId: 'lesson_ent_1_1',
          moduleId: 'mod_ent_1',
          courseId: 'course_digital_entrepreneurship',
          title: 'Understanding Digital Entrepreneurship and Business Models',
          sequence: 1,
          sequenceLabel: 'Lesson 1.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['ENT-FND-01'],
          introduction: 'Explore the fundamental shift from traditional brick-and-mortar commerce to digital commerce, and examine profitable online business models thriving in Nigeria.',
          lessonContent: [
            'What is Digital Entrepreneurship? Creating, launching, and managing a commercial venture whose core operations, customer discovery, marketing, and transaction fulfillment rely primarily on digital technology.',
            'Traditional vs. Digital Commerce: Traditional businesses face high fixed overhead: shop rent, physical inventory security, and geographic confinement to foot traffic. Digital businesses enjoy borderless distribution, near-zero marginal reproduction costs, and 24/7 automated sales channels.',
            'Core Digital Business Models in Nigeria:',
            '1. Social Commerce: Selling products directly through Instagram, WhatsApp, and TikTok storefronts.',
            '2. E-Commerce & Dropshipping: Curating physical products and fulfilling orders through third-party logistics partners (GIG Logistics, Kwik, Chowdeck).',
            '3. Digital Products & Information Commerce: Authoring ebooks, prompt libraries, templates, and courses with 90%+ profit margins.',
            '4. Service Agency & Freelancing: Providing remote digital services (design, bookkeeping, virtual assistance) to domestic and foreign SMEs.'
          ],
          nigerianContextExamples: [
            'A corps member in Kano sourcing handcrafted leather goods and selling them via Instagram Reels to customers in Lagos and Port Harcourt.',
            'An educator selling downloadable JAMB/WAEC digital revision notes via Paystack payment links.'
          ],
          practicalDemonstration: 'Compare the capital expenditure of opening a physical boutique in Ikeja (N2,500,000 for shop rent + decor) vs. launching an Instagram/WhatsApp catalog with N30,000 for photography and paid ads.',
          handsOnExercise: {
            title: 'Analyze 3 Successful Nigerian Digital Businesses',
            task: 'Identify three local digital businesses and classify their business models, target audiences, and primary digital sales channels.',
            steps: [
              'Select one social commerce fashion/food brand.',
              'Select one digital product creator or educational platform.',
              'Select one on-demand service provider (e.g. logistics or laundry booking).'
            ],
            deliverable: 'A 1-page comparative analysis table.'
          },
          keyTakeaways: [
            'Digital businesses eliminate rent and geographical boundaries, enabling nationwide sales.',
            'High-margin models like digital information products allow youth entrepreneurs to start with near-zero capital.',
            'Social commerce on WhatsApp and Instagram is the primary sales engine for Nigerian youth.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_1_1_1',
              questionText: 'What is the most significant operational advantage of a digital business compared to a traditional physical retail shop?',
              options: [
                'Digital businesses do not need to pay their suppliers',
                'Digital businesses eliminate expensive physical shop rent and reach customers nationwide 24/7',
                'Digital businesses are completely free from government taxes',
                'Digital businesses never have to communicate with customers'
              ],
              correctAnswer: 1,
              explanation: 'Digital businesses bypass physical overhead like shop rent while unlocking unrestricted geographic reach across Nigeria.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_1_2',
          moduleId: 'mod_ent_1',
          courseId: 'course_digital_entrepreneurship',
          title: 'Identifying Business Opportunities and Market Validation',
          sequence: 2,
          sequenceLabel: 'Lesson 1.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['ENT-FND-01'],
          introduction: 'The number one reason startups fail is building something nobody wants. Learn how to discover burning customer pain points and validate willingness to pay before investing money.',
          lessonContent: [
            'The "Painkiller vs. Vitamin" Test: Products that solve urgent, acute financial, regulatory, or operational pain (painkillers) sell effortlessly. Products that are merely "nice to have" (vitamins) struggle during economic downturns.',
            'Low-Cost Market Research on Social Media: Analyze comment sections on competitor social media pages, Nairaland forums, and X (Twitter) threads. Look for phrases like: "How much is this?", "Do you deliver to Ibadan?", "Why is customer service so slow?" These complaints reveal market gaps.',
            'Pre-Selling & Smoke Testing: Before manufacturing 100 units of a product, create a simple flyer or mock product post. Run a small test to see if people actually place pre-orders or click "Join Waitlist". If people refuse to pay a deposit, you have saved yourself from a costly business failure.',
            'The Customer Discovery Interview: Speak to 10 prospective buyers. Ask open-ended questions: "What is the hardest part about X?" and "How much did you spend the last time you tried to solve this problem?"'
          ],
          nigerianContextExamples: [
            'A corps member noticing fellow corps members struggling to find clean, vetted off-camp housing in their PPA town, and validating demand for an NYSC accommodation finder service before launching.',
            'A baker asking for 5 pre-orders with 50% deposits on WhatsApp status before purchasing bulk baking flour.'
          ],
          practicalDemonstration: 'Demonstrate searching X (Twitter) advanced search: `(struggling OR "hard to find" OR "waste of money") AND ("Lagos" OR "Abuja")` to find real customer frustrations in real time.',
          handsOnExercise: {
            title: 'Draft a 5-Question Customer Discovery Script',
            task: 'Write five open-ended interview questions designed to uncover customer problems without leading the witness.',
            steps: [
              'Frame questions around past behavior rather than hypothetical futures (ask "When was the last time you bought X?" NOT "Would you buy X?").',
              'Investigate current spending habits on alternatives.',
              'Identify the single biggest frustration with existing providers.'
            ],
            deliverable: 'A 5-question customer discovery interview script.'
          },
          keyTakeaways: [
            'Build "painkillers" that solve acute customer problems, not "vitamins".',
            'Validate willingness to pay through pre-orders and deposits before investing heavy capital.',
            'Social media comment sections are goldmines for competitive intelligence.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_1_2_1',
              questionText: 'What is the most reliable way to validate customer demand for a new product before mass production?',
              options: [
                'Asking your close friends if they think it is a nice idea',
                'Securing paid pre-orders, deposits, or verified commitments from real prospective customers',
                'Spending all your savings on advertising before testing the product',
                'Writing a 100-page business plan without talking to a single customer'
              ],
              correctAnswer: 1,
              explanation: 'Financial commitments—such as pre-orders or deposits—provide undeniable proof that customers genuinely value and will pay for your solution.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_1_3',
          moduleId: 'mod_ent_1',
          courseId: 'course_digital_entrepreneurship',
          title: 'Developing a Viable Business Model and Unit Economics',
          sequence: 3,
          sequenceLabel: 'Lesson 1.3',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['ENT-FND-01'],
          introduction: 'A business is not just a great idea; it is a sustainable economic engine. Master value propositions, unit economics, profit margins, and the Lean Business Canvas.',
          lessonContent: [
            'The Unique Value Proposition (UVP): A single clear statement answering: Who you help, What problem you solve, How you do it differently, and Why they should choose you over alternatives.',
            'Understanding Unit Economics: You cannot make up for negative profit margins with higher sales volume! Calculate:',
            '• Cost of Goods Sold (COGS): Direct cost to produce or purchase 1 unit.',
            '• Packaging & Delivery Subsidy: Packaging boxes, bubble wrap, delivery fees.',
            '• Customer Acquisition Cost (CAC): How much you spend in advertising to win 1 paying customer.',
            '• Gross Margin = (Selling Price - COGS) / Selling Price. Aim for at least 40-60% gross margin on physical products, and 80%+ on digital products.',
            'The 1-Page Lean Canvas: Documenting Problem, Solution, Key Metrics, Value Proposition, Unfair Advantage, Channels, Customer Segments, Cost Structure, and Revenue Streams.'
          ],
          nigerianContextExamples: [
            'Calculating true costs for a perfume business: Oil vial (N2,000) + Custom bottle (N500) + Packaging box (N300) + Instagram ad cost per order (N1,200) = Total Unit Cost (N4,000). Selling at N7,500 yields a healthy N3,500 net profit per bottle.'
          ],
          practicalDemonstration: 'Walk through a simple Google Sheets Unit Economics Calculator showing how hidden costs like packaging, bank transfer fees, and delivery subsidies eat into apparent profits.',
          handsOnExercise: {
            title: 'Complete a 1-Page Lean Business Model Canvas',
            task: 'Fill out a 1-page Lean Canvas for your proposed digital business idea.',
            steps: [
              'Define the top 3 problems and your corresponding solutions.',
              'Write your Unique Value Proposition.',
              'Calculate your Unit Economics: Selling Price, COGS, CAC, and Net Profit per unit.'
            ],
            deliverable: 'Your completed 1-page Lean Business Model Canvas.'
          },
          keyTakeaways: [
            'Always calculate unit economics including ad spend, packaging, and transaction fees.',
            'Healthy profit margins protect your venture against inflation and currency fluctuations.',
            'Use the 1-Page Lean Canvas to iterate your business model rapidly.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_1_3_1',
              questionText: 'If an entrepreneur buys a shoe for N10,000, spends N1,000 on packaging, N2,000 on Instagram ads to win the buyer, and sells it for N15,000, what is their net profit per unit?',
              options: [
                'N5,000',
                'N2,000',
                'N10,000',
                'N15,000'
              ],
              correctAnswer: 1,
              explanation: 'Total cost = N10,000 (shoe) + N1,000 (packaging) + N2,000 (ad CAC) = N13,000. Selling Price (N15,000) - Total Cost (N13,000) = N2,000 net profit.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_ent_2',
      courseId: 'course_digital_entrepreneurship',
      sequence: 2,
      sequenceLabel: 'Module 2',
      title: 'Building Your Online Storefront and Marketing Engine',
      description: 'Configure high-converting digital storefronts on WhatsApp Business, design basic landing pages, and execute social media marketing campaigns.',
      learningObjectiveIds: ['ENT-MKT-02'],
      lessons: [
        {
          lessonId: 'lesson_ent_2_1',
          moduleId: 'mod_ent_2',
          courseId: 'course_digital_entrepreneurship',
          title: 'Setting Up Professional Storefronts: WhatsApp Business and Landing Pages',
          sequence: 1,
          sequenceLabel: 'Lesson 2.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['ENT-MKT-02'],
          introduction: 'WhatsApp is Nigeria\'s premier e-commerce super-app. Learn how to set up WhatsApp Business catalogs, automated greeting messages, quick replies, and simple no-code landing pages.',
          lessonContent: [
            'Why WhatsApp Business Dominates African Commerce: Low data friction, widespread familiarity, and direct conversational intimacy. Customers in Nigeria prefer chatting with a human merchant before sending payment.',
            'Optimizing WhatsApp Business Profile:',
            '• Professional Business Name & Verified Logo.',
            '• Detailed Product Catalog: High-resolution images, exact prices, product dimensions, and payment links.',
            '• Quick Replies: Set shortcuts like `/account` (bank details), `/delivery` (interstate delivery pricing table), and `/faq` (return policy) to answer common customer inquiries in seconds.',
            '• Automated Away & Greeting Messages: Never leave a customer hanging; acknowledge inquiries immediately.',
            'Simple Landing Pages with Carrd or Mainstack: Build a clean 1-page mobile landing page with a product showcase, customer testimonials, and direct "Order via WhatsApp" or "Pay with Paystack" buttons.'
          ],
          nigerianContextExamples: [
            'A corps member selling roasted cashew nuts configuring quick replies so customers can view delivery rates to 36 states instantly.',
            'Using a Mainstack store link in an Instagram bio to collect card payments without maintaining an expensive website.'
          ],
          practicalDemonstration: 'Demonstrate configuring a WhatsApp Business Quick Reply: Type `/bank` and watch it automatically expand into bank name, account number, account name, and instructions to send payment proof.',
          handsOnExercise: {
            title: 'Set Up a 3-Item Product Catalog and 3 Quick Replies',
            task: 'Configure your WhatsApp Business app or write the copy for 3 catalog items and 3 operational quick replies.',
            steps: [
              'Item 1, 2, and 3: Title, Price in NGN, Description, and photo placeholder.',
              'Quick Reply 1: Bank transfer details and verification instructions.',
              'Quick Reply 2: Delivery timelines and logistics fees across zones.',
              'Quick Reply 3: Return and exchange policy.'
            ],
            deliverable: 'A written script of your 3 catalog listings and 3 quick replies.'
          },
          keyTakeaways: [
            'WhatsApp Business catalogs and quick replies streamline high-volume customer inquiries.',
            'Quick response times are the number one driver of social commerce conversions in Nigeria.',
            'Use free 1-page tools like Carrd or Mainstack to create professional digital storefronts.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_2_1_1',
              questionText: 'What is the primary benefit of configuring "Quick Replies" in WhatsApp Business?',
              options: [
                'It allows you to send spam messages to thousands of strangers',
                'It enables merchants to insert frequently used text (such as bank details, delivery fees, and policies) using simple keyboard shortcuts',
                'It deletes customer messages automatically',
                'It turns off your phone internet'
              ],
              correctAnswer: 1,
              explanation: 'Quick replies save time and prevent typos by letting business owners send standard answers with shortcuts like `/bank`.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_2_2',
          moduleId: 'mod_ent_2',
          courseId: 'course_digital_entrepreneurship',
          title: 'Digital Marketing Fundamentals: Content Marketing and Social Media',
          sequence: 2,
          sequenceLabel: 'Lesson 2.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['ENT-MKT-02'],
          introduction: 'Posting random pictures on your Instagram page is not a marketing strategy. Learn how to build a content calendar, create viral short-form videos, and attract paying customers organically.',
          lessonContent: [
            'The Content Marketing Funnel:',
            '1. Top of Funnel (Attract): Educational tips, entertaining skits, industry myth-busting, and relatable problems that attract new eyeballs.',
            '2. Middle of Funnel (Nurture): Customer unboxing videos, behind-the-scenes packaging, and product demonstrations that build trust.',
            '3. Bottom of Funnel (Convert): Limited-time discount offers, clear call-to-actions, and customer reviews that prompt immediate purchasing.',
            'The 3-Second Hook Rule: On TikTok and Instagram Reels, users swipe away within 2 to 3 seconds. Start your video with an irresistible visual or text hook: "Stop making this mistake when buying leather bags in Lagos!" NOT "Hello guys, today I want to tell you about my company..."',
            'Consistency & Content Scheduling: Planning a 7-day content matrix: Monday (Educational tip), Wednesday (Behind the scenes), Friday (Customer review), Sunday (Promotional offer).'
          ],
          nigerianContextExamples: [
            'A corps member selling natural skincare products filming a 15-second TikTok showing how their black soap lathers with a text hook: "How I cleared sunburn during NYSC orientation camp in 7 days."',
            'A gadget seller sharing customer delivery unboxings on WhatsApp Status to establish authenticity.'
          ],
          practicalDemonstration: 'Analyze the first 3 seconds of 5 top-performing Nigerian e-commerce reels to identify winning hook patterns.',
          handsOnExercise: {
            title: 'Design a 7-Day Social Media Content Calendar',
            task: 'Create a 1-week content schedule with specific video hooks, topics, and calls to action.',
            steps: [
              'Plan 4 short-form video concepts (Reels/TikTok).',
              'Write an irresistible 3-second hook for each post.',
              'Specify the exact Call to Action (e.g. "Send a DM with \'GLOW\' to order").'
            ],
            deliverable: 'Your completed 7-day social media content calendar table.'
          },
          keyTakeaways: [
            'Structure content across the funnel: Attract with education, Nurture with proof, Convert with offers.',
            'The first 3 seconds of short-form video determine whether your content goes viral or gets ignored.',
            'Social proof (customer reviews and unboxings) is the most potent trust-building asset.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_2_2_1',
              questionText: 'Why is the first 3 seconds of a promotional short-form video (Reel/TikTok) so critical?',
              options: [
                'Social media apps automatically turn off videos after 3 seconds',
                'Users decide whether to swipe away or stay within the first 3 seconds; a strong hook captures attention before they scroll',
                'Video captions can only be displayed for 3 seconds',
                'You must pay an advertising fee after the third second'
              ],
              correctAnswer: 1,
              explanation: 'Mobile attention spans are fleeting; an irresistible hook in the first 3 seconds halts scrolling and drives video watch time.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_2_3',
          moduleId: 'mod_ent_2',
          courseId: 'course_digital_entrepreneurship',
          title: 'Creating Compelling Marketing Assets with Smartphone Photography and AI',
          sequence: 3,
          sequenceLabel: 'Lesson 2.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['ENT-MKT-02'],
          introduction: 'High-converting product imagery does not require an expensive DSLR camera. Master mobile smartphone lighting, backdrop composition, Canva mobile graphics, and AI copywriting.',
          lessonContent: [
            'Natural Lighting & Flat-Lay Composition: The best lighting in Nigeria is free: step outside into soft morning shade or place your product near a clean window. Avoid harsh direct midday sun that casts harsh shadows.',
            'Clean Backdrops: Use inexpensive white cardboard sheets, marble contact paper, or wooden trays to create clean, uncluttered backgrounds that highlight the product.',
            'Graphic Design with Canva Mobile: Use consistent brand fonts (maximum 2) and brand colors (maximum 3). Never crowd your flyer with 50 lines of text; keep it bold, readable on mobile, and highlight the price and contact button.',
            'AI-Powered Copywriting Prompts: Prompting Gemini: "Write 3 persuasive Instagram captions for a handcrafted leather wallet made in Nigeria. Target young professionals in Lagos. Include a compelling hook, 3 benefits (durability, sleek design, fits Nigerian Naira notes), price of N12,000, and a clear call to action to WhatsApp."'
          ],
          nigerianContextExamples: [
            'Shooting product photos of packaged local spices using white Bristol board in a PPA courtyard, producing studio-grade imagery for Instagram.',
            'Using Canva mobile templates to design a modern, professional pricelist flyer for a tailoring side-business.'
          ],
          practicalDemonstration: 'Demonstrate the difference between a dark, blurry indoor photo with yellow artificial lighting vs. a natural-light shot taken near a window with proper tap-to-focus on mobile.',
          handsOnExercise: {
            title: 'Produce 1 Professional Product Flyer Using Canva and AI',
            task: 'Generate persuasive caption copy with an AI tool and design a clean promotional flyer in Canva.',
            steps: [
              'Snap a well-lit photo of any physical item or digital service mockup.',
              'Use Canva to design a square (1:1) flyer with clean typography and brand colors.',
              'Generate an engaging caption with emojis, pricing, and WhatsApp CTA using AI.'
            ],
            deliverable: 'Your finished flyer image and companion promotional caption copy.'
          },
          keyTakeaways: [
            'Natural diffused daylight near windows beats cheap artificial indoor lighting every time.',
            'Keep graphic designs minimal, readable on mobile screens, and focused on a single CTA.',
            'Use AI to generate diverse marketing copy variations rapidly.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_2_3_1',
              questionText: 'What is the most cost-effective way to achieve clean, professional product photography using a smartphone?',
              options: [
                'Taking photos in a pitch-black room with camera flash turned on',
                'Positioning products near a window with soft, natural indirect daylight and using a clean plain backdrop like white cardboard',
                'Paying N100,000 for a studio photographer for a single item',
                'Applying 10 heavy vintage filters to a blurry photo'
              ],
              correctAnswer: 1,
              explanation: 'Natural indirect daylight paired with a simple plain backdrop produces crisp, color-accurate product imagery at zero cost.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_ent_3',
      courseId: 'course_digital_entrepreneurship',
      sequence: 3,
      sequenceLabel: 'Module 3',
      title: 'Digital Payments, Fraud Prevention, and Customer Retention',
      description: 'Integrate automated payment links, verify real transactions, protect your business against fake transfer alerts, and build high-retention customer relationships.',
      learningObjectiveIds: ['ENT-SLS-03'],
      lessons: [
        {
          lessonId: 'lesson_ent_3_1',
          moduleId: 'mod_ent_3',
          courseId: 'course_digital_entrepreneurship',
          title: 'Selling Products and Services Online: The Conversion Funnel',
          sequence: 1,
          sequenceLabel: 'Lesson 3.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['ENT-SLS-03'],
          introduction: 'Understand how a stranger browsing social media becomes a paying, repeat customer. Optimize every touchpoint in your digital sales funnel to maximize conversion rates.',
          lessonContent: [
            'The Conversion Funnel Stages: Impression (saw your post) → Click (opened your profile) → Conversation (sent a WhatsApp DM) → Quote (requested price) → Payment (completed transaction) → Referral (told a friend).',
            'Friction Points That Kill Sales: Missing prices (forcing customers to "DM for price"), slow response times (taking 6 hours to reply), complicated payment steps, and unclear delivery timelines.',
            'The Power of Displaying Prices Publicly: Research shows that over 70% of potential buyers abandon an inquiry if prices are hidden behind "DM for price." Transparency builds instant trust.',
            'Overcoming Objections: Have prepared scripts for: "Is this authentic?", "When will I receive it?", "Can I pay on delivery?", and "Can you give me a discount?"'
          ],
          nigerianContextExamples: [
            'Addressing payment-on-delivery (POD) skepticism in Nigeria: Offering partial commitment deposits (e.g. "Pay delivery fee of N2,000 upfront, pay balance upon item arrival") to eliminate delivery abandonment risks.',
            'A digital agency closing clients faster by providing transparent tiered packages on a 1-page PDF pricing sheet.'
          ],
          practicalDemonstration: 'Review an actual customer WhatsApp sales conversation: Identify where the merchant almost lost the deal and how an objection-handling script turned it into a confirmed payment.',
          handsOnExercise: {
            title: 'Draft a 4-Part Objection Handling Script Matrix',
            task: 'Write professional, persuasive responses to the top 4 customer objections in Nigerian e-commerce.',
            steps: [
              'Objection 1: "Why is your delivery fee so high?"',
              'Objection 2: "Can I pay after I receive the item?"',
              'Objection 3: "Are you sure this is not a 419 scam?"',
              'Objection 4: "Can you give me a discount because I am a student/corper?"'
            ],
            deliverable: 'A 4-part objection handling reference cheat sheet.'
          },
          keyTakeaways: [
            'Every point of friction (hidden prices, slow replies) reduces your conversion rate.',
            'Transparent pricing builds trust and filters out non-serious window shoppers.',
            'Prepared objection-handling scripts allow you to close sales confidently.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_3_1_1',
              questionText: 'Why does the practice of hiding prices and demanding "DM for price" hurt conversion rates on social media?',
              options: [
                'Because social media platforms ban accounts that write "DM"',
                'Because it creates unnecessary friction and skepticism; many prospective buyers will scroll past rather than wait hours for a DM reply',
                'Because Nigerian law strictly forbids private messaging',
                'Because customers prefer paying random prices'
              ],
              correctAnswer: 1,
              explanation: 'Hiding prices introduces friction, frustrates serious buyers, and loses sales to competitors who display pricing openly.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_3_2',
          moduleId: 'mod_ent_3',
          courseId: 'course_digital_entrepreneurship',
          title: 'Digital Payments: Paystack, Flutterwave, and Fake Alert Protection',
          sequence: 2,
          sequenceLabel: 'Lesson 3.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['ENT-SLS-03'],
          introduction: 'Master modern payment collection tools in Nigeria. Learn how to generate automated payment links with Paystack and Flutterwave, and protect your inventory from sophisticated fake transfer alerts.',
          lessonContent: [
            'Modern Nigerian Fintech Gateways: Paystack and Flutterwave allow registered businesses and unregistered starter merchants to create payment links that accept Debit Cards, Bank Transfers, USSD, and Apple Pay without writing code.',
            'Why Payment Links Beat Manual Bank Transfers: Automated payment links verify successful settlement instantly, calculate transaction fees, capture customer shipping details, and issue automated receipts.',
            'The Anatomy of a Fake Transfer Scam: Scammers generate fake SMS credit alerts mimicking bank alerts, or show manipulated screenshot receipts from banking apps. The SMS sender ID can be spoofed!',
            'The Golden Verification Rule: NEVER release goods or ship orders based on a customer screenshot or an SMS credit alert on your phone. Always log in directly to your official mobile banking app or Paystack merchant dashboard to confirm that cleared funds have settled in your available ledger balance.'
          ],
          nigerianContextExamples: [
            'A merchant at Computer Village in Lagos losing a N350,000 laptop because they trusted a fake SMS alert that appeared in their bank thread without checking their live banking app balance.',
            'A corps member selling event tickets sending a single Paystack payment link on WhatsApp and having 120 buyers purchase tickets automatically while they were asleep.'
          ],
          practicalDemonstration: 'Demonstrate setting up a free Paystack Payment Page: Title: "Digital Skills Guide", Price: N3,000, Custom Form Field: "Phone / WhatsApp Number", and redirecting buyers to a thank-you page.',
          handsOnExercise: {
            title: 'Create a Paystack or Flutterwave Test Payment Link',
            task: 'Set up an active starter account on Paystack or Flutterwave and generate a live or test payment page.',
            steps: [
              'Log in to Paystack (or register a free starter account).',
              'Navigate to Payment Pages → Create New Page.',
              'Set product title, fixed amount in NGN, and customize the redirect URL.',
              'Copy and test your live payment link.'
            ],
            deliverable: 'Your active Paystack payment page URL.'
          },
          keyTakeaways: [
            'Automated payment links streamline checkouts and eliminate payment confirmation delays.',
            'SMS sender IDs and screenshot receipts can be easily forged by scammers.',
            'Never release goods until cleared funds reflect in your official banking app balance.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_3_2_1',
              questionText: 'A buyer sends you a screenshot of a successful bank transfer and you receive an SMS alert, but your mobile banking app shows no new deposit. What should you do?',
              options: [
                'Immediately ship the goods because the buyer might get angry',
                'Do not dispatch the goods; verify that the funds have actually cleared in your live banking app or merchant dashboard first, as SMS alerts and screenshots can be spoofed',
                'Apologize and refund the customer with your own cash',
                'Delete your banking app'
              ],
              correctAnswer: 1,
              explanation: 'Screenshots and SMS alerts are easily fabricated; merchants must always confirm cleared funds directly inside their banking app before releasing goods.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_3_3',
          moduleId: 'mod_ent_3',
          courseId: 'course_digital_entrepreneurship',
          title: 'Customer Service, Retention, and Building Repeat Business',
          sequence: 3,
          sequenceLabel: 'Lesson 3.3',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['ENT-SLS-03'],
          introduction: 'It costs 5 to 7 times more to acquire a new customer than to retain an existing one. Learn how exceptional post-purchase communication turns one-time buyers into loyal brand advocates.',
          lessonContent: [
            'Customer Lifetime Value (LTV): The total revenue a single customer generates for your business across their entire relationship with you. A customer who buys a N5,000 item every month for 2 years has an LTV of N120,000.',
            'Post-Purchase Communication Sequences:',
            '• Immediate confirmation: "Payment received! Your order is being packaged."',
            '• Dispatch alert with live tracking or dispatch rider phone number.',
            '• Delivery check-in (24 hours after arrival): "Did your package arrive safely? How did you like the quality?"',
            'Turning Complaints into Brand Loyalty: When an order is delayed or damaged, do not argue or blame the logistics company. Take full ownership, apologize promptly, offer an immediate replacement or discount voucher. A customer whose complaint was resolved gracefully is often more loyal than one who never experienced an issue.',
            'Loyalty Programs & Referral Incentives: Offer a 10% discount on the next order if the customer tags your business in an Instagram unboxing video or refers a friend.'
          ],
          nigerianContextExamples: [
            'A Lagos clothing merchant including a handwritten thank-you note and a small sweet in every package, causing customers to share unboxing videos organically on social media.',
            'Sending a personalized WhatsApp message on a customer\'s birthday with a special 15% discount code.'
          ],
          practicalDemonstration: 'Review two customer complaint resolution scripts: One defensive and dismissive vs. one empathetic, solution-oriented, and relationship-saving.',
          handsOnExercise: {
            title: 'Draft a 3-Stage Post-Purchase WhatsApp Follow-up Sequence',
            task: 'Write the exact messages you will send to customers after they make a purchase.',
            steps: [
              'Message 1: Order Confirmation & Packaging Timeline.',
              'Message 2: Dispatch Notice with Tracking Details.',
              'Message 3: 48-Hour Feedback Inquiry & Referral Incentive.'
            ],
            deliverable: 'Your complete 3-stage post-purchase communication script.'
          },
          keyTakeaways: [
            'Customer Lifetime Value (LTV) determines long-term business sustainability.',
            'Handle delivery issues with empathy, speed, and accountability to preserve brand trust.',
            'Post-purchase follow-up converts one-time buyers into repeat referral engines.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_3_3_1',
              questionText: 'What does "Customer Lifetime Value" (LTV) measure in business operations?',
              options: [
                'The age of the customer',
                'The total financial revenue a customer generates for your venture across their entire relationship with your brand',
                'The number of hours a customer spends browsing your website',
                'The delivery distance between your shop and the customer\'s house'
              ],
              correctAnswer: 1,
              explanation: 'Customer Lifetime Value (LTV) calculates the total gross profit or revenue contributed by a customer over their entire buying relationship.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_ent_4',
      courseId: 'course_digital_entrepreneurship',
      sequence: 4,
      sequenceLabel: 'Module 4',
      title: 'Managing Operations, Cash Flow, and Business Growth',
      description: 'Master digital bookkeeping, calculate gross vs. net profits, navigate CAC registration in Nigeria, and develop scalable growth partnerships.',
      learningObjectiveIds: ['ENT-OPS-04'],
      lessons: [
        {
          lessonId: 'lesson_ent_4_1',
          moduleId: 'mod_ent_4',
          courseId: 'course_digital_entrepreneurship',
          title: 'Business Operations with Digital Tools: Record Keeping and Inventory',
          sequence: 1,
          sequenceLabel: 'Lesson 4.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['ENT-OPS-04'],
          introduction: 'If you do not track your numbers, you do not have a business; you have an expensive hobby. Learn how to maintain automated digital sales logs, inventory trackers, and expense sheets.',
          lessonContent: [
            'Separating Personal and Business Finances: The cardinal sin of micro-entrepreneurs in Nigeria is mixing business revenue with personal living expenses. Never spend cash from business sales on personal items without recording it as an owner\'s salary.',
            'The Daily Sales & Expense Log in Google Sheets: Columns: Date, Transaction ID, Customer Name, Item Description, Quantity, Selling Price, Cost of Goods, Logistics Cost, Net Profit, and Payment Channel.',
            'Real-Time Inventory Tracking: Tracking Stock In, Stock Out, and Low Stock Alerts. Running out of stock during peak promotional campaigns wastes ad spend and frustrates buyers.',
            'Cloud Backup & Paperless Receipts: Backing up receipts and supplier invoices automatically to Google Drive to ensure audit readiness and seamless tax compliance.'
          ],
          nigerianContextExamples: [
            'Opening a dedicated business bank account (e.g. dedicated corporate account or digital SME account) to isolate business cash flow completely from personal debit card spending.',
            'A phone accessories seller in Onitsha using a simple Google Sheets inventory template to eliminate stock shrinkage and theft.'
          ],
          practicalDemonstration: 'Demonstrate a Google Sheets Sales Tracker with automated formulas: `=SUM(H2:H100)` for total revenue, and conditional formatting highlighting low inventory items in red.',
          handsOnExercise: {
            title: 'Set Up an Automated Business Bookkeeping Tracker in Google Sheets',
            task: 'Create a spreadsheet tracker with automated profit calculations and sample entries.',
            steps: [
              'Create columns: Date, Product, Units Sold, Selling Price, COGS, Shipping, and Net Profit.',
              'Add automated formulas calculating Total Revenue, Total Expenses, and Net Margin.',
              'Input 5 sample transactions to verify formula accuracy.'
            ],
            deliverable: 'A shared link or screenshot of your working bookkeeping sheet.'
          },
          keyTakeaways: [
            'Strictly separate personal funds from business revenue by opening a dedicated business account.',
            'Log every sale, packaging expense, and delivery fee to know your true net profit.',
            'Use cloud spreadsheets to track inventory and maintain paperless receipts.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_4_1_1',
              questionText: 'What is the most critical financial discipline for an entrepreneur starting a digital side-business in Nigeria?',
              options: [
                'Spending all incoming sales money on personal entertainment immediately',
                'Strictly separating personal and business finances by operating a dedicated business account and logging all revenue and expenses',
                'Refusing to keep any receipts or transaction records',
                'Taking high-interest loans before making your first sale'
              ],
              correctAnswer: 1,
              explanation: 'Isolating business funds and tracking every expense prevents cash-flow collapse and reveals true profitability.'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_4_2',
          moduleId: 'mod_ent_4',
          courseId: 'course_digital_entrepreneurship',
          title: 'Measuring Business Performance and Financial Metrics',
          sequence: 2,
          sequenceLabel: 'Lesson 4.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['ENT-OPS-04'],
          introduction: 'Learn the vital health indicators of an online business: Gross Margin, Net Margin, Return on Ad Spend (ROAS), Customer Acquisition Cost (CAC), and Churn Rate.',
          lessonContent: [
            'Gross Profit vs. Net Profit:',
            '• Gross Profit = Total Revenue - Cost of Goods Sold (COGS). Shows if your pricing strategy is viable.',
            '• Net Profit = Gross Profit - Operating Expenses (Ad spend, packaging, bank fees, phone data, software subscriptions). Shows what actually remains in your pocket.',
            'Return on Ad Spend (ROAS): If you spend N10,000 on Instagram ads and generate N40,000 in revenue, your ROAS is 4.0x (or 400%). If your ROAS is below your breakeven threshold, you are losing money on every sale.',
            'Customer Churn: The percentage of repeat customers who stop buying from you. Monitoring churn helps identify quality degradation or customer service bottlenecks early.'
          ],
          nigerianContextExamples: [
            'A fashion business realizing that while they generated N1,000,000 in monthly sales, their net profit was only N30,000 because of excessive logistics subsidies and unprofitable Instagram ad targeting.',
            'Optimizing ad spend by cutting ad campaigns that generate clicks but zero WhatsApp sales conversions.'
          ],
          practicalDemonstration: 'Calculate Breakeven ROAS: Formula = `1 / Gross Margin %`. Show that if your gross margin is 50%, your ROAS must be at least 2.0x just to break even on advertising.' ,
          handsOnExercise: {
            title: 'Calculate Key Financial Performance Metrics for a Monthly Report',
            task: 'Given a sample month of e-commerce data, calculate Gross Profit, Net Profit, and ROAS.',
            steps: [
              'Monthly Revenue: N600,000. COGS: N280,000. Ad Spend: N80,000. Packaging & Delivery: N40,000. Internet Data & Tools: N20,000.',
              'Calculate Gross Profit and Gross Margin %.',
              'Calculate Net Profit and Net Margin %.',
              'Calculate ROAS.'
            ],
            deliverable: 'Your step-by-step financial metric calculations.'
          },
          keyTakeaways: [
            'High revenue does not equal high profit; always monitor your net profit margin.',
            'Calculate Breakeven ROAS before running paid social media advertising campaigns.',
            'Track customer churn to ensure your product quality maintains long-term loyalty.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_4_2_1',
              questionText: 'If a business generates N500,000 in sales, spends N200,000 on product manufacturing, and N100,000 on advertising, what is its Gross Profit?',
              options: [
                'N500,000',
                'N300,000',
                'N200,000',
                'N100,000'
              ],
              correctAnswer: 1,
              explanation: 'Gross Profit = Total Revenue (N500,000) - COGS (N200,000) = N300,000. (Advertising is an operating expense deducted later to calculate Net Profit).'
            }
          ]
        },
        {
          lessonId: 'lesson_ent_4_3',
          moduleId: 'mod_ent_4',
          courseId: 'course_digital_entrepreneurship',
          title: 'Scaling a Sustainable Digital Business: CAC Registration, Partnerships, and Growth',
          sequence: 3,
          sequenceLabel: 'Lesson 4.3',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['ENT-OPS-04'],
          introduction: 'Transition from an informal side-hustle to a legally recognized, scalable Nigerian enterprise. Master Corporate Affairs Commission (CAC) registration, banking compliance, and strategic co-marketing partnerships.',
          lessonContent: [
            'Formalizing Your Business with the CAC: Registering a Business Name on the CAC portal (crp.cac.gov.ng) protects your brand name, unlocks corporate bank accounts, and allows you to access government and international grants.',
            'Compliance Essentials: Getting your Tax Identification Number (TIN) and understanding Value Added Tax (VAT) exemptions for micro-enterprises with annual turnover under N25 million under the Nigerian Finance Act.',
            'Co-Marketing & Strategic Cross-Promotions: Partner with complementary, non-competing businesses. For example, a footwear seller partnering with a watch seller to offer combined bundle packages, sharing each other\'s customer audiences.',
            'Building a Multi-Channel Presence: Expanding from WhatsApp into dedicated e-commerce marketplaces (Jumia, Konga), retail consignments, and pop-up market exhibitions in your deployment state.'
          ],
          nigerianContextExamples: [
            'A corps member registering their agribusiness business name with the CAC during their service year to qualify for NYSC SAED bank loan funding and BOI micro-credit grants.',
            'Two corps members in a CDS group partnering to cross-promote custom branded corporate gifts to local banks and private schools.'
          ],
          practicalDemonstration: 'Walk through the public CAC Name Search portal to demonstrate how to verify if a proposed business name is available before filing registration.',
          handsOnExercise: {
            title: 'Conduct a CAC Business Name Availability Check & Partnership Pitch',
            task: 'Check the availability of your business name and draft a cross-promotional partnership pitch to another brand.',
            steps: [
              'Visit crp.cac.gov.ng and perform a name availability search.',
              'Identify a complementary local brand (e.g. if you sell shirts, find someone who sells ties).',
              'Draft a 3-paragraph partnership proposal offering a bundle promotion.'
            ],
            deliverable: 'Your verified CAC name search status and written co-marketing proposal.'
          },
          keyTakeaways: [
            'Formal CAC registration unlocks corporate bank accounts, legal brand protection, and business loans.',
            'Micro-enterprises under statutory turnover thresholds enjoy key tax exemptions under Nigerian law.',
            'Cross-promotional partnerships expand your customer reach at zero additional advertising cost.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ent_4_3_1',
              questionText: 'What is the primary benefit of registering your business name with the Corporate Affairs Commission (CAC) in Nigeria?',
              options: [
                'It guarantees that you will never make a business loss',
                'It legally reserves your brand name, establishes business legitimacy, and allows you to open a verified corporate bank account',
                'It provides free office accommodation in Abuja',
                'It gives you free unlimited mobile data'
              ],
              correctAnswer: 1,
              explanation: 'CAC registration grants legal business identity, protects your business name across Nigeria, and enables corporate banking operations.'
            }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Complete Digital Business Launch Blueprint',
    overview: 'Develop a practical, end-to-end digital business plan and create a live online storefront featuring a product catalog, unit economics model, automated payment link, and marketing strategy.',
    instructions: [
      'Step 1: Define your business concept, target customer persona, and Unique Value Proposition on a 1-page Lean Canvas.',
      'Step 2: Calculate your Unit Economics (COGS, Ad CAC, Selling Price, Net Margin).',
      'Step 3: Create an active digital storefront: Set up a 3-item WhatsApp Business catalog or a live Paystack/Flutterwave payment link.',
      'Step 4: Design 1 promotional marketing flyer in Canva with accompanying AI-crafted social media copy.',
      'Step 5: Set up an automated Google Sheets Sales & Expense bookkeeping tracker with formulas.'
    ],
    assessmentCriteria: [
      'Market Validation & Value Proposition: Does the business solve an authentic problem with clear unit economics? (25%)',
      'Storefront Setup: Is the product catalog, description, pricing, and payment gateway functioning properly? (25%)',
      'Marketing Assets: Is the flyer visually appealing with natural lighting, clear pricing, and a compelling CTA? (25%)',
      'Operations & Bookkeeping: Does the bookkeeping spreadsheet track revenue, expenses, and net profit accurately? (25%)'
    ],
    submissionGuidelines: 'Submit your business title, a 300-500 word executive summary, and links to: 1. Your live Paystack payment page or WhatsApp catalog link; 2. Your marketing flyer and caption; 3. Your Google Sheets bookkeeping tracker.'
  },
  finalAssessment: [
    {
      id: 'fa_ent_01',
      questionText: 'What is the primary operational advantage of social commerce and digital businesses over physical retail shops in Nigeria?',
      options: [
        'Digital businesses never have to pay for stock',
        'Digital businesses eliminate expensive shop rent and can reach customers across all 36 states 24/7',
        'Digital businesses are completely free from internet costs',
        'Customers always pay double the price online'
      ],
      correctAnswer: 1,
      explanation: 'Eliminating physical rent and opening up nationwide geographic distribution are the cornerstone advantages of digital business.',
      relatedLessonId: 'lesson_ent_1_1'
    },
    {
      id: 'fa_ent_02',
      questionText: 'What is the most reliable way to validate customer demand before investing heavy capital in manufacturing inventory?',
      options: [
        'Asking your family members if they like the idea',
        'Securing paid pre-orders, deposits, or verified purchase commitments from real target customers',
        'Spending all your savings on logo design',
        'Renting a shop before finding out what customers want'
      ],
      correctAnswer: 1,
      explanation: 'Financial commitments and pre-orders provide genuine proof that customers are willing to exchange money for your solution.',
      relatedLessonId: 'lesson_ent_1_2'
    },
    {
      id: 'fa_ent_03',
      questionText: 'If you buy a product for N4,000, spend N500 on packaging, N1,500 on customer acquisition ads, and sell it for N8,000, what is your net profit per unit?',
      options: [
        'N4,000',
        'N2,000',
        'N6,000',
        'N8,000'
      ],
      correctAnswer: 1,
      explanation: 'Total cost = N4,000 + N500 + N1,500 = N6,000. Selling Price (N8,000) - Total Cost (N6,000) = N2,000 net profit.',
      relatedLessonId: 'lesson_ent_1_3'
    },
    {
      id: 'fa_ent_04',
      questionText: 'Why do marketing experts advise against hiding prices behind "DM for price" on social media storefronts?',
      options: [
        'It causes the social media account to be deleted',
        'It introduces unnecessary friction; over 70% of potential buyers abandon inquiries when prices are hidden',
        'Prices cannot be typed in DMs',
        'All prices in Nigeria must be printed in newspapers'
      ],
      correctAnswer: 1,
      explanation: 'Hiding prices creates friction and skepticism, prompting serious buyers to purchase from transparent competitors.',
      relatedLessonId: 'lesson_ent_3_1'
    },
    {
      id: 'fa_ent_05',
      questionText: 'A buyer sends you a screenshot of a successful bank transfer and you receive an SMS alert, but your mobile banking app shows no new deposit. What should you do?',
      options: [
        'Ship the goods immediately',
        'Do not dispatch the goods; verify that the funds have cleared in your live banking app or merchant dashboard first, as SMS alerts and screenshots can be spoofed',
        'Refund the buyer with cash',
        'Turn off your phone'
      ],
      correctAnswer: 1,
      explanation: 'Screenshots and SMS alerts are easily forged; merchants must confirm cleared funds directly inside their live banking app before releasing goods.',
      relatedLessonId: 'lesson_ent_3_2'
    },
    {
      id: 'fa_ent_06',
      questionText: 'What does "Customer Lifetime Value" (LTV) measure in business operations?',
      options: [
        'The physical lifespan of the buyer',
        'The total financial revenue a customer generates across their entire relationship with your brand',
        'The distance the customer travels to your store',
        'The number of days an invoice is overdue'
      ],
      correctAnswer: 1,
      explanation: 'LTV calculates the aggregate financial value contributed by a customer over their entire buying history with your business.',
      relatedLessonId: 'lesson_ent_3_3'
    },
    {
      id: 'fa_ent_07',
      questionText: 'Why is it critical to operate a dedicated business bank account separate from your personal account?',
      options: [
        'Personal bank accounts are illegal in Nigeria',
        'It prevents mixing business revenue with personal living expenses, ensuring accurate profit calculation and financial sustainability',
        'Business accounts give you free airtime every day',
        'To hide your spending from family members'
      ],
      correctAnswer: 1,
      explanation: 'Separating business and personal finances prevents cash-flow collapse and maintains accurate bookkeeping.',
      relatedLessonId: 'lesson_ent_4_1'
    },
    {
      id: 'fa_ent_08',
      questionText: 'What is the primary benefit of registering your business name with the Corporate Affairs Commission (CAC)?',
      options: [
        'It guarantees your business will never fail',
        'It grants legal protection for your brand name across Nigeria and enables you to open corporate bank accounts and access grants',
        'It gives you free office space in Lagos',
        'It exempts you from paying suppliers'
      ],
      correctAnswer: 1,
      explanation: 'CAC registration grants legal business identity, protects your business name, and enables corporate banking operations.',
      relatedLessonId: 'lesson_ent_4_3'
    },
    {
      id: 'fa_ent_09',
      questionText: 'What does Return on Ad Spend (ROAS) measure?',
      options: [
        'How many followers your Instagram page gained',
        'The gross revenue generated for every Naira spent on advertising',
        'The number of times an ad was clicked',
        'The speed of your internet connection'
      ],
      correctAnswer: 1,
      explanation: 'ROAS measures the revenue efficiency of your advertising spend: Revenue generated divided by total ad spend.',
      relatedLessonId: 'lesson_ent_4_2'
    },
    {
      id: 'fa_ent_10',
      questionText: 'Why is the first 3 seconds of a promotional short-form video (Reel/TikTok) so critical?',
      options: [
        'Because users decide whether to swipe away or stay within the first 3 seconds',
        'Because video files delete themselves after 3 seconds',
        'Because music cannot play longer than 3 seconds',
        'Because social media algorithms charge money after 3 seconds'
      ],
      correctAnswer: 1,
      explanation: 'An irresistible hook in the first 3 seconds halts scrolling and prevents potential customers from swiping past your video.',
      relatedLessonId: 'lesson_ent_2_2'
    },
    {
      id: 'fa_ent_11',
      questionText: 'In a WhatsApp Business setup, what is the role of "Quick Replies"?',
      options: [
        'To send automatic spam messages to strangers',
        'To insert frequently sent information (bank details, delivery rates, policies) instantly using keyboard shortcuts like `/bank`',
        'To block angry customers automatically',
        'To translate messages into French'
      ],
      correctAnswer: 1,
      explanation: 'Quick replies enable merchants to answer common customer inquiries rapidly using predefined shortcuts.',
      relatedLessonId: 'lesson_ent_2_1'
    },
    {
      id: 'fa_ent_12',
      questionText: 'What is the most cost-effective way to achieve clean product photography for an online store using a smartphone?',
      options: [
        'Using heavy camera flash in a dark room',
        'Positioning the product near a window with soft, natural indirect daylight and using a plain backdrop like white cardboard',
        'Hiring a movie production crew for every item',
        'Downloading random product photos from Google and claiming they are yours'
      ],
      correctAnswer: 1,
      explanation: 'Natural indirect daylight paired with a simple plain backdrop produces crisp, color-accurate product imagery at zero cost.',
      relatedLessonId: 'lesson_ent_2_3'
    },
    {
      id: 'fa_ent_13',
      questionText: 'What is the difference between Gross Profit and Net Profit?',
      options: [
        'Gross Profit is calculated in Dollars while Net Profit is in Naira',
        'Gross Profit is Revenue minus COGS, while Net Profit is Gross Profit minus all operating expenses like ads, packaging, and data',
        'They are exactly the same thing',
        'Net Profit is always higher than Gross Profit'
      ],
      correctAnswer: 1,
      explanation: 'Gross Profit covers the direct product margin, while Net Profit reflects what truly remains after all operational costs are paid.',
      relatedLessonId: 'lesson_ent_4_2'
    },
    {
      id: 'fa_ent_14',
      questionText: 'How can an e-commerce business handle payment-on-delivery (POD) risks in Nigeria?',
      options: [
        'Refuse to sell to anyone in Nigeria',
        'Require a non-refundable commitment deposit covering delivery logistics upfront before dispatching goods',
        'Ship goods for free to all inquiries without checking',
        'Only accept payments in gold coins'
      ],
      correctAnswer: 1,
      explanation: 'Requiring a delivery commitment deposit ensures that logistics costs are covered even if the buyer defaults on delivery.',
      relatedLessonId: 'lesson_ent_3_1'
    },
    {
      id: 'fa_ent_15',
      questionText: 'What is a "Co-Marketing Partnership" in digital entrepreneurship?',
      options: [
        'Suing a competing company in court',
        'Collaborating with a complementary, non-competing business to cross-promote bundle offers and share customer audiences at zero extra ad cost',
        'Buying fake followers on Instagram',
        'Merging two banks together'
      ],
      correctAnswer: 1,
      explanation: 'Co-marketing allows two complementary businesses (e.g. shoe seller + belt seller) to cross-promote to each other\'s customer bases.',
      relatedLessonId: 'lesson_ent_4_3'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredFinalAssessmentPassScore: 80,
    requireCapstoneSubmission: true
  }
};
