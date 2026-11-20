import { AcademyCourse } from '../../../types';
import { WEB_DEV_INTERMEDIATE_MODULES_1_TO_5 } from './webDevIntermediateModules1to5';
import { WEB_DEV_INTERMEDIATE_MODULES_6_TO_9 } from './webDevIntermediateModules6to9';

export const COURSE_WEB_DEV_INTERMEDIATE: AcademyCourse = {
  courseId: 'web-development-intermediate',
  categoryId: 'web_development_academy',
  title: 'Intermediate – Modern Web Development with AI',
  subtitle: 'ES6+, React, TypeScript, Tailwind CSS, Firebase Full-Stack & Disciplined AI Engineering',
  description:
    'Build modern, production-grade web applications with React, TypeScript, Tailwind CSS, REST APIs, and Firebase—while mastering AI-assisted specification, component generation, Firestore modeling, debugging, refactoring, testing, and security verification without blind copy-pasting.',
  difficulty: 'Intermediate',
  level: 'intermediate',
  prerequisites: [
    'Beginner Web Development fundamentals (HTML5, CSS3, responsive design, JavaScript & Git) or successful Web Dev Placement check'
  ],
  targetAudience:
    'Corps members and aspiring software developers ready to build full-stack React + TypeScript + Firebase business applications using modern engineering practices and AI tools responsibly.',
  entryRequirements:
    'Working familiarity with HTML5, CSS3, basic JavaScript, and Git—or completion of Beginner Web Development Fundamentals.',
  requirements: [
    'Node.js LTS (v20+) and npm installed locally',
    'VS Code with TypeScript and Tailwind CSS extensions',
    'Free GitHub and Firebase accounts for deployment'
  ],
  expectedDuration: '8–10 Weeks (Self-Paced)',
  active: true,
  version: '1.0.0',
  themeColor: 'blue',
  iconName: 'Cpu',
  learningObjectives: [
    {
      id: 'WDI-ES6-01',
      code: 'WDI-ES6-01',
      title: 'Modern ES6+ & Async Data Patterns',
      description: 'Apply immutability, destructuring, array transforms, Promises, async/await, and modular ES exports.'
    },
    {
      id: 'WDI-RCT-02',
      code: 'WDI-RCT-02',
      title: 'Composable React Applications',
      description: 'Build declarative components, controlled forms, stable-key lists, and side-effect hooks cleanly.'
    },
    {
      id: 'WDI-TS-03',
      code: 'WDI-TS-03',
      title: 'Strict TypeScript Modeling',
      description: 'Type interfaces, literal unions, React events, generics, and unknown errors without `any`.'
    },
    {
      id: 'WDI-UI-04',
      code: 'WDI-UI-04',
      title: 'Tailwind CSS & Accessible UI Engineering',
      description: 'Craft mobile-first responsive interfaces with clean loading, empty, error, and double-submit protections.'
    },
    {
      id: 'WDI-ARCH-05',
      code: 'WDI-ARCH-05',
      title: 'Application Architecture & Custom Hooks',
      description: 'Separate UI, services, types, and custom hooks cleanly across multi-view SPAs.'
    },
    {
      id: 'WDI-API-06',
      code: 'WDI-API-06',
      title: 'REST APIs & Secure Backend Proxies',
      description: 'Build Express JSON endpoints, cancel stale fetches with AbortController, and isolate server secrets.'
    },
    {
      id: 'WDI-FB-07',
      code: 'WDI-FB-07',
      title: 'Firebase Auth, Firestore & Security Rules',
      description: 'Implement owner-scoped CRUD, auth session persistence, bounded queries, and strict firestore.rules.'
    },
    {
      id: 'WDI-AI-08',
      code: 'WDI-AI-08',
      title: 'AI-Assisted Specification, Coding & Debugging',
      description: 'Use AI to convert business specs into code while strictly auditing imports, types, security, and PII safety.'
    },
    {
      id: 'WDI-TEST-09',
      code: 'WDI-TEST-09',
      title: 'Testing, Security Audits & Live Launch',
      description: 'Write automated unit tests, perform adversarial security/performance audits, and deploy live.'
    }
  ],
  modules: [...WEB_DEV_INTERMEDIATE_MODULES_1_TO_5, ...WEB_DEV_INTERMEDIATE_MODULES_6_TO_9],
  practicalProjects: [
    {
      id: 'proj_wdi_1',
      title: 'Responsive Business Website',
      summary: 'Multi-section React + Tailwind landing page with accessible contact validation and zero mobile overflow.',
      deliverables: ['Responsive Hero, Services Grid & Validated Enquiry Form']
    },
    {
      id: 'proj_wdi_2',
      title: 'React Task Management Application',
      summary: 'Strictly typed Task Manager with add/toggle/filter/delete and persistent localStorage sync.',
      deliverables: ['TaskList, TaskForm, custom hook, zero console key warnings']
    },
    {
      id: 'proj_wdi_3',
      title: 'User Registration and Login Application',
      summary: 'Firebase Authentication signup, login, session persistence guard, and safe error mapping.',
      deliverables: ['Auth session listener with cleanup & friendly non-leaking error UX']
    },
    {
      id: 'proj_wdi_4',
      title: 'Business Dashboard with Firebase',
      summary: 'KPI summary cards, limited Firestore queries, undefined-safe writes, and owner-scoped rules.',
      deliverables: ['Firestore CRUD service + audited firestore.rules']
    },
    {
      id: 'proj_wdi_5',
      title: 'Complete Business Management Application',
      summary: 'Integrated full-stack React + TypeScript + Vite + Firebase application uniting auth, CRUD, testing, and AI-reviewed docs.',
      deliverables: ['Live deployed full-stack app + test suite + AI audit documentation']
    }
  ],
  starterProjectTemplates: [
    {
      id: 'tpl_wdi_business',
      title: 'React + TypeScript + Vite Business App Starter Kit',
      description:
        'Clean modular starter kit demonstrating strict TypeScript interfaces, safe async state handling, and Firebase-ready service structure.',
      setupCommand: 'npm create vite@latest my-business-app -- --template react-ts && npm install firebase lucide-react',
      files: [
        {
          path: 'src/types/business.ts',
          content: `export type OrderStatus = 'pending' | 'deposit_paid' | 'completed';

export interface BusinessOrder {
  id: string;
  ownerId: string;
  customerName: string;
  serviceTitle: string;
  amountNgn: number;
  status: OrderStatus;
  createdAt: string;
}`
        },
        {
          path: 'src/services/orderService.ts',
          content: `import { BusinessOrder } from '../types/business';

export function calculateOrdersRevenue(orders: BusinessOrder[]): number {
  return orders.reduce((sum, item) => sum + item.amountNgn, 0);
}

export function stripUndefinedFields<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined)
  ) as Partial<T>;
}`
        },
        {
          path: 'src/components/OrderSummaryCard.tsx',
          content: `import React from 'react';
import { BusinessOrder } from '../types/business';

export const OrderSummaryCard: React.FC<{ order: BusinessOrder }> = ({ order }) => (
  <article className="rounded-xl border border-slate-200 bg-white p-4">
    <div className="flex items-center justify-between gap-2">
      <h3 className="font-semibold text-slate-900">{order.serviceTitle}</h3>
      <span className="text-xs font-bold uppercase text-emerald-700">{order.status}</span>
    </div>
    <p className="mt-1 text-sm text-slate-600">
      {order.customerName} · NGN {order.amountNgn.toLocaleString()}
    </p>
  </article>
);`
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Build a Business Web Application (React, TypeScript, Vite & Firebase)',
    overview:
      'Architect, build, audit, test, and deploy a functional full-stack Business Web Application using React, TypeScript, Vite, Tailwind CSS, and Firebase—backed by disciplined AI-assisted documentation.',
    deliverables: [
      'Clean responsive Business Website & Dashboard interface (360px+ tested)',
      'Working Firebase Authentication (Sign up, Login, Session guard, Logout)',
      'Cloud Firestore CRUD operations with undefined stripping & bounded queries',
      'Audited least-privilege firestore.rules (owner-scoped, zero `if true`)',
      'Strict TypeScript models across UI & services (zero `any` or `@ts-ignore`)',
      'Automated unit tests covering core business calculations & validation',
      'AI-Assisted Development Documentation (Technical Spec + Human Code Audit Notes)',
      'Public GitHub Repository URL (with .env.example & README.md)',
      'Live Deployed HTTPS Application URL'
    ],
    instructions: [
      'Start by writing a technical specification in the AI Development Lab (interfaces, components, Firestore schema, security checklist).',
      'Implement layered src/types, src/services, src/hooks, src/components, and src/views modules.',
      'Wire Firebase Auth and owner-scoped Firestore reads/writes cleanly.',
      'Run unit tests, production build (`npm run build`), deploy live, and verify Firebase Auth Authorized Domains.'
    ],
    assessmentCriteria: [
      'Clean React + TypeScript architecture with zero `any` shortcuts',
      'Working Firebase Authentication and owner-scoped Firestore persistence',
      'Responsive Tailwind UI handling loading, empty, error, and double-submit states',
      'Automated tests, security/AI audit log, GitHub repository, and live HTTPS link'
    ],
    rubric: [
      {
        id: 'rub_wdi_1',
        criterion: 'React + TypeScript + Tailwind Architecture',
        description: 'Modular components, strict interfaces/unions, custom hooks, and responsive 360px+ UI.',
        weight: 25
      },
      {
        id: 'rub_wdi_2',
        criterion: 'Firebase Auth, Firestore CRUD & Security Rules',
        description: 'Working login/persistence, bounded queries, undefined stripping, and least-privilege rules.',
        weight: 30
      },
      {
        id: 'rub_wdi_3',
        criterion: 'AI Engineering Verification & Testing',
        description: 'Technical spec, audited AI code/debug log, and passing automated edge-case unit tests.',
        weight: 25
      },
      {
        id: 'rub_wdi_4',
        criterion: 'Live Deployment & Documentation',
        description: 'Clean GitHub repo (.env.example + README) and working live deployed HTTPS app.',
        weight: 20
      }
    ],
    submissionGuidelines:
      'Submit your Capstone with your public GitHub Repository URL, Live Deployed App URL, project overview, and verification summary of your AI-assisted audit & tests.'
  },
  finalAssessment: [
    {
      id: 'fa_wdi_1',
      moduleId: 'mod_wdi_1',
      questionText: 'Which update pattern creates a new array cleanly in React state without mutating the original?',
      options: ['items.push(x)', '[...items, x]', 'items[0] = x', 'items.splice(0, 1)'],
      correctAnswer: 1,
      explanation: 'Spread creates a new array reference so React detects the state change.'
    },
    {
      id: 'fa_wdi_2',
      moduleId: 'mod_wdi_1',
      questionText: 'What must you check explicitly on a fetch() response because HTTP 404/500 statuses do not reject Promises automatically?',
      options: ['if (!response.ok)', 'if (response.type)', 'if (response.length)', 'if (window.fetch)'],
      correctAnswer: 0,
      explanation: 'Checking !response.ok catches server HTTP errors cleanly.'
    },
    {
      id: 'fa_wdi_3',
      moduleId: 'mod_wdi_2',
      questionText: 'Why does `{tasks.length && <TaskList />}` cause a subtle visual bug when tasks is empty?',
      options: [
        'React renders the numeric value 0 directly on screen',
        'tasks.length throws a syntax error',
        'CSS hides the whole page',
        'useState resets'
      ],
      correctAnswer: 0,
      explanation: 'Convert length checks into true booleans: {tasks.length > 0 && <TaskList />}.'
    },
    {
      id: 'fa_wdi_4',
      moduleId: 'mod_wdi_2',
      questionText: 'What is the best key prop value inside `records.map((rec, idx) => <Row key={...} />)`?',
      options: ['rec.id (stable unique record ID)', 'idx (array index)', 'Math.random()', 'rec.title'],
      correctAnswer: 0,
      explanation: 'Stable unique IDs preserve component identity across additions, sorting, and deletions.'
    },
    {
      id: 'fa_wdi_5',
      moduleId: 'mod_wdi_2',
      questionText: 'What triggers an infinite re-render loop inside useEffect?',
      options: [
        'Calling setState unconditionally inside useEffect with no dependency array',
        'Passing [] as the dependency array',
        'Returning a cleanup function',
        'Using async/await inside an event handler'
      ],
      correctAnswer: 0,
      explanation: 'Omitting the dependency array causes the effect to run after every render.'
    },
    {
      id: 'fa_wdi_6',
      moduleId: 'mod_wdi_3',
      questionText: 'Why must empty React array state be typed explicitly as `useState<Order[]>([])` in TypeScript?',
      options: [
        'Without `<Order[]>`, TypeScript infers `never[]` and blocks adding Order items',
        'Arrays do not exist in ES6',
        'Vite removes untyped arrays',
        'Tailwind requires type brackets'
      ],
      correctAnswer: 0,
      explanation: 'Explicit generic typing tells TypeScript what items the array will hold.'
    },
    {
      id: 'fa_wdi_7',
      moduleId: 'mod_wdi_3',
      questionText: 'How should you inspect `err` safely inside `catch (err: unknown)`?',
      options: [
        'Check `if (err instanceof Error)` before reading `err.message`',
        'Cast immediately with `(err as any).data.code`',
        'Ignore the error completely',
        'Pass err to CSS'
      ],
      correctAnswer: 0,
      explanation: 'Runtime type narrowing prevents crashes when thrown values are not Error objects.'
    },
    {
      id: 'fa_wdi_8',
      moduleId: 'mod_wdi_4',
      questionText: 'Why avoid dynamic Tailwind class templates like `text-${color}-600`?',
      options: [
        'Tailwind purges/misses dynamically concatenated partial class names during production builds',
        'Template literals fail in JSX',
        'Browsers block hyphenated colors',
        'Vite forbids strings in TSX'
      ],
      correctAnswer: 0,
      explanation: 'Always map complete literal class names so Tailwind’s static scanner includes them.'
    },
    {
      id: 'fa_wdi_9',
      moduleId: 'mod_wdi_4',
      questionText: 'Where should `setIsSubmitting(false)` live inside an async form submit handler?',
      options: ['Inside `finally { ... }`', 'Before `await`', 'Inside `index.html`', 'Inside CSS'],
      correctAnswer: 0,
      explanation: 'finally ensures buttons re-enable whether submission succeeds or throws.'
    },
    {
      id: 'fa_wdi_10',
      moduleId: 'mod_wdi_5',
      questionText: 'How should two sibling components share and stay synced on the exact same cart list?',
      options: [
        'Lift the cart state into their common parent component and pass props down',
        'Create two separate useState hooks and hope they match',
        'Reload the page on every click',
        'Store the cart inside CSS'
      ],
      correctAnswer: 0,
      explanation: 'Lifting state enforces a single source of truth.'
    },
    {
      id: 'fa_wdi_11',
      moduleId: 'mod_wdi_5',
      questionText: 'What naming & placement rule applies to every React custom hook?',
      options: [
        'Must start with `use` and be called unconditionally at top level (never inside if/loops)',
        'Must start with `create` and return JSX',
        'Can only live in index.html',
        'Must run inside setTimeout'
      ],
      correctAnswer: 0,
      explanation: 'Rules of Hooks require consistent top-level call order on every render.'
    },
    {
      id: 'fa_wdi_12',
      moduleId: 'mod_wdi_6',
      questionText: 'Why must secret API keys NEVER live in `VITE_` client environment variables?',
      options: [
        'Vite bundles `VITE_` variables directly into public client JS readable by any visitor in DevTools',
        'Vite deletes `VITE_` strings',
        'Express cannot read `VITE_`',
        'HTTPS rejects `VITE_` prefixes'
      ],
      correctAnswer: 0,
      explanation: 'Keep secrets strictly on the server behind `/api/*` endpoints.'
    },
    {
      id: 'fa_wdi_13',
      moduleId: 'mod_wdi_6',
      questionText: 'What prevents an older slow fetch() request from overwriting newer filter results in React?',
      options: [
        'Passing an `AbortController` signal and calling `controller.abort()` in the useEffect cleanup',
        'Removing dependency arrays',
        'Using `var` instead of `const`',
        'Adding `z-index: 99`'
      ],
      correctAnswer: 0,
      explanation: 'AbortController cleanup cancels stale in-flight fetches reliably.'
    },
    {
      id: 'fa_wdi_14',
      moduleId: 'mod_wdi_7',
      questionText: 'What must be removed from objects before writing them to Firestore via `setDoc()`?',
      options: ['Fields whose values are `undefined`', 'Boolean values', 'Strings', 'Numeric totals'],
      correctAnswer: 0,
      explanation: 'Firestore rejects explicit `undefined` property values.'
    },
    {
      id: 'fa_wdi_15',
      moduleId: 'mod_wdi_7',
      questionText: 'Why does `getDocs(collection(db, "orders"))` fail under owner-scoped rules unless `.where("ownerId", "==", uid)` is included?',
      options: [
        'Firestore security rules verify that the query itself requests only permitted documents rather than filtering rows out',
        'getDocs does not support arrays',
        'Firebase Auth deletes uid on list calls',
        'limit(50) is illegal with where()'
      ],
      correctAnswer: 0,
      explanation: 'Client queries must explicitly satisfy security rule conditions.'
    },
    {
      id: 'fa_wdi_16',
      moduleId: 'mod_wdi_7',
      questionText: 'Why keep an `authLoading` guard while listening to `onAuthStateChanged`?',
      options: [
        'To wait until Firebase restores any existing login session before flashing Login redirects',
        'To delete localStorage on every refresh',
        'To disable CSS',
        'To bypass Firestore rules'
      ],
      correctAnswer: 0,
      explanation: 'Auth initialization resolves asynchronously after initial render.'
    },
    {
      id: 'fa_wdi_17',
      moduleId: 'mod_wdi_8',
      questionText: 'Which data should NEVER be pasted into external public AI coding prompts?',
      options: [
        'Real passwords, private API keys, service accounts, or production customer PII',
        'Generic TypeScript interface stubs',
        'Tailwind layout questions',
        'Sanitized fake sample JSON'
      ],
      correctAnswer: 0,
      explanation: 'Never expose credentials or private user data in third-party prompts.'
    },
    {
      id: 'fa_wdi_18',
      moduleId: 'mod_wdi_8',
      questionText: 'Which AI-suggested fix should an intermediate engineer REJECT during code inspection?',
      options: [
        'Silencing errors with `as any` / `@ts-ignore` or changing Firestore rules to `allow read, write: if true;`',
        'Checking `!res.ok` before parsing JSON',
        'Adding `htmlFor` to accessible form labels',
        'Using `limit(50)` on queries'
      ],
      correctAnswer: 0,
      explanation: 'Unsafe type escapes and wide-open database rules introduce serious production bugs.'
    },
    {
      id: 'fa_wdi_19',
      moduleId: 'mod_wdi_9',
      questionText: 'Why must human engineers verify assertions in AI-generated unit tests?',
      options: [
        'AI might assert expected numbers copied from a buggy function instead of true business specs',
        'Vitest skips AI files automatically',
        'Tests cannot check numbers',
        'TypeScript removes assertions'
      ],
      correctAnswer: 0,
      explanation: 'Independent expectation verification catches flawed formulas immediately.'
    },
    {
      id: 'fa_wdi_20',
      moduleId: 'mod_wdi_9',
      questionText: 'What must be updated in Firebase Console before Auth login works on a newly deployed live domain?',
      options: [
        'Add the live production domain under Authentication -> Settings -> Authorized Domains',
        'Change package.json name to firebase',
        'Disable HTTPS on the domain',
        'Upload .env to GitHub'
      ],
      correctAnswer: 0,
      explanation: 'Unlisted live domains are blocked by Firebase Auth origin protection.'
    }
  ],
  completionCriteria: {
    requiredLessonsRatio: 1.0,
    requiredModuleChecksCount: 9,
    requiredFinalAssessmentPassScore: 70,
    requireCapstoneSubmission: true,
    requireCapstoneApproval: false
  }
};
