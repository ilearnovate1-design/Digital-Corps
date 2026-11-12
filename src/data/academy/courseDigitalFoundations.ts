import { AcademyCourse } from '../../types';

export const COURSE_DIGITAL_FOUNDATIONS: AcademyCourse = {
  courseId: 'course_digital_foundations',
  categoryId: 'digital_literacy_safety',
  title: 'Digital Foundations, Internet Skills and Online Safety',
  description: 'A foundational cybersecurity and digital empowerment course teaching corps members how to confidently navigate the internet, detect sophisticated Nigerian bank phishing & SIM swap scams, manage passwords, configure Two-Factor Authentication (2FA), protect BVN/NIN credentials, and audit privacy.',
  targetAudience: 'Serving NYSC Corps Members, community educators, civil servants, students, and digital citizens seeking rock-solid personal cyber hygiene and online threat defense.',
  entryRequirements: 'Ownership or access to a smartphone or computer. No prior technical or cybersecurity background required.',
  expectedDuration: '4 Weeks (Self-Paced • 12 Core Lessons)',
  themeColor: 'amber',
  iconName: 'ShieldCheck',
  active: true,
  version: '2026.1',
  learningObjectives: [
    {
      id: 'LIT-FND-01',
      code: 'LIT-FND-01',
      title: 'Digital Devices & Effective Internet Navigation',
      description: 'Master operating systems, mobile storage hygiene, Boolean search operators, and evaluating source credibility.'
    },
    {
      id: 'LIT-COM-02',
      code: 'LIT-COM-02',
      title: 'Digital Communication, Misinformation & Fact-Checking',
      description: 'Send secure email attachments, identify fake news/disinformation on WhatsApp, and cultivate responsible digital citizenship.'
    },
    {
      id: 'LIT-SEC-03',
      code: 'LIT-SEC-03',
      title: 'Cybersecurity, Passwords & Identity Defense',
      description: 'Deploy password managers, configure authenticator apps (2FA), identify phishing emails/SMS, and secure public Wi-Fi connections.'
    },
    {
      id: 'LIT-SAF-04',
      code: 'LIT-SAF-04',
      title: 'Practical Scam Prevention & Personal Safety Plan',
      description: 'Block SIM swap fraud, protect BVN/NIN/OTP credentials, audit social media privacy settings, and build a digital safety incident plan.'
    }
  ],
  modules: [
    {
      moduleId: 'mod_lit_1',
      courseId: 'course_digital_foundations',
      sequence: 1,
      sequenceLabel: 'Module 1',
      title: 'Digital Foundations and Effective Internet Navigation',
      description: 'Understand how smartphones, computers, operating systems, internet connections, and search engines operate.',
      learningObjectiveIds: ['LIT-FND-01'],
      lessons: [
        {
          lessonId: 'lesson_lit_1_1',
          moduleId: 'mod_lit_1',
          courseId: 'course_digital_foundations',
          title: 'Understanding Digital Devices, Hardware and Operating Systems',
          sequence: 1,
          sequenceLabel: 'Lesson 1.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['LIT-FND-01'],
          introduction: 'Smartphones and computers are the primary productivity tools of the modern knowledge worker. Learn the core architecture of processors, RAM, internal storage, operating systems (Android, iOS, Windows), and file management.',
          lessonContent: [
            'Hardware Architecture: Central Processing Unit (CPU) executes calculations; Random Access Memory (RAM) holds active, open applications temporarily; Internal Storage (eMMC / SSD) stores files, apps, and photos permanently.',
            'Operating Systems (OS): Android, iOS, Windows, and macOS act as the bridge between physical hardware and application software. Keeping your OS updated is your primary defense against zero-day security vulnerabilities.',
            'Mobile Storage Hygiene: Inexpensive Android smartphones frequently run out of storage due to heavy WhatsApp media auto-downloads. Managing cache, clearing unnecessary media, and using Google Photos cloud backup keeps devices responsive.',
            'Battery & Device Longevity in High-Temperature Climates: Avoiding extreme heat exposure, preventing overnight overcharging on unstable power generators, and using certified charging adapters.'
          ],
          nigerianContextExamples: [
            'Configuring WhatsApp on an affordable Android phone in an NYSC camp: Disabling "Media Auto-Download" under Settings → Storage and Data to save mobile data and prevent memory exhaustion.',
            'Checking device storage before downloading essential NYSC or PPA educational materials.'
          ],
          practicalDemonstration: 'Open your smartphone Settings → Storage. Identify how much space is consumed by Apps, System Cache, and Media. Demonstrate clearing app cache for high-usage social apps.',
          handsOnExercise: {
            title: 'Execute a Mobile Smartphone Optimization Audit',
            task: 'Conduct a storage, update, and data-saver audit on your primary mobile phone.',
            steps: [
              'Check for pending OS security updates.',
              'Disable WhatsApp media auto-download for mobile data.',
              'Clear cached data from at least 2 heavy applications to free up at least 500MB.'
            ],
            deliverable: 'A before-and-after storage screenshot or audit checklist.'
          },
          keyTakeaways: [
            'RAM holds temporary open tasks; internal storage holds permanent files.',
            'Regular OS security updates patch critical vulnerabilities.',
            'Disabling automatic media downloads saves mobile data and preserves phone speed.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_1_1_1',
              questionText: 'What is the most effective way to prevent your smartphone internal storage from filling up and slowing down due to WhatsApp?',
              options: [
                'Throw the phone away and buy a new one every month',
                'Disable "Media Auto-Download" in WhatsApp settings so videos and photos are only downloaded when you tap them',
                'Never connect the phone to the internet',
                'Turn off screen brightness'
              ],
              correctAnswer: 1,
              explanation: 'Disabling auto-download gives you control over what files are saved to your device, saving storage and data bundles.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_1_2',
          moduleId: 'mod_lit_1',
          courseId: 'course_digital_foundations',
          title: 'Understanding the Internet, Web Browsers, and URLs',
          sequence: 2,
          sequenceLabel: 'Lesson 1.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['LIT-FND-01'],
          introduction: 'Understand how data packets travel across undersea fiber-optic cables and cellular towers to your screen, and master URL anatomy to spot malicious spoofed websites.',
          lessonContent: [
            'How the Internet Works: The internet is a global network of interconnected computers. When you visit a website, your browser sends a request via cellular towers and submarine cables (like MainOne and Equiano off the coast of Lagos) to a web server hosting the website files.',
            'Web Browsers vs. Search Engines: A web browser (Google Chrome, Safari, Brave) is the software application used to view websites. A search engine (Google, Bing) is a website index tool used to find information across the web.',
            'The Anatomy of a URL: Protocol (`https://`) + Domain (`nysc.gov.ng`) + Path (`/portal/login`). The padlock icon and `https://` signify that data sent between your browser and the website is encrypted with SSL/TLS.',
            'Spotting Typosquatting & Domain Spoofing: Scammers register deceptive domains that resemble authentic institutions. E.g., `nysc-portal-registration.com` or `cbn-support-portal.net` instead of official domains ending in `.gov.ng` or verified bank domains.'
          ],
          nigerianContextExamples: [
            'Identifying a fraudulent NYSC relocation portal: The official domain is `portal.nysc.org.ng`, while a scam link circulating on WhatsApp is `nysc-direct-relocation-form.free.site`.',
            'Verifying that your commercial bank URL starts with `https://` before typing login credentials.'
          ],
          practicalDemonstration: 'Examine a web browser address bar: Identify the primary Domain Name versus subdomains and paths, showing how scammers hide fake domains inside lengthy URLs.',
          handsOnExercise: {
            title: 'Analyze 3 Legitimate vs. 3 Deceptive Website URLs',
            task: 'Inspect six sample URLs and categorize each as authentic or spoofed based on domain structure.',
            steps: [
              'Examine `portal.nysc.org.ng` vs. `nysc-portal.click/login`.',
              'Examine official bank domain `bankname.com.ng` vs. spoofed `bankname-secure-portal.com`.',
              'Examine `gov.ng` government domains vs. commercial `.com` mimics.'
            ],
            deliverable: 'Your 6-URL domain breakdown table with security verdicts.'
          },
          keyTakeaways: [
            'The domain name directly before the first single slash `/` identifies the real website owner.',
            'HTTPS encrypts data in transit but does not guarantee the website owner is honest.',
            'Official Nigerian government websites always end with `.gov.ng`.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_1_2_1',
              questionText: 'Which of the following website addresses is the genuine, official portal for the National Youth Service Corps?',
              options: [
                '`http://nysc-direct-dashboard.net/portal`',
                '`https://portal.nysc.org.ng`',
                '`https://nysc-free-certificate.online`',
                '`http://portal-nysc-gov-ng.website.cc`'
              ],
              correctAnswer: 1,
              explanation: '`portal.nysc.org.ng` is the official, secure domain of the National Youth Service Corps; unofficial domains use hyphens and generic TLDs to deceive users.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_1_3',
          moduleId: 'mod_lit_1',
          courseId: 'course_digital_foundations',
          title: 'Advanced Internet Searching and Information Literacy',
          sequence: 3,
          sequenceLabel: 'Lesson 1.3',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['LIT-FND-01'],
          introduction: 'Go beyond basic Google searches. Master advanced search operators to find specific academic papers, government reports, official circulars, and verified statistics in seconds.',
          lessonContent: [
            'Why Keyword Queries Fail: Typing complete conversational sentences like "Where can I find the NYSC bye-laws about pregnant corps members?" returns millions of unorganized blog posts and advertisements.',
            'Mastering Google Search Operators:',
            '• Exact Match (`"..."`): `"NYSC Bye-Laws 1993"` forces Google to find documents with that exact phrase.',
            '• Filetype Search (`filetype:pdf`): `NYSC secondary school curriculum filetype:pdf` searches strictly for downloadable PDF documents.',
            '• Site Search (`site:...`): `relocation site:nysc.gov.ng` searches only within official government server files.',
            '• Negative Exclusion (`-`): `corps member opportunities -loan` excludes loan advertisements from results.',
            'Evaluating Source Authority: Check author credentials, publication date, domain extensions (`.gov.ng`, `.edu.ng`, `.org`), and look for corroborating evidence across multiple independent sources.'
          ],
          nigerianContextExamples: [
            'Using `site:cbn.gov.ng circular filetype:pdf` to find verified Central Bank of Nigeria financial guidelines without relying on unverified blog rumors.',
            'Searching `"Digital Economy Policy" filetype:pdf site:gov.ng` for academic thesis research.'
          ],
          practicalDemonstration: 'Execute a combined search query on Google: `site:gov.ng "NYSC" filetype:pdf "allowance"` and observe how search results are filtered to official government gazettes.',
          handsOnExercise: {
            title: 'Execute 3 Advanced Search Queries for Your Service Year',
            task: 'Find three specific official documents using search operators.',
            steps: [
              'Query 1: Find an official PDF document on the NYSC website.',
              'Query 2: Find a downloadable lesson guide for your teaching subject using `filetype:pdf`.',
              'Query 3: Search for a specific scholarship opportunity excluding commercial aggregator spam using `-`.'
            ],
            deliverable: 'Your three search strings and the direct document links discovered.'
          },
          keyTakeaways: [
            'Use `filetype:pdf` to find direct downloadable curriculum guides and policy manuals.',
            'Use `site:domain.com` to isolate searches to verified official portals.',
            'Exact phrase matching (`"..."`) eliminates irrelevant keyword results.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_1_3_1',
              questionText: 'Which search query on Google will find official PDF circulars on the Central Bank of Nigeria website?',
              options: [
                'Please give me all CBN circulars in PDF format',
                '`site:cbn.gov.ng circular filetype:pdf`',
                'cbn circular pdf download now please',
                '`google search cbn circulars 2026`'
              ],
              correctAnswer: 1,
              explanation: 'Using `site:cbn.gov.ng` confines results to the official domain, and `filetype:pdf` filters results to downloadable PDF documents.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_lit_2',
      courseId: 'course_digital_foundations',
      sequence: 2,
      sequenceLabel: 'Module 2',
      title: 'Digital Communication, Misinformation and Online Citizenship',
      description: 'Master professional email protocols, identify fake news and viral WhatsApp rumors, and practice responsible digital citizenship.',
      learningObjectiveIds: ['LIT-COM-02'],
      lessons: [
        {
          lessonId: 'lesson_lit_2_1',
          moduleId: 'mod_lit_2',
          courseId: 'course_digital_foundations',
          title: 'Professional Email Communication and File Sharing',
          sequence: 1,
          sequenceLabel: 'Lesson 2.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['LIT-COM-02'],
          introduction: 'Email remains the primary formal communication channel in government, corporate business, and academia. Learn how to write structured professional emails, manage attachments, and utilize cloud sharing links.',
          lessonContent: [
            'The Structure of a Professional Email:',
            '• Subject Line: Actionable, concise, and professional (e.g. `Application for Medical Leave - State Code LA/26A/1234 - John Doe`).',
            '• Salutation: Respectful and professional (`Dear Mr. Alabi` or `Dear Hiring Committee`). Avoid `Hey bro` or `Hi guys`.',
            '• Body: State the core purpose in the first sentence. Use short paragraphs (2-3 sentences max).',
            '• Sign-off & Signature Block: Professional sign-off, full name, NYSC state code, phone number, and LinkedIn URL.',
            'Managing Large File Attachments: Email servers reject attachments exceeding 20-25MB. Instead of attaching a heavy 50MB file, upload the file to Google Drive and insert a shareable link with "Anyone with the link can view" permissions.',
            'CC vs. BCC: CC (Carbon Copy) is for people who need to stay informed but are not required to act. BCC (Blind Carbon Copy) hides recipient email addresses, protecting privacy when sending emails to large groups of students or corps members.'
          ],
          nigerianContextExamples: [
            'Sending an official CDS meeting notice to 50 corps members: Putting all 50 email addresses in BCC to prevent exposing everyone\'s personal email to spammers.',
            'Sharing an educational teaching video with your PPA principal via a view-only Google Drive link.'
          ],
          practicalDemonstration: 'Demonstrate configuring a professional Gmail signature with formatted text, NYSC state code, and clickable contact links.',
          handsOnExercise: {
            title: 'Draft a Formal Email with a Cloud Drive Share Link',
            task: 'Write a professional email requesting permission to host an educational workshop at your PPA, including a cloud document link.',
            steps: [
              'Write an executive subject line.',
              'Draft a 3-paragraph body requesting approval and outlining benefits.',
              'Include a link to a Google Drive project brief.',
              'Format a complete professional signature block.'
            ],
            deliverable: 'Your complete email draft ready for dispatch.'
          },
          keyTakeaways: [
            'Use BCC when emailing large groups to protect participant privacy and prevent spam.',
            'Use cloud storage links (Google Drive) for files exceeding standard 25MB email limits.',
            'A descriptive subject line ensures your message gets opened and prioritized.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_2_1_1',
              questionText: 'When sending an announcement to 100 corps members in your CDS group, why should you place their email addresses in the BCC field rather than the TO or CC field?',
              options: [
                'BCC makes the email send twice as fast',
                'BCC hides all recipient email addresses from each other, protecting their personal contact privacy and preventing spam reply-all chains',
                'BCC is required by Nigerian telecommunications law for all emails',
                'Emails placed in CC cannot be read on mobile phones'
              ],
              correctAnswer: 1,
              explanation: 'Blind Carbon Copy (BCC) preserves recipient privacy and prevents unauthorized harvesting of email addresses by group members.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_2_2',
          moduleId: 'mod_lit_2',
          courseId: 'course_digital_foundations',
          title: 'Evaluating Online Information: Misinformation and Fact-Checking',
          sequence: 2,
          sequenceLabel: 'Lesson 2.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['LIT-COM-02'],
          introduction: 'Misinformation on WhatsApp and social media can trigger panic, financial loss, and communal tension. Learn the cognitive red flags of fake news and how to verify viral claims using African fact-checking tools.',
          lessonContent: [
            'Misinformation vs. Disinformation vs. Malinformation:',
            '• Misinformation: False information shared without harmful intent (e.g. an elder forwarding an unverified herbal cure on WhatsApp).',
            '• Disinformation: Deliberately fabricated falsehoods created to deceive, manipulate elections, or extract money (e.g. fake federal employment recruitment portals).',
            '• Malinformation: Genuine private information shared maliciously to cause harm.',
            'The "Forwarded Many Times" Warning on WhatsApp: Messages tagged with this label are viral chain broadcasts. Treat them with extreme skepticism.',
            'Red Flags of Viral Nigerian Scams: SENSATIONAL CAPITALIZED HEADLINES, emotional manipulation ("Share to 10 groups or your mother will die"), broken grammar, and suspicious shortened links (`bit.ly`, `tinyurl.com`).',
            'Verified African Fact-Checking Platforms: Dubawa (dubawa.org), Africa Check (africacheck.org), and the International Fact-Checking Network (IFCN). Use Google Reverse Image Search to verify manipulated crisis photos.'
          ],
          nigerianContextExamples: [
            'A viral WhatsApp broadcast falsely claiming: "Federal Government announces N150,000 allowance increase for all corps members, click this link to apply with your BVN!"',
            'Using Google Lens to perform a reverse image search on a photo of a flooded bridge, discovering the photo was actually taken in Bangladesh in 2018.'
          ],
          practicalDemonstration: 'Demonstrate performing a Reverse Image Search with Google Lens: Uploading a viral photo and instantly viewing its original publication date and context.',
          handsOnExercise: {
            title: 'Audit a Viral WhatsApp Broadcast Using the SIFT Method',
            task: 'Apply the SIFT framework (Stop, Investigate the source, Find better coverage, Trace claims) to an unverified viral claim.',
            steps: [
              'Stop: Halt the impulse to forward the message immediately.',
              'Investigate the source: Who authoritatively published this first?',
              'Find better coverage: Does Channels TV, Premium Times, or Punch report it?',
              'Trace claims: Check official social media handles of the relevant government agency.'
            ],
            deliverable: 'A 1-page SIFT fact-checking report of a viral claim.'
          },
          keyTakeaways: [
            'Emotional manipulation and urgent calls to share are the top red flags of disinformation.',
            'Never forward unverified announcements, especially regarding government allowances or security alerts.',
            'Use reverse image search and verified fact-checking platforms (Dubawa, Africa Check) to verify claims.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_2_2_1',
              questionText: 'You receive a forwarded WhatsApp message claiming: "FEDERAL GOVT APPROVES N200,000 ALLOWEE FOR CORPS MEMBERS! CLICK HERE TO REGISTER BVN IMMEDIATELY". What is the most responsible action?',
              options: [
                'Forward it to all 10 camp platoon groups immediately',
                'Click the link and type your BVN before slots run out',
                'Do not forward it; verify the claim directly on official NYSC verified channels (`nysc.gov.ng` or `@officialnyscng`) and recognize it as a credential-harvesting scam',
                'Share it on your WhatsApp status'
              ],
              correctAnswer: 2,
              explanation: 'Sensational claims demanding immediate registration and BVN credentials are high-risk phishing scams designed to harvest banking information.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_2_3',
          moduleId: 'mod_lit_2',
          courseId: 'course_digital_foundations',
          title: 'Digital Citizenship, Online Reputation, and Cyberbullying',
          sequence: 3,
          sequenceLabel: 'Lesson 2.3',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['LIT-COM-02'],
          introduction: 'Everything you post, comment, share, or like creates an enduring digital footprint. Understand the legal liabilities under the Cybercrimes Act of Nigeria and build an honorable digital reputation.',
          lessonContent: [
            'Your Digital Footprint: Active footprint (posts, tweets, comments, photos you deliberately share) and Passive footprint (browsing history, IP addresses, location tags, app tracking data). Search engines index your public commentary permanently.',
            'The Cybercrimes (Prohibition, Prevention, etc.) Act of Nigeria: Publishing defamatory statements, sharing non-consensual intimate imagery, cyberstalking, or transmitting xenophobic threats carries severe statutory prison terms and substantial fines under Nigerian federal law.',
            'Pre-Employment Social Media Screenings: Over 70% of recruiters audit prospective candidates\' public social media handles. Offensive, aggressive, or unethical online behavior leads to immediate disqualification.',
            'Responding to Cyberbullying and Harassment: Document evidence (screenshots), block the offending accounts, report violations to platform administrators, and report severe extortion threats to law enforcement (Police Cybercrime Unit).'
          ],
          nigerianContextExamples: [
            'A corps member disqualified from an international scholarship after the selection committee discovered abusive, aggressive comments posted on X (Twitter) three years prior.',
            'Understanding that forwarding unverified defamatory accusations about a colleague on a community WhatsApp group can lead to civil defamation lawsuits.'
          ],
          practicalDemonstration: 'Google your own full name inside quotation marks: `"Your Full Name"` in an incognito window to see what a prospective employer sees about you on the public internet.',
          handsOnExercise: {
            title: 'Conduct a Personal Online Reputation Audit',
            task: 'Perform an incognito self-search across major search engines and audit your public social profiles.',
            steps: [
              'Search your name, email, and primary social handles on Google.',
              'Review public posts on your Facebook, X, and Instagram accounts from the past 3 years.',
              'Delete or switch to private any content that fails the "Professional Recruiter" test.'
            ],
            deliverable: 'A 1-paragraph summary of your personal reputation audit findings and cleanup actions.'
          },
          keyTakeaways: [
            'Your digital footprint is permanent and actively reviewed by employers and scholarship boards.',
            'The Cybercrimes Act of Nigeria strictly penalizes cyberstalking, defamation, and digital harassment.',
            'Conduct regular self-audits to curate an inspiring, professional online reputation.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_2_3_1',
              questionText: 'Under the Nigerian Cybercrimes Act, which of the following online actions can result in severe legal penalties and prosecution?',
              options: [
                'Writing an educational blog post on digital literacy',
                'Transmitting cyberstalking threats, sharing non-consensual private imagery, or publishing malicious defamatory falsehoods online',
                'Updating your profile photo on LinkedIn',
                'Sending a professional resume via email'
              ],
              correctAnswer: 1,
              explanation: 'The Cybercrimes Act criminalizes cyberstalking, digital harassment, identity theft, and malicious online defamation.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_lit_3',
      courseId: 'course_digital_foundations',
      sequence: 3,
      sequenceLabel: 'Module 3',
      title: 'Cybersecurity, Passwords and Identity Defense',
      description: 'Defend your personal accounts against brute-force attacks, configure password managers, deploy Two-Factor Authentication, and spot phishing traps.',
      learningObjectiveIds: ['LIT-SEC-03'],
      lessons: [
        {
          lessonId: 'lesson_lit_3_1',
          moduleId: 'mod_lit_3',
          courseId: 'course_digital_foundations',
          title: 'Strong Passwords, Passphrases and Password Managers',
          sequence: 1,
          sequenceLabel: 'Lesson 3.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['LIT-SEC-03'],
          introduction: 'The single most common cause of account takeover is password reuse. Learn how to create unhackable passphrases and use free, encrypted password managers to safeguard your digital life.',
          lessonContent: [
            'The Vulnerability of Common Passwords: Passwords like `password123`, `nigeria2026`, or your date of birth can be cracked by automated brute-force cracking software in less than 2 seconds.',
            'The Danger of Password Reuse: If you use the same password for an obscure forum, an online shop, and your primary Gmail account, a data breach on the shopping website immediately hands hackers the master keys to your entire email and banking ecosystem (Credential Stuffing).',
            'The Passphrase Method: Instead of complex, unmemorable strings like `P@$$w0rd!`, use a 4-word random passphrase: `JollofMangoKanoTractor`. It is easy for humans to visualize but mathematically impossible for brute-force computers to crack in a human lifetime.',
            'Password Managers (Bitwarden, Google Password Manager): Secure, zero-knowledge encrypted vaults that generate, store, and auto-fill unique 16-character passwords for every account. You only ever need to remember one strong Master Passphrase.'
          ],
          nigerianContextExamples: [
            'A corps member having their Instagram account hijacked and turned into a fake crypto-investment scam because they reused their email password on an untrusted camp website.',
            'Using Bitwarden to store 50 unique passwords, ensuring that a breach on one website never compromises bank or email accounts.'
          ],
          practicalDemonstration: 'Demonstrate checking password strength on `haveibeenpwned.com/passwords` to show how common passwords have already been leaked in global database dumps.',
          handsOnExercise: {
            title: 'Generate 3 Unhackable Passphrases and Audit Password Reuse',
            task: 'Create three unique 4-word passphrases using local memory anchors and set up a password manager.',
            steps: [
              'Generate Passphrase 1 for Primary Email.',
              'Generate Passphrase 2 for Online Banking/Fintech.',
              'Enable Google Password Manager or install Bitwarden.',
              'Audit your saved passwords for reused credentials.'
            ],
            deliverable: 'Your passphrase generation notes and password audit checklist.'
          },
          keyTakeaways: [
            'Never reuse the same password across multiple online accounts.',
            'Use random 4-word passphrases for maximum entropy and human memorability.',
            'Deploy a password manager to maintain unique, complex credentials for every service.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_3_1_1',
              questionText: 'Why is using the same password for your social media account, shopping apps, and primary email a dangerous security risk?',
              options: [
                'Because phones can only remember one password at a time',
                'If a weak shopping website suffers a data breach, hackers will use those leaked credentials to access your primary email and bank accounts (Credential Stuffing)',
                'Because internet providers charge extra fees for duplicate passwords',
                'Because passwords expire every 24 hours'
              ],
              correctAnswer: 1,
              explanation: 'Password reuse exposes you to credential stuffing: hackers take passwords leaked from small breaches and test them across major email and banking services.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_3_2',
          moduleId: 'mod_lit_3',
          courseId: 'course_digital_foundations',
          title: 'Multi-Factor Authentication (2FA) and App Authenticators',
          sequence: 2,
          sequenceLabel: 'Lesson 3.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['LIT-SEC-03'],
          introduction: 'Passwords alone are no longer enough. Multi-Factor Authentication (2FA) adds an unbreachable secondary barrier. Learn the hierarchy of 2FA methods and why authenticator apps outperform SMS.',
          lessonContent: [
            'What is Multi-Factor Authentication? Requiring two or more verification factors to gain access: 1. Something you KNOW (password/PIN); 2. Something you HAVE (smartphone authenticator app / hardware key); 3. Something you ARE (fingerprint / face ID).',
            'The Vulnerability of SMS 2FA in Nigeria: SMS-based OTPs (One-Time Passwords) can be intercepted through SIM swap fraud, telecom network eavesdropping, or mobile malware. If a criminal clones your SIM, they receive your banking SMS OTPs!',
            'App-Based Authenticators (Google Authenticator, Microsoft Authenticator): Generate rotating 6-digit Time-based One-Time Passwords (TOTP) every 30 seconds directly on your device offline without cellular network reliance. They are immune to SIM swap attacks.',
            'Backup Codes: When enabling 2FA, platforms generate 8 to 10 single-use Backup Recovery Codes. Always save these codes offline (written in a private notebook), so you are never locked out if your phone is lost or damaged.'
          ],
          nigerianContextExamples: [
            'Protecting your WhatsApp account against takeover by enabling Two-Step Verification (a 6-digit PIN) inside WhatsApp Settings → Account → Two-Step Verification.',
            'Securing your primary Gmail account with Google Authenticator so that even if someone guesses your password, they cannot access your emails.'
          ],
          practicalDemonstration: 'Demonstrate setting up Google Authenticator on a Gmail account: Scan QR code, observe the 30-second rotating countdown timer, and save backup codes.',
          handsOnExercise: {
            title: 'Enable Two-Step Verification on WhatsApp and Primary Email',
            task: 'Activate 2FA across your two most critical digital communication tools.',
            steps: [
              'Open WhatsApp → Settings → Account → Two-Step Verification → Enable and set a 6-digit PIN and backup email.',
              'Open your primary Google/Apple account security settings → Turn on 2-Step Verification.',
              'Add Google Authenticator as your default verification method.',
              'Download and store your recovery backup codes securely.'
            ],
            deliverable: 'Confirmation of active 2FA across WhatsApp and your primary email.'
          },
          keyTakeaways: [
            '2FA requires a password plus a secondary device verification factor.',
            'Authenticator apps (TOTP) are vastly more secure than SMS codes because they are immune to SIM swaps.',
            'Always store your single-use recovery backup codes offline.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_3_2_1',
              questionText: 'Why are mobile Authenticator Apps (like Google Authenticator) safer than receiving 2FA codes via SMS text messages in Nigeria?',
              options: [
                'Authenticator apps can only be opened by government officials',
                'SMS verification codes can be intercepted through SIM swap fraud and network eavesdropping, whereas authenticator app codes are generated locally offline on your device',
                'SMS text messages are illegal for banking in Nigeria',
                'Authenticator apps make your phone battery charge faster'
              ],
              correctAnswer: 1,
              explanation: 'SMS codes are vulnerable to SIM swap attacks and carrier intercept; authenticator apps generate time-based codes locally on your device without transmitting over cellular networks.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_3_3',
          moduleId: 'mod_lit_3',
          courseId: 'course_digital_foundations',
          title: 'Recognizing Online Threats: Phishing, Malware, and Public Wi-Fi Risks',
          sequence: 3,
          sequenceLabel: 'Lesson 3.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['LIT-SEC-03'],
          introduction: 'Over 90% of successful cyberattacks begin with human social engineering. Learn how to spot sophisticated phishing emails, avoid malware infection, and safely use public Wi-Fi networks.',
          lessonContent: [
            'Anatomy of a Phishing Attack: Fraudulent messages impersonating trusted authorities (banks, NYSC, Google, telecommunication providers). They create false urgency ("Your account will be suspended in 2 hours! Click here to update your BVN").',
            'Smishing (SMS Phishing) & Vishing (Voice Phishing): Receiving SMS alerts claiming your debit card has been blocked with a phone number to call, or receiving phone calls from scammers pretending to be bank staff asking for your OTP.',
            'Malware & Dangerous APK Downloads: In Nigeria, downloading cracked Android apps (`.apk` files) from unofficial websites to get "free internet" or "modded WhatsApp" is a major attack vector. These apps contain spyware that records keystrokes and steals banking credentials.',
            'The Danger of Open Public Wi-Fi: Public Wi-Fi in orientation camps, hotels, and cafes often lacks encryption. Attackers on the same network can intercept unencrypted data using Man-in-the-Middle (MitM) tools. Always use a Virtual Private Network (VPN) and avoid banking on public Wi-Fi.'
          ],
          nigerianContextExamples: [
            'Receiving a text: "Dear customer, your bank BVN is blacklisted due to a regulatory upgrade. Call our help desk on 080XXXXXXXX to reactivate." Official Nigerian banks will NEVER ask for your BVN, card PAN, or OTP via a regular mobile phone number!',
            'Refusing to download "WhatsApp Gold" or unofficial APK mods that steal private chats.'
          ],
          practicalDemonstration: 'Inspect a raw phishing email header: Reveal the true sender address behind a deceptive display name (e.g. Display Name: "Access Bank", True Sender: `secure-update@random-domain.xyz`).',
          handsOnExercise: {
            title: 'Conduct a 5-Point Phishing Spotting Exercise',
            task: 'Analyze three sample phishing scenarios and document the specific technical red flags present in each.',
            steps: [
              'Identify sender address mismatch.',
              'Identify psychological pressure / false urgency tactics.',
              'Identify suspicious links or unverified attachment extensions (`.exe`, `.apk`, `.vbs`).'
            ],
            deliverable: 'A 1-page phishing dissection analysis.'
          },
          keyTakeaways: [
            'Banks and official agencies will never ask for your PIN, OTP, or password via phone, SMS, or email.',
            'Never install cracked or unofficial `.apk` files on your smartphone.',
            'Avoid accessing sensitive banking or email portals over open, unencrypted public Wi-Fi networks.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_3_3_1',
              questionText: 'You receive an urgent phone call from someone claiming to be a customer care agent from your commercial bank, stating that your account is about to be blocked and demanding you read out the 6-digit OTP just sent to your phone. What should you do?',
              options: [
                'Read the OTP immediately so your account is not blocked',
                'Hang up immediately: banks explicitly state that customer care staff will NEVER ask for your One-Time Password (OTP) or card PIN',
                'Ask the caller for their home address',
                'Transfer all your money to a stranger'
              ],
              correctAnswer: 1,
              explanation: 'No legitimate financial institution ever asks for your private OTP or PIN; any demand for an OTP is an active account takeover attempt.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_lit_4',
      courseId: 'course_digital_foundations',
      sequence: 4,
      sequenceLabel: 'Module 4',
      title: 'Practical Digital Safety, Scam Defense and Incident Response',
      description: 'Defend your BVN and NIN, prevent SIM swap fraud, configure social media privacy locks, and create a personal cyber incident response plan.',
      learningObjectiveIds: ['LIT-SAF-04'],
      lessons: [
        {
          lessonId: 'lesson_lit_4_1',
          moduleId: 'mod_lit_4',
          courseId: 'course_digital_foundations',
          title: 'SIM Swap Fraud Prevention and Telecommunications Hygiene',
          sequence: 1,
          sequenceLabel: 'Lesson 4.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['LIT-SAF-04'],
          introduction: 'In Nigeria, your mobile phone number is your master digital identity key. Learn how SIM swap fraud works, how criminals exploit compromised NIN credentials, and how to lock your SIM card with a custom PIN.',
          lessonContent: [
            'What is SIM Swap Fraud? A criminal impersonates you at a telecom service center (MTN, Airtel, Glo, 9mobile) using fake IDs or compromised National Identity Number (NIN) slips. They request a replacement SIM card, deactivating your physical SIM and routing all your incoming SMS OTPs and phone calls to their device.',
            'Warning Signs of an Active SIM Swap: Your phone suddenly loses cellular network service ("No Service" or "Emergency Calls Only") in an area where you normally have strong reception, especially during late-night hours.',
            'Enabling a SIM Card PIN: By default, mobile SIM cards in Nigeria have default PINs (e.g. `0000` or `1234`). If your phone is stolen, criminals can remove the physical SIM, put it in another phone, and dial USSD banking codes. Setting a custom 4-digit SIM PIN prevents unauthorized use.',
            'Protecting Your NIN and BVN: Never laminate or carry your full NIN slip or BVN slip in public wallets. Never share photocopies of identity documents with unverified agents.'
          ],
          nigerianContextExamples: [
            'Enabling a custom SIM lock PIN on an MTN or Airtel SIM card: Phone Settings → Security → SIM Card Lock → Change SIM PIN.',
            'Immediately borrowing a phone to contact your bank emergency hotline to freeze your accounts if your primary phone suddenly loses network service under suspicious circumstances.'
          ],
          practicalDemonstration: 'Demonstrate configuring a custom 4-digit SIM PIN on Android and iOS: Explain PUK code recovery so students never permanently lock their SIM cards.',
          handsOnExercise: {
            title: 'Configure a Custom SIM Card PIN and Record PUK Emergency Data',
            task: 'Set up a custom SIM lock PIN on your primary mobile number.',
            steps: [
              'Locate your original SIM pack or dial your telecom service center to confirm your PUK code.',
              'Open mobile phone security settings → Enable SIM Card Lock.',
              'Change the default factory PIN (0000/1234) to a custom 4-digit secret PIN.',
              'Record emergency bank USSD deactivation codes on paper.'
            ],
            deliverable: 'Confirmation of active SIM PIN lock on your primary device.'
          },
          keyTakeaways: [
            'Your mobile phone number is the gateway to your banking USSD and SMS OTPs.',
            'Lock your physical SIM card with a custom 4-digit PIN to prevent USSD draining if stolen.',
            'Sudden loss of cellular reception accompanied by password reset emails is an indicator of an active SIM swap.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_4_1_1',
              questionText: 'What happens if you set a custom SIM Card PIN on your mobile phone and your phone is stolen?',
              options: [
                'The phone battery explodes',
                'If the thief removes your SIM and inserts it into another phone, they cannot access your phone number or dial USSD banking codes without entering your 4-digit PIN',
                'The thief can instantly see all your photos',
                'Your telecom line is permanently deleted'
              ],
              correctAnswer: 1,
              explanation: 'A SIM Card PIN locks the SIM chip itself; without the 4-digit PIN, it cannot connect to cellular networks or run USSD banking commands in any device.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_4_2',
          moduleId: 'mod_lit_4',
          courseId: 'course_digital_foundations',
          title: 'Social Media Privacy Controls and App Permissions Audit',
          sequence: 2,
          sequenceLabel: 'Lesson 4.2',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['LIT-SAF-04'],
          introduction: 'Take back control of your privacy. Audit mobile application permissions (microphone, camera, contacts, location) and lock down social media privacy settings against stalkers and identity thieves.',
          lessonContent: [
            'Overreaching App Permissions: Why does a simple flashlight app or photo filter app need 24/7 access to your phone contacts, microphone, and precise GPS location? Unscrupulous developers harvest and sell this personal metadata to predatory loan apps and spam brokers.',
            'Auditing Mobile App Permissions: Open Phone Settings → Privacy → Permission Manager. Audit which apps have access to Location ("Only while using app"), Microphone, and Contacts. Revoke permissions from apps that do not legitimately need them.',
            'WhatsApp Privacy Lockdown:',
            '• Profile Photo: Set to "My Contacts" (not "Everyone") to prevent strangers from saving your photo for impersonation scams.',
            '• Groups Privacy: Set to "My Contacts Except..." to prevent random crypto scammers and MLM spammers from adding you to predatory groups without consent.',
            '• Last Seen & Online Status: Restrict visibility to contacts.',
            'Location Tagging Awareness: Avoid posting real-time location tags (e.g. checking in at your exact PPA or residence). Post vacation or travel photos AFTER you have departed the location.'
          ],
          nigerianContextExamples: [
            'Preventing predatory digital loan apps from harvesting your entire address book to harass your contacts by revoking Contacts permission from unnecessary apps.',
            'Setting WhatsApp Groups setting to "My Contacts" so unknown numbers cannot add you to fraudulent foreign investment groups.'
          ],
          practicalDemonstration: 'Demonstrate navigating Android Permission Manager: Revoking contact and microphone access from 5 background gaming and utility applications.',
          handsOnExercise: {
            title: 'Execute a Comprehensive Social Media & App Permission Lockdown',
            task: 'Lock down privacy settings on WhatsApp and audit mobile application permissions.',
            steps: [
              'WhatsApp: Set Profile Photo and About to "My Contacts".',
              'WhatsApp: Set Groups setting to "My Contacts".',
              'Phone Settings: Audit Permission Manager and revoke Contacts access from all non-messaging apps.',
              'Turn off precise location sharing for social media apps.'
            ],
            deliverable: 'A 4-point privacy lockdown verification checklist.'
          },
          keyTakeaways: [
            'Revoke contact and microphone access from non-essential mobile utility apps.',
            'Restrict WhatsApp group additions and profile photo visibility to contacts only.',
            'Avoid tagging real-time physical locations on social media to prevent stalker profiling.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_4_2_1',
              questionText: 'Why should you change your WhatsApp "Groups" privacy setting from "Everyone" to "My Contacts"?',
              options: [
                'To make your WhatsApp messages send in French',
                'To prevent unknown scammers, MLM promoters, and fraud rings from automatically adding you to spam broadcast groups without your consent',
                'Because WhatsApp will delete accounts with "Everyone" selected',
                'To save phone battery'
              ],
              correctAnswer: 1,
              explanation: 'Restricting group invitations prevents scammers and malicious actors from harvesting your phone number and adding you to fraudulent investment groups.'
            }
          ]
        },
        {
          lessonId: 'lesson_lit_4_3',
          moduleId: 'mod_lit_4',
          courseId: 'course_digital_foundations',
          title: 'Creating Your Personal Digital Safety and Incident Response Plan',
          sequence: 3,
          sequenceLabel: 'Lesson 4.3',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['LIT-SAF-04'],
          introduction: 'Cybersecurity is not just about prevention; it is about resilience when things go wrong. Build a personal emergency incident response protocol to rapidly contain phone theft, account takeover, or card loss.',
          lessonContent: [
            'The First 60 Minutes of a Phone Theft: Panic wastes precious time. Criminals who snatch a phone race to dial USSD banking codes before you can react. You must execute an immediate 4-step emergency sequence:',
            '1. Call Your Bank Emergency USSD Deactivation Code from any nearby phone (e.g. GTBank `*737*51*74#`, Zenith `*966*911#`, Access `*901*911#`, UBA `*919*911#`) to immediately freeze all outgoing transactions on your accounts.',
            '2. Call Your Telecom Provider to block your SIM card immediately, shutting down incoming SMS OTP delivery.',
            '3. Remotely Lock & Wipe Your Smartphone using Google Find My Device (`google.com/android/find`) or Apple iCloud Find My.',
            '4. Revoke Active Sessions & Change Passwords on your primary email from a trusted computer.',
            'The Offline Emergency Wallet Card: Keep a physical index card in your wallet (or written in your camp room) listing your bank emergency USSD block codes, customer care numbers, and account numbers—NEVER write your PINs or passwords on this card!'
          ],
          nigerianContextExamples: [
            'A corps member in Lagos whose phone was snatched on a bus immediately borrowing a fellow passenger\'s phone to dial their bank\'s emergency deactivation USSD code within 3 minutes, preventing criminals from draining their account.',
            'Using Google Find My Device to remotely erase all personal photos and student data from a lost phone.'
          ],
          practicalDemonstration: 'Demonstrate Google Find My Device: Show how to locate a device on a map, trigger a loud ring (even if on silent), set a lock screen message, and execute a remote wipe.',
          handsOnExercise: {
            title: 'Draft Your Personal Emergency Incident Response Card',
            task: 'Create an offline emergency response reference card containing critical deactivation codes.',
            steps: [
              'List the USSD account freeze code for your primary bank.',
              'List the telecom hotline number to block your SIM card.',
              'Record the web URL for Google Find My Device or Apple Find My.',
              'Store this physical card in your wallet or offline document folder.'
            ],
            deliverable: 'Your completed Emergency Incident Response Card.'
          },
          keyTakeaways: [
            'Memorize or record your bank emergency USSD account deactivation code offline.',
            'In case of phone theft: Freeze bank accounts first, block SIM second, wipe device remotely third.',
            'Never write passwords, PINs, or BVNs on emergency reference documents.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_lit_4_3_1',
              questionText: 'If your smartphone is snatched in a commercial bus in Nigeria, what is the single most urgent action to take within the first 5 minutes?',
              options: [
                'Post an angry message on Facebook from a desktop computer',
                'Borrow a phone immediately and dial your bank emergency USSD deactivation code to freeze all financial transactions on your account before criminals attempt USSD banking theft',
                'Wait until tomorrow morning to visit the police station',
                'Buy a new phone charger'
              ],
              correctAnswer: 1,
              explanation: 'Dialing your bank\'s emergency USSD freeze code takes less than 30 seconds and instantly halts unauthorized money transfers before thieves can access your accounts.'
            }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Personal and Community Digital Safety Audit & Defense Plan',
    overview: 'Conduct a comprehensive personal cybersecurity audit across your digital devices, configure advanced defense controls (2FA, SIM PIN, Privacy settings), and produce an educational digital safety guide for fellow corps members or your PPA community.',
    instructions: [
      'Step 1: Execute a personal cyber hygiene audit: check for leaked credentials on haveibeenpwned, audit mobile app permissions, and verify 2FA on primary email and WhatsApp.',
      'Step 2: Configure a custom 4-digit SIM PIN lock on your primary mobile SIM.',
      'Step 3: Create an offline Emergency Incident Response Card with bank USSD deactivation codes and telecom numbers.',
      'Step 4: Design a 1-page educational Digital Safety Checklist (in Canva, Docs, or Markdown) educating students or fellow corps members on spotting phishing scams, fake alerts, and SIM swap fraud.',
      'Step 5: Assemble your findings, implementation proofs, and checklist into a unified project submission.'
    ],
    assessmentCriteria: [
      'Cyber Hygiene Execution: Are 2FA, password managers, and SIM PIN locks properly configured and verified? (25%)',
      'Threat Analysis & Scam Spotting: Does the audit clearly explain phishing, smishing, fake alerts, and SIM swap mechanics? (25%)',
      'Emergency Response Readiness: Is the incident response plan comprehensive, actionable, and tailored to Nigerian banking USSD protocols? (25%)',
      'Community Educational Impact: Is the 1-page digital safety guide clear, practical, visually accessible, and relevant to local youth? (25%)'
    ],
    submissionGuidelines: 'Submit your project title, a 300-500 word overview of your security upgrades, and links to your personal audit checklist and your 1-page community digital safety guide.'
  },
  finalAssessment: [
    {
      id: 'fa_lit_01',
      questionText: 'What is the most effective way to prevent your smartphone storage from filling up and slowing down due to WhatsApp?',
      options: [
        'Turn off your phone screen',
        'Disable "Media Auto-Download" in WhatsApp settings so photos and videos are only downloaded when you manually choose to tap them',
        'Delete the WhatsApp application permanently',
        'Only use your phone on Sundays'
      ],
      correctAnswer: 1,
      explanation: 'Disabling auto-download prevents unwanted videos, memes, and photos from consuming storage and data bundles.',
      relatedLessonId: 'lesson_lit_1_1'
    },
    {
      id: 'fa_lit_02',
      questionText: 'Which of the following represents the genuine, secure website domain for the National Youth Service Corps portal?',
      options: [
        '`http://nysc-direct-portal.online`',
        '`https://portal.nysc.org.ng`',
        '`https://nysc-free-dashboard.com`',
        '`http://nysc-portal-gov-ng.cc`'
      ],
      correctAnswer: 1,
      explanation: '`portal.nysc.org.ng` is the official, verified domain of the NYSC; unofficial domains use hyphens and generic TLDs.',
      relatedLessonId: 'lesson_lit_1_2'
    },
    {
      id: 'fa_lit_03',
      questionText: 'Which Google search query will find official downloadable PDF circulars on the Central Bank of Nigeria website?',
      options: [
        'search cbn circular pdf please',
        '`site:cbn.gov.ng circular filetype:pdf`',
        'all circulars from cbn online download',
        'cbn pdf circulars 2026'
      ],
      correctAnswer: 1,
      explanation: '`site:cbn.gov.ng` restricts searches to the official domain, and `filetype:pdf` filters for PDF documents.',
      relatedLessonId: 'lesson_lit_1_3'
    },
    {
      id: 'fa_lit_04',
      questionText: 'When sending an email announcement to 80 corps members in your CDS group, why must you place their email addresses in the BCC field?',
      options: [
        'BCC makes the email free of charge',
        'BCC protects participant privacy by hiding everyone\'s email address and preventing spammers from harvesting contact lists',
        'BCC is required for emails longer than 10 words',
        'BCC automatically translates the email into French'
      ],
      correctAnswer: 1,
      explanation: 'BCC preserves recipient privacy and prevents unauthorized harvesting of contact information.',
      relatedLessonId: 'lesson_lit_2_1'
    },
    {
      id: 'fa_lit_05',
      questionText: 'You receive a viral WhatsApp message claiming the Federal Government has approved N200,000 allowance for corps members and demanding you click a link to input your BVN. What should you do?',
      options: [
        'Forward it to 10 groups immediately',
        'Do not forward it; recognize it as a credential-harvesting phishing scam and check official verified NYSC channels (`nysc.gov.ng`)',
        'Click the link and submit your BVN and ATM PIN',
        'Share it on your WhatsApp status'
      ],
      correctAnswer: 1,
      explanation: 'Sensational messages demanding immediate registration and BVN credentials are high-risk phishing scams.',
      relatedLessonId: 'lesson_lit_2_2'
    },
    {
      id: 'fa_lit_06',
      questionText: 'Under the Nigerian Cybercrimes Act, which of the following online actions can lead to criminal prosecution and imprisonment?',
      options: [
        'Publishing a digital marketing flyer for your business',
        'Transmitting cyberstalking threats, sharing non-consensual private imagery, or disseminating malicious defamatory falsehoods online',
        'Updating your professional resume on LinkedIn',
        'Sending a polite inquiry via email'
      ],
      correctAnswer: 1,
      explanation: 'The Cybercrimes Act penalizes digital harassment, cyberstalking, non-consensual media sharing, and online defamation.',
      relatedLessonId: 'lesson_lit_2_3'
    },
    {
      id: 'fa_lit_07',
      questionText: 'Why is using the same password across multiple online accounts dangerous?',
      options: [
        'Phones cannot store duplicate passwords',
        'If one low-security website suffers a data breach, hackers will use those leaked credentials to access your primary email and banking portals (Credential Stuffing)',
        'It causes your data bundle to expire faster',
        'Duplicate passwords are legally prohibited'
      ],
      correctAnswer: 1,
      explanation: 'Password reuse enables credential stuffing, where hackers use credentials leaked from one breach to take over other accounts.',
      relatedLessonId: 'lesson_lit_3_1'
    },
    {
      id: 'fa_lit_08',
      questionText: 'Why are mobile Authenticator Apps (like Google Authenticator) safer than SMS text message codes in Nigeria?',
      options: [
        'Authenticator apps can only be downloaded by software engineers',
        'SMS codes can be intercepted through SIM swap fraud and network eavesdropping, whereas authenticator app codes are generated locally offline on your device',
        'SMS messages are illegal for bank verification',
        'Authenticator apps increase your phone memory'
      ],
      correctAnswer: 1,
      explanation: 'Authenticator apps generate codes locally on your device without cellular transmission, making them immune to SIM swap fraud.',
      relatedLessonId: 'lesson_lit_3_2'
    },
    {
      id: 'fa_lit_09',
      questionText: 'A caller claiming to be from your bank says your debit card is blocked and demands your 6-digit SMS OTP to unlock it. What should you do?',
      options: [
        'Read the OTP immediately',
        'Hang up immediately: legitimate banks explicitly state that customer care staff will NEVER ask for your private OTP or PIN',
        'Ask the caller for a loan',
        'Send your card details via SMS'
      ],
      correctAnswer: 1,
      explanation: 'No legitimate financial institution asks for your private OTP; demands for OTPs are active account takeover attempts.',
      relatedLessonId: 'lesson_lit_3_3'
    },
    {
      id: 'fa_lit_10',
      questionText: 'What is the security purpose of configuring a custom 4-digit SIM Card PIN on your phone?',
      options: [
        'It makes phone calls completely free',
        'If your phone is stolen, thieves cannot remove your physical SIM card and insert it into another phone to dial USSD banking codes or receive SMS OTPs without your PIN',
        'It speeds up your internet connection',
        'It changes your phone wallpaper'
      ],
      correctAnswer: 1,
      explanation: 'A SIM Card PIN locks the SIM chip, preventing thieves from using your number in another device to execute USSD banking fraud.',
      relatedLessonId: 'lesson_lit_4_1'
    },
    {
      id: 'fa_lit_11',
      questionText: 'Why should you restrict your WhatsApp "Groups" privacy setting to "My Contacts"?',
      options: [
        'To delete all your contacts',
        'To prevent unknown scammers, MLM promoters, and fraud syndicates from automatically adding you to spam broadcast groups without your consent',
        'Because WhatsApp requires all users to do so',
        'To hide your profile name'
      ],
      correctAnswer: 1,
      explanation: 'Restricting group invitations prevents scammers and malicious actors from harvesting your phone number and adding you to fraudulent groups.',
      relatedLessonId: 'lesson_lit_4_2'
    },
    {
      id: 'fa_lit_12',
      questionText: 'If your smartphone is snatched in a public bus in Nigeria, what is the single most urgent action to take within the first 5 minutes?',
      options: [
        'Borrow a phone immediately and dial your bank emergency USSD deactivation code to freeze all financial transactions on your account before criminals attempt USSD banking theft',
        'Wait until the next day to visit your service provider',
        'Post on Instagram that your phone was lost',
        'Buy a new phone charger'
      ],
      correctAnswer: 0,
      explanation: 'Dialing your bank\'s emergency USSD freeze code immediately halts unauthorized transactions before thieves can access your accounts.',
      relatedLessonId: 'lesson_lit_4_3'
    },
    {
      id: 'fa_lit_13',
      questionText: 'What is a "Passphrase" in password security?',
      options: [
        'A single 4-letter word',
        'A sequence of random, memorable words (e.g. `JollofMangoKanoTractor`) that creates high cryptographic entropy while remaining easy for humans to remember',
        'A password that only uses numbers',
        'Your mother\'s maiden name'
      ],
      correctAnswer: 1,
      explanation: 'Multi-word passphrases provide immense mathematical entropy against brute-force attacks while remaining easy for humans to recall.',
      relatedLessonId: 'lesson_lit_3_1'
    },
    {
      id: 'fa_lit_14',
      questionText: 'Why is connecting to open, unencrypted public Wi-Fi networks in hotels or cafes risky for online banking?',
      options: [
        'Public Wi-Fi networks always crash computers',
        'Attackers on the same unencrypted local network can intercept data traffic, hijack session cookies, or execute Man-in-the-Middle attacks',
        'Public Wi-Fi is legally prohibited in Nigeria',
        'Public Wi-Fi drains all bank accounts automatically'
      ],
      correctAnswer: 1,
      explanation: 'Unencrypted public Wi-Fi exposes data packets to local interception and eavesdropping unless protected with a VPN.',
      relatedLessonId: 'lesson_lit_3_3'
    },
    {
      id: 'fa_lit_15',
      questionText: 'What does the padlock icon and `https://` in a web browser address bar indicate?',
      options: [
        'The website is 100% owned by the Nigerian Federal Government',
        'Data transmitted between your browser and the website server is encrypted with SSL/TLS, preventing third-party eavesdropping in transit',
        'The website can never be used by scammers',
        'You do not need to enter any passwords'
      ],
      correctAnswer: 1,
      explanation: 'HTTPS encrypts data in transit between browser and server, though users must still verify that the domain name is authentic.',
      relatedLessonId: 'lesson_lit_1_2'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredFinalAssessmentPassScore: 80,
    requireCapstoneSubmission: true
  }
};
