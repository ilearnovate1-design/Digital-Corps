import { BankQuestion } from '../types';

export const QUESTION_BANK: BankQuestion[] = [
  // =========================================================================
  // 1. AI & EMERGING TECHNOLOGY (30 Questions: 12 Beginner, 12 Intermediate, 6 Advanced)
  // =========================================================================
  {
    questionId: 'ai-01',
    categoryId: 'ai_emerging_tech',
    questionText: 'When asking an AI model like Google Gemini or ChatGPT to write an official letter for your PPA, what is the best prompting technique?',
    options: [
      'Type "write a letter" and let the AI guess all the details',
      'Give clear context: state your role, the recipient, the objective, key facts, and desired tone',
      'Paste entire confidential office files and ask for a summary',
      'Use single-word prompts repeatedly until it produces what you need'
    ],
    correctAnswer: 1,
    explanation: 'Providing context (Role + Objective + Constraints + Tone) gives precise, usable outputs without hallucinations.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-02',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is an "AI hallucination" when interacting with Large Language Models (LLMs)?',
    options: [
      'When your phone battery drains unexpectedly during an AI chat',
      'When an AI generates convincing-sounding information or citations that are completely false or non-existent',
      'When an AI model refuses to respond because of poor network connectivity',
      'When the screen brightness changes automatically while running an AI application'
    ],
    correctAnswer: 1,
    explanation: 'LLMs generate text statistically based on word associations and can invent fake court cases, facts, or statistics.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-03',
    categoryId: 'ai_emerging_tech',
    questionText: 'Which of the following is an effective and safe way for a corps member to use AI during their primary assignment?',
    options: [
      'Drafting secondary school lesson plans, creative classroom analogies, and quiz ideas for review',
      'Allowing an AI model to grade terminal exam papers without human verification',
      'Submitting AI-drafted reports directly to supervisors without reading them first',
      'Uploading student names, addresses, and parent contact numbers into an unverified public tool'
    ],
    correctAnswer: 0,
    explanation: 'AI serves as a powerful drafting and brainstorming copilot, but human oversight is always required before final usage.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-04',
    categoryId: 'ai_emerging_tech',
    questionText: 'What does "Few-Shot Prompting" mean in generative AI?',
    options: [
      'Generating an image in less than two seconds',
      'Providing 2 to 3 representative examples of desired input-output pairs inside your prompt',
      'Only asking a chatbot 3 questions before refreshing the web page',
      'Running AI inference solely on mobile phone hardware'
    ],
    correctAnswer: 1,
    explanation: 'Few-shot prompting shows the model examples of your preferred format, style, and tone to anchor its output accurately.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-05',
    categoryId: 'ai_emerging_tech',
    questionText: 'Why should you NEVER paste personal details like BVN, NIN, or client passwords into public AI chatbots?',
    options: [
      'Public models may log conversations for ongoing training and data could be exposed in security breaches',
      'It slows down your cellular internet data connection',
      'AI tools automatically bill your bank account whenever a BVN is detected',
      'The chatbot will permanently lock your phone operating system'
    ],
    correctAnswer: 0,
    explanation: 'Public AI chatbots can retain conversational data for model retraining. Treat inputs to public models as public knowledge.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-06',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is a multimodal AI model?',
    options: [
      'A model that can understand and process multiple data types like text, images, audio, and video together',
      'A model that only works on desktop personal computers',
      'An application that operates on multiple mobile SIM cards simultaneously',
      'A tool that translates English into French only'
    ],
    correctAnswer: 0,
    explanation: 'Multimodal models (such as Gemini 1.5/2.0) can process text, images, video clips, and audio in a single prompt context.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-07',
    categoryId: 'ai_emerging_tech',
    questionText: 'What role does a "System Instruction" or "System Persona" play in an AI conversation?',
    options: [
      'It sets persistent background rules, constraints, and behavior for the model across the entire session',
      'It restarts the computer hardware',
      'It pays the subscription fee automatically',
      'It deletes older messages permanently from memory'
    ],
    correctAnswer: 0,
    explanation: 'System instructions define the AI persona, tone, safety boundaries, and target perspective before user questions are asked.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-08',
    categoryId: 'ai_emerging_tech',
    questionText: 'Which tool is built specifically by Google to organize research notes, upload PDFs, and ground AI responses strictly in your uploaded sources?',
    options: [
      'NotebookLM',
      'Google Sheets',
      'Android Auto',
      'Google Pay'
    ],
    correctAnswer: 0,
    explanation: 'NotebookLM grounds generative summaries and study guides exclusively in the documents, notes, and PDFs you provide.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-09',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is "Chain-of-Thought" (CoT) prompting?',
    options: [
      'Asking the model to think step-by-step and show its reasoning before arriving at a final answer',
      'Chaining multiple USB cables together to speed up processing',
      'Copying and pasting the same prompt into five different browser tabs',
      'Writing prompts in poetic rhyming couplets'
    ],
    correctAnswer: 0,
    explanation: 'Asking an AI to "think step by step" breaks down complex math, logic, or policy problems, reducing errors significantly.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-10',
    categoryId: 'ai_emerging_tech',
    questionText: 'Which of the following best describes an AI "token"?',
    options: [
      'A basic unit of text (roughly 3-4 characters or part of a word) processed by large language models',
      'A physical cryptocurrency coin stored on your smartphone',
      'A plastic token given at orientation camp meal times',
      'A password used to connect to camp Wi-Fi'
    ],
    correctAnswer: 0,
    explanation: 'LLMs process text in chunks called tokens. In English, 100 tokens roughly equal 75 words.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-11',
    categoryId: 'ai_emerging_tech',
    questionText: 'If an AI image generator creates a picture of hands with seven fingers, what is this an example of?',
    options: [
      'A typical artifact/limitation of spatial training in generative image synthesis',
      'A deliberate artistic choice programmed by the developers',
      'A virus on your personal smartphone screen',
      'An expired software license'
    ],
    correctAnswer: 0,
    explanation: 'Hands and fine anatomical structures have historically been difficult for diffusion models due to complex 3D perspectives.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-12',
    categoryId: 'ai_emerging_tech',
    questionText: 'What does "temperature" control in an LLM API setting?',
    options: [
      'The randomness and creativity versus determinism of the generated response',
      'How hot the smartphone battery gets during generation',
      'The physical weather forecast in your city',
      'The speed of the fan inside your laptop'
    ],
    correctAnswer: 0,
    explanation: 'Lower temperature (e.g., 0.1) produces predictable, analytical outputs; higher temperature (e.g., 0.8) yields more creative variety.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'ai-13',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is Retrieval-Augmented Generation (RAG)?',
    options: [
      'Retrieving verified external documents or database records and injecting them into the prompt before generating an answer',
      'Replacing human developers with automated robotic arms',
      'Retraining a foundation model completely from scratch every single day',
      'Compressing MP3 audio files to save storage space'
    ],
    correctAnswer: 0,
    explanation: 'RAG retrieves factual information from a company knowledge base so the AI answers with verified, up-to-date facts.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-14',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is a "Prompt Injection" security vulnerability?',
    options: [
      'When untrusted user input tricks an AI system into ignoring its original instructions and executing malicious commands',
      'Injecting cleaning fluid into the computer USB port',
      'Typing too quickly on a mechanical keyboard',
      'Installing two AI apps on the same mobile device'
    ],
    correctAnswer: 0,
    explanation: 'Prompt injection occurs when malicious text tricks an LLM into bypassing safety guidelines or leaking system instructions.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-15',
    categoryId: 'ai_emerging_tech',
    questionText: 'When evaluating an AI response regarding Nigerian tax laws or healthcare guidelines, what is the safest professional practice?',
    options: [
      'Verify the citations and figures against official sources like FIRS or Federal Ministry of Health publications',
      'Forward the response immediately to colleagues without reading it',
      'Assume the AI is always 100% correct because it is trained on massive data',
      'Take a screenshot and post it directly to social media as breaking news'
    ],
    correctAnswer: 0,
    explanation: 'AI is not a legal or medical authority. Critical outputs must always be cross-checked with primary regulatory documents.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-16',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is "Fine-Tuning" an AI model?',
    options: [
      'Training a pre-trained foundation model on a curated domain-specific dataset to adapt its style and specialized knowledge',
      'Adjusting the volume knob on an external speaker',
      'Cleaning the dust from a desktop computer monitor',
      'Changing the font size inside a word processor'
    ],
    correctAnswer: 0,
    explanation: 'Fine-tuning adjusts model weights on specific examples (e.g. Nigerian legal briefs or local medical records) for specialized performance.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-17',
    categoryId: 'ai_emerging_tech',
    questionText: 'Which prompting technique asks an AI to evaluate its own work and improve its draft before presenting the final answer?',
    options: [
      'Self-Critique or Reflection Prompting',
      'Zero-Shot Querying',
      'Copy-Paste Looping',
      'Negative Reinforcement'
    ],
    correctAnswer: 0,
    explanation: 'Prompting the model to "critique your draft for weaknesses, tone, and accuracy, then produce an improved revision" yields higher quality.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-18',
    categoryId: 'ai_emerging_tech',
    questionText: 'What does "Context Window" refer to in modern Large Language Models?',
    options: [
      'The total number of tokens (words/characters) the model can consider at one time across input and output',
      'The size of the browser window on your computer screen',
      'The physical glass screen of your smartphone',
      'The amount of RAM installed on your graphics card'
    ],
    correctAnswer: 0,
    explanation: 'The context window dictates how much text (e.g. an entire book or codebase in Gemini 1.5 Pro) the model can hold in memory.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-19',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is an "AI Agent"?',
    options: [
      'An autonomous system that uses an LLM for reasoning, maintains memory, plans actions, and invokes tools/APIs to achieve a goal',
      'A customer support representative who sells mobile SIM cards',
      'A software program that only checks spelling in Microsoft Word',
      'An automated spam email sender'
    ],
    correctAnswer: 0,
    explanation: 'Agents combine reasoning, planning, memory, and tool execution (like searching databases or booking flights) autonomously.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-20',
    categoryId: 'ai_emerging_tech',
    questionText: 'Why can Large Language Models struggle with precise multi-digit arithmetic unless augmented with a code execution or calculator tool?',
    options: [
      'Because they predict token probabilities rather than running actual symbolic mathematical execution',
      'Because computer processors cannot calculate numbers higher than 100',
      'Because mathematical symbols are banned in generative AI algorithms',
      'Because AI models run out of electricity when calculating numbers'
    ],
    correctAnswer: 0,
    explanation: 'LLMs are statistical sequence predictors. For exact calculations, tool use (like invoking Python) ensures precision.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-21',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is a "Deepfake" in modern digital media?',
    options: [
      'Synthetic audio, video, or imagery generated by deep learning models to realistically mimic a real person without their consent',
      'A low-resolution photograph taken with an older feature phone',
      'A fake social media account created with no profile picture',
      'A corrupted PDF file that cannot be opened'
    ],
    correctAnswer: 0,
    explanation: 'Deepfakes use generative adversarial networks and diffusion models to forge convincing voices, video clips, and faces.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-22',
    categoryId: 'ai_emerging_tech',
    questionText: 'In computer vision, what is "Object Detection"?',
    options: [
      'Identifying the location and classification of specific objects within an image with bounding boxes',
      'Measuring the physical weight of a laptop battery',
      'Deleting duplicate image files from a folder',
      'Changing an image from color to black and white'
    ],
    correctAnswer: 0,
    explanation: 'Object detection identifies what objects appear in an image and where they are located (e.g. cars, pedestrians, potholes).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-23',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is the primary risk of "Data Bias" in AI recruitment screening software?',
    options: [
      'If historical hiring data favored certain demographics, the AI model will systematically penalize qualified underrepresented candidates',
      'The software will consume too much cloud computing power',
      'The company website will experience slow loading times',
      'The AI will automatically increase all applicant salaries by 50%'
    ],
    correctAnswer: 0,
    explanation: 'AI reflects the prejudices present in its training dataset, potentially reinforcing historical discrimination in hiring.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-24',
    categoryId: 'ai_emerging_tech',
    questionText: 'Which strategy best protects creative professionals from copyright infringements when using AI image tools for commercial client projects?',
    options: [
      'Review the platform terms of service, avoid prompts asking for exact artist styles, and document original prompt workflows',
      'Never reveal to the client that any digital tools were used',
      'Copy watermarked images from search engines and claim they are original AI outputs',
      'Use the artwork without reading any licensing agreements'
    ],
    correctAnswer: 0,
    explanation: 'Checking commercial rights in platform terms and steering clear of direct artist imitation minimizes copyright liabilities.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'ai-25',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is "Vector Embedding" in modern semantic search and AI databases?',
    options: [
      'Converting text, audio, or images into multi-dimensional numerical vectors that capture their semantic meaning for similarity search',
      'Saving text as an Adobe Illustrator vector graphic file',
      'Embedding a YouTube video player inside a blog post',
      'Writing code in low-level Assembly language'
    ],
    correctAnswer: 0,
    explanation: 'Vector embeddings plot concepts in high-dimensional space so mathematically close items share similar meaning.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'ai-26',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is the difference between "Model Parameters" and "Hyperparameters"?',
    options: [
      'Parameters are learned automatically by the model from data during training, while hyperparameters are configured by engineers before training starts',
      'Parameters control screen resolution, while hyperparameters control sound volume',
      'Parameters are stored in the cloud, while hyperparameters are stored in phone storage',
      'There is no difference; the terms are completely interchangeable'
    ],
    correctAnswer: 0,
    explanation: 'Weights and biases are internal parameters learned from data; learning rate and batch size are human-set hyperparameters.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'ai-27',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is "Quantization" when optimizing open-source LLMs (like Llama or Mistral) to run locally on low-cost devices?',
    options: [
      'Reducing the numerical precision of weights (e.g. from 16-bit float to 4-bit integer) to dramatically cut RAM and compute usage',
      'Increasing the font size of generated answers to make them easier to read',
      'Translating model outputs into ten different foreign languages simultaneously',
      'Connecting the computer to a quantum satellite network'
    ],
    correctAnswer: 0,
    explanation: 'Quantization allows massive models to run smoothly on laptops and smartphones with minimal degradation in output quality.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'ai-28',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is the role of Reinforcement Learning from Human Feedback (RLHF) in training helpful AI models?',
    options: [
      'Aligning model outputs with human preferences, safety standards, and instruction-following by training on human ranking data',
      'Paying humans to type every response by hand behind the scenes',
      'Allowing an AI model to operate without any electricity',
      'Deleting half of the internet data during initial pretraining'
    ],
    correctAnswer: 0,
    explanation: 'RLHF uses human evaluation of model responses to train a reward model, steering the LLM to be helpful, honest, and harmless.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'ai-29',
    categoryId: 'ai_emerging_tech',
    questionText: 'What is "Catastrophic Forgetting" in deep neural network training?',
    options: [
      'When an AI model abruptly loses previously learned knowledge upon being fine-tuned on new, different task data',
      'When an external hard drive accidentally disconnects during file copying',
      'When a user forgets their password and is locked out of their account',
      'When a mobile phone battery dies during software updates'
    ],
    correctAnswer: 0,
    explanation: 'Catastrophic forgetting occurs when new weight updates overwrite the features that solved earlier tasks.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'ai-30',
    categoryId: 'ai_emerging_tech',
    questionText: 'Which emerging AI architecture technique allows foundation models to invoke external tools via structured JSON schema definitions?',
    options: [
      'Function Calling / Tool Use',
      'CSS Grid Layout',
      'Binary Search Indexing',
      'Thread Pooling'
    ],
    correctAnswer: 0,
    explanation: 'Function calling allows the LLM to emit formatted JSON payloads that an application executes to retrieve live data or perform tasks.',
    difficulty: 'advanced',
    active: true
  },

  // =========================================================================
  // 2. CAREER & EMPLOYABILITY (30 Questions: 12 Beginner, 12 Intermediate, 6 Advanced)
  // =========================================================================
  {
    questionId: 'car-01',
    categoryId: 'career_employability',
    questionText: 'What does an Applicant Tracking System (ATS) do when you submit an online job application?',
    options: [
      'Parses and scans your CV text for relevant keywords, job titles, and qualifications before a human recruiter sees it',
      'Automatically dials your phone number to conduct a surprise voice interview',
      'Checks your bank balance to verify creditworthiness',
      'Blocks applications submitted from Android smartphones'
    ],
    correctAnswer: 0,
    explanation: 'ATS software filters and ranks resumes based on relevance to the job description keywords before human review.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-02',
    categoryId: 'career_employability',
    questionText: 'Why should you avoid using tables, icons, and multi-column visual layouts on an ATS-targeted resume?',
    options: [
      'ATS scanners often scramble multi-column text and cannot read graphical text boxes, leading to rejection',
      'Recruiters will report your email address to the police',
      'Modern computer screens cannot display colored tables',
      'It increases the file download size to over 500 megabytes'
    ],
    correctAnswer: 0,
    explanation: 'Simple, single-column formatting with standard headers (Experience, Education, Skills) parses cleanly in all ATS parsers.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-03',
    categoryId: 'career_employability',
    questionText: 'Which of the following is the most professional headline on a LinkedIn profile for an NYSC corps member seeking tech roles?',
    options: [
      'Unemployed Graduate Looking for Any Job in Nigeria',
      'Data Analyst & BI Specialist | NYSC Intern | Python, SQL & Power BI | Passionate about Business Analytics',
      'Chief Executive Officer at Self-Employed Hustler',
      'DM me for urgent opportunities'
    ],
    correctAnswer: 1,
    explanation: 'A strong LinkedIn headline highlights your target role, top technical skills, and current professional positioning.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-04',
    categoryId: 'career_employability',
    questionText: 'How should you describe your NYSC primary assignment duties on your CV to impress corporate employers?',
    options: [
      'Focus on tangible achievements, numbers, and leadership outcomes rather than passive daily attendance',
      'Simply write "NYSC Corper at Local School" with no additional details',
      'Copy the job duties directly from an unverified Wikipedia article',
      'State that you did not do any real work because you were just a corps member'
    ],
    correctAnswer: 0,
    explanation: 'Quantified accomplishments (e.g. "Taught 120 students; improved passing rates by 24%") demonstrate high workplace impact.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-05',
    categoryId: 'career_employability',
    questionText: 'What is the optimal length for an early-career graduate resume for Nigerian and international entry-level roles?',
    options: [
      '1 to 2 clean, concise pages highlighting relevant education, skills, and projects',
      'At least 6 pages detailing every primary school club and certificate',
      'A 10-line text message sent via SMS',
      'A 15-page bound dissertation'
    ],
    correctAnswer: 0,
    explanation: 'Recruiters spend an average of 6 seconds reviewing a CV. 1-2 pages ensures your strongest qualifications are instantly visible.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-06',
    categoryId: 'career_employability',
    questionText: 'When applying for freelance contracts on Upwork or Fiverr, what is the most important element of your opening proposal line?',
    options: [
      'Immediately acknowledging the client’s specific problem and explaining how you will solve it',
      'Saying "Dear Sir, I am a highly motivated individual seeking any contract"',
      'Copying and pasting a generic 500-word template with no customization',
      'Demanding advance payment in foreign currency before reading the job description'
    ],
    correctAnswer: 0,
    explanation: 'Clients preview only the first 2 lines of proposals. Hooking them with their specific challenge demonstrates competence.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-07',
    categoryId: 'career_employability',
    questionText: 'What is a "portfolio" and why is it essential for digital careers (design, software, writing)?',
    options: [
      'A collection of real project samples, live links, and case studies proving you can execute actual work',
      'A leather folder you carry physically to orientation camp drills',
      'A bank statement showing your monthly NYSC allowance payments',
      'A certificate showing that you attended high school'
    ],
    correctAnswer: 0,
    explanation: 'Proof of work matters far more to modern employers than degree certificates alone. Portfolios show real-world capability.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-08',
    categoryId: 'career_employability',
    questionText: 'Which email address format looks most professional on job application correspondence?',
    options: [
      'firstname.surname@gmail.com',
      'sexy_corpsmember2026@yahoo.com',
      'rich_money_hustler_abuja@hotmail.com',
      'anonymous_king999@outlook.com'
    ],
    correctAnswer: 0,
    explanation: 'Using your real first and last name creates an immediate impression of maturity and professionalism.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-09',
    categoryId: 'career_employability',
    questionText: 'During a remote video interview on Google Meet or Zoom, which of the following is crucial for professional presentation?',
    options: [
      'Quiet environment, neutral background, camera at eye level, and stable lighting on your face',
      'Walking through a noisy market while wearing sunglasses',
      'Turning off the camera completely without prior notice to save battery',
      'Using an animated cartoon avatar filter instead of your real face'
    ],
    correctAnswer: 0,
    explanation: 'Good lighting, clean audio, and camera presence build trust with remote hiring managers.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-10',
    categoryId: 'career_employability',
    questionText: 'What is the "STAR" technique used for in competency-based job interviews?',
    options: [
      'Structuring answers around Situation, Task, Action, and Result to provide clear behavioral evidence',
      'Rating the interviewers on a five-star scale after the meeting',
      'Memorizing astronomical constellations to demonstrate intelligence',
      'Arriving at the interview wearing brightly colored military medals'
    ],
    correctAnswer: 0,
    explanation: 'The STAR framework ensures interview answers are structured with real-world context, specific actions taken, and measurable results.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-11',
    categoryId: 'career_employability',
    questionText: 'What is an "ATS keyword match"?',
    options: [
      'Aligning the technical skills and core terms on your CV with the explicit requirements stated in the job post',
      'Typing random words in white font at the bottom of the page to trick the software',
      'Using the password "admin" to log into the recruitment portal',
      'Matching the font color of your resume with your favorite football club'
    ],
    correctAnswer: 0,
    explanation: 'Tailoring your CV to incorporate the exact tools and competencies specified in the job posting ensures a high ATS match score.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-12',
    categoryId: 'career_employability',
    questionText: 'What is the purpose of a professional "Cover Letter" in modern hiring?',
    options: [
      'To provide narrative context on why your specific skills make you an ideal fit for the company culture and strategic goals',
      'To restate your primary school report cards word for word',
      'To complain about previous employers and national economic conditions',
      'To ask the company for personal financial assistance before being hired'
    ],
    correctAnswer: 0,
    explanation: 'Cover letters connect the dots between your past experiences and the specific value you will deliver to the hiring team.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'car-13',
    categoryId: 'career_employability',
    questionText: 'When negotiating compensation for a remote foreign contract as a Nigerian specialist, what should you verify regarding payment terms?',
    options: [
      'Invoice payment schedules (Net 15 vs Net 30), currency denomination (USD/EUR/GBP), and cross-border bank transfer fees',
      'Whether the client can deliver cash in person to your camp gate',
      'Whether the client will pay you exclusively in mobile airtime vouchers',
      'Whether you can refuse to provide bank details until the contract finishes'
    ],
    correctAnswer: 0,
    explanation: 'Clear agreements on payment currency, payout schedule, and receiving accounts (e.g. domiciliary or virtual accounts) prevent payment delays.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-14',
    categoryId: 'career_employability',
    questionText: 'What is "Asynchronous Communication" in remote work environments (e.g. Slack, Notion)?',
    options: [
      'Communicating through clear, detailed written messages that do not require an immediate instant response from teammates across time zones',
      'Talking on two mobile phone calls at the exact same second',
      'Only communicating by sending physical handwritten letters by post',
      'Refusing to reply to team messages for several weeks at a time'
    ],
    correctAnswer: 0,
    explanation: 'Async communication allows distributed global teams to collaborate effectively across differing working hours and time zones.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-15',
    categoryId: 'career_employability',
    questionText: 'On GitHub or GitLab, what demonstrates genuine coding capability to international software recruiters?',
    options: [
      'Meaningful commit history, documented README files, real project demos, and well-structured codebases',
      'Forking 200 random repositories without making any code edits or commits',
      'Leaving your profile photo blank and having zero public repositories',
      'Posting links to stolen code from private company archives'
    ],
    correctAnswer: 0,
    explanation: 'Clean commits, descriptive documentation, and working live deployments show production readiness to hiring leads.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-16',
    categoryId: 'career_employability',
    questionText: 'How can an entry-level candidate with zero formal corporate experience demonstrate credibility on Upwork or Fiverr?',
    options: [
      'Build spec projects, offer comprehensive case studies, link a polished portfolio, and obtain skill certification badges',
      'Fabricate fake employment letters from international Fortune 500 companies',
      'Bid $1 on every job and promise to work 24 hours a day with no sleep',
      'Copy another freelancer’s profile picture and bio word-for-word'
    ],
    correctAnswer: 0,
    explanation: 'High-quality self-directed case studies (e.g. a complete redesign of a local bank app) prove competence before your first client review.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-17',
    categoryId: 'career_employability',
    questionText: 'What is the "Job Description Keyword Mirroring" strategy for CV optimization?',
    options: [
      'Using the exact terminology of the job spec (e.g. "Customer Churn Analysis" rather than just "Checking Lost Users") naturally in your experience bullets',
      'Pasting the entire job description 10 times in white microscopic font at the bottom of the CV',
      'Naming your resume file with the hiring manager’s home address',
      'Submitting your CV upside down so it catches the reviewer’s eye'
    ],
    correctAnswer: 0,
    explanation: 'Mirroring industry-standard terminology naturally reflects the candidate’s fluency in the required domain competencies.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-18',
    categoryId: 'career_employability',
    questionText: 'When an international client asks for your "Day Rate" or "Hourly Rate", how should you determine your baseline?',
    options: [
      'Calculate required monthly living/business costs + taxes + software tools + margin, divided by billable client hours',
      'Guess a random low number so the client feels sorry for you',
      'Quote $1,000 per hour with no portfolio or verifiable experience',
      'Tell the client they should pay you whatever small change they have in their pocket'
    ],
    correctAnswer: 0,
    explanation: 'Professional pricing accounts for billable vs non-billable hours, local taxes, software licensing, and market value.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-19',
    categoryId: 'career_employability',
    questionText: 'What is a "Non-Disclosure Agreement" (NDA) frequently encountered in freelance contracts?',
    options: [
      'A legally binding agreement prohibiting you from sharing confidential client data, trade secrets, or unreleased IP with third parties',
      'An agreement requiring you to work exclusively at night time',
      'A document stating that you cannot tell your parents what your salary is',
      'A waiver allowing the client to take your laptop without permission'
    ],
    correctAnswer: 0,
    explanation: 'NDAs protect client intellectual property and commercial secrets during and after project execution.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-20',
    categoryId: 'career_employability',
    questionText: 'Which strategy is most effective for networking with senior tech executives on LinkedIn without being annoying?',
    options: [
      'Engage thoughtfully on their public posts with insightful commentary before sending a polite, specific connection request',
      'Spam their inbox with "Sir please send me 50k urgently" every morning',
      'Send connection requests without personalizing them and demand an immediate job interview',
      'Tag the CEO in random meme posts 20 times a day'
    ],
    correctAnswer: 0,
    explanation: 'Adding value in public comments builds name recognition, making private outreach welcome and natural.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-21',
    categoryId: 'career_employability',
    questionText: 'What is "Scope Creep" in freelance project management?',
    options: [
      'When a client gradually demands additional features and revisions beyond the original agreed contract without increasing payment or deadlines',
      'When your internet router slowly creeps across the table during heavy data usage',
      'When you work on your computer in a dimly lit room',
      'When you hire an assistant to help with graphic design'
    ],
    correctAnswer: 0,
    explanation: 'Scope creep erodes profitability unless controlled with clear change orders and explicit boundary documentation.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-22',
    categoryId: 'career_employability',
    questionText: 'How should you answer the interview question: "What is your greatest weakness?"',
    options: [
      'Share a genuine area of past struggle, the proactive steps you have taken to improve, and how you monitor your progress now',
      'Say "I have no weaknesses; I am completely perfect in every way"',
      'Say "I sleep late, hate working with other people, and get angry very easily"',
      'Refuse to speak for the remainder of the interview'
    ],
    correctAnswer: 0,
    explanation: 'Demonstrating self-awareness and intentional growth shows maturity and a growth mindset to recruiters.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-23',
    categoryId: 'career_employability',
    questionText: 'What is an "Escrow Payment" on platforms like Upwork or Escrow.com?',
    options: [
      'Funds deposited by the client into a trusted third-party holding account released to the freelancer only upon approved milestone completion',
      'An illegal wire transfer conducted through unregistered currency traders',
      'A penalty fine paid by freelancers to access the website',
      'A discount coupon given to new users'
    ],
    correctAnswer: 0,
    explanation: 'Escrow protects freelancers against non-payment by verifying the client has funded the project before work commences.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-24',
    categoryId: 'career_employability',
    questionText: 'When receiving negative or critical feedback on a work deliverable from a remote team lead, what is the best professional response?',
    options: [
      'Acknowledge the points calmly, ask clarifying questions on specific expectations, and outline an agreed revision timeline',
      'Delete the project files and leave the company Slack workspace immediately',
      'Argue aggressively that the team lead does not understand digital technology',
      'Complain publicly on Twitter about how unfair your supervisor is'
    ],
    correctAnswer: 0,
    explanation: 'Receiving critique with emotional intelligence and structured solution-oriented replies accelerates professional growth.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'car-25',
    categoryId: 'career_employability',
    questionText: 'What is the "Dual-Track Agile" methodology commonly practiced in top product teams?',
    options: [
      'Running continuous Product Discovery (customer research and validation) parallel with continuous Product Delivery (engineering sprints)',
      'Developing two identical software applications at the same time to see which is faster',
      'Working two full-time remote jobs secretly without telling either employer',
      'Writing code using two separate computer monitors simultaneously'
    ],
    correctAnswer: 0,
    explanation: 'Dual-track agile ensures engineering sprints build features that have already been validated with real users in discovery.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'car-26',
    categoryId: 'career_employability',
    questionText: 'What does "W-8BEN" or "W-8BEN-E" represent for foreign contractors working with US-based organizations from Nigeria?',
    options: [
      'A US Internal Revenue Service (IRS) tax form certifying foreign status and establishing applicable tax treaty withholding rates',
      'A visa application to travel to the United States immediately',
      'A passport renewal form issued by the Nigerian Immigration Service',
      'A bank security form required to open a local savings account'
    ],
    correctAnswer: 0,
    explanation: 'Form W-8BEN confirms you are a non-US citizen performing services outside the US, preventing improper 30% tax withholding.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'car-27',
    categoryId: 'career_employability',
    questionText: 'What is "Intellectual Property Assignment" in a standard international software or creative consulting contract?',
    options: [
      'A clause stating that all custom code, assets, and inventions created by the consultant within the scope of work transfer fully to the client upon full payment',
      'An agreement requiring the client to buy you a new house in Silicon Valley',
      'A rule that gives the freelancer the right to resell the client’s software to other competitors',
      'A clause that assigns ownership of the client’s company to the contractor'
    ],
    correctAnswer: 0,
    explanation: 'IP assignment ensures the hiring company owns the proprietary assets they paid the contractor to develop.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'car-28',
    categoryId: 'career_employability',
    questionText: 'What is a "Service Level Agreement" (SLA) in IT and digital enterprise contracts?',
    options: [
      'A formal commitment defining expected metrics for service uptime, response times, bug fixes, and penalties for failure to meet them',
      'An agreement to clean the computer servers every Saturday morning',
      'A certificate awarded to the most popular employee of the month',
      'A government permit allowing people to browse the internet'
    ],
    correctAnswer: 0,
    explanation: 'SLAs establish enforceable performance standards (e.g. 99.9% uptime, 1-hour critical response) between providers and clients.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'car-29',
    categoryId: 'career_employability',
    questionText: 'In product management, what is the "North Star Metric"?',
    options: [
      'The single key metric that best captures the core value your product delivers to customers and predicts sustainable business growth',
      'The geographical direction the company headquarters faces',
      'The total number of employees working in the HR department',
      'The speed of the office fiber optic internet connection'
    ],
    correctAnswer: 0,
    explanation: 'A North Star Metric aligns cross-functional teams around long-term customer value (e.g. Spotify’s "Time spent listening").',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'car-30',
    categoryId: 'career_employability',
    questionText: 'What does "Vesting" mean when compensation includes equity or stock options in a high-growth tech startup?',
    options: [
      'The process by which an employee earns the right to own shares over time, typically across a 4-year period with a 1-year cliff',
      'Wearing a formal corporate suit jacket to board meetings',
      'Investing personal savings into foreign cryptocurrency tokens',
      'Borrowing money from the company to buy a car'
    ],
    correctAnswer: 0,
    explanation: 'Vesting schedules incentivize retention; employees gain full rights to stock grants progressively as they complete tenure milestones.',
    difficulty: 'advanced',
    active: true
  },

  // =========================================================================
  // 3. DIGITAL BUSINESS & ENTREPRENEURSHIP (30 Questions: 12 Beginner, 12 Intermediate, 6 Advanced)
  // =========================================================================
  {
    questionId: 'biz-01',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'Which feature of WhatsApp Business is most valuable for a small merchant handling customer inquiries while away?',
    options: [
      'Automated Away Messages and Quick Replies for frequently asked questions',
      'Playing background music during voice calls',
      'Changing chat wallpaper colors automatically',
      'Hiding all contact phone numbers from customers'
    ],
    correctAnswer: 0,
    explanation: 'Quick Replies and automated greetings ensure potential buyers get instant answers even when the owner is busy.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-02',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'Why should a digital vendor use a business payment link (like Paystack or Flutterwave) instead of asking for manual screenshot transfers on WhatsApp?',
    options: [
      'Automates instant payment confirmation, eliminates fake bank alert scams, and provides automated customer receipts',
      'Forces the customer to pay double the price of the item',
      'Prevents customers from seeing the product photos',
      'Takes three weeks to confirm whether money was sent'
    ],
    correctAnswer: 0,
    explanation: 'Payment gateways verify funds in real-time, preventing merchant losses from fabricated bank alert screenshots.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-03',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is a "Call to Action" (CTA) on an e-commerce social media advertisement?',
    options: [
      'A clear prompt directing the viewer on the exact next step to take, such as "Click to Order on WhatsApp" or "Shop Now"',
      'A phone call placed to the local police department',
      'An emergency alarm sound playing through the phone speaker',
      'A legal notice filed with the corporate affairs commission'
    ],
    correctAnswer: 0,
    explanation: 'A compelling CTA guides prospective customers from passive browsing to taking immediate buying action.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-04',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What does "CAC" stand for in Nigerian formal business registration?',
    options: [
      'Corporate Affairs Commission',
      'Central Accounting Community',
      'Commercial Advertisers Council',
      'Customer Acquisition Company'
    ],
    correctAnswer: 0,
    explanation: 'The Corporate Affairs Commission (CAC) is the autonomous body responsible for regulating the formation and management of companies in Nigeria.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-05',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Social Proof" in digital marketing and online selling?',
    options: [
      'Customer reviews, testimonials, unboxing videos, and ratings proving real buyers were satisfied with your service',
      'A physical national ID card shown to strangers on the street',
      'A certificate from a local secondary school sports club',
      'Posting 100 selfies on an Instagram story every hour'
    ],
    correctAnswer: 0,
    explanation: 'Unbiased reviews and video testimonials reduce perceived purchase risk, boosting conversion rates for new online brands.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-06',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is an "Inventory Tracker" in small-business operations?',
    options: [
      'A tool (like a spreadsheet) tracking stock quantities on hand, items sold, reorder alerts, and cost prices',
      'A GPS device attached to delivery motorcycles',
      'A security camera installed in a shopping mall',
      'A padlock placed on a warehouse door'
    ],
    correctAnswer: 0,
    explanation: 'Inventory tracking prevents stockouts, reduces tied-up capital, and identifies top-selling products quickly.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-07',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'Why is posting high-quality, authentic product videos often more effective than static flyer graphics on TikTok and Instagram?',
    options: [
      'Video algorithms favor dynamic engagement and viewers can see real sizing, texture, and practical product use',
      'Video files take up zero space on mobile devices',
      'Static photos are completely banned on all social networks',
      'Videos are always cheaper to produce than single photographs'
    ],
    correctAnswer: 0,
    explanation: 'Short-form videos show product reality and build authentic emotional connection, driving higher purchase intent.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-08',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Customer Retention" in online business?',
    options: [
      'Strategies that keep existing customers coming back to buy repeatedly over time',
      'Preventing customers from ever leaving your physical shop',
      'Blocking unhappy customers on all social media channels',
      'Deleting customer phone numbers after they complete one order'
    ],
    correctAnswer: 0,
    explanation: 'Retaining existing customers is 5 to 7 times cheaper than acquiring new ones and drives sustained business profit.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-09',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is a "Value Proposition"?',
    options: [
      'A clear statement explaining the unique benefit your product solves, how it addresses customer pain, and why it beats alternatives',
      'The wholesale price list given to suppliers',
      'The bank balance statement submitted to tax authorities',
      'The total number of followers on your social media page'
    ],
    correctAnswer: 0,
    explanation: 'A strong value proposition answers the fundamental customer question: "Why should I buy from you instead of your competitor?"',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-10',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What does "SEO" mean for an e-commerce website or blog?',
    options: [
      'Search Engine Optimization (optimizing website structure and content so it ranks high on Google searches organically)',
      'Social Entertainment Organization',
      'Software Electronic Office',
      'Security Emergency Order'
    ],
    correctAnswer: 0,
    explanation: 'SEO brings free, intent-driven traffic from people searching for your exact products on Google and Bing.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-11',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Organic Reach" on social media platforms?',
    options: [
      'The number of people who see your content naturally without you paying for sponsored advertising',
      'Selling fresh farm vegetables on a website',
      'The physical distance a delivery driver can travel on one tank of fuel',
      'The number of people who walk past a physical store banner'
    ],
    correctAnswer: 0,
    explanation: 'Organic reach is earned through engaging content, shares, and algorithm recommendations without ad spend.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-12',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'Why should a small business separate personal bank accounts from business bank accounts?',
    options: [
      'To track real profitability, maintain legal corporate identity, and build creditworthiness for business loans',
      'Because banks charge a penalty if you use one account for groceries',
      'To hide your business from all customers',
      'Because Nigerian debit cards only work on weekends'
    ],
    correctAnswer: 0,
    explanation: 'Separate business accounts clarify cash flow, simplify tax records, and establish an audited financial track record.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'biz-13',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What does "Customer Acquisition Cost" (CAC) measure in online marketing?',
    options: [
      'The total sales and marketing spend required to acquire one paying customer',
      'The shipping fee paid to deliver a parcel to a customer’s doorstep',
      'The price a customer pays to buy your product',
      'The monthly salary paid to the company accountant'
    ],
    correctAnswer: 0,
    explanation: 'CAC divides all marketing expenses by new customers won. If CAC exceeds customer lifetime profit, the business loses money.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-14',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Customer Lifetime Value" (CLV or LTV)?',
    options: [
      'The total net profit a business expects to earn from a customer throughout their entire relationship with the brand',
      'The age of the oldest customer registered on your database',
      'How many years the company has been registered with the CAC',
      'The warranty period offered on electronics products'
    ],
    correctAnswer: 0,
    explanation: 'Healthy digital businesses aim for an LTV to CAC ratio of 3:1 or higher for sustainable unit economics.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-15',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is a "Sales Funnel" in digital marketing?',
    options: [
      'The stepped journey customers take from initial brand awareness, to interest, consideration, decision, and repeat purchase',
      'A plastic kitchen funnel used to package liquid soaps',
      'An accounting spreadsheet used to record bad debts',
      'A legal penalty imposed on unregistered market stalls'
    ],
    correctAnswer: 0,
    explanation: 'Understanding where prospects drop off in your funnel (e.g. cart abandonment vs checkout) guides optimization.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-16',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "A/B Testing" (Split Testing) in digital advertising?',
    options: [
      'Comparing two versions of an ad (different headlines, creatives, or CTAs) to see which converts better statistically',
      'Testing whether an ad displays properly on battery saver mode',
      'Running ads in two different languages at the exact same minute',
      'Asking your friend which picture looks nicer'
    ],
    correctAnswer: 0,
    explanation: 'A/B testing eliminates guesswork by letting real consumer purchasing data decide winning marketing assets.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-17',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Drop Shipping" in contemporary e-commerce?',
    options: [
      'A retail business model where the seller accepts customer orders but a third-party supplier packs and ships goods directly to the buyer',
      'Throwing packages from a moving delivery truck to save time',
      'Selling items at a 90% discount when a business closes down',
      'A system where customers pick up their orders from international airports'
    ],
    correctAnswer: 0,
    explanation: 'Dropshipping eliminates upfront warehouse inventory risk, though margins and delivery quality control require careful oversight.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-18',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is a "Pixel" (like the Meta Pixel or TikTok Pixel) placed on an online store?',
    options: [
      'A snippet of tracking code that measures visitor actions, tracks purchases, and builds audiences for targeted retargeting ads',
      'A tiny colored square on your computer monitor that has stopped working',
      'A watermark placed on digital photos to prevent copying',
      'A special discount code given to first-time shoppers'
    ],
    correctAnswer: 0,
    explanation: 'Ad pixels feed conversion data back to ad algorithms, enabling dynamic retargeting of shoppers who abandoned carts.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-19',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Churn Rate" in a subscription business (e.g. a paid WhatsApp VIP community or SaaS product)?',
    options: [
      'The percentage of subscribers who cancel or fail to renew their membership over a specific time period',
      'The speed at which new products are manufactured',
      'The amount of money spent on office snacks and coffee',
      'The number of times the server crashes during weekend peak hours'
    ],
    correctAnswer: 0,
    explanation: 'High churn destroys recurring revenue. Lowering monthly churn is critical for long-term compound growth.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-20',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'Which Nigerian fintech service allows small businesses to automatically split incoming customer payments between partners or suppliers?',
    options: [
      'Paystack Split Payments / Subaccounts',
      'WhatsApp Audio Calls',
      'Google Maps Directions',
      'Bluetooth File Transfer'
    ],
    correctAnswer: 0,
    explanation: 'Payment split APIs split each transaction automatically (e.g. 80% to vendor, 20% commission to marketplace owner).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-21',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "UGC" (User-Generated Content) in modern brand marketing?',
    options: [
      'Photos, video reviews, and testimonials created authentically by real customers rather than corporate ad agencies',
      'Official press releases published by government ministries',
      'Copyrighted music purchased from international record labels',
      'Confidential accounting audits prepared by chartered accountants'
    ],
    correctAnswer: 0,
    explanation: 'UGC builds authentic social trust because shoppers relate strongly to genuine experiences shared by peer consumers.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-22',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is a "Lead Magnet"?',
    options: [
      'A valuable free resource (e.g. free template, mini-course, checklist) offered to prospects in exchange for their email or phone number',
      'A heavy magnet used to retrieve lost keys from a drain',
      'A paid television advertisement broadcast during the evening news',
      'A high-interest loan offered to new entrepreneurs'
    ],
    correctAnswer: 0,
    explanation: 'Lead magnets attract qualified target buyers into your marketing database, enabling long-term nurture campaigns.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-23',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What does "Gross Margin" tell an online business owner?',
    options: [
      'The percentage of revenue left after subtracting the direct Cost of Goods Sold (COGS)',
      'The total number of packages shipped by courier services',
      'The total amount of tax owed to the state government',
      'The physical floor space of the company warehouse'
    ],
    correctAnswer: 0,
    explanation: 'Healthy gross margin ensures enough capital remains to cover operating overheads, marketing CAC, and net profit.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-24',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Influencer Whitelisting" in social commerce?',
    options: [
      'When an influencer grants a brand advertiser access to run paid ad campaigns directly through the creator’s social media handle',
      'Banning an influencer from attending public industry conferences',
      'Paying an influencer exclusively with company merchandise',
      'Verifying an influencer’s passport with national immigration authorities'
    ],
    correctAnswer: 0,
    explanation: 'Whitelisting combines the creator’s authentic profile credibility with the brand’s granular paid ad targeting controls.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'biz-25',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Cohort Analysis" when analyzing e-commerce customer retention?',
    options: [
      'Tracking the behavioral metrics and repurchase patterns of groups of customers who signed up or purchased in the same time frame',
      'Reviewing employee attendance records on public holidays',
      'Grouping customers by their primary school graduation year',
      'Measuring internet bandwidth consumption across different browser versions'
    ],
    correctAnswer: 0,
    explanation: 'Cohort charts show whether customer retention and repeat spend are improving over successive calendar months.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'biz-26',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'In financial modeling, what is "Working Capital" and why is it critical for physical product e-commerce?',
    options: [
      'Current Assets minus Current Liabilities; it represents the operating liquidity needed to buy inventory before customers pay',
      'The money spent on building a luxury company headquarters',
      'The physical machinery used inside manufacturing factories',
      'The total value of shares owned by venture capital investors'
    ],
    correctAnswer: 0,
    explanation: 'Without sufficient working capital, fast-growing brands go bankrupt because cash is trapped in raw inventory and transit.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'biz-27',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "ROAS" (Return on Ad Spend) and how is it calculated?',
    options: [
      'Gross Revenue generated from advertising divided by Total Ad Spend (e.g. ₦500,000 revenue / ₦100,000 spend = 5x ROAS)',
      'Total ad spend divided by the number of employee working hours',
      'The percentage discount offered during Black Friday promotions',
      'The number of people who liked an ad post without clicking'
    ],
    correctAnswer: 0,
    explanation: 'ROAS measures marketing campaign efficiency, indicating how many Nairas of gross sales each Naira spent generated.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'biz-28',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Omnichannel Commerce"?',
    options: [
      'A unified customer experience integrating sales, data, and inventory seamlessly across web, social storefronts, mobile app, and physical store',
      'Selling products exclusively through one single private Telegram channel',
      'A method of broadcasting radio advertisements in ten different languages',
      'A software program that prevents customers from returning items'
    ],
    correctAnswer: 0,
    explanation: 'Omnichannel connects digital touchpoints so customers enjoy consistent pricing, loyalty rewards, and customer history everywhere.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'biz-29',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is the purpose of an "Escrow Merchant API" in a multi-vendor marketplace platform?',
    options: [
      'Holds buyer funds securely until delivery confirmation is logged, then automatically disburses payouts to suppliers and commissions to the platform',
      'Automatically files tax returns with the federal government every hour',
      'Blocks foreign customers from placing orders on local websites',
      'Charges customers twice whenever they use a foreign credit card'
    ],
    correctAnswer: 0,
    explanation: 'Escrow builds trust in digital marketplaces where buyers and sellers have no prior mutual relationship.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'biz-30',
    categoryId: 'digital_business_entrepreneurship',
    questionText: 'What is "Customer Churn Cohort Decay" and how does it inform pricing strategy?',
    options: [
      'Analyzing when customer drop-offs plateau to design annual prepayment incentives and optimize onboarding value delivery',
      'Deciding to cancel all customer accounts after 90 days',
      'Charging customers an extra fee if they do not log into the app every day',
      'A biological term that has no relevance to digital commerce'
    ],
    correctAnswer: 0,
    explanation: 'Identifying when users drop off allows businesses to introduce targeted retention interventions and annual discount plans.',
    difficulty: 'advanced',
    active: true
  },

  // =========================================================================
  // 4. DIGITAL LITERACY & ONLINE SAFETY (30 Questions: 12 Beginner, 12 Intermediate, 6 Advanced)
  // =========================================================================
  {
    questionId: 'sec-01',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Phishing" in internet security?',
    options: [
      'Fraudulent emails, texts, or websites designed to impersonate legitimate entities (like your bank) to trick you into revealing passwords or OTPs',
      'Catching freshwater fish using a modern motorized boat',
      'Searching for old friends on Facebook using their hometown name',
      'Downloading legal music files from licensed streaming websites'
    ],
    correctAnswer: 0,
    explanation: 'Phishing tricks users into handing over confidential credentials through counterfeit emails, SMS, or clone login portals.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-02',
    categoryId: 'digital_literacy_safety',
    questionText: 'If you receive an SMS saying: "Dear Customer, your BVN has been blocked. Call 080XXXXXXXX immediately to unblock", what should you do?',
    options: [
      'Recognize it as an advance-fee phishing scam and ignore/delete it; banks never use personal mobile numbers for official BVN issues',
      'Call the phone number immediately and read out your BVN and mother’s maiden name',
      'Send your ATM card PIN via SMS to prove your identity',
      'Forward the message to all your platoon members in WhatsApp groups'
    ],
    correctAnswer: 0,
    explanation: 'Banks and the Central Bank of Nigeria never resolve account flags via personal GSM numbers or demand PINs by phone.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-03',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is Two-Factor Authentication (2FA) and why is it essential?',
    options: [
      'A security protocol requiring two distinct verification steps (e.g. password + authenticator code/PIN) before granting account access',
      'Having two different accounts with the same bank',
      'Using two different passwords for your laptop and mobile phone',
      'Sharing your password with two trusted family members'
    ],
    correctAnswer: 0,
    explanation: '2FA ensures that even if an attacker steals your password, they cannot breach your account without your physical secondary device.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-04',
    categoryId: 'digital_literacy_safety',
    questionText: 'Which of the following is the strongest password strategy?',
    options: [
      'A memorable passphrase with 14+ characters mixing words, numbers, and symbols (or generated via a password manager)',
      'Your birthdate followed by your surname (e.g. 1999Adeyemi)',
      'The word "password1234" because it contains both letters and numbers',
      'Using your phone number for all your online accounts so you never forget it'
    ],
    correctAnswer: 0,
    explanation: 'Passphrases of 14+ characters are mathematically resilient against automated brute-force attacks and credential stuffing.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-05',
    categoryId: 'digital_literacy_safety',
    questionText: 'Why is connecting to open, unencrypted public Wi-Fi networks (e.g. in cafes or public camp areas) risky?',
    options: [
      'Unencrypted traffic can be intercepted by bad actors on the same network using packet sniffers, exposing unencrypted credentials',
      'Public Wi-Fi permanently deletes all the photos stored on your smartphone',
      'The Wi-Fi owner automatically gains legal ownership of your laptop',
      'Public Wi-Fi turns off your phone battery completely'
    ],
    correctAnswer: 0,
    explanation: 'Without a trusted VPN or HTTPS encryption, malicious network operators or rogue nodes can snoop on transmitted data.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-06',
    categoryId: 'digital_literacy_safety',
    questionText: 'What does "HTTPS" with a padlock icon in a website URL indicate?',
    options: [
      'Data transmitted between your browser and the web server is encrypted in transit using SSL/TLS protocols',
      'The website is owned directly by the federal government',
      'Everything written on the website is guaranteed to be 100% true and factual',
      'You are browsing the internet without using any mobile data'
    ],
    correctAnswer: 0,
    explanation: 'HTTPS encrypts data in transit so intermediate nodes (like internet service providers or Wi-Fi routers) cannot inspect your traffic.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-07',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is a "SIM Swap" scam and how can you protect yourself?',
    options: [
      'Fraudsters fraudulently port your phone number to a new SIM card to intercept bank OTPs; protect yourself by setting a carrier SIM PIN',
      'Exchanging SIM cards with your platoon members during sports drills',
      'Cleaning the gold contacts on your SIM card with soapy water',
      'Buying two SIM cards from the same telecommunications provider'
    ],
    correctAnswer: 0,
    explanation: 'Setting a custom SIM PIN prevents unauthorized parties from moving your phone number onto another device if your phone is stolen.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-08',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Malware"?',
    options: [
      'Malicious software (viruses, trojans, spyware, ransomware) designed to damage, disrupt, or gain unauthorized access to computer systems',
      'Hardware cables that have become frayed or damaged through physical wear',
      'Software designed specifically for shopping in grocery markets',
      'A type of keyboard used in public secondary schools'
    ],
    correctAnswer: 0,
    explanation: 'Malware includes any software created to harm systems, steal private data, or lock files for extortion.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-09',
    categoryId: 'digital_literacy_safety',
    questionText: 'If a WhatsApp contact suddenly messages you saying: "I accidentally sent my 6-digit code to your SMS, please forward it to me urgently", what is happening?',
    options: [
      'An attacker is attempting to hijack your WhatsApp account using your verification code; never share verification codes with anyone',
      'Your friend legitimately made a harmless mistake with their telecommunication provider',
      'The Nigerian Communications Commission is conducting an audit of your phone',
      'Your phone is automatically updating its operating system'
    ],
    correctAnswer: 0,
    explanation: 'The 6-digit code is the WhatsApp registration PIN for YOUR account. Sharing it hands full control of your WhatsApp to the scammer.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-10',
    categoryId: 'digital_literacy_safety',
    questionText: 'What does "NDPR" stand for in Nigerian legal and digital privacy frameworks?',
    options: [
      'Nigeria Data Protection Regulation',
      'National Digital Petroleum Registry',
      'Nigerian Defense Public Relations',
      'National Debt Payment Recovery'
    ],
    correctAnswer: 0,
    explanation: 'The NDPR governs how personal data of Nigerian citizens must be collected, consented to, processed, and secured.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-11',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Ransomware"?',
    options: [
      'Malicious software that encrypts your files and storage, demanding a cryptocurrency ransom payment to unlock them',
      'A software program that helps you find lost keys',
      'An application that increases your mobile internet download speed',
      'A legal contract signed when renting an apartment'
    ],
    correctAnswer: 0,
    explanation: 'Ransomware holds critical institutional data hostage. Regular offline backups are the most effective defense against it.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-12',
    categoryId: 'digital_literacy_safety',
    questionText: 'Why should you keep your smartphone operating system (Android/iOS) and apps updated regularly?',
    options: [
      'Updates deliver critical security patches that close discovered vulnerabilities before cybercriminals can exploit them',
      'Updates delete all your stored contact numbers to keep memory clean',
      'Updates allow the phone manufacturer to read your private text messages',
      'Updates permanently prevent your phone from ever running out of battery'
    ],
    correctAnswer: 0,
    explanation: 'Zero-day vulnerabilities and browser exploits are patched in monthly security updates. Running outdated OS builds leaves you vulnerable.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'sec-13',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Credential Stuffing"?',
    options: [
      'An automated attack where lists of leaked username/password pairs from previous breaches are tested against hundreds of other websites',
      'Stuffing paper business cards into a conference badge holder',
      'Writing your password on five different sheets of paper',
      'Typing twenty characters into a login field as fast as possible'
    ],
    correctAnswer: 0,
    explanation: 'Because many people reuse passwords across services, a breach on one site allows hackers to hijack accounts on other platforms.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-14',
    categoryId: 'digital_literacy_safety',
    questionText: 'Why are dedicated Authenticator Apps (like Google Authenticator or Microsoft Authenticator) safer than SMS-based OTPs for 2FA?',
    options: [
      'Authenticator app codes are generated locally on the device using time-based algorithms (TOTP) and cannot be intercepted via SIM swaps or cellular SS7 flaws',
      'Authenticator apps do not require any smartphone battery',
      'SMS text messages are encrypted with military-grade satellite keys',
      'Authenticator apps are owned directly by the United Nations'
    ],
    correctAnswer: 0,
    explanation: 'SMS OTPs can be intercepted via SIM swaps, cellular spoofing, and malicious carrier insider attacks; TOTP apps remain local and immune.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-15',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is a "Man-in-the-Middle" (MitM) cyber attack?',
    options: [
      'Where an attacker secretly intercepts, relays, and possibly alters the communication between two parties who believe they are communicating directly',
      'When two people argue over who should pay for lunch at a restaurant',
      'A soccer foul committed by a midfield player during a match',
      'A physical fight that breaks out inside a computer server room'
    ],
    correctAnswer: 0,
    explanation: 'MitM attacks intercept unencrypted transmissions (or forge certificates) to eavesdrop on private sessions and data.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-16',
    categoryId: 'digital_literacy_safety',
    questionText: 'How can you identify a spoofed or counterfeit domain name in a phishing link (e.g. `paystakk-login.com` vs `paystack.com`)?',
    options: [
      'Inspect the exact root domain before the first single slash; scammers use typos, hyphens, and extra subdomains to fool users',
      'Assume any link that has a colorful logo must be 100% genuine',
      'Click the link and enter your bank password to see if it works',
      'Forward the link to your friends to test if their phones get hacked first'
    ],
    correctAnswer: 0,
    explanation: 'Always verify the true domain name. Scammers create visual clones with deceptive prefixes or subtle misspellings (typosquatting).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-17',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "End-to-End Encryption" (E2EE) in messaging platforms like WhatsApp and Signal?',
    options: [
      'Only the sender and intended recipient hold the cryptographic keys to read the messages; no intermediate server or provider can decrypt them',
      'Messages are automatically printed on paper at the end of every week',
      'Messages can be read by anyone connected to the same cell tower',
      'The telecommunication company records every voice call for public review'
    ],
    correctAnswer: 0,
    explanation: 'E2EE ensures that even if server databases are seized or subpoenaed, message content remains ciphertext without the endpoints’ keys.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-18',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is the "Principle of Least Privilege" (PoLP) in digital access control?',
    options: [
      'Users and systems should only be granted the minimum permissions strictly necessary to perform their specific authorized duties',
      'Junior staff members should never be allowed to use computer hardware',
      'Everyone in an organization should share a single master administrator password',
      'Only employees with post-graduate degrees are permitted to browse the web'
    ],
    correctAnswer: 0,
    explanation: 'Restricting access limits the damage (blast radius) if a single employee credential is compromised by attackers.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-19',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Doxxing"?',
    options: [
      'Maliciously publishing a person’s private personal details (home address, phone number, family records) online to encourage harassment',
      'Converting a Microsoft Word document into an Adobe PDF file',
      'Docking a boat at a maritime ferry terminal',
      'Cleaning dust out of a desktop computer cooling fan'
    ],
    correctAnswer: 0,
    explanation: 'Doxxing weaponizes private information to intimidate, threaten, or invite real-world harm upon a targeted individual.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-20',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is a "Password Manager" (e.g. Bitwarden, 1Password) and why is it recommended by cybersecurity agencies?',
    options: [
      'It generates, encrypts, and stores unique 20-character passwords for every website, requiring you to remember only one master passphrase',
      'It sends your passwords to the local police department for safekeeping',
      'It deletes all your passwords whenever you log out of a website',
      'It shares your passwords with all devices connected to the same Wi-Fi network'
    ],
    correctAnswer: 0,
    explanation: 'Password managers eliminate password reuse, preventing a single compromised service from cascading across all your accounts.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-21',
    categoryId: 'digital_literacy_safety',
    questionText: 'What does "Social Engineering" mean in the context of cybersecurity?',
    options: [
      'Manipulating psychological human tendencies (fear, urgency, greed, authority) to trick people into breaking normal security protocols',
      'Studying sociology and political science in a university',
      'Building community roads and bridges during NYSC CDS projects',
      'Organizing a platoon football match during orientation camp'
    ],
    correctAnswer: 0,
    explanation: 'Social engineering bypasses firewalls by hacking human psychology rather than software code (e.g. urgent fake CEO requests).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-22',
    categoryId: 'digital_literacy_safety',
    questionText: 'Why should you be cautious when downloading modified versions of apps (e.g. "WhatsApp Plus" or "GBWhatsApp") from unverified APK websites?',
    options: [
      'Modified APKs frequently contain bundled trojans, keyloggers, and spyware that bypass official Google Play Protect safety checks',
      'Modified APKs automatically make your smartphone heavier to hold physically',
      'Modified APKs force you to pay double for your internet subscriptions',
      'Modified APKs delete all the music files stored on your SIM card'
    ],
    correctAnswer: 0,
    explanation: 'Unofficial APK mods frequently inject malicious backdoors that secretly forward your chats, photos, and banking OTPs to hacker servers.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-23',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Data Minimization" under modern privacy regulations like NDPR and GDPR?',
    options: [
      'Collecting and retaining only the minimum personal data strictly necessary to fulfill a stated, lawful business purpose',
      'Deleting all customer records every evening at 5:00 PM',
      'Compressing image files so they take up fewer megabytes',
      'Storing customer data exclusively on mobile micro-SD cards'
    ],
    correctAnswer: 0,
    explanation: 'Data minimization limits organizational liability and protects citizens by ensuring companies do not hoard unnecessary private data.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-24',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is a "Cold Storage" or "Hardware Wallet" for digital assets and cryptocurrencies?',
    options: [
      'A dedicated offline physical device that generates and stores private cryptographic keys isolated from internet-connected computers',
      'Keeping your mobile phone inside a refrigerator to prevent overheating',
      'Storing bank banknotes inside a metallic safe box at home',
      'Using an ATM card in an air-conditioned banking hall'
    ],
    correctAnswer: 0,
    explanation: 'Cold storage protects private keys from remote keyloggers, web exploits, and phishing by keeping them completely offline.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'sec-25',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Zero Trust Architecture" (ZTA) in enterprise cybersecurity?',
    options: [
      'A security model that requires continuous verification of every user and device, assuming the network perimeter is already compromised ("never trust, always verify")',
      'A policy where company managers refuse to trust any employees',
      'A software system that has zero passwords and allows public access',
      'A computer network that operates without any internet connection'
    ],
    correctAnswer: 0,
    explanation: 'Zero Trust replaces perimeter-based security with continuous authentication, strict least privilege, and granular segmentation.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'sec-26',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is a "Cross-Site Scripting" (XSS) vulnerability in web applications?',
    options: [
      'When an application fails to sanitize untrusted user input, allowing attackers to inject malicious scripts that execute in victim browsers',
      'When a website displays content across two different computer screens',
      'When an image file fails to load due to a broken hyperlink',
      'When two websites share the same CSS color stylesheet'
    ],
    correctAnswer: 0,
    explanation: 'XSS enables attackers to steal session cookies, hijack accounts, or redirect users to malicious clone destinations.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'sec-27',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Public Key Cryptography" (Asymmetric Encryption)?',
    options: [
      'A cryptographic system using a public key for encryption and a distinct, mathematically linked private key for decryption',
      'A system where everyone in the world shares the exact same secret password',
      'A method of locking physical doors using public brass keys',
      'A government database where all citizen passwords are listed publicly'
    ],
    correctAnswer: 0,
    explanation: 'Asymmetric cryptography underpins HTTPS, digital signatures, and SSH; anyone can encrypt with the public key, but only the private key can decrypt.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'sec-28',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is a "CSRF" (Cross-Site Request Forgery) attack?',
    options: [
      'An attack that tricks an authenticated victim browser into transmitting unauthorized commands to a web application they are currently logged into',
      'A physical attack on a transatlantic fiber optic internet cable',
      'An error caused by typing the wrong web address into a browser tab',
      'When a computer monitor flickers because of electrical power surges'
    ],
    correctAnswer: 0,
    explanation: 'CSRF exploits the trust a web app has in the victim’s browser session cookies. Anti-CSRF tokens and SameSite cookies prevent it.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'sec-29',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "SQL Injection" (SQLi) and how do secure developers prevent it?',
    options: [
      'Untrusted input manipulating database queries directly; prevented by using Parameterized Queries and Object-Relational Mappings (ORMs)',
      'Injecting cleaning solvent into a hard drive database server',
      'Writing database code using uppercase letters only',
      'Backing up database tables into a Microsoft Excel file every evening'
    ],
    correctAnswer: 0,
    explanation: 'Parameterized queries treat inputs as literal parameters rather than executable SQL commands, completely neutralizing SQL injection.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'sec-30',
    categoryId: 'digital_literacy_safety',
    questionText: 'What is "Forward Secrecy" (Perfect Forward Secrecy) in TLS and secure messaging protocols?',
    options: [
      'A feature where session keys are generated ephemerally so that compromise of a master server key does not compromise past recorded encrypted sessions',
      'A system that predicts what messages you will type in the future',
      'An agreement to keep secret codes hidden for at least ten years',
      'A feature that automatically deletes all text messages after five minutes'
    ],
    correctAnswer: 0,
    explanation: 'Forward secrecy generates unique session keys for every communication exchange using Diffie-Hellman key exchanges.',
    difficulty: 'advanced',
    active: true
  },

  // =========================================================================
  // 5. PRODUCTIVITY & DIGITAL TOOLS (30 Questions: 12 Beginner, 12 Intermediate, 6 Advanced)
  // =========================================================================
  {
    questionId: 'prod-01',
    categoryId: 'productivity_digital_tools',
    questionText: 'When sharing a Google Doc or Google Drive folder with colleagues, what permission level should you select if you only want them to review without altering content?',
    options: [
      '"Viewer" or "Commenter"',
      '"Editor" with full admin access',
      '"Owner" with transfer rights',
      '"Publicly Editable on Web"'
    ],
    correctAnswer: 0,
    explanation: 'Selecting "Viewer" or "Commenter" allows partners to read and suggest feedback without risking accidental file deletion or edits.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-02',
    categoryId: 'productivity_digital_tools',
    questionText: 'Which keyboard shortcut is universally used on Windows and Google Docs to duplicate selected text or objects?',
    options: [
      'Ctrl + C followed by Ctrl + V',
      'Ctrl + Z followed by Ctrl + Y',
      'Ctrl + Alt + Delete',
      'Shift + Escape'
    ],
    correctAnswer: 0,
    explanation: 'Ctrl+C copies selected text/assets into clipboard memory and Ctrl+V pastes them into the destination.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-03',
    categoryId: 'productivity_digital_tools',
    questionText: 'In Canva, what tool allows you to instantly remove messy background clutter from a product photo with one click?',
    options: [
      'Background Remover (Magic Studio)',
      'Crop and Rotate',
      'Color Inverter',
      'Transparency Slider'
    ],
    correctAnswer: 0,
    explanation: 'Canva’s AI background remover isolates subjects cleanly, creating transparent PNGs ready for posters and ads.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-04',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is the primary benefit of organizing team project tasks on a Kanban board (like Trello, Asana, or ClickUp)?',
    options: [
      'Visualizing work stages across "To Do", "In Progress", and "Done" cards so team members see bottlenecks immediately',
      'Sending automated text messages to all employees every 10 minutes',
      'Deleting completed company files permanently from cloud storage',
      'Playing video games during official office working hours'
    ],
    correctAnswer: 0,
    explanation: 'Kanban boards provide instant visual status transparency, preventing work duplication and overlooked milestones.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-05',
    categoryId: 'productivity_digital_tools',
    questionText: 'In Google Drive, what happens if you accidentally delete an important file?',
    options: [
      'It moves to the "Trash" folder where it can be restored within 30 days before permanent deletion',
      'It is instantly and permanently destroyed from all Google servers worldwide',
      'Your Google account is suspended for 24 hours',
      'A fine of ₦5,000 is automatically deducted from your bank account'
    ],
    correctAnswer: 0,
    explanation: 'Google Drive Trash retains deleted files for 30 days, providing a safety net for accidental deletions.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-06',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Notion" primarily used for in modern digital workspaces?',
    options: [
      'An all-in-one customizable workspace combining notes, wikis, databases, project boards, and documentation',
      'An antivirus scanner used for scanning USB flash drives',
      'A mobile app used exclusively for streaming sports matches',
      'A spreadsheet formula that calculates compound interest'
    ],
    correctAnswer: 0,
    explanation: 'Notion combines document editing, relational databases, and team wikis into an adaptable, clean workspace.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-07',
    categoryId: 'productivity_digital_tools',
    questionText: 'When scheduling a meeting with clients in London and New York from Lagos, which digital tool prevents time zone confusion?',
    options: [
      'Google Calendar or World Time Buddy (with automatic time zone conversion)',
      'A wall clock hanging in your primary assignment classroom',
      'Guessing the time difference based on when the sun sets',
      'Sending an email asking the client to guess what time it is in Nigeria'
    ],
    correctAnswer: 0,
    explanation: 'Digital calendar tools convert event invitations into each participant’s local time zone automatically.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-08',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is the "Pomodoro Technique" for personal digital productivity?',
    options: [
      'Working in focused 25-minute distraction-free intervals followed by short 5-minute restorative breaks',
      'Cooking Italian tomato pasta while typing an official memo',
      'Checking your social media notifications every two minutes throughout the day',
      'Refusing to use a computer keyboard on Mondays'
    ],
    correctAnswer: 0,
    explanation: 'The 25/5 Pomodoro rhythm sustains high mental focus while preventing digital burnout and fatigue.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-09',
    categoryId: 'productivity_digital_tools',
    questionText: 'In Google Chrome, what does "Incognito Mode" (Private Browsing) do?',
    options: [
      'Prevents your browser from saving local browsing history, cookies, and site data on that specific device',
      'Makes you completely invisible to government intelligence agencies and internet service providers',
      'Guarantees your internet browsing is 100% free with no data consumption',
      'Automatically disables all computer viruses worldwide'
    ],
    correctAnswer: 0,
    explanation: 'Incognito protects local device privacy by wiping cookies and local history upon window closure; it does NOT hide traffic from ISPs.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-10',
    categoryId: 'productivity_digital_tools',
    questionText: 'What does "Ctrl + Z" (or Command + Z on Mac) do in almost all word processing and graphic software?',
    options: [
      'Undo the most recent action or deletion',
      'Permanently delete the entire document',
      'Send the file as an attachment to all your contacts',
      'Shut down the operating system'
    ],
    correctAnswer: 0,
    explanation: 'Undo (Ctrl+Z) reverses your last input, serving as the universal safety key in digital productivity.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-11',
    categoryId: 'productivity_digital_tools',
    questionText: 'When sending a large 2GB video file to a colleague, what is the best digital practice?',
    options: [
      'Upload to Google Drive, OneDrive, or WeTransfer and share a secure download link',
      'Attach the raw 2GB file directly to an email message',
      'Send the video in 100 separate 10-second clips via WhatsApp status',
      'Burn the file onto an old compact disc and send it via physical postal mail'
    ],
    correctAnswer: 0,
    explanation: 'Most email servers cap attachments at 25MB. Cloud storage links allow instant, high-speed downloading of massive files.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-12',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Grammarly" or "LanguageTool" used for in professional writing?',
    options: [
      'Real-time automated grammar correction, spelling verification, tone enhancement, and clarity checks',
      'Translating English into ancient Egyptian hieroglyphics',
      'Scanning computer hard drives for hardware physical defects',
      'Designing three-dimensional building architectural models'
    ],
    correctAnswer: 0,
    explanation: 'Writing assistants catch typographical oversights and recommend vocabulary adjustments to enhance professional polish.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'prod-13',
    categoryId: 'productivity_digital_tools',
    questionText: 'What does "BCC" (Blind Carbon Copy) do in email correspondence and why is it vital for privacy?',
    options: [
      'Hides recipient email addresses from other recipients, preventing mass email scraping and NDPR privacy violations',
      'Sends a copy of the email to the local police department',
      'Encrypts the email so only computer programmers can read it',
      'Deletes the email from the sender’s outbox immediately after transmission'
    ],
    correctAnswer: 0,
    explanation: 'Putting recipients in BCC keeps private contact emails concealed from other recipients on group announcements.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-14',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Loom" used for in modern distributed remote teams?',
    options: [
      'Recording quick screen-and-camera video walkthroughs with instant shareable links to explain tasks asynchronously',
      'Weaving traditional cotton fabrics on a physical loom',
      'Running heavy database accounting calculations',
      'Compressing digital photographs into zip folders'
    ],
    correctAnswer: 0,
    explanation: 'Loom replaces unnecessary 30-minute meetings with 3-minute visual video updates that teammates watch at their convenience.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-15',
    categoryId: 'productivity_digital_tools',
    questionText: 'In Google Docs, how does "Version History" protect team collaboration?',
    options: [
      'Allows managers to view who made specific edits at what time, and restore any previous version of the document with one click',
      'Automatically translates the document into ten different languages',
      'Locks the document so nobody can open it ever again',
      'Charges all collaborators a fee every time a word is typed'
    ],
    correctAnswer: 0,
    explanation: 'Version History provides an immutable audit trail, making accidental paragraph deletions completely reversible.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-16',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is a "Zap" in automation tools like Zapier or Make (Integromat)?',
    options: [
      'An automated workflow that connects two or more apps so that an event in one app triggers an action in another without code',
      'An electric shock delivered through a smartphone screen',
      'A software virus that deletes duplicate files from your desktop',
      'A feature that speeds up mobile internet downloads by 500%'
    ],
    correctAnswer: 0,
    explanation: 'Automation tools (like Zapier) link workflows (e.g. "When a Google Form is submitted, save row in Sheets and send a WhatsApp alert").',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-17',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Inbox Zero" in email management methodology?',
    options: [
      'An approach to processing incoming emails systematically into Action, Archive, or Delegate categories so your primary inbox stays empty',
      'Deleting all incoming emails without reading them to save cloud storage',
      'Closing your email account permanently and only using phone calls',
      'A bug where email servers refuse to deliver new messages'
    ],
    correctAnswer: 0,
    explanation: 'Inbox Zero reduces cognitive clutter by ensuring your inbox is a processing station rather than an overwhelming holding pen.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-18',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Markdown" (.md) commonly used in GitHub, Notion, and Discord?',
    options: [
      'A lightweight plain-text formatting syntax that converts symbols (like # for headers and * for bullets) into structured HTML',
      'A system for discounting grocery items by 50% in supermarkets',
      'A graphic design software used for drawing 3D animations',
      'A programming language used exclusively for calculating taxes'
    ],
    correctAnswer: 0,
    explanation: 'Markdown is portable, human-readable plain text that renders cleanly across code repositories, notes, and documentation tools.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-19',
    categoryId: 'productivity_digital_tools',
    questionText: 'When exporting a company logo graphic from Canva or Figma for use on websites, which format ensures a transparent background?',
    options: [
      'PNG with transparency enabled (or SVG vector)',
      'JPEG format with high compression',
      'Plain TXT text file',
      'Microsoft Word (.docx) document'
    ],
    correctAnswer: 0,
    explanation: 'JPEG files do not support alpha transparency (they fill transparent space with white); PNG and SVG preserve transparency cleanly.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-20',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Calendly" used for in executive virtual assistance and client booking?',
    options: [
      'Sharing a custom booking link where clients choose available meeting slots synced with your Google/Outlook calendar',
      'Designing artistic wall calendars to hang in an office',
      'Calculating how many days remain until national elections',
      'Deleting duplicate events from your computer calendar'
    ],
    correctAnswer: 0,
    explanation: 'Calendly eliminates frustrating email back-and-forths by presenting real-time availability synced across time zones.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-21',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is the purpose of "Slack Threads" in remote workplace communication?',
    options: [
      'Keeping specific discussions organized under a parent message to prevent channel clutter and maintain topical focus',
      'Sewing corporate branded t-shirts for company employees',
      'Connecting two fiber optic cables together in a network switch',
      'Recording private audio calls between team members secretly'
    ],
    correctAnswer: 0,
    explanation: 'Threading keeps public channels clean so team members can follow conversations relevant to their project without noise.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-22',
    categoryId: 'productivity_digital_tools',
    questionText: 'In Google Slides or Canva, what is "Master Slides" or "Brand Kit" styling?',
    options: [
      'Pre-configured font styles, brand colors, and slide layouts that apply consistently across every presentation in an organization',
      'A kit of physical painting brushes given to graphic design interns',
      'A software program that automatically translates slides into French',
      'A feature that limits presentations to exactly five slides'
    ],
    correctAnswer: 0,
    explanation: 'Brand kits and master slides enforce visual brand identity and save hours of repetitive formatting across decks.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-23',
    categoryId: 'productivity_digital_tools',
    questionText: 'What does "OCR" (Optical Character Recognition) do when scanning documents with Google Lens or Adobe Scan?',
    options: [
      'Converts text within images, camera captures, or scanned paper documents into editable, searchable digital text',
      'Cleans dust from the camera lens of your smartphone',
      'Measures the physical dimensions of a paper document',
      'Translates text into computer binary code (0s and 1s)'
    ],
    correctAnswer: 0,
    explanation: 'OCR transforms physical paper receipts, handwritten notes, and book pages into selectable text in seconds.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-24',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Batch Processing" in administrative productivity (e.g. handling emails or invoicing)?',
    options: [
      'Grouping similar routine tasks together and executing them in a single dedicated time block rather than context-switching all day',
      'Baking large quantities of bread in a commercial bakery',
      'Paying bank transaction fees in cash at a physical counter',
      'Submitting job applications at midnight to avoid internet traffic'
    ],
    correctAnswer: 0,
    explanation: 'Batching minimizes cognitive context-switching penalties, boosting focus and completing administrative tasks faster.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'prod-25',
    categoryId: 'productivity_digital_tools',
    questionText: 'In advanced project management, what is a "Gantt Chart"?',
    options: [
      'A visual horizontal bar chart illustrating a project schedule, dependency relationships, and milestone critical paths across calendar dates',
      'A pie chart showing company revenue broken down by country',
      'A list of employee phone numbers organized alphabetically',
      'A security map of a physical corporate office building'
    ],
    correctAnswer: 0,
    explanation: 'Gantt charts map task dependencies (e.g. Task B cannot start until Task A finishes) to identify scheduling bottlenecks.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'prod-26',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "Semantic Versioning" (SemVer, e.g. v2.4.1) used in digital software releases?',
    options: [
      'A 3-part versioning convention where changes denote MAJOR (breaking changes), MINOR (new features), and PATCH (bug fixes)',
      'A system for naming software releases after endangered animals',
      'A legal patent numbering scheme issued by the federal government',
      'A random number assigned by marketing managers to look impressive'
    ],
    correctAnswer: 0,
    explanation: 'SemVer conveys to users and automated systems whether an update introduces breaking architectural changes or safe patches.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'prod-27',
    categoryId: 'productivity_digital_tools',
    questionText: 'What does "Webhook" represent in modern API-driven cloud productivity integrations?',
    options: [
      'A real-time HTTP callback where an application automatically pushes payload notifications to another system immediately when an event occurs',
      'A physical hook used to hang server cables on a wall rack',
      'A fishing device used by marine biologists to tag sharks',
      'A security vulnerability that crashes web servers'
    ],
    correctAnswer: 0,
    explanation: 'Unlike polling (asking every 5 minutes "is there new data?"), webhooks push real-time event data instantly upon occurrence.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'prod-28',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is a "Standard Operating Procedure" (SOP) in virtual executive assistance and operations?',
    options: [
      'A documented, step-by-step instruction guide enabling any team member to execute a complex recurring process consistently without errors',
      'A government regulation issued by military personnel',
      'A software program that speeds up computer typing',
      'A disciplinary letter issued to an employee for arriving late'
    ],
    correctAnswer: 0,
    explanation: 'SOPs allow businesses to delegate operational tasks cleanly and scale without single-person dependency.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'prod-29',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "SSO" (Single Sign-On) in modern enterprise digital environments (like Google Workspace or Okta)?',
    options: [
      'An authentication scheme that allows a user to log in with a single ID and password to access multiple connected corporate applications securely',
      'A rule that permits only one person to work in an office at a time',
      'A single computer monitor shared between two employees',
      'A password that can only be used once and is then deleted forever'
    ],
    correctAnswer: 0,
    explanation: 'SSO reduces password fatigue, streamlines onboarding, and allows IT admins to revoke access across all apps with one click.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'prod-30',
    categoryId: 'productivity_digital_tools',
    questionText: 'What is "CI/CD" (Continuous Integration / Continuous Deployment) in modern product engineering?',
    options: [
      'Automated pipelines that build, test, and deploy code changes to production servers reliably without manual intervention',
      'A physical computer cable connecting the monitor to the CPU',
      'An accounting spreadsheet used to calculate daily retail revenue',
      'A corporate training workshop held every December'
    ],
    correctAnswer: 0,
    explanation: 'CI/CD ensures software updates pass automated test suites and deploy cleanly to users within minutes of merging code.',
    difficulty: 'advanced',
    active: true
  },

  // =========================================================================
  // 6. DATA & DIGITAL SKILLS (30 Questions: 12 Beginner, 12 Intermediate, 6 Advanced)
  // =========================================================================
  {
    questionId: 'data-01',
    categoryId: 'data_digital_skills',
    questionText: 'In Microsoft Excel or Google Sheets, which formula calculates the sum of all numbers in cells A1 through A10?',
    options: [
      '=SUM(A1:A10)',
      '=ADD(A1..A10)',
      '=TOTAL(A1-A10)',
      '=COUNT(A1:A10)'
    ],
    correctAnswer: 0,
    explanation: '=SUM(A1:A10) adds all numeric values within the specified contiguous cell range.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-02',
    categoryId: 'data_digital_skills',
    questionText: 'What is the primary difference between `=COUNT()` and `=COUNTA()` in spreadsheets?',
    options: [
      '=COUNT only counts cells containing numbers; =COUNTA counts all non-empty cells including text and numbers',
      '=COUNT counts letters; =COUNTA counts currency symbols',
      '=COUNT deletes blank rows; =COUNTA inserts new rows',
      'There is no difference; they are exact duplicates of each other'
    ],
    correctAnswer: 0,
    explanation: '=COUNTA (Count All) tallies any cell that is not empty, making it ideal for participant attendance rosters.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-03',
    categoryId: 'data_digital_skills',
    questionText: 'Why do Nigerian telephone numbers (like 08031234567) often lose their leading zero when pasted into spreadsheet cells?',
    options: [
      'Spreadsheets interpret the input as an integer number by default, and numbers do not display leading zeros',
      'The telecommunication provider has blocked the phone number',
      'The computer keyboard has a faulty zero key',
      'The phone number has expired and cannot receive calls'
    ],
    correctAnswer: 0,
    explanation: 'To retain the leading zero, format the column as "Plain Text" or type an apostrophe before the number (e.g. \'0803...).',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-04',
    categoryId: 'data_digital_skills',
    questionText: 'What is a "Pivot Table" in Google Sheets and Microsoft Excel?',
    options: [
      'An interactive analytical tool that summarizes, groups, and aggregates large datasets without writing complex formulas',
      'A wooden physical desk that rotates in an office',
      'A chart that only displays data in circular pie slices',
      'A formula that calculates the square root of negative numbers'
    ],
    correctAnswer: 0,
    explanation: 'Pivot tables allow you to slice large records (e.g. 2,000 corps members) by platoon, state, or score within seconds.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-05',
    categoryId: 'data_digital_skills',
    questionText: 'Which formula calculates the arithmetic average of test scores in column B from cell B2 to B50?',
    options: [
      '=AVERAGE(B2:B50)',
      '=MEAN(B2:B50)',
      '=MEDIAN(B2+B50)',
      '=DIVIDE(B2:B50)'
    ],
    correctAnswer: 0,
    explanation: '=AVERAGE(B2:B50) calculates the arithmetic mean of all numeric values in the range.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-06',
    categoryId: 'data_digital_skills',
    questionText: 'Which chart type is best suited for showing the proportion or percentage breakdown of a single whole category (e.g. platoon market share)?',
    options: [
      'Pie Chart or Donut Chart',
      'Scatter Plot with trendlines',
      'Candlestick Stock Chart',
      'Radar Spider Chart'
    ],
    correctAnswer: 0,
    explanation: 'Pie and donut charts show how parts relate to a 100% whole when comparing a small number of categories.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-07',
    categoryId: 'data_digital_skills',
    questionText: 'What does the `#DIV/0!` error in a spreadsheet cell indicate?',
    options: [
      'A formula is attempting to divide a number by zero or by a reference to an empty cell',
      'The computer processor has run out of battery power',
      'The cell contains a virus that must be deleted',
      'The internet connection was disconnected during calculation'
    ],
    correctAnswer: 0,
    explanation: 'Mathematically division by zero is undefined; using `=IFERROR(A1/B1, 0)` cleanly catches and resolves this display.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-08',
    categoryId: 'data_digital_skills',
    questionText: 'How can you lock the header row of a spreadsheet so it remains visible when scrolling down through 1,000 rows?',
    options: [
      'Use the "Freeze Rows" feature (View > Freeze > 1 row)',
      'Change the header font color to red',
      'Print the spreadsheet on paper and tape it to the screen',
      'Type the header titles in every single row manually'
    ],
    correctAnswer: 0,
    explanation: 'Freezing panes keeps header labels pinned at the top as you scroll through lengthy datasets.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-09',
    categoryId: 'data_digital_skills',
    questionText: 'What does `=IF(C2>=6, "Qualified", "Keep Practising")` do in cell D2?',
    options: [
      'Evaluates cell C2: if the score is 6 or higher it displays "Qualified", otherwise it displays "Keep Practising"',
      'Multiplies the number in C2 by 6',
      'Deletes cell C2 if the score is lower than 6',
      'Sends an automated email to the participant in C2'
    ],
    correctAnswer: 0,
    explanation: 'The IF logical function tests a condition and outputs one value for TRUE and another for FALSE.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-10',
    categoryId: 'data_digital_skills',
    questionText: 'What does "Data Cleaning" involve before analyzing a raw survey or registration dataset?',
    options: [
      'Removing duplicates, standardizing inconsistent text formats (e.g. "Lagos" vs "lagos "), and handling missing values',
      'Wiping the computer keyboard with sanitizing spray',
      'Deleting all rows that have numbers higher than 100',
      'Changing the font of all cells to Comic Sans'
    ],
    correctAnswer: 0,
    explanation: 'Data cleaning ensures integrity so analytics and calculations are not skewed by typos, trailing spaces, or duplicate entries.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-11',
    categoryId: 'data_digital_skills',
    questionText: 'Which spreadsheet feature automatically highlights cells in red if their value is below 50%?',
    options: [
      'Conditional Formatting',
      'AutoSum',
      'Spell Check',
      'Track Changes'
    ],
    correctAnswer: 0,
    explanation: 'Conditional formatting dynamically changes cell fill colors, borders, or text styles based on user-defined rules.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-12',
    categoryId: 'data_digital_skills',
    questionText: 'What is a "CSV" (Comma-Separated Values) file format?',
    options: [
      'A lightweight plain-text file format where tabular rows are stored with commas separating data columns',
      'A complex video recording file format',
      'An encrypted password vault file format',
      'An application program executable on Android devices'
    ],
    correctAnswer: 0,
    explanation: 'CSV is the universal standard for exporting and importing tabular datasets across software systems, databases, and spreadsheets.',
    difficulty: 'beginner',
    active: true
  },
  {
    questionId: 'data-13',
    categoryId: 'data_digital_skills',
    questionText: 'What is the primary advantage of `=XLOOKUP()` over the legacy `=VLOOKUP()` function?',
    options: [
      'XLOOKUP can search in any direction (left or right), does not require column index numbers, and defaults to exact match',
      'XLOOKUP only works on mobile phones with 5G internet',
      'XLOOKUP automatically calculates national tax brackets',
      'XLOOKUP changes the background color of the worksheet'
    ],
    correctAnswer: 0,
    explanation: 'XLOOKUP eliminates brittle column numbering and can return data to the left of the search key, making formulas robust against column insertions.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-14',
    categoryId: 'data_digital_skills',
    questionText: 'Which formula counts the number of participants from Platoon 3 who scored 6 or higher in column D (platoon) and column E (score)?',
    options: [
      '=COUNTIFS(D2:D100, 3, E2:E100, ">=6")',
      '=COUNTIF(D2:D100, 3 + E2:E100 >= 6)',
      '=SUMIF(D2:D100 = 3, E2:E100 = 6)',
      '=TOTAL(D2:E100, "Platoon 3 and 6")'
    ],
    correctAnswer: 0,
    explanation: '=COUNTIFS evaluates multiple criteria across separate ranges simultaneously using AND logic.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-15',
    categoryId: 'data_digital_skills',
    questionText: 'What does the `=TRIM()` function do in data cleaning workflows?',
    options: [
      'Removes all leading, trailing, and repeated excess spaces from text strings, leaving only single spaces between words',
      'Cuts the height of the row by 50%',
      'Deletes the first three letters of every word in a column',
      'Truncates numbers down to the nearest integer'
    ],
    correctAnswer: 0,
    explanation: 'Invisible leading or trailing spaces often break lookup formulas; TRIM strips them clean.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-16',
    categoryId: 'data_digital_skills',
    questionText: 'In business intelligence, what is the difference between a "Metric" and a "Dimension"?',
    options: [
      'A metric is a quantitative numerical measurement (e.g. Total Revenue); a dimension is a qualitative attribute used to slice data (e.g. Platoon or State)',
      'A metric is a chart; a dimension is a table',
      'A metric is stored on a laptop; a dimension is stored in the cloud',
      'There is no difference; they are exact synonyms'
    ],
    correctAnswer: 0,
    explanation: 'Dimensions segment data (Who, What, Where); metrics measure performance (How many, How much).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-17',
    categoryId: 'data_digital_skills',
    questionText: 'What does the dollar sign ($) do in a formula reference like `=$A$1*B1`?',
    options: [
      'Locks cell A1 as an absolute reference so it does not shift when the formula is dragged or copied down columns and rows',
      'Converts the number into US Dollar currency format',
      'Indicates that the calculation requires an internet connection',
      'Applies a corporate discount to the calculation'
    ],
    correctAnswer: 0,
    explanation: 'Absolute cell referencing ($A$1) freezes the row and column coordinates during formula replication.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-18',
    categoryId: 'data_digital_skills',
    questionText: 'What chart type is best for displaying the change in a metric over continuous chronological time (e.g. daily registrations across orientation camp)?',
    options: [
      'Line Chart',
      'Radar Chart',
      'Pie Chart',
      'TreeMap'
    ],
    correctAnswer: 0,
    explanation: 'Line charts are the gold standard for visualizing trends, accelerations, and dips across continuous time intervals.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-19',
    categoryId: 'data_digital_skills',
    questionText: 'What does `=PROPER(A2)` do to the text "john doe adeyemi"?',
    options: [
      'Capitalizes the first letter of each word to produce "John Doe Adeyemi"',
      'Converts all letters to uppercase: "JOHN DOE ADEYEMI"',
      'Translates the name into formal British English',
      'Checks whether the name appears on the national voters register'
    ],
    correctAnswer: 0,
    explanation: '=PROPER capitalizes the initial letter of every word, standardizing messy participant name entries.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-101',
    categoryId: 'data_digital_skills',
    questionText: 'What does Google Looker Studio (formerly Data Studio) allow you to create?',
    options: [
      'Interactive, real-time visual dashboards and executive reports connected directly to Google Sheets or databases',
      'Short animated comedy videos for social media',
      'Three-dimensional architectural house blueprints',
      'Hardware drivers for laser printers'
    ],
    correctAnswer: 0,
    explanation: 'Looker Studio transforms static spreadsheet tables into beautiful, interactive stakeholder dashboards.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-21',
    categoryId: 'data_digital_skills',
    questionText: 'What does the `=UNIQUE()` formula do in Google Sheets and modern Excel?',
    options: [
      'Returns a list of distinct, deduplicated values from a range, removing all repeated entries automatically',
      'Generates a random 10-digit identification password',
      'Highlights the highest score in the column in gold color',
      'Sorts numbers in descending alphabetical order'
    ],
    correctAnswer: 0,
    explanation: '=UNIQUE extracts distinct items from a messy list (e.g. getting a clean list of all participating states).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-22',
    categoryId: 'data_digital_skills',
    questionText: 'What is a "Data Dictionary" in database management and research projects?',
    options: [
      'A reference document describing the meaning, data types, constraints, and source of every field in a dataset',
      'An English dictionary stored on an external USB hard drive',
      'A software program that corrects spelling mistakes in emails',
      'A list of all computer passwords used by the analytics team'
    ],
    correctAnswer: 0,
    explanation: 'Data dictionaries prevent ambiguity by documenting what each column name (e.g. `is_qual`) explicitly represents.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-23',
    categoryId: 'data_digital_skills',
    questionText: 'What does the `=SUMIFS()` formula do when analyzing camp platoon performance?',
    options: [
      'Adds numeric values in a sum range only when multiple specified criteria are met across other columns',
      'Sums all numbers in the entire spreadsheet regardless of criteria',
      'Multiplies all numbers in two different columns together',
      'Divides the first number by the second number'
    ],
    correctAnswer: 0,
    explanation: '=SUMIFS calculates conditional totals based on multiple rules (e.g. total score for Platoon 5 in Round 1).',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-24',
    categoryId: 'data_digital_skills',
    questionText: 'What does "Data Skewness" or "Outliers" do to the arithmetic mean of a dataset?',
    options: [
      'Extreme outliers can heavily distort the mean, making the median a more reliable measure of central tendency',
      'Outliers automatically crash the spreadsheet software application',
      'Outliers have zero mathematical impact on the mean calculation',
      'Outliers convert all positive numbers into negative numbers'
    ],
    correctAnswer: 0,
    explanation: 'A few extreme values (like one billionaire in a room of students) distort the mean; the median reflects the true midpoint.',
    difficulty: 'intermediate',
    active: true
  },
  {
    questionId: 'data-25',
    categoryId: 'data_digital_skills',
    questionText: 'What is a "Composite Primary Key" in relational database modeling?',
    options: [
      'A primary key composed of two or more combined columns (e.g. `quizRoundId` + `participantId`) that together uniquely identify a record',
      'A physical brass key used to open two different computer locks',
      'A password that contains both uppercase and lowercase letters',
      'A database table that has no records inside it'
    ],
    correctAnswer: 0,
    explanation: 'Composite keys guarantee record uniqueness when no single field alone is unique (e.g. one attempt per round per user).',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'data-26',
    categoryId: 'data_digital_skills',
    questionText: 'In SQL database queries, what is the difference between an `INNER JOIN` and a `LEFT JOIN`?',
    options: [
      '`INNER JOIN` returns only rows with matching keys in both tables; `LEFT JOIN` returns all rows from the left table regardless of matches in the right',
      '`INNER JOIN` deletes duplicate rows; `LEFT JOIN` inserts new rows',
      '`INNER JOIN` is for numbers; `LEFT JOIN` is for text strings',
      'There is no difference; both return identical query outputs'
    ],
    correctAnswer: 0,
    explanation: 'A LEFT JOIN preserves every row from the primary table (e.g. all participants) even if they have no corresponding quiz results.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'data-27',
    categoryId: 'data_digital_skills',
    questionText: 'What is "Database Normalization" (e.g. 1NF, 2NF, 3NF)?',
    options: [
      'Organizing database tables and fields to eliminate data redundancy and prevent insert, update, and delete anomalies',
      'Resetting a database password back to the factory default setting',
      'Translating column headers into standard British English',
      'Compressing database files to save physical hard disk space'
    ],
    correctAnswer: 0,
    explanation: 'Normalization breaks data into logical tables linked by foreign keys, ensuring data is stored in exactly one source of truth.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'data-28',
    categoryId: 'data_digital_skills',
    questionText: 'What is a "Window Function" in modern SQL (e.g. `ROW_NUMBER() OVER (PARTITION BY platoon ORDER BY score DESC)`)?',
    options: [
      'Performs a calculation across a set of table rows related to the current row without collapsing the rows into a single group like `GROUP BY`',
      'Opens a new popup window on the user’s computer screen',
      'Deletes all records that were created through a Microsoft Windows computer',
      'Limits query execution time to exactly 60 seconds'
    ],
    correctAnswer: 0,
    explanation: 'Window functions calculate running totals, rankings, and moving averages while preserving individual row details.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'data-29',
    categoryId: 'data_digital_skills',
    questionText: 'In data warehousing, what is the "Star Schema" architecture?',
    options: [
      'A dimensional model consisting of a central Fact Table (recording quantitative metrics) surrounded by multiple Dimension Tables (descriptive attributes)',
      'A network diagram where all computers connect to one central Wi-Fi router in the shape of a star',
      'A software program that tracks astrological star movements',
      'A spreadsheet layout where cell borders are colored in gold stars'
    ],
    correctAnswer: 0,
    explanation: 'Star schemas simplify analytical reporting queries (OLAP) and dramatically speed up aggregation performance in data warehouses.',
    difficulty: 'advanced',
    active: true
  },
  {
    questionId: 'data-30',
    categoryId: 'data_digital_skills',
    questionText: 'What does "ETL" stand for in enterprise data engineering pipelines?',
    options: [
      'Extract, Transform, Load (extracting data from source systems, transforming and cleaning it, and loading it into an analytical data warehouse)',
      'Electronic Telecom License',
      'Emergency Transmission Location',
      'Encrypted Transport Layer'
    ],
    correctAnswer: 0,
    explanation: 'ETL pipelines ingest raw operational data, validate and reshape it, and load it into analytical warehouses for business reporting.',
    difficulty: 'advanced',
    active: true
  }
];

export function getQuestionsByCategory(categoryId: string): BankQuestion[] {
  return QUESTION_BANK.filter((q) => q.categoryId === categoryId && q.active);
}
