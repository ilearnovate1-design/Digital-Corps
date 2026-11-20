import { AcademyCourse } from '../../../types';
import { WEB_DEV_BEGINNER_MODULES_1_TO_4 } from './webDevBeginnerModules1to4';
import { WEB_DEV_BEGINNER_MODULES_5_TO_8 } from './webDevBeginnerModules5to8';

export const COURSE_WEB_DEV_BEGINNER: AcademyCourse = {
  courseId: 'web-development-beginner',
  categoryId: 'web_development_academy',
  title: 'Beginner – Web Development Fundamentals',
  subtitle: 'HTML5, CSS3, Responsive Design, Vanilla JavaScript, Git & Live Portfolio Deployment',
  description:
    'Master the true foundations of modern web development by writing semantic HTML5, responsive CSS3 (Flexbox & Grid), vanilla JavaScript, and DOM interactions yourself—without relying on AI code shortcuts—then publish your personal developer portfolio live via GitHub Pages.',
  difficulty: 'Beginner',
  level: 'beginner',
  prerequisites: ['None — open to complete beginners with a phone or laptop'],
  targetAudience:
    'NYSC corps members, beginners, and aspiring developers seeking hands-on web development fundamentals from scratch.',
  entryRequirements:
    'No prior coding experience required. A smartphone or laptop with a modern browser; VS Code and Git recommended for local modules.',
  requirements: [
    'Modern web browser (Chrome, Firefox, Edge, or Safari)',
    'Code editor such as VS Code for local portfolio files',
    'Free GitHub account for Modules 7–8 deployment'
  ],
  expectedDuration: '6–8 Weeks (Self-Paced)',
  active: true,
  version: '1.0.0',
  themeColor: 'emerald',
  iconName: 'Code2',
  learningObjectives: [
    {
      id: 'WDB-FND-01',
      code: 'WDB-FND-01',
      title: 'How the Web & Developer Workspace Work',
      description: 'Understand clients, servers, DNS, HTTP/HTTPS, clean folder organization, and browser DevTools inspection.'
    },
    {
      id: 'WDB-HTML-02',
      code: 'WDB-HTML-02',
      title: 'Semantic HTML5 & Accessible Forms',
      description: 'Author semantic layouts, accessible media, lists, tables, and structured forms cleanly.'
    },
    {
      id: 'WDB-CSS-03',
      code: 'WDB-CSS-03',
      title: 'CSS3 Box Model, Typography & Flexbox',
      description: 'Style readable web pages using selectors, box-sizing, custom properties, color contrast, and Flexbox.'
    },
    {
      id: 'WDB-RWD-04',
      code: 'WDB-RWD-04',
      title: 'Mobile-First Responsive Web Design',
      description: 'Build adaptive layouts across phone, tablet, and desktop using fluid units, media queries, and CSS Grid.'
    },
    {
      id: 'WDB-JS-05',
      code: 'WDB-JS-05',
      title: 'Vanilla JavaScript Logic & Data',
      description: 'Write variables, functions, conditionals, loops, arrays, and objects without relying on AI code generators.'
    },
    {
      id: 'WDB-DOM-06',
      code: 'WDB-DOM-06',
      title: 'Interactive DOM & Form Validation',
      description: 'Manipulate DOM nodes safely with querySelector, addEventListener, preventDefault, and localStorage.'
    },
    {
      id: 'WDB-GIT-07',
      code: 'WDB-GIT-07',
      title: 'Version Control with Git & GitHub',
      description: 'Manage commits, .gitignore, branches, Pull Requests, and project READMEs cleanly.'
    },
    {
      id: 'WDB-DEP-08',
      code: 'WDB-DEP-08',
      title: 'Production Audit & Live Deployment',
      description: 'Optimize assets, add SEO/Open Graph meta tags, and publish a live portfolio over HTTPS.'
    }
  ],
  modules: [...WEB_DEV_BEGINNER_MODULES_1_TO_4, ...WEB_DEV_BEGINNER_MODULES_5_TO_8],
  practicalProjects: [
    {
      id: 'proj_wdb_1',
      title: 'Semantic Developer Profile Page',
      summary: 'Multi-section HTML5 profile document with accessible navigation, lists, and contact form.',
      deliverables: ['index.html with semantic landmarks', 'Accessible form labels & alt text']
    },
    {
      id: 'proj_wdb_2',
      title: 'Responsive 3-Breakpoint Project Gallery',
      summary: 'Mobile-first CSS3 & CSS Grid layout adapting smoothly across 360px, 768px, and 1280px screens.',
      deliverables: ['styles.css with custom properties', 'Zero horizontal overflow on mobile']
    },
    {
      id: 'proj_wdb_3',
      title: 'Interactive JS Portfolio Filter & Contact Validator',
      summary: 'Vanilla JS DOM controller filtering projects and validating contact messages without page reloads.',
      deliverables: ['script.js using querySelector & addEventListener', 'Inline accessible form feedback']
    }
  ],
  starterProjectTemplates: [
    {
      id: 'tpl_wdb_portfolio',
      title: 'Personal Portfolio Starter Kit (HTML5 + CSS3 + JS)',
      description:
        'Clean local starter files for your Track A Portfolio Capstone. Download or copy into a local folder and edit directly in VS Code.',
      setupCommand: 'Open index.html directly in your browser or launch VS Code Live Server',
      files: [
        {
          path: 'index.html',
          content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio | Web Developer</title>
  <meta name="description" content="Personal developer portfolio built with semantic HTML5, responsive CSS3, and vanilla JavaScript." />
  <link rel="stylesheet" href="./styles.css" />
</head>
<body>
  <header class="site-header">
    <div class="container nav-row">
      <a href="#top" class="brand">DevPortfolio</a>
      <nav aria-label="Main navigation" class="nav-links">
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
    </div>
  </header>

  <main id="top" class="container">
    <section class="hero">
      <p class="eyebrow">Corps Member & Aspiring Web Developer</p>
      <h1>Building Practical, Mobile-First Web Experiences.</h1>
      <p class="lead">Replace this bio with your own introduction and service-year web goals.</p>
      <a href="#projects" class="btn-primary">Explore My Projects</a>
    </section>

    <section id="about" class="section">
      <h2>About Me</h2>
      <p>Write a concise 2-sentence overview of your background, learning path, and problem-solving focus.</p>
    </section>

    <section id="skills" class="section">
      <h2>Core Technical Skills</h2>
      <ul class="skills-list">
        <li>Semantic HTML5 & Accessibility</li>
        <li>CSS3, Flexbox & CSS Grid</li>
        <li>Mobile-First Responsive Design</li>
        <li>Vanilla JavaScript & DOM</li>
        <li>Git & GitHub Pages</li>
      </ul>
    </section>

    <section id="projects" class="section">
      <h2>Selected Projects</h2>
      <div class="projects-grid">
        <article class="card">
          <h3>Community Notice Board</h3>
          <p>Lightweight HTML/CSS community announcement layout optimized for fast mobile loading.</p>
        </article>
        <article class="card">
          <h3>SME Service Price Calculator</h3>
          <p>Interactive vanilla JS quotation calculator with instant total breakdown.</p>
        </article>
        <article class="card">
          <h3>Personal Portfolio Website</h3>
          <p>Responsive, accessible multi-section portfolio hosted live on GitHub Pages.</p>
        </article>
      </div>
    </section>

    <section id="contact" class="section">
      <h2>Contact Me</h2>
      <form id="contactForm" class="contact-form">
        <label for="senderName">Full Name</label>
        <input id="senderName" type="text" required placeholder="e.g. Amina Yusuf" />

        <label for="senderEmail">Email Address</label>
        <input id="senderEmail" type="email" required placeholder="you@example.com" />

        <label for="senderMessage">Message</label>
        <textarea id="senderMessage" rows="4" required placeholder="How can we collaborate?"></textarea>

        <button type="submit" class="btn-primary">Send Message</button>
      </form>
      <p id="formFeedback" role="status" class="feedback"></p>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container">
      <p>&copy; 2026 Personal Developer Portfolio. Built with HTML5, CSS3 & JavaScript.</p>
    </div>
  </footer>

  <script src="./script.js"></script>
</body>
</html>`
        },
        {
          path: 'styles.css',
          content: `:root {
  --brand: #046a38;
  --ink: #0f172a;
  --muted: #475569;
  --surface: #ffffff;
  --bg: #f8fafc;
}

* { box-sizing: border-box; }

body {
  margin: 0;
  font-family: system-ui, -apple-system, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.6;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1rem;
}

.site-header {
  background: var(--surface);
  border-bottom: 1px solid #e2e8f0;
  padding: 0.9rem 0;
}

.nav-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.brand {
  font-weight: 800;
  color: var(--brand);
  text-decoration: none;
  font-size: 1.125rem;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.nav-links a {
  color: var(--muted);
  text-decoration: none;
  font-weight: 600;
}

.hero { padding: 3rem 0 2rem; }
.section { padding: 2rem 0; }

.projects-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.card {
  background: var(--surface);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.25rem;
}

.btn-primary {
  display: inline-block;
  background: var(--brand);
  color: #ffffff;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  border: none;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
}

.contact-form {
  display: grid;
  gap: 0.65rem;
  max-width: 480px;
}

.contact-form input,
.contact-form textarea {
  padding: 0.65rem 0.8rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font: inherit;
}

.site-footer {
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem 0;
  color: var(--muted);
  font-size: 0.875rem;
}`
        },
        {
          path: 'script.js',
          content: `const contactForm = document.querySelector('#contactForm');
const formFeedback = document.querySelector('#formFeedback');

if (contactForm && formFeedback) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#senderName').value.trim();
    const email = document.querySelector('#senderEmail').value.trim();
    const message = document.querySelector('#senderMessage').value.trim();

    if (name.length < 2 || !email.includes('@') || message.length < 10) {
      formFeedback.textContent = 'Please provide your name, a valid email, and a message (10+ characters).';
      formFeedback.style.color = '#b91c1c';
      return;
    }

    formFeedback.textContent = \`Thank you, \${name}! Your portfolio contact form verified cleanly.\`;
    formFeedback.style.color = '#046a38';
    contactForm.reset();
  });
}`
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Build Your Personal Portfolio Website',
    overview:
      'Design, hand-code, version-control with Git, and publish a responsive personal developer portfolio website using HTML5, CSS3, and vanilla JavaScript.',
    deliverables: [
      'Clean homepage and hero introduction section',
      'About section detailing background and goals',
      'Skills section listing core web fundamentals',
      'Project gallery with at least 3 showcased works/exercises',
      'Interactive validated contact form (no page reload bug)',
      'Public GitHub repository with .gitignore and README.md',
      'Live deployed HTTPS website link (GitHub Pages, Netlify, or Vercel)'
    ],
    instructions: [
      'Structure your site using semantic HTML5 (<header>, <nav>, <main>, <section>, <footer>).',
      'Implement mobile-first responsive CSS3 with Flexbox and CSS Grid so nothing overflows at 360px.',
      'Add vanilla JavaScript interactivity for form validation and navigation/filter controls.',
      'Push your codebase to a public GitHub repository with a clear README.md and deploy it live.'
    ],
    assessmentCriteria: [
      'Semantic HTML5 structure, accessibility attributes, and clean relative paths',
      'Responsive styling across mobile (360px), tablet (768px), and desktop (1280px)',
      'Working vanilla JavaScript DOM interactions and form validation',
      'Organized GitHub repository and working live deployed HTTPS link'
    ],
    rubric: [
      {
        id: 'rub_wdb_1',
        criterion: 'HTML5 Semantics & Accessibility',
        description: 'Valid HTML5 landmarks, logical heading hierarchy, form labels, and descriptive alt text.',
        weight: 25
      },
      {
        id: 'rub_wdb_2',
        criterion: 'Responsive CSS3 Layout & Visual Polish',
        description: 'Mobile-first Flexbox and CSS Grid layout with zero horizontal scroll and legible contrast.',
        weight: 25
      },
      {
        id: 'rub_wdb_3',
        criterion: 'Vanilla JavaScript & DOM Interactivity',
        description: 'Clean JS event listeners, validated contact form with inline feedback, and zero runtime console errors.',
        weight: 25
      },
      {
        id: 'rub_wdb_4',
        criterion: 'GitHub Repository & Live Deployment',
        description: 'Public GitHub repository with README/.gitignore plus live HTTPS deployment link.',
        weight: 25
      }
    ],
    submissionGuidelines:
      'Submit your Capstone with both your public GitHub Repository URL and your Live Deployed Portfolio URL, along with a clear project summary and verified deliverables checklist.'
  },
  finalAssessment: [
    {
      id: 'fa_wdb_1',
      moduleId: 'mod_wdb_1',
      questionText: 'Which system translates human-readable domain names (like example.ng) into server IP addresses?',
      options: ['CSS Grid', 'DNS (Domain Name System)', 'DOM Tree', 'localStorage'],
      correctAnswer: 1,
      explanation: 'DNS resolves domain names into routable IP addresses before HTTP requests are sent.'
    },
    {
      id: 'fa_wdb_2',
      moduleId: 'mod_wdb_1',
      questionText: 'What are the three core languages every web browser executes natively?',
      options: ['HTML, CSS, and JavaScript', 'SQL, Python, and Git', 'Figma, Canva, and PDF', 'C++, Java, and Docker'],
      correctAnswer: 0,
      explanation: 'Browsers natively parse HTML for structure, CSS for styling, and JavaScript for behavior.'
    },
    {
      id: 'fa_wdb_3',
      moduleId: 'mod_wdb_1',
      questionText: 'Which HTTP status code confirms that a webpage request succeeded normally?',
      options: ['404', '500', '200', '403'],
      correctAnswer: 2,
      explanation: 'HTTP 200 OK indicates successful retrieval of the requested resource.'
    },
    {
      id: 'fa_wdb_4',
      moduleId: 'mod_wdb_2',
      questionText: 'Which HTML5 landmark identifies the primary unique content of a document?',
      options: ['<div class="top">', '<main>', '<bold>', '<head>'],
      correctAnswer: 1,
      explanation: '<main> defines the primary content landmark for accessibility and SEO.'
    },
    {
      id: 'fa_wdb_5',
      moduleId: 'mod_wdb_2',
      questionText: 'Why must every <input> inside an accessible contact form link to a <label> via for/id?',
      options: [
        'It links screen readers to the input and enlarges the clickable focus target',
        'It uploads the form directly to GitHub',
        'It removes CSS borders',
        'It blocks JavaScript execution'
      ],
      correctAnswer: 0,
      explanation: 'Explicit <label for="..."> pairings improve usability and assistive-technology support.'
    },
    {
      id: 'fa_wdb_6',
      moduleId: 'mod_wdb_2',
      questionText: 'Which attribute provides descriptive text if an image fails to load or for blind screen-reader users?',
      options: ['title', 'href', 'alt', 'srcset'],
      correctAnswer: 2,
      explanation: 'The alt attribute supplies accessible fallback descriptions for <img> elements.'
    },
    {
      id: 'fa_wdb_7',
      moduleId: 'mod_wdb_3',
      questionText: 'What does box-sizing: border-box change about a CSS element’s declared width?',
      options: [
        'Padding and border are included inside the declared width rather than adding extra width',
        'Margins are deleted completely',
        'Text becomes italic',
        'The element ignores Flexbox'
      ],
      correctAnswer: 0,
      explanation: 'border-box prevents padding and borders from unexpectedly widening elements past 100%.'
    },
    {
      id: 'fa_wdb_8',
      moduleId: 'mod_wdb_3',
      questionText: 'Which CSS selector specificity order wins when all three style the same element?',
      options: [
        'Element selector (p) beats ID (#hero)',
        'Class (.card) beats ID (#hero)',
        'ID (#hero) > Class (.card) > Element (p)',
        'They always tie'
      ],
      correctAnswer: 2,
      explanation: 'ID selectors have higher specificity than classes, which outrank element type selectors.'
    },
    {
      id: 'fa_wdb_9',
      moduleId: 'mod_wdb_4',
      questionText: 'Which tag ensures mobile browsers scale CSS pixels properly instead of zooming out to desktop width?',
      options: [
        '<meta name="viewport" content="width=device-width, initial-scale=1.0" />',
        '<meta name="responsive" content="100%" />',
        '<style responsive="mobile">',
        '<link rel="viewport" href="mobile.css">'
      ],
      correctAnswer: 0,
      explanation: 'The viewport meta tag enables responsive CSS layouts on mobile devices.'
    },
    {
      id: 'fa_wdb_10',
      moduleId: 'mod_wdb_4',
      questionText: 'In CSS Grid, which template creates three equal-width responsive columns?',
      options: [
        'grid-template-columns: repeat(3, 1fr);',
        'grid-columns: 3 equal;',
        'display: flex-3;',
        'grid-template-rows: 100px;'
      ],
      correctAnswer: 0,
      explanation: 'repeat(3, 1fr) distributes available space equally across three grid columns.'
    },
    {
      id: 'fa_wdb_11',
      moduleId: 'mod_wdb_4',
      questionText: 'What makes a CSS approach "mobile-first"?',
      options: [
        'Writing single-column mobile styles by default and using @media (min-width: ...) for larger screens',
        'Hiding half the content on Android phones',
        'Setting body width to 1400px permanently',
        'Using inline <font> tags'
      ],
      correctAnswer: 0,
      explanation: 'Mobile-first CSS progressively enhances layouts as screen width increases.'
    },
    {
      id: 'fa_wdb_12',
      moduleId: 'mod_wdb_5',
      questionText: 'Which variable declaration should you default to in modern JavaScript when a binding will not be reassigned?',
      options: ['var', 'const', 'dim', 'global'],
      correctAnswer: 1,
      explanation: 'const prevents accidental reassignment and keeps code intentions clear.'
    },
    {
      id: 'fa_wdb_13',
      moduleId: 'mod_wdb_5',
      questionText: 'What does 7 === "7" evaluate to in JavaScript?',
      options: ['true', 'false', 'undefined', '"7"'],
      correctAnswer: 1,
      explanation: 'Strict equality compares both value and data type.'
    },
    {
      id: 'fa_wdb_14',
      moduleId: 'mod_wdb_5',
      questionText: 'Which array method returns a new array containing only items matching a condition?',
      options: ['.push()', '.filter()', '.pop()', '.sort()'],
      correctAnswer: 1,
      explanation: '.filter() keeps elements for which the predicate callback returns true.'
    },
    {
      id: 'fa_wdb_15',
      moduleId: 'mod_wdb_6',
      questionText: 'Why should user-typed text be inserted using element.textContent instead of element.innerHTML?',
      options: [
        'textContent prevents HTML breakage and protects against injected scripts (XSS)',
        'textContent downloads CSS files',
        'innerHTML cannot render English characters',
        'textContent works only in Safari'
      ],
      correctAnswer: 0,
      explanation: 'textContent treats characters as plain text rather than executable markup.'
    },
    {
      id: 'fa_wdb_16',
      moduleId: 'mod_wdb_6',
      questionText: 'What does calling event.preventDefault() inside a form submit listener accomplish?',
      options: [
        'Clears localStorage',
        'Stops the browser from reloading the page so JavaScript can validate inputs smoothly',
        'Submits the form twice',
        'Disables keyboard typing'
      ],
      correctAnswer: 1,
      explanation: 'Preventing default form submission keeps the page interactive for client-side validation.'
    },
    {
      id: 'fa_wdb_17',
      moduleId: 'mod_wdb_7',
      questionText: 'Which sequence records edited code in Git and pushes it to GitHub?',
      options: [
        'git add . -> git commit -m "message" -> git push',
        'git push -> git add . -> git init',
        'git log -> git status -> git clone',
        'git commit -> git remove -> git init'
      ],
      correctAnswer: 0,
      explanation: 'Changes must be staged (git add), committed (git commit), and then pushed (git push).'
    },
    {
      id: 'fa_wdb_18',
      moduleId: 'mod_wdb_7',
      questionText: 'What is the purpose of a .gitignore file?',
      options: [
        'To tell Git which files—such as .env secrets or .DS_Store—must never be committed',
        'To delete old commits automatically',
        'To style Markdown headings',
        'To speed up CSS Flexbox'
      ],
      correctAnswer: 0,
      explanation: '.gitignore keeps sensitive environment files and machine clutter out of Git repositories.'
    },
    {
      id: 'fa_wdb_19',
      moduleId: 'mod_wdb_8',
      questionText: 'Why do image or CSS paths like ./Images/Hero.PNG sometimes 404 after deploying to GitHub Pages even when working on Windows?',
      options: [
        'GitHub Pages blocks PNG files',
        'Linux servers are strictly case-sensitive, so filenames and folder cases must match exactly',
        'HTTPS forbids dot-slash paths',
        'CSS cannot load images over HTTPS'
      ],
      correctAnswer: 1,
      explanation: 'Using lowercase filenames consistently prevents case-sensitivity 404s on Linux hosts.'
    },
    {
      id: 'fa_wdb_20',
      moduleId: 'mod_wdb_8',
      questionText: 'Which file must exist in the published root folder for GitHub Pages to load your homepage automatically?',
      options: ['portfolio.html', 'index.html', 'app.js', 'README.html'],
      correctAnswer: 1,
      explanation: 'Web servers serve index.html as the default entry page at root paths.'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredModuleChecksCount: 8,
    requiredFinalAssessmentPassScore: 70,
    requireCapstoneSubmission: true,
    requireCapstoneApproval: false
  }
};
