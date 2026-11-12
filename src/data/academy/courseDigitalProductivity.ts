import { AcademyCourse } from '../../types';

export const COURSE_DIGITAL_PRODUCTIVITY: AcademyCourse = {
  courseId: 'course_digital_productivity',
  categoryId: 'productivity_digital_tools',
  title: 'Digital Productivity, Google Workspace and Collaboration',
  description: 'A comprehensive, hands-on productivity course teaching corps members how to streamline administrative workflows, master Google Workspace (Docs, Sheets, Slides, Forms, Drive), manage tasks asynchronously, automate repetitive friction, and collaborate seamlessly across modern digital teams.',
  targetAudience: 'Serving NYSC Corps Members, teachers, virtual assistants, project officers, team leads, and administrative coordinators.',
  entryRequirements: 'A smartphone or computer with internet access and a personal Google account.',
  expectedDuration: '4 Weeks (Self-Paced • 12 Core Lessons)',
  themeColor: 'teal',
  iconName: 'Zap',
  active: true,
  version: '2026.1',
  learningObjectives: [
    {
      id: 'PROD-FND-01',
      code: 'PROD-FND-01',
      title: 'Digital Productivity Foundations & Cloud Organization',
      description: 'Master hierarchical file naming, Google Drive sharing permissions, calendar time-blocking, and digital task prioritization.'
    },
    {
      id: 'PROD-DOC-02',
      code: 'PROD-DOC-02',
      title: 'Professional Documents, Presentations & Form Data Collection',
      description: 'Format structured Google Docs with styles, design clean Google Slides presentations, and configure automated Google Forms.'
    },
    {
      id: 'PROD-SHT-03',
      code: 'PROD-SHT-03',
      title: 'Spreadsheets for Everyday Workplace Efficiency',
      description: 'Perform essential calculations (SUM, AVERAGE, COUNT, IF), clean messy records, and organize data with sorting and filtering.'
    },
    {
      id: 'PROD-COL-04',
      code: 'PROD-COL-04',
      title: 'Cloud Collaboration, Team Workflows & Automation',
      description: 'Collaborate with comments/version history in cloud docs, manage video meetings across time zones, and eliminate manual busywork.'
    }
  ],
  modules: [
    {
      moduleId: 'mod_prd_1',
      courseId: 'course_digital_productivity',
      sequence: 1,
      sequenceLabel: 'Module 1',
      title: 'Digital Productivity Foundations and File Management',
      description: 'Transform cluttered desktop and phone storage into a structured, searchable cloud workplace with Google Drive and time-blocking.',
      learningObjectiveIds: ['PROD-FND-01'],
      lessons: [
        {
          lessonId: 'lesson_prd_1_1',
          moduleId: 'mod_prd_1',
          courseId: 'course_digital_productivity',
          title: 'Understanding Digital Productivity and Workflow Optimization',
          sequence: 1,
          sequenceLabel: 'Lesson 1.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['PROD-FND-01'],
          introduction: 'Productivity is not about working 16 hours a day until exhaustion; it is about eliminating friction, automating repetitive busywork, and focusing cognitive energy on high-value outcomes.',
          lessonContent: [
            'The High Cost of Digital Friction: Knowledge workers lose up to 2.5 hours every day searching for lost files, re-typing unorganized notes, and clarifying ambiguous instructions.',
            'The Four Quadrants of Time Management (The Eisenhower Matrix):',
            '• Urgent & Important (Crises, immediate deadlines) → DO immediately.',
            '• Not Urgent but Important (Skill building, health, strategic planning) → SCHEDULE dedicated focus time.',
            '• Urgent but Not Important (Most interruptions, certain phone calls) → DELEGATE or automate.',
            '• Neither Urgent nor Important (Aimless social media doom-scrolling) → ELIMINATE.',
            'Choosing the Right Tool for the Job: Avoid tool overload. Maintain a minimal, integrated productivity stack: Google Workspace for documents/spreadsheets, Trello/Notion for project tracking, and Google Calendar for time management.'
          ],
          nigerianContextExamples: [
            'A corps member teaching at a PPA using the Eisenhower Matrix to prioritize term grading over random school administrative errands.',
            'Organizing CDS committee assignments into clear digital deliverables rather than holding unfocused 3-hour physical meetings under the sun.'
          ],
          practicalDemonstration: 'Map out a typical workday using the Eisenhower Matrix: Categorizing 10 daily activities into Do, Schedule, Delegate, and Eliminate.',
          handsOnExercise: {
            title: 'Audit Your Weekly Digital Time Drain and Apply the Matrix',
            task: 'Track your daily activities for 24 hours and categorize tasks into the Eisenhower Matrix.',
            steps: [
              'List 8 tasks you completed yesterday.',
              'Categorize each into Q1, Q2, Q3, or Q4.',
              'Identify at least two Q4 time-wasters to eliminate this week.'
            ],
            deliverable: 'Your completed personal Eisenhower Matrix classification sheet.'
          },
          keyTakeaways: [
            'Productivity means maximizing impact per hour, not just staying busy.',
            'Prioritize Quadrant 2 (Important, Not Urgent) tasks to achieve long-term career growth.',
            'Keep your productivity stack minimal and deeply integrated.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_1_1_1',
              questionText: 'Under the Eisenhower Productivity Matrix, which quadrant of activities drives long-term career success and personal growth?',
              options: [
                'Quadrant 4: Mindless entertainment and endless social media scrolling',
                'Quadrant 2: Important but Not Urgent tasks (such as skill learning, strategic planning, and building portfolios)',
                'Quadrant 3: Urgent interruptions from colleagues that produce no long-term value',
                'Quadrant 1: Constant last-minute emergencies caused by poor planning'
              ],
              correctAnswer: 1,
              explanation: 'Quadrant 2 activities build strategic advantage and prevent crises before they happen, making them the foundation of high productivity.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_1_2',
          moduleId: 'mod_prd_1',
          courseId: 'course_digital_productivity',
          title: 'File and Document Management in Google Drive',
          sequence: 2,
          sequenceLabel: 'Lesson 1.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['PROD-FND-01'],
          introduction: 'Stop losing critical documents. Learn professional file naming conventions, cloud folder hierarchies, and how to configure precise Google Drive sharing permissions.',
          lessonContent: [
            'Standardized ISO File Naming Conventions: Avoid unsearchable file names like `Doc1.docx`, `final_final_v2.pdf`, or `letter.docx`. Always use: `[YYYY-MM-DD]_[Category]_[Descriptive_Title]_[Version]`. E.g., `2026-03-15_NYSC_Lagos_PPA_Leave_Application_v1.pdf`. This automatically sorts files chronologically in any file explorer.',
            'Hierarchical Folder Architecture: Organize Google Drive with a clean 3-level folder structure: 1. Main Domains (e.g. `01_NYSC_Service`, `02_Professional_Career`, `03_Personal_Finance`); 2. Sub-Folders (e.g. `01_NYSC_Service/PPA_Teaching_Materials`); 3. Project Folders.',
            'Google Drive Access Permissions Explained:',
            '• Viewer: Can only view the document; cannot edit or comment.',
            '• Commenter: Can highlight text and suggest revisions without altering original content.',
            '• Editor: Full editing access; can modify text, delete data, and alter formulas.',
            '• Restricted vs. Anyone with the Link: When sharing with external clients or principals, choose "Anyone with the link can View" to prevent frustrating "Request Access" permission walls.'
          ],
          nigerianContextExamples: [
            'A corps member managing official school attendance records giving teachers "Editor" access to update marks, but giving parents "Viewer" access so records cannot be tampered with.',
            'Naming CDS project invoices with ISO dates so the CDS president can instantly find the March borehole receipts.'
          ],
          practicalDemonstration: 'Demonstrate Google Drive sharing: Change permissions from "Restricted" to "Anyone with the link can View", test in an incognito window, and demonstrate adding a Commenter.',
          handsOnExercise: {
            title: 'Build a Professional 3-Tier Google Drive Folder Structure',
            task: 'Set up an organized folder hierarchy in your personal Google Drive and apply ISO file naming.',
            steps: [
              'Create 3 root folders numbered `01_NYSC_Service`, `02_Career_Development`, `03_Projects`.',
              'Create at least 2 subfolders within each root folder.',
              'Upload 2 files renamed using the `YYYY-MM-DD_Category_Title_v1` format.',
              'Generate a view-only share link to one folder.'
            ],
            deliverable: 'A view-only share link or screenshot of your structured Google Drive directory.'
          },
          keyTakeaways: [
            'Use `YYYY-MM-DD_Category_Title` naming to keep files organized chronologically.',
            'Assign appropriate permissions: Viewer for broad audiences, Editor only for trusted collaborators.',
            'Test shareable links in an incognito window to ensure recipients will not hit permission walls.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_1_2_1',
              questionText: 'When sharing a project proposal document with an external school principal or corporate sponsor via Google Drive, which permission level should you select by default?',
              options: [
                'Full Editor access with permission to delete files',
                'Viewer (Anyone with the link can View) so they can read the document immediately without altering or corrupting your content',
                'Owner with billing permissions',
                'Restricted access where only people with @google.com emails can open it'
              ],
              correctAnswer: 1,
              explanation: 'Viewer permissions allow external recipients to view the document without risk of accidental text deletion or formula corruption.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_1_3',
          moduleId: 'mod_prd_1',
          courseId: 'course_digital_productivity',
          title: 'Time and Task Management: Google Calendar and Digital Checklists',
          sequence: 3,
          sequenceLabel: 'Lesson 1.3',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['PROD-FND-01'],
          introduction: 'If an appointment is not on your digital calendar, it does not exist. Learn how to time-block your day in Google Calendar, configure smart recurring reminders, and maintain action checklists in Google Tasks or Trello.',
          lessonContent: [
            'The Philosophy of Time-Blocking: Instead of keeping an overwhelming 20-item to-do list, assign specific calendar blocks to individual tasks. If a task takes 45 minutes, block 9:00 AM - 9:45 AM on your calendar.',
            'Setting Up Color-Coded Google Calendars: Maintain separate calendars under one account: 1. PPA Duties (Blue); 2. Personal Learning & Courses (Green); 3. CDS Activities (Yellow); 4. Urgent Deadlines (Red). Color-coding gives an instant visual heatmap of your weekly balance.',
            'Smart Recurring Events & Notifications: Set recurring notifications for monthly clearance deadlines, biometric verification days, and weekly CDS meetings with reminders 24 hours and 2 hours in advance.',
            'Digital Task Checklists (Google Tasks / Trello): Capture sudden tasks immediately into Google Tasks linked directly to your Gmail inbox. Convert important emails into actionable to-do items with 1 click.'
          ],
          nigerianContextExamples: [
            'Setting recurring Google Calendar notifications with alarms for monthly NYSC biometric clearance dates so you never incur missed clearance penalties.',
            'Time-blocking 2 hours every Saturday morning for learning digital skills and completing Academy courses.'
          ],
          practicalDemonstration: 'Demonstrate turning an incoming email in Gmail into an actionable task in Google Tasks with a scheduled due date and time notification.',
          handsOnExercise: {
            title: 'Design a Complete Time-Blocked Week in Google Calendar',
            task: 'Configure a realistic 7-day time-blocked calendar schedule in Google Calendar.',
            steps: [
              'Create separate color-coded categories for PPA, Learning, and Personal.',
              'Schedule at least three 90-minute deep focus learning blocks.',
              'Set a recurring reminder for your weekly CDS meeting with a 2-hour notification.',
              'Add at least 3 actionable tasks to Google Tasks.'
            ],
            deliverable: 'A screenshot or shared view of your time-blocked Google Calendar.'
          },
          keyTakeaways: [
            'Time-blocking transforms wishful to-do lists into scheduled, committed focus hours.',
            'Color-coded calendar categories reveal how your time is allocated at a glance.',
            'Integrate Google Tasks with Gmail to convert emails into accountable action items.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_1_3_1',
              questionText: 'What is the primary advantage of "Time-Blocking" on a digital calendar over maintaining a long, unorganized to-do list?',
              options: [
                'It automatically does the work for you while you sleep',
                'It assigns specific dedicated hours in your day to focused tasks, creating realistic commitments and preventing overbooking',
                'It turns off your phone battery',
                'It guarantees you will never have to work again'
              ],
              correctAnswer: 1,
              explanation: 'Time-blocking allocates finite hours to specific priorities, establishing realistic pacing and protecting focus.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_prd_2',
      courseId: 'course_digital_productivity',
      sequence: 2,
      sequenceLabel: 'Module 2',
      title: 'Document, Presentation, and Data Collection Tools',
      description: 'Master professional document formatting in Google Docs, compelling presentation slide design in Google Slides, and automated survey collection with Google Forms.',
      learningObjectiveIds: ['PROD-DOC-02'],
      lessons: [
        {
          lessonId: 'lesson_prd_2_1',
          moduleId: 'mod_prd_2',
          courseId: 'course_digital_productivity',
          title: 'Creating Professional Documents in Google Docs and Microsoft Word',
          sequence: 1,
          sequenceLabel: 'Lesson 2.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['PROD-DOC-02'],
          introduction: 'Move beyond messy unformatted text. Learn paragraph typography, built-in heading styles (Heading 1, 2, 3), automated Tables of Contents, header/footer page numbering, and professional tables.',
          lessonContent: [
            'Why Heading Styles Matter: Never format headings manually by making text bold and size 18! Use Google Docs Paragraph Styles (`Heading 1`, `Heading 2`). Built-in styles generate automated Tables of Contents, make documents screen-reader accessible, and enable quick navigation via the Document Outline sidebar.',
            'Headers, Footers, and Page Numbering: Professional reports require clean page numbering (e.g. `Page X of Y` in the footer) and running headers with the document title and organization name.',
            'Formatting Tables for Executive Readability: Use clean borders, light alternating row shading, bold centered column headers, and keep cell text left-aligned while aligning numbers to the right.',
            'Voice Typing in Google Docs: Speed up drafting by utilizing Tools → Voice Typing to dictate lesson notes or reports in clear English, saving hours of manual keyboard typing on mobile or laptop.'
          ],
          nigerianContextExamples: [
            'Formatting an official 10-page CDS Community Project Proposal with an automated Table of Contents that updates page numbers with 1 click.',
            'Using Voice Typing to rapidly dictate secondary school history lesson notes into Google Docs on a smartphone.'
          ],
          practicalDemonstration: 'Demonstrate inserting an automated Table of Contents with page numbers in Google Docs based on Heading 1 and Heading 2 tags.',
          handsOnExercise: {
            title: 'Format an Executive 2-Page Project Proposal Document',
            task: 'Format a clean, professional document using styles, headers, footers, and a structured table.',
            steps: [
              'Apply Title, Heading 1, and Heading 2 styles.',
              'Insert an automated Table of Contents at the top.',
              'Add a running header and footer with page numbering.',
              'Include a 3-column budget table with bold headers and right-aligned numbers.'
            ],
            deliverable: 'A link or PDF export of your formatted 2-page project proposal.'
          },
          keyTakeaways: [
            'Use Paragraph Styles (Heading 1, 2) to unlock automated Tables of Contents and outlines.',
            'Align text left and numbers right in tables for effortless financial readability.',
            'Voice Typing significantly accelerates initial first-draft document creation.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_2_1_1',
              questionText: 'In Google Docs, why should you apply "Heading 1" and "Heading 2" styles instead of just making text bold and increasing font size manually?',
              options: [
                'Styles change the language of the document',
                'Built-in heading styles structure the document outline, enable 1-click automated Tables of Contents, and maintain consistent formatting',
                'Heading styles are required by law for printing in Nigeria',
                'Bold text makes the file size too large to send via email'
              ],
              correctAnswer: 1,
              explanation: 'Heading styles establish document hierarchy, allowing Google Docs to generate automated tables of contents and dynamic outlines.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_2_2',
          moduleId: 'mod_prd_2',
          courseId: 'course_digital_productivity',
          title: 'Creating Effective Presentations in Google Slides and PowerPoint',
          sequence: 2,
          sequenceLabel: 'Lesson 2.2',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['PROD-DOC-02'],
          introduction: 'Boring slide decks packed with 50 words of tiny text cause "Death by PowerPoint." Learn the 10-20-30 rule, slide visual hierarchy, contrast, and visual storytelling.',
          lessonContent: [
            'The Purpose of Slides: Slides are visual aids for your audience, NOT a teleprompter script for the speaker! If your slide contains every word you intend to say, the audience will read ahead and ignore your speech.',
            'The 10-20-30 Rule & The Rule of 6: Keep presentations concise (around 10 slides, under 20 minutes, minimum 30pt font size). No slide should have more than 6 bullet points, and no bullet point should exceed 6 words.',
            'High-Contrast Visual Design: Dark text on clean white/light backgrounds or white text on dark navy backgrounds. Never use yellow text on white backgrounds or unreadable decorative script fonts.',
            'Using High-Quality Visuals and Charts: Replace walls of text with bold photography, icons from Flaticon, or clean charts that illustrate a single clear point per slide.'
          ],
          nigerianContextExamples: [
            'Pitching a community sanitation project to local government officials using 5 bold slides featuring real photos of the community issue rather than 20 text-heavy slides.',
            'Presenting an educational masterclass to students using clean Canva or Google Slides templates.'
          ],
          practicalDemonstration: 'Demonstrate redesigning an awful text-cluttered slide into a modern, visually striking 3-column icon-and-stat slide in Google Slides.',
          handsOnExercise: {
            title: 'Design a 5-Slide Executive Pitch Deck',
            task: 'Create a compelling 5-slide presentation on any educational, community, or business topic.',
            steps: [
              'Slide 1: Title & Presenter Info (clean, bold font).',
              'Slide 2: The Core Problem (photo + 1 key statistic).',
              'Slide 3: Proposed Solution (3 bullet points, under 6 words each).',
              'Slide 4: Project Budget & Timeline (clean comparison table).',
              'Slide 5: Call to Action & Contact Details.'
            ],
            deliverable: 'A view-only share link to your 5-slide Google Slides presentation.'
          },
          keyTakeaways: [
            'Slides are visual anchors for the audience, not a reading script for the presenter.',
            'Use minimum 30pt font sizes to guarantee readability from the back of the room.',
            'Limit slides to one core idea, supported by clean imagery or icons.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_2_2_1',
              questionText: 'What is the primary design rule for creating effective presentation slides in Google Slides?',
              options: [
                'Paste your entire spoken speech word-for-word in 10pt font so everyone can read along',
                'Keep slides visual, minimal, and uncluttered with large readable fonts (30pt+), using slides as visual anchors rather than teleprompters',
                'Use at least 15 different bright colors on every single slide',
                'Never use any photos or charts'
              ],
              correctAnswer: 1,
              explanation: 'Clean, visually striking slides with minimal text anchor audience attention without overwhelming them with text.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_2_3',
          moduleId: 'mod_prd_2',
          courseId: 'course_digital_productivity',
          title: 'Creating Online Forms and Collecting Data with Google Forms',
          sequence: 3,
          sequenceLabel: 'Lesson 2.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['PROD-DOC-02'],
          introduction: 'Eliminate paper questionnaires and messy manual registration sheets. Master Google Forms to collect survey responses, event registrations, and quiz submissions directly into Google Sheets.',
          lessonContent: [
            'Configuring Google Forms:',
            '• Choosing the Right Question Type: Short answer (names), Paragraph (feedback), Multiple Choice (single selection), Checkboxes (multiple selections), Dropdown (selecting state/platoon), and File Upload (submitting assignments).',
            '• Form Validation Rules: Enforce input rules: E.g., requiring phone numbers to be numbers only, or verifying email formatting before submission.',
            '• Section Breaks & Conditional Logic (Go to section based on answer): Branch users to specific questions based on their answers (e.g. if Platoon = 1, go to Platoon 1 schedule).',
            '• Linking Directly to Google Sheets: Never copy form entries by hand! Click "Link to Sheets" to have every submission automatically populate a live spreadsheet in real time.',
            'Shortening Links & QR Codes: Generate short URLs and QR codes for effortless mobile phone scanning during events or in classrooms.'
          ],
          nigerianContextExamples: [
            'A corps member organizing a digital literacy workshop creating a Google Form registration link and printing a QR code on orientation camp flyers for instant signups.',
            'Conducting a PPA student feedback survey where submissions automatically update an attendance sheet.'
          ],
          practicalDemonstration: 'Demonstrate creating a Google Form, toggling "Collect Email Addresses", linking it to a Google Sheet, and watching a live submission appear in real time.',
          handsOnExercise: {
            title: 'Build and Deploy a 6-Question Event Registration Form',
            task: 'Create an online registration form linked to a live Google Sheet with input validation.',
            steps: [
              'Add: Full Name, NYSC State Code, Platoon (Dropdown 1-10), Phone Number (with number validation), and Interest Track.',
              'Enable "Link to Google Sheets".',
              'Test the form with 1 sample submission and verify that the row appears in your spreadsheet.'
            ],
            deliverable: 'Your public Google Form link and a screenshot of the connected spreadsheet.'
          },
          keyTakeaways: [
            'Google Forms eliminates paper data collection errors and manual data entry.',
            'Use Response Validation to prevent invalid phone numbers or broken email addresses.',
            'Always link forms to Google Sheets for real-time analysis and reporting.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_2_3_1',
              questionText: 'What is the primary operational advantage of linking a Google Form directly to Google Sheets?',
              options: [
                'It sends an SMS to all mobile numbers in Nigeria',
                'Every new form response is automatically recorded as a new row in your spreadsheet in real time, eliminating manual data entry',
                'It charges a fee for each submission',
                'It deletes the form after 10 responses'
              ],
              correctAnswer: 1,
              explanation: 'Direct Sheets integration automatically captures all incoming submissions in a structured spreadsheet in real time without manual copying.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_prd_3',
      courseId: 'course_digital_productivity',
      sequence: 3,
      sequenceLabel: 'Module 3',
      title: 'Spreadsheets for Everyday Workplace Efficiency',
      description: 'Master practical spreadsheet arithmetic, conditional logic, data sorting, and filters to streamline administrative tasks.',
      learningObjectiveIds: ['PROD-SHT-03'],
      lessons: [
        {
          lessonId: 'lesson_prd_3_1',
          moduleId: 'mod_prd_3',
          courseId: 'course_digital_productivity',
          title: 'Understanding Spreadsheet Anatomy, Cells, and Data Types',
          sequence: 1,
          sequenceLabel: 'Lesson 3.1',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['PROD-SHT-03'],
          introduction: 'Spreadsheets are the universal operating system of modern business. Learn how workbooks, worksheets, columns, rows, cells, and data types (Text, Number, Date, Currency) interact.',
          lessonContent: [
            'The Grid System: Columns are labeled with letters (A, B, C); Rows are labeled with numbers (1, 2, 3). The intersection is a unique cell reference: `B4`.',
            'Data Types and Formatting: Text aligns LEFT by default; Numbers align RIGHT by default. If a number aligns to the left, it is stored as text and formulas will fail! Format numbers properly as Currency (NGN), Percentages (%), or Dates (YYYY-MM-DD).',
            'Relative vs. Absolute Cell References: When you drag a formula down, `A1` automatically shifts to `A2` (Relative). Adding dollar signs (`$A$1`) locks the cell reference so it never shifts when copied (Absolute Reference).',
            'Freezing Header Panes: When scrolling through 500 student or client rows, freeze row 1 (`View → Freeze → 1 row`) so table headers remain visible at all times.'
          ],
          nigerianContextExamples: [
            'Freezing the top header row on a secondary school grade sheet so teachers can see column subjects while scrolling down 100 student rows.',
            'Using absolute reference `$C$1` to apply a fixed exchange rate (USD to NGN) across 50 project items.'
          ],
          practicalDemonstration: 'Demonstrate dragging a formula with a relative reference vs. an absolute reference `$B$1`, showing how the calculation breaks without the dollar sign lock.',
          handsOnExercise: {
            title: 'Build a Basic Project Budget Table with Frozen Panes',
            task: 'Create a clean, formatted budget table in Google Sheets with proper number formats and frozen headers.',
            steps: [
              'Create columns: Item Name, Category, Quantity, Unit Price, and Total Cost.',
              'Freeze Row 1 (Header row).',
              'Format Unit Price as Currency (Naira).',
              'Enter 5 project items.'
            ],
            deliverable: 'A shared link or screenshot of your formatted spreadsheet table.'
          },
          keyTakeaways: [
            'Numbers align right; text aligns left. Left-aligned numbers indicate formatting errors.',
            'Use `$A$1` (Absolute Reference) to lock specific constants like tax rates or exchange rates.',
            'Freeze header rows to maintain context while scrolling through large datasets.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_3_1_1',
              questionText: 'In a Google Sheets formula, what is the purpose of placing dollar signs in a cell reference like `$B$1`?',
              options: [
                'It converts the cell value into US Dollars',
                'It creates an Absolute Reference that locks the cell so it does not shift when the formula is copied or dragged down to other rows',
                'It hides the cell from unauthorized viewers',
                'It multiplies the cell value by 100'
              ],
              correctAnswer: 1,
              explanation: 'Dollar signs create absolute references, locking the row and column coordinates so they remain fixed when formulas are copied.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_3_2',
          moduleId: 'mod_prd_3',
          courseId: 'course_digital_productivity',
          title: 'Essential Productivity Formulas: SUM, AVERAGE, COUNT, and IF',
          sequence: 2,
          sequenceLabel: 'Lesson 3.2',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['PROD-SHT-03'],
          introduction: 'Every formula in a spreadsheet begins with an equals sign (`=`). Master the essential formulas that power 90% of daily business and school calculations.',
          lessonContent: [
            '1. `=SUM(range)`: Adds all numbers in a range. E.g., `=SUM(E2:E20)` sums total project expenses.',
            '2. `=AVERAGE(range)`: Calculates the arithmetic mean. E.g., `=AVERAGE(C2:C50)` finds the average class test score.',
            '3. `=COUNT(range)` vs. `=COUNTA(range)`: `COUNT` counts only cells containing numbers; `COUNTA` counts any non-empty cell (including text names).',
            '4. `=IF(logical_test, value_if_true, value_if_false)`: Evaluates a condition and returns different results. E.g., `=IF(C2>=6, "Qualified", "Not Qualified")`.',
            'Nesting Formulas: Combining formulas to automate grading: `=IF(C2>=70, "A", IF(C2>=60, "B", IF(C2>=50, "C", "F")))`.'
          ],
          nigerianContextExamples: [
            'Automating official NYSC quiz qualification status: `=IF(D2>=6, "Qualified", "Keep Practising")`.',
            'Calculating student continuous assessment marks: Adding test scores with `=SUM(B2:D2)` and determining pass/fail status with `=IF(E2>=50, "Pass", "Fail")`.'
          ],
          practicalDemonstration: 'Demonstrate writing an `=IF()` formula that automatically flags scores >= 6 in green and < 6 in red.',
          handsOnExercise: {
            title: 'Automate a 10-Row Assessment Grading Sheet',
            task: 'Build a spreadsheet table evaluating 10 student scores with automated calculations.',
            steps: [
              'Columns: Student Name, Test 1 (20), Test 2 (20), Exam (60), Total Score, and Status.',
              'Use `=SUM()` to calculate Total Score.',
              'Use `=IF()` to assign "Passed" if Total Score >= 50, else "Retake".',
              'Calculate class `=AVERAGE()` and total attendance using `=COUNTA()`.'
            ],
            deliverable: 'Your automated assessment spreadsheet link.'
          },
          keyTakeaways: [
            'Every formula begins with an equals sign (`=`).',
            'Use `COUNT` for numbers and `COUNTA` for non-empty text cells.',
            'The `=IF()` function automates status evaluations and decision rules.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_3_2_1',
              questionText: 'Which formula in Google Sheets will automatically display "Qualified" if a participant\'s score in cell B2 is 6 or higher, and "Keep Practising" if below 6?',
              options: [
                '`=SUM(B2 >= 6)`',
                '`=IF(B2>=6, "Qualified", "Keep Practising")`',
                '`=COUNT(B2, 6)`',
                '`=AVERAGE(B2:6)`'
              ],
              correctAnswer: 1,
              explanation: 'The `=IF()` function evaluates whether B2 is >= 6; if true, it outputs "Qualified", otherwise "Keep Practising".'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_3_3',
          moduleId: 'mod_prd_3',
          courseId: 'course_digital_productivity',
          title: 'Organizing and Analyzing Data: Sorting, Filters, and Conditional Formatting',
          sequence: 3,
          sequenceLabel: 'Lesson 3.3',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['PROD-SHT-03'],
          introduction: 'Turn chaotic lists into structured, searchable intelligence. Master multi-column sorting, filter views, search filters, and conditional formatting color rules.',
          lessonContent: [
            'Creating a Filter: Select your header row and click `Data → Create a filter`. Filter dropdowns appear on every header, allowing you to filter by specific values (e.g. showing only "Platoon 4").',
            'Filter Views (Collaborative Filtering): In a shared sheet where 5 teachers or coordinators are working simultaneously, creating a standard filter changes the screen for EVERYONE! Use `Data → Filter views → Create new filter view` to filter data privately without disrupting colleagues.',
            'Sorting Data: Sort alphabetically (A to Z) or numerically (Highest to Lowest). Always select the entire table before sorting to prevent detaching names from their corresponding scores!',
            'Conditional Formatting: Automatically color-code cells based on rules: highlight unpaid fees in red, highlight qualifying scores in green, or apply gradient color scales.'
          ],
          nigerianContextExamples: [
            'Filtering a 500-person camp registration sheet to display only participants from "Platoon 2" who have opt-in consent set to TRUE.',
            'Using conditional formatting to highlight secondary school students with attendance below 75% in soft red.'
          ],
          practicalDemonstration: 'Demonstrate setting up a Filter View: Show how User A filters by "Lagos" while User B simultaneously views "Kano" on the exact same shared Google Sheet without conflict.',
          handsOnExercise: {
            title: 'Apply Sorting, Filters, and Conditional Formatting',
            task: 'Apply filter rules and conditional formatting to a multi-column dataset.',
            steps: [
              'Import or create a 15-row dataset with Name, Platoon (1-10), Score (1-10), and Payment Status.',
              'Create a Filter View filtering for Platoon 1.',
              'Apply Conditional Formatting: Highlight Scores >= 6 in light green and < 6 in light red.',
              'Sort the table from highest score to lowest score.'
            ],
            deliverable: 'A shared link or screenshot of your filtered, color-coded sheet.'
          },
          keyTakeaways: [
            'Use Filter Views in shared sheets so your filtering does not disrupt your colleagues\' screens.',
            'Always select the full table before sorting to preserve row data integrity.',
            'Conditional formatting provides instant visual pattern recognition.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_3_3_1',
              questionText: 'When collaborating with 10 colleagues on a single shared Google Sheet, why should you use "Filter Views" instead of a standard filter?',
              options: [
                'Filter views permanently delete rows that you filter out',
                'Filter views allow you to sort and filter data privately on your screen without disrupting what your colleagues see',
                'Standard filters are illegal in shared workbooks',
                'Filter views reduce internet data usage to zero'
              ],
              correctAnswer: 1,
              explanation: 'Filter views provide an isolated personal lens on the data, ensuring multiple team members can filter simultaneously without interfering with one another.'
            }
          ]
        }
      ]
    },
    {
      moduleId: 'mod_prd_4',
      courseId: 'course_digital_productivity',
      sequence: 4,
      sequenceLabel: 'Module 4',
      title: 'Collaboration, Digital Meetings and Workflow Automation',
      description: 'Master real-time cloud collaboration, asynchronous comment tags, meeting productivity on Google Meet, and basic workflow automation.',
      learningObjectiveIds: ['PROD-COL-04'],
      lessons: [
        {
          lessonId: 'lesson_prd_4_1',
          moduleId: 'mod_prd_4',
          courseId: 'course_digital_productivity',
          title: 'Cloud Collaboration: Comments, Action Items, and Version History',
          sequence: 1,
          sequenceLabel: 'Lesson 4.1',
          estimatedDurationMinutes: 30,
          learningObjectiveIds: ['PROD-COL-04'],
          introduction: 'Stop emailing 10 versions of the same file (`Proposal_v1`, `Proposal_v2_final`). Learn how real-time co-authoring, tagged action items, and version history restore order to teamwork.',
          lessonContent: [
            'Real-Time Simultaneous Co-Authoring: Multiple team members can write, edit, and review the same Google Doc or Sheet at the exact same moment from different devices and cities.',
            'Tagging Comments and Assigning Action Items: Highlight a sentence and click "Add comment". Type `@colleague@email.com` and check "Assign to [Name]". Google automatically sends them an email notification with an actionable task.',
            'Suggesting Mode (Track Changes): Switch from "Editing" to "Suggesting" mode. Your edits appear as highlighted proposals that the document owner can "Accept" or "Reject" with 1 click.',
            'Version History & Disaster Recovery: Did someone accidentally delete 5 pages or erase complex formulas? Click `File → Version history → See version history`. You can name named milestones (e.g. "Approved Draft by Principal") and restore any previous version with zero data loss.'
          ],
          nigerianContextExamples: [
            'Four corps members in a CDS executive committee drafting an official budget simultaneously during a phone call, watching each other\'s edits live.',
            'Recovering an accidental formula deletion on a school master grade sheet by rolling back to the 2:00 PM auto-saved version.'
          ],
          practicalDemonstration: 'Demonstrate Version History: Make a destructive change (delete a table), open Version History, and restore the previous version in 10 seconds.',
          handsOnExercise: {
            title: 'Execute a Collaborative Document Review Exercise',
            task: 'Practice collaborative reviewing with tagged comments and version restoration.',
            steps: [
              'Create a Google Doc and write 2 paragraphs.',
              'Switch to "Suggesting Mode" and propose 3 line edits.',
              'Insert a comment and assign an action item using `@name`.',
              'Create a named milestone in Version History: `Baseline Draft`.'
            ],
            deliverable: 'A shared link demonstrating comments, suggestions, and version history.'
          },
          keyTakeaways: [
            'Use `@email` in comments to assign clear, accountable action items to team members.',
            'Use Suggesting Mode when editing a colleague\'s work to leave original text intact until approved.',
            'Version History provides automated continuous backup and instant disaster recovery.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_4_1_1',
              questionText: 'If a colleague accidentally deletes an entire section of data from your shared Google Doc, how can you recover it immediately?',
              options: [
                'Re-type the entire document from memory',
                'Open `File → Version history → See version history` and restore the previous saved version with one click',
                'Delete your Google account',
                'Call the police'
              ],
              correctAnswer: 1,
              explanation: 'Google Docs automatically saves continuous versions in the cloud, allowing users to inspect and restore previous states at any time.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_4_2',
          moduleId: 'mod_prd_4',
          courseId: 'course_digital_productivity',
          title: 'Digital Meetings and Remote Teamwork on Google Meet and Zoom',
          sequence: 2,
          sequenceLabel: 'Lesson 4.2',
          estimatedDurationMinutes: 25,
          learningObjectiveIds: ['PROD-COL-04'],
          introduction: 'Transform digital meetings from exhausting time-wasters into tight, productive decision engines. Master meeting agendas, screen sharing, meeting recording, and collaborative summaries.',
          lessonContent: [
            'The "Could This Have Been an Email?" Test: Before scheduling a 60-minute meeting, ask: "Can this decision be made through a structured email, a shared Google Doc, or a 2-minute Loom video?" If yes, cancel the meeting.',
            'The Written Agenda Imperative: Never host a meeting without a pre-published agenda. Structure the agenda: 1. Objective of meeting; 2. Topics with time caps (e.g. Budget - 10 mins); 3. Decision to be made.',
            'Effective Screen Sharing & Window Hygiene: When presenting, share a specific browser tab or single application window, NOT your entire desktop screen (to prevent private WhatsApp messages from popping up on screen!).',
            'The 5-Minute Action Item Wrap-Up: End every meeting 5 minutes early to document: Who agreed to do What by When. Post these action items in the team chat immediately.'
          ],
          nigerianContextExamples: [
            'A CDS group conducting a 20-minute Google Meet with a shared agenda document instead of spending N2,000 each on commercial bus transport to meet physically.',
            'Sharing a specific Google Chrome tab on Google Meet while keeping private banking tabs safely hidden.'
          ],
          practicalDemonstration: 'Demonstrate scheduling a Google Meet directly inside Google Calendar, adding an agenda in the description, and attaching the relevant meeting documents.',
          handsOnExercise: {
            title: 'Draft a High-Efficiency 30-Minute Meeting Agenda & Minutes Template',
            task: 'Design an agenda and companion meeting minutes template for an NYSC or workplace meeting.',
            steps: [
              'Define the singular core decision to be made in the meeting.',
              'Allocate 3 agenda topics with strict time caps.',
              'Include an Action Item table template with columns: Action, Owner, Deadline.'
            ],
            deliverable: 'Your completed 1-page Meeting Agenda and Minutes template.'
          },
          keyTakeaways: [
            'Never call a meeting without a pre-published agenda and clear decision objective.',
            'Share specific application windows rather than entire desktops to protect personal privacy.',
            'Document action items with owners and deadlines in the final 5 minutes of every call.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_4_2_1',
              questionText: 'When sharing your screen during a professional video meeting on Google Meet or Zoom, what is the best security practice?',
              options: [
                'Share your entire desktop screen with all background notifications visible',
                'Share only the specific browser tab or application window needed for the presentation, preventing private notifications from appearing on screen',
                'Turn off your monitor screen',
                'Invite everyone to your home'
              ],
              correctAnswer: 1,
              explanation: 'Sharing an isolated tab or window prevents personal messages, bank alerts, or private emails from popping up unexpectedly during presentations.'
            }
          ]
        },
        {
          lessonId: 'lesson_prd_4_3',
          moduleId: 'mod_prd_4',
          courseId: 'course_digital_productivity',
          title: 'Workflow Automation and AI-Assisted Workplace Efficiency',
          sequence: 3,
          sequenceLabel: 'Lesson 4.3',
          estimatedDurationMinutes: 35,
          learningObjectiveIds: ['PROD-COL-04'],
          introduction: 'Eliminate manual copy-paste busywork. Discover how basic automation concepts (email filters, canned responses, Google Sheets macros, and generative AI) automate hours of weekly friction.',
          lessonContent: [
            'Automated Email Filters & Labels in Gmail: Automatically label, archive, or categorize incoming emails. E.g., all emails containing "NYSC" automatically receive a yellow `NYSC` label and bypass the cluttered primary inbox.',
            'Gmail Templates (Canned Responses): If you find yourself typing the same introductory email or reply 10 times a week, save it as a Template. Insert it into any new email in two clicks.',
            'Google Workspace Extensions & Add-ons: Using tools like Autocrat or Mail Merge in Google Sheets to generate 100 personalized PDF certificates or award letters from a spreadsheet list in under 60 seconds.',
            'AI-Assisted Spreadsheet Formulas: Prompting Gemini or ChatGPT to write complex formulas: "Write a Google Sheets formula that searches Column A for a phone number and formats it with Nigeria\'s country code +234."'
          ],
          nigerianContextExamples: [
            'A corps member generating 120 personalized digital certificates of participation for secondary school students using a Google Sheet and an automated Mail Merge add-on.',
            'Setting up a Gmail filter that automatically files all bank account transaction alerts into a `Banking` folder to keep the primary inbox clutter-free.'
          ],
          practicalDemonstration: 'Demonstrate creating a Gmail Filter: If Sender = `officialnyscng@gmail.com`, Apply Label `NYSC Urgent` and Star the message.',
          handsOnExercise: {
            title: 'Configure 1 Gmail Filter and 1 Canned Email Template',
            task: 'Set up an automated filter rule and an email response template in your personal Gmail account.',
            steps: [
              'Create an automated label (e.g. `NYSC_Service`).',
              'Set a filter rule based on keyword or sender.',
              'Enable "Templates" in Gmail Settings and save a reusable professional inquiry template.'
            ],
            deliverable: 'A screenshot or verification description of your active filter rule and template.'
          },
          keyTakeaways: [
            'Automate repetitive email triage using Gmail filters and custom labels.',
            'Use Gmail Templates to insert standard professional responses in seconds.',
            'Combine Google Sheets with mail merge tools to generate bulk certificates and reports instantly.'
          ],
          knowledgeCheck: [
            {
              id: 'kc_prd_4_3_1',
              questionText: 'If you frequently send the exact same 3-paragraph introductory email to prospective clients or schools every week, what feature in Gmail eliminates typing it repeatedly?',
              options: [
                'Deleting your email account',
                'Gmail Templates (Canned Responses), which allow you to save and insert pre-written email messages with two clicks',
                'Forwarding random spam emails',
                'Typing with your eyes closed'
              ],
              correctAnswer: 1,
              explanation: 'Gmail Templates allow users to store and instantly recall pre-formatted messages, saving time and preventing repetitive typing.'
            }
          ]
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Complete Digital Office Productivity System',
    overview: 'Design and deploy a unified digital office productivity system containing an executive document proposal, a high-impact presentation slide deck, an automated data collection form, a spreadsheet tracking model, and a collaborative team workflow.',
    instructions: [
      'Step 1: Write and format a 2-page Project Proposal in Google Docs using Paragraph Styles, an automated Table of Contents, and a structured budget table.',
      'Step 2: Design a 5-slide Executive Presentation in Google Slides applying the 10-20-30 rule and high-contrast visual design.',
      'Step 3: Create an automated Google Form with 5 validated questions linked directly to a live Google Sheet.',
      'Step 4: Configure the linked Google Sheet with `=SUM()`, `=AVERAGE()`, and `=IF()` formulas, a Filter View, and Conditional Formatting.',
      'Step 5: Assemble all assets into a structured Google Drive folder with proper Viewer/Editor permissions and submit the link.'
    ],
    assessmentCriteria: [
      'Document Architecture: Does the Google Doc use proper heading styles, automated TOC, headers/footers, and clean tables? (25%)',
      'Visual Presentation: Are the Google Slides visual, minimal, readable (30pt+), and free of teleprompter clutter? (25%)',
      'Form & Spreadsheet Mastery: Does the Google Form collect clean data into Sheets with working formulas and conditional formatting? (25%)',
      'File Organization & Collaboration: Is the Google Drive folder structured with ISO naming and appropriate sharing permissions? (25%)'
    ],
    submissionGuidelines: 'Submit your project title, a 300-500 word overview, and a single public Google Drive folder share link containing your Google Doc, Google Slides, Google Form, and Google Sheets files.'
  },
  finalAssessment: [
    {
      id: 'fa_prd_01',
      questionText: 'In the Eisenhower Productivity Matrix, which quadrant of tasks produces long-term career growth, high capability, and strategic advantage?',
      options: [
        'Quadrant 4: Aimless social media scrolling and mindless time-wasters',
        'Quadrant 2: Important but Not Urgent tasks (such as learning high-value skills, planning, and building portfolios)',
        'Quadrant 3: Urgent interruptions from colleagues that produce no lasting value',
        'Quadrant 1: Constant last-minute emergencies caused by poor planning'
      ],
      correctAnswer: 1,
      explanation: 'Quadrant 2 activities build strategic advantage and prevent crises before they happen, making them the foundation of high productivity.',
      relatedLessonId: 'lesson_prd_1_1'
    },
    {
      id: 'fa_prd_02',
      questionText: 'When sharing an executive proposal document via Google Drive with external school principals or partners, what permission level should you select?',
      options: [
        'Full Editor access with permission to delete files',
        'Viewer (Anyone with the link can View) so they can read immediately without altering or corrupting the content',
        'Owner with billing permissions',
        'Restricted access where only people with @google.com emails can open it'
      ],
      correctAnswer: 1,
      explanation: 'Viewer permissions allow external recipients to view the document without risk of accidental text deletion or formula corruption.',
      relatedLessonId: 'lesson_prd_1_2'
    },
    {
      id: 'fa_prd_03',
      questionText: 'What is the primary advantage of "Time-Blocking" on a digital calendar over maintaining a long, unorganized to-do list?',
      options: [
        'It automatically does the work for you while you sleep',
        'It assigns specific dedicated hours in your day to focused tasks, creating realistic commitments and preventing overbooking',
        'It turns off your phone battery',
        'It guarantees you will never have to work again'
      ],
      correctAnswer: 1,
      explanation: 'Time-blocking allocates finite hours to specific priorities, establishing realistic pacing and protecting focus.',
      relatedLessonId: 'lesson_prd_1_3'
    },
    {
      id: 'fa_prd_04',
      questionText: 'In Google Docs, why should you apply "Heading 1" and "Heading 2" styles instead of just making text bold and increasing font size manually?',
      options: [
        'Styles change the language of the document',
        'Built-in heading styles structure the document outline, enable 1-click automated Tables of Contents, and maintain consistent formatting',
        'Heading styles are required by law for printing in Nigeria',
        'Bold text makes the file size too large to send via email'
      ],
      correctAnswer: 1,
      explanation: 'Heading styles establish document hierarchy, allowing Google Docs to generate automated tables of contents and dynamic outlines.',
      relatedLessonId: 'lesson_prd_2_1'
    },
    {
      id: 'fa_prd_05',
      questionText: 'What is the primary design rule for creating effective presentation slides in Google Slides?',
      options: [
        'Paste your entire spoken speech word-for-word in 10pt font so everyone can read along',
        'Keep slides visual, minimal, and uncluttered with large readable fonts (30pt+), using slides as visual anchors rather than teleprompters',
        'Use at least 15 different bright colors on every single slide',
        'Never use any photos or charts'
      ],
      correctAnswer: 1,
      explanation: 'Clean, visually striking slides with minimal text anchor audience attention without overwhelming them with text.',
      relatedLessonId: 'lesson_prd_2_2'
    },
    {
      id: 'fa_prd_06',
      questionText: 'What is the primary operational advantage of linking a Google Form directly to Google Sheets?',
      options: [
        'It sends an SMS to all mobile numbers in Nigeria',
        'Every new form response is automatically recorded as a new row in your spreadsheet in real time, eliminating manual data entry',
        'It charges a fee for each submission',
        'It deletes the form after 10 responses'
      ],
      correctAnswer: 1,
      explanation: 'Direct Sheets integration automatically captures all incoming submissions in a structured spreadsheet in real time without manual copying.',
      relatedLessonId: 'lesson_prd_2_3'
    },
    {
      id: 'fa_prd_07',
      questionText: 'In a Google Sheets formula, what is the purpose of placing dollar signs in a cell reference like `$B$1`?',
      options: [
        'It converts the cell value into US Dollars',
        'It creates an Absolute Reference that locks the cell so it does not shift when the formula is copied or dragged down to other rows',
        'It hides the cell from unauthorized viewers',
        'It multiplies the cell value by 100'
      ],
      correctAnswer: 1,
      explanation: 'Dollar signs create absolute references, locking the row and column coordinates so they remain fixed when formulas are copied.',
      relatedLessonId: 'lesson_prd_3_1'
    },
    {
      id: 'fa_prd_08',
      questionText: 'Which formula in Google Sheets will automatically display "Qualified" if a participant\'s score in cell B2 is 6 or higher, and "Keep Practising" if below 6?',
      options: [
        '`=SUM(B2 >= 6)`',
        '`=IF(B2>=6, "Qualified", "Keep Practising")`',
        '`=COUNT(B2, 6)`',
        '`=AVERAGE(B2:6)`'
      ],
      correctAnswer: 1,
      explanation: 'The `=IF()` function evaluates whether B2 is >= 6; if true, it outputs "Qualified", otherwise "Keep Practising".',
      relatedLessonId: 'lesson_prd_3_2'
    },
    {
      id: 'fa_prd_09',
      questionText: 'When collaborating with 10 colleagues on a single shared Google Sheet, why should you use "Filter Views" instead of a standard filter?',
      options: [
        'Filter views permanently delete rows that you filter out',
        'Filter views allow you to sort and filter data privately on your screen without disrupting what your colleagues see',
        'Standard filters are illegal in shared workbooks',
        'Filter views reduce internet data usage to zero'
      ],
      correctAnswer: 1,
      explanation: 'Filter views provide an isolated personal lens on the data, ensuring multiple team members can filter simultaneously without interfering with one another.',
      relatedLessonId: 'lesson_prd_3_3'
    },
    {
      id: 'fa_prd_10',
      questionText: 'If a colleague accidentally deletes an entire section of data from your shared Google Doc, how can you recover it immediately?',
      options: [
        'Re-type the entire document from memory',
        'Open `File → Version history → See version history` and restore the previous saved version with one click',
        'Delete your Google account',
        'Call the police'
      ],
      correctAnswer: 1,
      explanation: 'Google Docs automatically saves continuous versions in the cloud, allowing users to inspect and restore previous states at any time.',
      relatedLessonId: 'lesson_prd_4_1'
    },
    {
      id: 'fa_prd_11',
      questionText: 'When sharing your screen during a professional video meeting on Google Meet or Zoom, what is the best security practice?',
      options: [
        'Share your entire desktop screen with all background notifications visible',
        'Share only the specific browser tab or application window needed for the presentation, preventing private notifications from appearing on screen',
        'Turn off your monitor screen',
        'Invite everyone to your home'
      ],
      correctAnswer: 1,
      explanation: 'Sharing an isolated tab or window prevents personal messages, bank alerts, or private emails from popping up unexpectedly during presentations.',
      relatedLessonId: 'lesson_prd_4_2'
    },
    {
      id: 'fa_prd_12',
      questionText: 'If you frequently send the exact same 3-paragraph introductory email to prospective clients or schools every week, what feature in Gmail eliminates typing it repeatedly?',
      options: [
        'Deleting your email account',
        'Gmail Templates (Canned Responses), which allow you to save and insert pre-written email messages with two clicks',
        'Forwarding random spam emails',
        'Typing with your eyes closed'
      ],
      correctAnswer: 1,
      explanation: 'Gmail Templates allow users to store and instantly recall pre-formatted messages, saving time and preventing repetitive typing.',
      relatedLessonId: 'lesson_prd_4_3'
    },
    {
      id: 'fa_prd_13',
      questionText: 'In Google Drive, how should professional files be named to ensure clean chronological sorting in any folder?',
      options: [
        '`letter_final_final_v2.docx`',
        '`[YYYY-MM-DD]_[Category]_[Descriptive_Title]_[Version]` (e.g. `2026-03-15_NYSC_Leave_Application_v1.pdf`)',
        '`document_today.pdf`',
        '`untitled1.doc`'
      ],
      correctAnswer: 1,
      explanation: 'ISO date prefixes (`YYYY-MM-DD`) ensure documents sort chronologically by default in any operating system or cloud drive.',
      relatedLessonId: 'lesson_prd_1_2'
    },
    {
      id: 'fa_prd_14',
      questionText: 'In a Google Doc, how do you assign an accountable action item to a colleague so they receive an automated email alert?',
      options: [
        'Print the document and mail it to them',
        'Highlight text, insert a comment, type `@colleague@email.com`, and check the "Assign to" checkbox',
        'Change the font color to yellow',
        'Delete their name from the document'
      ],
      correctAnswer: 1,
      explanation: 'Tagging an email address and checking "Assign" creates an accountable task that notifies the recipient with direct link access.',
      relatedLessonId: 'lesson_prd_4_1'
    },
    {
      id: 'fa_prd_15',
      questionText: 'What is the function of the `=COUNTA()` formula in Google Sheets?',
      options: [
        'It counts only cells that have negative numbers',
        'It counts all non-empty cells in a range, including text, numbers, and dates',
        'It calculates the average of a range',
        'It multiplies all numbers together'
      ],
      correctAnswer: 1,
      explanation: '`COUNTA` counts any cell that is not empty, making it ideal for counting names, attendance lists, and text entries.',
      relatedLessonId: 'lesson_prd_3_2'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredFinalAssessmentPassScore: 80,
    requireCapstoneSubmission: true
  }
};
