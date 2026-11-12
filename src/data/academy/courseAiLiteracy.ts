import { AcademyCourse } from '../../types';

export const COURSE_AI_LITERACY: AcademyCourse = {
  courseId: 'course_ai_literacy',
  categoryId: 'ai_emerging_tech',
  title: 'AI Literacy and AI Product Building',
  description: 'A practical masterclass in artificial intelligence, generative models, structured prompt engineering, and building no-code AI digital products to solve community, school, and SME challenges.',
  targetAudience: 'Serving NYSC Corps Members, educators at PPAs, digital creators, entrepreneurs, and tech innovators seeking to leverage generative AI.',
  entryRequirements: 'Basic digital device usage (smartphone or laptop) and internet access. No prior coding experience required.',
  expectedDuration: '4 Weeks (Self-Paced • 12 Core Lessons)',
  themeColor: 'emerald',
  iconName: 'BrainCircuit',
  active: true,
  version: '2026.1',
  youtubeUrl: 'https://www.youtube.com/playlist?list=PL_XQ6-mFz_UfM5_X-M3_X_M3_X_M3_X_M',
  youtubeChannelId: 'UC_XQ6-mFz_UfM5_X-M3_X_M',
  learningObjectives: [
    {
      id: 'AI-FND-01',
      code: 'AI-FND-01',
      title: 'AI Foundations & Landscape',
      description: 'Differentiate traditional rule-based software from statistical machine learning and generative artificial intelligence.'
    },
    {
      id: 'AI-GEN-02',
      code: 'AI-GEN-02',
      title: 'Generative AI Mechanisms & Hallucinations',
      description: 'Understand token prediction, multimodal generation, and how to verify AI hallucinations in real-world contexts.'
    },
    {
      id: 'AI-PE-03',
      code: 'AI-PE-03',
      title: 'Structured Prompt Engineering',
      description: 'Master Role-Task-Context-Constraints-Format prompting, few-shot prompting, and system instructions.'
    },
    {
      id: 'AI-PRD-04',
      code: 'AI-PRD-04',
      title: 'Workplace & Educational Productivity with AI',
      description: 'Use Google Gemini, ChatGPT, and NotebookLM for NERDC lesson plans, research synthesis, and administrative workflows.'
    },
    {
      id: 'AI-ETH-05',
      code: 'AI-ETH-05',
      title: 'Responsible AI & NDPR Data Privacy',
      description: 'Safeguard sensitive participant data, avoid prompt injection, navigate copyright, and audit model bias.'
    },
    {
      id: 'AI-BLD-06',
      code: 'AI-BLD-06',
      title: 'AI Product Prototyping & Capstone Building',
      description: 'Conceptualize, prototype, test, and present an AI-augmented solution for community or small business needs.'
    }
  ],
  modules: [
    {
      moduleId: 'mod_ai_1',
      courseId: 'course_ai_literacy',
      sequence: 1,
      sequenceLabel: 'Module 1',
      title: 'Understanding Artificial Intelligence',
      description: 'Grasp the core fundamentals of AI, machine learning, generative models, and their tangible applications across Nigeria and Africa.',
      learningObjectiveIds: ['AI-FND-01', 'AI-GEN-02'],
      lessons: [
        {
          lessonId: 'lesson_ai_1_1',
          moduleId: 'mod_ai_1',
          courseId: 'course_ai_literacy',
          title: 'What Is Artificial Intelligence?',
          sequence: 1,
          sequenceLabel: 'Lesson 1.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['AI-FND-01'],
          introduction: 'Artificial Intelligence (AI) has transitioned from science fiction into an indispensable driver of economic mobility and operational efficiency across Africa. This lesson demystifies what AI is and contrasts it with traditional computer software.',
          lessonContent: [
            'Traditional computer software relies on explicit rules authored by human programmers: "if the user enters X, do Y." For example, a basic calculator or an Excel cell formula executes rigid, pre-defined mathematical logic without adapting or learning from patterns.',
            'Artificial Intelligence, by contrast, describes computational systems capable of performing tasks that historically required human intelligence. These tasks include recognizing patterns in vast datasets, translating languages, diagnosing crop diseases, and generating text.',
            'Rather than programming every single edge case by hand, machine learning engineers expose models to thousands or millions of historical data points. The model learns statistical patterns and generalizes to new, previously unseen inputs.',
            'In Nigeria and across Africa, AI is already solving critical structural challenges: fintech companies use automated fraud detection algorithms, telemedicine startups leverage computer vision to scan diagnostic images, and agricultural apps evaluate cassava leaf health via mobile camera feeds.'
          ],
          nigerianContextExamples: [
            'Nigerian Fintechs (Paystack, Moniepoint) analyze transaction patterns in milliseconds to block fraudulent card-draining attempts.',
            'Corps members teaching in rural secondary schools use offline AI models to generate interactive physics experiments without expensive laboratory equipment.',
            'Healthcare initiatives in northern Nigeria deploy AI speech recognition to translate healthcare notices into Hausa, Yoruba, and Igbo.'
          ],
          practicalDemonstration: 'Open Google Search on your smartphone and search for a term with a deliberate spelling error. Notice how Google instantly suggests "Did you mean...". This is machine learning predicting user intent based on billions of aggregate historical search queries.',
          handsOnExercise: {
            title: 'Identify 3 AI Touchpoints in Your Daily Routine',
            task: 'Conduct a personal technology audit of your smartphone and write down three services you interact with daily that employ artificial intelligence.',
            steps: [
              'Examine your keyboard autocomplete or predictive text suggestions.',
              'Review how your social media feed (Instagram, TikTok, YouTube) ranks and recommends video content.',
              'Check your mobile banking app for facial recognition biometric login or fraud alerts.'
            ],
            deliverable: 'A 1-paragraph summary explaining whether each touchpoint is rule-based or machine-learning-driven.'
          },
          keyTakeaways: [
            'AI enables software to learn statistical patterns from data rather than relying solely on hardcoded logic.',
            'Machine learning is the primary subset of AI powering modern predictive tools.',
            'AI is practical and already embedded in everyday Nigerian digital platforms.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_1_1_1',
              questionText: 'What is the primary difference between traditional software and Artificial Intelligence?',
              options: [
                'Traditional software requires an active internet connection, while AI never does',
                'Traditional software follows explicit hardcoded rules, whereas AI learns patterns from data',
                'AI only operates on desktop computers and cannot run on mobile phones',
                'Traditional software was invented in Nigeria, while AI was not'
              ],
              correctAnswer: 1,
              explanation: 'Traditional software executes deterministic human-written rules, while AI models discover and generalize statistical patterns from data.'
            },
            {
              id: 'kc_ai_1_1_2',
              questionText: 'Which of the following is an authentic example of AI in Nigeria today?',
              options: [
                'Writing a receipt by hand on carbon paper in a market shop',
                'Fintech fraud detection analyzing live banking card transactions for anomalies',
                'Sending an SMS message without using mobile data',
                'Charging a phone battery using an electrical power generator'
              ],
              correctAnswer: 1,
              explanation: 'Automated fraud detection in fintech platforms uses machine learning to detect unusual transaction behaviors in real time.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_1_2',
          moduleId: 'mod_ai_1',
          courseId: 'course_ai_literacy',
          title: 'Types of Artificial Intelligence and Emerging Technologies',
          sequence: 2,
          sequenceLabel: 'Lesson 1.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['AI-FND-01'],
          introduction: 'To navigate the digital economy, corps members must understand the key subfields of AI: Machine Learning, Natural Language Processing, Computer Vision, and Robotics.',
          lessonContent: [
            'Machine Learning (ML) is the foundation of modern AI. Within ML, algorithms are categorized into Supervised Learning (trained on labeled data, e.g. house prices and square meters), Unsupervised Learning (finding hidden clusters without labels), and Reinforcement Learning (learning through reward signals).',
            'Natural Language Processing (NLP) is the subfield focused on enabling machines to understand, interpret, and generate human spoken and written languages. NLP powers translation tools, sentiment analysis, and conversational chatbots.',
            'Computer Vision (CV) enables computers to derive meaningful information from digital images, videos, and visual inputs. CV enables facial recognition on mobile phones, autonomous vehicle navigation, and satellite monitoring of agricultural land.',
            'Generative AI is a revolutionary branch of deep learning models trained on broad internet-scale data capable of creating novel text, images, code, audio, and synthetic video from natural language prompts.'
          ],
          nigerianContextExamples: [
            'Computer Vision apps used by Nigerian cassava and tomato farmers to identify pest infestations from a quick smartphone camera snapshot.',
            'NLP tools translating official NYSC orientation camp directives into regional languages to ensure universal comprehension.',
            'Logistics delivery apps in Lagos using route-optimization machine learning algorithms to avoid traffic bottlenecks on third mainland bridge.'
          ],
          practicalDemonstration: 'Open Google Translate. Select camera mode and hold it over printed English text to watch it overlay the translated text in real time. This merges Computer Vision (OCR text recognition) with Natural Language Processing (machine translation).',
          handsOnExercise: {
            title: 'Map Community Problems to AI Subfields',
            task: 'Take three problems affecting your NYSC Host Community (PPA or LGA) and specify which AI subfield (NLP, Computer Vision, or Predictive ML) could help address them.',
            steps: [
              'Problem A: Sorting and digitizing handwritten student attendance records.',
              'Problem B: Translating health safety flyers into local dialects for market traders.',
              'Problem C: Forecasting local clinic pharmaceutical stockouts based on seasonal malaria trends.'
            ],
            deliverable: 'A short 3-line mapping detailing the appropriate AI subfield for each scenario.'
          },
          keyTakeaways: [
            'AI encompasses Machine Learning, NLP, Computer Vision, and Generative AI.',
            'Computer Vision processes visual imagery; NLP processes human language; ML discovers data patterns.',
            'Choosing the correct AI tool requires understanding which subfield fits your specific operational challenge.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_1_2_1',
              questionText: 'Which subfield of AI allows an app to detect crop diseases from a photo taken on a smartphone?',
              options: [
                'Natural Language Processing (NLP)',
                'Computer Vision (CV)',
                'Robotic Process Automation (RPA)',
                'Speech Synthesis'
              ],
              correctAnswer: 1,
              explanation: 'Computer Vision allows software to analyze visual data, such as photos of plant leaves, to identify patterns indicative of diseases.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_1_3',
          moduleId: 'mod_ai_1',
          courseId: 'course_ai_literacy',
          title: 'Understanding Generative AI and Large Language Models',
          sequence: 3,
          sequenceLabel: 'Lesson 1.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['AI-GEN-02'],
          introduction: 'Generative AI represents a paradigm shift from analytical software that only classifies data to generative software that produces original text, code, imagery, and audio.',
          lessonContent: [
            'At their core, Large Language Models (LLMs) like Google Gemini, Claude, and GPT-4 do not "think" or experience emotions like humans. Instead, they are high-dimensional statistical prediction engines.',
            'During training on trillions of words from books, articles, code repositories, and web pages, the model calculates the probability of what token (word or sub-word piece) is most likely to follow a given sequence of words.',
            'Because LLMs generate text based on statistical likelihood rather than a verified database of absolute truth, they can occasionally produce "hallucinations"—convincing, authoritative-sounding statements, citations, or statistics that are completely fabricated.',
            'Understanding this mechanism is essential for responsible usage: an AI assistant is an exceptionally knowledgeable drafting partner, but it must never be treated as an unquestioned source of factual truth without human fact-checking.'
          ],
          nigerianContextExamples: [
            'A corps member drafting an official application to the State Coordinator must verify any cited NYSC bye-laws, as the AI might invent non-existent section numbers.',
            'A teacher using AI to generate multiple-choice biology questions should review every answer key before printing tests for secondary school students.'
          ],
          practicalDemonstration: 'Ask a generative AI model: "Give me the biography of the first Nigerian astronaut to walk on Mars." Notice how the AI, if unconstrained, may creatively generate a detailed fictional narrative because its training prioritizes coherent continuation over factual restraint.',
          handsOnExercise: {
            title: 'Spot and Mitigate an AI Hallucination',
            task: 'Test an AI model with a niche local factual query and verify its answer against an official source.',
            steps: [
              'Ask Gemini: "What was the date and platoon winner of the NYSC Lagos Orientation Camp drama competition in 2021?"',
              'Observe the response and look for citations or verifiable facts.',
              'Search official NYSC archives or news reports to confirm if the cited winners actually exist.'
            ],
            deliverable: 'A brief note explaining what the AI got right and any factual inaccuracies detected.'
          },
          keyTakeaways: [
            'LLMs predict the most statistically probable next token based on training data.',
            'Hallucinations occur because models prioritize plausibility and coherence over grounded factuality.',
            'Always verify critical data, laws, phone numbers, and statistics generated by AI models.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_1_3_1',
              questionText: 'What is an "AI hallucination" when working with Large Language Models?',
              options: [
                'When the computer screen flickers during a prompt',
                'When the model confidently generates convincing-sounding information that is factually false or non-existent',
                'When the AI runs out of tokens and stops responding',
                'When a user inputs a prompt containing grammatical errors'
              ],
              correctAnswer: 1,
              explanation: 'Hallucination refers to generative AI fabricating facts, citations, or details that sound plausible but have no basis in reality.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_ai_2',
      courseId: 'course_ai_literacy',
      sequence: 2,
      sequenceLabel: 'Module 2',
      title: 'Prompt Engineering and AI Tools',
      description: 'Master the art and science of communicating effectively with AI models using proven frameworks, few-shot prompting, and tool selection.',
      learningObjectiveIds: ['AI-PE-03'],
      lessons: [
        {
          lessonId: 'lesson_ai_2_1',
          moduleId: 'mod_ai_2',
          courseId: 'course_ai_literacy',
          title: 'Introduction to Prompt Engineering',
          sequence: 1,
          sequenceLabel: 'Lesson 2.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['AI-PE-03'],
          introduction: 'Prompt engineering is the practice of designing, refining, and optimizing natural language inputs to guide generative AI models toward producing high-quality, relevant outputs.',
          lessonContent: [
            'A prompt is the natural language input—text, question, instruction, or code—that you submit to an AI system. The quality of the prompt directly dictates the quality of the output: "Garbage In, Garbage Out."',
            'Weak prompts are typically vague, open-ended, and lack context. For example, typing "Write a business plan" produces a generic, unhelpful 500-word template full of corporate clichés.',
            'An effective prompt provides clear boundaries, specifies the persona, provides background details, states the explicit deliverable, and constrains the output tone and length.',
            'By learning prompt engineering, corps members can transform a 10-minute brainstorming session into recruiter-ready CVs, lesson plans, or business financial projections in seconds.'
          ],
          nigerianContextExamples: [
            'Weak prompt: "Help me write a letter to my principal."',
            'Effective prompt: "Act as an experienced NYSC corps member deployed to a community secondary school in Oyo State. Draft a polite, formal letter to the school principal requesting permission to organize a free after-school digital skills workshop for SS2 students every Wednesday from 3:00 PM to 4:30 PM. Keep it under 250 words and use formal Nigerian civil service tone."'
          ],
          practicalDemonstration: 'Compare the outputs of: 1. "Explain inflation." versus 2. "Explain inflation to a market trader in Onitsha who sells imported fabrics using Naira and Dollar currency exchange examples. Use simple bullet points."',
          handsOnExercise: {
            title: 'Transform a Weak Prompt into an Elite Prompt',
            task: 'Take a single-sentence prompt and rewrite it using contextual anchors.',
            steps: [
              'Start with: "Make a lesson note on photosynthesis."',
              'Add the Grade Level (e.g. JSS3 or SS1 Nigerian NERDC curriculum).',
              'Add Local Analogies (e.g. comparing chloroplasts to solar panels used in Nigerian villages).',
              'Specify Duration (40-minute classroom period) and Output Format (Table with Teacher and Student activities).'
            ],
            deliverable: 'Submit your before-and-after prompt comparison.'
          },
          keyTakeaways: [
            'Prompt engineering turns ambiguous AI responses into high-precision, production-grade outputs.',
            'Always provide context, persona, specific requirements, and output formatting instructions.',
            'Iterative refinement—asking the model to adjust specific sections—is standard practice.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_2_1_1',
              questionText: 'Why does the prompt "Write a letter to my boss" usually produce a mediocre response?',
              options: [
                'AI models cannot write letters',
                'It lacks context, role definition, specific objective, tone, and constraints',
                'The prompt is written in English instead of code',
                'You must always pay a fee before an AI can write professional correspondence'
              ],
              correctAnswer: 1,
              explanation: 'Without context, the model must guess your role, recipient, intent, and tone, resulting in generic outputs.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_2_2',
          moduleId: 'mod_ai_2',
          courseId: 'course_ai_literacy',
          title: 'The Structure of an Effective Prompt',
          sequence: 2,
          sequenceLabel: 'Lesson 2.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['AI-PE-03'],
          introduction: 'Master the industry-standard RTCIF prompting framework: Role, Task, Context, Instructions, and Format.',
          lessonContent: [
            '1. Role (Persona): Who should the AI pretend to be? E.g., "Act as a senior curriculum specialist for secondary education in Nigeria" or "Act as an experienced commercial copywriter."',
            '2. Task: What specific action should the model perform? E.g., "Write a comprehensive marketing campaign proposal" or "Audit this code snippet for security vulnerabilities."',
            '3. Context: What background facts, audience details, or constraints exist? E.g., "Our target market is young university graduates in Ibadan with limited disposable income."',
            '4. Instructions & Constraints: What rules must the model follow? What must it avoid? E.g., "Do not use jargon. Keep sentences under 20 words. Highlight key takeaways in bold."',
            '5. Format: How should the result be structured? E.g., "Output as a 3-column Markdown table with Columns: Step, Tool, Estimated Cost in NGN."',
            'Few-Shot Prompting: Providing 2 to 3 sample input-output pairs inside your prompt drastically reduces formatting errors and aligns the AI with your exact desired style.'
          ],
          nigerianContextExamples: [
            'Using few-shot prompting to convert informal WhatsApp customer messages into standardized order records for an online clothing vendor in Abuja.'
          ],
          practicalDemonstration: 'Enter a prompt formatted with distinct XML tags: <role>Accountant</role><context>Lagos SME</context><task>Calculate monthly PAYE withholding</task>. Notice how structured labeling improves parsing accuracy.',
          handsOnExercise: {
            title: 'Draft a Complete RTCIF Prompt for Your PPA',
            task: 'Write a full RTCIF prompt addressing an urgent administrative, teaching, or business task at your current deployment station.',
            steps: [
              'Write your [Role] definition.',
              'State the primary [Task].',
              'Provide 2-3 sentences of [Context].',
              'Specify 3 explicit [Instructions/Constraints].',
              'Define the [Format] (e.g. Bulleted checklist or email draft).'
            ],
            deliverable: 'Your complete RTCIF prompt block.'
          },
          keyTakeaways: [
            'The RTCIF framework eliminates ambiguity and generates actionable outputs.',
            'Constraints are as important as instructions: tell the AI what NOT to do.',
            'Few-shot prompting provides concrete examples that ground the model.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_2_2_1',
              questionText: 'In the RTCIF prompt framework, what does "Few-Shot Prompting" achieve?',
              options: [
                'It forces the model to reply in less than five seconds',
                'It provides 2-3 concrete examples of desired input/output pairs to guide the model',
                'It limits your prompt to only five words',
                'It shuts down the model after five questions'
              ],
              correctAnswer: 1,
              explanation: 'Few-shot prompting includes representative examples within the prompt to demonstrate the required structure, tone, and reasoning.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_2_3',
          moduleId: 'mod_ai_2',
          courseId: 'course_ai_literacy',
          title: 'Practical AI Tools: Gemini, ChatGPT, and NotebookLM',
          sequence: 3,
          sequenceLabel: 'Lesson 2.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['AI-PE-03', 'AI-PRD-04'],
          introduction: 'Explore the strengths and optimal use cases for accessible generative AI tools: Google Gemini, OpenAI ChatGPT, and Google NotebookLM.',
          lessonContent: [
            'Google Gemini: Deeply integrated with the Google ecosystem (Workspace, Docs, YouTube, Maps). Gemini excels at real-time web grounding, multimodal processing (reading uploaded photos, audio files, and spreadsheets), and large context windows capable of digesting entire textbooks in a single prompt.',
            'OpenAI ChatGPT: Widely adopted for coding assistance, conversational roleplay, and creative writing. Features custom GPTs and advanced data analysis for running Python code on uploaded spreadsheets.',
            'Google NotebookLM: A game-changing personalized AI research assistant grounded strictly in your uploaded source documents (PDFs, Google Docs, lecture notes). Unlike general chatbots that search the open web, NotebookLM only cites facts directly from your sources, virtually eliminating hallucinations.',
            'Selecting the Right Tool: Use NotebookLM for studying official NYSC handbooks or school curriculums. Use Gemini for multimodal analysis and Google Docs drafting. Use ChatGPT for code generation and creative copywriting.'
          ],
          nigerianContextExamples: [
            'Uploading the entire NYSC Bye-Laws PDF into Google NotebookLM to ask instant, cited questions about relocation protocols and SAED requirements.',
            'Using Google Gemini on mobile to snap a picture of a handwritten chemistry blackboard note and instantly convert it into editable digital text.'
          ],
          practicalDemonstration: 'Open notebooklm.google.com, create a new notebook, upload a 5-page public government report, and click "Generate Audio Overview" or ask a specific question. Observe how every statement includes a clickable citation to the exact source page.',
          handsOnExercise: {
            title: 'Set Up Your PPA Research Notebook in NotebookLM',
            task: 'Upload 2 PDF documents (e.g. teaching syllabus or project guideline) into NotebookLM and generate a study guide.',
            steps: [
              'Download an official curriculum or public policy PDF.',
              'Upload it into Google NotebookLM as a source.',
              'Ask: "Summarize the 5 most critical responsibilities described in this document for entry-level staff."',
              'Verify that the response includes source citations.'
            ],
            deliverable: 'A screenshot or exported summary of your grounded notebook query.'
          },
          keyTakeaways: [
            'Different AI tools specialize in distinct workflows: general chat vs. grounded document research vs. code execution.',
            'NotebookLM grounds responses exclusively in your uploaded source files, dramatically reducing hallucinations.',
            'Modern models accept multimodal inputs: text, photos, PDFs, and audio.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_2_3_1',
              questionText: 'Which tool is built specifically by Google to organize research notes, upload PDFs, and ground AI responses strictly in your uploaded sources?',
              options: [
                'Google Sheets',
                'NotebookLM',
                'Android Auto',
                'Google Play Store'
              ],
              correctAnswer: 1,
              explanation: 'NotebookLM is designed as a source-grounded research assistant that answers questions exclusively from your uploaded documents.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_ai_3',
      courseId: 'course_ai_literacy',
      sequence: 3,
      sequenceLabel: 'Module 3',
      title: 'AI for Work, Learning and Productivity',
      description: 'Apply AI tools to automate teaching materials, summarize voluminous reports, draft persuasive communications, and boost daily efficiency.',
      learningObjectiveIds: ['AI-PRD-04'],
      lessons: [
        {
          lessonId: 'lesson_ai_3_1',
          moduleId: 'mod_ai_3',
          courseId: 'course_ai_literacy',
          title: 'AI for Research, Fact-Checking and Learning',
          sequence: 1,
          sequenceLabel: 'Lesson 3.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['AI-PRD-04'],
          introduction: 'Learn how to accelerate your professional research, master complex topics quickly, and systematically fact-check AI-generated information.',
          lessonContent: [
            'AI tools can summarize 100-page policy briefs, extract key themes from research papers, and translate academic jargon into clear, plain English.',
            'Concept Simplification (The Feynman Technique): Instruct the AI: "Explain the concept of fractional reserve banking as if I am a 12-year-old student in a Nigerian secondary school, using cocoa farming and market savings cooperatives as analogies."',
            'Structured Fact-Checking: Never trust statistical figures, legal citations, or medical claims without secondary verification. Use search-grounded queries in Gemini or cross-reference claims against trusted databases like the National Bureau of Statistics (NBS) or Central Bank of Nigeria (CBN).',
            'Socratic Tutoring: Instead of asking the AI for direct answers to assignments, instruct it to act as a Socratic tutor: "Ask me one guiding question at a time to help me derive the solution myself."'
          ],
          nigerianContextExamples: [
            'Summarizing the National Digital Economy Policy and Strategy (NDEPS) document to extract practical entrepreneurship grants for youth corps members.',
            'Creating bilingual study guides for primary school pupils in rural PPAs.'
          ],
          practicalDemonstration: 'Paste a dense 500-word excerpt from an economic article into Gemini and prompt: "Extract: 1. Main thesis. 2. Three supporting data points. 3. Counter-arguments. Format as bullet points."',
          handsOnExercise: {
            title: 'Build a 3-Step Fact-Checking Verification Protocol',
            task: 'Design a personal checklist you will use whenever an AI tool provides statistical or legal information.',
            steps: [
              'Step 1: Check for source attribution and publication year.',
              'Step 2: Perform an independent search on Google or Google Scholar for the exact citation.',
              'Step 3: Verify the figures with a reputable primary source (e.g. World Bank, NBS Nigeria).'
            ],
            deliverable: 'Your written 3-step fact-checking verification checklist.'
          },
          keyTakeaways: [
            'Use AI to accelerate comprehension through progressive summarization and analogies.',
            'Employ Socratic prompting to master difficult concepts through interactive Q&A.',
            'Always verify empirical statistics and legal references with primary sources.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_3_1_1',
              questionText: 'When an AI model provides a statistical figure about Nigeria\'s economic growth, what should your immediate next step be?',
              options: [
                'Publish it immediately on social media without review',
                'Cross-reference the figure with official primary sources like the National Bureau of Statistics',
                'Assume the AI is always 100% correct because it has processed internet data',
                'Delete your AI account'
              ],
              correctAnswer: 1,
              explanation: 'Responsible AI use demands verifying empirical statistics against official primary sources like the NBS.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_3_2',
          moduleId: 'mod_ai_3',
          courseId: 'course_ai_literacy',
          title: 'AI for Content Creation and Lesson Planning',
          sequence: 2,
          sequenceLabel: 'Lesson 3.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['AI-PRD-04'],
          introduction: 'Discover how educators, marketers, and community leaders utilize generative AI to produce high-impact educational content, presentations, and social media campaigns.',
          lessonContent: [
            'Curriculum-Aligned Lesson Notes: Generating 40-minute lesson plans following the Nigerian Educational Research and Development Council (NERDC) standards, complete with behavioral objectives, instructional materials, previous knowledge evaluation, and classroom activities.',
            'Marketing Copy & Storytelling: Creating compelling promotional copy for local artisans, tailoring hooks for Instagram Reels, and drafting customer nurture newsletters for WhatsApp broadcast lists.',
            'Multimodal Content Assets: Brainstorming presentation slide decks in Google Slides, generating diagram prompts for Canva, and drafting video scripts with timed B-roll visual cues.',
            'Iterative Content Tuning: Reviewing AI outputs to eliminate robotic tone, adding authentic local idioms, and ensuring cultural resonance with Nigerian audiences.'
          ],
          nigerianContextExamples: [
            'A corps member teaching English Language at a community secondary school generates 20 comprehension questions based on Chinua Achebe\'s literature excerpts.',
            'A corps member managing an online fashion brand uses AI to generate 30 days of social media captions themed around African fashion and cultural pride.'
          ],
          practicalDemonstration: 'Generate a 40-minute NERDC lesson plan with a single prompt specifying: Class (SS2), Subject (Civic Education), Topic (Duties of a Citizen in Nigeria), and Duration (40 minutes).',
          handsOnExercise: {
            title: 'Generate a Complete 40-Minute Lesson Plan or Marketing Pack',
            task: 'Produce a complete ready-to-teach lesson note or a 1-week social media content calendar.',
            steps: [
              'Define the target audience and core educational or business objective.',
              'Use the RTCIF framework to generate the draft.',
              'Review and manually inject two authentic Nigerian local analogies.',
              'Format with clean headings, time allocations, and review questions.'
            ],
            deliverable: 'A 1-page lesson note or 5-post content calendar.'
          },
          keyTakeaways: [
            'AI cuts lesson planning and content ideation time from hours to minutes.',
            'Human curation is critical: refine the language to ensure local cultural resonance.',
            'Include specific educational standards (like NERDC) to ensure curricular compliance.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_3_2_1',
              questionText: 'How can a corps member deployed to a secondary school best utilize AI for lesson planning?',
              options: [
                'Have AI grade exams without looking at student submissions',
                'Generate draft 40-minute lesson notes aligned with the NERDC curriculum for human review and classroom delivery',
                'Tell students to let AI do all their homework assignments',
                'Replace classroom teaching completely with AI chatbot screens'
              ],
              correctAnswer: 1,
              explanation: 'AI serves as a powerful drafting copilot to create curriculum-aligned lesson structures that the teacher reviews and adapts.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_3_3',
          moduleId: 'mod_ai_3',
          courseId: 'course_ai_literacy',
          title: 'AI for Everyday Problem-Solving and Administrative Work',
          sequence: 3,
          sequenceLabel: 'Lesson 3.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['AI-PRD-04'],
          introduction: 'Harness AI to handle routine administrative friction: drafting formal civil service memos, organizing meeting minutes, managing project timelines, and automating data entry.',
          lessonContent: [
            'Drafting Formal Correspondence: Writing letters of introduction, grant proposals, sponsorship requests to local LGA chairmen, and PPA leave requests following official protocols.',
            'Meeting Minutes Summarization: Pasting messy, fragmented voice notes or meeting transcripts into an AI model and converting them into structured minutes with Action Items, Owners, and Deadlines.',
            'Event & Project Planning: Generating comprehensive project timelines for Community Development Service (CDS) projects, including budget estimation, logistics checklists, and volunteer duty rosters.',
            'Spreadsheet Formula Generation: Asking the AI: "Write an Excel formula to combine First Name in Column A and Surname in Column B, and format it in Proper Case."'
          ],
          nigerianContextExamples: [
            'Drafting an official sponsorship proposal to a commercial bank in your deployment city for an NYSC CDS borehole rehabilitation project.',
            'Converting raw notes from a village community town hall meeting into an executive summary for the NYSC Local Government Inspector (LGI).'
          ],
          practicalDemonstration: 'Paste a paragraph of unorganized notes from an event planning session. Prompt: "Extract all actionable tasks into a table with columns: Task Description, Responsible Person, Due Date, and Priority Level."',
          handsOnExercise: {
            title: 'Draft a Community CDS Project Sponsorship Proposal',
            task: 'Use an AI assistant to prepare a 1-page sponsorship letter to a local corporate organization or philanthropist.',
            steps: [
              'Identify a tangible CDS community project (e.g. donating exercise books to a rural school or conducting a free malaria testing outreach).',
              'Define the budget, target beneficiaries, and proposed execution date.',
              'Prompt the AI with formal civil service tone and professional greeting.',
              'Review and format the proposal.'
            ],
            deliverable: 'A complete 1-page formal sponsorship proposal letter.'
          },
          keyTakeaways: [
            'Routine administrative friction can be eliminated through structured AI drafting.',
            'Transform unstructured meeting notes into clear accountability matrices in seconds.',
            'AI accelerates community development fundraising through polished proposal writing.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_3_3_1',
              questionText: 'When drafting an official sponsorship letter for a CDS project, what essential information must you supply to the AI?',
              options: [
                'Only the word "sponsorship"',
                'The project objective, community beneficiary details, budget, formal recipient title, and timeline',
                'Your personal bank account PIN and passwords',
                'A collection of random internet memes'
              ],
              correctAnswer: 1,
              explanation: 'Providing complete context—including objective, community impact, budget, and recipient—ensures a persuasive, professional proposal.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_ai_4',
      courseId: 'course_ai_literacy',
      sequence: 4,
      sequenceLabel: 'Module 4',
      title: 'Responsible AI and Building with AI',
      description: 'Understand the legal, ethical, and safety dimensions of AI, and prototype a simple AI-assisted digital solution for a real-world community challenge.',
      learningObjectiveIds: ['AI-ETH-05', 'AI-BLD-06'],
      lessons: [
        {
          lessonId: 'lesson_ai_4_1',
          moduleId: 'mod_ai_4',
          courseId: 'course_ai_literacy',
          title: 'Responsible and Ethical AI Use in Nigeria',
          sequence: 1,
          sequenceLabel: 'Lesson 4.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['AI-ETH-05'],
          introduction: 'Explore the critical ethical responsibilities surrounding data privacy (NDPR), algorithmic bias, intellectual property, prompt injection security, and human oversight.',
          lessonContent: [
            'Nigeria Data Protection Act (NDPA / NDPR): As digital practitioners, corps members must protect the personally identifiable information (PII) of students, colleagues, and customers. Never upload confidential records, student grades, phone numbers, NINs, or BVNs into public AI tools.',
            'Algorithmic Bias: AI models are primarily trained on Western internet datasets and may exhibit cultural, linguistic, or gender biases. When generating content or assessing decisions, critically evaluate whether the model treats African names, cultural nuances, and regional traditions fairly.',
            'Prompt Injection & Security Vulnerabilities: Prompt injection occurs when untrusted user input tricks an AI system into ignoring its core safety instructions and executing unauthorized actions. Securing inputs with strict validation is essential when building AI apps.',
            'Human-in-the-Loop Oversight: For high-stakes decisions—such as student disciplinary reviews, hiring screenings, or financial lending—AI should provide recommendations, but final decisions must always rest with human professionals.'
          ],
          nigerianContextExamples: [
            'A hospital PPA staff member must never paste patient medical histories into public ChatGPT prompts, as this violates patient confidentiality and the NDPA.',
            'A school administrator reviewing scholarship applications must ensure automated text screeners do not penalize applicants from rural public schools due to phrasing differences.'
          ],
          practicalDemonstration: 'Demonstrate data anonymization: Show how to redact PII from a dataset before running an AI analysis (e.g. replacing "Amina Bello, Phone 08012345678" with "Student_A, Region_North").',
          handsOnExercise: {
            title: 'Conduct an AI Ethical Risk Assessment',
            task: 'Analyze an AI implementation scenario and identify potential privacy and bias risks.',
            steps: [
              'Scenario: A secondary school wants to use an AI chatbot to automatically screen and approve prefect applications.',
              'Identify 2 data privacy risks regarding student personal information.',
              'Identify 1 potential bias risk regarding language and writing style.',
              'Propose a human-in-the-loop safeguard to ensure fair outcomes.'
            ],
            deliverable: 'A 1-page risk assessment and mitigation plan.'
          },
          keyTakeaways: [
            'Never input sensitive PII, NINs, BVNs, or confidential records into unverified public AI models.',
            'The Nigeria Data Protection Act mandates strict data minimization and user consent.',
            'Always maintain human-in-the-loop oversight for consequential decisions.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_4_1_1',
              questionText: 'Under the Nigeria Data Protection Act (NDPA), is it acceptable to upload confidential student records with names, home addresses, and phone numbers into a public AI tool?',
              options: [
                'Yes, because AI models are completely private and never store data',
                'No, uploading confidential PII to unverified third-party tools violates data privacy and protection regulations',
                'Yes, but only if the students attend a private school',
                'Yes, if you do it late at night'
              ],
              correctAnswer: 1,
              explanation: 'Uploading personally identifiable information (PII) to public, unverified third-party tools breaches data protection regulations like the NDPA.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_4_2',
          moduleId: 'mod_ai_4',
          courseId: 'course_ai_literacy',
          title: 'Building Simple Digital Products with AI and No-Code',
          sequence: 2,
          sequenceLabel: 'Lesson 4.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['AI-BLD-06'],
          introduction: 'Learn the step-by-step product development methodology to transition from an AI consumer to an AI builder using accessible no-code tools and AI code generation.',
          lessonContent: [
            'The AI Product Mindset: Do not build an AI tool just for the sake of using AI. Start with a real, urgent, underserved human problem in your community, school, or local market.',
            'Problem Framing: Clearly define Who suffers from the problem, What the root friction is, and Why existing solutions are too expensive, slow, or inaccessible.',
            'Prototyping with No-Code & AI: You do not need years of software engineering training to build a functional prototype. Tools like Google Forms, Google Sheets, Glide Apps, Softr, and WhatsApp Business can be combined with AI prompt templates to deliver instant value.',
            'AI as a Code Generator: Using Gemini or ChatGPT to write HTML, CSS, and lightweight JavaScript code for calculators, landing pages, and interactive quiz widgets.'
          ],
          nigerianContextExamples: [
            'Building a WhatsApp-based price check tool for market vendors that uses an AI prompt to translate price updates into local market lingo.',
            'Creating a no-code mobile directory of registered artisans in an NYSC deployment LGA with Google Sheets and Glide.'
          ],
          practicalDemonstration: 'Ask Gemini: "Write a complete single-file HTML/CSS/JavaScript web page that calculates the estimated return on investment for a poultry farmer in Nigeria with 500 broilers. Include input fields for chick cost, feed cost, mortality rate, and selling price." Copy and open the code in any web browser to see a working app.',
          handsOnExercise: {
            title: 'Define Your AI Product Solution Blueprint',
            task: 'Write a 1-page Product Requirements Document (PRD) for a simple digital solution.',
            steps: [
              '1. Problem Statement: What community or business friction are you addressing?',
              '2. Target User Persona: Who will use this tool on a weekly basis?',
              '3. Core AI Feature: How will AI make the solution faster, cheaper, or smarter?',
              '4. Tool Stack: What accessible tools will you use (e.g. Google Sheets + AI + WhatsApp)?'
            ],
            deliverable: 'Your 1-page Product Requirements Document.'
          },
          keyTakeaways: [
            'Successful digital products start with urgent human problems, not technological novelty.',
            'Combine accessible no-code tools with AI prompt logic to prototype functional products rapidly.',
            'Generative AI can author complete, working HTML/JavaScript prototypes from natural language specifications.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_4_2_1',
              questionText: 'What is the most effective first step when building an AI-assisted digital solution?',
              options: [
                'Buying expensive server computers before talking to users',
                'Identifying a real, urgent problem experienced by specific community members or small businesses',
                'Memorizing 1,000 coding algorithms',
                'Copying an existing Silicon Valley app without adapting to local needs'
              ],
              correctAnswer: 1,
              explanation: 'High-impact products always originate from deeply understanding a real human problem and validating the target user\'s needs.'
            }
          ]
        },
        {
          lessonId: 'lesson_ai_4_3',
          moduleId: 'mod_ai_4',
          courseId: 'course_ai_literacy',
          title: 'AI Product Builder Project: Testing, Refining and Presenting',
          sequence: 3,
          sequenceLabel: 'Lesson 4.3',
          estimatedDurationMinutes: 40,
          learningObjectiveIds: ['AI-BLD-06'],
          introduction: 'Finalize your prototype, conduct user acceptance testing with real peers or community members, iterate based on feedback, and pitch your solution effectively.',
          lessonContent: [
            'User Acceptance Testing (UAT): Put your prototype into the hands of 3 to 5 real users. Watch them interact with it without intervening. Note where they get confused, what features they ignore, and what questions they ask.',
            'Iterative Prompt Refinement: Adjust your backend prompt instructions based on user testing to prevent edge-case failures and reduce output latency.',
            'Measuring Impact: How do you prove your tool worked? Track concrete metrics: minutes saved per task, percentage increase in user comprehension, or money saved on administrative expenses.',
            'The 3-Minute Solution Pitch: Structure a compelling demonstration: 1. The Hook & The Problem (30s), 2. The Solution & Live Demo (90s), 3. Community Impact & Scalability (60s).'
          ],
          nigerianContextExamples: [
            'Testing an educational revision bot with 5 secondary school students in your PPA and refining prompts based on common vocabulary confusion.',
            'Presenting a digitized local cooperative savings tracker to market leaders in your CDS meeting.'
          ],
          practicalDemonstration: 'Review a 3-minute video pitch rubric: Clarity of Problem, Elegance of Solution, Technical Demonstration, and Measurable Local Impact.',
          handsOnExercise: {
            title: 'Execute User Testing and Record Feedback',
            task: 'Conduct a testing session with at least two fellow corps members or colleagues and record their candid feedback.',
            steps: [
              'Give the user the link or prototype instructions without explaining how it works.',
              'Observe their navigation and note any points of friction.',
              'Ask: "What was the most useful part?" and "What was the most confusing part?"',
              'Implement at least one improvement based on their recommendations.'
            ],
            deliverable: 'A user testing feedback log with at least one implemented refinement.'
          },
          keyTakeaways: [
            'Prototypes become products only after rigorous user testing and iteration.',
            'Track measurable impact metrics like time saved or errors eliminated.',
            'Communicate value concisely using the 3-minute problem-solution-impact pitch framework.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_ai_4_3_1',
              questionText: 'During User Acceptance Testing (UAT) of your digital prototype, what is the best practice?',
              options: [
                'Argue with users whenever they find a feature confusing',
                'Observe how real users interact with the tool without intervening, and record points of friction for improvement',
                'Refuse to let anyone test the tool until it is 100% perfect',
                'Pay actors to pretend the tool works flawlessly'
              ],
              correctAnswer: 1,
              explanation: 'Effective user testing requires observing natural user interactions without intervention to identify genuine usability bottlenecks.'
            }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'AI Community & SME Digital Solution Builder',
    overview: 'Design, prototype, and present a practical AI-assisted digital solution addressing a tangible problem affecting secondary school students, small business owners, or community members in your NYSC host state.',
    instructions: [
      'Step 1: Identify a concrete problem in your PPA, CDS group, or host community (e.g. curriculum comprehension, market inventory, or health education).',
      'Step 2: Define your user persona and explain why traditional manual approaches are failing.',
      'Step 3: Build a working prototype using accessible tools (e.g. Google Sheets + AI prompts, a single-file HTML/JS tool, or a guided NotebookLM workspace).',
      'Step 4: Test your prototype with at least 3 target beneficiaries and record their feedback.',
      'Step 5: Write a concise project summary (300-500 words) detailing the problem, solution, tools used, user feedback, and measurable community impact.'
    ],
    assessmentCriteria: [
      'Problem Relevance: Does the project solve an authentic, urgent local challenge in Nigeria? (25%)',
      'AI Implementation & Prompt Design: Are structured prompting principles (RTCIF) correctly applied? (25%)',
      'User Testing & Iteration: Has the solution been tested with real users and improved based on feedback? (25%)',
      'Clarity & Practical Feasibility: Is the solution practical, cost-effective, and sustainable on mobile devices? (25%)'
    ],
    submissionGuidelines: 'Submit your project title, a 300-500 word description, a public link to your prototype (e.g. Google Doc, Google Drive link, Glide app URL, or GitHub link), and your user testing results.'
  },
  finalAssessment: [
    {
      id: 'fa_ai_01',
      questionText: 'When asking an AI model like Google Gemini or ChatGPT to write an official letter for your PPA, what is the best prompting technique?',
      options: [
        'Type "write a letter" and let the AI guess all the details',
        'Give clear context: state your role, the recipient, the objective, key facts, and desired tone',
        'Paste entire confidential office files and ask for a summary',
        'Use single-word prompts repeatedly until it produces what you need'
      ],
      correctAnswer: 1,
      explanation: 'Providing context (Role + Objective + Constraints + Tone) gives precise, usable outputs without hallucinations.',
      relatedLessonId: 'lesson_ai_2_1'
    },
    {
      id: 'fa_ai_02',
      questionText: 'What is an "AI hallucination" when interacting with Large Language Models (LLMs)?',
      options: [
        'When your phone battery drains unexpectedly during an AI chat',
        'When an AI generates convincing-sounding information or citations that are completely false or non-existent',
        'When an AI model refuses to respond because of poor network connectivity',
        'When the screen brightness changes automatically while running an AI application'
      ],
      correctAnswer: 1,
      explanation: 'LLMs generate text statistically based on word associations and can invent fake court cases, facts, or statistics.',
      relatedLessonId: 'lesson_ai_1_3'
    },
    {
      id: 'fa_ai_03',
      questionText: 'What does "Few-Shot Prompting" mean in generative AI?',
      options: [
        'Generating an image in less than two seconds',
        'Providing 2 to 3 representative examples of desired input-output pairs inside your prompt',
        'Only asking a chatbot 3 questions before refreshing the web page',
        'Running AI inference solely on mobile phone hardware'
      ],
      correctAnswer: 1,
      explanation: 'Few-shot prompting provides sample input-output pairs inside the prompt to guide the AI\'s style, formatting, and reasoning pattern.',
      relatedLessonId: 'lesson_ai_2_2'
    },
    {
      id: 'fa_ai_04',
      questionText: 'Which tool is built specifically by Google to organize research notes, upload PDFs, and ground AI responses strictly in your uploaded sources?',
      options: [
        'Google Sheets',
        'NotebookLM',
        'Android Auto',
        'Google Play Store'
      ],
      correctAnswer: 1,
      explanation: 'NotebookLM grounds responses strictly in uploaded user source files, preventing open-web hallucinations.',
      relatedLessonId: 'lesson_ai_2_3'
    },
    {
      id: 'fa_ai_05',
      questionText: 'Under the Nigeria Data Protection Act (NDPA), why must you avoid uploading unredacted student exam lists with names and phone numbers to public AI chatbots?',
      options: [
        'Because AI models cannot read numbers',
        'Because uploading confidential Personally Identifiable Information (PII) to unverified public tools violates statutory data privacy rights',
        'Because it causes the user\'s internet data bundle to expire immediately',
        'Because schools are legally forbidden from using computers'
      ],
      correctAnswer: 1,
      explanation: 'The NDPA requires strict protection of PII, prohibiting unconsented exposure to third-party cloud services.',
      relatedLessonId: 'lesson_ai_4_1'
    },
    {
      id: 'fa_ai_06',
      questionText: 'What is a "Prompt Injection" vulnerability in an AI system?',
      options: [
        'When an AI is injected with liquid cleaning chemicals',
        'When untrusted user input tricks an AI into ignoring its system safety instructions and executing unauthorized actions',
        'When an AI model runs faster than intended',
        'When you connect a phone to two different Wi-Fi routers'
      ],
      correctAnswer: 1,
      explanation: 'Prompt injection occurs when malicious inputs hijack model behavior away from developer-defined system constraints.',
      relatedLessonId: 'lesson_ai_4_1'
    },
    {
      id: 'fa_ai_07',
      questionText: 'What is an "AI Agent"?',
      options: [
        'A person who sells smartphones in a market stall',
        'An autonomous system that uses an LLM for reasoning, maintains memory, plans actions, and invokes tools/APIs to achieve a goal',
        'A simple word counter plugin in Microsoft Word',
        'An automatic SMS marketing sender'
      ],
      correctAnswer: 1,
      explanation: 'AI agents combine reasoning, memory, planning, and external tool execution to autonomously achieve tasks.',
      relatedLessonId: 'lesson_ai_4_2'
    },
    {
      id: 'fa_ai_08',
      questionText: 'In the RTCIF prompt framework, what does the "C" stand for?',
      options: [
        'Computer',
        'Context',
        'Coding',
        'Calculator'
      ],
      correctAnswer: 1,
      explanation: 'C stands for Context: background information, audience details, environment, and situational facts.',
      relatedLessonId: 'lesson_ai_2_2'
    },
    {
      id: 'fa_ai_09',
      questionText: 'Why can Large Language Models struggle with precise multi-digit arithmetic unless augmented with a code execution or calculator tool?',
      options: [
        'Because computer chips cannot count past 100',
        'Because they predict token probabilities rather than running actual symbolic mathematical execution',
        'Because mathematical numbers are banned in AI safety guidelines',
        'Because AI models run out of electricity when calculating numbers'
      ],
      correctAnswer: 1,
      explanation: 'LLMs are statistical sequence predictors, not symbolic calculation engines, unless paired with Python interpreters or calculators.',
      relatedLessonId: 'lesson_ai_1_3'
    },
    {
      id: 'fa_ai_10',
      questionText: 'What does "Fine-Tuning" an AI model mean?',
      options: [
        'Turning the volume knob on a loudspeaker',
        'Training a pre-trained foundation model on a curated domain-specific dataset to adapt its style and specialized knowledge',
        'Wiping the phone\'s operating system',
        'Deleting grammatical errors from a Word document'
      ],
      correctAnswer: 1,
      explanation: 'Fine-tuning trains an existing foundation model on specialized domain data to hone its performance on specific tasks.',
      relatedLessonId: 'lesson_ai_1_2'
    },
    {
      id: 'fa_ai_11',
      questionText: 'What role does a "System Instruction" or "System Persona" play in an AI conversation?',
      options: [
        'It charges an automatic monthly subscription fee',
        'It sets persistent background rules, constraints, and behavior for the model across the entire session',
        'It turns off the phone display automatically',
        'It deletes older messages permanently from memory'
      ],
      correctAnswer: 1,
      explanation: 'System instructions define persistent behavioral constraints and persona guidelines that govern all subsequent responses.',
      relatedLessonId: 'lesson_ai_2_2'
    },
    {
      id: 'fa_ai_12',
      questionText: 'What is the role of Reinforcement Learning from Human Feedback (RLHF) in training helpful AI models?',
      options: [
        'Allowing models to operate without electricity',
        'Aligning model outputs with human preferences, safety standards, and instruction-following by training on human ranking data',
        'Deleting half of the internet data during training',
        'Replacing software engineers with robots'
      ],
      correctAnswer: 1,
      explanation: 'RLHF tunes foundation models using human ratings to make them helpful, harmless, and aligned with human intent.',
      relatedLessonId: 'lesson_ai_1_3'
    },
    {
      id: 'fa_ai_13',
      questionText: 'What is the primary purpose of User Acceptance Testing (UAT) when building a digital tool?',
      options: [
        'To prove that the developer never made any mistakes',
        'To observe how real target users navigate the solution and identify confusing points or usability friction',
        'To charge users an initial testing fee',
        'To file legal trademarks before testing'
      ],
      correctAnswer: 1,
      explanation: 'UAT uncovers real usability bottlenecks and confirms whether the tool genuinely solves the user\'s practical problem.',
      relatedLessonId: 'lesson_ai_4_3'
    },
    {
      id: 'fa_ai_14',
      questionText: 'Which subfield of AI allows software to recognize spoken Yoruba, Hausa, or English words and convert them to text?',
      options: [
        'Computer Vision',
        'Natural Language Processing (NLP) / Speech Recognition',
        'Robotics Process Automation',
        'Database Normalization'
      ],
      correctAnswer: 1,
      explanation: 'Speech-to-text and language interpretation fall under Natural Language Processing and speech recognition.',
      relatedLessonId: 'lesson_ai_1_2'
    },
    {
      id: 'fa_ai_15',
      questionText: 'When presenting a finished AI solution to community stakeholders, what structure creates the most persuasive 3-minute pitch?',
      options: [
        'Reading 50 pages of code out loud word for word',
        'The Hook & The Problem (30s), The Solution & Live Demo (90s), and Community Impact & Scalability (60s)',
        'Arguing with the audience about technical definitions',
        'Showing a PowerPoint with no spoken words or demonstration'
      ],
      correctAnswer: 1,
      explanation: 'The Problem-Solution-Impact structure delivers clarity, technical proof, and community value in a concise timeframe.',
      relatedLessonId: 'lesson_ai_4_3'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredFinalAssessmentPassScore: 80,
    requireCapstoneSubmission: true
  }
};
