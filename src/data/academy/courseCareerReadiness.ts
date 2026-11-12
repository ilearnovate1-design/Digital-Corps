import { AcademyCourse } from '../../types';

export const COURSE_CAREER_READINESS: AcademyCourse = {
  courseId: 'course_career_readiness',
  categoryId: 'career_employability',
  title: 'Digital Career Readiness and Employability',
  description: 'A practical, employment-focused course equipping corps members with international digital career competencies: ATS-compliant CV architecture, LinkedIn positioning, portfolio development, remote interview mastery, and Upwork freelancing.',
  targetAudience: 'Serving NYSC Corps Members preparing for post-service employment, aspiring remote workers, freelancers, and young professionals seeking international contracts.',
  entryRequirements: 'Basic digital device usage, proficiency in English, and readiness to build real-world career assets.',
  expectedDuration: '4 Weeks (Self-Paced • 12 Core Lessons)',
  themeColor: 'blue',
  iconName: 'Briefcase',
  active: true,
  version: '2026.1',
  youtubeUrl: 'https://www.youtube.com/playlist?list=PL_XQ6-mFz_UfM5_X-M3_X_M3_X_M3_X_N',
  youtubeChannelId: 'UC_XQ6-mFz_UfM5_X-M3_X_N',
  learningObjectives: [
    {
      id: 'CAR-ID-01',
      code: 'CAR-ID-01',
      title: 'Digital Workplace & Professional Identity',
      description: 'Navigate global remote work expectations, build an optimized LinkedIn profile, and curate a digital portfolio.'
    },
    {
      id: 'CAR-CV-02',
      code: 'CAR-CV-02',
      title: 'ATS Resume Engineering & AI Enhancement',
      description: 'Format single-column Applicant Tracking System (ATS) resumes using XYZ impact statements and responsible AI drafting.'
    },
    {
      id: 'CAR-INT-03',
      code: 'CAR-INT-03',
      title: 'Remote Interview & Asynchronous Workplace Skills',
      description: 'Master the STAR framework for behavioral interviews, digital meeting etiquette, and asynchronous team communication.'
    },
    {
      id: 'CAR-FRL-04',
      code: 'CAR-FRL-04',
      title: 'Freelancing Platforms & Contract Acquisition',
      description: 'Set up high-converting Upwork/Fiverr profiles, draft winning client proposals, avoid employment scams, and build a career roadmap.'
    }
  ],
  modules: [
    {
      moduleId: 'mod_car_1',
      courseId: 'course_career_readiness',
      sequence: 1,
      sequenceLabel: 'Module 1',
      title: 'Building Your Digital Professional Identity',
      description: 'Establish a credible, compelling digital brand across LinkedIn, personal portfolios, and professional networks to attract remote and local opportunities.',
      learningObjectiveIds: ['CAR-ID-01'],
      lessons: [
        {
          lessonId: 'lesson_car_1_1',
          moduleId: 'mod_car_1',
          courseId: 'course_career_readiness',
          title: 'Understanding the Digital Workplace and Remote Careers',
          sequence: 1,
          sequenceLabel: 'Lesson 1.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['CAR-ID-01'],
          introduction: 'The modern job market is no longer confined to physical offices in Lagos or Abuja. Discover how remote, hybrid, and distributed teams operate globally and what hiring managers expect from Nigerian talent.',
          lessonContent: [
            'The Rise of the Borderless Economy: Companies worldwide hire remote talent from emerging markets for customer success, software engineering, digital marketing, virtual assistance, and data analysis.',
            'Remote vs. Hybrid vs. Co-located: In a remote environment, visibility is defined by output and communication, not physical desk attendance. Asynchronous communication—writing clear, detailed updates that do not require an immediate live response—is the supreme remote superpower.',
            'Digital Workplace Expectations: Punctuality in digital meetings, proactive status reporting, reliable power/data contingencies, and high self-discipline are non-negotiable for sustaining international remote contracts.',
            'Overcoming the Nigerian Time Zone & Infrastructure Gap: Position yourself as reliable by communicating power contingencies, maintaining dual SIM data backups (e.g. MTN + Airtel), and mastering Google Calendar scheduling across GMT/EST/WAT.'
          ],
          nigerianContextExamples: [
            'A corps member deployed to a rural PPA in Ekiti State securing a $600/month remote virtual assistant role for a real estate agency in the UK.',
            'Navigating public power outages by investing in affordable mini DC-UPS routers and power banks to ensure uninterrupted Zoom interview presence.'
          ],
          practicalDemonstration: 'Review an actual remote team Slack communication log showing how a professional writes an end-of-day asynchronous update: "1. What I accomplished today; 2. What I will tackle tomorrow; 3. Current blockers (None)."' ,
          handsOnExercise: {
            title: 'Draft Your Remote Work Infrastructure Readiness Checklist',
            task: 'Conduct a personal readiness audit of your hardware, power backup, and connectivity setup.',
            steps: [
              'Audit primary internet speed and secondary mobile hotspot backup.',
              'Calculate your total available laptop battery hours and external power bank capacity.',
              'Write an emergency protocol for how you will notify a remote employer if power or internet fails.'
            ],
            deliverable: 'A 1-page personal remote readiness audit document.'
          },
          keyTakeaways: [
            'Remote work evaluates output, dependability, and written clarity rather than physical presence.',
            'Asynchronous communication minimizes unnecessary meetings and increases efficiency.',
            'Robust data and power contingency planning is essential for Nigerian remote professionals.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_1_1_1',
              questionText: 'What does "Asynchronous Communication" mean in a remote team?',
              options: [
                'Requiring every team member to be on a live Zoom call for 8 hours daily',
                'Communicating via written messages or documentation where team members respond on their own schedule without needing to be online at the same second',
                'Only communicating through handwritten postal letters',
                'Shouting across an open-plan office room'
              ],
              correctAnswer: 1,
              explanation: 'Asynchronous communication allows distributed global teams across different time zones to collaborate effectively without demanding real-time synchronization.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_1_2',
          moduleId: 'mod_car_1',
          courseId: 'course_career_readiness',
          title: 'Building a High-Impact Professional LinkedIn Presence',
          sequence: 2,
          sequenceLabel: 'Lesson 1.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['CAR-ID-01'],
          introduction: 'LinkedIn is the world\'s largest professional networking platform and recruiter search engine. Learn how to optimize your headline, about summary, and experience sections to rank high in recruiter searches.',
          lessonContent: [
            'The Search-Engine Mechanics of LinkedIn: Recruiters do not read profiles from top to bottom; they search for specific keywords (e.g. "Data Analysis", "SQL", "Customer Support", "Project Management"). Your headline and About section must contain these keywords.',
            'The Headline Formula: Never write just "NYSC Corps Member" or "Unemployed Graduate." Instead, use: [Core Specialization] | [Key Tools & Skills] | [Value Delivered / Impact]. E.g., "Virtual Assistant & Operations Specialist | Google Workspace, Notion, Trello | Helping SMEs Streamline Executive Workflows."',
            'The About Section: Tell your professional story in first-person narrative. Highlight: 1. Who you are and what drives you; 2. Key competencies and technical tools; 3. Tangible achievements; 4. A clear call to action ("Connect with me or reach out at name@email.com").',
            'Engagement & Social Proof: Post weekly insights regarding your PPA teaching experience, digital learning milestones, or industry trends. Comment thoughtfully on thought leaders\' posts to increase profile visibility.'
          ],
          nigerianContextExamples: [
            'Changing a headline from "Serving Corper at Community High School" to "STEM Educator & Digital Skills Trainer | Python, Google Classroom | Empowering 200+ Secondary Students in Oyo State."',
            'Securing an interview invitation from an international NGO simply because the recruiter searched "Lagos Project Coordinator" and the candidate had optimized their profile.'
          ],
          practicalDemonstration: 'Examine two side-by-side LinkedIn profiles: One with a blurry selfie and generic headline vs. one with a crisp headshot, custom banner, keyword-rich headline, and featured portfolio links.',
          handsOnExercise: {
            title: 'Rewrite Your Professional LinkedIn Headline and About Section',
            task: 'Draft a brand-new headline and 3-paragraph About summary using the high-converting formula.',
            steps: [
              'Draft your headline incorporating at least 3 searchable technical skills.',
              'Write Paragraph 1: Your professional background and passion.',
              'Write Paragraph 2: Core technical skills and concrete NYSC/academic accomplishments.',
              'Write Paragraph 3: Career aspirations and contact call to action.'
            ],
            deliverable: 'Your completed headline and About copy ready to paste into LinkedIn.'
          },
          keyTakeaways: [
            'Recruiters search LinkedIn using technical keywords; avoid generic job titles.',
            'A compelling headline communicates who you are, what tools you use, and the value you deliver.',
            'Active engagement and commenting exponentially boosts profile discovery.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_1_2_1',
              questionText: 'Which of the following represents the strongest LinkedIn headline for an NYSC corps member seeking digital employment?',
              options: [
                '"Youth Corper looking for any available job"',
                '"Virtual Assistant & Operations Specialist | Google Workspace, Notion, Trello | Streamlining Executive Workflows"',
                '"B.Sc Graduate (Second Class Upper) 2024"',
                '"Hardworking and humble Nigerian youth seeking opportunities"'
              ],
              correctAnswer: 1,
              explanation: 'This headline clearly communicates the target role, core tools, and measurable business value with searchable keywords.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_1_3',
          moduleId: 'mod_car_1',
          courseId: 'course_career_readiness',
          title: 'Creating a Simple Digital Portfolio to Prove Competence',
          sequence: 3,
          sequenceLabel: 'Lesson 1.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['CAR-ID-01'],
          introduction: 'In the digital economy, "Proof of Work" triumphs over paper degree certificates. Learn how to build a clean, compelling digital portfolio without writing code using Notion, Canva, or Google Drive.',
          lessonContent: [
            'Why Portfolios Outperform Traditional Degrees: Anyone can write "proficient in Excel" on a CV. A portfolio provides undeniable visual and quantitative proof: an automated revenue tracker workbook, a social media content calendar, or an event budget breakdown.',
            'Curating Projects: Quality over quantity. Showcase 3 to 4 deeply fleshed-out case studies rather than 20 superficial tasks. Each case study should follow: 1. The Challenge; 2. Your Role & Tools Used; 3. The Process; 4. The Final Deliverable; 5. Measurable Outcome.',
            'Free Portfolio Hosting Platforms: Use Notion to create an interactive personal website with a custom domain/public share link; use Canva for visual graphic design decks; use GitHub for software projects; or use a structured Google Drive portfolio folder with read-only sharing.',
            'Formatting for Mobile Access: Over 60% of recruiters review initial candidate links on mobile smartphones. Ensure your portfolio loads rapidly and displays cleanly on small mobile screens.'
          ],
          nigerianContextExamples: [
            'A corps member who organized a community health outreach creating a 3-page Notion portfolio case study featuring the flyer, budget spreadsheet, and attendance dashboard.',
            'An aspiring copywriter sharing a Google Drive folder containing 5 cold email scripts tailored for Nigerian fintechs.'
          ],
          practicalDemonstration: 'Demonstrate how to set a Notion page to "Share to Web" and customize the header, embed live Figma or Google Sheets frames, and generate a clean public URL.',
          handsOnExercise: {
            title: 'Outline Your First Digital Portfolio Case Study',
            task: 'Select one major project from your NYSC service, university final year, or personal skill practice and document it as a case study.',
            steps: [
              'Project Title & Category (e.g. "Secondary School Digital Literacy Initiative").',
              'The Problem: What was missing or inefficient?',
              'Your Action & Tools: What exact steps did you execute using what software?',
              'The Outcome: What tangible result was achieved (e.g. "Trained 85 students in Canva and basic spreadsheets")?'
            ],
            deliverable: 'A 1-page case study draft ready for portfolio embedding.'
          },
          keyTakeaways: [
            'Portfolios provide tangible proof of competence that certificates cannot match.',
            'Structure case studies with: Problem, Process, Tools, Deliverable, and Result.',
            'Accessible tools like Notion and Google Drive can host beautiful, zero-cost portfolios.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_1_3_1',
              questionText: 'What is the most effective element to include in a digital portfolio case study?',
              options: [
                'A copy of your primary school leaving certificate',
                'A structured breakdown showing the problem, tools used, step-by-step process, deliverable, and tangible results',
                '50 unlabelled screenshots with no explanatory text',
                'A list of hobbies such as reading and travelling'
              ],
              correctAnswer: 1,
              explanation: 'Hiring managers look for context: what problem you solved, how you approached it, what tools you mastered, and what measurable impact was achieved.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_car_2',
      courseId: 'course_career_readiness',
      sequence: 2,
      sequenceLabel: 'Module 2',
      title: 'CV Writing, ATS Systems, and Job Search Strategies',
      description: 'Engineer high-converting, single-column resumes that easily pass Applicant Tracking Systems (ATS) and master digital job hunting platforms.',
      learningObjectiveIds: ['CAR-CV-02'],
      lessons: [
        {
          lessonId: 'lesson_car_2_1',
          moduleId: 'mod_car_2',
          courseId: 'course_career_readiness',
          title: 'Creating an ATS-Compliant Professional CV',
          sequence: 1,
          sequenceLabel: 'Lesson 2.1',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['CAR-CV-02'],
          introduction: 'Over 75% of online job applications are filtered out by automated Applicant Tracking Systems (ATS) before a human recruiter ever sees them. Learn the strict layout and keyword rules to beat the ATS.',
          lessonContent: [
            'What is an ATS? Enterprise recruiters receive hundreds of applications per opening. ATS software (Workday, Greenhouse, Lever) scans incoming PDF/DOCX resumes, extracts text, and scores candidates based on keyword matches with the job description.',
            'The Fatal Flaws of Fancy Templates: Canva and visual design CVs with two columns, skill bars (e.g. "English: 90%"), graphics, tables, text boxes, and icons frequently choke ATS parsers, resulting in immediate silent rejection.',
            'The Single-Column Rule: Always use a clean, single-column layout with standard headings: Professional Summary, Core Competencies, Professional Experience, Education, and Certifications. Use standard fonts (Calibri, Arial, Helvetica).',
            'The Google XYZ Bullet Formula: Never write passive duties like "Responsible for teaching students." Instead, use: Accomplished [X] as measured by [Y], by doing [Z]. Example: "Increased secondary student term pass rates by 28% [Y] across 140 learners [X] by implementing interactive Google Classroom quizzes and weekly AI-assisted lesson modules [Z]."'
          ],
          nigerianContextExamples: [
            'Transforming an NYSC entry on a CV from "NYSC Corper at Local Govt, answered phones" to "Streamlined constituent records management for 12 department heads, reducing document retrieval latency by 40% through a centralized Google Drive indexing system."'
          ],
          practicalDemonstration: 'Demonstrate how an ATS text parser reads a 2-column resume versus a single-column resume, showing how multi-column text gets jumbled together into gibberish.',
          handsOnExercise: {
            title: 'Convert 3 Passive Job Duties into Google XYZ Bullet Points',
            task: 'Take three generic tasks from your NYSC deployment or past internships and rewrite them using the XYZ formula.',
            steps: [
              'Duty 1: "Handled data entry for market registrations."',
              'Duty 2: "Helped supervise secondary school computer lab."',
              'Duty 3: "Organized CDS group meetings."'
            ],
            deliverable: 'Three polished XYZ bullet points with quantitative impact metrics.'
          },
          keyTakeaways: [
            'Use single-column layouts without tables, graphics, or text boxes to guarantee ATS parseability.',
            'Write achievement-oriented bullet points using the Google XYZ formula: Accomplished X, measured by Y, by doing Z.',
            'Align resume keywords specifically with the requirements listed in the employer\'s job description.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_2_1_1',
              questionText: 'Why do sophisticated recruitment agencies and international employers advise against two-column CVs with graphic skill bars?',
              options: [
                'Because computers cannot open colorful files',
                'Because Applicant Tracking System (ATS) parsers frequently scramble multi-column layouts and fail to extract text from graphics and tables',
                'Because job candidates are legally required to use black ink on white paper',
                'Because graphical CVs take too long to download on fast internet'
              ],
              correctAnswer: 1,
              explanation: 'ATS software is designed to parse linear text; multi-column formats, text boxes, and skill graphics cause parsing errors and silent rejections.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_2_2',
          moduleId: 'mod_car_2',
          courseId: 'course_career_readiness',
          title: 'Using Digital Platforms to Find Legitimate Opportunities',
          sequence: 2,
          sequenceLabel: 'Lesson 2.2',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['CAR-CV-02'],
          introduction: 'Navigate reputable global and African job boards, set up proactive job alerts, and identify the red flags of employment and recruitment scams.',
          lessonContent: [
            'Verified Digital Job Portals: Focus your efforts on high-trust platforms: LinkedIn Jobs, Wellfound (formerly AngelList for startups), RemoteOK, We Work Remotely, Jobberman Nigeria, and specialized tech job boards.',
            'Configuring Proactive Search Alerts: Do not waste hours scrolling job feeds daily. Configure boolean keyword searches (e.g. `("Virtual Assistant" OR "Customer Support") AND "Remote" AND "Entry Level"`) and set daily email alerts.',
            'Spotting Employment Scams in Nigeria: Legitimate employers NEVER charge application fees, aptitude test processing fees, or demand that you buy training uniforms before hire. Beware of WhatsApp recruitment messages offering $500/day for liking YouTube videos (task scams).',
            'Direct Company Career Page Outreach: When you find an exciting opening on an aggregator, navigate directly to the company\'s official website to apply. Company portal submissions receive higher recruiter priority than third-party aggregators.'
          ],
          nigerianContextExamples: [
            'Recognizing a classic Lagos job scam: Receiving an unsolicited SMS inviting you to an interview at an undisclosed location in Ikeja without stating the job role or company name.',
            'Applying directly on the careers page of a pan-African tech startup (Flutterwave, Kuda, Chowdeck) after seeing a LinkedIn announcement.'
          ],
          practicalDemonstration: 'Demonstrate Boolean search operators on LinkedIn Jobs: `title:("Customer Success" OR "Operations") AND ("Nigeria" OR "Remote")`.',
          handsOnExercise: {
            title: 'Set Up 2 Targeted Job Alerts and Audit a Suspicious Posting',
            task: 'Configure two automated search alerts on LinkedIn or Jobberman and analyze a sample job ad for red flags.',
            steps: [
              'Define your target job title and location filter (Remote or Hybrid).',
              'Set up an automated email alert.',
              'Review a sample suspicious job message and list 3 specific warning signs.'
            ],
            deliverable: 'A screenshot or link to your active job alerts and your scam audit notes.'
          },
          keyTakeaways: [
            'Use targeted search operators and automated alerts to save time.',
            'Legitimate employers never demand payment for application, interview, or testing fees.',
            'Apply directly on official company career pages whenever possible.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_2_2_1',
              questionText: 'Which of the following is an immediate red flag indicating a job recruitment scam?',
              options: [
                'The company has an active, verified LinkedIn page with employee profiles',
                'The recruiter asks you to pay N5,000 for "interview registration and aptitude test material"',
                'The interview is conducted over Google Meet with a working camera',
                'The job description specifies clear required technical tools'
              ],
              correctAnswer: 1,
              explanation: 'Any demand for upfront payment—under the guise of registration, forms, tests, or background checks—is the hallmark of an employment scam.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_2_3',
          moduleId: 'mod_car_2',
          courseId: 'course_career_readiness',
          title: 'Using AI Responsibly to Enhance Career Documents',
          sequence: 3,
          sequenceLabel: 'Lesson 2.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['CAR-CV-02'],
          introduction: 'Leverage generative AI models as your personal career coach to analyze job descriptions, identify skill gaps, tailor cover letters, and polish resumes without sounding like a robotic clone.',
          lessonContent: [
            'The Job Description Gap Analysis Prompt: Paste the target job description and your current resume into Gemini or ChatGPT: "Act as an expert technical recruiter. Compare my resume against this job description. Identify: 1. Core keywords present in the JD that are missing from my resume; 2. Where my experience matches; 3. Areas where I need stronger quantifiable proof points."',
            'Customizing Cover Letters: Generic cover letters are discarded. Use AI to draft tailored, punchy 3-paragraph letters: 1. The Hook (why this specific company matters to you); 2. Concrete Proof of Impact (two relevant achievements); 3. The Forward-Looking Close.',
            'Avoiding the "AI Slop" Trap: Overly polished AI language filled with buzzwords like "delve", "testament", "spearheaded a multifaceted tapestry of synergies" screams automated copy. Always edit AI drafts to inject your authentic human voice, specific anecdotes, and local Nigerian context.',
            'Maintaining Ethical Accuracy: Never allow an AI model to invent skills, degrees, or certifications you do not possess. Fabricating credentials will disqualify you during background checks and technical interviews.'
          ],
          nigerianContextExamples: [
            'Prompting Gemini to rephrase an NYSC CDS leadership role into polished corporate terminology without exaggerating the scope of work.',
            'Tailoring an application for an international remote internship by adapting British English spelling (e.g. "organise", "programme") based on the London employer\'s location.'
          ],
          practicalDemonstration: 'Demonstrate a live JD keyword extraction prompt: "Extract the top 10 hard skills and top 5 soft skills from this job description and format as a bulleted checklist."',
          handsOnExercise: {
            title: 'Tailor a Real Cover Letter Using the AI Gap Analysis Method',
            task: 'Select an authentic entry-level job posting and tailor your professional cover letter.',
            steps: [
              'Paste the job description and extract key competencies.',
              'Draft a tailored cover letter using AI as your writing partner.',
              'Manually edit the draft to remove generic buzzwords and add a specific NYSC accomplishment.',
              'Check that the final letter is under 350 words.'
            ],
            deliverable: 'Your tailored, human-edited 1-page cover letter.'
          },
          keyTakeaways: [
            'Use AI to extract core keywords and conduct gap analyses against target job postings.',
            'Edit AI-drafted letters to eliminate robotic buzzwords and inject authentic personal voice.',
            'Never allow AI to fabricate qualifications or work experience.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_2_3_1',
              questionText: 'When using AI to draft a cover letter for an online job application, what is the most important step before submitting?',
              options: [
                'Submit the raw AI output immediately without reading it',
                'Thoroughly read and edit the draft to remove robotic clichés, verify facts, and inject your authentic personal voice',
                'Translate the letter into Latin',
                'Add 20 paragraphs of fictional work experience'
              ],
              correctAnswer: 1,
              explanation: 'Raw AI copy contains identifiable clichés and can invent details. Human editing ensures authenticity, accurate facts, and personal resonance.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_car_3',
      courseId: 'course_career_readiness',
      sequence: 3,
      sequenceLabel: 'Module 3',
      title: 'Interview Mastery and Workplace Professionalism',
      description: 'Master behavioral and technical interviews using the STAR framework, present professionally on video calls, and adhere to remote workplace etiquette.',
      learningObjectiveIds: ['CAR-INT-03'],
      lessons: [
        {
          lessonId: 'lesson_car_3_1',
          moduleId: 'mod_car_3',
          courseId: 'course_career_readiness',
          title: 'Preparing for Digital and Physical Interviews (The STAR Method)',
          sequence: 1,
          sequenceLabel: 'Lesson 3.1',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['CAR-INT-03'],
          introduction: 'Hiring decisions are won during behavioral interviews. Learn how to structure answers to tough questions like "Tell me about a time you handled a difficult conflict" using the world-renowned STAR framework.',
          lessonContent: [
            'The STAR Framework Architecture:',
            '• Situation: Set the scene briefly (1-2 sentences). Where were you working and what was the context?',
            '• Task: What was the specific objective, dilemma, or challenge you had to resolve?',
            '• Action: What specific steps did YOU take? (Focus on "I", not "we". Highlight tools, communication, and leadership).',
            '• Result: What was the outcome? Always quantify the impact (e.g. time saved, revenue increased, dispute resolved).',
            'Answering "Tell Me About Yourself": Never recite your CV chronologically. Use the Present-Past-Future model: 1. Present (What you are doing now at NYSC); 2. Past (Your relevant academic/project background); 3. Future (Why this specific company and role is the natural next step).',
            'Smart Reverse Interviewing: When the interviewer asks "Do you have any questions for us?", never say "No." Ask insightful questions: "What does success look like in the first 90 days of this role?" or "What is the biggest operational bottleneck your team is currently tackling?"'
          ],
          nigerianContextExamples: [
            'Answering a behavioral question using an NYSC camp platoon leadership challenge: how you mediated a dispute among parade participants to achieve a top-3 camp ranking.',
            'Using an NYSC teaching experience to answer: "Tell me about a time you had to adapt complex material for a disengaged audience."'
          ],
          practicalDemonstration: 'Contrast a rambling 4-minute interview answer with a tight, structured 90-second STAR response focusing on concrete metrics and personal accountability.',
          handsOnExercise: {
            title: 'Script 2 Complete STAR Interview Stories',
            task: 'Develop two reusable STAR story scripts from your university or NYSC experience.',
            steps: [
              'Story 1: A time you solved a difficult problem under tight deadlines.',
              'Story 2: A time you worked with a difficult team member or handled feedback.',
              'Format each story with clear [Situation], [Task], [Action], and [Result] headings.'
            ],
            deliverable: 'Two scripted 90-second STAR interview responses.'
          },
          keyTakeaways: [
            'Use the STAR method (Situation, Task, Action, Result) for all behavioral interview questions.',
            'Always frame your contributions with "I" and quantify the final result.',
            'Prepare 2-3 thoughtful reverse-interview questions to demonstrate high curiosity and strategic thinking.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_3_1_1',
              questionText: 'In the STAR interview methodology, what does the "R" stand for?',
              options: [
                'Resume',
                'Result',
                'Recruiter',
                'Rehearsal'
              ],
              correctAnswer: 1,
              explanation: 'R stands for Result: the measurable outcome, lessons learned, or quantitative impact of your actions.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_3_2',
          moduleId: 'mod_car_3',
          courseId: 'course_career_readiness',
          title: 'Digital Communication, Video Interviews, and Remote Etiquette',
          sequence: 2,
          sequenceLabel: 'Lesson 3.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['CAR-INT-03'],
          introduction: 'Master the technical and behavioral dynamics of video meetings (Google Meet, Zoom, Microsoft Teams) and professional workplace messaging (Slack, email).',
          lessonContent: [
            'Camera Setup & Environmental Hygiene: Position your webcam at eye level (prop up your laptop with books if necessary). Ensure your primary light source is facing you, not behind you (avoid harsh window backlighting).',
            'Audio Quality: Built-in laptop microphones pick up background fan noise, generator hums, and street chatter. Use a wired earphone with a microphone or enable AI background noise suppression (e.g. Krisp or Google Meet noise cancellation).',
            'Digital Body Language: Look directly into the camera lens when speaking to simulate direct eye contact. Nod and smile to show active listening during the interviewer\'s remarks.',
            'Slack and Professional Email Etiquette: Use clear subject lines. In workplace chat, avoid typing single words like "Hi" and waiting; write the full inquiry in one coherent message. Use thread replies to keep channels organized.'
          ],
          nigerianContextExamples: [
            'Testing generator noise levels 30 minutes before an international video interview and setting up in the quietest room with closed windows.',
            'Using Google Meet\'s built-in noise cancellation to block out barking neighborhood dogs or street traffic during remote client briefings.'
          ],
          practicalDemonstration: 'Perform a 60-second webcam lighting audit: Show bad lighting (window behind head causing dark silhouette) vs. good lighting (diffused front lighting with clear eye visibility).',
          handsOnExercise: {
            title: 'Record a 2-Minute Video Self-Introduction Audit',
            task: 'Record yourself on your smartphone or laptop delivering your "Tell me about yourself" answer and critique your video presence.',
            steps: [
              'Check eye level and framing (head and shoulders visible).',
              'Check lighting and background neatness.',
              'Listen to audio clarity: Is background noise audible?',
              'Audit speaking pace: Did you speak clearly and avoid excessive filler words ("um", "you know")?'
            ],
            deliverable: 'A self-critique rubric score of your recorded video self-introduction.'
          },
          keyTakeaways: [
            'Position webcams at eye level with front-facing light for professional video presence.',
            'Clear audio and background noise cancellation are more critical than 4K video resolution.',
            'Communicate complete thoughts in workplace messaging rather than sending fragmented single-word pings.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_3_2_1',
              questionText: 'Where should your primary light source be positioned during a remote video interview?',
              options: [
                'Directly behind your back facing the camera',
                'In front of your face illuminating your features evenly',
                'Turned off completely to keep the room dark',
                'On the floor pointing toward your feet'
              ],
              correctAnswer: 1,
              explanation: 'Front-facing light illuminates your face and expressions clearly; backlighting turns you into a dark silhouette on camera.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_3_3',
          moduleId: 'mod_car_3',
          courseId: 'course_career_readiness',
          title: 'Remote Workplace Conduct, Time Management and Deadlines',
          sequence: 3,
          sequenceLabel: 'Lesson 3.3',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['CAR-INT-03'],
          introduction: 'Explore the operational disciplines that distinguish top 1% remote professionals: proactive deadline management, calendar sovereignty, and managing independent output.',
          lessonContent: [
            'Proactive Blocker Reporting: Never wait until a deadline passes to inform your team that you encountered an obstacle. If a deliverable is due at 5:00 PM and you encounter a technical blocker at 11:00 AM, communicate immediately: "Here is what I have tried, here is where I am stuck, and here is what I need to proceed."',
            'Time-Boxing and Digital Calendar Management: Schedule your workday into dedicated focus blocks. Share your calendar availability using tools like Calendly to avoid 10-email back-and-forth scheduling headaches.',
            'Working Across Time Zones: Understand GMT, EST, PST, and WAT. Always confirm meeting times with explicit time-zone markers (e.g. "Let\'s meet at 2:00 PM WAT / 9:00 AM EST").',
            'Professional Boundary Management: Remote work can blur personal and professional lines. Establish a designated physical workspace, take regular breaks, and switch off work notifications after business hours to prevent burnout.'
          ],
          nigerianContextExamples: [
            'A Nigerian virtual assistant managing an executive in New York ensuring all calendar invitations automatically convert from EST to West Africa Time (WAT).',
            'Proactively notifying an overseas client 24 hours in advance if a regional public holiday or local power disruption will affect normal response times.'
          ],
          practicalDemonstration: 'Demonstrate setting up a free Calendly link connected to Google Calendar, with automated buffer times and custom screening questions for clients.',
          handsOnExercise: {
            title: 'Design a Remote Professional Weekly Schedule Matrix',
            task: 'Create a weekly time-blocked schedule incorporating focus work, client communication, and skill development.',
            steps: [
              'Designate morning focus blocks for deep, high-concentration work.',
              'Designate afternoon slots for meetings and email triage.',
              'Include scheduled time for continuous learning and portfolio development.'
            ],
            deliverable: 'A structured 5-day time-blocked calendar template.'
          },
          keyTakeaways: [
            'Proactively report blockers early rather than apologizing after missed deadlines.',
            'Always state time-zone acronyms (WAT, EST, GMT) when scheduling international meetings.',
            'Time-boxing protects focus and ensures consistent project delivery.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_3_3_1',
              questionText: 'If you encounter an unexpected technical blocker that might jeopardize a 5:00 PM project deadline, what is the best remote work practice?',
              options: [
                'Say nothing and hope the manager forgets about the project',
                'Immediately notify your manager or team early in the day, explain what you have attempted, and specify what support is needed',
                'Turn off your phone and disconnect from Slack until the next morning',
                'Blame your internet service provider without providing any work update'
              ],
              correctAnswer: 1,
              explanation: 'Proactive early communication allows teams to reallocate resources or adjust timelines before deadlines are missed.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_car_4',
      courseId: 'course_career_readiness',
      sequence: 4,
      sequenceLabel: 'Module 4',
      title: 'Digital Freelancing, Upwork, and Career Growth',
      description: 'Package your skills into profitable freelance services, win international clients on Upwork, avoid payment fraud, and map out a multi-year career development roadmap.',
      learningObjectiveIds: ['CAR-FRL-04'],
      lessons: [
        {
          lessonId: 'lesson_car_4_1',
          moduleId: 'mod_car_4',
          courseId: 'course_career_readiness',
          title: 'Introduction to Freelancing and Packaging Marketable Services',
          sequence: 1,
          sequenceLabel: 'Lesson 4.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['CAR-FRL-04'],
          introduction: 'Freelancing empowers corps members to earn income in foreign currency (USD, GBP) by selling specialized skills directly to global clients. Learn how to package your knowledge into clearly defined service offerings.',
          lessonContent: [
            'The Freelancer Mindset: As a freelancer, you are not an employee; you are an independent service business. Clients do not pay for your time; they pay for outcomes, convenience, and problem resolution.',
            'Identifying Marketable Digital Services: You do not need to be a senior software engineer to freelance. High-demand entry-level and intermediate services include: Executive Virtual Assistance, LinkedIn Lead Generation, Social Media Content Scheduling, Data Entry & Cleaning, Customer Support, and Canva Graphic Creation.',
            'Productized Services: Avoid vague offerings like "I will do anything." Instead, create tightly scoped packages: "I will clean, deduplicate, and format 1,000 spreadsheet records in 24 hours for $50" or "I will research and schedule 20 LinkedIn posts with graphics for $150."',
            'Pricing Strategies: Hourly vs. Fixed-Price contracts. For beginners, fixed-price milestone contracts provide security and clarity. Ensure milestones are clearly documented before starting work.'
          ],
          nigerianContextExamples: [
            'An NYSC corps member offering spreadsheet automation services to small logistics operators on Upwork and earning $400/month in addition to their government allowance.',
            'Packaging Nigerian university academic proofreading and formatting as a paid remote service for postgraduate students.'
          ],
          practicalDemonstration: 'Review an Upwork service catalog page showing how top-rated freelancers structure their tiered packages: Starter, Standard, and Premium.',
          handsOnExercise: {
            title: 'Package Your First Digital Freelance Service Offering',
            task: 'Define a single, specific digital service you can deliver within 48 hours for a paying client.',
            steps: [
              'Service Title (e.g. "Virtual Assistant: Email Triage and Calendar Scheduling").',
              'Target Client (e.g. Busy real estate brokers or boutique e-commerce owners).',
              'Exact Deliverables (What will the client receive?).',
              'Estimated Turnaround Time and Initial Fixed-Price Quote in USD.'
            ],
            deliverable: 'A 1-page freelance service specification sheet.'
          },
          keyTakeaways: [
            'Freelancing treats your specialized skills as an independent service business.',
            'Tightly scoped, productized services convert far better than generic "hire me for anything" listings.',
            'Fixed-price milestone contracts protect both client and freelancer.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_4_1_1',
              questionText: 'Which service title is most likely to win clients on a freelance marketplace?',
              options: [
                '"I can do anything you want for cheap money"',
                '"Google Sheets Data Cleaning & Duplicate Removal: 1,000 Rows Formatted in 24 Hours"',
                '"Hardworking Nigerian boy available for all tasks"',
                '"Assistant for hire"'
              ],
              correctAnswer: 1,
              explanation: 'Clients search for specific, outcome-oriented solutions with clear scope, deliverables, and turnaround times.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_4_2',
          moduleId: 'mod_car_4',
          courseId: 'course_career_readiness',
          title: 'Mastering Upwork: Profiles, Winning Proposals, and Payment Safety',
          sequence: 2,
          sequenceLabel: 'Lesson 4.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['CAR-FRL-04'],
          introduction: 'Learn the exact anatomy of a winning Upwork proposal, how to optimize your profile for marketplace algorithms, and how to protect yourself against client scams and platform bans.',
          lessonContent: [
            'The 2-Line Proposal Hook: When a client posts a job on Upwork, they only see the first two lines of your proposal in their preview inbox. Never start with "Dear Sir/Madam, My name is... and I graduated from..." Start directly with the client\'s problem: "Hi [Client Name], I noticed your Google Sheets data has inconsistent phone numbers with missing country codes. I can clean and standardize all 1,500 rows today using a custom REGEX formula."',
            'The Winning Proposal Framework: 1. The Hook (demonstrate you read their job description); 2. Your Proposed Solution (explain your methodology); 3. Relevant Proof (link to 1 portfolio sample); 4. A Low-Friction Question (e.g. "Do you prefer the final numbers exported in XLSX or Google Sheets format?"); 5. Professional sign-off.',
            'Upwork Terms of Service & Safety: NEVER take communication or payment off Upwork before an official contract is funded in escrow. Scammers will ask to chat on Telegram or WhatsApp and offer fake checks or cryptocurrency. Violating this rule will result in a permanent account ban.',
            'Payment Verification & Escrow: Only begin working when the client\'s payment method is verified and the contract milestone is fully funded in Upwork Escrow.'
          ],
          nigerianContextExamples: [
            'Winning an initial $50 Upwork project by including a 60-second Loom screen recording walking through how you would solve the client\'s exact spreadsheet formatting challenge.',
            'Identifying and reporting an Upwork scammer asking to conduct an interview on Telegram.'
          ],
          practicalDemonstration: 'Review an actual winning Upwork proposal that secured a long-term $25/hour client against 40 competing bidders.',
          handsOnExercise: {
            title: 'Draft a Tailored Upwork Proposal for a Real Job Posting',
            task: 'Find an active entry-level administrative or data entry job on Upwork and write a tailored 150-word proposal.',
            steps: [
              'Read the job post and identify the client\'s core pain point.',
              'Write a compelling 2-sentence hook addressing that pain point directly.',
              'Explain your solution and reference one portfolio sample.',
              'End with an engaging clarifying question.'
            ],
            deliverable: 'Your tailored 150-word Upwork proposal script.'
          },
          keyTakeaways: [
            'The first two lines of your proposal determine whether a client opens your bid or skips it.',
            'Never communicate on Telegram or accept payments outside platform escrow.',
            'Ask intelligent clarifying questions to transition from an applicant to a consultant.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_4_2_1',
              questionText: 'Why is it strictly prohibited to move communication from Upwork to Telegram before a contract is funded?',
              options: [
                'Because Telegram uses too much internet bandwidth',
                'Because it violates platform terms of service, exposes you to payment fraud, and results in permanent account suspension',
                'Because Telegram messages can only be typed in French',
                'Because clients prefer email'
              ],
              correctAnswer: 1,
              explanation: 'Off-platform communication is a primary vehicle for fraudulent non-payment scams and results in immediate permanent bans from freelance platforms.'
            }
          ]
        },
        {
          lessonId: 'lesson_car_4_3',
          moduleId: 'mod_car_4',
          courseId: 'course_career_readiness',
          title: 'Building a Post-NYSC Career Development Roadmap',
          sequence: 3,
          sequenceLabel: 'Lesson 4.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['CAR-FRL-04'],
          introduction: 'Your NYSC service year is a pivotal runway. Transition from reactive job hunting to strategic career engineering with a concrete 12-month post-service roadmap.',
          lessonContent: [
            'Conducting a Personal Skills Audit: Assess your technical hard skills (data analysis, software, writing), transferable soft skills (leadership, communication, problem-solving), and identifying high-leverage skill gaps.',
            'The T-Shaped Professional Model: Possess broad competence across foundational digital literacy (Google Workspace, basic AI prompting, professional writing) combined with deep, specialized expertise in one high-value vertical (e.g. Spreadsheet Financial Modeling or Technical Copywriting).',
            'Continuous Learning System: Dedicate 5 hours per week to structured online learning (Coursera, YouTube Masterclasses, Google Certifications). Build public evidence of learning by sharing takeaways on LinkedIn.',
            'Financial Runway & Transition Planning: Use your NYSC monthly allowance (allowee) and freelance earnings to build a 3-month living expense cushion. This prevents panic-accepting exploitative low-paying jobs immediately after passing out.'
          ],
          nigerianContextExamples: [
            'A corps member in Kaduna using their monthly state allowance to finance a Google Data Analytics professional certificate course and emerging with a remote role upon POP.',
            'Building a supportive accountability peer group with 3 platoon members to review CVs and practice mock interviews weekly.'
          ],
          practicalDemonstration: 'Demonstrate a 12-Month Career Roadmap template in Google Sheets broken down into quarters: Q1: Skill Acquisition, Q2: Portfolio Building, Q3: Active Pitching & Freelance Contracts, Q4: Full-Time Placement.' ,
          handsOnExercise: {
            title: 'Construct Your 12-Month Post-NYSC Career Roadmap',
            task: 'Design your personal 12-month career development plan detailing quarterly targets.',
            steps: [
              'Q1 Target: Core digital skill to master and certifications to acquire.',
              'Q2 Target: 3 portfolio case studies to build and publish.',
              'Q3 Target: Volume of freelance proposals and full-time applications per week.',
              'Q4 Target: Career milestone (e.g. First remote retainer contract or enterprise job offer).'
            ],
            deliverable: 'Your personal 1-page 12-Month Career Roadmap.'
          },
          keyTakeaways: [
            'Develop a T-shaped profile: broad foundational digital skills with deep specialization in one domain.',
            'Commit to 5 hours of continuous weekly professional development.',
            'Construct a structured post-service roadmap to eliminate transition anxiety.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_car_4_3_1',
              questionText: 'What is a "T-Shaped Professional" in the digital career marketplace?',
              options: [
                'Someone who only works on Tuesdays and Thursdays',
                'A professional with broad foundational competence across diverse digital tools combined with deep specialized expertise in one specific vertical',
                'Someone who has worked for 20 different companies in one year',
                'A person who only applies for jobs in the transportation sector'
              ],
              correctAnswer: 1,
              explanation: 'The T-shaped concept denotes broad collaborative literacy across multiple disciplines (the horizontal bar) with deep domain mastery in one discipline (the vertical stem).'
            }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Complete Professional Career Launch Package',
    overview: 'Build an industry-grade career launch kit containing a single-column ATS resume, an optimized LinkedIn profile, a digital portfolio case study, and a tailored job application proposal.',
    instructions: [
      'Step 1: Format a 1-page ATS-compliant resume with Google XYZ achievement bullet points from your academic, volunteer, or NYSC service experience.',
      'Step 2: Optimize your LinkedIn Headline and 3-paragraph About summary using high-demand industry keywords.',
      'Step 3: Create a digital portfolio case study (in Notion, Google Drive, or Canva) documenting an authentic project deliverable.',
      'Step 4: Find an authentic entry-level job opening or freelance gig and draft a tailored 150-word proposal letter.',
      'Step 5: Assemble all assets into a unified submission link.'
    ],
    assessmentCriteria: [
      'ATS Compliance: Is the resume single-column with clean typography, no parsing-breaking tables/graphics, and XYZ impact bullets? (25%)',
      'LinkedIn Positioning: Are the headline and summary keyword-rich, clear, and focused on value delivery? (25%)',
      'Portfolio Proof of Work: Does the case study document the problem, process, tools used, and tangible outcome? (25%)',
      'Proposal Persuasiveness: Does the cover letter/proposal demonstrate clear understanding of the employer\'s pain point? (25%)'
    ],
    submissionGuidelines: 'Submit your project title, a 300-word overview, and public shareable links to your ATS resume (Google Doc/PDF), your LinkedIn profile URL, and your digital portfolio link.'
  },
  finalAssessment: [
    {
      id: 'fa_car_01',
      questionText: 'Why do automated Applicant Tracking Systems (ATS) reject multi-column resumes with visual graphics and skill bars?',
      options: [
        'They only read printed paper resumes',
        'Text parsers read across columns linearly, scrambling sentences and failing to extract text trapped in graphic elements',
        'Graphical resumes consume too much cloud database storage',
        'Hiring managers are legally prohibited from viewing colorful designs'
      ],
      correctAnswer: 1,
      explanation: 'Linear ATS parsers fail when reading complex multi-column layouts, graphics, and tables, causing parsing errors and automatic rejections.',
      relatedLessonId: 'lesson_car_2_1'
    },
    {
      id: 'fa_car_02',
      questionText: 'In the Google XYZ resume bullet formula, what does the "Y" represent?',
      options: [
        'Your yearly salary expectation',
        'The quantitative metric or measurement of your accomplishment',
        'Your university graduation year',
        'The name of your NYSC platoon'
      ],
      correctAnswer: 1,
      explanation: 'Y represents the quantitative metric measuring your impact (e.g. "by 28%", "saving 12 hours weekly").',
      relatedLessonId: 'lesson_car_2_1'
    },
    {
      id: 'fa_car_03',
      questionText: 'What is the primary benefit of Asynchronous Communication in a distributed remote team?',
      options: [
        'It forces everyone to stay on video calls all night',
        'Team members can collaborate across different time zones by communicating thoughtfully in writing without needing to be online at the same second',
        'It eliminates the need for internet access',
        'It prevents employees from asking questions'
      ],
      correctAnswer: 1,
      explanation: 'Asynchronous communication enables efficient collaboration across different global time zones without constant live meetings.',
      relatedLessonId: 'lesson_car_1_1'
    },
    {
      id: 'fa_car_04',
      questionText: 'Which LinkedIn headline is most effective for an aspiring remote administrative assistant?',
      options: [
        '"Looking for any job opening"',
        '"Virtual Assistant | Google Workspace, Notion, Trello | Streamlining Executive Operations for Fast-Growing Teams"',
        '"B.Sc Graduate NYSC 2026"',
        '"Please connect with me I am ready to work"'
      ],
      correctAnswer: 1,
      explanation: 'It highlights the target job title, core software tools, and tangible business value with searchable keywords.',
      relatedLessonId: 'lesson_car_1_2'
    },
    {
      id: 'fa_car_05',
      questionText: 'What are the 4 core components of the STAR behavioral interview framework?',
      options: [
        'Start, Think, Ask, Review',
        'Situation, Task, Action, Result',
        'Salary, Title, Agreement, Reference',
        'School, Testing, Attendance, Ranking'
      ],
      correctAnswer: 1,
      explanation: 'STAR stands for Situation, Task, Action, and Result.',
      relatedLessonId: 'lesson_car_3_1'
    },
    {
      id: 'fa_car_06',
      questionText: 'When an Upwork client invites you to chat on Telegram before a contract is funded, what should you do?',
      options: [
        'Immediately move to Telegram and share your phone number',
        'Decline and report the client: platform rules strictly forbid off-platform communication before a funded contract to protect against fraud',
        'Ask the client for money via bank transfer',
        'Delete your Upwork profile'
      ],
      correctAnswer: 1,
      explanation: 'Off-platform communication prior to contract funding violates platform terms and is an immediate indicator of a scam.',
      relatedLessonId: 'lesson_car_4_2'
    },
    {
      id: 'fa_car_07',
      questionText: 'Why is a digital portfolio often more influential than a university degree certificate when applying for remote digital roles?',
      options: [
        'Certificates are illegal to share online',
        'Portfolios provide undeniable proof of work showing actual deliverables, tools mastered, and problem-solving methodology',
        'Portfolios are always shorter than degrees',
        'Degree certificates do not contain photos'
      ],
      correctAnswer: 1,
      explanation: 'Portfolios demonstrate tangible competence and proof of work, proving you can execute the actual tasks required.',
      relatedLessonId: 'lesson_car_1_3'
    },
    {
      id: 'fa_car_08',
      questionText: 'What are the most critical lines in an Upwork job proposal?',
      options: [
        'The last sentence of the proposal',
        'The first two lines, because they are the only lines the client sees in their preview inbox before deciding to open or discard your bid',
        'The signature at the bottom',
        'The list of references'
      ],
      correctAnswer: 1,
      explanation: 'The initial two preview lines determine whether a client clicks to read your full proposal or skips to another applicant.',
      relatedLessonId: 'lesson_car_4_2'
    },
    {
      id: 'fa_car_09',
      questionText: 'If you encounter an unexpected technical blocker that might jeopardize a 5:00 PM project deadline, what is the best remote work practice?',
      options: [
        'Say nothing and hope the manager forgets',
        'Immediately inform your team early in the day, explain what you have attempted, and specify what assistance you need',
        'Turn off your laptop and pretend your internet crashed',
        'Wait until 6:00 PM and apologize'
      ],
      correctAnswer: 1,
      explanation: 'Proactive early communication gives teams time to resolve roadblocks or adjust expectations without missed deadlines.',
      relatedLessonId: 'lesson_car_3_3'
    },
    {
      id: 'fa_car_10',
      questionText: 'What is a major warning sign that an online job vacancy is a recruitment scam?',
      options: [
        'The employer has a verified company domain email and website',
        'The recruiter demands an upfront fee for "interview registration, uniform, or testing materials"',
        'The interview is scheduled via Google Calendar',
        'The job ad lists specific technical software requirements'
      ],
      correctAnswer: 1,
      explanation: 'Demands for upfront money under any pretext are the universal hallmark of recruitment fraud.',
      relatedLessonId: 'lesson_car_2_2'
    },
    {
      id: 'fa_car_11',
      questionText: 'What is the "T-Shaped Professional" concept in modern digital careers?',
      options: [
        'Someone who wears a T-shirt to interviews',
        'A professional with broad literacy across foundational digital tools combined with deep expertise in one high-value domain',
        'Someone who only works in technology companies',
        'A worker who switches careers every two months'
      ],
      correctAnswer: 1,
      explanation: 'T-shaped professionals possess broad general digital competence with deep domain specialization in one specific vertical.',
      relatedLessonId: 'lesson_car_4_3'
    },
    {
      id: 'fa_car_12',
      questionText: 'When asked "Do you have any questions for us?" at the end of an interview, what is the best response?',
      options: [
        '"No, I know everything about your company."',
        'Ask thoughtful reverse-interview questions about 90-day performance expectations or major team challenges',
        '"How much money will you pay me tomorrow?"',
        '"Can I leave now?"'
      ],
      correctAnswer: 1,
      explanation: 'Reverse-interviewing shows strategic thinking, proactive interest, and high engagement.',
      relatedLessonId: 'lesson_car_3_1'
    },
    {
      id: 'fa_car_13',
      questionText: 'When using generative AI to draft a cover letter, why is human editing essential?',
      options: [
        'AI models always generate code instead of English',
        'To remove robotic buzzwords, verify factual accuracy, and inject authentic personal voice and local context',
        'Because AI cover letters are rejected by email spam filters',
        'To delete your contact details'
      ],
      correctAnswer: 1,
      explanation: 'Human editing removes generic AI clichés and ensures the letter reflects your authentic personality and verified achievements.',
      relatedLessonId: 'lesson_car_2_3'
    },
    {
      id: 'fa_car_14',
      questionText: 'How should your webcam be positioned during an important remote video interview?',
      options: [
        'Looking down from the ceiling',
        'Positioned at eye level with front-facing diffused light so your face and expressions are clearly visible',
        'Facing your keyboard so the interviewer only sees your hands',
        'On the floor looking up at you'
      ],
      correctAnswer: 1,
      explanation: 'Eye-level positioning with good front lighting simulates direct eye contact and conveys executive presence.',
      relatedLessonId: 'lesson_car_3_2'
    },
    {
      id: 'fa_car_15',
      questionText: 'What is a "Productized Service" in digital freelancing?',
      options: [
        'Shipping physical boxes to clients via postal mail',
        'Packaging a specialized digital skill into a clearly defined offering with fixed scope, deliverables, and turnaround time',
        'Selling used laptop computers online',
        'Working for an hourly wage without any job description'
      ],
      correctAnswer: 1,
      explanation: 'Productized services provide clarity, defined deliverables, and predictable pricing, making them attractive to busy clients.',
      relatedLessonId: 'lesson_car_4_1'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredFinalAssessmentPassScore: 80,
    requireCapstoneSubmission: true
  }
};
