import { CourseModule } from '../../../types';

export const WEB_DEV_INTERMEDIATE_MODULES_1_TO_5: CourseModule[] = [
  // =========================================================================
  // MODULE 1: MODERN JAVASCRIPT AND ES6+
  // =========================================================================
  {
    moduleId: 'mod_wdi_1',
    courseId: 'web-development-intermediate',
    sequence: 1,
    sequenceLabel: 'Module 1',
    title: 'Modern JavaScript and ES6+',
    description:
      'Upgrade your vanilla JS foundation to modern ES6+ syntax used across every React and TypeScript codebase: destructuring, spread/rest, array transforms, Promises, async/await, and ES modules.',
    learningObjectiveIds: ['WDI-ES6-01'],
    lessons: [
      {
        lessonId: 'lesson_wdi_1_1',
        moduleId: 'mod_wdi_1',
        courseId: 'web-development-intermediate',
        title: 'Arrow Functions, Destructuring, Spread & Immutability',
        sequence: 1,
        sequenceLabel: 'Lesson 1.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-ES6-01'],
        learningObjectives: [
          'Write concise arrow functions and recognize implicit vs. explicit returns.',
          'Extract properties cleanly with object and array destructuring.',
          'Create updated copies of objects and arrays without mutating state directly using the spread operator (...).'
        ],
        introduction:
          'React components rely heavily on modern ES6+ features. Instead of mutating arrays with .push() in state, React requires immutable updates using spread syntax and .map()/.filter().',
        lessonContent: [
          'Destructuring & Default Values: Instead of repeatedly writing user.firstName and user.stateCode, destructuring writes const { firstName, stateCode = "Lagos" } = user;. This makes React props and API payload handlers far cleaner.',
          'Immutability with Spread (...): To add an item to an array in React state without mutating the original reference, write const updated = [...items, newItem];. Similarly, const updatedUser = { ...user, active: true }; clones existing fields while overriding only active.',
          'Array Transformations (.map, .filter, .reduce): Use .map() to render lists of UI cards, .filter() to remove or search items, and .reduce() to calculate invoice subtotals cleanly.'
        ],
        stepByStepInstructions: [
          'Destructure properties from a sample product object.',
          'Create a new array with [...products, newProduct] leaving the original array untouched.',
          'Calculate total inventory value using .reduce().'
        ],
        nigerianContextExamples: [
          'SME Inventory Updates: When a shop assistant marks a bag of rice sold out, {...item, inStock: false} creates a clean state snapshot React immediately detects and re-renders.',
          'Order Checkout Sum: Using orders.reduce((sum, item) => sum + item.price * item.qty, 0) computes multi-item Naira totals reliably.'
        ],
        toolsAndResources: ['MDN Destructuring Assignment', 'JavaScript.info Array Methods'],
        practicalDemonstration:
          'const order = { id: "ORD-1", customer: "Amaka", amount: 12500 };\nconst { customer, amount } = order;\nconst paidOrder = { ...order, status: "paid" };\nconsole.log(customer, paidOrder.status);',
        codeExamples: [
          {
            title: 'Immutable State Updates with Spread & Array Methods',
            language: 'javascript',
            code: `const cart = [
  { id: 1, name: "Logo Kit", price: 15000, qty: 1 },
  { id: 2, name: "Flyer Pack", price: 5000, qty: 2 }
];

// Add an item immutably
const updatedCart = [...cart, { id: 3, name: "Domain Setup", price: 18000, qty: 1 }];

// Compute total cleanly
const total = updatedCart.reduce((acc, item) => acc + item.price * item.qty, 0);

// Destructure first item
const [{ name: firstProduct }] = updatedCart;

console.log("First item:", firstProduct);
console.log("Original cart length:", cart.length);
console.log("Updated cart total: NGN", total);`,
            explanation: [
              'updatedCart clones cart cleanly using [...cart, ...], leaving cart.length at 2.',
              '.reduce() sums price * qty across all cart entries into a single number.'
            ],
            expectedOutput: 'First item: Logo Kit\nOriginal cart length: 2\nUpdated cart total: NGN 43000'
          }
        ],
        commonErrors: [
          {
            error: 'Mutating state array directly with items.push() causes React UI not to re-render',
            cause: 'Array reference stays identical in memory, so React assumes nothing changed.',
            fix: 'Always create a new array copy via [...items, newItem] or items.filter(...).'
          }
        ],
        codingChallenge: {
          id: 'cc_wdi_1_1',
          title: 'Immutable Invoice Summary in ES6+',
          prompt:
            'Use spread (...) to clone tasks into newTasks with { id: 3, title: "Deploy App", done: true }, then filter only items where done === true and log the count.',
          starterCode: `const tasks = [
  { id: 1, title: "Setup Vite", done: true },
  { id: 2, title: "Style UI", done: false }
];

// Add { id: 3, title: "Deploy App", done: true } immutably using spread (...)
const newTasks = tasks;
const doneTasks = newTasks.filter((t) => t.done);

console.log("Original count:", tasks.length);
console.log("Completed count:", doneTasks.length);`,
          language: 'javascript',
          runnableInBrowser: true,
          expectedOutput: 'Original count: 2\nCompleted count: 2',
          hints: [
            'Replace const newTasks = tasks; with const newTasks = [...tasks, { id: 3, title: "Deploy App", done: true }];'
          ],
          validationChecks: [
            { label: 'Uses spread operator ...tasks', pattern: '\\.\\.\\.tasks' },
            { label: 'Includes Deploy App', pattern: 'Deploy App' }
          ],
          solutionSummary: 'Spread syntax clones existing items before adding new records, preserving React immutability rules.'
        },
        handsOnExercise: {
          title: 'Refactor Imperative Loops to .map() & .filter()',
          task: 'Convert a traditional for-loop product filter into chained .filter() and .map() calls.',
          steps: [
            'Filter products priced below 10,000 NGN.',
            'Map each remaining product into a display label string.'
          ],
          deliverable: 'Pure ES6+ array transformation snippet.'
        },
        keyTakeaways: [
          'Destructuring unpacks object properties and array slots cleanly.',
          'Never mutate arrays or objects directly in state—use spread (...) and .filter()/.map().',
          '.reduce() computes totals and summaries cleanly without external counter variables.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_1_1_1',
            questionText: 'How do you create a copy of user with role updated to "admin" without mutating user?',
            options: [
              'user.role = "admin"',
              'const updated = { ...user, role: "admin" }',
              'const updated = user.push("admin")',
              'Object.freeze(user)'
            ],
            correctAnswer: 1,
            explanation: 'Object spread clones existing keys and overrides role on a brand-new object.'
          },
          {
            id: 'kc_wdi_1_1_2',
            questionText: 'Which syntax extracts title and price directly from const item = { title: "Book", price: 2000 }?',
            options: [
              'const [title, price] = item',
              'const { title, price } = item',
              'const title, price <- item',
              'extract(item)'
            ],
            correctAnswer: 1,
            explanation: 'Curly braces { ... } destructure named keys from an object.'
          },
          {
            id: 'kc_wdi_1_1_3',
            questionText: 'Why does React require immutable state updates instead of array.push()?',
            options: [
              'JavaScript deleted .push() in ES6',
              'React compares object/array references to detect changes and trigger re-renders',
              '.push() only works with CSS',
              'Spread uses less RAM than numbers'
            ],
            correctAnswer: 1,
            explanation: 'Mutating an existing reference prevents shallow reference comparison from noticing updates.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_1_2',
        moduleId: 'mod_wdi_1',
        courseId: 'web-development-intermediate',
        title: 'Asynchronous JavaScript: Promises, async/await & fetch()',
        sequence: 2,
        sequenceLabel: 'Lesson 1.2',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDI-ES6-01'],
        learningObjectives: [
          'Explain why network requests are asynchronous in single-threaded browsers.',
          'Handle async operations cleanly using async/await and try/catch/finally.',
          'Inspect response.ok before parsing JSON with fetch().'
        ],
        introduction:
          'Modern apps constantly fetch profiles, products, and records from remote servers. Synchronous waiting would freeze the whole screen; async/await keeps the UI smooth while requests finish.',
        lessonContent: [
          'Promises & async/await: A Promise represents an eventual result (pending -> fulfilled or rejected). Using async function loadData() { const res = await fetch(url); ... } makes asynchronous code read top-to-bottom cleanly.',
          'Always Check response.ok: A common beginner trap with fetch() is assuming 404 or 500 server errors trigger the catch block automatically—they do NOT! Only network failures reject fetch(). Always write if (!res.ok) throw new Error(`HTTP ${res.status}`); before calling res.json().',
          'Loading & Error Safety with try / catch / finally: Wrap awaits in try/catch to catch network or HTTP errors, and reset setIsLoading(false) inside finally so spinners never get stuck forever.'
        ],
        stepByStepInstructions: [
          'Write an async function fetchSummary(url) using try/catch/finally.',
          'Check if (!response.ok) before await response.json().',
          'Handle fallback errors gracefully without crashing the component.'
        ],
        nigerianContextExamples: [
          'Unstable Network Resilience: Over patchy 3G data, explicit try/catch with clear "Retry" UI feedback ensures users never stare at an endless spinner.',
          'Checking response.ok: Prevents crashing on JSON.parse when a gateway returns a 502 HTML error page instead of JSON.'
        ],
        toolsAndResources: ['MDN Using the Fetch API', 'MDN async function'],
        practicalDemonstration:
          'async function loadQuote() {\n  try {\n    const res = await fetch("/api/health");\n    if (!res.ok) throw new Error(`Status ${res.status}`);\n    return await res.json();\n  } catch (err) {\n    console.error("Request failed:", err.message);\n  }\n}',
        codeExamples: [
          {
            title: 'Production-Safe async/await Fetch Pattern',
            language: 'javascript',
            code: `async function simulateOrderFetch(shouldFail = false) {
  try {
    // Simulate async API call using Promise
    const response = await new Promise((resolve) =>
      setTimeout(
        () =>
          resolve(
            shouldFail
              ? { ok: false, status: 500, json: async () => ({ error: "Server busy" }) }
              : { ok: true, status: 200, json: async () => ({ orders: 14, revenue: 95000 }) }
          ),
        50
      )
    );

    if (!response.ok) {
      throw new Error(\`HTTP error \${response.status}\`);
    }

    const data = await response.json();
    console.log("Loaded orders:", data.orders);
  } catch (error) {
    console.log("Handled gracefully:", error.message);
  } finally {
    console.log("Loading spinner stopped.");
  }
}

simulateOrderFetch(false);`,
            explanation: [
              'await pauses only inside the async function without freezing the page.',
              'if (!response.ok) explicitly catches HTTP 4xx/5xx responses.',
              'finally guarantees cleanup/loading state runs regardless of success or error.'
            ],
            expectedOutput: 'Loaded orders: 14\nLoading spinner stopped.'
          }
        ],
        commonErrors: [
          {
            error: 'Logged value shows Promise { <pending> } instead of actual data',
            cause: 'Called an async function without awaiting its result.',
            fix: 'Add await inside an async parent function or chain .then().'
          },
          {
            error: 'SyntaxError: Unexpected token < in JSON at position 0',
            cause: 'API returned an HTML error page (like 404/500) and code called res.json() without checking res.ok first.',
            fix: 'Verify if (!res.ok) throw new Error(...) before parsing JSON.'
          }
        ],
        codingChallenge: {
          id: 'cc_wdi_1_2',
          title: 'Guard an Async Request with response.ok & try/catch',
          prompt:
            'Complete verifyResponse(res) using try/catch: if !res.ok, throw an Error("HTTP " + res.status); otherwise return res.data.',
          starterCode: `async function verifyResponse(res) {
  try {
    // Throw an error when !res.ok, else return res.data
    return res.data;
  } catch (err) {
    console.log("Caught error:", err.message);
    return null;
  }
}

(async () => {
  console.log("OK case:", await verifyResponse({ ok: true, status: 200, data: "Ready" }));
  console.log("Fail case:", await verifyResponse({ ok: false, status: 404, data: null }));
})();`,
          language: 'javascript',
          runnableInBrowser: true,
          expectedOutput: 'OK case: Ready\nCaught error: HTTP 404\nFail case: null',
          hints: [
            'Add if (!res.ok) { throw new Error("HTTP " + res.status); } inside try { ... }.'
          ],
          validationChecks: [
            { label: 'Checks !res.ok', pattern: '!res\\.ok' },
            { label: 'Throws Error', pattern: 'throw\\s+new\\s+Error' }
          ],
          solutionSummary: 'Explicitly checking response.ok inside try/catch ensures server error responses are caught cleanly.'
        },
        handsOnExercise: {
          title: 'Write a Reusable fetchJson Helper',
          task: 'Build a reusable async fetchJson(url) helper checking response.ok and throwing descriptive errors.',
          steps: [
            'Wrap fetch(url) in try/catch.',
            'Throw readable message including status code if !res.ok.'
          ],
          deliverable: 'Reusable fetchJson utility ready for Module 6.'
        },
        keyTakeaways: [
          'Always await asynchronous calls or handle Promises explicitly.',
          'fetch() only rejects on network failures—always check if (!res.ok) for HTTP errors.',
          'finally blocks guarantee loading indicators stop cleanly on both success and failure.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_1_2_1',
            questionText: 'What happens if fetch() receives an HTTP 404 Not Found response from a server?',
            options: [
              'fetch() automatically throws a JavaScript exception',
              'fetch() resolves normally with response.ok === false, so your code must check response.ok',
              'The browser restarts',
              'JSON.parse converts 404 to an empty array'
            ],
            correctAnswer: 1,
            explanation: 'fetch() only rejects on network drop; HTTP error codes set response.ok to false.'
          },
          {
            id: 'kc_wdi_1_2_2',
            questionText: 'Which block inside try / catch / finally ALWAYS executes whether the await succeeded or threw?',
            options: ['try', 'catch', 'finally', 'return'],
            correctAnswer: 2,
            explanation: 'finally is ideal for turning off loading spinners.'
          },
          {
            id: 'kc_wdi_1_2_3',
            questionText: 'Where is the await keyword allowed in standard functions?',
            options: [
              'Inside any CSS rule',
              'Inside functions marked with the async keyword (or top-level ES modules)',
              'Only inside for loops',
              'Only inside HTML <title>'
            ],
            correctAnswer: 1,
            explanation: 'await requires an async function context.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_1_3',
        moduleId: 'mod_wdi_1',
        courseId: 'web-development-intermediate',
        title: 'ES Modules (import / export) & Clean Code Organization',
        sequence: 3,
        sequenceLabel: 'Lesson 1.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDI-ES6-01'],
        learningObjectives: [
          'Split growing JavaScript files cleanly using ES module export and import statements.',
          'Compare named exports vs. default exports and know when each fits best.',
          'Eliminate global variable collisions by keeping modules cleanly scoped.'
        ],
        introduction:
          'Putting an entire business application inside one 3,000-line script becomes unmaintainable fast. ES Modules organize utilities, API services, and UI components into crisp reusable files.',
        lessonContent: [
          'Named vs. Default Exports: Named exports (export function formatNaira(n) { ... }) must be imported with exact curly-brace names: import { formatNaira } from "./currency";. Default exports (export default App;) import without braces, though named exports are strongly preferred in TypeScript/React projects because IDE autocomplete and refactoring catch typos immediately.',
          'Clean Dependency Boundaries: Place formatting helpers in src/utils/, Firebase/API calls in src/services/, shared interfaces in src/types/, and UI views in src/components/.',
          'No Circular Imports: Keep data types and pure utility functions at the bottom of your dependency tree so modules never import each other in circles.'
        ],
        stepByStepInstructions: [
          'Identify two utility functions (e.g., formatNaira and validatePhone) suitable for extraction.',
          'Export them cleanly from src/utils/formatters.ts and import them into a component.',
          'Check that Vite compiles cleanly with zero unresolved module errors.'
        ],
        nigerianContextExamples: [
          'Shared Naira Formatter: Exporting formatNaira(amount) once in utils/currency.ts means invoices, dashboards, and receipts across your entire SME app stay 100% consistent.',
          'Clean AI Collaboration: Smaller, single-purpose ES module files let AI coding tools inspect focused context instead of huge tangled files.'
        ],
        toolsAndResources: ['MDN JavaScript Modules', 'Vite Asset & Module Resolution'],
        practicalDemonstration:
          '// src/utils/currency.ts\nexport function formatNaira(amount: number): string {\n  return `NGN ${amount.toLocaleString("en-NG")}`;\n}\n\n// In ProductCard.tsx\nimport { formatNaira } from "../utils/currency";',
        codeExamples: [
          {
            title: 'Named Exports & Clean Utility Imports',
            language: 'javascript',
            code: `// utils/pricing.js
export const VAT_RATE = 0.075;

export function calculateWithVat(subtotal) {
  return Math.round(subtotal * (1 + VAT_RATE));
}

// checkout.js
// import { VAT_RATE, calculateWithVat } from './utils/pricing.js';
console.log("VAT Rate:", VAT_RATE);`,
            explanation: [
              'Named exports let one file share multiple constants and helper functions.',
              'Exact import names prevent silent mismatches during refactoring.'
            ],
            expectedOutput: 'Cleanly shares VAT_RATE and calculateWithVat across multiple components.'
          }
        ],
        commonErrors: [
          {
            error: 'SyntaxError: The requested module does not provide an export named X',
            cause: 'Tried to import a default export with curly braces { X }, or misspelled a named export.',
            fix: 'Match export style: export const X uses import { X }; export default X uses import X.'
          }
        ],
        handsOnExercise: {
          title: 'Design a Modular src/ Folder Structure',
          task: 'Outline and create separate utility and data modules using ES imports/exports.',
          steps: [
            'Create formatters module exporting formatNaira and truncateText.',
            'Import both helpers into a consumer script cleanly.'
          ],
          deliverable: 'Modular ES export/import pair.'
        },
        keyTakeaways: [
          'ES modules scope variables privately to each file unless explicitly exported.',
          'Prefer named exports for utilities and types to gain strict IDE autocomplete.',
          'Organize projects by responsibility (components, services, utils, types).'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_1_3_1',
            questionText: 'How must you import export function formatDate() from "./date.js"?',
            options: [
              'import formatDate from "./date.js"',
              'import { formatDate } from "./date.js"',
              'require.default("./date.js")',
              'include "./date.js"'
            ],
            correctAnswer: 1,
            explanation: 'Named exports require curly braces matching the exported identifier.'
          },
          {
            id: 'kc_wdi_1_3_2',
            questionText: 'Why do React/TypeScript teams often prefer named exports over default exports?',
            options: [
              'Named exports enforce consistent naming and make IDE auto-imports and refactoring safer',
              'Default exports cannot return JSX',
              'Named exports skip Vite bundling',
              'Browsers ban default exports'
            ],
            correctAnswer: 0,
            explanation: 'Consistent exported names avoid mismatched aliases across large teams.'
          },
          {
            id: 'kc_wdi_1_3_3',
            questionText: 'What happens to a helper variable declared without export inside an ES module file?',
            options: [
              'It attaches to window globally',
              'It stays private to that module file, preventing naming collisions',
              'It causes a Vite crash',
              'It uploads to Firestore'
            ],
            correctAnswer: 1,
            explanation: 'ES modules isolate module scope cleanly.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 1 Assignment: ES6+ Business Pricing & Async Data Utility',
      description: 'Write a clean ES6+ module featuring immutable state helpers, .filter()/.reduce() inventory analytics, and a safe async fetch wrapper.',
      deliverables: [
        'Immutable update helper using spread (...)',
        'Safe async fetchJson function checking response.ok inside try/catch'
      ],
      evaluationCriteria: [
        'Zero direct array/object mutation',
        'Proper error propagation when response.ok is false'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_1_1',
        questionText: 'Which expression adds newItem to items without mutating the original array?',
        options: ['items.push(newItem)', '[...items, newItem]', 'items[items.length] = newItem', 'items.splice(0, 0, newItem)'],
        correctAnswer: 1,
        explanation: 'Spread syntax builds a fresh array copy.'
      },
      {
        id: 'mc_wdi_1_2',
        questionText: 'Which array method turns an array of product objects into a single total Naira sum?',
        options: ['.filter()', '.reduce()', '.find()', '.join()'],
        correctAnswer: 1,
        explanation: '.reduce() folds an array into a cumulative value.'
      },
      {
        id: 'mc_wdi_1_3',
        questionText: 'What must your code explicitly check after await fetch(url) before assuming success?',
        options: ['if (!response.ok)', 'if (response.css)', 'if (window.loaded)', 'if (response === string)'],
        correctAnswer: 0,
        explanation: 'fetch() does not automatically throw on 404 or 500 HTTP responses.'
      },
      {
        id: 'mc_wdi_1_4',
        questionText: 'What syntax unpacks email and name from const user = { name: "Bola", email: "b@x.com" }?',
        options: ['const [name, email] = user', 'const { name, email } = user', 'const (name, email) = user', 'import name, email from user'],
        correctAnswer: 1,
        explanation: 'Object destructuring uses curly braces matching property keys.'
      },
      {
        id: 'mc_wdi_1_5',
        questionText: 'Which statement correctly exports a named helper function?',
        options: ['module.push(fn)', 'export function calculateTotal() {}', 'global fn()', 'public static fn()'],
        correctAnswer: 1,
        explanation: 'export function ... declares a standard ES named export.'
      }
    ]
  },

  // =========================================================================
  // MODULE 2: REACT FUNDAMENTALS
  // =========================================================================
  {
    moduleId: 'mod_wdi_2',
    courseId: 'web-development-intermediate',
    sequence: 2,
    sequenceLabel: 'Module 2',
    title: 'React Fundamentals',
    description:
      'Think in components: author clean JSX, pass typed props, render dynamic lists with stable keys, and manage reactive component state with useState and useEffect.',
    learningObjectiveIds: ['WDI-RCT-02'],
    lessons: [
      {
        lessonId: 'lesson_wdi_2_1',
        moduleId: 'mod_wdi_2',
        courseId: 'web-development-intermediate',
        title: 'Components, JSX Rules & Composing UI Trees',
        sequence: 1,
        sequenceLabel: 'Lesson 2.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-RCT-02'],
        learningObjectives: [
          'Build reusable React functional components returning clean JSX.',
          'Apply JSX syntax rules (single parent/Fragment, className instead of class, camelCase events).',
          'Decompose a webpage into composable parent and child components.'
        ],
        introduction:
          'Instead of manually querying DOM nodes with querySelector for every button, React lets you describe UI components declaratively as functions of data.',
        lessonContent: [
          'Components Start with Capital Letters: React treats lowercase tags like <div> or <button> as native HTML elements, and PascalCase tags like <ServiceCard /> as custom React components.',
          'Core JSX Rules: Every component returns a single root element (wrap siblings in a Fragment <>...</>), write className instead of class, htmlFor instead of for, and close self-closing tags like <img /> or <input /> cleanly.',
          'Thinking in Composition: Break complex screens—such as an SME Invoice Dashboard—into focused pieces: <HeaderBar />, <MetricSummaryCard />, and <InvoiceRow /> rather than one monolithic 800-line file.'
        ],
        stepByStepInstructions: [
          'Scaffold a local Vite React + TypeScript project using npm create vite@latest.',
          'Create src/components/ServiceCard.tsx returning a clean card layout.',
          'Render three <ServiceCard /> instances inside App.tsx.'
        ],
        nigerianContextExamples: [
          'Reusable Business Cards: An Abuja logistics portal builds one <ShipmentCard /> component and renders hundreds of waybills consistently without repeating markup.',
          'AI Verification Checkpoint: When an AI assistant generates JSX with HTML class="..." attributes instead of className="...", React fundamentals let you catch and fix it in seconds.'
        ],
        toolsAndResources: ['React Official Docs: Describing the UI', 'Vite React-TS Template'],
        practicalDemonstration:
          'export function Badge({ label }: { label: string }) {\n  return <span className="badge">{label}</span>;\n}',
        codeExamples: [
          {
            title: 'Composable React Functional Component with JSX',
            language: 'tsx',
            code: `import React from 'react';

interface MetricCardProps {
  title: string;
  value: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value }) => {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <p className="text-xs font-semibold text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
};`,
            explanation: [
              'Component name MetricCard uses PascalCase.',
              'JSX uses className instead of HTML class and embeds expressions inside {title} and {value}.'
            ],
            expectedOutput: 'Renders a crisp metric summary card showing any title and value passed as props.'
          }
        ],
        commonErrors: [
          {
            error: 'Adjacent JSX elements must be wrapped in an enclosing tag',
            cause: 'Returning two sibling elements like <h1>...</h1><p>...</p> without a wrapper.',
            fix: 'Wrap adjacent sibling elements inside <>...</> (React Fragment) or a container <div>.'
          },
          {
            error: 'Warning: Invalid DOM property `class`. Did you mean `className`?',
            cause: 'Copied raw HTML into JSX without converting class= to className=.',
            fix: 'Replace class= with className= throughout JSX.'
          }
        ],
        handsOnExercise: {
          title: 'Create a Reusable BusinessHeader & FeatureCard Component',
          task: 'Scaffold a Vite React app locally (or use the downloadable Intermediate Starter Kit) and build two composed components.',
          steps: [
            'Create BusinessHeader displaying your business name and tagline.',
            'Render three FeatureCard children inside <main>.'
          ],
          deliverable: 'Compiled React components inside your local Vite workspace.'
        },
        keyTakeaways: [
          'Custom React components must start with a capital letter (PascalCase).',
          'JSX requires className, camelCase attributes, closed tags, and a single root wrapper (<>...</>).',
          'Small, single-responsibility components are easier to test, reuse, and inspect.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_2_1_1',
            questionText: 'Why must a custom React component name start with an uppercase letter (e.g., <ProductCard />)?',
            options: [
              'React distinguishes custom components (PascalCase) from built-in HTML tags (lowercase)',
              'Lowercase components cannot access CSS',
              'Vite requires uppercase filenames for CSS',
              'TypeScript crashes on lowercase functions'
            ],
            correctAnswer: 0,
            explanation: 'JSX compiles lowercase tags as built-in DOM strings and PascalCase tags as component functions.'
          },
          {
            id: 'kc_wdi_2_1_2',
            questionText: 'How do you group two sibling JSX elements without adding an extra <div> to the DOM?',
            options: ['Use a React Fragment <>...</>', 'Use <group>', 'Use <!-- split -->', 'Separate with a semicolon'],
            correctAnswer: 0,
            explanation: 'Fragments (<>...</>) satisfy single-root JSX rules without extra DOM wrapper nodes.'
          },
          {
            id: 'kc_wdi_2_1_3',
            questionText: 'Which HTML attribute changes name inside JSX?',
            options: ['id -> elementId', 'class -> className', 'src -> source', 'alt -> altText'],
            correctAnswer: 1,
            explanation: 'Because class is a reserved JavaScript keyword, JSX uses className.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_2_2',
        moduleId: 'mod_wdi_2',
        courseId: 'web-development-intermediate',
        title: 'Props, Dynamic Lists (.map + keys) & Conditional Rendering',
        sequence: 2,
        sequenceLabel: 'Lesson 2.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-RCT-02'],
        learningObjectives: [
          'Pass read-only data cleanly from parent components into child components via props.',
          'Render dynamic arrays in JSX with .map() and unique, stable key attributes.',
          'Render conditional states (loading, empty, or error banners) cleanly.'
        ],
        introduction:
          'Props flow data downward from parent to child, while .map() transforms data arrays directly into live UI lists without manual DOM appendChild calls.',
        lessonContent: [
          'Props Are Read-Only Inputs: Just like function arguments, props passed into a child component (<OrderRow order={item} />) must never be mutated by the child.',
          'Rendering Lists with Unique Keys: Always attach a stable, unique ID as key={item.id} on the outermost JSX element returned inside .map(). Avoid using array index as key whenever items can be added, deleted, or reordered, because index keys cause subtle input/checkbox mix-ups.',
          'Clean Conditional Rendering: Use ternary expressions (isEmpty ? <EmptyState /> : <TaskList />) or guarded checks ({error && <ErrorBanner message={error} />}). Beware writing {items.length && <List />} because React renders the number 0 on screen when length is 0—always write {items.length > 0 && <List />}!'
        ],
        stepByStepInstructions: [
          'Define an array of 4 Nigerian SME services with unique id fields.',
          'Render them using services.map((service) => <ServiceCard key={service.id} ... />).',
          'Add an empty-state conditional check using services.length === 0.'
        ],
        nigerianContextExamples: [
          'Zero-Bug Empty States: Writing {orders.length > 0 && <OrderTable />} instead of {orders.length && ...} prevents an embarrassing stray "0" from showing on a merchant’s dashboard when no orders exist yet.',
          'Stable Keys in Task Lists: Using task.id guarantees deleting task #1 never steals checkbox state from task #2.'
        ],
        toolsAndResources: ['React Docs: Rendering Lists', 'React Docs: Conditional Rendering'],
        practicalDemonstration:
          '{tasks.length === 0 ? (\n  <p>No tasks yet.</p>\n) : (\n  tasks.map((t) => <TaskItem key={t.id} task={t} />)\n)}',
        codeExamples: [
          {
            title: 'List Rendering with Stable Keys & Safe Conditional Check',
            language: 'tsx',
            code: `interface ServiceItem {
  id: string;
  name: string;
  priceNgn: number;
}

export function ServiceDirectory({ services }: { services: ServiceItem[] }) {
  if (services.length === 0) {
    return <p className="text-sm text-slate-600">No active services listed yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {services.map((service) => (
        <li key={service.id} className="flex justify-between rounded-lg border p-3">
          <span>{service.name}</span>
          <strong>NGN {service.priceNgn.toLocaleString()}</strong>
        </li>
      ))}
    </ul>
  );
}`,
            explanation: [
              'Early return handles the empty state cleanly.',
              'key={service.id} identifies each list item uniquely during re-renders.'
            ],
            expectedOutput: 'Renders either an empty-state message or a formatted Naira service list.'
          }
        ],
        commonErrors: [
          {
            error: 'Warning: Each child in a list should have a unique "key" prop',
            cause: 'Rendered an array via .map() without key={item.id} on the outer returned JSX node.',
            fix: 'Add key={item.id} on the top element inside the .map() callback.'
          },
          {
            error: 'Unexpected "0" appears on screen where a list should be',
            cause: 'Wrote {items.length && <List />} when items was empty (0 is falsy yet rendered by React).',
            fix: 'Use explicit boolean condition: {items.length > 0 && <List />}.'
          }
        ],
        handsOnExercise: {
          title: 'Build a Filterable Service Directory Component',
          task: 'Render a list of services using stable IDs as keys and show an empty-state notice when a search filter matches zero items.',
          steps: [
            'Pass items array via props.',
            'Handle length === 0 gracefully and render .map() with key={item.id}.'
          ],
          deliverable: 'ServiceDirectory React component.'
        },
        keyTakeaways: [
          'Use unique record IDs for React key props—avoid array indices for dynamic editable lists.',
          'Always use explicit boolean comparisons like items.length > 0 with && rendering.',
          'Props are read-only inputs flowing downward.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_2_2_1',
            questionText: 'What is the danger of writing {orders.length && <OrderList />} in JSX?',
            options: [
              'When orders.length is 0, React renders the literal character "0" on screen',
              'orders.length throws a TypeScript syntax error',
              'It runs an infinite loop',
              'It deletes all orders'
            ],
            correctAnswer: 0,
            explanation: 'React renders numeric 0 inside JSX expressions; convert to boolean (orders.length > 0) first.'
          },
          {
            id: 'kc_wdi_2_2_2',
            questionText: 'Why does React require stable unique keys when rendering arrays with .map()?',
            options: [
              'To match CSS Grid columns',
              'To accurately track which specific items changed, were added, or removed across renders',
              'To encrypt user data',
              'To run Node.js on the client'
            ],
            correctAnswer: 1,
            explanation: 'Stable keys preserve component identity and input state during reconciliation.'
          },
          {
            id: 'kc_wdi_2_2_3',
            questionText: 'Should a child component directly overwrite a prop value it receives from its parent?',
            options: [
              'Yes, props.title = "New"',
              'No—props are read-only; ask the parent to update state via a callback prop instead',
              'Only inside useEffect',
              'Only for strings'
            ],
            correctAnswer: 1,
            explanation: 'One-way data flow keeps state predictable and traceable.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_2_3',
        moduleId: 'mod_wdi_2',
        courseId: 'web-development-intermediate',
        title: 'State & Effects: useState, Controlled Inputs & useEffect',
        sequence: 3,
        sequenceLabel: 'Lesson 2.3',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDI-RCT-02'],
        learningObjectives: [
          'Manage reactive UI state cleanly using useState().',
          'Build controlled form inputs bound to React state.',
          'Synchronize components with external storage or APIs via useEffect() with proper dependency arrays.'
        ],
        introduction:
          'Local variables reset every render; useState preserves values between renders and triggers UI updates automatically. useEffect lets components sync with APIs or localStorage cleanly.',
        lessonContent: [
          'useState & Functional Updates: const [count, setCount] = useState(0);. When the next state depends on the previous state, prefer the functional updater setCount((prev) => prev + 1) so rapid clicks never lose updates.',
          'Controlled Form Inputs: Binding value={taskText} and onChange={(e) => setTaskText(e.target.value)} gives React single-source-of-truth control over form validation, reset, and submission.',
          'useEffect & Dependency Arrays: useEffect(() => { ... }, [dependency]) runs after render whenever items in the dependency array change. Pass [] to run once on mount, and never call setState unconditionally inside an effect with no dependency array (which triggers an infinite re-render loop!).'
        ],
        stepByStepInstructions: [
          'Build a Task Manager state hook: const [tasks, setTasks] = useState([]).',
          'Add controlled input state for the new task title and submit handler.',
          'Persist tasks in localStorage using useEffect(..., [tasks]).'
        ],
        nigerianContextExamples: [
          'Interactive Business Task Manager: Building your Practical Project #2 (Task Manager) using controlled inputs, toggle-complete checkboxes, delete buttons, and localStorage persistence.',
          'Spot-Checking AI Hooks: AI sometimes forgets dependency arrays in useEffect causing browser lockups; understanding dependency arrays lets you catch infinite loops immediately.'
        ],
        toolsAndResources: ['React Docs: State: A Component’s Memory', 'React Docs: Synchronizing with Effects'],
        practicalDemonstration:
          'const [query, setQuery] = useState("");\n<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search..." />',
        codeExamples: [
          {
            title: 'Controlled Input + Immutable Task Manager Hook',
            language: 'tsx',
            code: `import React, { useState } from 'react';

export function QuickTaskApp() {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<Array<{ id: string; title: string; done: boolean }>>([]);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    const clean = title.trim();
    if (!clean) return;
    setTasks((prev) => [...prev, { id: String(Date.now()), title: clean, done: false }]);
    setTitle('');
  }

  return (
    <form onSubmit={handleAdd} className="space-y-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add business follow-up..."
        className="border rounded-lg px-3 py-2 w-full"
      />
      <button type="submit" className="bg-emerald-700 text-white px-4 py-2 rounded-lg">
        Add Task
      </button>
    </form>
  );
}`,
            explanation: [
              'title state controls the <input> value directly.',
              'setTasks uses functional updater (prev) => [...] for safe immutable updates.'
            ],
            expectedOutput: 'Adds trimmed tasks cleanly and resets the input after submission.'
          }
        ],
        commonErrors: [
          {
            error: 'Maximum update depth exceeded (infinite re-render loop)',
            cause: 'Called setState inside useEffect without a dependency array, or called onClick={handleAdd()} instead of onClick={handleAdd}.',
            fix: 'Pass function references (onClick={() => handleDelete(id)}) and specify an explicit useEffect dependency array ([], or specific IDs).'
          }
        ],
        handsOnExercise: {
          title: 'Build Practical Project #2: React Task Management App',
          task: 'Build a working React Task Manager supporting add, toggle-complete, filter (All/Active/Done), delete, and localStorage persistence.',
          steps: [
            'Manage tasks and filter state with useState.',
            'Sync saved tasks with localStorage inside useEffect.',
            'Test adding, completing, deleting, and refreshing the page.'
          ],
          deliverable: 'Working React Task Management App in your local Vite workspace.'
        },
        keyTakeaways: [
          'Use functional state updates (prev => ...) when new state builds on previous state.',
          'Controlled inputs keep form values, validation, and reset synchronized in React.',
          'Always specify the dependency array on useEffect to avoid infinite loops.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_2_3_1',
            questionText: 'What happens if you pass onClick={deleteItem(item.id)} instead of onClick={() => deleteItem(item.id)}?',
            options: [
              'deleteItem runs immediately during render instead of waiting for a click',
              'Nothing happens on render',
              'React automatically prevents execution until click',
              'CSS hides the button'
            ],
            correctAnswer: 0,
            explanation: 'Parentheses invoke the function right away during render; wrap in an arrow function.'
          },
          {
            id: 'kc_wdi_2_3_2',
            questionText: 'What makes an <input> a "controlled component" in React?',
            options: [
              'Its value prop is bound to React state and updated via onChange',
              'It uses inline HTML disabled attribute',
              'It submits automatically without a form',
              'It is styled with Tailwind'
            ],
            correctAnswer: 0,
            explanation: 'React state acts as the single source of truth for controlled input values.'
          },
          {
            id: 'kc_wdi_2_3_3',
            questionText: 'What does an empty dependency array [] mean in useEffect(() => { ... }, [])?',
            options: [
              'Run on every single keystroke',
              'Run once after initial component mount (and cleanup on unmount)',
              'Never run at all',
              'Disable React state updates'
            ],
            correctAnswer: 1,
            explanation: 'An empty dependency array triggers the effect only once upon initial mount.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 2 Assignment: Interactive React Task Manager',
      description: 'Build a multi-component React Task Manager supporting task creation, completion toggle, status filter, deletion, and localStorage persistence.',
      deliverables: [
        'At least 2 separate React components passing typed props and callbacks',
        'Controlled input form and empty-state rendering'
      ],
      evaluationCriteria: [
        'Uses immutable state updates ([...prev], .map(), .filter()) with unique keys',
        'Clean UI with zero console key warnings or render loops'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_2_1',
        questionText: 'Which attribute sets CSS classes on a JSX element?',
        options: ['class', 'className', 'css', 'styleClass'],
        correctAnswer: 1,
        explanation: 'JSX uses className because class is a reserved keyword in JS.'
      },
      {
        id: 'mc_wdi_2_2',
        questionText: 'What is the best choice for the React key prop inside tasks.map(...)?',
        options: ['Math.random()', 'The task’s stable unique ID (task.id)', 'The task description string', 'The array length'],
        correctAnswer: 1,
        explanation: 'Random keys force unmount/remount on every render; unique stable IDs preserve state.'
      },
      {
        id: 'mc_wdi_2_3',
        questionText: 'What causes {items.length && <List />} to show "0" in the browser when empty?',
        options: [
          'React renders the number 0 directly when falsy evaluation short-circuits on a number',
          'CSS adds zero padding',
          'TypeScript prints 0 automatically',
          'JSX divides by zero'
        ],
        correctAnswer: 0,
        explanation: 'Use {items.length > 0 && <List />} so the condition evaluates to boolean false.'
      },
      {
        id: 'mc_wdi_2_4',
        questionText: 'Which hook stores reactive local UI state inside a functional component?',
        options: ['useMemo', 'useState', 'useRef', 'useHistory'],
        correctAnswer: 1,
        explanation: 'useState manages state and schedules component re-renders on update.'
      },
      {
        id: 'mc_wdi_2_5',
        questionText: 'How do you pass an argument to a click handler without calling it during render?',
        options: ['onClick={remove(id)}', 'onClick={() => remove(id)}', 'onClick="remove(id)"', 'onClick={[remove, id]}'],
        correctAnswer: 1,
        explanation: 'Wrapping the call in () => ... delays invocation until the user clicks.'
      }
    ]
  },

  // =========================================================================
  // MODULE 3: TYPESCRIPT FOR WEB DEVELOPERS
  // =========================================================================
  {
    moduleId: 'mod_wdi_3',
    courseId: 'web-development-intermediate',
    sequence: 3,
    sequenceLabel: 'Module 3',
    title: 'TypeScript for Web Developers',
    description:
      'Eliminate "undefined is not a function" runtime surprises by typing interfaces, union states, React component props, events, and API payloads cleanly with TypeScript.',
    learningObjectiveIds: ['WDI-TS-03'],
    lessons: [
      {
        lessonId: 'lesson_wdi_3_1',
        moduleId: 'mod_wdi_3',
        courseId: 'web-development-intermediate',
        title: 'TypeScript Basics, Interfaces & Union Types',
        sequence: 1,
        sequenceLabel: 'Lesson 3.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-TS-03'],
        learningObjectives: [
          'Annotate variables, function parameters, and return types with string, number, boolean, and arrays.',
          'Define structured business records using interface and type aliases.',
          'Model exact workflow states with union types (e.g. "pending" | "paid" | "cancelled") and avoid any.'
        ],
        introduction:
          'Plain JavaScript lets you accidentally pass an order ID string where a price number was expected—and you only find out when a customer clicks Buy. TypeScript catches those bugs right inside your editor before the code even runs.',
        lessonContent: [
          'Interfaces Model Real Objects: Describing an invoice as interface Invoice { id: string; customerName: string; amountNgn: number; status: "pending" | "paid"; } ensures every screen in your app agrees on exact property names and types.',
          'Union Types Beat Loose Strings: Instead of status: string (which accepts typos like "piad"), status: "draft" | "submitted" | "approved" forces autocomplete and compile-time checks.',
          'Avoid the "any" Escape Hatch: Using any turns off TypeScript’s safety net. When an external JSON shape is not yet validated, use unknown and narrow it safely.'
        ],
        stepByStepInstructions: [
          'Create src/types/business.ts defining Customer and Order interfaces.',
          'Use a literal union for OrderStatus = "pending" | "paid" | "delivered".',
          'Write a typed calculateInvoiceTotal(items: OrderItem[]): number helper.'
        ],
        nigerianContextExamples: [
          'Preventing Billing Bugs: Typing priceNgn: number catches accidental string concatenation ("1500" + "500" = "1500500") before checkout code ever ships.',
          'Verifying AI-Generated TypeScript: When an AI tool sneaks in `: any` to silence a compiler warning, you know immediately to replace it with a proper interface.'
        ],
        toolsAndResources: ['TypeScript Handbook: Everyday Types', 'TypeScript Playground'],
        practicalDemonstration:
          'type PaymentStatus = "pending" | "paid" | "refunded";\ninterface Sale {\n  id: string;\n  amountNgn: number;\n  status: PaymentStatus;\n}',
        codeExamples: [
          {
            title: 'Typing Business Entities & Union Statuses',
            language: 'typescript',
            code: `export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPriceNgn: number;
}

export interface Invoice {
  id: string;
  clientName: string;
  status: InvoiceStatus;
  items: InvoiceItem[];
}

export function getInvoiceTotal(invoice: Invoice): number {
  return invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.unitPriceNgn,
    0
  );
}`,
            explanation: [
              'InvoiceStatus restricts statuses to four exact lowercase literals.',
              'getInvoiceTotal guarantees numeric return type and catches misspelled item fields at compile time.'
            ],
            expectedOutput: 'Compiler validates every call to getInvoiceTotal() and provides IDE autocomplete.'
          }
        ],
        commonErrors: [
          {
            error: 'TS2322: Type "paid_ok" is not assignable to type InvoiceStatus',
            cause: 'Passed an unrecognized literal string not present in the union type.',
            fix: 'Use one of the allowed union values ("draft" | "sent" | "paid" | "overdue") or update the union type intentionally.'
          }
        ],
        handsOnExercise: {
          title: 'Define Business Domain Types in TypeScript',
          task: 'Create a TypeScript file modeling Product, Customer, and Order with literal union statuses and optional discount fields.',
          steps: [
            'Define interfaces without using any.',
            'Write a typed total calculation function and verify with tsc --noEmit.'
          ],
          deliverable: 'Zero-error src/types/business.ts file.'
        },
        keyTakeaways: [
          'Interfaces document and enforce exact object shapes across components and services.',
          'Union types ("draft" | "paid") prevent typo bugs in statuses and filters.',
          'Avoid any—use concrete interfaces or unknown with runtime narrowing.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_3_1_1',
            questionText: 'What is the advantage of type Status = "open" | "closed" over status: string?',
            options: [
              'Union literals catch typos at compile time and enable IDE autocomplete',
              'Strings cannot be saved in Firestore',
              'Union types speed up Wi-Fi downloads',
              'string is deprecated in TypeScript'
            ],
            correctAnswer: 0,
            explanation: 'Literal union types restrict allowed string values strictly.'
          },
          {
            id: 'kc_wdi_3_1_2',
            questionText: 'Why should developers avoid slapping ": any" onto TypeScript errors?',
            options: [
              'It disables type checking and allows silent runtime crashes to slip into production',
              'any turns numbers into CSS styles',
              'Browsers crash on the word any',
              'any doubles bundle size'
            ],
            correctAnswer: 0,
            explanation: 'Using any defeats the core safety guarantee of TypeScript.'
          },
          {
            id: 'kc_wdi_3_1_3',
            questionText: 'How do you mark a property middleName as optional inside an interface?',
            options: ['middleName?: string;', 'optional middleName: string;', 'middleName: string!;', 'maybe middleName: string;'],
            correctAnswer: 0,
            explanation: 'Adding ? before the colon marks an interface property optional.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_3_2',
        moduleId: 'mod_wdi_3',
        courseId: 'web-development-intermediate',
        title: 'Typing React Components, Hooks & DOM Events',
        sequence: 2,
        sequenceLabel: 'Lesson 3.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-TS-03'],
        learningObjectives: [
          'Type component props with clean interfaces including optional callback handlers.',
          'Type React state explicitly when initial values are empty arrays or nullable objects (useState<Order | null>(null)).',
          'Type form and input event handlers accurately (React.ChangeEvent<HTMLInputElement>, React.FormEvent).'
        ],
        introduction:
          'When TypeScript meets React, you get crystal-clear error messages whenever a parent forgets a required prop or passes the wrong callback signature.',
        lessonContent: [
          'Explicit Generic State Types: TypeScript infers useState(0) as number automatically, but for empty arrays or nullable data you MUST write useState<Customer[]>([]) or useState<Customer | null>(null); otherwise TypeScript types [] as never[]!',
          'Typing Event Handlers: Inline handlers like onChange={(e) => setName(e.target.value)} automatically infer event types! When extracting a standalone handler function, write function handleChange(e: React.ChangeEvent<HTMLInputElement>) and function handleSubmit(e: React.FormEvent<HTMLFormElement>).',
          'Callback Props: Typing onSelect: (id: string) => void guarantees child components pass the right argument type back up to parents.'
        ],
        stepByStepInstructions: [
          'Type a CustomerForm component with typed React.FormEvent and React.ChangeEvent handlers.',
          'Add useState<Customer[]>([]) and useState<string | null>(null) for error feedback.',
          'Run npm run build or npx tsc --noEmit to verify zero type issues.'
        ],
        nigerianContextExamples: [
          'Safe Nullable Selected Record: Typing selectedMerchant as useState<Merchant | null>(null) forces your JSX to check {selectedMerchant && ...}, eliminating "Cannot read properties of null" crashes for end users.',
          'Confident Team Refactors: Changing a prop name updates every broken caller instantly across the entire project.'
        ],
        toolsAndResources: ['React TypeScript Cheatsheet', 'Vite tsc --noEmit'],
        practicalDemonstration:
          'const [error, setError] = useState<string | null>(null);\nconst [customers, setCustomers] = useState<Customer[]>([]);',
        codeExamples: [
          {
            title: 'Typed React Component with Nullable State & Form Events',
            language: 'tsx',
            code: `import React, { useState } from 'react';

interface Customer {
  id: string;
  fullName: string;
}

interface CustomerListProps {
  initialCustomers: Customer[];
  onCustomerAdded?: (customer: Customer) => void;
}

export const CustomerDirectory: React.FC<CustomerListProps> = ({
  initialCustomers,
  onCustomerAdded
}) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;
    const created: Customer = { id: String(Date.now()), fullName: name.trim() };
    setCustomers((prev) => [...prev, created]);
    onCustomerAdded?.(created);
    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
      />
      <button type="submit">Save ({customers.length})</button>
    </form>
  );
};`,
            explanation: [
              'useState<Customer[]> explicitly tells TypeScript the array holds Customer records.',
              'Optional chaining onCustomerAdded?.(created) safely invokes optional callback props.'
            ],
            expectedOutput: 'Zero TypeScript warnings with strict prop and event checking.'
          }
        ],
        commonErrors: [
          {
            error: 'TS2345: Argument of type "Item" is not assignable to parameter of type SetStateAction<never[]>',
            cause: 'Initialized const [items, setItems] = useState([]) without a generic type parameter.',
            fix: 'Change to useState<Item[]>([]).'
          }
        ],
        handsOnExercise: {
          title: 'Type Every Component in Your Task Manager App',
          task: 'Add strict TypeScript interfaces and explicit hook/event types across your Module 2 Task Manager.',
          steps: [
            'Define interface TaskItem in src/types.',
            'Type all component props, useState hooks, and form submit events.',
            'Run npx tsc --noEmit and fix every warning cleanly.'
          ],
          deliverable: 'Strictly typed React Task Manager passing tsc --noEmit.'
        },
        keyTakeaways: [
          'Always specify generic types for empty array or nullable useState hooks: useState<Item[]>([]) and useState<Item | null>(null).',
          'Use React.FormEvent and React.ChangeEvent<HTMLInputElement> for standalone handlers.',
          'Optional callback props invoke cleanly with optional chaining: onSaved?.(record).'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_3_2_1',
            questionText: 'What happens in TypeScript if you write const [items, setItems] = useState([]) without a type parameter?',
            options: [
              'TypeScript infers never[], blocking adding real objects later',
              'TypeScript converts items to CSS strings',
              'Vite deletes the state variable',
              'React disables re-renders'
            ],
            correctAnswer: 0,
            explanation: 'An empty untyped array literal infers never[]; write useState<MyType[]>([]).'
          },
          {
            id: 'kc_wdi_3_2_2',
            questionText: 'Which type represents a form submission event on an HTML <form> in React?',
            options: ['React.ClickEvent', 'React.FormEvent<HTMLFormElement>', 'HTMLInputClick', 'EventListener'],
            correctAnswer: 1,
            explanation: 'React.FormEvent<HTMLFormElement> provides strict typing for onSubmit handlers.'
          },
          {
            id: 'kc_wdi_3_2_3',
            questionText: 'How do you safely call an optional callback prop onSave?: () => void?',
            options: ['onSave.run()', 'onSave?.()', 'force(onSave)', 'await onSave'],
            correctAnswer: 1,
            explanation: 'Optional chaining (?.()) checks for undefined before invoking the function.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_3_3',
        moduleId: 'mod_wdi_3',
        courseId: 'web-development-intermediate',
        title: 'Type Narrowing, Generics & Safe API Response Handling',
        sequence: 3,
        sequenceLabel: 'Lesson 3.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-TS-03'],
        learningObjectives: [
          'Narrow union types safely using typeof, in checks, and discriminated unions.',
          'Write reusable generic helpers like fetchApi<T>(url) and ApiResult<T>.',
          'Validate unknown runtime errors safely inside catch (err: unknown) blocks.'
        ],
        introduction:
          'Network APIs and catch blocks do not magically obey compile-time wishes unless we narrow unknown values cleanly. Discriminated unions and generics keep both reusable and strictly verified.',
        lessonContent: [
          'Discriminated Unions for Async UI States: Model loading/error/success with a status tag: type AsyncState<T> = { status: "loading" } | { status: "error"; message: string } | { status: "ready"; data: T };. Impossible UI combinations (like loading AND error at the same time) become unrepresentable!',
          'Typing catch (err: unknown): Modern TypeScript types caught errors as unknown. Safely extract a message using const msg = err instanceof Error ? err.message : "Unexpected error";.',
          'Reusable Generics (<T>): Writing async function fetchJson<T>(url: string): Promise<T> lets you reuse one fetch helper across Users, Invoices, and Inventory without losing exact return types.'
        ],
        stepByStepInstructions: [
          'Create an ApiState<T> discriminated union type.',
          'Write a generic fetchJson<T>(url: string): Promise<T> helper.',
          'Safely inspect caught errors using err instanceof Error.'
        ],
        nigerianContextExamples: [
          'Preventing Stuck UI States: Using a discriminated union guarantees a payment screen can never simultaneously display "Payment Successful" and an error spinner.',
          'Safe Error Logging: Using instanceof Error stops crashes when a library throws a plain string instead of an Error instance.'
        ],
        toolsAndResources: ['TypeScript Handbook: Narrowing', 'TypeScript Handbook: Generics'],
        practicalDemonstration:
          'type LoadState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; error: string };',
        codeExamples: [
          {
            title: 'Generic Fetch Wrapper & Safe Error Narrowing',
            language: 'typescript',
            code: `export async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(\`Request failed with status \${response.status}\`);
  }
  return (await response.json()) as T;
}

export function getReadableError(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === 'string') return err;
  return 'An unexpected error occurred.';
}`,
            explanation: [
              'Generic <T> preserves caller-specified response structure.',
              'getReadableError narrows unknown cleanly instead of assuming err.message exists.'
            ],
            expectedOutput: 'Safe, strongly typed API utilities usable across all modules.'
          }
        ],
        commonErrors: [
          {
            error: 'TS18046: "err" is of type "unknown"',
            cause: 'Tried reading err.message directly inside catch (err) under TypeScript strict mode.',
            fix: 'Check if (err instanceof Error) before accessing err.message.'
          }
        ],
        handsOnExercise: {
          title: 'Build a Generic fetchJson<T> & AsyncState<T> Utility',
          task: 'Implement a reusable fetchJson<T> helper and discriminated AsyncState<T> type in src/services/api.ts.',
          steps: [
            'Write fetchJson<T> checking response.ok.',
            'Handle catch (err: unknown) safely with getReadableError(err).'
          ],
          deliverable: 'Typed API utility module passing tsc --noEmit.'
        },
        keyTakeaways: [
          'Discriminated unions eliminate impossible UI state combinations.',
          'Generics (<T>) make helpers reusable across data models while keeping strict type safety.',
          'Always narrow catch (err: unknown) with instanceof Error before reading .message.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_3_3_1',
            questionText: 'How should you safely read .message inside catch (err: unknown) in strict TypeScript?',
            options: [
              'Read err.message directly',
              'Narrow with if (err instanceof Error) before reading err.message',
              'Cast to CSSStyleDeclaration',
              'Ignore catch blocks'
            ],
            correctAnswer: 1,
            explanation: 'instanceof Error proves at runtime that err has a .message string.'
          },
          {
            id: 'kc_wdi_3_3_2',
            questionText: 'What do generics like AsyncState<T> provide?',
            options: [
              'A single reusable type template that adapts to any specific data type T passed in',
              'Automatic CSS dark mode',
              'Shorter HTML tags',
              'Faster Git pushes'
            ],
            correctAnswer: 0,
            explanation: 'Generics preserve concrete type safety across reusable helpers and state shapes.'
          },
          {
            id: 'kc_wdi_3_3_3',
            questionText: 'What problem do discriminated unions solve for UI loading/error/data states?',
            options: [
              'They eliminate contradictory impossible states like showing error and success simultaneously',
              'They replace Vite entirely',
              'They eliminate CSS media queries',
              'They encrypt localStorage'
            ],
            correctAnswer: 0,
            explanation: 'A single status discriminant makes each state mutually exclusive.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 3 Assignment: Strictly Typed Business Domain & API Helpers',
      description: 'Refactor your React application to 100% strict TypeScript with zero any leaks, discriminated async states, and typed event handlers.',
      deliverables: [
        'src/types domain models with literal unions',
        'Generic fetchJson<T> and readable unknown error helper'
      ],
      evaluationCriteria: [
        'Zero uses of any',
        'Passes npx tsc --noEmit cleanly'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_3_1',
        questionText: 'Which TypeScript feature restricts status strictly to "pending" or "approved"?',
        options: ['A literal union type', 'any', 'Array<boolean>', 'let'],
        correctAnswer: 0,
        explanation: 'type Status = "pending" | "approved" catches invalid values at compile time.'
      },
      {
        id: 'mc_wdi_3_2',
        questionText: 'Why must empty array state use useState<Product[]>([])?',
        options: [
          'Without the generic type, TypeScript infers never[] and blocks adding Products',
          'Arrays fail to render in React otherwise',
          'CSS requires Product[]',
          'Vite deletes untyped arrays'
        ],
        correctAnswer: 0,
        explanation: 'Explicit generic arguments define the allowed element type.'
      },
      {
        id: 'mc_wdi_3_3',
        questionText: 'How do you safely access .message on catch (err: unknown)?',
        options: ['err.message!', 'if (err instanceof Error) return err.message', 'JSON.parse(err)', 'String(err.stack.code)'],
        correctAnswer: 1,
        explanation: 'instanceof Error safely narrows unknown values.'
      },
      {
        id: 'mc_wdi_3_4',
        questionText: 'Which prop syntax marks subtitle optional inside a React component interface?',
        options: ['subtitle?: string;', 'subtitle!: string;', 'optional subtitle: string;', 'subtitle: string?;'],
        correctAnswer: 0,
        explanation: 'Question mark after the property name denotes an optional prop.'
      },
      {
        id: 'mc_wdi_3_5',
        questionText: 'What does generics (<T>) enable on fetchJson<T>(url)?',
        options: [
          'Type-safe reuse across different response schemas without duplicating fetch code',
          'Skipping response.ok checks',
          'Direct SQL execution in browser',
          'Disabling CORS'
        ],
        correctAnswer: 0,
        explanation: 'Type parameters let a single implementation return caller-specific typed results.'
      }
    ]
  },

  // =========================================================================
  // MODULE 4: MODERN UI DEVELOPMENT WITH TAILWIND CSS
  // =========================================================================
  {
    moduleId: 'mod_wdi_4',
    courseId: 'web-development-intermediate',
    sequence: 4,
    sequenceLabel: 'Module 4',
    title: 'Modern UI Development with Tailwind CSS',
    description:
      'Design crisp, responsive, accessible React interfaces fast using Tailwind CSS utility classes, design consistency tokens, responsive prefixes, and interactive states.',
    learningObjectiveIds: ['WDI-UI-04'],
    lessons: [
      {
        lessonId: 'lesson_wdi_4_1',
        moduleId: 'mod_wdi_4',
        courseId: 'web-development-intermediate',
        title: 'Utility-First Styling, Spacing Scale & Typography Hierarchy',
        sequence: 1,
        sequenceLabel: 'Lesson 4.1',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDI-UI-04'],
        learningObjectives: [
          'Apply Tailwind spacing (p-4, px-6, gap-4), surface, and border utilities consistently.',
          'Create strong visual hierarchy with typography scale (text-xs through text-3xl, font-semibold/bold).',
          'Avoid clashing contrast or crammed cards by following a clean palette.'
        ],
        introduction:
          'Writing custom CSS class names for every small margin slows down React development. Tailwind CSS brings consistent spacing, typography, and colors directly onto JSX components.',
        lessonContent: [
          'Consistent Spacing Rhythm: Tailwind’s spacing scale uses 4px increments (p-4 = 16px, p-6 = 24px, gap-4 = 16px). Sticking to consistent padding and gaps keeps dashboards clean and intentional.',
          'Visual Hierarchy & Contrast: Separate page headings (text-2xl font-bold text-slate-900), card subheadings (text-base font-semibold text-slate-800), body text (text-sm text-slate-600), and muted metadata cleanly—always checking WCAG AA contrast.',
          'Component Abstraction Over Copy-Paste Soup: When the same styled button repeats across 6 views, extract a <Button variant="primary"> component instead of repeating 15 Tailwind classes everywhere.'
        ],
        stepByStepInstructions: [
          'Verify Tailwind CSS v4 (@import "tailwindcss";) or config works in your Vite project.',
          'Style a summary card with clean rounded borders (rounded-xl border border-slate-200 bg-white p-5).',
          'Extract a reusable <StatusBadge> or <ActionButton> component.'
        ],
        nigerianContextExamples: [
          'Low-Data Stylesheets: Tailwind compiles down to only the utility classes your project actually uses—keeping CSS bundles tiny (often under 15 KB gzipped) for Nigerian mobile networks.',
          'Reviewing AI Tailwind Output: AI loves wrapping every item in heavy shadows, thick borders, or overflowing pills—keeping spacing disciplined makes UI look truly professional.'
        ],
        toolsAndResources: ['Tailwind CSS Documentation', 'WebAIM Contrast Checker'],
        practicalDemonstration:
          '<article className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">\n  <h3 className="text-lg font-bold text-slate-900">Invoice #104</h3>\n  <p className="mt-1 text-sm text-slate-600">Due Friday · NGN 45,000</p>\n</article>',
        codeExamples: [
          {
            title: 'Reusable Tailwind Button Component with Clean Variants',
            language: 'tsx',
            code: `import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  const styles =
    variant === 'primary'
      ? 'bg-emerald-700 text-white hover:bg-emerald-800'
      : 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-50';

  return (
    <button
      className={\`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 \${styles} \${className}\`}
      {...props}
    >
      {children}
    </button>
  );
};`,
            explanation: [
              'Uses whitespace-nowrap so button labels stay cleanly on one line.',
              'Includes accessible focus:ring-2 outline for keyboard users.'
            ],
            expectedOutput: 'Clean primary and secondary button variants usable across all views.'
          }
        ],
        commonErrors: [
          {
            error: 'Dynamic Tailwind strings like `bg-${color}-600` disappear in production build',
            cause: 'Tailwind statically scans source files for complete class strings and cannot detect runtime-concatenated partial names.',
            fix: 'Always write full literal class names in a lookup map (e.g., primary: "bg-emerald-700", warn: "bg-amber-600").'
          }
        ],
        handsOnExercise: {
          title: 'Design a Reusable UI Kit (Button, Card, Input)',
          task: 'Build clean Tailwind-styled Button, Card, and Input components supporting primary/secondary variants and focus states.',
          steps: [
            'Avoid dynamically constructed Tailwind strings.',
            'Include clear focus-visible / focus:ring states on interactive elements.'
          ],
          deliverable: 'Reusable src/components/ui primitives.'
        },
        keyTakeaways: [
          'Tailwind CSS treeshakes unused styles to keep production CSS super lightweight.',
          'Never assemble dynamic Tailwind classes via string interpolation (`bg-${name}-500`); map full literal class strings instead.',
          'Extract reusable React components when utility combinations repeat.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_4_1_1',
            questionText: 'Why does Tailwind class `bg-${statusColor}-500` often fail to style in production builds?',
            options: [
              'Tailwind’s compiler scans files for complete static class names, not runtime string concatenations',
              'Tailwind forbids colors on divs',
              '500 is not a valid shade',
              'Vite deletes template strings'
            ],
            correctAnswer: 0,
            explanation: 'Always spell complete class names like bg-emerald-500 inside lookup objects.'
          },
          {
            id: 'kc_wdi_4_1_2',
            questionText: 'Which Tailwind class prevents button text from awkwardly breaking onto two lines inside flex containers?',
            options: ['whitespace-nowrap', 'text-break', 'overflow-hidden', 'font-thin'],
            correctAnswer: 0,
            explanation: 'whitespace-nowrap keeps concise button labels cleanly single-line.'
          },
          {
            id: 'kc_wdi_4_1_3',
            questionText: 'Why include focus:ring-2 or focus-visible utilities on buttons and links?',
            options: [
              'To highlight active keyboard navigation clearly for accessibility',
              'To disable mouse clicking',
              'To enlarge PNG files',
              'To speed up TypeScript compilation'
            ],
            correctAnswer: 0,
            explanation: 'Visible focus rings let keyboard and screen-reader users track focus reliably.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_4_2',
        moduleId: 'mod_wdi_4',
        courseId: 'web-development-intermediate',
        title: 'Responsive Tailwind Grids, Flexbox & Adaptive Layouts',
        sequence: 2,
        sequenceLabel: 'Lesson 4.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-UI-04'],
        learningObjectives: [
          'Use mobile-first responsive prefixes (sm:, md:, lg:) naturally in Tailwind.',
          'Build adaptive KPI cards, tables/stacked mobile rows, and responsive navigation bars.',
          'Prevent horizontal overflow across budget Android screens (360px).'
        ],
        introduction:
          'Tailwind prefixes like md:grid-cols-3 translate directly into mobile-first @media (min-width: 768px) rules—making responsive business dashboards clean and fast to build.',
        lessonContent: [
          'Mobile-First Prefixes: Unprefixed classes apply to phones (360px+). Prefixes sm: (640px+), md: (768px+), and lg: (1024px+) layer multi-column grids and side-by-side toolbars only when screen space permits.',
          'Responsive Dashboards: Use grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 for KPI metrics, and wrap wide data tables in overflow-x-auto or convert rows cleanly into stacked cards on small screens.',
          'Preventing Text Collisions: Add min-w-0 onto flex children containing long titles or emails (with truncate or break-words) so long text never pushes buttons off-screen on a phone.'
        ],
        stepByStepInstructions: [
          'Create a responsive 1 -> 2 -> 3 column service grid using grid-cols-1 md:grid-cols-2 lg:grid-cols-3.',
          'Build a responsive header stacking or wrapping cleanly on narrow screens.',
          'Test at 360px and 1280px in DevTools Device Toolbar.'
        ],
        nigerianContextExamples: [
          'Android First Business Dashboard: Shop owners check daily orders on 360px–412px Android phones. Adding min-w-0 and flex-wrap stops customer emails from breaking mobile card widths.',
          'Practical Project #1: Responsive Business Website built with React + Tailwind.'
        ],
        toolsAndResources: ['Tailwind Responsive Design Docs', 'Chrome DevTools Device Mode'],
        practicalDemonstration:
          '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">\n  {projects.map((p) => <ProjectCard key={p.id} project={p} />)}\n</div>',
        codeExamples: [
          {
            title: 'Overflow-Safe Responsive Flex Toolbar + KPI Grid',
            language: 'tsx',
            code: `export function DashboardHeader({ businessName }: { businessName: string }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
            {businessName}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">Weekly Operations Overview</p>
        </div>
        <button className="self-start sm:self-auto bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap">
          + New Order
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4">Orders: 24</div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">Revenue: NGN 185,000</div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">Pending: 3</div>
      </div>
    </div>
  );
}`,
            explanation: [
              'min-w-0 on the flex child enables truncate to clip extra-long names safely instead of stretching the layout.',
              'grid-cols-1 sm:grid-cols-3 stacks cards cleanly on mobile and displays 3 across on larger screens.'
            ],
            expectedOutput: 'Zero horizontal scrollbar at 360px and balanced 3-column KPI grid on desktop.'
          }
        ],
        commonErrors: [
          {
            error: 'Long URL or email pushes a flex card off the right edge of a phone screen',
            cause: 'Flex items default to min-width: auto, preventing shrink below long unbreakable strings.',
            fix: 'Add min-w-0 on the flex child and break-words or truncate on the text.'
          }
        ],
        handsOnExercise: {
          title: 'Build Practical Project #1: Responsive Business Website',
          task: 'Build a clean responsive business landing page in React + Tailwind with Navbar, Hero, Services Grid, Testimonials, and Contact Form.',
          steps: [
            'Use mobile-first grid-cols-1 md:grid-cols-3.',
            'Verify clean display at 360px, 768px, and 1280px.'
          ],
          deliverable: 'Responsive React + Tailwind business website.'
        },
        keyTakeaways: [
          'Tailwind prefixes (sm:, md:, lg:) apply upward from mobile base styles.',
          'Add min-w-0 to flex children when truncating or wrapping long text.',
          'Always verify responsive dashboards at 360px viewport width.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_4_2_1',
            questionText: 'What screen sizes does className="grid-cols-1 md:grid-cols-3" apply 3 columns to?',
            options: [
              'Only screens smaller than 768px',
              'Screens 768px wide and above (while using 1 column below 768px)',
              'Only 4K monitors',
              'It hides all columns on mobile'
            ],
            correctAnswer: 1,
            explanation: 'md: applies from min-width: 768px upward in mobile-first Tailwind CSS.'
          },
          {
            id: 'kc_wdi_4_2_2',
            questionText: 'Why add min-w-0 to a flex column holding a long title or email?',
            options: [
              'It allows the flex child to shrink below its content width so truncate or wrap works without overflowing mobile screens',
              'It sets height to zero',
              'It deletes padding',
              'It disables Flexbox'
            ],
            correctAnswer: 0,
            explanation: 'Default flex min-width: auto otherwise prevents shrinking past long unbreakable words.'
          },
          {
            id: 'kc_wdi_4_2_3',
            questionText: 'Which class prevents wide HTML tables from overflowing narrow phone layouts?',
            options: ['overflow-x-auto on the table wrapper', 'fixed-width-999px', 'text-nowrap on body', 'float-right'],
            correctAnswer: 0,
            explanation: 'Wrapping tables in overflow-x-auto constrains horizontal scrolling neatly to the table.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_4_3',
        moduleId: 'mod_wdi_4',
        courseId: 'web-development-intermediate',
        title: 'Accessible Forms, Modals & Polished Feedback States',
        sequence: 3,
        sequenceLabel: 'Lesson 4.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-UI-04'],
        learningObjectives: [
          'Build accessible multi-field business forms with clear labels, error messages, and disabled loading buttons.',
          'Implement clean empty, loading, and error states across every data screen.',
          'Keyboard-proof interactive dialogs and buttons (Escape key / aria attributes).'
        ],
        introduction:
          'Great interfaces handle imperfect moments gracefully: slow loading states, validation mistakes, empty lists, and disabled buttons during submission prevent double orders and confused users.',
        lessonContent: [
          'Preventing Double Submissions: Always disable submit buttons while isSubmitting is true (disabled={isSubmitting}) and update text to "Saving..." so impatient taps on slow networks never submit the same order twice.',
          'Accessible Error & Status Regions: Link error messages visually in high-contrast red (text-red-700 bg-red-50 border-red-200) with role="alert" or aria-live="polite" so screen readers announce feedback cleanly.',
          'Consistent Empty & Loading States: Every list view needs three planned states: (1) Loading skeleton/indicator, (2) Empty state with a clear next action ("Add your first product"), and (3) Error banner with a Retry button.'
        ],
        stepByStepInstructions: [
          'Build an Order/Enquiry Form component with isSubmitting, fieldErrors, and successBanner states.',
          'Disable the submit button during async submission.',
          'Add clear keyboard-accessible labels and validation errors.'
        ],
        nigerianContextExamples: [
          'Double-Tap Protection on Slow 3G: Disabling the "Submit Order" button while saving stops customers from accidentally creating duplicate invoices when tapping twice.',
          'Clear Empty States: Instead of showing a blank white box to a new shop owner, an inviting "+ Create First Invoice" button guides onboarding immediately.'
        ],
        toolsAndResources: ['WAI-ARIA Authoring Practices', 'Tailwind Forms Best Practices'],
        practicalDemonstration:
          '<button type="submit" disabled={saving} className="disabled:opacity-50 disabled:cursor-not-allowed ...">\n  {saving ? "Saving..." : "Submit Record"}\n</button>',
        codeExamples: [
          {
            title: 'Accessible Form with Loading Guard & Field Validation',
            language: 'tsx',
            code: `import React, { useState } from 'react';

export function ExpenseForm({ onSave }: { onSave: (title: string, amount: number) => Promise<void> }) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const numeric = Number(amount);
    if (title.trim().length < 2 || Number.isNaN(numeric) || numeric <= 0) {
      setError('Enter a valid expense title and amount greater than 0.');
      return;
    }

    try {
      setError(null);
      setSaving(true);
      await onSave(title.trim(), numeric);
      setTitle('');
      setAmount('');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div>
        <label htmlFor="exp-title" className="block text-xs font-semibold text-slate-700 mb-1">
          Expense Title
        </label>
        <input
          id="exp-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div>
        <label htmlFor="exp-amt" className="block text-xs font-semibold text-slate-700 mb-1">
          Amount (NGN)
        </label>
        <input
          id="exp-amt"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      {error && <p role="alert" className="text-xs font-medium text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={saving}
        className="w-full rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-50"
      >
        {saving ? 'Recording...' : 'Save Expense'}
      </button>
    </form>
  );
}`,
            explanation: [
              'Validates non-empty title and positive numeric amount before calling onSave.',
              'finally ensures saving returns to false even if onSave rejects.'
            ],
            expectedOutput: 'Renders an accessible, double-submit-protected form with instant error feedback.'
          }
        ],
        commonErrors: [
          {
            error: 'Button stays stuck on "Saving..." permanently after a network error',
            cause: 'Called setSaving(false) only inside try instead of finally.',
            fix: 'Always place setSaving(false) inside a finally { ... } block.'
          }
        ],
        handsOnExercise: {
          title: 'Upgrade Your Forms with Loading, Empty & Error States',
          task: 'Add empty state, loading indicator, error banner, and disabled submit state to your React business app.',
          steps: [
            'Verify keyboard labels (htmlFor/id) on every field.',
            'Guard async submits with try/finally and disabled={saving}.'
          ],
          deliverable: 'Production-polished UI forms and states.'
        },
        keyTakeaways: [
          'Always prevent double submissions with disabled={saving} and try/finally.',
          'Plan loading, empty, and error states for every interactive view.',
          'Pair <label htmlFor> with every input and give errors role="alert".'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_4_3_1',
            questionText: 'Why disable a form submit button while an async request is in flight?',
            options: [
              'To prevent accidental duplicate submissions when a user taps twice on slow connections',
              'To hide the form forever',
              'To clear localStorage',
              'Because Tailwind requires disabled buttons'
            ],
            correctAnswer: 0,
            explanation: 'Disabling during inflight requests protects against duplicate writes.'
          },
          {
            id: 'kc_wdi_4_3_2',
            questionText: 'Where should setSaving(false) live in an async form handler?',
            options: ['Before await', 'Inside a finally block', 'Inside a CSS file', 'Only inside catch'],
            correctAnswer: 1,
            explanation: 'finally ensures loading state always clears regardless of success or error.'
          },
          {
            id: 'kc_wdi_4_3_3',
            questionText: 'Which three UI states should every data-fetching list handle cleanly?',
            options: [
              'Loading, Empty, and Error (plus Ready)',
              'Dark, Italic, and Blinking',
              'Hover, Scroll, and Zoom',
              'Admin, Guest, and Deleted'
            ],
            correctAnswer: 0,
            explanation: 'Handling loading, empty, and error states guarantees a resilient user experience.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 4 Assignment: Responsive Business Website in React + Tailwind',
      description: 'Complete Practical Project #1: build a multi-section responsive business website in React + TypeScript + Tailwind CSS with accessible forms and zero overflow at 360px.',
      deliverables: [
        'Responsive header, hero, 3-column services/product grid, and validated enquiry form',
        'Tested across 360px mobile and 1280px desktop screens'
      ],
      evaluationCriteria: [
        'No dynamically interpolated Tailwind classes; consistent typography and WCAG contrast',
        'Double-submit protection and clean focus states'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_4_1',
        questionText: 'Why must Tailwind utility names like "bg-emerald-700" be written as complete literal strings?',
        options: [
          'Tailwind scans source files statically and drops dynamically concatenated partial names',
          'Strings with hyphens are invalid JS',
          'CSS forbids template literals in TypeScript',
          'Only primary colors need static names'
        ],
        correctAnswer: 0,
        explanation: 'Static analysis extracts full utility tokens during Vite builds.'
      },
      {
        id: 'mc_wdi_4_2',
        questionText: 'Which class prevents long text inside a flex item from pushing mobile layouts horizontally?',
        options: ['min-w-0', 'max-h-screen', 'font-bold', 'border-4'],
        correctAnswer: 0,
        explanation: 'min-w-0 overrides default flex auto-minimum sizing.'
      },
      {
        id: 'mc_wdi_4_3',
        questionText: 'What does md:grid-cols-2 do in Tailwind CSS?',
        options: [
          'Applies 2 grid columns at 768px width and above',
          'Applies 2 columns only on small phones',
          'Hides grid items on tablets',
          'Centers text vertically'
        ],
        correctAnswer: 0,
        explanation: 'Tailwind breakpoints are min-width mobile-first.'
      },
      {
        id: 'mc_wdi_4_4',
        questionText: 'Where should setIsSubmitting(false) go to prevent stuck loading buttons?',
        options: ['Inside finally { ... }', 'Before preventDefault()', 'Outside the component', 'Inside index.html'],
        correctAnswer: 0,
        explanation: 'finally runs whether the async call resolves or rejects.'
      },
      {
        id: 'mc_wdi_4_5',
        questionText: 'Which attribute announces validation error banners automatically to screen readers?',
        options: ['role="alert"', 'alt="error"', 'href="#error"', 'data-css="red"'],
        correctAnswer: 0,
        explanation: 'role="alert" signals high-priority live error updates to assistive tech.'
      }
    ]
  },

  // =========================================================================
  // MODULE 5: REACT APPLICATION ARCHITECTURE AND ROUTING
  // =========================================================================
  {
    moduleId: 'mod_wdi_5',
    courseId: 'web-development-intermediate',
    sequence: 5,
    sequenceLabel: 'Module 5',
    title: 'React Application Architecture and Routing',
    description:
      'Structure multi-view React applications cleanly with clear folder separation, custom hooks, URL/view routing, shared state lifting, and predictable data flow.',
    learningObjectiveIds: ['WDI-ARCH-05'],
    lessons: [
      {
        lessonId: 'lesson_wdi_5_1',
        moduleId: 'mod_wdi_5',
        courseId: 'web-development-intermediate',
        title: 'Scalable Folder Structure & Separation of Concerns',
        sequence: 1,
        sequenceLabel: 'Lesson 5.1',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDI-ARCH-05'],
        learningObjectives: [
          'Organize React applications cleanly into components, views/pages, services, hooks, data, and types.',
          'Keep database/API fetch code out of JSX presentation components.',
          'Lift shared state to the lowest common parent cleanly without prop chaos.'
        ],
        introduction:
          'When all logic, Firestore calls, and JSX sit inside App.tsx, adding one feature risks breaking three others. Clean architecture separates UI from data services and types.',
        lessonContent: [
          'Layered Architecture: (1) src/types/ holds pure TypeScript interfaces. (2) src/services/ handles API calls and persistence. (3) src/hooks/ packages reusable React stateful logic. (4) src/components/ holds reusable UI cards/forms. (5) src/views/ (or pages/) composes complete screens.',
          'Lifting State Up Cleanly: When both a Navbar cart badge and a Checkout page need cart items, lift the cart state into their shared parent (or React Context) so there is only ONE source of truth—never two disconnected copies.',
          'Thin Views, Clear Responsibilities: UI components should call semantic service helpers like await createInvoice(payload) rather than embedding raw fetch headers inside button handlers.'
        ],
        stepByStepInstructions: [
          'Inspect your project folders and move interfaces to src/types/ and persistence calls to src/services/.',
          'Refactor one big view into focused subcomponents.',
          'Lift shared cart or user state to the common parent container.'
        ],
        nigerianContextExamples: [
          'Team & AI Scalability: Clean folders let you ask an AI tool to update just src/services/orders.ts without accidentally rewriting your navigation bar.',
          'Single Source of Truth: Lifted state stops invoice totals in the header from showing a different number than the checkout panel.'
        ],
        toolsAndResources: ['React Docs: Sharing State Between Components', 'Bulletproof React Architecture Guide'],
        practicalDemonstration:
          'src/\n  types/       -> Customer, Order, ApiResult\n  services/    -> orderService.ts, authService.ts\n  hooks/       -> useLocalDraft.ts\n  components/  -> OrderCard.tsx, StatusBadge.tsx\n  views/       -> DashboardView.tsx, OrdersView.tsx',
        codeExamples: [
          {
            title: 'Lifting Shared State Cleanly Between Sibling Components',
            language: 'tsx',
            code: `import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
}

export function ShopWorkspace({ products }: { products: Product[] }) {
  const [cart, setCart] = useState<Product[]>([]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <h2 className="font-bold mb-2">Catalog</h2>
        {products.map((p) => (
          <button
            key={p.id}
            onClick={() => setCart((prev) => [...prev, p])}
            className="block w-full text-left border rounded-lg p-3 mb-2"
          >
            + Add {p.name} (NGN {p.price})
          </button>
        ))}
      </div>
      <div className="rounded-xl border bg-slate-50 p-4">
        <h2 className="font-bold">Cart Summary ({cart.length} items)</h2>
        <p className="mt-2 font-semibold">
          Total: NGN {cart.reduce((s, item) => s + item.price, 0).toLocaleString()}
        </p>
      </div>
    </div>
  );
}`,
            explanation: [
              'Parent ShopWorkspace owns cart state so Catalog and Cart Summary stay automatically synchronized.',
              'Zero duplicated cart arrays across children.'
            ],
            expectedOutput: 'Clicking any catalog item immediately updates Cart Summary count and Naira total.'
          }
        ],
        commonErrors: [
          {
            error: 'Two parts of the screen show out-of-sync counts after adding an item',
            cause: 'Duplicated the same array inside two separate useState calls in child components.',
            fix: 'Remove the duplicate child state and lift a single state source up to the shared parent.'
          }
        ],
        handsOnExercise: {
          title: 'Reorganize Your App Into Layered Modules',
          task: 'Split your React project cleanly into src/types, src/services, src/components, and src/views.',
          steps: [
            'Extract API/storage persistence into src/services.',
            'Confirm components stay focused on rendering props and invoking callbacks.'
          ],
          deliverable: 'Modular multi-folder React codebase.'
        },
        keyTakeaways: [
          'Separate types, services, reusable UI components, and page views cleanly.',
          'Maintain one single source of truth by lifting shared state to the lowest common ancestor.',
          'Keep raw network/database mechanics inside src/services, not inside JSX.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_5_1_1',
            questionText: 'Where should Firestore or REST API calls live in a well-structured React application?',
            options: [
              'Inside dedicated service modules (src/services/) imported by views/hooks',
              'Inside index.html',
              'Inside Tailwind CSS config',
              'Duplicated inside every button click handler'
            ],
            correctAnswer: 0,
            explanation: 'Isolating API logic inside service modules makes components cleaner and far easier to maintain.'
          },
          {
            id: 'kc_wdi_5_1_2',
            questionText: 'How do two sibling components stay synchronized when one adds an item the other displays?',
            options: [
              'Lift the shared state into their common parent component (or Context) and pass props down',
              'Reload window.location on every click',
              'Copy the array into two disconnected useState hooks',
              'Store data inside CSS variables'
            ],
            correctAnswer: 0,
            explanation: 'Lifting state establishes one single source of truth.'
          },
          {
            id: 'kc_wdi_5_1_3',
            questionText: 'What is the main benefit of keeping components small and focused?',
            options: [
              'They are easier to read, test, debug, and safely update with AI assistance',
              'They bypass TypeScript checks',
              'They remove the need for HTML',
              'They prevent HTTPS usage'
            ],
            correctAnswer: 0,
            explanation: 'Focused components shrink cognitive load and reduce accidental regressions.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_5_2',
        moduleId: 'mod_wdi_5',
        courseId: 'web-development-intermediate',
        title: 'Multi-Page Navigation, Routing & URL State',
        sequence: 2,
        sequenceLabel: 'Lesson 5.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-ARCH-05'],
        learningObjectives: [
          'Implement multi-view navigation cleanly using React Router or URL-synced state.',
          'Handle route parameters (e.g., /orders/:orderId) and 404 fallback views.',
          'Scroll to top and highlight active navigation links clearly for users.'
        ],
        introduction:
          'Users expect Back/Forward browser buttons, shareable URLs, and clear active nav highlights—even inside a Single Page Application (SPA).',
        lessonContent: [
          'Client-Side Routing in SPAs: Traditional websites ask the server for a fresh HTML document on every link click. React SPAs swap views instantly in memory while updating browser history via React Router (<BrowserRouter>, <Routes>, <Route>) or window.history / hash URLs.',
          'Dynamic Routes & 404 Protection: Using paths like /products/:id lets one ProductDetailView display any product dynamically. Always configure a fallback route (path="*") showing a friendly "Page Not Found" view with a button back to Home.',
          'SPA Server Fallback Note: When deploying an SPA using BrowserRouter paths (like /dashboard) to static hosts, configure rewrite rules to serve index.html so direct page refreshes do not return a 404.'
        ],
        stepByStepInstructions: [
          'Set up multi-page views: Dashboard, Orders, Customers, and Settings.',
          'Highlight the active tab clearly with accessible aria-current="page".',
          'Add a clean fallback route or safe default view if an unknown route/ID is visited.'
        ],
        nigerianContextExamples: [
          'Instant Screen Switching on Weak Networks: Client-side routing avoids re-downloading headers and scripts on every page click, saving users mobile data and waiting time.',
          'Deep-Linking Shareable Screens: Sending a colleague /orders/ORD-42 opens the exact order immediately.'
        ],
        toolsAndResources: ['React Router Documentation', 'MDN History API'],
        practicalDemonstration:
          '<Routes>\n  <Route path="/" element={<DashboardView />} />\n  <Route path="/orders/:orderId" element={<OrderDetailView />} />\n  <Route path="*" element={<NotFoundView />} />\n</Routes>',
        codeExamples: [
          {
            title: 'Type-Safe Tab/Route Switcher with Fallback View',
            language: 'tsx',
            code: `import React, { useState } from 'react';

type AppRoute = 'overview' | 'orders' | 'customers';

export function AppShell() {
  const [route, setRoute] = useState<AppRoute>('overview');

  const navItems: Array<{ id: AppRoute; label: string }> = [
    { id: 'overview', label: 'Overview' },
    { id: 'orders', label: 'Orders' },
    { id: 'customers', label: 'Customers' }
  ];

  return (
    <div className="space-y-4">
      <nav aria-label="Workspace tabs" className="flex gap-2 border-b pb-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setRoute(item.id)}
            aria-current={route === item.id ? 'page' : undefined}
            className={\`px-3 py-1.5 rounded-lg text-sm font-semibold \${
              route === item.id ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-slate-100'
            }\`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      {route === 'overview' && <p>Overview Metrics Screen</p>}
      {route === 'orders' && <p>Customer Orders Screen</p>}
      {route === 'customers' && <p>Customer Directory Screen</p>}
    </div>
  );
}`,
            explanation: [
              'AppRoute union guarantees only valid routes can be passed to setRoute.',
              'aria-current="page" marks the active view clearly for screen readers.'
            ],
            expectedOutput: 'Instant zero-reload navigation across Overview, Orders, and Customers views.'
          }
        ],
        commonErrors: [
          {
            error: 'Refreshing /orders/123 on a live static host returns 404 Not Found',
            cause: 'The static server looked for a physical file /orders/123/index.html rather than rewriting SPA paths back to root index.html.',
            fix: 'Configure host SPA rewrites (/* -> /index.html 200) or use hash/search-param routing.'
          }
        ],
        handsOnExercise: {
          title: 'Wire Multi-View Navigation into Your React Business App',
          task: 'Add at least 3 distinct views (Overview, Records, Add/Edit Form) with clear active navigation and fallback handling.',
          steps: [
            'Build clean active nav styling with aria-current="page".',
            'Ensure clicking invalid IDs displays a helpful "Record not found" state with a Return button.'
          ],
          deliverable: 'Working multi-view React shell.'
        },
        keyTakeaways: [
          'Client-side routing switches views instantly without full page reloads.',
          'Always provide a fallback 404/not-found state for unknown routes or missing IDs.',
          'Configure server SPA rewrites when deploying BrowserRouter apps.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_5_2_1',
            questionText: 'Why do React SPAs feel faster than traditional server-reloaded pages when clicking nav tabs?',
            options: [
              'JavaScript swaps views in memory without re-downloading the entire HTML/CSS/JS bundle',
              'SPAs disable HTTPS',
              'Browsers cache passwords globally',
              'SPAs use zero JavaScript'
            ],
            correctAnswer: 0,
            explanation: 'Only updated component UI and needed JSON data change between views.'
          },
          {
            id: 'kc_wdi_5_2_2',
            questionText: 'What happens if a BrowserRouter SPA deployed on static hosting lacks a fallback rewrite to index.html?',
            options: [
              'Refreshing nested URLs like /orders/42 triggers a 404 Not Found from the static server',
              'CSS animations run backward',
              'React automatically generates static HTML files',
              'Firebase shuts down'
            ],
            correctAnswer: 0,
            explanation: 'Static servers look for literal folder paths unless instructed to rewrite all SPA paths to index.html.'
          },
          {
            id: 'kc_wdi_5_2_3',
            questionText: 'Which ARIA attribute marks the currently active link or nav button cleanly?',
            options: ['aria-current="page"', 'aria-active="1"', 'aria-hidden="false"', 'alt="active"'],
            correctAnswer: 0,
            explanation: 'aria-current="page" communicates active navigation state cleanly.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_5_3',
        moduleId: 'mod_wdi_5',
        courseId: 'web-development-intermediate',
        title: 'Custom Hooks & Global Context Without Over-Engineering',
        sequence: 3,
        sequenceLabel: 'Lesson 5.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-ARCH-05'],
        learningObjectives: [
          'Extract reusable stateful behavior into custom hooks (useDebounce, useLocalStorage).',
          'Understand when React Context fits (auth user, theme) vs. simple props.',
          'Avoid Context over-rendering traps across fast-changing lists.'
        ],
        introduction:
          'Custom hooks let multiple React components share stateful patterns cleanly—like reading localStorage or debouncing a search bar—without copy-pasting useEffect code everywhere.',
        lessonContent: [
          'Writing Custom Hooks (use...): Any function starting with "use" can call useState and useEffect internally and return clean values to components. Example: const [search, setSearch] = useLocalStorage("last_search", "");.',
          'React Context for Truly Global App State: Use Context sparingly for cross-cutting concerns needed everywhere—such as authenticated user profile or global notifications—rather than cramming every local modal toggle into a giant global store.',
          'Debouncing Search Queries: A small useDebounce(value, 300) custom hook waits 300ms after the user stops typing before triggering heavy filters or API requests, saving bandwidth and CPU on budget Android phones.'
        ],
        stepByStepInstructions: [
          'Create src/hooks/useLocalStorageState.ts persisting state safely in try/catch.',
          'Create src/hooks/useDebounce.ts for search inputs.',
          'Use both hooks inside your business catalog search view.'
        ],
        nigerianContextExamples: [
          'Bandwidth-Saving Search: Debouncing a search bar with useDebounce(term, 350) stops firing 10 redundant Firestore/API queries when a user types "Generator".',
          'Offline Draft Recovery: A custom useDraft hook saves half-typed form entries locally so a sudden mobile signal drop never erases work.'
        ],
        toolsAndResources: ['React Docs: Reusing Logic with Custom Hooks', 'React Docs: Passing Data Deeply with Context'],
        practicalDemonstration:
          'function useDebounce<T>(value: T, delayMs = 300): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const id = setTimeout(() => setDebounced(value), delayMs);\n    return () => clearTimeout(id);\n  }, [value, delayMs]);\n  return debounced;\n}',
        codeExamples: [
          {
            title: 'Reusable Typed useLocalStorage Custom Hook',
            language: 'tsx',
            code: `import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? (JSON.parse(stored) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota/private-mode storage errors cleanly
    }
  }, [key, value]);

  return [value, setValue] as const;
}`,
            explanation: [
              'Lazy initializer () => ... parses localStorage only once on mount rather than on every re-render.',
              'Returns a strongly typed tuple via as const.'
            ],
            expectedOutput: 'Persists component state safely across refreshes without throwing on private browsing.'
          }
        ],
        commonErrors: [
          {
            error: 'React Hook called conditionally inside an if statement',
            cause: 'Violated Rules of Hooks by putting useState/useEffect inside an if block or loop.',
            fix: 'Always invoke hooks unconditionally at the very top level of React components or custom hooks.'
          }
        ],
        handsOnExercise: {
          title: 'Build & Use Two Custom Hooks (useLocalStorage & useDebounce)',
          task: 'Implement both hooks in src/hooks/ and wire them into your searchable product/task view.',
          steps: [
            'Verify useDebounce cleans up timeouts via return () => clearTimeout(timer).',
            'Test search filtering and local persistence across page reloads.'
          ],
          deliverable: 'Custom hooks verified inside your app.'
        },
        keyTakeaways: [
          'Custom hooks must begin with "use" and obey Rules of Hooks (top-level only, never inside conditionals).',
          'Lazy state initializers useState(() => ...) avoid expensive repeated JSON.parse calls.',
          'Reserve React Context for genuinely app-wide state like authenticated user session.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_5_3_1',
            questionText: 'What naming convention MUST every React custom hook follow?',
            options: [
              'Start with "use" (e.g. useDebounce)',
              'Start with "make"',
              'End with ".hook"',
              'All uppercase'
            ],
            correctAnswer: 0,
            explanation: 'React’s linter and Rules of Hooks identify hooks by the "use" prefix.'
          },
          {
            id: 'kc_wdi_5_3_2',
            questionText: 'Why return () => clearTimeout(timer) from a useDebounce effect?',
            options: [
              'To cancel the pending timer if the user types again before the delay finishes',
              'To delete React state',
              'To force immediate page reload',
              'To pause CSS transitions'
            ],
            correctAnswer: 0,
            explanation: 'Cleanup cancels stale timers so only the final pause triggers an update.'
          },
          {
            id: 'kc_wdi_5_3_3',
            questionText: 'Where are React hooks allowed to be called?',
            options: [
              'Top level of React functional components or custom hooks only (never inside loops or conditions)',
              'Inside any plain JavaScript helper function',
              'Inside if (loggedIn) blocks',
              'Inside CSS stylesheets'
            ],
            correctAnswer: 0,
            explanation: 'Hooks rely on identical call order across every render.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 5 Assignment: Multi-View Business App Architecture',
      description: 'Refactor your React application into clean layered folders (types, services, hooks, components, views) with multi-view navigation and a reusable custom hook.',
      deliverables: [
        'At least 3 routed/switched views with aria-current active state',
        'Custom useLocalStorage or useDebounce hook actively powering a screen'
      ],
      evaluationCriteria: [
        'Clean folder separation with zero Rules-of-Hooks violations',
        'Single source of truth for shared state'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_5_1',
        questionText: 'What solves two sibling components needing to read and update the same shopping cart?',
        options: [
          'Lifting state up to their common parent component',
          'Saving duplicates in window.cart1 and window.cart2',
          'Reloading the page on every click',
          'Using CSS Grid'
        ],
        correctAnswer: 0,
        explanation: 'Lifting state keeps one synchronized source of truth.'
      },
      {
        id: 'mc_wdi_5_2',
        questionText: 'Which rule applies to ALL React hooks?',
        options: [
          'Always call hooks at the top level—never inside conditionals or loops',
          'Hooks can run inside catch blocks',
          'Hooks must return JSX',
          'Hooks work only in class components'
        ],
        correctAnswer: 0,
        explanation: 'Consistent top-level execution preserves hook call order between renders.'
      },
      {
        id: 'mc_wdi_5_3',
        questionText: 'What does a debounced search hook save for users on Nigerian mobile data?',
        options: [
          'Unnecessary API/Firestore reads on every intermediate keystroke',
          'Screen brightness',
          'HTML file size',
          'CSS selector specificity'
        ],
        correctAnswer: 0,
        explanation: 'Debouncing waits until typing pauses before sending network queries.'
      },
      {
        id: 'mc_wdi_5_4',
        questionText: 'When does React Context fit best?',
        options: [
          'App-wide concerns like current authenticated user or theme—not every tiny local input',
          'Single-button hover state',
          'Replacing CSS entirely',
          'Every individual table cell'
        ],
        correctAnswer: 0,
        explanation: 'Overusing Context for local state complicates components and causes needless re-renders.'
      },
      {
        id: 'mc_wdi_5_5',
        questionText: 'What happens if an SPA route /dashboard is refreshed on a static server with no SPA rewrite?',
        options: [
          'The server returns 404 unless configured to serve index.html for unknown paths',
          'Vite rewrites CSS automatically',
          'TypeScript catches the 404 at build time',
          'localStorage logs the user out'
        ],
        correctAnswer: 0,
        explanation: 'Static servers require fallback routing to index.html for client-side paths.'
      }
    ]
  }
];
