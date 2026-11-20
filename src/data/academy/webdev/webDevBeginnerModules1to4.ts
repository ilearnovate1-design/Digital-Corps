import { CourseModule } from '../../../types';

export const WEB_DEV_BEGINNER_MODULES_1_TO_4: CourseModule[] = [
  // =========================================================================
  // MODULE 1: INTRODUCTION TO WEB DEVELOPMENT
  // =========================================================================
  {
    moduleId: 'mod_wdb_1',
    courseId: 'web-development-beginner',
    sequence: 1,
    sequenceLabel: 'Module 1',
    title: 'Introduction to Web Development',
    description:
      'Understand how browsers, servers, URLs, and code editors work together so you can build and inspect real web pages from scratch.',
    learningObjectiveIds: ['WDB-FND-01'],
    lessons: [
      {
        lessonId: 'lesson_wdb_1_1',
        moduleId: 'mod_wdb_1',
        courseId: 'web-development-beginner',
        title: 'How the Web Works: Browsers, Servers & HTTP',
        sequence: 1,
        sequenceLabel: 'Lesson 1.1',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-FND-01'],
        learningObjectives: [
          'Trace what happens when you type a URL into Chrome or Safari on a phone or laptop.',
          'Distinguish between a web client (browser), DNS, web server, and HTTP/HTTPS.',
          'Identify the three core languages rendered by every web browser: HTML, CSS, and JavaScript.'
        ],
        introduction:
          'Before writing a single line of code, every web developer must understand what happens behind the scenes between clicking a link and seeing a page load on screen.',
        lessonContent: [
          'The Client-Server Conversation: When you visit a website on your phone in Abuja or Enugu, your browser (Chrome, Safari, Firefox, Edge) acts as the client. It asks a remote computer called a web server to send back files—specifically HTML (structure), CSS (styling), and JavaScript (behaviour).',
          'DNS and HTTPS: Humans remember domain names like digitalcorps.ng, while computers route traffic using IP addresses (like 104.21.14.8). The Domain Name System (DNS) acts like a phonebook translating the domain name into an IP address. Your browser then sends an HTTP or encrypted HTTPS request to that server, which replies with a status code (such as 200 OK or 404 Not Found) and the page files.',
          'The Three Core Web Technologies: (1) HTML provides the skeleton and meaning (headings, paragraphs, images, buttons, forms). (2) CSS controls visual presentation (colours, fonts, spacing, mobile layout). (3) JavaScript adds interactivity (validating a form before submission, toggling a menu, calculating prices). No matter what advanced framework you learn later, browsers ultimately render HTML, CSS, and JavaScript.'
        ],
        stepByStepInstructions: [
          'Open any browser on your computer or Android phone and navigate to a simple educational webpage.',
          'Identify the protocol (https://), domain name, and file/path in the address bar.',
          'Right-click on a desktop page and choose "View Page Source" to observe raw HTML returned by the server.',
          'Draw a 4-box diagram on paper showing: Browser -> DNS Lookup -> Web Server -> HTML/CSS/JS Response.'
        ],
        nigerianContextExamples: [
          'Lightweight Mobile Pages: Many Nigerian users browse on prepaid mobile data over 3G/4G connections. Clean HTML and well-structured CSS keep page size under 150 KB so a school or SME page opens quickly even on low-cost Android phones.',
          'HTTP Status Codes in Everyday Use: When a scholarship portal goes down under heavy traffic, seeing "503 Service Unavailable" tells you the server is overloaded rather than your own code being broken.'
        ],
        toolsAndResources: [
          'Google Chrome / Firefox Developer Tools',
          'MDN Web Docs: How the Web Works',
          'VS Code (Visual Studio Code)'
        ],
        practicalDemonstration:
          'Example HTTP Request & Response Trace:\nGET /index.html HTTP/1.1\nHost: myportfolio.ng\n\nServer Response:\nHTTP/1.1 200 OK\nContent-Type: text/html; charset=UTF-8\n\n<!DOCTYPE html><html>...</html>',
        codeExamples: [
          {
            title: 'Your First Complete Web Page Triad (HTML + Inline Preview)',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Ada's Web Journey</title>
  </head>
  <body>
    <h1>Welcome to the Web</h1>
    <p>This HTML was delivered to your browser and rendered into headings and text.</p>
  </body>
</html>`,
            explanation: [
              'Line 1: <!DOCTYPE html> instructs the browser to use modern HTML5 standards.',
              'Lines 3–7: <head> holds metadata (character encoding, mobile viewport, tab title) that configures the page.',
              'Lines 8–11: <body> holds visible content rendered inside the browser window.'
            ],
            expectedOutput: 'Displays a bold heading "Welcome to the Web" followed by a readable paragraph.'
          }
        ],
        commonErrors: [
          {
            error: 'Browser displays raw HTML tags instead of a rendered webpage',
            cause: 'The file was saved as index.html.txt or index.txt instead of ending with .html.',
            fix: 'Rename the file so its exact extension is .html (enable file extensions in Windows Explorer or macOS Finder).'
          },
          {
            error: '404 File Not Found when clicking a link',
            cause: 'The requested filename or folder path on the server does not match the href capitalization or spelling.',
            fix: 'Verify exact lowercase filenames and relative paths.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_1_1',
          title: 'Build Your First Valid HTML5 Document',
          prompt:
            'Edit the starter code below so it displays an <h1> heading with your name or brand, and a <p> paragraph explaining one goal for learning web development.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>My First Webpage</title>
</head>
<body>
  <!-- Replace the text below with your own heading and paragraph -->
  <h1>Hello World</h1>
  <p>Edit this paragraph with your web development goal.</p>
</body>
</html>`,
          language: 'html',
          runnableInBrowser: true,
          expectedOutput: 'Renders an <h1> heading and a customized <p> paragraph inside the preview.',
          hints: [
            'Keep the <h1>...</h1> and <p>...</p> tags intact inside <body>...</body>.',
            'Click "Run in Sandbox" to preview the rendered output immediately.'
          ],
          validationChecks: [
            { label: 'Includes <h1> heading', pattern: '<h1[^>]*>.+</h1>' },
            { label: 'Includes <p> paragraph', pattern: '<p[^>]*>.+</p>' },
            { label: 'Includes <!DOCTYPE html>', pattern: '<!doctype html>' }
          ],
          solutionSummary: 'A complete HTML5 document uses <!DOCTYPE html>, <html>, <head>, and <body> with visible <h1> and <p> elements.'
        },
        handsOnExercise: {
          title: 'Inspect HTTP Status & Page Skeleton',
          task: 'Create a starter HTML file locally and view it in your browser, then inspect the Elements tab in DevTools.',
          steps: [
            'Create a folder called web-basics on your desktop.',
            'Create index.html inside it with <!DOCTYPE html>, <head>, and <body>.',
            'Double-click index.html to open it in your browser and inspect the DOM tree.'
          ],
          deliverable: 'A working local index.html file that renders cleanly in a browser.',
          hints: ['Remember to save the file (Ctrl+S / Cmd+S) before refreshing the browser.']
        },
        keyTakeaways: [
          'Browsers (clients) request files from servers over HTTP/HTTPS using DNS lookup.',
          'Every webpage is powered by HTML (structure), CSS (design), and JavaScript (interactivity).',
          'File extensions (.html, .css, .js) tell browsers and editors how to interpret your files.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_1_1_1',
            questionText: 'What is the role of DNS when you visit a website?',
            options: [
              'It styles buttons and typography on the page',
              'It translates a human-readable domain name into a server IP address',
              'It compiles JavaScript into CSS',
              'It stores user passwords inside HTML tags'
            ],
            correctAnswer: 1,
            explanation: 'DNS translates domain names (like example.com) into numerical IP addresses so your browser can locate the server.'
          },
          {
            id: 'kc_wdb_1_1_2',
            questionText: 'Which three core technologies do web browsers natively understand?',
            options: [
              'Python, SQL, and Docker',
              'HTML, CSS, and JavaScript',
              'Figma, Excel, and PDF',
              'Java, C++, and PHP'
            ],
            correctAnswer: 1,
            explanation: 'Every web browser natively parses and renders HTML, CSS, and JavaScript.'
          },
          {
            id: 'kc_wdb_1_1_3',
            questionText: 'Which HTTP status code indicates a requested page was found and returned normally?',
            options: ['404 Not Found', '500 Internal Server Error', '200 OK', '403 Forbidden'],
            correctAnswer: 2,
            explanation: '200 OK means the server processed the request successfully and sent the requested resource.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'MDN: How the Web Works',
            description: 'Clear beginner overview of clients, servers, DNS, and HTTP packets.',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/How_the_Web_works'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_1_2',
        moduleId: 'mod_wdb_1',
        courseId: 'web-development-beginner',
        title: 'Frontend, Backend, and Setting Up Your Code Environment',
        sequence: 2,
        sequenceLabel: 'Lesson 1.2',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['WDB-FND-01'],
        learningObjectives: [
          'Compare frontend development, backend development, and full-stack engineering.',
          'Configure Visual Studio Code (or an accessible mobile/desktop editor) cleanly.',
          'Adopt clean project naming rules (lowercase, hyphens, no spaces).'
        ],
        introduction:
          'Setting up a disciplined workspace prevents half of beginner bugs before you even start writing real websites.',
        lessonContent: [
          'Frontend vs. Backend: Frontend engineering covers everything running in the user’s browser—layout, typography, responsiveness, accessibility, and interactive controls. Backend engineering runs on remote servers—handling authentication, storing records in databases, processing payments, and enforcing security rules.',
          'Setting Up VS Code: Visual Studio Code is free, lightweight, and works across Windows, macOS, and Linux. Install helpful basics like Live Server (automatically reloads your browser on save) and Prettier (keeps indentation tidy). If you only have an Android device while on the move, you can still practice inside the interactive code sandbox built into this Academy.',
          'Professional File Naming Rules: Always name web files and folders using lowercase letters with hyphens instead of spaces (e.g., about-us.html, profile-photo.jpg—never About Us Final (2).HTML). Web servers on Linux are case-sensitive, and spaces turn into messy %20 characters in URLs.'
        ],
        stepByStepInstructions: [
          'Download and install Visual Studio Code from code.visualstudio.com.',
          'Create a dedicated workspace folder named web-dev-projects.',
          'Inside it, create a subfolder called portfolio-starter with subfolders css/, js/, and images/.',
          'Open the folder in VS Code and create an empty index.html file.'
        ],
        nigerianContextExamples: [
          'Low-Spec Laptop Efficiency: VS Code runs smoothly even on 4 GB RAM laptops common among students and NYSC corps members when you keep only necessary extensions installed.',
          'Case-Sensitivity Trap: Locally on Windows, Images/Hero.JPG works even if HTML says images/hero.jpg—but once uploaded to GitHub Pages or Netlify (Linux servers), the image breaks until filenames match case.'
        ],
        toolsAndResources: [
          'Visual Studio Code (code.visualstudio.com)',
          'Live Server VS Code Extension',
          'Browser DevTools (F12 / Ctrl+Shift+I)'
        ],
        practicalDemonstration:
          'Recommended Portfolio Folder Structure:\nportfolio-starter/\n├── index.html\n├── css/\n│   └── styles.css\n├── js/\n│   └── main.js\n└── images/\n    └── profile-photo.jpg',
        codeExamples: [
          {
            title: 'Linking CSS and JavaScript with Correct Relative Paths',
            language: 'html',
            code: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Organized Project</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <main>
      <h1>Clean Project Structure</h1>
      <p>Notice lowercase paths without spaces.</p>
    </main>
    <script src="js/main.js"></script>
  </body>
</html>`,
            explanation: [
              'Line 7: <link rel="stylesheet" href="css/styles.css" /> loads CSS from the css folder relative to index.html.',
              'Line 14: Placing <script src="js/main.js"></script> before </body> ensures HTML elements exist before JavaScript runs.'
            ],
            expectedOutput: 'Browser loads index.html, applies css/styles.css, and executes js/main.js in order.'
          }
        ],
        commonErrors: [
          {
            error: 'Stylesheet or script fails to load even though the file exists',
            cause: 'File path mismatch (e.g. writing style.css instead of css/styles.css or uppercase mismatch).',
            fix: 'Verify folder depth and exact lowercase spelling in href/src.'
          }
        ],
        handsOnExercise: {
          title: 'Create a Clean Project Folder Tree',
          task: 'Set up the standard web project skeleton on your computer or notebook.',
          steps: [
            'Create a folder named personal-site.',
            'Add index.html, css/styles.css, js/main.js, and images/.',
            'Link css/styles.css in <head> and js/main.js at the bottom of <body>.'
          ],
          deliverable: 'A well-structured personal-site project folder with zero spaces in filenames.'
        },
        keyTakeaways: [
          'Frontend builds what users see and interact with in the browser; backend handles servers, databases, and security.',
          'Keep project folders and filenames lowercase with hyphens (no spaces).',
          'Load stylesheets in <head> and scripts near the end of <body>.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_1_2_1',
            questionText: 'Why should web filenames avoid spaces and mixed uppercase letters (like "My Page.HTML")?',
            options: [
              'Browsers refuse to open files with more than 8 characters',
              'Web servers are case-sensitive and encode spaces as %20, easily causing broken links after deployment',
              'CSS only works on single-word filenames',
              'JavaScript automatically deletes uppercase files'
            ],
            correctAnswer: 1,
            explanation: 'Linux web servers treat Hero.jpg and hero.jpg as different files, and spaces turn into %20 in URLs.'
          },
          {
            id: 'kc_wdb_1_2_2',
            questionText: 'Which responsibility belongs primarily to backend development rather than frontend development?',
            options: [
              'Adjusting button padding with CSS',
              'Validating database writes and checking server-side authentication tokens',
              'Setting mobile font sizes',
              'Adding alt attributes to images'
            ],
            correctAnswer: 1,
            explanation: 'Database persistence and authoritative authentication verification run securely on the backend.'
          },
          {
            id: 'kc_wdb_1_2_3',
            questionText: 'Where is a <link rel="stylesheet"> tag normally placed inside an HTML document?',
            options: ['Inside <footer>', 'Inside <head>', 'After </html>', 'Inside a <p> tag'],
            correctAnswer: 1,
            explanation: 'Placing stylesheets in <head> lets the browser know styling rules before painting visible content.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'MDN: Dealing with Files',
            description: 'Guide to organizing website directories and relative file paths.',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/Dealing_with_files'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_1_3',
        moduleId: 'mod_wdb_1',
        courseId: 'web-development-beginner',
        title: 'Using Browser Developer Tools (DevTools) Like an Engineer',
        sequence: 3,
        sequenceLabel: 'Lesson 1.3',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['WDB-FND-01'],
        learningObjectives: [
          'Inspect live HTML elements and CSS rules using the Elements panel.',
          'Read errors and log messages inside the JavaScript Console.',
          'Simulate mobile screen sizes with Device Mode.'
        ],
        introduction:
          'Great web developers do not guess why a layout looks broken—they open DevTools and inspect the exact box, style, or error.',
        lessonContent: [
          'The Elements Panel: Right-click any heading or button in Chrome/Edge/Firefox and select Inspect. You can see the live DOM tree, view which CSS rules won, inspect margin/padding boxes visually, and test temporary edits without altering source files yet.',
          'The Console Panel: When JavaScript runs into a typo or runtime error, the Console displays the exact filename, line number, and error message in red. Learning to read Console messages turns mysterious failures into actionable clues.',
          'Responsive Device Toolbar: Click the phone/tablet toggle in DevTools to preview how your site behaves at 360px (typical budget Android phone width) up to 1440px (desktop monitor).'
        ],
        stepByStepInstructions: [
          'Open any webpage in Chrome or Firefox and press F12 (or Ctrl+Shift+I / Cmd+Option+I).',
          'Use the element picker arrow to click a button and read its computed font-size and padding.',
          'Switch to the Console tab, type 2 + 2 and press Enter to see live JavaScript evaluation.',
          'Toggle Device Mode and test a 375px mobile viewport width.'
        ],
        nigerianContextExamples: [
          'Testing for Budget Android Phones: Many Nigerian users access sites on 360px-wide screens. Testing at 360px in DevTools catches horizontal overflow before real visitors ever experience it.'
        ],
        toolsAndResources: [
          'Chrome DevTools Elements & Console Panels',
          'Responsive Device Toolbar (360px–1440px)'
        ],
        practicalDemonstration:
          'Console Debugging Output Example:\n> console.log("Checking page readiness");\nChecking page readiness\n> document.querySelector("h1").textContent;\n"Welcome to the Web"',
        codeExamples: [
          {
            title: 'Logging Helpful Messages to the Browser Console',
            language: 'javascript',
            code: `const siteTitle = "Digital Corps Portfolio";
console.log("Loaded site:", siteTitle);
console.log("Viewport width in px:", window.innerWidth);`,
            explanation: [
              'Line 1: Stores a text string in a constant called siteTitle.',
              'Lines 2–3: Outputs diagnostic text and current screen width to the Console tab.'
            ],
            expectedOutput: 'Prints "Loaded site: Digital Corps Portfolio" and the numeric pixel width in the Console.'
          }
        ],
        commonErrors: [
          {
            error: 'Editing CSS in DevTools vanishes after refreshing the browser',
            cause: 'DevTools edits live only in browser memory for testing.',
            fix: 'Copy working CSS tweaks back into your actual .css file in VS Code and save.'
          }
        ],
        handsOnExercise: {
          title: 'Audit a Webpage at Mobile Width',
          task: 'Inspect a webpage in DevTools, switch to mobile width (360px), and log the page title in Console.',
          steps: [
            'Open DevTools and toggle the mobile device view at 360px width.',
            'Inspect one heading and record its font-family and font-size.',
            'Run document.title in the Console tab.'
          ],
          deliverable: 'Short written observation note recording viewport width, heading size, and any overflow observed.'
        },
        keyTakeaways: [
          'DevTools Elements shows live HTML structure and the CSS Box Model.',
          'Console displays JavaScript logs and error line numbers.',
          'Always test mobile layouts around 360px–375px width.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_1_3_1',
            questionText: 'What happens when you edit CSS directly inside the browser DevTools Elements panel?',
            options: [
              'It automatically pushes a commit to GitHub',
              'It previews temporarily in memory and resets when you refresh the page',
              'It changes the website for all users globally',
              'It deletes your local CSS file'
            ],
            correctAnswer: 1,
            explanation: 'DevTools edits are temporary in-browser previews; permanent changes must be saved in your code editor.'
          },
          {
            id: 'kc_wdb_1_3_2',
            questionText: 'Which DevTools panel shows red JavaScript syntax or runtime errors with line numbers?',
            options: ['Network', 'Console', 'Application', 'Performance'],
            correctAnswer: 1,
            explanation: 'The Console logs JavaScript output, warnings, and runtime errors.'
          },
          {
            id: 'kc_wdb_1_3_3',
            questionText: 'Why should developers test pages at 360px–375px width in Device Mode?',
            options: [
              'To verify the page looks good on everyday smartphones without horizontal scrolling',
              'Because HTML only works below 400px',
              'Because CSS Grid stops working on laptops',
              'To disable HTTPS encryption'
            ],
            correctAnswer: 0,
            explanation: 'Budget smartphones commonly have 360px CSS viewport widths; testing ensures mobile usability.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'Chrome DevTools Overview',
            description: 'Official guide to inspecting DOM, CSS, Console, and Device Mode.',
            url: 'https://developer.chrome.com/docs/devtools/overview/'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 1 Assignment: Project Workspace & DevTools Report',
      description: 'Create your local starter project folder structure and document a DevTools inspection of a live webpage.',
      deliverables: [
        'Clean folder tree (index.html, css/styles.css, js/main.js) using lowercase hyphenated filenames.',
        'Written DevTools report noting one page’s HTTP status, mobile viewport check at 360px, and computed heading styles.'
      ],
      evaluationCriteria: [
        'Valid HTML5 boilerplate structure',
        'Correct relative file paths without spaces',
        'Accurate identification of Elements and Console output'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_1_1',
        questionText: 'Which part of a webpage defines headings, paragraphs, links, and form structure?',
        options: ['CSS', 'HTML', 'DNS', 'SQL'],
        correctAnswer: 1,
        explanation: 'HTML provides semantic structure and content.'
      },
      {
        id: 'mc_wdb_1_2',
        questionText: 'Why do developers place <script src="js/main.js"></script> right before the closing </body> tag?',
        options: [
          'So HTML elements are parsed into the DOM before JavaScript tries to find them',
          'Because scripts are illegal inside <body>',
          'To skip CSS loading',
          'To make the domain name shorter'
        ],
        correctAnswer: 0,
        explanation: 'Placing the script after HTML elements ensures DOM queries succeed.'
      },
      {
        id: 'mc_wdb_1_3',
        questionText: 'What does an HTTP 404 response tell you?',
        options: [
          'The CSS color value is invalid',
          'The requested file or route could not be found at that path',
          'The user entered a strong password',
          'The page loaded successfully'
        ],
        correctAnswer: 1,
        explanation: '404 Not Found means no resource exists at the requested URL path.'
      },
      {
        id: 'mc_wdb_1_4',
        questionText: 'Which file naming format is safest across all web servers?',
        options: ['About Me (Final).HTML', 'about-me.html', 'ABOUT ME.html', 'about me 2.txt'],
        correctAnswer: 1,
        explanation: 'Lowercase letters with hyphens prevent case-sensitivity and URL space encoding errors.'
      },
      {
        id: 'mc_wdb_1_5',
        questionText: 'Which tool inside the browser lets you simulate a 360px smartphone screen on your laptop?',
        options: ['Notepad', 'DevTools Device Mode', 'Task Manager', 'File Explorer'],
        correctAnswer: 1,
        explanation: 'DevTools Device Mode lets you test responsive breakpoints without needing every physical phone.'
      }
    ]
  },

  // =========================================================================
  // MODULE 2: HTML5 FUNDAMENTALS
  // =========================================================================
  {
    moduleId: 'mod_wdb_2',
    courseId: 'web-development-beginner',
    sequence: 2,
    sequenceLabel: 'Module 2',
    title: 'HTML5 Fundamentals',
    description:
      'Write clean, semantic HTML5 documents with headings, links, lists, images, tables, accessibility attributes, and interactive forms.',
    learningObjectiveIds: ['WDB-HTML-02'],
    lessons: [
      {
        lessonId: 'lesson_wdb_2_1',
        moduleId: 'mod_wdb_2',
        courseId: 'web-development-beginner',
        title: 'Headings, Text Hierarchy, Lists & Hyperlinks',
        sequence: 1,
        sequenceLabel: 'Lesson 2.1',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-HTML-02'],
        learningObjectives: [
          'Structure page content using proper heading levels (<h1> through <h6>) without skipping levels.',
          'Create ordered (<ol>) and unordered (<ul>) lists cleanly.',
          'Write internal, external, email (mailto:), and anchor (#section) links.'
        ],
        introduction:
          'HTML is not about choosing how big text looks—it is about describing the meaning and hierarchy of every piece of information.',
        lessonContent: [
          'Heading Hierarchy: Use one <h1> per page for the main title, <h2> for major sections (About, Skills, Projects), and <h3> for subsections. Never pick <h4> just because you want smaller text—change visual size with CSS instead. Search engines and screen readers rely on logical heading order.',
          'Lists for Grouped Items: Use <ul> (unordered list) for bullet items like skills or navigation links, and <ol> (ordered list) for sequential steps. Only <li> elements should sit directly inside <ul> or <ol>.',
          'Hyperlinks with <a>: Links connect the web using the href attribute. External links should include rel="noopener noreferrer" when using target="_blank". Internal page jumps use href="#projects" matching id="projects" on a target section.'
        ],
        stepByStepInstructions: [
          'Write a single <h1> containing your full name and primary web focus.',
          'Add two <h2> sections: "Core Skills" and "Useful Links".',
          'Add an unordered list (<ul>) of at least 3 skills.',
          'Add an anchor link jumping to #contact and an external link with descriptive link text (not "click here").'
        ],
        nigerianContextExamples: [
          'Accessible Course Outlines: A corps member building a community tutoring page uses <h1> for the programme name and <ul> lists for subjects—allowing screen readers and low-bandwidth text browsers to navigate smoothly.'
        ],
        toolsAndResources: [
          'MDN HTML Elements Reference',
          'W3C Markup Validation Service (validator.w3.org)'
        ],
        practicalDemonstration:
          'Notice how id="skills" pairs with <a href="#skills">Jump to Skills</a> to scroll smoothly within the same HTML page.',
        codeExamples: [
          {
            title: 'Semantic Headings, Lists & Links',
            language: 'html',
            code: `<header>
  <h1>Tunde Bakare — Junior Web Developer</h1>
  <nav>
    <ul>
      <li><a href="#about">About Me</a></li>
      <li><a href="#skills">Skills</a></li>
      <li><a href="mailto:tunde@example.com">Email Me</a></li>
    </ul>
  </nav>
</header>

<section id="about">
  <h2>About Me</h2>
  <p>Building fast, accessible websites in Lagos using semantic HTML5.</p>
</section>

<section id="skills">
  <h2>Technical Skills</h2>
  <ul>
    <li>HTML5 Semantic Markup</li>
    <li>CSS3 &amp; Responsive Layouts</li>
    <li>JavaScript Fundamentals</li>
  </ul>
</section>`,
            explanation: [
              'Lines 2–9: One <h1> establishes page identity, followed by a clean <ul> navigation menu.',
              'Lines 12 & 17: Section id attributes enable in-page anchor navigation (#about, #skills).',
              'Line 20: &amp; safely renders an ampersand character in HTML.'
            ],
            expectedOutput: 'Renders a clear heading, 3 clickable links, an About paragraph, and a 3-item bulleted Skills list.'
          }
        ],
        commonErrors: [
          {
            error: 'Writing "Click here" as link text',
            cause: 'Vague link labels give screen reader users zero context when scanning links.',
            fix: 'Use descriptive text such as "View Weather App Project" or "Read Documentation".'
          },
          {
            error: 'Placing a <div> or <p> directly inside <ul> outside an <li>',
            cause: 'Invalid HTML structure breaks list semantics.',
            fix: 'Wrap every list item inside <li>...</li>.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_2_1',
          title: 'Structure a Developer Bio Page with Headings, List & Links',
          prompt:
            'Complete the HTML snippet so it has one <h1>, two <h2> sections (About and Skills), an unordered list (<ul>) with at least 3 <li> items, and at least 2 anchor links (<a>).',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<body>
  <header>
    <h1>Your Name</h1>
    <nav>
      <a href="#about">About</a>
    </nav>
  </header>
  <main>
    <section id="about">
      <h2>About</h2>
      <p>Write a short bio here.</p>
    </section>
    <!-- Add a Skills section with <h2> and a <ul> containing 3 <li> items -->
  </main>
</body>
</html>`,
          language: 'html',
          runnableInBrowser: true,
          expectedOutput: 'Displays header navigation, About section, and a Skills section with 3 bulleted items.',
          hints: [
            'Add <section id="skills"><h2>Skills</h2><ul><li>...</li>...</ul></section>.',
            'Add a second <a href="#skills">Skills</a> inside <nav>.'
          ],
          validationChecks: [
            { label: 'Contains <h1>', pattern: '<h1[^>]*>.+</h1>' },
            { label: 'Contains <h2>', pattern: '<h2[^>]*>.+</h2>' },
            { label: 'Contains <ul> list', pattern: '<ul[^>]*>[\\s\\S]*<li>' },
            { label: 'Contains multiple links', pattern: '<a\\s+href=' }
          ],
          solutionSummary: 'Logical <h1> -> <h2> hierarchy paired with <ul><li> lists and #section anchor links.'
        },
        handsOnExercise: {
          title: 'Draft Your Portfolio HTML Outline',
          task: 'Write the unstyled semantic skeleton for your personal portfolio page using headings, lists, and navigation links.',
          steps: [
            'Create an <h1> header and a <nav> with 3 section links (#about, #projects, #contact).',
            'Add <h2> headings for About, Skills (with <ul>), and Projects.',
            'Validate your markup at validator.w3.org.'
          ],
          deliverable: 'Valid HTML5 skeleton with zero W3C structural errors.'
        },
        keyTakeaways: [
          'Keep heading levels sequential (<h1> then <h2> then <h3>).',
          'Use <ul> and <ol> with <li> elements for lists and navigation menus.',
          'Write descriptive link text and match anchor href="#id" to target id attributes.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_2_1_1',
            questionText: 'How many <h1> headings should a standard webpage normally have?',
            options: ['Zero', 'One primary <h1> describing the main page topic', 'Five to ten', 'One inside every <li>'],
            correctAnswer: 1,
            explanation: 'Using one main <h1> clarifies the top-level document hierarchy for users, assistive tech, and search engines.'
          },
          {
            id: 'kc_wdb_2_1_2',
            questionText: 'What does href="#contact" do when clicked on a webpage?',
            options: [
              'Sends an automatic SMS',
              'Scrolls to the element on the same page with id="contact"',
              'Deletes the contact form',
              'Opens a new browser tab'
            ],
            correctAnswer: 1,
            explanation: 'Hash fragment links (#id) navigate directly to the matching id attribute on the page.'
          },
          {
            id: 'kc_wdb_2_1_3',
            questionText: 'Which child element is valid directly inside <ul> or <ol>?',
            options: ['<div>', '<li>', '<p>', '<span>'],
            correctAnswer: 1,
            explanation: 'List containers (<ul> and <ol>) must contain <li> list item elements as direct children.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'MDN: Creating Hyperlinks',
            description: 'Reference on links, fragments, email links, and security attributes.',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_2_2',
        moduleId: 'mod_wdb_2',
        courseId: 'web-development-beginner',
        title: 'Semantic HTML5 Landmarks & Web Accessibility',
        sequence: 2,
        sequenceLabel: 'Lesson 2.2',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['WDB-HTML-02'],
        learningObjectives: [
          'Replace generic "div soup" with semantic landmarks (<header>, <nav>, <main>, <article>, <section>, <footer>).',
          'Apply meaningful alt attributes on images and <button> vs <a> correctly.',
          'Explain why semantic HTML boosts accessibility and SEO.'
        ],
        introduction:
          'Using <div> for everything works visually once styled, but leaves screen readers, keyboard users, and search engines blind to page structure.',
        lessonContent: [
          'Semantic Landmarks: HTML5 provides self-describing layout elements: <header> (top intro/brand area), <nav> (navigation links), <main> (unique primary content of the page—only one visible <main>), <section> (thematic grouping with a heading), <article> (self-contained card, blog post, or project item), <aside> (sidebar info), and <footer> (copyright and bottom links).',
          'Buttons vs. Links: Use <a href="..."> when navigating to a new page or section. Use <button type="button"> or <button type="submit"> when triggering an in-page action (opening a modal, submitting a form, toggling dark mode). Never make a clickable <div> instead of a <button>, because keyboard users cannot Tab to a plain <div>.',
          'Image Accessibility: Every <img> requires an alt attribute describing the image (e.g., alt="Screenshot of Kano Agro Marketplace dashboard"). If an image is purely decorative, use empty alt="" so screen readers skip it.'
        ],
        stepByStepInstructions: [
          'Audit a page layout and identify header, nav, main, sections, articles, and footer.',
          'Replace outer wrapper <div> tags with semantic HTML5 landmark tags.',
          'Check every <img> for meaningful alt text and every action control for <button>.'
        ],
        nigerianContextExamples: [
          'Accessible Public Information Portals: Keyboard-only navigation and proper semantic landmarks ensure users with visual impairments or broken trackpads can Tab cleanly through scholarship and community service portals.'
        ],
        toolsAndResources: [
          'Lighthouse Accessibility Audit (in Chrome DevTools)',
          'WebAIM Contrast & Accessibility Checklist'
        ],
        practicalDemonstration:
          'Comparing Non-Semantic vs Semantic:\n❌ <div class="top"><div class="btn" onclick="...">Submit</div></div>\n✅ <header>...</header><main><button type="submit">Submit</button></main>',
        codeExamples: [
          {
            title: 'Semantic Project Card Inside <main> and <article>',
            language: 'html',
            code: `<main>
  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">Featured Projects</h2>
    <article>
      <h3>Jos Weather &amp; Farm Alert</h3>
      <img src="weather-ui.png" alt="Mobile weather dashboard showing Jos rainfall forecast" width="320" height="180" />
      <p>Built with semantic HTML and clean CSS layout.</p>
      <a href="https://example.com/jos-weather">View Live Demo</a>
    </article>
  </section>
</main>
<footer>
  <p>&copy; 2026 Digital Corps Developer Portfolio</p>
</footer>`,
            explanation: [
              'Line 1: <main> marks the core page content for skip-navigation.',
              'Line 4: <article> represents a standalone project showcase card.',
              'Line 6: Descriptive alt text + explicit width/height prevent layout shift.'
            ],
            expectedOutput: 'Renders a structured project showcase card inside semantic landmarks.'
          }
        ],
        commonErrors: [
          {
            error: 'Using <div onclick="..."> instead of <button>',
            cause: 'Visual convenience without testing keyboard Tab/Enter keys.',
            fix: 'Always use native <button type="button"> for actions so keyboard and screen-reader support work automatically.'
          }
        ],
        handsOnExercise: {
          title: 'Refactor Generic Divs into Semantic Landmarks',
          task: 'Convert a <div>-heavy HTML skeleton into proper <header>, <nav>, <main>, <article>, and <footer> elements.',
          steps: [
            'Wrap your top banner and menu in <header> and <nav>.',
            'Wrap primary portfolio sections inside <main>.',
            'Wrap each project item in <article> and bottom text in <footer>.'
          ],
          deliverable: 'Updated semantic HTML5 layout with descriptive alt text on images.'
        },
        keyTakeaways: [
          'Semantic tags (<header>, <nav>, <main>, <section>, <article>, <footer>) communicate meaning.',
          'Links navigate (<a href>); buttons perform actions (<button>).',
          'Every informative <img> must have descriptive alt text.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_2_2_1',
            questionText: 'Which HTML element should you use for an interactive "Open Menu" or "Calculate Price" control?',
            options: ['<div class="btn">', '<span>', '<button type="button">', '<p>'],
            correctAnswer: 2,
            explanation: 'Native <button> elements support keyboard focus, Enter/Space activation, and screen readers out of the box.'
          },
          {
            id: 'kc_wdb_2_2_2',
            questionText: 'What is the purpose of the alt attribute on an <img> element?',
            options: [
              'To set the image border radius',
              'To provide a text alternative for screen readers and when images fail to load',
              'To make the image download faster',
              'To turn the image into a link'
            ],
            correctAnswer: 1,
            explanation: 'alt text ensures visually impaired users and slow connections still understand the image content.'
          },
          {
            id: 'kc_wdb_2_2_3',
            questionText: 'Which landmark wraps a self-contained blog post or portfolio project card?',
            options: ['<footer>', '<article>', '<nav>', '<head>'],
            correctAnswer: 1,
            explanation: '<article> represents an independent, self-contained composition such as a post or project item.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'MDN: HTML Semantics & Accessibility',
            description: 'How semantic landmarks improve accessibility and keyboard navigation.',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_2_3',
        moduleId: 'mod_wdb_2',
        courseId: 'web-development-beginner',
        title: 'HTML5 Forms, Labels, Tables & Native Validation',
        sequence: 3,
        sequenceLabel: 'Lesson 2.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-HTML-02'],
        learningObjectives: [
          'Build accessible HTML forms pairing <label for="..."> with matching input id attributes.',
          'Use appropriate HTML5 input types (text, email, tel, textarea, select) and native validation (required, minlength).',
          'Structure tabular data cleanly with <table>, <thead>, <tbody>, <tr>, <th>, and <td>.'
        ],
        introduction:
          'Every portfolio contact section, registration page, and business enquiry form relies on clean, accessible HTML5 form markup.',
        lessonContent: [
          'Accessible Form Controls: Always pair a visible <label for="email"> with <input id="email" name="email" type="email" required />. Relying only on placeholder text hurts usability because placeholders disappear as soon as the user starts typing.',
          'Built-In Validation Attributes: Modern HTML5 validates formats automatically before JavaScript even runs: type="email" checks email structure, required prevents blank submission, minlength="10" enforces message length, and type="tel" triggers a numeric keypad on mobile phones.',
          'Data Tables: Use <table> strictly for true tabular data (pricing tables, schedules, comparison grids), never for page layout. Wrap column headers in <thead><tr><th scope="col">...</th></tr></thead> and rows inside <tbody>.'
        ],
        stepByStepInstructions: [
          'Create a <form> element containing fields for Full Name, Email Address, Inquiry Topic (<select>), and Message (<textarea>).',
          'Connect every <label for="..."> to its matching input id.',
          'Add required and minlength attributes plus a <button type="submit">Send Message</button>.'
        ],
        nigerianContextExamples: [
          'Mobile-Friendly Order & Contact Forms: Using type="tel" for Nigerian phone numbers and clear <label> text above each input makes filling forms effortless on 5-inch Android screens.'
        ],
        toolsAndResources: [
          'MDN: Your First Form',
          'HTML5 Constraint Validation Attributes'
        ],
        practicalDemonstration:
          'Notice that clicking the <label> text automatically focuses the matching input box when for="visitor-name" matches id="visitor-name".',
        codeExamples: [
          {
            title: 'Accessible Portfolio Contact Form with Native Validation',
            language: 'html',
            code: `<section id="contact">
  <h2>Contact Me</h2>
  <form action="#" method="post">
    <div>
      <label for="visitor-name">Full Name</label>
      <input id="visitor-name" name="name" type="text" required minlength="2" placeholder="e.g., Chidi Okafor" />
    </div>
    <div>
      <label for="visitor-email">Email Address</label>
      <input id="visitor-email" name="email" type="email" required placeholder="chidi@example.com" />
    </div>
    <div>
      <label for="visitor-message">Project Details</label>
      <textarea id="visitor-message" name="message" rows="4" required minlength="10"></textarea>
    </div>
    <button type="submit">Send Enquiry</button>
  </form>
</section>`,
            explanation: [
              'Lines 5–6: for="visitor-name" links the label to id="visitor-name" for accessibility and larger tap targets.',
              'Line 10: type="email" instructs mobile browsers to display the @ keyboard and validate format.',
              'Line 16: Native <button type="submit"> triggers HTML5 validation before submitting.'
            ],
            expectedOutput: 'Renders a labelled 3-field contact form that refuses empty submissions or invalid emails.'
          }
        ],
        commonErrors: [
          {
            error: 'Clicking a form label does not focus the input box',
            cause: 'The label for attribute does not match the input id attribute.',
            fix: 'Ensure <label for="xyz"> and <input id="xyz"> use the exact same unique ID.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_2_3',
          title: 'Build a Validated Contact Form',
          prompt:
            'Complete the contact form below with properly connected <label for="..."> and <input id="..."> pairs for Name, Email (type="email"), and a Message <textarea> plus a submit button.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<body>
  <section id="contact">
    <h2>Get in Touch</h2>
    <form>
      <label for="full-name">Full Name</label>
      <input id="full-name" name="fullName" type="text" required />

      <!-- Add Email label + input (type="email", required) -->

      <!-- Add Message label + textarea (required) -->

      <button type="submit">Send Message</button>
    </form>
  </section>
</body>
</html>`,
          language: 'html',
          runnableInBrowser: true,
          expectedOutput: 'Displays Name, Email, Message controls and a submit button with native HTML5 validation.',
          hints: [
            'Use <label for="email">Email</label><input id="email" type="email" required />.',
            'Use <label for="message">Message</label><textarea id="message" required></textarea>.'
          ],
          validationChecks: [
            { label: 'Has <form> element', pattern: '<form' },
            { label: 'Has email input', pattern: 'type=["\']email["\']' },
            { label: 'Has textarea', pattern: '<textarea' },
            { label: 'Has submit button', pattern: 'type=["\']submit["\']' }
          ],
          solutionSummary: 'Every input pairs for/id attributes, uses semantic input types, and sets required validation.'
        },
        handsOnExercise: {
          title: 'Add a Contact Form & Skills Table to Your Portfolio HTML',
          task: 'Combine a semantic <table> of skill proficiency levels and a validated contact <form> into your project.',
          steps: [
            'Build a 2-column <table> listing Skill and Experience Level using <thead> and <tbody>.',
            'Add a 3-field contact <form> with matching for/id labels and required attributes.',
            'Test submitting empty fields in your browser to observe native validation tooltips.'
          ],
          deliverable: 'Portfolio HTML file with a structured table and accessible contact form.'
        },
        keyTakeaways: [
          'Always connect <label for="..."> with <input id="..."> instead of relying solely on placeholders.',
          'Choose specific types (email, tel, number, date) for better mobile keyboards and validation.',
          'Use <table> exclusively for tabular data with <thead> and <th> headers.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_2_3_1',
            questionText: 'How do you properly connect a visible label to an HTML input control?',
            options: [
              'Give the <label> class the same name as the <input> value',
              'Set the <label> for attribute equal to the <input> id attribute',
              'Put the input name inside the title attribute',
              'Use a <span> tag instead of <label>'
            ],
            correctAnswer: 1,
            explanation: 'Matching for="id" and id="id" enables click-to-focus and screen reader announcement.'
          },
          {
            id: 'kc_wdb_2_3_2',
            questionText: 'Which attribute prevents a user from submitting a blank input field?',
            options: ['placeholder', 'required', 'readonly', 'disabled'],
            correctAnswer: 1,
            explanation: 'The boolean required attribute triggers browser validation if the field is empty.'
          },
          {
            id: 'kc_wdb_2_3_3',
            questionText: 'Why should placeholder text never replace a visible <label>?',
            options: [
              'Placeholders disappear as soon as the user begins typing and have weak contrast for many readers',
              'Placeholders break HTML5 doctype',
              'Placeholders double the file size',
              'Placeholders cannot hold letters'
            ],
            correctAnswer: 0,
            explanation: 'Visible labels remain readable at all times and support assistive technologies.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'MDN: Client-Side Form Validation',
            description: 'Guide to HTML5 built-in form validation attributes.',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Form_validation'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 2 Assignment: Semantic Portfolio Skeleton',
      description: 'Build the complete HTML5 skeleton for your Personal Portfolio Website covering all required sections before adding CSS.',
      deliverables: [
        'index.html using <header>, <nav>, <main>, <section>, <article>, and <footer>',
        'Hero intro, About section, Skills list/table, at least 2 project cards with alt attributes, and a validated Contact form'
      ],
      evaluationCriteria: [
        'Valid HTML5 structure with single <h1> and logical <h2>/<h3> hierarchy',
        '100% label-to-input pairing on form controls',
        'Meaningful alt text and accessible links/buttons'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_2_1',
        questionText: 'Which tag identifies the dominant primary content region of a webpage?',
        options: ['<div class="body">', '<main>', '<aside>', '<header>'],
        correctAnswer: 1,
        explanation: '<main> identifies the primary content unique to the document.'
      },
      {
        id: 'mc_wdb_2_2',
        questionText: 'Which attribute on <input> gives smartphone users an @ sign and checks email formatting automatically?',
        options: ['type="text"', 'type="email"', 'type="url"', 'type="password"'],
        correctAnswer: 1,
        explanation: 'type="email" provides email format validation and mobile email keyboards.'
      },
      {
        id: 'mc_wdb_2_3',
        questionText: 'What should go inside the alt attribute of a purely decorative icon image?',
        options: ['alt="image"', 'alt="" (empty string)', 'alt="1234"', 'Omit alt completely'],
        correctAnswer: 1,
        explanation: 'Empty alt="" tells screen readers to skip decorative images instead of reading filenames.'
      },
      {
        id: 'mc_wdb_2_4',
        questionText: 'When should you choose <a href="..."> instead of <button>?',
        options: [
          'When navigating the user to another URL or page section',
          'When toggling an interactive calculator',
          'When submitting a form',
          'When closing a modal dialog'
        ],
        correctAnswer: 0,
        explanation: 'Links handle navigation; buttons handle in-page actions and form submissions.'
      },
      {
        id: 'mc_wdb_2_5',
        questionText: 'Which HTML elements group table column headers properly?',
        options: ['<ul> and <li>', '<thead>, <tr>, and <th>', '<p> and <b>', '<section> and <div>'],
        correctAnswer: 1,
        explanation: 'Table headers belong in <th> cells inside <thead><tr>.'
      }
    ]
  },

  // =========================================================================
  // MODULE 3: CSS3 AND WEB DESIGN
  // =========================================================================
  {
    moduleId: 'mod_wdb_3',
    courseId: 'web-development-beginner',
    sequence: 3,
    sequenceLabel: 'Module 3',
    title: 'CSS3 and Web Design',
    description:
      'Master CSS selectors, cascade & specificity, typography, color contrast, the CSS Box Model, and clean visual design for buttons and cards.',
    learningObjectiveIds: ['WDB-CSS-03'],
    lessons: [
      {
        lessonId: 'lesson_wdb_3_1',
        moduleId: 'mod_wdb_3',
        courseId: 'web-development-beginner',
        title: 'Selectors, Cascade, Specificity, Colors & Typography',
        sequence: 1,
        sequenceLabel: 'Lesson 3.1',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-CSS-03'],
        learningObjectives: [
          'Write element, class (.card), ID (#hero), and state (:hover, :focus-visible) CSS selectors.',
          'Explain how the CSS Cascade and specificity resolve conflicting styles.',
          'Set readable body line-height (1.6), contrast-safe colors, and custom CSS variables.'
        ],
        introduction:
          'CSS transforms raw black-and-white HTML into readable, trustworthy web interfaces. Understanding why one rule overrides another eliminates CSS frustration.',
        lessonContent: [
          'Selectors and Specificity: CSS rules target elements by tag (p), class (.project-card), or ID (#contact). Specificity hierarchy from lowest to highest is: Tag (0-0-1) < Class/Pseudo-class (0-1-0) < ID (1-0-0) < Inline style. Prefer classes for reusable styles and avoid !important hacks.',
          'CSS Custom Properties (Variables): Define your brand palette once under :root { --brand-green: #046a38; --ink: #0f172a; } and reuse var(--brand-green) everywhere. Changing your entire theme later takes one edit.',
          'Readable Typography & Contrast: Body copy reads best at 16px (1rem) with line-height: 1.6 and max-width: 65ch so lines do not stretch endlessly across wide screens. Always check color contrast (dark slate #1e293b on off-white #f8fafc passes WCAG AA easily).'
        ],
        stepByStepInstructions: [
          'Define :root variables for primary accent, background canvas, card surface, and body text.',
          'Style body with font-family, line-height: 1.6, background-color, and color.',
          'Add :hover and :focus-visible rules on links and buttons for clear interactive feedback.'
        ],
        nigerianContextExamples: [
          'System & Clean Web Fonts on Slow Networks: Pairing crisp system UI fonts or lightweight Google Fonts keeps portfolio pages readable immediately without downloading 2 MB font bundles on limited mobile data.'
        ],
        toolsAndResources: [
          'WebAIM Contrast Checker',
          'MDN CSS Specificity & Cascade Guide'
        ],
        practicalDemonstration:
          'Specificity Example:\np { color: gray; } /* Specificity: 0-0-1 */\n.highlight { color: #046a38; } /* Specificity: 0-1-0 — wins! */',
        codeExamples: [
          {
            title: 'CSS Variables, Typography & Hover States',
            language: 'css',
            code: `:root {
  --accent: #046a38;
  --accent-dark: #03522b;
  --surface: #ffffff;
  --canvas: #f8fafc;
  --text-main: #0f172a;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  line-height: 1.6;
  background-color: var(--canvas);
  color: var(--text-main);
  margin: 0;
}

.cta-button {
  background-color: var(--accent);
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.cta-button:hover {
  background-color: var(--accent-dark);
}`,
            explanation: [
              'Lines 1–7: Centralizes colors in :root variables so brand updates stay consistent.',
              'Line 11: line-height: 1.6 gives breathing room between lines of text.',
              'Lines 26–28: :hover gives immediate visual confirmation when pointing at the button.'
            ],
            expectedOutput: 'Renders crisp dark text on a soft off-white background with an emerald button that darkens on hover.'
          }
        ],
        commonErrors: [
          {
            error: 'New CSS rule does not apply',
            cause: 'A more specific selector (like #nav a) is overriding a simpler selector (.link), or there is a missing semicolon on the previous line.',
            fix: 'Inspect the element in DevTools Styles pane to see which rule crossed out yours and check syntax.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_3_1',
          title: 'Style a Portfolio Intro with CSS Variables & Hover Feedback',
          prompt:
            'Add CSS rules inside <style> to set a clean background color on body, style .btn-primary with background color and padding, and add a .btn-primary:hover rule.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    :root {
      --brand: #046a38;
    }
    body {
      font-family: system-ui, sans-serif;
      padding: 24px;
      /* Add background and text color */
    }
    /* Style .btn-primary and .btn-primary:hover */
  </style>
</head>
<body>
  <h1>Amina Bello — Web Developer</h1>
  <p>Building fast, accessible websites.</p>
  <button class="btn-primary">View Projects</button>
</body>
</html>`,
          language: 'css',
          runnableInBrowser: true,
          expectedOutput: 'Styled heading, readable body, and a colored padded button with hover state.',
          hints: [
            'Use background-color: var(--brand); color: white; padding: 10px 20px; border-radius: 8px; on .btn-primary.',
            'Add .btn-primary:hover { background-color: #024a27; }.'
          ],
          validationChecks: [
            { label: 'Targets .btn-primary', pattern: '\\.btn-primary\\s*\\{' },
            { label: 'Includes hover rule', pattern: '\\.btn-primary:hover' },
            { label: 'Uses CSS variable or color', pattern: 'background(-color)?:' }
          ],
          solutionSummary: 'Class selectors paired with :root CSS variables and :hover feedback create maintainable UI styling.'
        },
        handsOnExercise: {
          title: 'Create Your Brand Typography & Color Sheet',
          task: 'Write a css/styles.css file defining color variables, readable body text, and heading scales.',
          steps: [
            'Declare 4 CSS custom properties under :root.',
            'Style body font, color, background, and line-height: 1.6.',
            'Style h1, h2, links, and focus outlines cleanly.'
          ],
          deliverable: 'css/styles.css linked to your portfolio index.html.'
        },
        keyTakeaways: [
          'Class selectors (.card) are reusable and preferable to heavy ID styling or !important.',
          'CSS custom properties (--var) keep brand colors consistent across pages.',
          'Accessible typography uses at least 16px body text, 1.6 line-height, and strong color contrast.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_3_1_1',
            questionText: 'Which CSS selector has the highest specificity among tag, class, and ID?',
            options: ['Element tag (p)', 'Class (.card)', 'ID (#hero)', 'Universal (*)'],
            correctAnswer: 2,
            explanation: 'ID selectors (#hero) outrank class selectors (.card), which outrank tag selectors (p).'
          },
          {
            id: 'kc_wdb_3_1_2',
            questionText: 'Why do developers define colors inside :root CSS variables?',
            options: [
              'So they can update a brand color once in one place and reuse var(--name) everywhere',
              'Because hex codes stop working in HTML5',
              'To replace HTML tags',
              'To bypass browser cache'
            ],
            correctAnswer: 0,
            explanation: 'CSS custom properties eliminate duplicate hex codes and make theming trivial.'
          },
          {
            id: 'kc_wdb_3_1_3',
            questionText: 'What is a comfortable line-height range for multi-line body paragraphs?',
            options: ['0.8', '1.5 to 1.7', '4.0', '0.5'],
            correctAnswer: 1,
            explanation: 'Line-height around 1.5–1.7 prevents lines from crowding vertically.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'web.dev: Learn CSS Specificity',
            description: 'Visual explanation of how browsers resolve competing CSS declarations.',
            url: 'https://web.dev/learn/css/specificity'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_3_2',
        moduleId: 'mod_wdb_3',
        courseId: 'web-development-beginner',
        title: 'The CSS Box Model: Margin, Padding, Border & Box-Sizing',
        sequence: 2,
        sequenceLabel: 'Lesson 3.2',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-CSS-03'],
        learningObjectives: [
          'Explain the four layers of the CSS Box Model: content, padding, border, and margin.',
          'Apply * { box-sizing: border-box; } so widths stay predictable.',
          'Use padding for internal breathing room and margin for separation between elements.'
        ],
        introduction:
          'Every single element on a webpage—every heading, image, button, and card—is a rectangular box governed by the CSS Box Model.',
        lessonContent: [
          'Inside-Out Layers: Content sits at the center; Padding clears space around the content inside the border; Border wraps the padding and content; Margin pushes neighboring elements away outside the border.',
          'Why box-sizing: border-box Changes Everything: By default (content-box), setting width: 300px plus padding: 20px and border: 2px makes the box 344px wide, breaking multi-column layouts! Adding *, *::before, *::after { box-sizing: border-box; } makes width: 300px include padding and border automatically.',
          'Design Whitespace Rule: Give cards generous inner padding (1.25rem–1.5rem) and consistent outer spacing so content never cramps against borders.'
        ],
        stepByStepInstructions: [
          'Add box-sizing: border-box at the top of your stylesheet.',
          'Create a .card class with background: #ffffff, border: 1px solid #e2e8f0, border-radius: 12px, padding: 24px, and margin-bottom: 16px.',
          'Inspect the card in Chrome DevTools Computed panel to see content, padding, border, and margin boxes.'
        ],
        nigerianContextExamples: [
          'Clean SME Price Cards: Giving an Abuja catering menu card 20px of padding and 16px margin between cards immediately turns a cluttered wall of text into a trustworthy storefront.'
        ],
        toolsAndResources: [
          'Chrome DevTools Box Model Inspector',
          'MDN: The Box Model'
        ],
        practicalDemonstration:
          'content-box (default): total width = width + 2*padding + 2*border\nborder-box (recommended): total width = width (padding & border fit inside!)',
        codeExamples: [
          {
            title: 'Predictable Card Layout Using border-box',
            language: 'css',
            code: `*, *::before, *::after {
  box-sizing: border-box;
}

.project-card {
  max-width: 420px;
  padding: 24px;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  margin: 0 auto 20px auto;
  background-color: #ffffff;
}`,
            explanation: [
              'Lines 1–3: Ensures width and max-width include padding and borders predictably.',
              'Line 7: Padding adds 24px breathing room inside the card border.',
              'Line 10: margin centers the card horizontally (auto) and adds 20px bottom spacing.'
            ],
            expectedOutput: 'Renders a centered card maximum 420px wide with crisp internal padding and subtle hairline border.'
          }
        ],
        commonErrors: [
          {
            error: 'Two 50%-width columns wrap onto separate lines',
            cause: 'Default box-sizing: content-box adds padding/border on top of 50%, exceeding 100%.',
            fix: 'Apply * { box-sizing: border-box; } globally.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_3_2',
          title: 'Fix Box Sizing & Style a Card with Margin and Padding',
          prompt:
            'Apply box-sizing: border-box globally and give .card internal padding, a 1px border, rounded corners, and bottom margin.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    /* Add global box-sizing: border-box rule */

    .card {
      width: 300px;
      background: #ffffff;
      /* Add padding, border, border-radius, and margin */
    }
  </style>
</head>
<body style="background:#f1f5f9; padding:20px; font-family:sans-serif;">
  <div class="card">
    <h3>Portfolio Project</h3>
    <p>Styled cleanly with the CSS Box Model.</p>
  </div>
</body>
</html>`,
          language: 'css',
          runnableInBrowser: true,
          expectedOutput: 'A clean 300px wide card with internal padding and subtle border.',
          hints: [
            'Write * { box-sizing: border-box; } at the top.',
            'Inside .card add padding: 20px; border: 1px solid #cbd5e1; border-radius: 12px; margin-bottom: 16px;.'
          ],
          validationChecks: [
            { label: 'Uses box-sizing: border-box', pattern: 'box-sizing:\\s*border-box' },
            { label: 'Sets padding inside .card', pattern: 'padding:' },
            { label: 'Sets border on .card', pattern: 'border:' }
          ],
          solutionSummary: 'box-sizing: border-box keeps declared widths accurate regardless of padding or borders.'
        },
        handsOnExercise: {
          title: 'Style Portfolio Sections & Project Cards',
          task: 'Add box-sizing: border-box and card spacing to your portfolio stylesheet.',
          steps: [
            'Add the universal box-sizing reset at line 1 of css/styles.css.',
            'Create a .container class with max-width: 960px and margin: 0 auto.',
            'Style project <article> elements as clean cards with padding and hairline borders.'
          ],
          deliverable: 'Structured portfolio layout with centered container and evenly spaced cards.'
        },
        keyTakeaways: [
          'Always begin stylesheets with *, *::before, *::after { box-sizing: border-box; }.',
          'Padding creates internal space inside borders; margin creates external space between elements.',
          'Margin: 0 auto centers block containers that have a defined width or max-width.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_3_2_1',
            questionText: 'Which Box Model property creates space BETWEEN the element content and its border?',
            options: ['margin', 'padding', 'outline', 'z-index'],
            correctAnswer: 1,
            explanation: 'Padding sits inside the border around the content; margin sits outside the border.'
          },
          {
            id: 'kc_wdb_3_2_2',
            questionText: 'What does box-sizing: border-box do to an element with width: 300px and padding: 20px?',
            options: [
              'Makes the rendered box 340px wide',
              'Keeps the total rendered width at 300px by absorbing padding inside the width',
              'Removes all padding',
              'Turns the element inline'
            ],
            correctAnswer: 1,
            explanation: 'border-box includes padding and border inside the declared width.'
          },
          {
            id: 'kc_wdb_3_2_3',
            questionText: 'Which CSS declaration horizontally centers a container with max-width: 960px?',
            options: ['text-align: middle;', 'margin: 0 auto;', 'padding: auto;', 'float: center;'],
            correctAnswer: 1,
            explanation: 'Setting left and right margins to auto splits remaining horizontal space equally.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'web.dev: The Box Model',
            description: 'Interactive breakdown of padding, borders, margins, and border-box.',
            url: 'https://web.dev/learn/css/box-model'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_3_3',
        moduleId: 'mod_wdb_3',
        courseId: 'web-development-beginner',
        title: 'Styling Forms, Navigation Links & Polished UI Details',
        sequence: 3,
        sequenceLabel: 'Lesson 3.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-CSS-03'],
        learningObjectives: [
          'Style form inputs, textareas, and labels with accessible focus rings (:focus-visible).',
          'Remove default list bullets on navigation bars and style clear hover transitions.',
          'Apply consistent border radius, subtle surface contrast, and clean alignment.'
        ],
        introduction:
          'Unstyled browser form fields look cramped and outdated. Clean spacing, readable font sizes, and crisp focus states make forms inviting to complete.',
        lessonContent: [
          'Styling Forms for Comfort: Give <input> and <textarea> width: 100%, generous padding (10px 12px), font: inherit (since browsers do not automatically inherit body fonts onto inputs!), a subtle 1px border, and border-radius: 8px.',
          'Never Hide Focus Outlines Without Replacement: Keyboard users rely on focus rings to see where they are. Style input:focus-visible, button:focus-visible { outline: 2px solid #046a38; outline-offset: 2px; } so keyboard focus looks sharp and intentional.',
          'Subtle Transitions: A brief transition: background-color 150ms ease, border-color 150ms ease; gives buttons and inputs responsive polish without heavy animations.'
        ],
        stepByStepInstructions: [
          'Style form labels as display: block with bold weight and 6px bottom margin.',
          'Make inputs and textareas full-width inside their form container with font: inherit.',
          'Style your submit button and navigation links with clear hover and focus-visible states.'
        ],
        nigerianContextExamples: [
          'Touch-Friendly Targets: Setting minimum button padding to 12px vertically and 20px horizontally guarantees a 44px+ touch target so smartphone thumbs never tap the wrong link.'
        ],
        toolsAndResources: [
          'MDN: Styling Web Forms',
          'CSS Transitions Guide'
        ],
        practicalDemonstration:
          'Key form fix: input, textarea, button { font: inherit; } ensures form fields match your clean page font instead of tiny default monospace/system fonts.',
        codeExamples: [
          {
            title: 'Clean Form Inputs & Accessible Focus States',
            language: 'css',
            code: `.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  font: inherit;
  padding: 10px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  transition: border-color 150ms ease;
}

.form-group input:focus-visible,
.form-group textarea:focus-visible {
  outline: 2px solid #046a38;
  outline-offset: 1px;
  border-color: #046a38;
}`,
            explanation: [
              'Line 6: display: block puts each label cleanly above its input box.',
              'Line 15: font: inherit keeps typography consistent inside inputs and textareas.',
              'Lines 22–26: :focus-visible renders a crisp emerald outline for keyboard accessibility.'
            ],
            expectedOutput: 'Form inputs align cleanly at 100% width with smooth emerald focus rings.'
          }
        ],
        commonErrors: [
          {
            error: 'Button or input font looks smaller or different from body text',
            cause: 'Browsers apply separate default font styles to form controls.',
            fix: 'Add font: inherit; to input, textarea, select, and button.'
          }
        ],
        handsOnExercise: {
          title: 'Polish Your Portfolio Contact Form & Navigation',
          task: 'Style your portfolio contact form and header links with consistent spacing, font: inherit, and focus-visible rings.',
          steps: [
            'Remove bullets on nav ul with list-style: none; padding: 0;.',
            'Apply form-group spacing, full-width inputs, and focus-visible styles.',
            'Test navigating through every link and input using only your Tab key.'
          ],
          deliverable: 'Styled, keyboard-accessible portfolio contact form.'
        },
        keyTakeaways: [
          'Always apply font: inherit on inputs, textareas, selects, and buttons.',
          'Style :focus-visible rather than removing focus outlines.',
          'Ensure mobile interactive buttons are at least 44px tall for comfortable tapping.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_3_3_1',
            questionText: 'Why should you add font: inherit; to <input>, <textarea>, and <button> elements in CSS?',
            options: [
              'Browsers do not automatically inherit the page font-family and font-size onto form controls',
              'It makes inputs read-only',
              'It disables spellchecking',
              'It converts HTML to JSON'
            ],
            correctAnswer: 0,
            explanation: 'Form controls use separate browser default fonts unless font: inherit is declared.'
          },
          {
            id: 'kc_wdb_3_3_2',
            questionText: 'What is the accessibility risk of writing *:focus { outline: none; } without a replacement?',
            options: [
              'Images fail to load',
              'Keyboard users can no longer see which link, input, or button is currently focused',
              'CSS variables stop working',
              'Mobile screens rotate horizontally'
            ],
            correctAnswer: 1,
            explanation: 'Visible focus indicators are essential for keyboard and assistive navigation.'
          },
          {
            id: 'kc_wdb_3_3_3',
            questionText: 'Which CSS declaration removes default bullet points from a navigation <ul>?',
            options: ['bullets: off;', 'list-style: none;', 'text-decoration: none;', 'display: hidden;'],
            correctAnswer: 1,
            explanation: 'list-style: none removes bullet discs or numbers on lists.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'MDN: :focus-visible Pseudo-Class',
            description: 'Best practices for accessible focus styling.',
            url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 3 Assignment: Styled Portfolio Visual System',
      description: 'Apply a coherent CSS3 design system to your HTML5 portfolio from Module 2.',
      deliverables: [
        'css/styles.css with :root color variables, box-sizing: border-box, and readable typography',
        'Styled project cards, button hover states, and an accessible contact form'
      ],
      evaluationCriteria: [
        'WCAG AA readable color contrast',
        'Consistent spacing using padding/margin without overlapping text',
        'Visible keyboard focus rings on interactive elements'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_3_1',
        questionText: 'Which selector targets every element with class="skill-badge"?',
        options: ['#skill-badge', '.skill-badge', 'skill-badge', '*skill-badge'],
        correctAnswer: 1,
        explanation: 'Class selectors always start with a dot (.).'
      },
      {
        id: 'mc_wdb_3_2',
        questionText: 'What does box-sizing: border-box prevent?',
        options: [
          'JavaScript syntax errors',
          'Padding and borders unexpectedly expanding an element beyond its declared width',
          'Missing alt attributes',
          'Broken HTTP links'
        ],
        correctAnswer: 1,
        explanation: 'border-box keeps total box dimensions equal to declared width/height.'
      },
      {
        id: 'mc_wdb_3_3',
        questionText: 'Which unit scales proportionally to the root <html> font size?',
        options: ['px', 'rem', 'cm', 'pt'],
        correctAnswer: 1,
        explanation: 'rem stands for root em, making spacing and type scale cleanly with user font preferences.'
      },
      {
        id: 'mc_wdb_3_4',
        questionText: 'Which CSS property adds rounded corners to cards and buttons?',
        options: ['corner-style', 'border-radius', 'box-curve', 'padding-round'],
        correctAnswer: 1,
        explanation: 'border-radius rounds the corners of element boxes.'
      },
      {
        id: 'mc_wdb_3_5',
        questionText: 'Which pseudo-class applies styling only when a pointer hovers over an element?',
        options: [':visited', ':hover', ':nth-child(1)', ':root'],
        correctAnswer: 1,
        explanation: ':hover activates while a cursor points over the element.'
      }
    ]
  },

  // =========================================================================
  // MODULE 4: RESPONSIVE WEB DESIGN
  // =========================================================================
  {
    moduleId: 'mod_wdb_4',
    courseId: 'web-development-beginner',
    sequence: 4,
    sequenceLabel: 'Module 4',
    title: 'Responsive Web Design',
    description:
      'Design mobile-first websites that adapt seamlessly across smartphones, tablets, and desktops using Flexbox, CSS Grid, and Media Queries.',
    learningObjectiveIds: ['WDB-RWD-04'],
    lessons: [
      {
        lessonId: 'lesson_wdb_4_1',
        moduleId: 'mod_wdb_4',
        courseId: 'web-development-beginner',
        title: 'Mobile-First Thinking, Viewport Meta & Fluid Units',
        sequence: 1,
        sequenceLabel: 'Lesson 4.1',
        estimatedDurationMinutes: 25,
        learningObjectiveIds: ['WDB-RWD-04'],
        learningObjectives: [
          'Explain why <meta name="viewport" content="width=device-width, initial-scale=1.0" /> is mandatory.',
          'Prevent horizontal image overflow with img { max-width: 100%; height: auto; display: block; }.',
          'Use fluid units (%, rem, min(), clamp()) instead of rigid desktop pixel widths.'
        ],
        introduction:
          'Over 70% of everyday visitors in Nigeria browse first on a smartphone. Mobile-first design starts with a single clean column for phones and expands cleanly for larger screens.',
        lessonContent: [
          'The Viewport Meta Tag: Without <meta name="viewport" content="width=device-width, initial-scale=1.0" />, mobile browsers pretend the screen is 980px wide and shrink your whole webpage down until text becomes unreadable.',
          'Fluid Images & Containers: Never hardcode width: 900px on a container. Instead use width: 100%; max-width: 1100px; padding-inline: 16px; so the container shrinks smoothly on 360px phones while stopping at a comfortable reading width on desktops. Always add img { max-width: 100%; height: auto; }.',
          'Responsive Typography with clamp(): clamp(1.75rem, 4vw, 3rem) lets hero headings grow smoothly from mobile to desktop without overflowing narrow viewports.'
        ],
        stepByStepInstructions: [
          'Confirm the viewport meta tag sits inside <head> on every HTML page.',
          'Add img { max-width: 100%; height: auto; display: block; } to your CSS reset.',
          'Replace fixed pixel widths on layout wrappers with width: 100%; max-width: ...;.'
        ],
        nigerianContextExamples: [
          'Zero Horizontal Scrollbar Test: Opening a local fashion boutique website on a Tecno or Samsung phone should never force the shopper to pinch-zoom or scroll sideways.'
        ],
        toolsAndResources: [
          'MDN: Responsive Design Basics',
          'DevTools Responsive Mode (360px, 768px, 1280px)'
        ],
        practicalDemonstration:
          'Fluid Container Formula:\n.wrapper {\n  width: 100%;\n  max-width: 1080px;\n  margin-inline: auto;\n  padding-inline: 1rem;\n}',
        codeExamples: [
          {
            title: 'Fluid Container & Responsive Image Reset',
            language: 'css',
            code: `img {
  max-width: 100%;
  height: auto;
  display: block;
}

.wrapper {
  width: 100%;
  max-width: 1080px;
  margin-inline: auto;
  padding-inline: 1rem;
}

.hero-title {
  font-size: clamp(1.75rem, 4vw, 3rem);
  line-height: 1.15;
}`,
            explanation: [
              'Lines 1–5: Prevents large photos from breaking out of narrow phone screens.',
              'Lines 7–12: Keeps content 100% wide on mobile with 1rem side padding, capped at 1080px on desktop.',
              'Line 15: Scales heading cleanly between 1.75rem and 3rem based on screen width.'
            ],
            expectedOutput: 'Zero horizontal overflow across 360px mobile and 1440px desktop viewports.'
          }
        ],
        commonErrors: [
          {
            error: 'Page scrolls sideways on mobile phones',
            cause: 'A fixed-width element (e.g. width: 800px) or large image without max-width: 100% pushes past the viewport.',
            fix: 'Use max-width instead of fixed width and apply max-width: 100% to images.'
          }
        ],
        handsOnExercise: {
          title: 'Eliminate Horizontal Overflow',
          task: 'Update your portfolio CSS with fluid wrapper sizing and responsive image rules, then test at 360px width.',
          steps: [
            'Verify <meta name="viewport"> in index.html.',
            'Add responsive img and .wrapper CSS classes.',
            'Test at 360px in DevTools to verify zero horizontal scrollbar.'
          ],
          deliverable: 'Mobile-friendly wrapper verified at 360px, 768px, and 1280px.'
        },
        keyTakeaways: [
          'Never omit the <meta name="viewport"> tag.',
          'Combine width: 100% with max-width for fluid containers.',
          'Always constrain images with max-width: 100%; height: auto;.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_4_1_1',
            questionText: 'What happens on smartphones if <meta name="viewport" content="width=device-width, initial-scale=1.0" /> is missing?',
            options: [
              'The page turns monochrome',
              'Mobile browsers zoom out to simulate a wide desktop screen, making text tiny',
              'CSS Flexbox stops working on laptops',
              'Forms delete user input'
            ],
            correctAnswer: 1,
            explanation: 'The viewport meta tag tells mobile browsers to render CSS pixels at the phone’s actual device width.'
          },
          {
            id: 'kc_wdb_4_1_2',
            questionText: 'Which CSS combination prevents large images from causing horizontal scrolling on small screens?',
            options: [
              'img { width: 1200px; }',
              'img { max-width: 100%; height: auto; }',
              'img { overflow: scroll; }',
              'img { position: fixed; }'
            ],
            correctAnswer: 1,
            explanation: 'max-width: 100% shrinks an image to fit its parent container while height: auto preserves aspect ratio.'
          },
          {
            id: 'kc_wdb_4_1_3',
            questionText: 'What does mobile-first CSS mean?',
            options: [
              'Writing styles for smartphones first, then layering enhancements for wider screens using min-width media queries',
              'Blocking desktop laptops from viewing the site',
              'Writing JavaScript before HTML',
              'Using only inline styles'
            ],
            correctAnswer: 0,
            explanation: 'Mobile-first starts with simple single-column base styles and adds multi-column rules as viewport width increases.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'web.dev: Responsive Web Design Basics',
            description: 'Complete overview of viewports, fluid grids, and mobile-first breakpoints.',
            url: 'https://web.dev/articles/responsive-web-design-basics'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_4_2',
        moduleId: 'mod_wdb_4',
        courseId: 'web-development-beginner',
        title: 'CSS Flexbox for Navigation Bars & Flexible Rows',
        sequence: 2,
        sequenceLabel: 'Lesson 4.2',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-RWD-04'],
        learningObjectives: [
          'Align items in a row or column using display: flex, justify-content, align-items, and gap.',
          'Allow items to wrap smoothly onto new lines on small screens using flex-wrap: wrap.',
          'Build a responsive navigation header and badge/skill list with Flexbox.'
        ],
        introduction:
          'Flexbox makes arranging items in one dimension (either a horizontal row or a vertical column) effortless—no brittle float hacks required.',
        lessonContent: [
          'Parent vs. Child in Flexbox: Applying display: flex on a parent container turns its direct children into flex items. By default they sit side-by-side in a row.',
          'Alignment & Spacing: justify-content aligns items along the main axis (e.g., space-between puts logo on the left and nav links on the right). align-items: center aligns them vertically. gap: 16px adds clean spacing between items without messy margin math.',
          'Mobile Wrapping: Adding flex-wrap: wrap lets navigation links or skill tags wrap cleanly onto a second line on narrow screens instead of squishing off the right edge.'
        ],
        stepByStepInstructions: [
          'Set display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; on your <header>.',
          'Set display: flex; flex-wrap: wrap; gap: 1rem; on your navigation <ul>.',
          'Use Flexbox with gap to arrange your Skills badges neatly.'
        ],
        nigerianContextExamples: [
          'Responsive Navbar on Any Screen: A brand wordmark on the left and 3 links (About, Projects, Contact) on the right stay aligned on desktop and wrap gracefully on 360px phones.'
        ],
        toolsAndResources: [
          'MDN: Basic Concepts of Flexbox',
          'CSS-Tricks Complete Guide to Flexbox'
        ],
        practicalDemonstration:
          'Main Axis vs Cross Axis:\nflex-direction: row -> justify-content is horizontal, align-items is vertical.\nflex-direction: column -> justify-content is vertical, align-items is horizontal.',
        codeExamples: [
          {
            title: 'Responsive Flexbox Navigation Header',
            language: 'css',
            code: `.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid #e2e8f0;
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 1.25rem;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
}`,
            explanation: [
              'Lines 2–6: Spreads brand logo and nav menu apart with vertical centering and automatic wrapping.',
              'Lines 11–17: Places nav items in a clean horizontal row spaced evenly by 1.25rem gap.'
            ],
            expectedOutput: 'Logo and links align in one sleek bar on desktop and wrap cleanly without clipping on phones.'
          }
        ],
        commonErrors: [
          {
            error: 'Items overflow horizontally inside a flex row on narrow screens',
            cause: 'flex-wrap defaults to nowrap.',
            fix: 'Add flex-wrap: wrap; to flex containers holding multiple links or cards.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_4_2',
          title: 'Build a Responsive Flexbox Navbar',
          prompt:
            'Use Flexbox on .navbar and .nav-links so the brand name sits on the left, links sit horizontally on the right with a gap, and items wrap cleanly on narrow screens.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    .navbar {
      padding: 12px 16px;
      background: #0f172a;
      color: white;
      /* Add Flexbox layout */
    }
    .nav-links {
      list-style: none;
      margin: 0;
      padding: 0;
      /* Arrange links horizontally with gap */
    }
    .nav-links a { color: #cbd5e1; text-decoration: none; }
  </style>
</head>
<body style="margin:0; font-family:sans-serif;">
  <header class="navbar">
    <strong>Zainab.dev</strong>
    <ul class="nav-links">
      <li><a href="#about">About</a></li>
      <li><a href="#projects">Projects</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </header>
</body>
</html>`,
          language: 'css',
          runnableInBrowser: true,
          expectedOutput: 'Dark header with Zainab.dev on the left and 3 horizontal links spaced evenly on the right.',
          hints: [
            'On .navbar use display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;.',
            'On .nav-links use display: flex; gap: 16px; flex-wrap: wrap;.'
          ],
          validationChecks: [
            { label: 'Uses display: flex', pattern: 'display:\\s*flex' },
            { label: 'Uses justify-content', pattern: 'justify-content:' },
            { label: 'Uses gap spacing', pattern: 'gap:' }
          ],
          solutionSummary: 'Flexbox with justify-content: space-between, gap, and flex-wrap builds clean responsive navbars.'
        },
        handsOnExercise: {
          title: 'Build Your Portfolio Flexbox Header & Skill Strip',
          task: 'Apply Flexbox to your portfolio navbar and skills list.',
          steps: [
            'Turn your <header> into a flex container with space-between and flex-wrap.',
            'Turn your nav <ul> into a horizontal flex list with gap: 1.25rem.',
            'Resize the browser from desktop to mobile to verify zero overlap.'
          ],
          deliverable: 'Flexbox-powered navigation bar working at all screen widths.'
        },
        keyTakeaways: [
          'Flexbox aligns children along one axis (row or column) with display: flex.',
          'gap replaces awkward first-child/last-child margin hacks.',
          'flex-wrap: wrap prevents horizontal overflow on mobile phones.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_4_2_1',
            questionText: 'Which Flexbox property spaces the logo to the far left and navigation links to the far right?',
            options: ['align-items: stretch;', 'justify-content: space-between;', 'flex-direction: column;', 'order: 2;'],
            correctAnswer: 1,
            explanation: 'justify-content: space-between places the first flex child at the start and the last at the end.'
          },
          {
            id: 'kc_wdb_4_2_2',
            questionText: 'What does gap: 1rem; do inside a flex container?',
            options: [
              'Adds 1rem space ONLY between adjacent flex items without extra outer margins',
              'Deletes 1rem from the border',
              'Centers text inside buttons',
              'Increases page load time'
            ],
            correctAnswer: 0,
            explanation: 'gap creates clean uniform spacing between flex or grid items.'
          },
          {
            id: 'kc_wdb_4_2_3',
            questionText: 'Which property allows flex items to drop neatly onto a second row when the screen gets narrow?',
            options: ['flex-wrap: wrap;', 'overflow: hidden;', 'white-space: nowrap;', 'float: left;'],
            correctAnswer: 0,
            explanation: 'flex-wrap: wrap enables multi-line wrapping when available horizontal space runs out.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'CSS-Tricks: A Complete Guide to Flexbox',
            description: 'Visual reference covering parent and child flex properties.',
            url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_4_3',
        moduleId: 'mod_wdb_4',
        courseId: 'web-development-beginner',
        title: 'CSS Grid & Media Queries for Multi-Screen Layouts',
        sequence: 3,
        sequenceLabel: 'Lesson 4.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-RWD-04'],
        learningObjectives: [
          'Build responsive two-dimensional card grids using display: grid and grid-template-columns.',
          'Write mobile-first @media (min-width: 768px) queries cleanly.',
          'Use auto-fit with minmax() for responsive grids that adapt with minimal code.'
        ],
        introduction:
          'While Flexbox excels at 1D rows like navbars, CSS Grid makes 2D card galleries (like your portfolio Projects section) effortless across phones, tablets, and desktops.',
        lessonContent: [
          'CSS Grid Fundamentals: Setting display: grid; grid-template-columns: 1fr; gap: 1.5rem; gives a crisp single column on smartphones. Using a mobile-first media query @media (min-width: 768px) { .projects-grid { grid-template-columns: repeat(2, 1fr); } } expands it into two balanced columns on tablets and laptops.',
          'The Auto-Responsive One-Liner: grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); tells the browser to automatically fit as many 260px+ columns as comfortably match the screen width—stacking into 1 column on phones and 3 columns on desktop.',
          'Common Mobile-First Breakpoints: 640px (large phones), 768px (tablets), and 1024px (laptops/desktops). Always write base styles for mobile first, then expand upward using min-width queries.'
        ],
        stepByStepInstructions: [
          'Create a .projects-grid wrapper around your portfolio <article> cards.',
          'Apply display: grid; gap: 1.5rem; grid-template-columns: 1fr; as the mobile base.',
          'Add @media (min-width: 768px) to transition smoothly to 2 or 3 columns on larger screens.'
        ],
        nigerianContextExamples: [
          'Multi-Device Product & Project Galleries: Using CSS Grid ensures a three-project portfolio looks sharp on an iPad, a 14-inch office laptop, and an Android smartphone alike.'
        ],
        toolsAndResources: [
          'MDN: CSS Grid Layout',
          'DevTools Grid Overlay Inspector'
        ],
        practicalDemonstration:
          'Mobile-First Breakpoint Progression:\nBase (0px+): 1 column\n@media (min-width: 768px): 2 columns\n@media (min-width: 1024px): 3 columns',
        codeExamples: [
          {
            title: 'Responsive Portfolio Project Grid with Media Query',
            language: 'css',
            code: `.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}`,
            explanation: [
              'Lines 1–5: Mobile-first base stacks project cards in 1 column with 1.5rem gap.',
              'Lines 7–11: Expands to 2 equal columns at 768px+ width.',
              'Lines 13–17: Expands to 3 equal columns at 1024px+ width.'
            ],
            expectedOutput: '1-column stack on phones, 2-column grid on tablets, 3-column grid on desktops.'
          }
        ],
        commonErrors: [
          {
            error: 'Grid columns refuse to shrink inside narrow screens',
            cause: 'Using fixed px columns (repeat(3, 300px)) or minmax(400px, 1fr) which exceeds 360px phone widths.',
            fix: 'Start with 1fr on mobile or use minmax(min(260px, 100%), 1fr).'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_4_3',
          title: 'Build a Responsive 3-Card Project Grid',
          prompt:
            'Style .grid-demo with display: grid, a gap, and responsive columns using repeat(auto-fit, minmax(200px, 1fr)) or a @media (min-width: 600px) query.',
          starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    * { box-sizing: border-box; }
    .grid-demo {
      /* Add CSS Grid with responsive columns and gap */
    }
    .card {
      padding: 16px;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      background: white;
    }
  </style>
</head>
<body style="background:#f8fafc; padding:16px; font-family:sans-serif;">
  <div class="grid-demo">
    <div class="card"><h4>Project 1</h4><p>Weather App</p></div>
    <div class="card"><h4>Project 2</h4><p>Budget Tracker</p></div>
    <div class="card"><h4>Project 3</h4><p>School Portal</p></div>
  </div>
</body>
</html>`,
          language: 'css',
          runnableInBrowser: true,
          expectedOutput: '3 cards stacked cleanly on narrow viewports and side-by-side in columns on wider viewports.',
          hints: [
            'Add display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); inside .grid-demo.'
          ],
          validationChecks: [
            { label: 'Uses display: grid', pattern: 'display:\\s*grid' },
            { label: 'Defines grid-template-columns', pattern: 'grid-template-columns:' },
            { label: 'Defines gap', pattern: 'gap:' }
          ],
          solutionSummary: 'CSS Grid with fr units and auto-fit/media queries delivers clean multi-screen layouts.'
        },
        handsOnExercise: {
          title: 'Make Your Full Portfolio Responsive Across 3 Breakpoints',
          task: 'Add CSS Grid to your Projects section and test across mobile (360px), tablet (768px), and desktop (1280px).',
          steps: [
            'Set up 1-column mobile base styles for your Projects grid.',
            'Add @media (min-width: 768px) for 2-column tablet/desktop display.',
            'Verify all sections (Hero, About, Skills, Projects, Contact) remain readable with zero horizontal scroll.'
          ],
          deliverable: 'Fully responsive portfolio CSS verified across mobile, tablet, and desktop.'
        },
        keyTakeaways: [
          'Use Flexbox for 1D alignment (navbars, button rows) and CSS Grid for 2D grids (project cards).',
          'Write mobile-first @media (min-width: ...) queries starting from 1 column.',
          'fr units divide remaining grid track space cleanly.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_4_3_1',
            questionText: 'What does repeat(3, 1fr) mean in CSS Grid?',
            options: [
              'Repeat the HTML 3 times',
              'Create 3 equal-width flexible columns sharing available space',
              'Add 3px margin to each row',
              'Force 3 rows regardless of content'
            ],
            correctAnswer: 1,
            explanation: '1fr allocates an equal fraction of available grid container space to each of the 3 columns.'
          },
          {
            id: 'kc_wdb_4_3_2',
            questionText: 'In mobile-first responsive CSS, which media query condition expands a layout when the screen is 768px or wider?',
            options: ['@media (max-width: 768px)', '@media (min-width: 768px)', '@media (width < 768px)', '@media (screen-only)'],
            correctAnswer: 1,
            explanation: 'min-width: 768px activates once viewport width reaches 768px and above.'
          },
          {
            id: 'kc_wdb_4_3_3',
            questionText: 'Which layout tool is best suited for aligning a row of navigation links in one dimension?',
            options: ['Flexbox', '<table>', '<iframe>', '<pre>'],
            correctAnswer: 0,
            explanation: 'Flexbox is specifically designed for one-dimensional row or column alignment.'
          }
        ],
        furtherLearningResources: [
          {
            title: 'CSS-Tricks: Complete Guide to CSS Grid',
            description: 'Visual cheat sheet for Grid containers and items.',
            url: 'https://css-tricks.com/snippets/css/complete-guide-grid/'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 4 Assignment: Responsive Multi-Breakpoint Portfolio Layout',
      description: 'Upgrade your personal portfolio page with a responsive Flexbox navbar, fluid containers, and a CSS Grid project gallery.',
      deliverables: [
        'Mobile-first CSS passing the 360px zero-horizontal-scroll check',
        'Flexbox header and CSS Grid project section adapting cleanly at 768px and 1024px'
      ],
      evaluationCriteria: [
        'Zero horizontal overflow at 360px, 768px, and 1280px',
        'Proper use of Flexbox and CSS Grid instead of rigid pixel hacks'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_4_1',
        questionText: 'Which HTML tag enables proper responsive scaling on mobile phones?',
        options: [
          '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
          '<meta name="mobile" content="true" />',
          '<link rel="mobile" href="phone.css" />',
          '<body mobile="yes">'
        ],
        correctAnswer: 0,
        explanation: 'The viewport meta tag instructs mobile devices to match CSS width to device screen width.'
      },
      {
        id: 'mc_wdb_4_2',
        questionText: 'Which Flexbox property prevents navigation links from overflowing horizontally on small phones?',
        options: ['flex-wrap: wrap;', 'justify-content: start;', 'align-items: baseline;', 'flex-shrink: 0;'],
        correctAnswer: 0,
        explanation: 'flex-wrap: wrap lets items move cleanly onto the next line.'
      },
      {
        id: 'mc_wdb_4_3',
        questionText: 'What is the mobile-first CSS pattern?',
        options: [
          'Design mobile styles first, then apply @media (min-width: ...) for larger viewports',
          'Write desktop styles first with max-width: 200px',
          'Hide half the text on phones',
          'Use fixed 1200px widths everywhere'
        ],
        correctAnswer: 0,
        explanation: 'Starting with mobile base styles keeps CSS lean and resilient.'
      },
      {
        id: 'mc_wdb_4_4',
        questionText: 'Which CSS Grid unit represents a proportional fraction of available space?',
        options: ['px', 'fr', 'em', 'vw'],
        correctAnswer: 1,
        explanation: 'The fr unit distributes remaining space proportionally across grid tracks.'
      },
      {
        id: 'mc_wdb_4_5',
        questionText: 'Which two CSS declarations prevent wide images from distorting or overflowing their container?',
        options: [
          'max-width: 100%; height: auto;',
          'min-width: 100%; height: 500px;',
          'width: 200vw; overflow: visible;',
          'display: inline; margin: -20px;'
        ],
        correctAnswer: 0,
        explanation: 'max-width: 100% caps width to the container while height: auto keeps natural proportions.'
      }
    ]
  }
];
