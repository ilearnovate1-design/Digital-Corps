import { CourseModule } from '../../../types';

export const WEB_DEV_BEGINNER_MODULES_5_TO_8: CourseModule[] = [
  // =========================================================================
  // MODULE 5: JAVASCRIPT FUNDAMENTALS
  // =========================================================================
  {
    moduleId: 'mod_wdb_5',
    courseId: 'web-development-beginner',
    sequence: 5,
    sequenceLabel: 'Module 5',
    title: 'JavaScript Fundamentals',
    description:
      'Learn how variables, data types, operators, conditionals, loops, functions, arrays, and objects turn static web pages into dynamic programs.',
    learningObjectiveIds: ['WDB-JS-05'],
    lessons: [
      {
        lessonId: 'lesson_wdb_5_1',
        moduleId: 'mod_wdb_5',
        courseId: 'web-development-beginner',
        title: 'Variables, Data Types & Operators',
        sequence: 1,
        sequenceLabel: 'Lesson 5.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-JS-05'],
        learningObjectives: [
          'Declare variables cleanly using const and let (and avoid var).',
          'Work with strings, numbers, booleans, null, and undefined in JavaScript.',
          'Use arithmetic, comparison (===), and logical (&&, ||) operators reliably.'
        ],
        introduction:
          'HTML builds the structure and CSS styles the appearance—JavaScript brings logic, calculations, and interactivity to the browser.',
        lessonContent: [
          'Declaring Variables with const and let: Use const by default for values that will not be reassigned (like tax rates or brand names), and use let only when a value changes over time (like a shopping cart total or quiz score). Avoid var because its function scoping leads to subtle bugs.',
          'Core Data Types: Strings hold text inside quotes ("Lagos", \'Ada\'), Numbers hold integers and decimals (1500, 7.5), Booleans hold true or false, undefined means a variable has not been assigned yet, and null represents an intentional empty value.',
          'Operators & Strict Equality: Template literals (`Hello ${name}`) make building messages effortless. Always prefer strict equality (=== and !==) over loose equality (==) so JavaScript does not unexpectedly treat the string "5" as equal to the number 5.'
        ],
        stepByStepInstructions: [
          'Create a script tag at the bottom of your HTML body or open browser DevTools Console.',
          'Declare a const for unitPrice and a let for quantity.',
          'Compute totalCost = unitPrice * quantity and print a formatted Naira summary with console.log().',
          'Test === vs == in the console to observe why strict equality prevents hidden coercion bugs.'
        ],
        nigerianContextExamples: [
          'Market Invoice Calculation: A corps member helping a provision store owner in Ibadan build an instant calculator uses const deliveryFee = 1500 and let itemTotal = 4200 to compute the grand total accurately.',
          'Strict Input Checking: Checking if userPin === "1234" avoids subtle type-coercion mismatches in validation logic.'
        ],
        toolsAndResources: ['Browser DevTools Console (F12)', 'MDN JavaScript First Steps'],
        practicalDemonstration:
          'const brand = "Zaria Craft";\nlet units = 3;\nconst pricePerUnit = 4500;\nconst total = units * pricePerUnit;\nconsole.log(`${brand} order total: NGN ${total}`);',
        codeExamples: [
          {
            title: 'Calculating Order Totals & Checking Free Delivery Eligibility',
            language: 'javascript',
            code: `const customerName = "Chinedu";
const unitPrice = 3500;
let quantity = 4;
const subtotal = unitPrice * quantity;
const qualifiesForFreeDelivery = subtotal >= 10000;

console.log(\`Customer: \${customerName}\`);
console.log(\`Subtotal: NGN \${subtotal}\`);
console.log(\`Free Delivery Eligible: \${qualifiesForFreeDelivery}\`);`,
            explanation: [
              'const customerName and const unitPrice stay constant.',
              'let quantity can be incremented later if the buyer adds more items.',
              'subtotal >= 10000 produces a boolean (true or false).'
            ],
            expectedOutput: 'Console prints:\nCustomer: Chinedu\nSubtotal: NGN 14000\nFree Delivery Eligible: true'
          }
        ],
        commonErrors: [
          {
            error: 'TypeError: Assignment to constant variable',
            cause: 'Trying to reassign a variable declared with const.',
            fix: 'Change const to let if the variable needs to change, or store the updated value in a new const.'
          },
          {
            error: 'ReferenceError: itemPrice is not defined',
            cause: 'Misspelling the variable name or referencing it before declaration.',
            fix: 'Check exact camelCase spelling and ensure declarations appear above usage.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_5_1',
          title: 'Build a Service Fee & Total Calculator in JavaScript',
          prompt:
            'Complete the script below using const and let to compute subtotal = price * qty, apply a 500 serviceFee, and print the grandTotal with console.log().',
          starterCode: `const serviceName = "Campus Print Hub";
const price = 200;
let qty = 15;

// Calculate subtotal and grandTotal (subtotal + 500) below
const subtotal = price * qty;
const grandTotal = 0; // fix this line

console.log(\`\${serviceName} -> Total: NGN \${grandTotal}\`);`,
          language: 'javascript',
          runnableInBrowser: true,
          expectedOutput: 'Console logs: Campus Print Hub -> Total: NGN 3500',
          hints: [
            'Replace const grandTotal = 0; with const grandTotal = subtotal + 500;',
            'Check the Console Output panel right below the sandbox preview.'
          ],
          validationChecks: [
            { label: 'Computes subtotal + 500', pattern: 'subtotal\\s*\\+\\s*500' },
            { label: 'Uses console.log', pattern: 'console\\.log\\(' }
          ],
          solutionSummary: 'Declaring immutable pricing with const and logging computed template strings keeps calculations clean and predictable.'
        },
        handsOnExercise: {
          title: 'Build a Data Bundle Cost Estimator',
          task: 'Write a small JS script calculating weekly vs. monthly mobile data spending for 3 plans.',
          steps: [
            'Declare plan prices with const.',
            'Compute 4-week cost and print clear summaries via console.log().',
            'Add a boolean check comparing spending against a monthly budget cap.'
          ],
          deliverable: 'Working JS calculation script tested in the sandbox or browser console.'
        },
        keyTakeaways: [
          'Prefer const by default; use let only for variables whose value changes.',
          'Always compare values with === and !== to prevent unexpected type coercion.',
          'Template literals (`...${expr}`) cleanly combine text and computed values.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_5_1_1',
            questionText: 'Which keyword should you use by default when declaring a variable that will not be reassigned?',
            options: ['var', 'let', 'const', 'static'],
            correctAnswer: 2,
            explanation: 'const protects variables from accidental reassignment and signals intent clearly.'
          },
          {
            id: 'kc_wdb_5_1_2',
            questionText: 'What is the result of 10 === "10" in JavaScript?',
            options: ['true', 'false', 'undefined', '10'],
            correctAnswer: 1,
            explanation: 'Strict equality (===) checks both value and data type; number 10 is not string "10".'
          },
          {
            id: 'kc_wdb_5_1_3',
            questionText: 'Which syntax correctly embeds a variable named score inside a string?',
            options: ['"Score: ${score}"', '`Score: ${score}`', '\'Score: $score\'', '(Score: score)'],
            correctAnswer: 1,
            explanation: 'Backticks (`...`) create template literals that evaluate ${...} expressions.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_5_2',
        moduleId: 'mod_wdb_5',
        courseId: 'web-development-beginner',
        title: 'Conditionals, Loops & Reusable Functions',
        sequence: 2,
        sequenceLabel: 'Lesson 5.2',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDB-JS-05'],
        learningObjectives: [
          'Branch program behaviour using if / else if / else statements.',
          'Repeat tasks cleanly using for and while loops.',
          'Write reusable functions with parameters and return values.'
        ],
        introduction:
          'Programs make decisions and automate repetitive work. Conditionals choose which branch runs, loops repeat steps cleanly, and functions package logic you can reuse across your website.',
        lessonContent: [
          'Decision Making with if / else: Conditionals evaluate boolean expressions. For example, if a learner scores 70 or higher, display "Passed"; else if 50 or higher, display "Retake recommended"; otherwise show "Keep practising". Put the strictest condition first so earlier checks do not accidentally swallow higher scores.',
          'Automating Repetition with Loops: A for loop runs a block a known number of times: for (let i = 1; i <= 5; i++) { ... }. Never forget to increment the loop counter so you do not freeze the browser tab with an infinite loop.',
          'Writing Functions: A function accepts inputs (parameters) and returns an output using return. Functions eliminate copy-paste code and make debugging far easier.'
        ],
        stepByStepInstructions: [
          'Write a function classifyScore(score) returning "Pass" or "Review Needed".',
          'Test the function with three different scores (45, 72, 95).',
          'Write a for loop printing numbered task items from 1 to 4.'
        ],
        nigerianContextExamples: [
          'Shipping Fee Rules: An online tailor in Benin City writes a function getDeliveryCost(state) that returns 1500 for "Edo" and 3500 for interstate deliveries.',
          'NYSC Score Checker: Grading platoon quiz scores automatically inside a clean function rather than repeating if/else blocks everywhere.'
        ],
        toolsAndResources: ['Browser DevTools Console', 'MDN Functions Guide'],
        practicalDemonstration:
          'function getDeliveryFee(state) {\n  if (state === "Lagos") return 1500;\n  return 3500;\n}\nconsole.log(getDeliveryFee("Lagos")); // 1500',
        codeExamples: [
          {
            title: 'Score Classifier Function + Loop Summary',
            language: 'javascript',
            code: `function evaluatePassMark(score) {
  if (score >= 80) {
    return "Distinction";
  } else if (score >= 60) {
    return "Pass";
  } else {
    return "Needs Practice";
  }
}

for (let student = 1; student <= 3; student++) {
  const sampleScore = 50 + student * 15;
  console.log(\`Student #\${student}: \${sampleScore}% -> \${evaluatePassMark(sampleScore)}\`);
}`,
            explanation: [
              'evaluatePassMark takes a numeric score parameter and returns a grade label.',
              'The for loop tests 3 learners automatically without repeating the if/else block.'
            ],
            expectedOutput: 'Student #1: 65% -> Pass\nStudent #2: 80% -> Distinction\nStudent #3: 95% -> Distinction'
          }
        ],
        commonErrors: [
          {
            error: 'Function prints undefined when logged',
            cause: 'The function used console.log inside instead of returning a value with return.',
            fix: 'Add an explicit return statement at the end of the function.'
          },
          {
            error: 'Infinite loop freezes browser tab',
            cause: 'A loop condition never becomes false (for example i-- instead of i++).',
            fix: 'Double-check loop starting point, condition, and update step before running.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_5_2',
          title: 'Write a Discount Function in JavaScript',
          prompt:
            'Complete applyDiscount(amount) so orders >= 10000 receive a 10% discount (amount * 0.9), while smaller orders pay the full amount. Then log applyDiscount(12000) and applyDiscount(6000).',
          starterCode: `function applyDiscount(amount) {
  // Return amount * 0.9 when amount >= 10000, otherwise return amount
  if (amount >= 10000) {
    return amount;
  }
  return amount;
}

console.log("Order 1:", applyDiscount(12000));
console.log("Order 2:", applyDiscount(6000));`,
          language: 'javascript',
          runnableInBrowser: true,
          expectedOutput: 'Order 1: 10800\nOrder 2: 6000',
          hints: [
            'Inside the if (amount >= 10000) block, change return amount; to return amount * 0.9;'
          ],
          validationChecks: [
            { label: 'Applies 0.9 multiplier', pattern: 'amount\\s*\\*\\s*0\\.9' },
            { label: 'Checks >= 10000', pattern: 'amount\\s*>=\\s*10000' }
          ],
          solutionSummary: 'Functions with conditional return statements encapsulate business rules clearly.'
        },
        handsOnExercise: {
          title: 'Build a Delivery Estimator & Loop Printer',
          task: 'Write a function getShippingQuote(weightKg) and test it across weights 1 to 5 kg using a for loop.',
          steps: [
            'Define base rate 1500 plus 400 per kg above 1 kg.',
            'Loop from 1 to 5 and log each weight and shipping quote.'
          ],
          deliverable: 'Tested JavaScript function and loop script.'
        },
        keyTakeaways: [
          'Order if / else if conditions from strictest/highest threshold down.',
          'Functions accept parameters and return computed outputs with return.',
          'Always verify loop termination conditions before running.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_5_2_1',
            questionText: 'What does the return keyword do inside a JavaScript function?',
            options: [
              'Refreshes the browser page',
              'Outputs a value back to the caller and stops executing the function',
              'Declares a global CSS variable',
              'Deletes the function after one run'
            ],
            correctAnswer: 1,
            explanation: 'return hands the result back to whoever called the function and exits immediately.'
          },
          {
            id: 'kc_wdb_5_2_2',
            questionText: 'In for (let i = 0; i < 4; i++), how many times does the loop body execute?',
            options: ['3 times', '4 times', '5 times', '0 times'],
            correctAnswer: 1,
            explanation: 'It runs for i = 0, 1, 2, and 3—four iterations total.'
          },
          {
            id: 'kc_wdb_5_2_3',
            questionText: 'Why must a loop counter change during each iteration?',
            options: [
              'So CSS styles reload faster',
              'So the loop eventually reaches its stop condition and avoids freezing the page',
              'To convert strings to booleans',
              'Because let only allows one iteration'
            ],
            correctAnswer: 1,
            explanation: 'Without updating the counter toward the exit condition, an infinite loop hangs the tab.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_5_3',
        moduleId: 'mod_wdb_5',
        courseId: 'web-development-beginner',
        title: 'Arrays, Objects & Looping Over Real Data',
        sequence: 3,
        sequenceLabel: 'Lesson 5.3',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDB-JS-05'],
        learningObjectives: [
          'Store ordered lists inside JavaScript arrays and access elements by zero-based index.',
          'Model structured entities (like portfolio projects or products) using objects.',
          'Loop over arrays of objects with for...of or .forEach() / .map() / .filter().'
        ],
        introduction:
          'Real websites display lists of projects, courses, customers, or products. Combining arrays (lists) with objects (key-value records) is how JavaScript represents real application data.',
        lessonContent: [
          'Arrays Hold Ordered Lists: const skills = ["HTML5", "CSS3", "JavaScript"];. Arrays start counting at index 0, so skills[0] is "HTML5". Use skills.push("Git") to append an item and skills.length to count how many items exist.',
          'Objects Hold Key-Value Properties: const project = { title: "Campus Market", year: 2026, live: true };. Access properties with dot notation (project.title).',
          'Arrays of Objects: Putting objects inside an array—such as a portfolio project list—lets you loop through every project cleanly and filter or render them dynamically onto the page.'
        ],
        stepByStepInstructions: [
          'Create an array named projects containing 3 project objects (each with title, stack, and featured boolean).',
          'Use .filter() to keep only featured projects.',
          'Use console.log() to print each project title.'
        ],
        nigerianContextExamples: [
          'Portfolio Project Catalogue: Storing your HTML/CSS/JS projects in an array of objects so adding a new project later only requires adding one object to the array.',
          'CDS Attendance List: Modeling corps members as objects with name, stateCode, and present status inside an array.'
        ],
        toolsAndResources: ['MDN Array Reference', 'MDN Working with Objects'],
        practicalDemonstration:
          'const projects = [\n  { title: "Hostel Finder", featured: true },\n  { title: "Note Pad", featured: false }\n];\nconst featured = projects.filter(p => p.featured);\nconsole.log(featured.length); // 1',
        codeExamples: [
          {
            title: 'Filtering & Summarizing Portfolio Projects',
            language: 'javascript',
            code: `const skills = ["HTML5", "CSS3", "Responsive Design"];
skills.push("JavaScript");
console.log("Total skills:", skills.length);

const projects = [
  { title: "PPA Attendance Sheet", category: "Productivity", completed: true },
  { title: "Abuja Bakery Landing Page", category: "Business", completed: true },
  { title: "Weather Widget", category: "Practice", completed: false }
];

const finishedProjects = projects.filter((item) => item.completed);
finishedProjects.forEach((p, idx) => {
  console.log(\`\${idx + 1}. \${p.title} [\${p.category}]\`);
});`,
            explanation: [
              'skills.push adds "JavaScript" to the end of the array.',
              'projects.filter selects only entries where completed is true.',
              '.forEach iterates through the filtered list with clean 1-based numbering.'
            ],
            expectedOutput: 'Total skills: 4\n1. PPA Attendance Sheet [Productivity]\n2. Abuja Bakery Landing Page [Business]'
          }
        ],
        commonErrors: [
          {
            error: 'Off-by-one error accessing last array element',
            cause: 'Trying to read arr[arr.length] instead of arr[arr.length - 1].',
            fix: 'Remember array indices start at 0, so the last valid index is length - 1.'
          },
          {
            error: 'TypeError: Cannot read properties of undefined',
            cause: 'Accessing project.name when the property is actually called project.title or index does not exist.',
            fix: 'Inspect the object keys with console.log(project) and verify exact spelling.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_5_3',
          title: 'Filter & List Completed Skills',
          prompt:
            'Add "Git" to the skills array, filter the projects array to keep items where done === true, and log the count of completed projects.',
          starterCode: `const skills = ["HTML", "CSS", "JavaScript"];
// 1. Push "Git" onto skills

const projects = [
  { name: "Bio Card", done: true },
  { name: "Portfolio Grid", done: true },
  { name: "SaaS Prototype", done: false }
];

// 2. Filter projects where done === true
const completed = projects;

console.log("Skills count:", skills.length);
console.log("Completed projects:", completed.length);`,
          language: 'javascript',
          runnableInBrowser: true,
          expectedOutput: 'Skills count: 4\nCompleted projects: 2',
          hints: [
            'Call skills.push("Git"); after the array declaration.',
            'Use projects.filter((p) => p.done === true) for completed.'
          ],
          validationChecks: [
            { label: 'Uses skills.push', pattern: 'skills\\.push\\(' },
            { label: 'Uses .filter(', pattern: '\\.filter\\(' }
          ],
          solutionSummary: 'Arrays store ordered collections while .filter() extracts matching records cleanly without mutating the original list.'
        },
        handsOnExercise: {
          title: 'Model Your Portfolio Data as JavaScript Objects',
          task: 'Write a JavaScript data file defining your profile object and an array of at least 3 project objects.',
          steps: [
            'Create const profile = { name, role, location, bio }.',
            'Create const portfolioProjects = [ ... ] with 3 objects containing title, description, and techStack array.',
            'Log all titles cleanly with .forEach().'
          ],
          deliverable: 'Structured JS data script ready for Module 6 DOM rendering.'
        },
        keyTakeaways: [
          'Arrays are zero-indexed lists ideal for collections; objects map named keys to values.',
          '.filter() creates a matching subset; .map() transforms items; .forEach() runs an action per item.',
          'Combining arrays and objects mirrors how real web APIs structure data.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_5_3_1',
            questionText: 'What is the index of "CSS" in const stack = ["HTML", "CSS", "JS"]?',
            options: ['0', '1', '2', '3'],
            correctAnswer: 1,
            explanation: 'JavaScript arrays are zero-indexed: "HTML" is 0, "CSS" is 1, "JS" is 2.'
          },
          {
            id: 'kc_wdb_5_3_2',
            questionText: 'How do you access the title property of const item = { title: "Store" }?',
            options: ['item->title', 'item.title', 'item(title)', 'title.item'],
            correctAnswer: 1,
            explanation: 'Dot notation (item.title) reads a named property from an object.'
          },
          {
            id: 'kc_wdb_5_3_3',
            questionText: 'Which array method returns a new array containing only items that pass a boolean condition?',
            options: ['.push()', '.filter()', '.pop()', '.join()'],
            correctAnswer: 1,
            explanation: '.filter() tests every item and keeps only items for which the callback returns true.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 5 Assignment: Interactive JavaScript Utility Script',
      description:
        'Write a pure JavaScript script (no AI shortcuts) featuring pricing logic, conditionals, loops, arrays, and objects for a Nigerian small business or portfolio catalog.',
      deliverables: [
        'At least 2 pure functions with parameters and return values',
        'An array of at least 3 structured objects filtered or summarized with array methods'
      ],
      evaluationCriteria: [
        'Uses const/let appropriately and strict equality (===)',
        'Produces clean, bug-free console output with clear variable names'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_5_1',
        questionText: 'Which variable declaration prevents reassignment of the binding?',
        options: ['var', 'let', 'const', 'mutable'],
        correctAnswer: 2,
        explanation: 'const prevents reassigning the variable reference.'
      },
      {
        id: 'mc_wdb_5_2',
        questionText: 'What value does Boolean("false") or "5" === 5 produce? Specifically, what is "5" === 5?',
        options: ['true', 'false', '5', 'NaN'],
        correctAnswer: 1,
        explanation: 'Strict equality requires both value and type to match; string !== number.'
      },
      {
        id: 'mc_wdb_5_3',
        questionText: 'Which statement stops a function and sends a result back to the caller?',
        options: ['break', 'continue', 'return', 'console.log'],
        correctAnswer: 2,
        explanation: 'return exits the function and returns the expression value.'
      },
      {
        id: 'mc_wdb_5_4',
        questionText: 'How do you find the number of items inside an array named projects?',
        options: ['projects.count()', 'projects.length', 'projects.size()', 'count(projects)'],
        correctAnswer: 1,
        explanation: 'Array.prototype.length holds the item count.'
      },
      {
        id: 'mc_wdb_5_5',
        questionText: 'Which data structure best represents one project with a title, year, and description?',
        options: ['A single boolean', 'An object literal { title, year, description }', 'A number', 'An alert box'],
        correctAnswer: 1,
        explanation: 'Objects group named properties together for a single record.'
      }
    ]
  },

  // =========================================================================
  // MODULE 6: INTERACTIVE WEBSITES AND DOM
  // =========================================================================
  {
    moduleId: 'mod_wdb_6',
    courseId: 'web-development-beginner',
    sequence: 6,
    sequenceLabel: 'Module 6',
    title: 'Interactive Websites and the DOM',
    description:
      'Connect JavaScript to live HTML elements using the Document Object Model (DOM), handle clicks and form submissions safely, and build real interactive UI components.',
    learningObjectiveIds: ['WDB-DOM-06'],
    lessons: [
      {
        lessonId: 'lesson_wdb_6_1',
        moduleId: 'mod_wdb_6',
        courseId: 'web-development-beginner',
        title: 'Selecting & Updating Elements with the DOM',
        sequence: 1,
        sequenceLabel: 'Lesson 6.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-DOM-06'],
        learningObjectives: [
          'Explain what the Document Object Model (DOM) tree is in the browser.',
          'Select elements accurately using document.querySelector() and querySelectorAll().',
          'Update visible text safely with textContent and toggle styles via classList.'
        ],
        introduction:
          'When a browser loads your HTML, it builds a live object tree in memory called the DOM. JavaScript uses the DOM to read elements, update text, and swap CSS classes dynamically.',
        lessonContent: [
          'Selecting Elements: document.querySelector("#status") finds the first element matching a CSS selector (by ID #, class ., or tag). document.querySelectorAll(".card") returns a list of all matching elements.',
          'Updating Content Safely with textContent: Always use element.textContent = userMessage instead of innerHTML whenever displaying user input. textContent treats text purely as literal characters, protecting your site from accidental HTML breakage and Cross-Site Scripting (XSS) injection.',
          'Styling via classList: Instead of changing dozens of element.style properties inline, toggle CSS classes cleanly with element.classList.add("active"), .remove("hidden"), or .toggle("dark-theme").'
        ],
        stepByStepInstructions: [
          'Create an HTML heading with id="greeting" and a button with id="switchBtn".',
          'Select both elements in JS using document.querySelector().',
          'Update greeting.textContent and toggle a highlight CSS class.'
        ],
        nigerianContextExamples: [
          'Safe Greeting Banners: Using textContent when greeting a registered corps member ("Welcome, Tunde!") ensures special characters like & or < never break the HTML layout.',
          'Theme Toggle: Using document.body.classList.toggle("dark") lets users switch reading modes effortlessly.'
        ],
        toolsAndResources: ['MDN Introduction to the DOM', 'Chrome Elements Inspector'],
        practicalDemonstration:
          'const title = document.querySelector("#hero-title");\ntitle.textContent = "Portfolio Updated!";\ntitle.classList.add("highlight");',
        codeExamples: [
          {
            title: 'Selecting Elements & Toggling Classes Safely',
            language: 'html',
            code: `<h2 id="statusText">Status: Pending Review</h2>
<button id="approveBtn">Mark Ready</button>

<style>
  .ready { color: #046a38; font-weight: bold; }
</style>

<script>
  const statusEl = document.querySelector('#statusText');
  const btn = document.querySelector('#approveBtn');

  btn.addEventListener('click', () => {
    statusEl.textContent = 'Status: Portfolio Ready!';
    statusEl.classList.add('ready');
  });
</script>`,
            explanation: [
              'querySelector grabs #statusText and #approveBtn from the live DOM.',
              'Clicking the button updates textContent safely and adds the .ready CSS class.'
            ],
            expectedOutput: 'Clicking "Mark Ready" turns the heading green and updates its text to "Status: Portfolio Ready!".'
          }
        ],
        commonErrors: [
          {
            error: 'TypeError: Cannot read properties of null (reading "textContent")',
            cause: 'querySelector returned null because the selector misspelled an ID/class or the script ran in <head> before the HTML element existed.',
            fix: 'Place <script> right before </body> (or use defer) and verify exact #id or .class names.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_6_1',
          title: 'Toggle Mobile Navigation Visibility with the DOM',
          prompt:
            'Make the "Toggle Bio" button toggle the "hidden" class on #bioPanel and update its button text between "Show Bio" and "Hide Bio".',
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; padding: 16px; }
    .hidden { display: none; }
    .box { margin-top: 12px; padding: 12px; background: #ecfdf5; border: 1px solid #10b981; border-radius: 8px; }
  </style>
</head>
<body>
  <button id="toggleBtn">Show Bio</button>
  <div id="bioPanel" class="box hidden">
    Frontend developer passionate about clean HTML, CSS, and JavaScript.
  </div>
  <script>
    const btn = document.querySelector('#toggleBtn');
    const panel = document.querySelector('#bioPanel');
    btn.addEventListener('click', () => {
      // Toggle 'hidden' class on panel and update btn.textContent
      panel.classList.add('hidden');
    });
  </script>
</body>
</html>`,
          language: 'html',
          runnableInBrowser: true,
          expectedOutput: 'Clicking "Show Bio" reveals the green bio box and changes the button label; clicking again hides it.',
          hints: [
            'Use panel.classList.toggle("hidden"); inside the click handler.',
            'Check if panel.classList.contains("hidden") to set btn.textContent.'
          ],
          validationChecks: [
            { label: 'Uses classList.toggle', pattern: 'classList\\.toggle\\(' },
            { label: 'Updates textContent', pattern: 'textContent\\s*=' }
          ],
          solutionSummary: 'Combining classList.toggle() and textContent updates creates crisp interactive UI controls without touching innerHTML.'
        },
        handsOnExercise: {
          title: 'Add a Project Filter Bar Using querySelectorAll',
          task: 'Add filter buttons ("All", "Web", "Design") above 3 project cards and show/hide matching cards via classList.',
          steps: [
            'Give each card a data-category attribute.',
            'Loop over cards using document.querySelectorAll(".project-card") and toggle .hidden.'
          ],
          deliverable: 'Working category filter in your portfolio page.'
        },
        keyTakeaways: [
          'Use document.querySelector() for one element and querySelectorAll() for multiple elements.',
          'Prefer textContent over innerHTML when inserting dynamic text.',
          'Keep presentation in CSS classes and toggle them using element.classList.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_6_1_1',
            questionText: 'Why should you prefer element.textContent over element.innerHTML when displaying user-entered text?',
            options: [
              'textContent automatically translates English to Yoruba',
              'textContent inserts plain text safely without parsing untrusted HTML or scripts (XSS protection)',
              'innerHTML only works inside tables',
              'textContent compresses images'
            ],
            correctAnswer: 1,
            explanation: 'textContent prevents injected tags like <script> from executing in the browser.'
          },
          {
            id: 'kc_wdb_6_1_2',
            questionText: 'Which method adds a class if absent and removes it if already present?',
            options: ['classList.swap()', 'classList.toggle()', 'classList.switch()', 'classList.flip()'],
            correctAnswer: 1,
            explanation: 'element.classList.toggle("name") alternates class presence on each call.'
          },
          {
            id: 'kc_wdb_6_1_3',
            questionText: 'What usually causes document.querySelector("#btn") to return null?',
            options: [
              'CSS files are missing',
              'The script ran before the HTML element was parsed or the selector misspelled the ID',
              'JavaScript variables cannot use #',
              'The user clicked too fast'
            ],
            correctAnswer: 1,
            explanation: 'DOM selectors return null when the target element does not yet exist in the document.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_6_2',
        moduleId: 'mod_wdb_6',
        courseId: 'web-development-beginner',
        title: 'Event Listeners & Interactive Form Validation',
        sequence: 2,
        sequenceLabel: 'Lesson 6.2',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDB-DOM-06'],
        learningObjectives: [
          'Attach user interaction handlers cleanly using addEventListener().',
          'Prevent unwanted page reloads on form submission using event.preventDefault().',
          'Validate form inputs and display clear inline feedback to users.'
        ],
        introduction:
          'Every click, keystroke, and form submission generates an event in the browser. Handling form submit events cleanly lets your portfolio contact form validate messages and give immediate confirmation.',
        lessonContent: [
          'addEventListener Over Inline onclick: Keeping JavaScript separate from HTML via element.addEventListener("click", fn) makes code modular, readable, and easy to maintain.',
          'Preventing Form Reloads: By default, submitting an HTML <form> reloads the entire page. Calling event.preventDefault() inside your submit listener pauses that default reload so JavaScript can inspect email, name, and message fields first.',
          'Friendly Validation & Feedback: Check trimmed field values (nameInput.value.trim()). If required text is missing or an email lacks "@", render a clear error paragraph right beneath the form rather than interrupting with an ugly browser alert().'
        ],
        stepByStepInstructions: [
          'Select your portfolio <form id="contactForm"> and its input fields.',
          'Listen for the "submit" event and call event.preventDefault().',
          'Validate that name >= 2 characters, email contains "@", and message >= 10 characters.',
          'Show an inline confirmation banner with the sender’s name on success.'
        ],
        nigerianContextExamples: [
          'Low-Data Feedback: Validating a form in JavaScript before sending prevents users on slow connections from losing everything they typed after a full-page reload.',
          'Clear Inline Guidance: Showing "Please enter a valid email address" directly next to the field reduces form abandonment.'
        ],
        toolsAndResources: ['MDN EventTarget.addEventListener()', 'MDN Constraint Validation API'],
        practicalDemonstration:
          'form.addEventListener("submit", (e) => {\n  e.preventDefault();\n  if (!emailInput.value.includes("@")) {\n    feedback.textContent = "Please provide a valid email address.";\n    return;\n  }\n  feedback.textContent = "Message received! I will reply soon.";\n});',
        codeExamples: [
          {
            title: 'Portfolio Contact Form Validation Handler',
            language: 'html',
            code: `<form id="contactForm">
  <input id="senderName" type="text" placeholder="Your Name" />
  <input id="senderEmail" type="email" placeholder="you@example.com" />
  <button type="submit">Send Message</button>
</form>
<p id="formFeedback" role="status"></p>

<script>
  const form = document.querySelector('#contactForm');
  const feedback = document.querySelector('#formFeedback');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.querySelector('#senderName').value.trim();
    const email = document.querySelector('#senderEmail').value.trim();

    if (name.length < 2 || !email.includes('@')) {
      feedback.textContent = 'Please enter your name and a valid email.';
      feedback.style.color = '#b91c1c';
      return;
    }

    feedback.textContent = \`Thank you, \${name}! Your enquiry is ready.\`;
    feedback.style.color = '#046a38';
    form.reset();
  });
</script>`,
            explanation: [
              'event.preventDefault() stops the page reload on submission.',
              '.trim() strips accidental leading/trailing spaces.',
              'form.reset() clears inputs cleanly after validation succeeds.'
            ],
            expectedOutput: 'Submitting blank inputs displays a red error message; valid input shows a green personalized confirmation.'
          }
        ],
        commonErrors: [
          {
            error: 'Page flashes and all inputs reset before confirmation message shows',
            cause: 'Forgot event.preventDefault() inside the form submit listener.',
            fix: 'Ensure (event) => { event.preventDefault(); ... } is the first line of the submit handler.'
          },
          {
            error: 'Clicking submit button inside form does not trigger "submit" event',
            cause: 'Attached the submit event to the <button> instead of the <form>, or button had type="button" instead of type="submit".',
            fix: 'Attach "submit" listener to the <form> element and keep button type="submit".'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_6_2',
          title: 'Validate & Confirm Contact Form Submission',
          prompt:
            'Add event.preventDefault() and validate that #nameInput has at least 2 characters before displaying a thank-you confirmation inside #msg.',
          starterCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 16px;">
  <form id="contactForm">
    <input id="nameInput" type="text" placeholder="Full Name" />
    <button type="submit">Send</button>
  </form>
  <p id="msg"></p>
  <script>
    const form = document.querySelector('#contactForm');
    const nameInput = document.querySelector('#nameInput');
    const msg = document.querySelector('#msg');

    form.addEventListener('submit', (event) => {
      // 1. Prevent page reload
      const name = nameInput.value.trim();
      // 2. Validate length >= 2 and update msg.textContent
      msg.textContent = 'Form handler not complete yet.';
    });
  </script>
</body>
</html>`,
          language: 'html',
          runnableInBrowser: true,
          expectedOutput: 'Submitting a valid name shows confirmation without reloading; empty input asks for at least 2 characters.',
          hints: [
            'Call event.preventDefault(); at the top of the listener.',
            'Use if (name.length < 2) { msg.textContent = "Enter at least 2 characters"; return; }'
          ],
          validationChecks: [
            { label: 'Calls event.preventDefault()', pattern: 'preventDefault\\(\\)' },
            { label: 'Checks name.length', pattern: 'name\\.length' }
          ],
          solutionSummary: 'Intercepting form submissions with preventDefault() gives instant feedback without losing page state.'
        },
        handsOnExercise: {
          title: 'Wire Up Your Portfolio Contact Form',
          task: 'Add JavaScript validation and inline feedback to your personal portfolio contact section.',
          steps: [
            'Validate Name, Email, and Message fields on submit.',
            'Show clear status colors and reset the form when valid.'
          ],
          deliverable: 'Validated interactive portfolio contact form.'
        },
        keyTakeaways: [
          'Use addEventListener() to keep HTML clean and separate behavior from markup.',
          'Always call event.preventDefault() when handling form submissions in JavaScript.',
          'Validate trimmed values and render accessible status feedback inline.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_6_2_1',
            questionText: 'What does event.preventDefault() prevent inside a form submit listener?',
            options: [
              'Typing inside input fields',
              'The browser from reloading/navigating the page immediately on form submit',
              'CSS animations from playing',
              'JavaScript variables from updating'
            ],
            correctAnswer: 1,
            explanation: 'Default HTML form submission triggers a page navigation/reload unless prevented.'
          },
          {
            id: 'kc_wdb_6_2_2',
            questionText: 'Which DOM element should receive the "submit" event listener?',
            options: ['The <form> element', 'The <body> tag', 'The <title> tag', 'A <span> label'],
            correctAnswer: 0,
            explanation: 'Only <form> elements fire the submit event when submitted.'
          },
          {
            id: 'kc_wdb_6_2_3',
            questionText: 'Why call .trim() on input.value before checking its length?',
            options: [
              'To convert numbers to strings',
              'To strip accidental spaces so whitespace alone is not treated as valid input',
              'To encrypt the password',
              'To resize the input box'
            ],
            correctAnswer: 1,
            explanation: '.trim() removes leading and trailing spaces before validation.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_6_3',
        moduleId: 'mod_wdb_6',
        courseId: 'web-development-beginner',
        title: 'Dynamic Lists, Creating DOM Nodes & LocalStorage',
        sequence: 3,
        sequenceLabel: 'Lesson 6.3',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDB-DOM-06'],
        learningObjectives: [
          'Create and append HTML elements dynamically using document.createElement().',
          'Build an interactive task/project note widget that updates live.',
          'Persist simple preferences or notes in browser localStorage with JSON.stringify/parse.'
        ],
        introduction:
          'Static HTML lists cannot grow when a user clicks "Add Item". Using document.createElement() and localStorage lets your browser apps create new UI items dynamically and remember them across page refreshes.',
        lessonContent: [
          'Creating Elements Safely: Use const li = document.createElement("li"); li.textContent = taskText; list.appendChild(li);. Creating nodes with createElement and textContent avoids string-concatenated HTML injection vulnerabilities.',
          'Persisting State with localStorage: Browsers provide localStorage.setItem(key, JSON.stringify(array)) and JSON.parse(localStorage.getItem(key) || "[]") to save small client-side data like a preferred dark-mode setting or practice to-do list without needing a backend server.',
          'Note on localStorage Limits: Never store passwords or secret keys in localStorage because any script on the page can read it; reserve it for non-sensitive UI preferences and local practice state.'
        ],
        stepByStepInstructions: [
          'Create an input field, Add button, and <ul id="taskList">.',
          'On click, create an <li> via document.createElement("li"), assign textContent, and appendChild to #taskList.',
          'Save the updated tasks array into localStorage and reload on page start.'
        ],
        nigerianContextExamples: [
          'Offline Corps Study Checklist: A learner in a rural community with patchy internet saves daily study tasks in localStorage so progress persists even offline.',
          'Dynamic Service Quote Cart: Adding selected tailoring or catering services onto an interactive list dynamically with JavaScript.'
        ],
        toolsAndResources: ['MDN Window.localStorage', 'MDN document.createElement()'],
        practicalDemonstration:
          'const li = document.createElement("li");\nli.textContent = "Finish HTML Capstone";\ndocument.querySelector("#tasks").appendChild(li);',
        codeExamples: [
          {
            title: 'Dynamic Task List Builder with createElement',
            language: 'html',
            code: `<input id="taskInput" placeholder="New portfolio task..." />
<button id="addBtn" type="button">Add Task</button>
<ul id="taskList"></ul>

<script>
  const input = document.querySelector('#taskInput');
  const addBtn = document.querySelector('#addBtn');
  const list = document.querySelector('#taskList');

  addBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (!text) return;
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
    input.value = '';
  });
</script>`,
            explanation: [
              'document.createElement("li") builds a real DOM list item node.',
              'li.textContent safely assigns the text without parsing HTML.',
              'list.appendChild(li) inserts the item at the end of the unordered list.'
            ],
            expectedOutput: 'Typing a task and clicking "Add Task" immediately appends a new bullet item to the list.'
          }
        ],
        commonErrors: [
          {
            error: 'JSON.parse throws SyntaxError when loading empty localStorage',
            cause: 'localStorage.getItem("key") returned null on first visit, or invalid plain text was saved.',
            fix: 'Guard with JSON.parse(localStorage.getItem("key") || "[]") inside a try/catch block.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdb_6_3',
          title: 'Build a Dynamic Skill Adder Widget',
          prompt:
            'Complete the click listener to create a <li> element using document.createElement("li"), set its textContent from #skillInput, and append it to #skillList.',
          starterCode: `<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; padding: 16px;">
  <input id="skillInput" type="text" value="DOM Manipulation" />
  <button id="addSkillBtn">Add Skill</button>
  <ul id="skillList">
    <li>HTML5 Semantics</li>
  </ul>
  <script>
    const input = document.querySelector('#skillInput');
    const btn = document.querySelector('#addSkillBtn');
    const list = document.querySelector('#skillList');

    btn.addEventListener('click', () => {
      const value = input.value.trim();
      if (!value) return;
      // Create <li>, set textContent, and appendChild to list
      console.log('Skill ready to add:', value);
    });
  </script>
</body>
</html>`,
          language: 'html',
          runnableInBrowser: true,
          expectedOutput: 'Clicking "Add Skill" appends a new bullet item with the typed skill.',
          hints: [
            'const li = document.createElement("li");',
            'li.textContent = value; list.appendChild(li);'
          ],
          validationChecks: [
            { label: 'Uses document.createElement', pattern: 'document\\.createElement\\(' },
            { label: 'Uses appendChild', pattern: '\\.appendChild\\(' }
          ],
          solutionSummary: 'Creating nodes with createElement + textContent and appending with appendChild builds dynamic lists securely.'
        },
        handsOnExercise: {
          title: 'Add a Theme Toggle + Interactive FAQ Accordion to Portfolio',
          task: 'Use DOM event listeners and localStorage to remember whether your portfolio visitor enabled Light or Dark contrast.',
          steps: [
            'Add a theme toggle button in your header.',
            'Toggle a .dark-mode class on <body> and store "light" or "dark" in localStorage.'
          ],
          deliverable: 'Interactive portfolio header with persistent theme switcher.'
        },
        keyTakeaways: [
          'Use document.createElement() + textContent + appendChild() to add dynamic elements safely.',
          'localStorage stores strings only; serialize arrays/objects with JSON.stringify() and JSON.parse().',
          'Never store secrets or sensitive credentials inside localStorage.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_6_3_1',
            questionText: 'Which DOM method creates a new HTML element node in memory?',
            options: ['document.makeTag()', 'document.createElement()', 'document.newHtml()', 'document.buildNode()'],
            correctAnswer: 1,
            explanation: 'document.createElement("tagName") constructs a fresh DOM element node.'
          },
          {
            id: 'kc_wdb_6_3_2',
            questionText: 'Why must arrays be passed through JSON.stringify() before saving to localStorage?',
            options: [
              'localStorage only stores string key-value pairs',
              'JSON.stringify uploads data to GitHub',
              'Arrays cannot hold strings otherwise',
              'To compress PNG images'
            ],
            correctAnswer: 0,
            explanation: 'Web Storage (localStorage) stores text strings exclusively.'
          },
          {
            id: 'kc_wdb_6_3_3',
            questionText: 'Which type of data should NEVER be stored in localStorage?',
            options: [
              'Selected dark/light theme',
              'Passwords or secret API keys',
              'Draft checklist notes',
              'Last viewed tab name'
            ],
            correctAnswer: 1,
            explanation: 'Any JavaScript on the page can inspect localStorage, so secrets never belong there.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 6 Assignment: Interactive Portfolio Features',
      description:
        'Add genuine DOM interactivity to your personal portfolio website without frameworks: responsive mobile menu toggle, project category filter or theme switch, and validated contact form feedback.',
      deliverables: [
        'JavaScript script wired with addEventListener (zero inline onclick hacks)',
        'Contact form preventing page reload and displaying inline validation feedback'
      ],
      evaluationCriteria: [
        'Uses textContent safely (no unsafe innerHTML injection)',
        'Interactive controls work smoothly on both mobile and desktop screens'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_6_1',
        questionText: 'Which selector fetches the first element matching id="contactForm"?',
        options: [
          'document.querySelector("#contactForm")',
          'document.querySelector(".contactForm")',
          'document.getTag("contactForm")',
          'window.find("#contactForm")'
        ],
        correctAnswer: 0,
        explanation: 'The # prefix targets an ID attribute in querySelector().'
      },
      {
        id: 'mc_wdb_6_2',
        questionText: 'Which property updates visible text safely without evaluating HTML tags?',
        options: ['innerHTML', 'outerHTML', 'textContent', 'evalText'],
        correctAnswer: 2,
        explanation: 'textContent renders raw text safely and prevents XSS.'
      },
      {
        id: 'mc_wdb_6_3',
        questionText: 'How do you stop an HTML form from refreshing the page on submission?',
        options: [
          'event.stopPage()',
          'event.preventDefault()',
          'return false in CSS',
          'form.reload(false)'
        ],
        correctAnswer: 1,
        explanation: 'event.preventDefault() cancels the browser’s default form navigation.'
      },
      {
        id: 'mc_wdb_6_4',
        questionText: 'Which pair of methods converts a JavaScript array into text for localStorage and back again?',
        options: [
          'JSON.stringify() and JSON.parse()',
          'String.split() and Array.reverse()',
          'HTML.encode() and HTML.decode()',
          'CSS.pack() and CSS.unpack()'
        ],
        correctAnswer: 0,
        explanation: 'JSON.stringify serializes data to JSON string; JSON.parse restores the JS structure.'
      },
      {
        id: 'mc_wdb_6_5',
        questionText: 'Which DOM method attaches an element as the last child of a container?',
        options: ['insertFirst()', 'appendChild()', 'attachTop()', 'pushNode()'],
        correctAnswer: 1,
        explanation: 'parent.appendChild(childNode) adds the newly created element into the DOM.'
      }
    ]
  },

  // =========================================================================
  // MODULE 7: GIT AND GITHUB
  // =========================================================================
  {
    moduleId: 'mod_wdb_7',
    courseId: 'web-development-beginner',
    sequence: 7,
    sequenceLabel: 'Module 7',
    title: 'Git and GitHub',
    description:
      'Protect your code with professional version control: track file changes with Git commits, manage .gitignore cleanly, and push repositories to GitHub.',
    learningObjectiveIds: ['WDB-GIT-07'],
    lessons: [
      {
        lessonId: 'lesson_wdb_7_1',
        moduleId: 'mod_wdb_7',
        courseId: 'web-development-beginner',
        title: 'Version Control Fundamentals & Core Git Commands',
        sequence: 1,
        sequenceLabel: 'Lesson 7.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-GIT-07'],
        learningObjectives: [
          'Explain why developers use Git instead of saving "final_v2_final_real" folders.',
          'Initialize a repository with git init and inspect state via git status.',
          'Stage changes with git add and record meaningful commits using git commit -m.'
        ],
        introduction:
          'Every professional developer uses version control so they never lose working code after an experiment goes wrong. Git tracks the full history of your project on your computer.',
        lessonContent: [
          'The Three Stages of Git: (1) Working Directory (files you are editing), (2) Staging Area (git add selects which changes belong in your next snapshot), and (3) Repository History (git commit -m "..." permanently records that snapshot with a timestamp and message).',
          'Checking Status Frequently: git status is your compass. It tells you which files are modified, untracked, or staged so you never commit blindly.',
          'Writing Clear Commit Messages: Avoid vague messages like "update". Write imperative, specific summaries like "Add responsive CSS Grid layout to projects section".'
        ],
        stepByStepInstructions: [
          'Open VS Code Terminal inside your portfolio folder.',
          'Configure your identity once: git config --global user.name "Your Name" and user.email "you@email.com".',
          'Run git init to initialize version tracking.',
          'Run git status, then git add ., then git commit -m "Initial portfolio HTML and CSS structure".',
          'Run git log --oneline to inspect your commit history.'
        ],
        nigerianContextExamples: [
          'Safe Experimentation on Borrowed or Backup Laptops: Keeping Git history means if power trips or a styling change breaks your navbar, one command restores the last clean commit.',
          'Employer Proof of Work: Tech recruiters in Lagos and remote teams inspect Git commit histories to verify genuine steady coding rather than last-minute copy-paste.'
        ],
        toolsAndResources: ['Git Official Installer (git-scm.com)', 'VS Code Integrated Terminal'],
        practicalDemonstration:
          '$ git init\n$ git status\n$ git add index.html styles.css\n$ git commit -m "Build responsive header and hero section"\n[main 4f21a9b] Build responsive header and hero section',
        codeExamples: [
          {
            title: 'Standard Everyday Git Commit Workflow',
            language: 'bash',
            code: `# 1. Initialize Git once inside your project folder
git init

# 2. Check modified and untracked files
git status

# 3. Stage files for the next snapshot
git add .

# 4. Save a descriptive commit snapshot
git commit -m "Add responsive portfolio grid and validated contact form"

# 5. View concise commit history
git log --oneline`,
            explanation: [
              'git add . stages all non-ignored changes in the current folder.',
              'git commit -m saves an immutable snapshot you can return to anytime.'
            ],
            expectedOutput: 'Shows clean commit hash + message, and git status reports "nothing to commit, working tree clean".'
          }
        ],
        commonErrors: [
          {
            error: 'fatal: not a git repository (or any of the parent directories)',
            cause: 'You ran git status or git commit in a folder where git init was never run (or you are in the wrong folder).',
            fix: 'Navigate into your project folder in terminal and verify with ls / dir, then run git init if starting fresh.'
          },
          {
            error: 'Author identity unknown / Please tell me who you are',
            cause: 'Git user.name and user.email have not been configured on this computer yet.',
            fix: 'Run git config --global user.name "Full Name" and git config --global user.email "your@email.com".'
          }
        ],
        handsOnExercise: {
          title: 'Initialize Git & Record 3 Clean Commits',
          task: 'Track your personal portfolio folder with Git and record at least 3 meaningful commits as you refine sections.',
          steps: [
            'Run git init inside your portfolio project.',
            'Commit HTML markup first, CSS styles second, and JavaScript interactivity third.',
            'Verify with git log --oneline.'
          ],
          deliverable: 'Local portfolio project with 3 clean Git commits.'
        },
        keyTakeaways: [
          'Git records project snapshots across Working Directory -> Staging Area -> Commit History.',
          'Run git status before staging and committing so you know exactly what is included.',
          'Write clear, specific commit messages describing what changed and why.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_7_1_1',
            questionText: 'Which command moves edited files from the working directory into the Git staging area?',
            options: ['git push', 'git add', 'git log', 'git clone'],
            correctAnswer: 1,
            explanation: 'git add stages files before creating a commit.'
          },
          {
            id: 'kc_wdb_7_1_2',
            questionText: 'Which command checks which files are untracked, modified, or staged?',
            options: ['git status', 'git init', 'git branch', 'git pull'],
            correctAnswer: 0,
            explanation: 'git status displays the live state of your working directory and staging area.'
          },
          {
            id: 'kc_wdb_7_1_3',
            questionText: 'Which commit message follows professional engineering standards?',
            options: [
              '"stuff"',
              '"fix"',
              '"Add mobile responsive navigation bar and contact form validation"',
              '"asdf"'
            ],
            correctAnswer: 2,
            explanation: 'Clear imperative messages let teammates and future-you understand every snapshot.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_7_2',
        moduleId: 'mod_wdb_7',
        courseId: 'web-development-beginner',
        title: 'GitHub Repositories, Remote Push & .gitignore',
        sequence: 2,
        sequenceLabel: 'Lesson 7.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-GIT-07'],
        learningObjectives: [
          'Distinguish between local Git (on your device) and GitHub (remote cloud hosting).',
          'Create a GitHub repository and push local commits safely with git push -u origin main.',
          'Protect private files, OS clutter, and future .env secrets using a .gitignore file.'
        ],
        introduction:
          'Local Git saves history on your laptop—if your laptop is stolen or crashes, local-only commits disappear. GitHub hosts your repository safely in the cloud and lets employers review your code.',
        lessonContent: [
          'Git vs. GitHub: Git is the command-line version control engine installed on your computer. GitHub is an online platform hosting Git repositories, README documentation, pull requests, and static hosting via GitHub Pages.',
          'Connecting a Remote Repository: After creating an empty repo on github.com, link it with git remote add origin https://github.com/username/portfolio.git, rename your branch to main if needed (git branch -M main), and push with git push -u origin main.',
          'Creating .gitignore Before Pushing: Never push temporary OS junk (.DS_Store, Thumbs.db), huge node_modules folders, or secret .env files containing keys. List them inside a file named .gitignore so Git ignores them permanently.'
        ],
        stepByStepInstructions: [
          'Create a free account on github.com and click "+ New repository".',
          'Name it personal-portfolio (Public) with no initial README if pushing an existing local folder.',
          'Add a .gitignore file containing .DS_Store, Thumbs.db, and .env.',
          'Run git remote add origin <your-url>, git branch -M main, and git push -u origin main.'
        ],
        nigerianContextExamples: [
          'Portfolio Resume Link: Including https://github.com/yourhandle on your CV lets Nigerian startups and global recruiters inspect clean HTML/CSS/JS source code directly.',
          'Security Hygiene Early: Learning .gitignore now protects you from accidentally leaking API keys later in Intermediate/Advanced projects.'
        ],
        toolsAndResources: ['GitHub.com', 'GitHub Docs: Ignoring files'],
        practicalDemonstration:
          '# .gitignore file\n.DS_Store\nThumbs.db\n.env\n\n# Push local repo to GitHub\ngit remote add origin https://github.com/ada-dev/portfolio.git\ngit branch -M main\ngit push -u origin main',
        codeExamples: [
          {
            title: 'Starter .gitignore + Remote Setup Commands',
            language: 'bash',
            code: `# Create .gitignore first
cat << 'EOF' > .gitignore
.DS_Store
Thumbs.db
.env
*.log
EOF

git add .gitignore
git commit -m "Add .gitignore for OS junk and environment files"

# Connect GitHub remote and push main branch
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git push -u origin main`,
            explanation: [
              '.gitignore prevents sensitive or machine-specific clutter from entering commit history.',
              '-u origin main sets upstream tracking so future updates only require git push.'
            ],
            expectedOutput: 'Your files appear live inside your GitHub repository page.'
          }
        ],
        commonErrors: [
          {
            error: 'remote origin already exists',
            cause: 'You ran git remote add origin twice.',
            fix: 'Check current remotes with git remote -v, or update URL using git remote set-url origin <new-url>.'
          },
          {
            error: 'Authentication failed when pushing over HTTPS',
            cause: 'GitHub no longer accepts account passwords for git push over HTTPS.',
            fix: 'Sign in via GitHub CLI (gh auth login), VS Code GitHub sign-in prompt, or a Personal Access Token.'
          }
        ],
        handsOnExercise: {
          title: 'Push Your Portfolio Repository to GitHub',
          task: 'Publish your personal portfolio code to a public GitHub repository with a .gitignore file.',
          steps: [
            'Add a .gitignore file to your local project.',
            'Create a matching repository on github.com and push your main branch.',
            'Refresh github.com in your browser to confirm all files uploaded.'
          ],
          deliverable: 'Public GitHub repository URL for your portfolio.'
        },
        keyTakeaways: [
          'Git is local version control; GitHub is remote repository hosting and collaboration.',
          'Always configure .gitignore to exclude .env secrets and OS clutter.',
          'Use git push -u origin main for your initial push, then git push for updates.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_7_2_1',
            questionText: 'What is the main purpose of a .gitignore file?',
            options: [
              'To delete your GitHub repository',
              'To tell Git which files/folders (like .env or .DS_Store) should never be tracked or pushed',
              'To minify HTML code automatically',
              'To lock a website behind a password'
            ],
            correctAnswer: 1,
            explanation: '.gitignore keeps secrets, logs, and OS junk out of version control.'
          },
          {
            id: 'kc_wdb_7_2_2',
            questionText: 'Which command uploads committed local main branch changes to GitHub?',
            options: ['git pull origin main', 'git push -u origin main', 'git status origin', 'git init remote'],
            correctAnswer: 1,
            explanation: 'git push uploads local commits to the remote repository.'
          },
          {
            id: 'kc_wdb_7_2_3',
            questionText: 'What is the difference between Git and GitHub?',
            options: [
              'They are identical names for the same desktop app',
              'Git is the version control tool installed locally; GitHub is a cloud platform hosting Git repositories',
              'Git is only for CSS; GitHub is only for SQL',
              'GitHub replaces HTML browsers'
            ],
            correctAnswer: 1,
            explanation: 'Git tracks snapshots locally; GitHub stores remotes online for backup and collaboration.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_7_3',
        moduleId: 'mod_wdb_7',
        courseId: 'web-development-beginner',
        title: 'Branches, Pull Requests & Professional README Docs',
        sequence: 3,
        sequenceLabel: 'Lesson 7.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-GIT-07'],
        learningObjectives: [
          'Create safe feature branches with git checkout -b so main always stays working.',
          'Merge completed feature branches cleanly back into main or open a Pull Request.',
          'Write a crisp README.md documenting your project features, stack, and live link.'
        ],
        introduction:
          'When adding a new feature—like a new project card or dark mode—developers do not edit main directly in case they break something mid-work. Branches let you isolate features cleanly.',
        lessonContent: [
          'Why Branching Matters: Your main branch represents clean, deployable code. Creating a feature branch (git checkout -b feature/contact-validation) lets you build and test safely without disturbing main.',
          'Merging & Pull Requests (PRs): Once tested, switch back (git checkout main) and merge (git merge feature/contact-validation), or push the branch to GitHub and open a Pull Request so teammates or mentors can review line-by-line diffs before merging.',
          'Writing a Standout README.md: Every portfolio repository deserves a README.md at the root explaining: What the project does, Core features, Technologies used (HTML5, CSS3, JS), Setup instructions, and Live Deployed Link.'
        ],
        stepByStepInstructions: [
          'Create a branch: git checkout -b docs/add-readme.',
          'Create README.md with project overview, features list, and tech stack.',
          'Commit on the branch, switch back to main, merge the branch, and push to GitHub.'
        ],
        nigerianContextExamples: [
          'Team Hackathons & CDS Group Projects: When two corps members build different pages simultaneously, branching prevents overwriting each other’s files.',
          'Recruiter First Impression: Hiring managers read README.md in under 20 seconds—clear screenshots and live links set your repo apart.'
        ],
        toolsAndResources: ['GitHub Markdown Guide', 'Git Branching Visualization (Learn Git Branching)'],
        practicalDemonstration:
          'git checkout -b feature/dark-mode\n# edit styles.css and script.js\ngit add .\ngit commit -m "Add accessible dark mode toggle"\ngit checkout main\ngit merge feature/dark-mode\ngit push',
        codeExamples: [
          {
            title: 'Professional Portfolio README.md Template',
            language: 'markdown',
            code: `# Ada Okonkwo — Personal Developer Portfolio

A fast, mobile-first personal portfolio website built from scratch using semantic HTML5, modern CSS3 (Flexbox & Grid), and vanilla JavaScript.

## Features
- Responsive navigation and 3-breakpoint project gallery
- Accessible semantic structure with mobile viewport optimization
- Interactive project filter & client-side validated contact form

## Built With
- HTML5
- CSS3 (Flexbox, CSS Grid, Custom Properties)
- Vanilla JavaScript (DOM & Form Validation)

## Live Demo
- Live URL: https://your-username.github.io/my-portfolio/`,
            explanation: [
              'Uses clean Markdown headings (#, ##) and bullet lists.',
              'Gives visitors and recruiters instant clarity on features, stack, and live link.'
            ],
            expectedOutput: 'Renders cleanly on the main GitHub repository homepage.'
          }
        ],
        commonErrors: [
          {
            error: 'Merge conflict markers (<<<<<<< HEAD) appear in a file',
            cause: 'Two branches edited the exact same lines differently.',
            fix: 'Open the file in VS Code, choose which change to keep (or combine both), delete the <<< === >>> markers, save, git add, and git commit.'
          }
        ],
        handsOnExercise: {
          title: 'Add a README.md via Feature Branch Workflow',
          task: 'Create a docs/readme branch, write your README.md, merge it into main, and push to GitHub.',
          steps: [
            'Run git checkout -b docs/readme.',
            'Write README.md describing your portfolio.',
            'Commit, checkout main, merge docs/readme, and git push.'
          ],
          deliverable: 'GitHub repository featuring a clean README.md and branch merge history.'
        },
        keyTakeaways: [
          'Keep main deployable by developing new features inside dedicated branches.',
          'Pull Requests on GitHub allow code review and discussion before merging.',
          'A clear README.md turns a raw code folder into a credible portfolio showcase.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_7_3_1',
            questionText: 'Which command creates and immediately switches to a new branch named feature/footer?',
            options: [
              'git checkout -b feature/footer',
              'git add feature/footer',
              'git push feature/footer',
              'git init feature/footer'
            ],
            correctAnswer: 0,
            explanation: 'git checkout -b <branch-name> (or git switch -c) creates and checks out the new branch.'
          },
          {
            id: 'kc_wdb_7_3_2',
            questionText: 'Why should developers avoid making unfinished experimental edits directly on main?',
            options: [
              'GitHub deletes main branches on weekends',
              'To keep main clean and deployable while isolating incomplete work on feature branches',
              'Branches double internet speed',
              'CSS files do not work on main'
            ],
            correctAnswer: 1,
            explanation: 'Branch isolation keeps production/main stable.'
          },
          {
            id: 'kc_wdb_7_3_3',
            questionText: 'Where does GitHub automatically render README.md?',
            options: [
              'Hidden inside browser settings',
              'Directly on the repository’s main homepage below the file list',
              'Only inside paid accounts',
              'Inside the .gitignore tab'
            ],
            correctAnswer: 1,
            explanation: 'GitHub displays README.md front and center to introduce the project.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 7 Assignment: GitHub Repository & Clean README',
      description: 'Push your personal portfolio codebase to a public GitHub repository with .gitignore, multiple meaningful commits, and a complete README.md.',
      deliverables: [
        'Public GitHub repository URL',
        'Root .gitignore and README.md files committed cleanly'
      ],
      evaluationCriteria: [
        'Repository contains index.html, CSS, JS, .gitignore, and README.md',
        'Commit messages clearly describe project milestones'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_7_1',
        questionText: 'What is the right sequence to save local edits into Git history?',
        options: [
          'git commit -> git init -> git add',
          'git add -> git commit -m "..."',
          'git push -> git status -> git add',
          'git clone -> git commit'
        ],
        correctAnswer: 1,
        explanation: 'Stage changes with git add before saving a commit snapshot.'
      },
      {
        id: 'mc_wdb_7_2',
        questionText: 'Which file tells Git never to commit sensitive .env files or .DS_Store clutter?',
        options: ['.gitskip', '.gitignore', 'README.md', 'exclude.html'],
        correctAnswer: 1,
        explanation: '.gitignore lists excluded paths and file patterns.'
      },
      {
        id: 'mc_wdb_7_3',
        questionText: 'What command checks the status of modified and staged files in your repo?',
        options: ['git inspect', 'git status', 'git state', 'git check'],
        correctAnswer: 1,
        explanation: 'git status reports working tree and staging area status.'
      },
      {
        id: 'mc_wdb_7_4',
        questionText: 'What is a Pull Request (PR) on GitHub?',
        options: [
          'A billing invoice from GitHub',
          'A request to review and merge changes from one branch into another (such as main)',
          'A command to erase local code',
          'A CSS animation tool'
        ],
        correctAnswer: 1,
        explanation: 'PRs support structured code review and safe merging.'
      },
      {
        id: 'mc_wdb_7_5',
        questionText: 'Which file introduces your project features, tech stack, and live link on GitHub?',
        options: ['index.css', 'README.md', 'package.log', 'about.txt'],
        correctAnswer: 1,
        explanation: 'README.md serves as the repository front-page documentation.'
      }
    ]
  },

  // =========================================================================
  // MODULE 8: WEBSITE DEPLOYMENT AND PORTFOLIO
  // =========================================================================
  {
    moduleId: 'mod_wdb_8',
    courseId: 'web-development-beginner',
    sequence: 8,
    sequenceLabel: 'Module 8',
    title: 'Website Deployment and Portfolio',
    description:
      'Publish your personal portfolio website to the live internet for free, audit accessibility, SEO, and mobile load speed, and prepare your final capstone.',
    learningObjectiveIds: ['WDB-DEP-08'],
    lessons: [
      {
        lessonId: 'lesson_wdb_8_1',
        moduleId: 'mod_wdb_8',
        courseId: 'web-development-beginner',
        title: 'Preparing a Website for Production: SEO, Meta Tags & Performance',
        sequence: 1,
        sequenceLabel: 'Lesson 8.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-DEP-08'],
        learningObjectives: [
          'Check relative paths and case sensitivity before deploying to Linux web servers.',
          'Configure essential <title>, description, and Open Graph meta tags for clean sharing.',
          'Optimize image sizes and test page speed so low-data mobile visitors load quickly.'
        ],
        introduction:
          'A website that looks good on your laptop can still fail on the internet if image paths break on Linux servers or 5 MB unresized photos drain visitors’ mobile data.',
        lessonContent: [
          'Relative Paths & Case Sensitivity: Windows is case-insensitive (Images/Photo.jpg might match images/photo.jpg locally), whereas live Linux servers (GitHub Pages, Netlify, Vercel) are strictly case-sensitive! Always use lowercase filenames (hero-photo.webp) and relative paths (./styles.css, NOT C:\\Users\\Desktop\\styles.css).',
          'Meta Tags for Search & WhatsApp Previews: Including <title> and <meta name="description" content="..."> helps search engines understand your site, while Open Graph tags (og:title, og:description) make shared WhatsApp and LinkedIn links look professional.',
          'Lightweight Assets: Resize portrait photos to 600px–1000px wide and compress them under 150 KB before committing so your portfolio opens in under 2 seconds on 3G.'
        ],
        stepByStepInstructions: [
          'Audit every <link>, <script>, and <img> path in index.html to verify zero C:\\ absolute paths and matching lowercase filenames.',
          'Add <meta name="description"> and Open Graph title/description inside <head>.',
          'Compress any large images under 150 KB.'
        ],
        nigerianContextExamples: [
          'WhatsApp Link Previews: When sharing your live portfolio link with a prospective client on WhatsApp, clean og:title and og:description tags produce an attractive preview card.',
          'Data-Friendly Load Speed: Keeping total page weight light ensures NYSC employers or clients on mobile data never abandon a slow site.'
        ],
        toolsAndResources: ['Chrome Lighthouse Audit', 'Squoosh.app (Image Compression)'],
        practicalDemonstration:
          '<head>\n  <meta charset="UTF-8" />\n  <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n  <title>Tunde Bakare | Frontend Web Developer</title>\n  <meta name="description" content="Personal web developer portfolio showcasing responsive HTML, CSS, and JavaScript projects." />\n</head>',
        codeExamples: [
          {
            title: 'Production-Ready HTML <head> Checklist',
            language: 'html',
            code: `<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tunde Bakare | Web Developer Portfolio</title>
  <meta name="description" content="Responsive HTML5, CSS3, and JavaScript portfolio built by Tunde Bakare." />
  <meta property="og:title" content="Tunde Bakare — Web Developer Portfolio" />
  <meta property="og:description" content="Explore projects, skills, and contact details." />
  <link rel="stylesheet" href="./styles.css" />
</head>`,
            explanation: [
              'Uses relative ./styles.css path that works cleanly across localhost and GitHub Pages subdirectories.',
              'Provides descriptive title, search description, and social Open Graph metadata.'
            ],
            expectedOutput: 'Browser tab displays custom title and link previews show clean description.'
          }
        ],
        commonErrors: [
          {
            error: 'CSS and images load locally on laptop, then return 404 after deploying',
            cause: 'Links pointed to C:\\Users\\... or file capitalization differed (Style.css vs style.css).',
            fix: 'Rename all files to lowercase-kebab-case and reference them with relative paths like ./styles.css.'
          }
        ],
        handsOnExercise: {
          title: 'Run a Pre-Deployment Audit on Your Portfolio',
          task: 'Verify lowercase relative filenames, add production meta tags, and run Lighthouse or DevTools inspection.',
          steps: [
            'Inspect all src= and href= attributes in index.html.',
            'Add title, description, og:title, and og:description tags.',
            'Commit and push updates to GitHub.'
          ],
          deliverable: 'Deployment-ready index.html and optimized assets.'
        },
        keyTakeaways: [
          'Live hosting servers are case-sensitive—stick strictly to lowercase filenames and relative paths.',
          'Never reference C:\\ or file:// paths in web projects.',
          'Compress images and configure descriptive meta tags before launching.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_8_1_1',
            questionText: 'Why might an image named Photo.JPG work on Windows locally but fail with 404 on GitHub Pages?',
            options: [
              'GitHub Pages bans JPEG images',
              'Linux web servers are case-sensitive, so Photo.JPG does not match src="photo.jpg"',
              'HTML does not support uppercase extensions',
              'CSS hides uppercase filenames'
            ],
            correctAnswer: 1,
            explanation: 'Linux servers treat Photo.JPG and photo.jpg as completely different filenames.'
          },
          {
            id: 'kc_wdb_8_1_2',
            questionText: 'Which path works correctly after uploading a site to a live web host?',
            options: [
              'C:\\Users\\Ada\\Desktop\\styles.css',
              'file:///D:/portfolio/styles.css',
              './styles.css',
              'localhost:5500/styles.css'
            ],
            correctAnswer: 2,
            explanation: 'Relative paths (./styles.css) resolve cleanly against whichever domain hosts the site.'
          },
          {
            id: 'kc_wdb_8_1_3',
            questionText: 'What do Open Graph (og:title, og:description) meta tags improve?',
            options: [
              'Database query speed',
              'How your website link preview looks when shared on WhatsApp, LinkedIn, or X',
              'JavaScript loop speed',
              'Git commit messages'
            ],
            correctAnswer: 1,
            explanation: 'Messaging and social apps read Open Graph metadata to build link preview cards.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_8_2',
        moduleId: 'mod_wdb_8',
        courseId: 'web-development-beginner',
        title: 'Deploying Live with GitHub Pages & Static Hosts',
        sequence: 2,
        sequenceLabel: 'Lesson 8.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDB-DEP-08'],
        learningObjectives: [
          'Deploy a static HTML/CSS/JS site live with HTTPS using GitHub Pages or Netlify/Vercel.',
          'Verify that index.html sits cleanly at the repository root.',
          'Update a live deployed site automatically by pushing new Git commits.'
        ],
        introduction:
          'Code sitting only on your laptop cannot be opened by clients or hiring managers. Let us publish your repository onto a live HTTPS URL that anyone worldwide can visit.',
        lessonContent: [
          'GitHub Pages Setup: Open your portfolio repository on github.com -> Settings -> Pages. Under "Build and deployment", select Source: "Deploy from a branch", choose Branch: main and Folder: / (root), then click Save. Within 1–2 minutes, GitHub provides your live HTTPS URL (https://username.github.io/repo-name/).',
          'Alternative Static Hosts (Netlify / Vercel): Both platforms also connect directly to your GitHub repo and auto-deploy on every git push with free SSL/HTTPS certificates.',
          'Continuous Updates: Every time you fix a typo or add a new project locally, run git add ., git commit -m "...", and git push. GitHub Pages automatically rebuilds and updates your live website.'
        ],
        stepByStepInstructions: [
          'Verify index.html is directly inside the root folder of your GitHub repository (not nested inside an extra subfolder).',
          'Open Repository Settings -> Pages -> select main branch / (root) -> Save.',
          'Wait ~60 seconds, refresh the Pages screen, and open your live https://...github.io/... URL on both laptop and phone.',
          'Add the live URL to your GitHub README.md and your portfolio capstone submission.'
        ],
        nigerianContextExamples: [
          'Zero-Cost Professional Hosting: Nigerian students and corps members can host fast HTTPS portfolios permanently without USD credit card barriers using GitHub Pages.',
          'Real Mobile Testing: Opening your own live github.io URL on a budget Android device shows real-world readability instantly.'
        ],
        toolsAndResources: ['GitHub Pages Documentation', 'Netlify Drop / Vercel Static Hosting'],
        practicalDemonstration:
          'Deployment Checklist:\n[x] index.html at repository root\n[x] Relative paths (./styles.css, ./script.js)\n[x] Settings -> Pages -> Branch: main / (root) -> Save\n[x] Verify live HTTPS URL on mobile and desktop',
        codeExamples: [
          {
            title: 'Updating Your Live Website After Launch',
            language: 'bash',
            code: `# Edit your portfolio locally, test in browser, then publish update:
git status
git add .
git commit -m "Add live project screenshot and polish mobile spacing"
git push

# GitHub Pages automatically redeploys main branch within ~1 minute`,
            explanation: [
              'Pushing to main triggers GitHub Pages’ built-in deployment workflow automatically.'
            ],
            expectedOutput: 'Live website reflects the committed changes after ~60 seconds.'
          }
        ],
        commonErrors: [
          {
            error: 'GitHub Pages shows README text instead of portfolio website',
            cause: 'index.html was placed inside a subfolder (like my-portfolio/index.html) instead of the repository root.',
            fix: 'Move index.html, styles.css, and script.js directly into the root folder of the repo, commit, and push.'
          }
        ],
        handsOnExercise: {
          title: 'Deploy Your Personal Portfolio Live',
          task: 'Enable GitHub Pages on your portfolio repository and verify the live HTTPS URL works on your phone.',
          steps: [
            'Push latest portfolio commits to main.',
            'Enable GitHub Pages from Settings -> Pages.',
            'Test all links, filters, and the contact form on the live URL.'
          ],
          deliverable: 'Live, publicly accessible HTTPS portfolio URL.'
        },
        keyTakeaways: [
          'GitHub Pages hosts HTML/CSS/JS repositories free over HTTPS.',
          'index.html must reside in the selected deployment root folder.',
          'Pushing new commits to main updates the live deployed website automatically.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_8_2_1',
            questionText: 'Which file name must sit at the deployment root for GitHub Pages to serve your homepage automatically?',
            options: ['home.html', 'main.html', 'index.html', 'portfolio.html'],
            correctAnswer: 2,
            explanation: 'Web servers look for index.html by default at the root directory.'
          },
          {
            id: 'kc_wdb_8_2_2',
            questionText: 'Once GitHub Pages is configured on the main branch, how do you publish an update?',
            options: [
              'Email GitHub support every time',
              'Commit your edits and run git push to main',
              'Delete and recreate the account',
              'Upload a Word document'
            ],
            correctAnswer: 1,
            explanation: 'Every push to the configured branch automatically triggers a fresh deployment.'
          },
          {
            id: 'kc_wdb_8_2_3',
            questionText: 'Why is HTTPS important for a deployed portfolio website?',
            options: [
              'It encrypts traffic between visitor browsers and the server, preventing browser security warnings',
              'It doubles screen brightness',
              'It writes CSS Grid rules automatically',
              'It disables mobile responsiveness'
            ],
            correctAnswer: 0,
            explanation: 'HTTPS builds visitor trust and secures transmitted form/page data.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdb_8_3',
        moduleId: 'mod_wdb_8',
        courseId: 'web-development-beginner',
        title: 'Portfolio Polish, QA Checklist & Roadmap to Intermediate Track',
        sequence: 3,
        sequenceLabel: 'Lesson 8.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDB-DEP-08'],
        learningObjectives: [
          'Perform a full QA inspection covering responsive layout, contrast, broken links, and keyboard accessibility.',
          'Write credible developer case summaries for portfolio project cards.',
          'Identify your readiness path into Intermediate Track B (Modern Web Development with React, TypeScript & AI).'
        ],
        introduction:
          'Finishing a website means testing it like a sceptical first-time visitor. This final lesson guides you through a real QA pass before submitting your Track A Capstone Project.',
        lessonContent: [
          'The 5-Point Portfolio QA Checklist: (1) Zero broken links or missing images. (2) Zero horizontal scroll at 360px phone width. (3) Clean color contrast and readable 16px+ body text. (4) Working interactive controls (navigation, filters, validated contact form). (5) Descriptive GitHub README + Live URL.',
          'How to Present Beginner Projects Credibly: Each project card should explain What problem it solves, Which technologies you used (HTML5/CSS3/JS), and link to both Live Demo and Source Code.',
          'What Comes Next: Now that you can write semantic HTML, responsive CSS, vanilla JavaScript, and Git from scratch without shortcuts, you have the solid mental model needed for Track B (Intermediate: React, TypeScript, Tailwind CSS, Firebase & AI-Assisted Development).'
        ],
        stepByStepInstructions: [
          'Open your live portfolio URL on mobile (or Chrome Device Toolbar at 360px) and scroll from top to bottom.',
          'Test keyboard Tab navigation across header links, buttons, and contact form fields.',
          'Review your capstone checklist (Homepage, About, Skills, Project Gallery, Contact Form, GitHub Repo, Live URL).',
          'Submit your Capstone Project and take the Beginner Final Assessment!'
        ],
        nigerianContextExamples: [
          'Graduating from Basics to Modern Stacks: Employers value corps members who understand vanilla JS and DOM fundamentals before adopting React and AI coding assistants.',
          'Sharable Proof of Skill: Your live portfolio URL works immediately on CVs, LinkedIn, and freelance proposals.'
        ],
        toolsAndResources: ['W3C HTML Validator', 'WebAIM Contrast Checker', 'Lighthouse Accessibility Audit'],
        practicalDemonstration:
          'Final Portfolio Audit:\n- Semantics: header, nav, main, section, footer present\n- Responsive: tested at 360px, 768px, 1280px\n- Interactivity: contact form validates cleanly without reload\n- Links: GitHub repo public + GitHub Pages live URL active',
        handsOnExercise: {
          title: 'Complete Your Final Portfolio Capstone QA & Submission',
          task: 'Verify every requirement in the Beginner Capstone Rubric and prepare your live link and GitHub repository URL.',
          steps: [
            'Confirm at least 3 sections plus About, Skills, Project Gallery, and Contact Form.',
            'Test mobile and desktop views on the live HTTPS link.',
            'Submit the Capstone form in the Academy Course Hub.'
          ],
          deliverable: 'Audited, live portfolio submitted for Capstone evaluation.'
        },
        keyTakeaways: [
          'Always test your live deployed URL across mobile (360px), tablet, and desktop before sharing.',
          'Good portfolios show the problem, stack, live link, and GitHub source for each project.',
          'Mastering HTML, CSS, JS, and Git gives you full confidence to inspect and verify modern frameworks and AI code in Intermediate Track B.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdb_8_3_1',
            questionText: 'What two links make a portfolio project card most credible to technical reviewers?',
            options: [
              'Two WhatsApp numbers',
              'A Live Demo URL and a public GitHub Source Code link',
              'A local C:\\ folder link',
              'Only a password-protected ZIP file'
            ],
            correctAnswer: 1,
            explanation: 'Reviewers want to test the live experience and read your actual code on GitHub.'
          },
          {
            id: 'kc_wdb_8_3_2',
            questionText: 'Why test keyboard Tab navigation before launching your portfolio?',
            options: [
              'To make images spin faster',
              'To verify interactive links and form fields are accessible to keyboard and assistive-tech users',
              'To delete browser cache',
              'Because mice do not work on HTTPS'
            ],
            correctAnswer: 1,
            explanation: 'Keyboard navigability is essential for real-world web accessibility.'
          },
          {
            id: 'kc_wdb_8_3_3',
            questionText: 'Why does Track A require learning vanilla HTML, CSS, and JavaScript before Track B AI-assisted React?',
            options: [
              'So you can understand, debug, and verify generated code instead of copying blindly',
              'Because React does not render HTML or CSS',
              'Because GitHub blocks React apps',
              'Because JavaScript stops working once you know React'
            ],
            correctAnswer: 0,
            explanation: 'Strong fundamentals let you spot bugs, security issues, and bad layouts immediately.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 8 Assignment: Live Portfolio Launch & QA Check',
      description: 'Publish your portfolio via GitHub Pages (or Netlify/Vercel), run a responsive and accessibility check, and verify all links.',
      deliverables: [
        'Live HTTPS URL',
        'Public GitHub repository with README.md showing live URL'
      ],
      evaluationCriteria: [
        'Site loads cleanly over HTTPS with zero broken images or stylesheets',
        'Mobile (360px) and desktop layouts display with clean contrast and working contact form'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdb_8_1',
        questionText: 'Why should deployed web assets use lowercase filenames and relative paths like ./styles.css?',
        options: [
          'Linux hosting servers are case-sensitive and cannot read local C:\\ paths',
          'CSS files ignore lowercase letters',
          'GitHub requires uppercase extensions',
          'Browsers refuse relative URLs'
        ],
        correctAnswer: 0,
        explanation: 'Consistent lowercase relative paths prevent 404 errors on live servers.'
      },
      {
        id: 'mc_wdb_8_2',
        questionText: 'Which file sits at the root of a static deployment to serve as the default homepage?',
        options: ['app.txt', 'index.html', 'styles.css', 'readme.html'],
        correctAnswer: 1,
        explanation: 'Static hosts automatically load index.html at the root path.'
      },
      {
        id: 'mc_wdb_8_3',
        questionText: 'What should you verify at 360px width before sharing a portfolio link?',
        options: [
          'Zero horizontal scroll and readable text without overlapping elements',
          'That 10 popups appear immediately',
          'That desktop navigation covers the entire height',
          'That images are 10 MB each'
        ],
        correctAnswer: 0,
        explanation: 'Budget mobile screens rely on clean zero-overflow responsive layouts.'
      },
      {
        id: 'mc_wdb_8_4',
        questionText: 'Which HTML tags customize how a link preview appears when shared on WhatsApp or LinkedIn?',
        options: ['<video> tags', 'Open Graph <meta property="og:..."> tags', '<marquee> tags', '<table border="1">'],
        correctAnswer: 1,
        explanation: 'Open Graph meta tags define share preview titles and descriptions.'
      },
      {
        id: 'mc_wdb_8_5',
        questionText: 'How do you push an updated version of a GitHub Pages website?',
        options: [
          'Commit your edits locally and run git push to the tracked branch',
          'Reinstall VS Code',
          'Rename index.html to index2.html',
          'Turn off HTTPS'
        ],
        correctAnswer: 0,
        explanation: 'Pushing new commits triggers automatic redeployment.'
      }
    ]
  }
];
