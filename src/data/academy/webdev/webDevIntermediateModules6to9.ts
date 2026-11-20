import { CourseModule } from '../../../types';

export const WEB_DEV_INTERMEDIATE_MODULES_6_TO_9: CourseModule[] = [
  // =========================================================================
  // MODULE 6: APIS AND BACKEND INTEGRATION
  // =========================================================================
  {
    moduleId: 'mod_wdi_6',
    courseId: 'web-development-intermediate',
    sequence: 6,
    sequenceLabel: 'Module 6',
    title: 'APIs and Backend Integration',
    description:
      'Connect React applications reliably to backend REST endpoints: design clean JSON requests/responses, build Express API proxy routes, protect API keys on the server, and handle errors cleanly.',
    learningObjectiveIds: ['WDI-API-06'],
    lessons: [
      {
        lessonId: 'lesson_wdi_6_1',
        moduleId: 'mod_wdi_6',
        courseId: 'web-development-intermediate',
        title: 'REST APIs, HTTP Methods & Backend Proxy Security',
        sequence: 1,
        sequenceLabel: 'Lesson 6.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-API-06'],
        learningObjectives: [
          'Match GET, POST, PUT/PATCH, and DELETE HTTP verbs cleanly to application actions.',
          'Explain why secret third-party API keys must stay on a Node/Express server instead of Vite VITE_ frontend bundles.',
          'Configure Express JSON middleware and server proxy endpoints (/api/*).'
        ],
        introduction:
          'Any variable prefixed with VITE_ gets compiled directly into browser JavaScript—meaning anyone opening Chrome DevTools can steal a secret API key placed there. Backend proxy routes solve that cleanly.',
        lessonContent: [
          'HTTP Verbs & Status Codes: GET retrieves data (200 OK), POST creates/submits payloads (201 Created or 200 OK), PATCH/PUT updates records, and DELETE removes resources. Return 400 Bad Request for invalid user input, 401/403 for auth/permission errors, and 500 for unexpected server errors.',
          'Why Server Proxy Routes Matter: Never store payment secret keys, Gemini keys, or admin credentials inside React client code. Instead, have React POST to /api/orders on your own Express server, and let the Express route read process.env.SECRET_KEY securely on the backend.',
          'Validating Incoming Bodies: On your Express server, never trust req.body blindly—verify required fields, trim strings, and return helpful 400 JSON errors before processing.'
        ],
        stepByStepInstructions: [
          'Create an Express route GET /api/products returning typed JSON.',
          'Add POST /api/enquiries validating name and message in req.body.',
          'Ensure secret keys are read exclusively from server process.env, never imported in src/.'
        ],
        nigerianContextExamples: [
          'Paystack / Payment Verification: A Lagos e-commerce app verifies transactions on /api/payments/verify using the Paystack SECRET key on Express—never inside React client files.',
          'Clean Error Messages: Returning { success: false, error: "Phone number required" } helps frontend forms highlight exact mistakes.'
        ],
        toolsAndResources: ['Express 4/5 Routing Docs', 'HTTP Status Codes Reference'],
        practicalDemonstration:
          'app.post("/api/enquiries", (req, res) => {\n  const { name, message } = req.body || {};\n  if (!name || !message) return res.status(400).json({ success: false, error: "Name and message required" });\n  return res.status(201).json({ success: true });\n});',
        codeExamples: [
          {
            title: 'Express API Endpoint + Client Service Integration',
            language: 'typescript',
            code: `// server.ts (Backend route)
app.post('/api/quotes', (req, res) => {
  const { serviceName, units } = req.body || {};
  const cleanUnits = Number(units);
  if (!serviceName || Number.isNaN(cleanUnits) || cleanUnits <= 0) {
    return res.status(400).json({ success: false, error: 'Valid service and positive units required.' });
  }
  const totalNgn = cleanUnits * 5000;
  return res.json({ success: true, totalNgn });
});

// src/services/quoteService.ts (Frontend call)
export async function requestQuote(serviceName: string, units: number) {
  const res = await fetch('/api/quotes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ serviceName, units })
  });
  const data = await res.json();
  if (!res.ok || !data.success) {
    throw new Error(data.error || 'Quote request failed');
  }
  return data.totalNgn as number;
}`,
            explanation: [
              'Backend validates numeric units and rejects invalid input with HTTP 400.',
              'Frontend attaches Content-Type: application/json header and throws descriptive errors if !res.ok.'
            ],
            expectedOutput: 'Secure client-to-server JSON exchange with server-side validation.'
          }
        ],
        commonErrors: [
          {
            error: 'req.body is undefined inside Express POST route',
            cause: 'Forgot app.use(express.json()) middleware before defining routes, or frontend omitted Content-Type: application/json header.',
            fix: 'Register app.use(express.json()) near the top of server.ts and pass JSON headers in fetch.'
          }
        ],
        handsOnExercise: {
          title: 'Build an Express JSON Endpoint & Typed Client Call',
          task: 'Create a backend /api/items endpoint in server.ts and call it cleanly from a React component with loading and error handling.',
          steps: [
            'Validate incoming POST bodies on the Express server.',
            'Handle loading, error, and success states in React.'
          ],
          deliverable: 'Full client-server API integration.'
        },
        keyTakeaways: [
          'Keep secret API keys strictly on the backend (process.env), never in VITE_ browser code.',
          'Always use app.use(express.json()) and send Content-Type: application/json.',
          'Return consistent JSON envelopes ({ success, data/error }) with semantic HTTP status codes.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_6_1_1',
            questionText: 'Why must secret API keys NEVER use the VITE_ prefix in React frontend code?',
            options: [
              'VITE_ variables are bundled directly into public browser JS where anyone can view them in DevTools',
              'Vite deletes variables starting with VITE_',
              'CSS hides VITE_ variables',
              'Browsers block HTTPS on VITE_ vars'
            ],
            correctAnswer: 0,
            explanation: 'Client bundles are downloadable by every visitor—keep secrets exclusively on the backend.'
          },
          {
            id: 'kc_wdi_6_1_2',
            questionText: 'Why might req.body evaluate to undefined inside an Express POST handler?',
            options: [
              'app.use(express.json()) middleware was omitted or the request missed Content-Type: application/json',
              'POST requests cannot carry JSON',
              'React disabled JSON',
              'TypeScript stripped req.body'
            ],
            correctAnswer: 0,
            explanation: 'Express requires express.json() middleware to parse incoming JSON request bodies.'
          },
          {
            id: 'kc_wdi_6_1_3',
            questionText: 'Which HTTP status code appropriately signals invalid user-submitted form fields?',
            options: ['200', '400', '301', '503'],
            correctAnswer: 1,
            explanation: '400 Bad Request tells clients the submitted payload failed validation.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_6_2',
        moduleId: 'mod_wdi_6',
        courseId: 'web-development-intermediate',
        title: 'Fetching in React: AbortController, Caching & Retry UX',
        sequence: 2,
        sequenceLabel: 'Lesson 6.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-API-06'],
        learningObjectives: [
          'Prevent race conditions and stale overwrites when fetching inside useEffect using AbortController.',
          'Build clear Retry buttons and offline-friendly error banners for Nigerian network drops.',
          'Avoid accidental infinite fetch loops caused by unstable useEffect dependencies.'
        ],
        introduction:
          'Suppose a user clicks "Filter: Paid" then quickly clicks "Filter: Pending". If the slower "Paid" response returns second, it overwrites the screen with wrong rows—unless you cancel stale requests cleanly.',
        lessonContent: [
          'Cleanup with AbortController: Inside useEffect, instantiate const controller = new AbortController();, pass { signal: controller.signal } to fetch(), and return () => controller.abort(); as the effect cleanup. If props change or the component unmounts, stale responses cancel automatically!',
          'Avoiding Fetch Loops: Never pass an inline newly constructed object/array inside useEffect dependencies without memoizing, and never set the dependency state unconditionally inside the effect body.',
          'User-Friendly Retry Paths: Instead of logging errors silently to console.error(), expose a clear Retry button so mobile users who hit a temporary network hiccup can recover with one tap.'
        ],
        stepByStepInstructions: [
          'Write a useEffect hook fetching filtered orders using AbortController.',
          'Ignore AbortError inside catch so intentional cancellations never display fake error banners.',
          'Add a retry trigger button cleanly.'
        ],
        nigerianContextExamples: [
          'Switching Tabs Quickly on 3G: Canceling stale API fetches prevents old search results from flashing over newer filters when network latency fluctuates.',
          'Resilient Offline Messaging: Displaying "Connection paused—tap Retry" respects users on fluctuating mobile data.'
        ],
        toolsAndResources: ['MDN AbortController', 'React Docs: Fetching Data with Effects'],
        practicalDemonstration:
          'useEffect(() => {\n  const controller = new AbortController();\n  fetch(`/api/orders?status=${status}`, { signal: controller.signal })\n    .then(...)\n    .catch((err) => { if (err.name !== "AbortError") setError(err.message); });\n  return () => controller.abort();\n}, [status]);',
        codeExamples: [
          {
            title: 'Race-Condition-Safe Data Fetching with Retry Button',
            language: 'tsx',
            code: `import React, { useEffect, useState } from 'react';

export function LiveOrdersFeed({ filter }: { filter: string }) {
  const [orders, setOrders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetch(\`/api/orders?status=\${encodeURIComponent(filter)}\`, {
      signal: controller.signal
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(\`Server error (\${res.status})\`);
        return res.json();
      })
      .then((data) => setOrders(data.orders || []))
      .catch((err) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Unable to load orders.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [filter, reloadKey]);

  if (loading) return <p className="text-sm text-slate-600">Loading orders...</p>;
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
        {error}{' '}
        <button onClick={() => setReloadKey((k) => k + 1)} className="underline font-semibold ml-2">
          Retry
        </button>
      </div>
    );
  }
  return <p className="text-sm">{orders.length} orders loaded.</p>;
}`,
            explanation: [
              'controller.abort() cancels previous in-flight request whenever filter changes.',
              'reloadKey lets a single Retry button cleanly re-run the effect.'
            ],
            expectedOutput: 'Zero stale race conditions and effortless retry recovery.'
          }
        ],
        commonErrors: [
          {
            error: 'Screen shows red "The user aborted a request" error whenever navigating away quickly',
            cause: 'Forgot to skip AbortError inside the catch block.',
            fix: 'Check if (err.name === "AbortError") return; before setting visible error state.'
          }
        ],
        handsOnExercise: {
          title: 'Add Race-Safe Fetching & Retry to a Search/Filter Panel',
          task: 'Wire AbortController cleanup and a Retry trigger into a React component consuming a filtered endpoint.',
          steps: [
            'Pass controller.signal to fetch.',
            'Handle AbortError quietly and render Retry UI on real errors.'
          ],
          deliverable: 'Race-condition-proof data loader.'
        },
        keyTakeaways: [
          'Always return () => controller.abort() from async fetch useEffects.',
          'Ignore AbortError in catch blocks so clean cancellations do not look like failures.',
          'Provide a clear Retry trigger on recoverable network failures.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_6_2_1',
            questionText: 'What problem does AbortController cleanup inside useEffect prevent?',
            options: [
              'Slower older network responses overwriting newer filter results (race conditions)',
              'Tailwind CSS tree-shaking',
              'TypeScript syntax errors',
              'Missing <meta> tags'
            ],
            correctAnswer: 0,
            explanation: 'Aborting in-flight requests on dependency change or unmount stops stale updates.'
          },
          {
            id: 'kc_wdi_6_2_2',
            questionText: 'Why ignore errors where err.name === "AbortError" in catch?',
            options: [
              'Because AbortError indicates our own intentional cleanup cancellation, not a user-facing server failure',
              'Because browsers hide AbortError in Safari',
              'Because AbortError crashes Node.js',
              'Because AbortError means 200 OK'
            ],
            correctAnswer: 0,
            explanation: 'Intentional aborts should not display alarming error banners.'
          },
          {
            id: 'kc_wdi_6_2_3',
            questionText: 'What is a safe pattern for query parameters containing user text like search terms?',
            options: [
              'Wrap in encodeURIComponent(term)',
              'Leave spaces unescaped',
              'Put raw JSON in HTML titles',
              'Convert strings to integers'
            ],
            correctAnswer: 0,
            explanation: 'encodeURIComponent prevents spaces, &, or ? from corrupting URL query strings.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_6_3',
        moduleId: 'mod_wdi_6',
        courseId: 'web-development-intermediate',
        title: 'Environment Configuration (.env.example) & Full-Stack Dev Setup',
        sequence: 3,
        sequenceLabel: 'Lesson 6.3',
        estimatedDurationMinutes: 30,
        learningObjectiveIds: ['WDI-API-06'],
        learningObjectives: [
          'Document required environment variables cleanly in .env.example without real secrets.',
          'Ensure .env is listed in .gitignore so credentials never enter Git history.',
          'Understand how Vite dev middleware and Express production servers share port 3000 cleanly.'
        ],
        introduction:
          'Pushing an accidental .env file to a public GitHub repository exposes your keys to automated bots within seconds. Clean environment hygiene separates configuration from source code permanently.',
        lessonContent: [
          '.env vs .env.example: Keep your actual keys inside .env (gitignored locally) or cloud environment secrets. Commit ONLY .env.example containing placeholder names like DATABASE_URL="" and PORT="3000" so teammates know which variables are required.',
          'Same-Origin Full-Stack Serving: Running Express with vite.middlewares in dev (and express.static("dist") in production) serves both your React UI and /api/* routes from one origin (e.g. localhost:3000)—eliminating messy CORS bugs.',
          'Fail Fast on Missing Critical Config: On server startup, log clear warnings if required environment variables are missing instead of crashing unpredictably mid-request.'
        ],
        stepByStepInstructions: [
          'Inspect .gitignore to confirm .env and .env.local are ignored.',
          'Create .env.example documenting PORT and server-side API variable names without real secrets.',
          'Test GET /api/health from React via relative path /api/health.'
        ],
        nigerianContextExamples: [
          'Zero CORS Headaches & Free Deployment: Serving Vite + Express on one origin avoids cross-origin cookie/header blocks when deploying full-stack student and SME apps.',
          'Key Leak Prevention:Bots scrape public GitHub commits continuously for exposed payment and AI keys—strict .gitignore + .env.example keeps your account safe.'
        ],
        toolsAndResources: ['Vite Environment Variables Guide', 'Twelve-Factor App: Config'],
        practicalDemonstration:
          '# .env.example (Safe to commit to GitHub)\nPORT=3000\n# Set secret keys strictly on server/hosting secrets\nSERVICE_API_KEY="replace_with_server_secret"',
        codeExamples: [
          {
            title: 'Safe Relative API Calls + .env Hygiene',
            language: 'typescript',
            code: `// Safe: Relative URL hits the same Express + Vite origin on port 3000
export async function checkBackendHealth(): Promise<{ status: string }> {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error('Backend unavailable');
  return res.json();
}`,
            explanation: [
              'Relative /api/health path adapts automatically across localhost:3000 and live cloud domains.'
            ],
            expectedOutput: 'Returns { status: "ok", ... } without hardcoded localhost URLs breaking production.'
          }
        ],
        commonErrors: [
          {
            error: 'App tries calling http://localhost:3000/api/... after deploying to a live HTTPS domain',
            cause: 'Hardcoded localhost URL instead of using relative /api/... paths.',
            fix: 'Replace hardcoded localhost origins with relative paths like /api/quotes.'
          }
        ],
        handsOnExercise: {
          title: 'Audit Environment Variables & Relative API Paths',
          task: 'Verify zero secrets exist in src/ or Git-tracked files, add .env.example, and ensure API calls use relative /api/* paths.',
          steps: [
            'Inspect .gitignore and .env.example.',
            'Confirm frontend fetches use relative /api/... paths.'
          ],
          deliverable: 'Clean environment configuration ready for deployment.'
        },
        keyTakeaways: [
          'Commit .env.example (placeholders only); NEVER commit real .env files.',
          'Use relative /api/* paths when frontend and Express backend share an origin.',
          'Never embed hardcoded secret tokens anywhere inside React src/.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_6_3_1',
            questionText: 'What belongs inside .env.example committed to GitHub?',
            options: [
              'Live production database passwords',
              'Placeholder variable names documenting configuration without real secrets',
              'User phone numbers',
              'Compiled dist/ JS bundles'
            ],
            correctAnswer: 1,
            explanation: '.env.example guides setup safely while real secrets remain out of Git.'
          },
          {
            id: 'kc_wdi_6_3_2',
            questionText: 'Why prefer fetch("/api/quotes") over fetch("http://localhost:3000/api/quotes")?',
            options: [
              'Relative paths work automatically on both localhost and deployed production HTTPS domains',
              'localhost cannot return JSON',
              'Relative URLs skip HTTP status codes',
              'Browsers ban port 3000 in dev'
            ],
            correctAnswer: 0,
            explanation: 'Hardcoded localhost URLs break immediately for live users once deployed.'
          },
          {
            id: 'kc_wdi_6_3_3',
            questionText: 'What should you do if an AI assistant accidentally suggests hardcoding an API key inside a React component?',
            options: [
              'Accept it if the file is minified',
              'Reject that change—move the key to server environment variables and proxy via an Express /api/* route',
              'Rename the variable to tempKey',
              'Store it inside index.html comments'
            ],
            correctAnswer: 1,
            explanation: 'Frontend code is always public; keys belong exclusively on the server.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 6 Assignment: Express Backend API & Resilient Frontend Integration',
      description: 'Connect your React app to an Express backend route handling validation, clean JSON error responses, AbortController cancellation, and Retry UI.',
      deliverables: [
        'Express POST/GET route in server.ts validating req.body',
        'React consumer using AbortController + loading/error/retry UI'
      ],
      evaluationCriteria: [
        'No hardcoded localhost URLs or exposed backend secrets in client src/',
        'Handles both network errors and HTTP 4xx/5xx responses cleanly'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_6_1',
        questionText: 'Where must sensitive third-party API keys live in a full-stack React + Express app?',
        options: ['Inside server process.env behind Express /api/* routes', 'Inside VITE_ env variables', 'Inside localStorage', 'Inside index.html'],
        correctAnswer: 0,
        explanation: 'Only backend server memory keeps secret keys hidden from browser visitors.'
      },
      {
        id: 'mc_wdi_6_2',
        questionText: 'Which Express middleware parses incoming JSON request bodies into req.body?',
        options: ['express.json()', 'express.html()', 'express.css()', 'express.corsOnly()'],
        correctAnswer: 0,
        explanation: 'app.use(express.json()) decodes JSON payloads cleanly.'
      },
      {
        id: 'mc_wdi_6_3',
        questionText: 'What prevents outdated async fetch responses from overwriting newer React state?',
        options: ['AbortController signal + cleanup return () => controller.abort()', 'window.alert()', 'border-box CSS', 'localStorage.clear()'],
        correctAnswer: 0,
        explanation: 'AbortController cancels stale in-flight fetches on filter change or unmount.'
      },
      {
        id: 'mc_wdi_6_4',
        questionText: 'Why commit .env.example instead of .env?',
        options: [
          'To document required variable names without exposing real keys/passwords in Git history',
          'Because Git cannot store files starting with dots unless named .example',
          'To delete production servers',
          'To speed up Tailwind'
        ],
        correctAnswer: 0,
        explanation: 'Real credentials belong strictly in gitignored .env or hosting secret stores.'
      },
      {
        id: 'mc_wdi_6_5',
        questionText: 'Why use relative fetch("/api/...") paths instead of "http://localhost:3000/api/..."?',
        options: [
          'Relative paths resolve cleanly across both local dev and deployed production origins',
          'localhost blocks GET requests',
          'Relative paths bypass JSON.parse',
          'Relative paths encrypt passwords'
        ],
        correctAnswer: 0,
        explanation: 'Relative same-origin requests remain portable across every deployment URL.'
      }
    ]
  },

  // =========================================================================
  // MODULE 7: FIREBASE AND FULL-STACK APPLICATION DEVELOPMENT
  // =========================================================================
  {
    moduleId: 'mod_wdi_7',
    courseId: 'web-development-intermediate',
    sequence: 7,
    sequenceLabel: 'Module 7',
    title: 'Firebase and Full-Stack Application Development',
    description:
      'Build real persistent multi-user business applications with Cloud Firestore, Firebase Authentication, security rules, and cost-efficient read patterns.',
    learningObjectiveIds: ['WDI-FB-07'],
    lessons: [
      {
        lessonId: 'lesson_wdi_7_1',
        moduleId: 'mod_wdi_7',
        courseId: 'web-development-intermediate',
        title: 'Firestore Data Modeling, CRUD & Query Cost Optimization',
        sequence: 1,
        sequenceLabel: 'Lesson 7.1',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDI-FB-07'],
        learningObjectives: [
          'Structure Cloud Firestore collections and documents cleanly with typed TypeScript helpers.',
          'Read and write records using deterministic doc IDs, getDoc, getDocs with limit(), setDoc, and updateDoc.',
          'Minimize Firestore billable reads by avoiding unnecessary collection-wide listeners and stripping undefined fields.'
        ],
        introduction:
          'Cloud Firestore scales effortlessly, but naive polling or unbounded onSnapshot listeners across thousands of rows can spike read counts and slow down low-cost phones. Smart modeling saves both money and bandwidth.',
        lessonContent: [
          'Collections, Documents & Deterministic IDs: Firestore organizes JSON-like documents inside collections (e.g., orders/ord_101 or learningProgress/${courseId}_${userId}). Deterministic IDs allow single-document getDoc() lookups instead of scanning entire collections!',
          'Strip undefined Before setDoc(): Firestore throws an immediate error if any field inside your payload is explicitly undefined. Write a small stripUndefined() helper (or default optional strings cleanly) before calling setDoc/updateDoc.',
          'Cost & Bandwidth Discipline: Always include query(..., limit(50)) on collection queries, fetch on mount or explicit refresh rather than leaving heavy wildcard realtime listeners open across every list, and cache static catalogs cleanly.'
        ],
        stepByStepInstructions: [
          'Inspect src/lib/firebase.ts and verify initialized Firestore db instance.',
          'Create a service file (e.g., businessRecordsService.ts) with getDoc, setDoc, and limited getDocs queries.',
          'Strip undefined fields before every Firestore write.'
        ],
        nigerianContextExamples: [
          'Deterministic Reads in Digital Corps Hub: Storing progress under `${courseId}_${participantId}` lets the Academy fetch a learner’s record in 1 single getDoc read—while keeping collection-wide lists private to admins.',
          'Bandwidth Conservation: Querying with limit(50) keeps dashboard loads instant over 3G mobile data.'
        ],
        toolsAndResources: ['Firebase Firestore Web SDK Docs', 'Firestore Data Modeling Best Practices'],
        practicalDemonstration:
          'const q = query(collection(db, "invoices"), where("ownerId", "==", uid), limit(50));\nconst snap = await getDocs(q);',
        codeExamples: [
          {
            title: 'Safe Typed Firestore Service Pattern (No undefined Crashes)',
            language: 'typescript',
            code: `import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface BusinessProfile {
  ownerId: string;
  businessName: string;
  phone?: string;
  updatedAt: string;
}

export async function saveBusinessProfile(profile: BusinessProfile): Promise<void> {
  const cleanPayload = Object.fromEntries(
    Object.entries(profile).filter(([, value]) => value !== undefined)
  );
  await setDoc(doc(db, 'businessProfiles', profile.ownerId), cleanPayload, { merge: true });
}

export async function loadBusinessProfile(ownerId: string): Promise<BusinessProfile | null> {
  const snap = await getDoc(doc(db, 'businessProfiles', ownerId));
  return snap.exists() ? (snap.data() as BusinessProfile) : null;
}`,
            explanation: [
              'Filters out undefined properties so Firestore setDoc never crashes.',
              'Uses deterministic ownerId doc key for O(1) single-read lookup.'
            ],
            expectedOutput: 'Safely creates/merges and loads typed business profile documents in 1 read.'
          }
        ],
        commonErrors: [
          {
            error: 'FirebaseError: Function setDoc() called with invalid data. Unsupported field value: undefined',
            cause: 'Passed an object containing an optional property whose value was undefined.',
            fix: 'Strip undefined keys (or replace with empty string / omit optional keys) before passing to setDoc/updateDoc.'
          }
        ],
        handsOnExercise: {
          title: 'Build Practical Project #4: Business Dashboard with Firestore CRUD',
          task: 'Implement a Firestore-backed service supporting create, limited list/lookup, and update for SME records (e.g. products or customer orders).',
          steps: [
            'Write typed save/load functions stripping undefined values.',
            'Constrain collection reads with where + limit(50).'
          ],
          deliverable: 'Working Firestore business records service.'
        },
        keyTakeaways: [
          'Strip undefined values before calling Firestore setDoc() or updateDoc().',
          'Use deterministic document IDs + getDoc() whenever looking up known single records.',
          'Always apply limit() and scoped where() filters instead of loading unbounded collections.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_7_1_1',
            questionText: 'What happens if you pass { notes: undefined } into Firestore setDoc()?',
            options: [
              'Firestore throws an Unsupported field value: undefined error',
              'Firestore converts undefined to 0',
              'Firestore deletes the collection',
              'React renders "undefined" automatically'
            ],
            correctAnswer: 0,
            explanation: 'Firestore forbids explicit undefined field values; strip them before writing.'
          },
          {
            id: 'kc_wdi_7_1_2',
            questionText: 'Why use deterministic doc IDs like `${courseId}_${userId}` instead of random auto-IDs for per-user records?',
            options: [
              'It prevents duplicates and enables fast 1-read getDoc() lookups without scanning the collection',
              'Auto-IDs cannot contain strings',
              'Random IDs break CSS layouts',
              'Deterministic IDs disable security rules'
            ],
            correctAnswer: 0,
            explanation: 'Deterministic IDs prevent duplicate records and avoid broad collection list queries.'
          },
          {
            id: 'kc_wdi_7_1_3',
            questionText: 'Why apply limit() on Firestore list queries?',
            options: [
              'To bound read costs, memory usage, and mobile bandwidth on growing datasets',
              'Because Firestore crashes after 5 documents',
              'To disable sorting',
              'To encrypt fields'
            ],
            correctAnswer: 0,
            explanation: 'Bounded queries protect app responsiveness and billing.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_7_2',
        moduleId: 'mod_wdi_7',
        courseId: 'web-development-intermediate',
        title: 'Firebase Authentication: Sign-Up, Login & Auth State',
        sequence: 2,
        sequenceLabel: 'Lesson 7.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-FB-07'],
        learningObjectives: [
          'Implement email/password or Google Sign-In using Firebase Authentication.',
          'Subscribe cleanly to onAuthStateChanged with unmount cleanup so user sessions persist safely.',
          'Build Practical Project #3: User Registration & Login Application with clear error mapping.'
        ],
        introduction:
          'Never roll your own password hashing or DIY cookie auth when proven Firebase Authentication handles password security, token refresh, and session persistence out of the box.',
        lessonContent: [
          'onAuthStateChanged Lifecycle: Wrap auth state in React using onAuthStateChanged(auth, (firebaseUser) => { ... }) inside useEffect, returning the unsubscribe function on unmount. Keep an authLoading flag true until Firebase finishes checking existing sessions so protected pages never flash a false "Login" screen for half a second.',
          'Human-Friendly Error Mapping: Raw Firebase codes like "auth/wrong-password" or "auth/invalid-credential" confuse users. Map Firebase auth error codes to polite, non-leaking messages ("Invalid email or password. Please try again.")—avoid revealing whether an email exists on login errors.',
          'UI Hiding Is NOT Security: Conditional rendering ({user.role === "admin" && <AdminPanel />}) is purely cosmetic UX; real access enforcement must live inside Firestore Security Rules and backend verification.'
        ],
        stepByStepInstructions: [
          'Create an AuthContext or hook tracking user and authLoading via onAuthStateChanged.',
          'Build Sign Up, Sign In, and Sign Out UI handlers with friendly error messages.',
          'Render protected workspace screens only after authLoading resolves and user is present.'
        ],
        nigerianContextExamples: [
          'Zero-Flash Session Restore: Showing a brief "Checking session..." state until onAuthStateChanged fires stops mobile users from thinking they were logged out.',
          'Practical Project #3: Complete Login + Registration flow integrated cleanly with Firebase Auth.'
        ],
        toolsAndResources: ['Firebase Authentication Web Docs', 'Firebase Auth Error Codes Reference'],
        practicalDemonstration:
          'useEffect(() => {\n  const unsub = onAuthStateChanged(auth, (u) => {\n    setUser(u);\n    setAuthLoading(false);\n  });\n  return () => unsub();\n}, []);',
        codeExamples: [
          {
            title: 'Clean Auth Session Listener + Safe Error Mapper',
            language: 'typescript',
            code: `import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

export function mapAuthError(code?: string): string {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please check and try again.';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    default:
      return 'Unable to complete authentication right now.';
  }
}

export async function loginMerchant(email: string, password: string) {
  try {
    return await signInWithEmailAndPassword(auth, email.trim(), password);
  } catch (err: any) {
    throw new Error(mapAuthError(err?.code));
  }
}

export async function logoutMerchant() {
  await signOut(auth);
}`,
            explanation: [
              'Generic invalid-credential message prevents user enumeration attacks.',
              'Returns clean human-readable Error messages for React form banners.'
            ],
            expectedOutput: 'Smooth login/logout flow with clear user feedback and automatic session persistence.'
          }
        ],
        commonErrors: [
          {
            error: 'Protected dashboard briefly flashes "Please Sign In" on refresh even when logged in',
            cause: 'Rendered routes immediately while user === null before onAuthStateChanged resolved its initial callback.',
            fix: 'Track authLoading = true initially and display a clean loading state until onAuthStateChanged fires.'
          }
        ],
        handsOnExercise: {
          title: 'Build Practical Project #3: User Registration & Login App',
          task: 'Build a complete Registration, Login, and Authenticated Profile screen using Firebase Auth and clear error feedback.',
          steps: [
            'Track user & authLoading via onAuthStateChanged with cleanup.',
            'Map Firebase error codes cleanly and test invalid password, new signup, refresh, and logout.'
          ],
          deliverable: 'Working Firebase Auth flow.'
        },
        keyTakeaways: [
          'Wait for onAuthStateChanged before deciding whether to redirect or render protected UI.',
          'Always return the unsubscribe function from onAuthStateChanged inside useEffect.',
          'Map Firebase auth error codes to clear, non-leaking user messages.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_7_2_1',
            questionText: 'Why track an authLoading flag alongside user in onAuthStateChanged?',
            options: [
              'To wait until Firebase restores the saved session before redirecting or showing a Login prompt',
              'To slow down the app on purpose',
              'To disable CSS animations',
              'Because Firebase Auth deletes passwords on refresh'
            ],
            correctAnswer: 0,
            explanation: 'Initial user state starts null asynchronously until Firebase resolves the persisted session.'
          },
          {
            id: 'kc_wdi_7_2_2',
            questionText: 'Why avoid displaying "No account exists with that email" vs "Wrong password" separately on login?',
            options: [
              'Unified invalid-credential messages help prevent attackers from enumerating registered user emails',
              'Firebase forbids separate error strings',
              'TypeScript rejects long messages',
              'Browsers block error banners'
            ],
            correctAnswer: 0,
            explanation: 'Non-leaking error messages improve account privacy.'
          },
          {
            id: 'kc_wdi_7_2_3',
            questionText: 'Is hiding an Admin button with {isAdmin && <AdminButton />} enough to protect sensitive database writes?',
            options: [
              'Yes, nobody can inspect React code',
              'No—real enforcement MUST be written in Firestore Security Rules and backend verification',
              'Only if styled with Tailwind',
              'Only on HTTPS'
            ],
            correctAnswer: 1,
            explanation: 'Any user can inspect client JS or craft direct Firestore requests; rules enforce true security.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_7_3',
        moduleId: 'mod_wdi_7',
        courseId: 'web-development-intermediate',
        title: 'Firestore Security Rules: Least Privilege & Schema Validation',
        sequence: 3,
        sequenceLabel: 'Lesson 7.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-FB-07'],
        learningObjectives: [
          'Replace dangerous `allow read, write: if true` rules with owner-scoped and admin-scoped rules.',
          'Validate incoming document fields (hasOnly, types, string lengths) inside firestore.rules.',
          'Protect server-only or admin-only fields (like score, reviewedBy) from learner self-editing.'
        ],
        introduction:
          'Your Firebase API config is public so the SDK knows which project to talk to. Your REAL security wall is firestore.rules—and leaving it wide open puts every user record at risk.',
        lessonContent: [
          'Never Ship `if true` Rules on User Data: A wildcard match /{document=**} { allow read, write: if false; } catch-all at the top locks everything down by default. Then open ONLY explicit collections.',
          'Owner Scoping & Admin Scoping: Check request.auth != null && request.auth.uid == resource.data.ownerId for reading/updating private user data. Keep collection-wide list queries restricted to admins when documents belong to individual users.',
          'Field Allowlisting & Immutable Review Fields: Use incoming().keys().hasOnly([...]) to reject unexpected fields, verify string sizes and numeric bounds, and block clients from overwriting admin-only fields like score or reviewedBy via !incoming().diff(existing()).affectedKeys().hasAny(["score", "reviewedBy"]).'
        ],
        stepByStepInstructions: [
          'Review a sample firestore.rules file matching an SME business orders collection.',
          'Add ownerId ownership checks on create and update.',
          'Block unauthorized modification of status="approved" or admin review fields.'
        ],
        nigerianContextExamples: [
          'Preventing Score Tampering: Just as Digital Corps Hub blocks learners from editing their own score or coordinatorFeedback in firestore.rules, an SME app must stop customers from setting paymentStatus: "paid" from browser DevTools!',
          'Verifying AI-Generated Security Rules: AI tools frequently suggest `allow read, write: if request.auth != null;`—too broad! You now know to restrict each collection strictly to the owning uid or verified admin.'
        ],
        toolsAndResources: ['Firebase Security Rules Documentation', 'Rules Unit Testing Guide'],
        practicalDemonstration:
          'match /orders/{orderId} {\n  allow read: if isSignedIn() && (resource.data.ownerId == request.auth.uid || isAdmin());\n  allow create: if isSignedIn() && request.resource.data.ownerId == request.auth.uid && request.resource.data.status == "pending";\n}',
        codeExamples: [
          {
            title: 'Least-Privilege Firestore Rules Pattern for Business Records',
            language: 'javascript',
            code: `rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }

    match /invoices/{invoiceId} {
      allow get, list: if request.auth != null && resource.data.ownerId == request.auth.uid;
      allow create: if request.auth != null &&
        request.resource.data.ownerId == request.auth.uid &&
        request.resource.data.keys().hasOnly(['ownerId', 'clientName', 'amountNgn', 'status', 'createdAt']) &&
        request.resource.data.status == 'draft' &&
        request.resource.data.amountNgn is int &&
        request.resource.data.amountNgn > 0;
      allow update: if request.auth != null &&
        resource.data.ownerId == request.auth.uid &&
        request.resource.data.ownerId == resource.data.ownerId;
    }
  }
}`,
            explanation: [
              'Default-deny rule blocks every unlisted collection automatically.',
              'hasOnly() blocks extra unexpected properties and forces valid positive integer amounts.'
            ],
            expectedOutput: 'Only authenticated owners can access their own validated invoice records.'
          }
        ],
        commonErrors: [
          {
            error: 'Missing or insufficient permissions (PERMISSION_DENIED) on valid getDocs query',
            cause: 'Rule allows resource.data.ownerId == request.auth.uid, yet the client query forgot .where("ownerId", "==", user.uid).',
            fix: 'Firestore rules do not filter results—client queries MUST include matching .where() clauses proving all returned docs pass rules.'
          }
        ],
        handsOnExercise: {
          title: 'Write Least-Privilege Rules for Your Business Web App',
          task: 'Draft and audit Firestore rules ensuring each user reads/writes only their own records and cannot spoof admin fields.',
          steps: [
            'Start with default-deny match /{document=**}.',
            'Add ownerId equality + keys().hasOnly() checks + type constraints.'
          ],
          deliverable: 'Audited firestore.rules snippet.'
        },
        keyTakeaways: [
          'Always start firestore.rules with default-deny: allow read, write: if false.',
          'Client queries must include .where("ownerId", "==", uid) to satisfy owner-scoped list rules.',
          'Validate field allowlists (hasOnly), data types, and protect admin/review fields from client tampering.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_7_3_1',
            questionText: 'Why does a query fail with PERMISSION_DENIED when rules say `resource.data.ownerId == request.auth.uid` if the client runs `getDocs(collection(db, "invoices"))` without `.where(...)`?',
            options: [
              'Firestore rules validate the query constraints up front rather than silently filtering out other users’ docs',
              'getDocs cannot read arrays',
              'request.auth.uid expires after 1 second',
              'Tailwind blocks Firestore'
            ],
            correctAnswer: 0,
            explanation: 'Rules require the client query itself to prove only permitted records are requested.'
          },
          {
            id: 'kc_wdi_7_3_2',
            questionText: 'Why is `allow read, write: if request.auth != null;` dangerous for multi-user business apps?',
            options: [
              'Any signed-in user could read, modify, or overwrite EVERY other user’s records',
              'It disables email login',
              'It makes documents load slower',
              'It breaks CSS Grid'
            ],
            correctAnswer: 0,
            explanation: 'Authentication proves who someone is, NOT that they own every document in the database.'
          },
          {
            id: 'kc_wdi_7_3_3',
            questionText: 'What does `incoming().keys().hasOnly([...])` protect against?',
            options: [
              'Attackers injecting arbitrary unexpected fields or oversized hidden blobs into documents',
              'Weak CSS fonts',
              'Git merge conflicts',
              'Slow internet speeds'
            ],
            correctAnswer: 0,
            explanation: 'hasOnly enforces strict schema allowlisting at the database boundary.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 7 Assignment: Practical Project #5 – Business Management App with Firebase',
      description: 'Connect your multi-view React business application to Firebase Auth and Cloud Firestore with deterministic/scoped reads, undefined stripping, and audited security rules.',
      deliverables: [
        'Authenticated user flow (Sign Up, Login, Logout) with loading guard',
        'Firestore CRUD workflow + least-privilege security rules definition'
      ],
      evaluationCriteria: [
        'Clean error handling, bounded queries, and zero undefined write crashes',
        'Rules enforce owner scoping and protect sensitive status/score fields'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_7_1',
        questionText: 'What should you strip from a JavaScript object before passing it to Firestore setDoc()?',
        options: ['Boolean fields', 'Properties with value undefined', 'Strings shorter than 5 chars', 'Numbers equal to 0'],
        correctAnswer: 1,
        explanation: 'Firestore rejects objects containing explicit undefined values.'
      },
      {
        id: 'mc_wdi_7_2',
        questionText: 'Why wait for Firebase onAuthStateChanged to finish its first check before redirecting to Login?',
        options: [
          'To avoid flashing a false Login screen before an existing session finishes restoring',
          'To compress images',
          'To bypass HTTPS',
          'To save CSS styles'
        ],
        correctAnswer: 0,
        explanation: 'Session restoration runs asynchronously on page load.'
      },
      {
        id: 'mc_wdi_7_3',
        questionText: 'When a rule checks `resource.data.ownerId == request.auth.uid`, what must your Firestore list query include?',
        options: [
          'where("ownerId", "==", currentUser.uid)',
          'no filters at all',
          'orderBy("password")',
          'allowAll: true'
        ],
        correctAnswer: 0,
        explanation: 'Queries must explicitly mirror security rule ownership constraints.'
      },
      {
        id: 'mc_wdi_7_4',
        questionText: 'Why limit Firestore list queries with limit(50) and avoid unnecessary wildcard realtime listeners?',
        options: [
          'To prevent excessive read billing and save mobile data bandwidth',
          'Firestore bans > 50 docs in a database',
          'Because setDoc stops working',
          'To disable offline cache'
        ],
        correctAnswer: 0,
        explanation: 'Bounded queries protect cost efficiency and performance.'
      },
      {
        id: 'mc_wdi_7_5',
        questionText: 'Why start every firestore.rules file with `match /{document=**} { allow read, write: if false; }`?',
        options: [
          'Default-deny ensures unconfigured collections remain locked instead of accidentally public',
          'To speed up Vite compilation',
          'To disable admin login',
          'Because JSON requires false'
        ],
        correctAnswer: 0,
        explanation: 'Default-deny enforces least privilege across the database.'
      }
    ]
  },

  // =========================================================================
  // MODULE 8: AI-ASSISTED CODING AND DEVELOPMENT
  // =========================================================================
  {
    moduleId: 'mod_wdi_8',
    courseId: 'web-development-intermediate',
    sequence: 8,
    sequenceLabel: 'Module 8',
    title: 'AI-Assisted Coding and Development',
    description:
      'Use AI assistants like a senior collaborator: convert business goals into technical specifications, design Firestore schemas, generate React/TypeScript/Tailwind modules safely, and inspect every line.',
    learningObjectiveIds: ['WDI-AI-08'],
    lessons: [
      {
        lessonId: 'lesson_wdi_8_1',
        moduleId: 'mod_wdi_8',
        courseId: 'web-development-intermediate',
        title: 'From Business Requirements to Technical Specifications & Architecture',
        sequence: 1,
        sequenceLabel: 'Lesson 8.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-AI-08'],
        learningObjectives: [
          'Translate plain business needs into structured technical specs (User Stories, Data Models, Screens, Security Boundaries).',
          'Prompt AI for architectural plans, React component trees, and Firestore data structures before writing code.',
          'Follow strict AI security hygiene: NEVER paste passwords, private API keys, service accounts, or real user PII into public AI tools.'
        ],
        introduction:
          'Saying "Build me an e-commerce site" produces messy bloated code. Writing a crisp technical specification first lets AI generate exact interfaces, Firestore structures, and modular components that fit your codebase cleanly.',
        lessonContent: [
          'Specification-First Prompting: Before generating JSX, ask AI to define: (1) Core user roles and screens, (2) TypeScript interfaces, (3) Firestore collections with deterministic IDs & security rules, and (4) Error/loading edge cases. Review and fix that plan BEFORE generating implementation files.',
          'Designing Firestore Models with AI: Provide constraints explicitly: e.g., "Design a Firestore schema for an Abuja Laundry Tracker supporting mobile users, deterministic per-user docs, bounded queries, and least-privilege rules—no `allow read, write: if true`."',
          'CRITICAL SECURITY RULE — Never Leak Secrets or Real User Data: NEVER paste .env contents, Firebase service account JSONs, payment secret keys, passwords, or real customers’ emails/phone numbers into public ChatGPT/Gemini/Claude prompts! Always sanitize placeholders like user_123 and example@domain.com.'
        ],
        stepByStepInstructions: [
          'Pick a Nigerian SME problem (e.g., Tailoring Order Tracker, Mini Pharmacy Stock Log, or Dispatch Delivery Manager).',
          'Draft a 4-part prompt: Context + Tech Stack + Constraints + Security Rules.',
          'Review the generated TypeScript interfaces and Firestore collection layout critically before accepting.'
        ],
        nigerianContextExamples: [
          'Translating a Boutique Owner’s Request: "I track customer measurements and balance payments on paper" becomes clean TypeScript interfaces (CustomerMeasurement, OrderBalance) and a clear React + Firestore plan in 5 minutes.',
          'Zero Secret Leaks: Redacting real customer phone numbers or keys before asking an AI tool to debug keeps client privacy compliant.'
        ],
        toolsAndResources: ['AI Development Lab (Built Into This Course)', 'OWASP Top 10 for LLM Apps'],
        practicalDemonstration:
          'Prompt Pattern:\nRole: Senior React + TypeScript + Firebase Architect\nGoal: Technical spec for an Invoice & Expense Tracker\nStack: Vite, React, TypeScript, Tailwind CSS, Firebase Auth + Firestore\nConstraints: Typed interfaces (no `any`), mobile-first 360px layout, deterministic doc IDs, zero secrets in client.',
        aiLabChallenge: {
          id: 'ailab_wdi_8_1',
          trackLevel: 'intermediate',
          category: 'fundamentals',
          title: 'Spec-to-Architecture Prompt: Business Order Tracker',
          problemStatement:
            'A catering entrepreneur needs a web app to record customer orders, track deposit vs. balance paid, and view pending deliveries without spreadsheets.',
          samplePrompt:
            'Act as a senior React + TypeScript + Firebase architect. Convert these business requirements into a technical specification:\n- Business: Catering order & deposit tracker\n- Stack: React, TypeScript, Tailwind CSS, Firebase Auth, Firestore\n- Output:\n  1. TypeScript interfaces (no `any`)\n  2. Component hierarchy\n  3. Firestore collection structure with deterministic/owner-scoped rules\n  4. Edge cases (offline/loading/validation)\nConstraint: Use placeholder sample data only; do NOT include hardcoded keys or broad `if true` rules.',
          expectedAiOutput:
            'Structured specification containing CateringOrder interface (`status: "pending" | "deposit_paid" | "completed"`), layered components (`OrderForm`, `OrderSummaryCard`, `OrderService`), ownerId-scoped Firestore rules, and validation rules.',
          learnerTask:
            'Write or adapt this spec prompt for your own Business Web Application capstone idea, ensuring clear TypeScript types, owner-scoped Firestore collections, and zero real secrets or customer PII.',
          codeReviewChecklist: [
            'Includes explicit TypeScript union types instead of loose strings or `any`',
            'Specifies ownerId scoping and least-privilege Firestore rules (no `if true`)',
            'Defines loading, empty, and error states for mobile users',
            'Contains ZERO real API keys, passwords, or customer PII'
          ],
          securityReminder:
            'NEVER paste real API keys, passwords, Firebase service accounts, or real customer PII into public AI prompts. Always replace with sanitized placeholders.'
        },
        handsOnExercise: {
          title: 'Draft the Technical Specification for Your Intermediate Capstone',
          task: 'Produce a complete technical spec (Interfaces, Component Tree, Routes, Firestore Collections, Security Checklist) for your Business Web Application.',
          steps: [
            'Use the Specification-First prompt pattern in the AI Development Lab.',
            'Verify every field uses strict TypeScript types and owner-scoped Firestore paths.'
          ],
          deliverable: 'Audited Capstone Technical Specification document.'
        },
        keyTakeaways: [
          'Specification-first prompting yields clean modular code instead of tangled prototypes.',
          'Explicitly forbid `any`, `if true` Firestore rules, and client-side secrets in every prompt.',
          'NEVER paste real credentials, service accounts, or user PII into public AI tools.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_8_1_1',
            questionText: 'What should NEVER be pasted into a public AI chat prompt?',
            options: [
              'TypeScript interface stubs with fake example names',
              'Real API keys, passwords, Firebase service accounts, or production customer PII',
              'Tailwind layout class questions',
              'Public documentation snippets'
            ],
            correctAnswer: 1,
            explanation: 'Sanitize all secrets and private user records before sharing code or logs with external AI tools.'
          },
          {
            id: 'kc_wdi_8_1_2',
            questionText: 'Why specify constraints like "no `any`, mobile-first, owner-scoped Firestore rules" BEFORE generating code?',
            options: [
              'So AI generates maintainable, production-aligned architecture on the first pass instead of unsafe stubs',
              'Because AI refuses prompts under 50 words',
              'To skip testing entirely',
              'To avoid writing TypeScript interfaces'
            ],
            correctAnswer: 0,
            explanation: 'Clear engineering constraints dramatically improve structural quality and security.'
          },
          {
            id: 'kc_wdi_8_1_3',
            questionText: 'When should you review AI-suggested Firestore data models?',
            options: [
              'Only after launching to 1,000 customers',
              'Immediately during the architecture step, checking read costs, ownerId scoping, and rule constraints',
              'Never—AI schemas are always optimal',
              'Only if CSS breaks'
            ],
            correctAnswer: 1,
            explanation: 'Fixing data shape early avoids costly database migrations later.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_8_2',
        moduleId: 'mod_wdi_8',
        courseId: 'web-development-intermediate',
        title: 'Generating React Components, Forms & API Integrations with AI',
        sequence: 2,
        sequenceLabel: 'Lesson 8.2',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDI-AI-08'],
        learningObjectives: [
          'Prompt AI cleanly for single-responsibility React + TypeScript + Tailwind components.',
          'Inspect generated JSX/TSX line by line to catch bugs, accessibility gaps, and hidden hallucinations.',
          'Connect generated UI forms cleanly to REST APIs or Firestore services.'
        ],
        introduction:
          'Asking AI to write one focused component—providing your exact TypeScript props interface—gives clean, plug-and-play results. Blindly pasting 400 lines without inspecting it introduces subtle bugs.',
        lessonContent: [
          'Scoped Component Generation: Share your existing TypeScript interface (e.g. OrderRecord) and ask AI to generate ONLY the React form or dashboard table component—not a whole duplicate app with fake CSS imports.',
          'The 6-Point AI Code Inspection Routine: Before keeping generated React code: (1) Are all imports real packages actually installed in package.json? (2) Are types explicit (no `any`)? (3) Are lists keyed by stable IDs rather than index? (4) Do forms call preventDefault() and guard double submits? (5) Are Tailwind classes static literals? (6) Is user text safe (no dangerouslySetInnerHTML)?',
          'Never Copy-Paste Blindly: Run `npx tsc --noEmit` and trace state updates yourself. If you cannot explain what a generated useEffect does, simplify or rewrite it until you can.'
        ],
        stepByStepInstructions: [
          'Provide your Order interface and ask AI to draft an OrderFilterTable component.',
          'Run the 6-Point Inspection Checklist on the output.',
          'Fix any index-based keys, missing empty states, or unvalidated form handlers.'
        ],
        nigerianContextExamples: [
          'Catching Phantom Packages: AI often imports icons or utility packages you never installed (like react-hot-toast or @heroicons/react instead of lucide-react). Checking imports first saves 20 minutes of build errors.',
          'Clean Form Validation: Spotting when generated forms forgot disabled={isSubmitting} protects Nigerian shop owners on patchy 3G from duplicate order submissions.'
        ],
        toolsAndResources: ['AI Development Lab Challenge #2', 'React Code Inspection Checklist'],
        practicalDemonstration:
          '// Inspection Spot-Check Example:\n// BAD AI output: {items.map((item, idx) => <Row key={idx} ... />)}\n// FIXED by you: {items.map((item) => <Row key={item.id} ... />)}',
        aiLabChallenge: {
          id: 'ailab_wdi_8_2',
          trackLevel: 'intermediate',
          category: 'app_building',
          title: 'Generate & Audit a Typed Dashboard Form + Table Component',
          problemStatement:
            'You need a responsive InventoryItemForm and StockTable for your Business Management Capstone without breaking existing TypeScript rules or accessibility.',
          samplePrompt:
            'Given this TypeScript interface:\ninterface StockItem { id: string; sku: string; name: string; qty: number; reorderLevel: number; }\nGenerate a React + TypeScript + Tailwind component StockManagerProps { items: StockItem[]; onAddItem: (item: Omit<StockItem, "id">) => Promise<void>; }.\nRequirements:\n- Controlled inputs with accessible <label htmlFor>\n- Prevent negative qty or blank name\n- Disable submit button during async save\n- Show low-stock badge when qty <= reorderLevel\n- Use only standard lucide-react icons or plain Tailwind; NO `any`, NO `dangerouslySetInnerHTML`.',
          expectedAiOutput:
            'Clean TSX component using controlled inputs, positive numeric checks, try/finally saving lock, stable key={item.id}, and responsive table/card stack.',
          learnerTask:
            'Draft your component prompt, review the resulting code against every checklist item below, and verify it compiles cleanly inside your Vite app.',
          codeReviewChecklist: [
            'All imports match packages already in package.json',
            'Every form input has a matching <label htmlFor>',
            'List rows use unique item.id keys (never array index)',
            'Async save disables submit button and resets inside finally',
            'No `any` types or dynamic Tailwind strings (`bg-${c}-500`)'
          ],
          securityReminder:
            'Inspect generated components for dangerouslySetInnerHTML or unvalidated URLs (e.g., javascript: links) before rendering user input.'
        },
        handsOnExercise: {
          title: 'Generate, Inspect & Integrate 2 UI Modules into Capstone',
          task: 'Use scoped AI prompts to draft a Dashboard KPI Strip and Data Entry Form, inspect every line, and integrate them into your Business App.',
          steps: [
            'Supply exact TypeScript interfaces in your prompt.',
            'Audit every import, hook dependency, key prop, and accessibility attribute before committing.'
          ],
          deliverable: 'Two audited, working React components.'
        },
        keyTakeaways: [
          'Always pass your exact TypeScript interfaces when prompting for UI components.',
          'Audit imports, types, stable keys, submit locks, and XSS safety before accepting generated code.',
          'Never keep code you do not understand well enough to debug.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_8_2_1',
            questionText: 'What is a common mistake AI makes when generating JSX lists that you must inspect and fix?',
            options: [
              'Using array index (idx) as the React key on editable/deletable rows instead of unique item.id',
              'Wrapping JSX inside parentheses',
              'Using TypeScript interfaces',
              'Adding padding classes'
            ],
            correctAnswer: 0,
            explanation: 'Index keys cause subtle UI bugs whenever rows are inserted, filtered, or deleted.'
          },
          {
            id: 'kc_wdi_8_2_2',
            questionText: 'What should you check first when pasted AI TSX code causes Vite to fail immediately?',
            options: [
              'Whether the AI invented or imported an npm package that is not installed in package.json',
              'Whether CSS colors are dark',
              'Whether your computer battery is low',
              'Whether GitHub is open'
            ],
            correctAnswer: 0,
            explanation: 'Hallucinated or uninstalled imports are a top cause of immediate build failures.'
          },
          {
            id: 'kc_wdi_8_2_3',
            questionText: 'Why verify accessibility labels (<label htmlFor>) and disabled={saving} on AI-generated forms?',
            options: [
              'AI often omits accessibility pairings and async double-submit protection unless explicitly audited',
              'Labels make forms load slower',
              'disabled={saving} converts TS to JS',
              'Tailwind deletes <label> tags'
            ],
            correctAnswer: 0,
            explanation: 'Human code review catches UX and accessibility omissions consistently.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_8_3',
        moduleId: 'mod_wdi_8',
        courseId: 'web-development-intermediate',
        title: 'AI-Assisted Debugging, Error Diagnosis & Code Refactoring',
        sequence: 3,
        sequenceLabel: 'Lesson 8.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-AI-08'],
        learningObjectives: [
          'Give AI precise debugging context (exact error message, stack trace, minimal code snippet, expected vs. actual behavior).',
          'Refactor messy duplicated components into clean reusable helpers without changing intended behavior.',
          'Verify root causes rather than applying "band-aid" AI hacks like adding `@ts-ignore` or `as any`.'
        ],
        introduction:
          'Pasting "My app is broken, fix it" wastes prompts. Giving the exact compiler/console error plus the 20 relevant lines gets accurate root-cause fixes fast—as long as you reject band-aid hacks.',
        lessonContent: [
          'The 4-Part Debugging Prompt: Include (1) Exact error text or console trace, (2) Expected vs. actual behavior, (3) Focused relevant code snippet (with zero secrets), and (4) What you already tried.',
          'Reject AI Band-Aids: Watch out when an AI suggests `// @ts-ignore`, `as any`, `catch {}` (swallowing errors silently), or deleting a security rule to fix PERMISSION_DENIED! Those hide bugs only to explode worse in production.',
          'Safe Refactoring Workflow: Commit working code in Git BEFORE starting an AI refactor (`git commit -m "Working baseline before refactor"`). Then refactor one small module at a time and re-test immediately.'
        ],
        stepByStepInstructions: [
          'Commit your working code in Git first.',
          'Practice fixing a TypeScript or Firestore bug using the 4-part sanitized debug prompt.',
          'Verify the fix solves the actual root cause without `@ts-ignore` or `as any`.'
        ],
        nigerianContextExamples: [
          'Git Safety Net Before Refactoring: Committing before refactoring means if an AI rewrite breaks your dashboard layout, `git checkout -- .` restores sanity in 1 second.',
          'Spotting Fake Rule Fixes: If a learner hits Firestore PERMISSION_DENIED and AI says "Change firestore.rules to `allow read, write: if true`", you know immediately that is a dangerous anti-pattern—fix the missing `.where("ownerId", "==", uid)` query instead!'
        ],
        toolsAndResources: ['Git Diff Inspection in VS Code', 'AI Development Lab Challenge #3'],
        practicalDemonstration:
          '// Band-aid AI suggestion (REJECT): allow read, write: if true;\n// Root-cause fix (ACCEPT): Add .where("ownerId", "==", auth.currentUser.uid) to client query matching owner rule.',
        aiLabChallenge: {
          id: 'ailab_wdi_8_3',
          trackLevel: 'intermediate',
          category: 'app_building',
          title: 'Root-Cause Debugging Without Unsafe Shortcuts',
          problemStatement:
            'A learner’s dashboard throws `FirebaseError: Missing or insufficient permissions` on getDocs, and a naive AI response suggests setting `allow read, write: if true;` in firestore.rules.',
          samplePrompt:
            'Diagnose this error WITHOUT weakening Firestore security rules:\nRule: `match /orders/{id} { allow read: if request.auth != null && resource.data.ownerId == request.auth.uid; }`\nClient code: `const snap = await getDocs(collection(db, "orders"));`\nError: `FirebaseError: Missing or insufficient permissions.`\nExplain the root cause and provide the corrected client TypeScript query (do NOT weaken security rules).',
          expectedAiOutput:
            'Explains that Firestore rules validate query constraints statically rather than filtering docs, and fixes client code to `query(collection(db, "orders"), where("ownerId", "==", user.uid), limit(50))`.',
          learnerTask:
            'Practice writing a root-cause debug prompt for an intentional bug in your project, then inspect the proposed fix to verify zero `@ts-ignore`, zero `as any`, and zero weakened security rules.',
          codeReviewChecklist: [
            'Fixes the root cause rather than silencing warnings with `@ts-ignore` or `as any`',
            'Never weakens Firestore rules to `if true`',
            'Preserves existing working behavior (verified with `git diff`)'
          ],
          securityReminder:
            'Never accept an AI debugging fix that disables authentication, drops input validation, or opens Firestore rules publicly.'
        },
        handsOnExercise: {
          title: 'Refactor a Duplicated Component Safely Using Git Checkpoints',
          task: 'Commit a clean Git checkpoint, refactor a repeated card or fetch handler into a reusable component/helper, and inspect git diff.',
          steps: [
            'Run git commit before refactoring.',
            'Extract shared component/utility and inspect git diff line-by-line.',
            'Re-run build and manual UI tests.'
          ],
          deliverable: 'Clean, refactored module verified via git diff.'
        },
        keyTakeaways: [
          'Always commit a clean Git checkpoint before refactoring code with AI.',
          'Supply exact error messages, expected behavior, and sanitized snippets when debugging.',
          'Reject band-aid fixes like `@ts-ignore`, empty `catch {}`, or weakening security rules.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_8_3_1',
            questionText: 'What should you ALWAYS do before asking AI to refactor a working module?',
            options: [
              'Commit your working code in Git so you can compare diffs or revert instantly',
              'Delete .gitignore',
              'Turn off TypeScript strict mode',
              'Paste your .env file into the prompt'
            ],
            correctAnswer: 0,
            explanation: 'A Git checkpoint guarantees effortless comparison and instant rollback if needed.'
          },
          {
            id: 'kc_wdi_8_3_2',
            questionText: 'Which AI-suggested debugging "fix" should you immediately reject?',
            options: [
              'Adding missing .where("ownerId", "==", uid) to match security rules',
              'Using `@ts-ignore` / `as any` or changing Firestore rules to `allow read, write: if true;`',
              'Checking if (!res.ok)',
              'Wrapping async state updates cleanly in try/finally'
            ],
            correctAnswer: 1,
            explanation: 'Silencing compiler errors or opening database rules creates severe bugs and breaches.'
          },
          {
            id: 'kc_wdi_8_3_3',
            questionText: 'Why include expected vs. actual behavior and exact error messages in a debugging prompt?',
            options: [
              'Specific context lets the model pinpoint the root cause instead of guessing blindly',
              'Longer messages increase browser memory',
              'TypeScript reads prompts at runtime',
              'GitHub requires it for commits'
            ],
            correctAnswer: 0,
            explanation: 'Precise diagnostics dramatically increase fix accuracy.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 8 Assignment: AI-Assisted Feature Build & Code Audit Log',
      description: 'Use AI thoughtfully to specify, generate, inspect, and integrate a complete business feature (e.g. Invoice Builder or Inventory Tracker) into your Capstone.',
      deliverables: [
        'Technical Specification prompt + sanitized design summary',
        'Integrated React + TS feature with a brief human inspection log listing fixes you made to AI output'
      ],
      evaluationCriteria: [
        'Zero leaked secrets/PII, zero `@ts-ignore` / `any` shortcuts',
        'Feature compiles cleanly and handles loading/error/validation states'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_8_1',
        questionText: 'Which information MUST be removed or replaced with placeholders before prompting a public AI tool?',
        options: [
          'Tailwind utility names',
          'Real API keys, passwords, service account files, and production customer PII',
          'React hook names',
          'TypeScript interface syntax'
        ],
        correctAnswer: 1,
        explanation: 'Never expose credentials or private user data to third-party public prompts.'
      },
      {
        id: 'mc_wdi_8_2',
        questionText: 'Why generate a technical specification and TypeScript interfaces BEFORE asking AI to build components?',
        options: [
          'Shared contracts prevent mismatched field names and chaotic architecture across files',
          'Specifications skip the need for CSS',
          'TypeScript only compiles markdown specs',
          'Vite blocks unprompted apps'
        ],
        correctAnswer: 0,
        explanation: 'Agreed schemas keep generated UI, services, and database rules aligned.'
      },
      {
        id: 'mc_wdi_8_3',
        questionText: 'Which AI-generated code pattern represents an unsafe shortcut you should reject?',
        options: [
          'Using `as any` to silence a real TypeScript mismatch or opening Firestore rules publicly',
          'Using `const` for immutable constants',
          'Adding `disabled={isSubmitting}` on forms',
          'Writing unit tests'
        ],
        correctAnswer: 0,
        explanation: 'Type escapes and weakened security rules leave real defects exposed.'
      },
      {
        id: 'mc_wdi_8_4',
        questionText: 'Why inspect every import statement inside AI-generated React files?',
        options: [
          'To catch hallucinated or uninstalled libraries before build errors waste debugging time',
          'Because alphabetical imports run faster',
          'To remove React completely',
          'Because browsers ignore imports'
        ],
        correctAnswer: 0,
        explanation: 'AI models sometimes reference packages absent from package.json.'
      },
      {
        id: 'mc_wdi_8_5',
        questionText: 'What makes `git diff` valuable after an AI-assisted refactor?',
        options: [
          'You can audit every single changed line to ensure no unrelated working logic was broken or removed',
          'It deletes GitHub branches',
          'It compiles TypeScript into CSS',
          'It creates Firestore collections automatically'
        ],
        correctAnswer: 0,
        explanation: 'Line-by-line diff review prevents accidental regressions.'
      }
    ]
  },

  // =========================================================================
  // MODULE 9: AI-POWERED DEVELOPMENT WORKFLOW AND TESTING
  // =========================================================================
  {
    moduleId: 'mod_wdi_9',
    courseId: 'web-development-intermediate',
    sequence: 9,
    sequenceLabel: 'Module 9',
    title: 'AI-Powered Development Workflow and Testing',
    description:
      'Ship reliable business software: write unit and component tests (with AI help verified by humans), audit security and mobile performance, and deploy your Intermediate Capstone.',
    learningObjectiveIds: ['WDI-TEST-09'],
    lessons: [
      {
        lessonId: 'lesson_wdi_9_1',
        moduleId: 'mod_wdi_9',
        courseId: 'web-development-intermediate',
        title: 'Writing Unit & Edge-Case Tests (and Improving Tests with AI)',
        sequence: 1,
        sequenceLabel: 'Lesson 9.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-TEST-09'],
        learningObjectives: [
          'Explain why automated tests protect business apps from regression bugs during edits.',
          'Write pure function unit tests (using Vitest or Node assertions) covering happy paths and edge cases.',
          'Prompt AI to uncover missing boundary cases (zero, negative numbers, empty strings, invalid states)—and verify assertions match real rules.'
        ],
        introduction:
          'Manually clicking 10 screens after every tiny edit gets exhausting—so developers skip checks and ship bugs. Automated unit tests run in under 2 seconds and catch broken calculations immediately.',
        lessonContent: [
          'What to Test First: Focus first on pure business rules—invoice totals, VAT calculations, discount thresholds, form validators, and permission checks—because pure functions are fast and deterministic to test.',
          'Using AI to Expand Edge Cases: Ask AI: "Here is my calculateOrderTotal function. Suggest edge-case unit tests covering empty carts, negative quantities, rounding, and discount caps." Then VERIFY every expected output yourself! AI sometimes writes tests that assert its own wrong math (`expect(total).toBe(999)` when the real total is 1000).',
          'Never Cheat Tests to Pass: If a test fails, investigate whether the code has a bug or the test expectation was wrong—never alter a valid test assertion just to turn CI green.'
        ],
        stepByStepInstructions: [
          'Pick a pure calculation or validation helper in your Business App.',
          'Write 4+ tests covering normal input, zero/empty input, invalid/negative input, and boundary values.',
          'Run your test script and verify every assertion reflects real business math.'
        ],
        nigerianContextExamples: [
          'Catching Rounding Errors in Naira VAT: Automated unit tests ensure 7.5% VAT and delivery discounts calculate consistently across every order.',
          'Spotting AI Test Lies: Verifying each expected result by hand stops AI-generated tests from validating buggy formulas.'
        ],
        toolsAndResources: ['Vitest Documentation', 'Node.js Built-in Test Runner (node:test)'],
        practicalDemonstration:
          'import assert from "node:assert/strict";\nassert.equal(applyDiscount(10000), 9000);\nassert.equal(applyDiscount(0), 0);',
        codeExamples: [
          {
            title: 'Testing Business Pricing Rules Across Edge Cases',
            language: 'typescript',
            code: `// pricing.ts
export function computeOrderTotal(subtotalNgn: number, deliveryNgn: number): number {
  if (subtotalNgn < 0 || deliveryNgn < 0) {
    throw new Error('Amounts cannot be negative');
  }
  const discount = subtotalNgn >= 50000 ? Math.round(subtotalNgn * 0.05) : 0;
  return subtotalNgn - discount + deliveryNgn;
}

// pricing.test.ts (Vitest style)
// expect(computeOrderTotal(20000, 1500)).toBe(21500);
// expect(computeOrderTotal(50000, 1500)).toBe(49000); // 5% threshold boundary
// expect(() => computeOrderTotal(-100, 1500)).toThrow('Amounts cannot be negative');`,
            explanation: [
              'Tests normal path, exact threshold boundary (50000), and invalid negative input.',
              'Confirms invalid inputs fail cleanly instead of producing negative invoices.'
            ],
            expectedOutput: 'All 3 scenarios pass deterministically in milliseconds.'
          }
        ],
        commonErrors: [
          {
            error: 'Tests pass even though business logic is wrong',
            cause: 'Accepted AI-written test assertions computed against a buggy implementation rather than independent hand-verified expectations.',
            fix: 'Always calculate expected numbers independently by hand when writing test assertions.'
          }
        ],
        handsOnExercise: {
          title: 'Write 5 Unit Tests for Your Business App Helpers',
          task: 'Write and execute automated tests covering pricing, validation, or filtering helpers across normal and edge cases.',
          steps: [
            'Include at least one boundary test and one invalid-input check.',
            'Verify all assertions manually.'
          ],
          deliverable: 'Passing automated unit test file.'
        },
        keyTakeaways: [
          'Pure business logic (pricing, discounts, validation) gives the highest immediate ROI from unit testing.',
          'Always test normal cases, empty/zero inputs, exact boundary thresholds, and invalid errors.',
          'Verify AI-suggested test expectations independently by hand.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_9_1_1',
            questionText: 'What is the danger of asking AI to write tests for an existing buggy function without checking its expected outputs?',
            options: [
              'The AI may write tests that validate the buggy behavior instead of true requirements',
              'Vitest refuses AI-formatted files',
              'Tests run slower on Windows',
              'TypeScript deletes test files'
            ],
            correctAnswer: 0,
            explanation: 'Human engineers must verify expected test assertions against real specifications.'
          },
          {
            id: 'kc_wdi_9_1_2',
            questionText: 'Which set of cases makes a unit test suite thorough?',
            options: [
              'Only one happy-path test',
              'Happy path, boundary thresholds, empty/zero values, and invalid/error inputs',
              'Testing CSS font colors only',
              'Testing console.log lines'
            ],
            correctAnswer: 1,
            explanation: 'Most real production bugs hide at boundaries, zero/empty states, and error paths.'
          },
          {
            id: 'kc_wdi_9_1_3',
            questionText: 'What should you do when a valid unit test fails after refactoring code?',
            options: [
              'Delete the assertion so the suite turns green',
              'Fix the regression bug in the refactored code and re-run tests',
              'Disable TypeScript',
              'Ignore tests during deployment'
            ],
            correctAnswer: 1,
            explanation: 'Failing valid tests catch regressions before users suffer them.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_9_2',
        moduleId: 'mod_wdi_9',
        courseId: 'web-development-intermediate',
        title: 'AI-Assisted Security & Performance Review Before Launch',
        sequence: 2,
        sequenceLabel: 'Lesson 9.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-TEST-09'],
        learningObjectives: [
          'Run a structured security review covering auth, Firestore rules, client secrets, and XSS.',
          'Audit React performance (large bundles, unoptimized images, unnecessary reads/re-renders).',
          'Use AI as a second reviewer with a focused security & performance prompt checklist.'
        ],
        introduction:
          'Before sharing your business web app with real customers, run both a human checklist and a targeted AI review focused on security holes and mobile performance bottlenecks.',
        lessonContent: [
          'Security Audit Checklist: (1) Zero secrets in src/ or VITE_ variables. (2) Firestore rules default-deny + owner/admin scoped + field allowlisted. (3) No dangerouslySetInnerHTML with untrusted text. (4) Forms validate inputs on both client and server/rules. (5) External links use safe http/https URLs.',
          'Performance Audit Checklist: (1) Keep Firestore queries bounded with limit() and avoid needless wildcard listeners. (2) Compress uploaded/static images and lazy-load heavy routes/charts where helpful. (3) Debounce search inputs. (4) Check Lighthouse Mobile score and build bundle sizes (`npm run build`).',
          'Prompting AI as a Skeptical Reviewer: Instead of "Is my code good?", ask: "Act as a ruthless application security and performance auditor. List every potential XSS, permission bypass, unnecessary Firestore read, or mobile layout issue in this sanitized snippet."'
        ],
        stepByStepInstructions: [
          'Run npm run build to inspect generated JS/CSS bundle sizes.',
          'Audit firestore.rules and API routes against the 5-point Security Checklist.',
          'Run an AI Adversarial Security & Performance Review on a sanitized component.'
        ],
        nigerianContextExamples: [
          'Protecting Budget Smartphone Performance: Catching an unindexed 10,000-doc fetch or unresized 4 MB banner image during pre-launch review makes your app fast across Nigeria.',
          'Preventing Price Spoofing: Ensuring order totals or discount logic are validated on backend/rules rather than blindly trusting a hidden HTML input.'
        ],
        toolsAndResources: ['Chrome DevTools Lighthouse', 'AI Development Lab Challenge #4'],
        practicalDemonstration:
          'Pre-Launch Audit Result:\n- Security: No VITE_ secrets; firestore.rules checks ownerId == request.auth.uid; no innerHTML\n- Performance: dist CSS 18 KB; Firestore queries capped with limit(50); search debounced 300ms',
        aiLabChallenge: {
          id: 'ailab_wdi_9_2',
          trackLevel: 'intermediate',
          category: 'app_building',
          title: 'Adversarial AI Security & Performance Audit',
          problemStatement:
            'Before launching a React + Firebase Business Dashboard, review a component/service pair for hidden XSS risks, excessive Firestore reads, or authorization flaws.',
          samplePrompt:
            'Act as an adversarial React + Firebase security and performance auditor.\nInspect the sanitized code below strictly for:\n1. Exposed secrets or client-only authorization flaws\n2. XSS risks (innerHTML / unsafe URLs)\n3. Excessive Firestore reads / missing query limits / missing effect cleanups\n4. Mobile 360px overflow or double-submit issues\nReturn concrete findings ranked by severity (Critical / Medium / Low) with exact fixes.',
          expectedAiOutput:
            'Severity-ranked findings pointing out any missing AbortController, unbounded `getDocs(collection(...))`, `VITE_` secret leaks, or unvalidated `dangerouslySetInnerHTML`.',
          learnerTask:
            'Run this adversarial review prompt on one service file and one form/dashboard view from your Business App, then resolve all Critical and Medium findings.',
          codeReviewChecklist: [
            'Confirmed zero secret tokens or admin credentials in frontend files',
            'Confirmed bounded Firestore queries (limit / deterministic getDoc)',
            'Verified XSS safety (plain JSX text interpolation, safe URL protocols)',
            'Verified form double-submit guard and mobile 360px responsiveness'
          ],
          securityReminder:
            'Strip all real Firebase project IDs, private URLs, keys, and customer records before submitting code into external AI review prompts.'
        },
        handsOnExercise: {
          title: 'Run Full Security, Lint & Build Audit on Your Capstone',
          task: 'Execute `npx tsc --noEmit`, `npm run build`, and complete the 5-point security and performance audit.',
          steps: [
            'Check bundle output sizes after npm run build.',
            'Document and fix any security or mobile layout findings.'
          ],
          deliverable: 'Audited, production-building Business Web Application.'
        },
        keyTakeaways: [
          'Ask AI to hunt specifically for security flaws, unbounded reads, and edge-case bugs—not vague praise.',
          'Always verify price/permission rules on backend or Firestore Rules, never solely in React state.',
          'Audit Vite production bundle sizes and mobile responsiveness before shipping.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_9_2_1',
            questionText: 'Why ask AI "Act as a ruthless security auditor hunting flaws" rather than "Does this code look okay?"',
            options: [
              'Skeptical adversarial prompts uncover concrete edge cases and security bugs instead of agreeable compliments',
              'AI ignores positive prompts',
              'Security prompts compress JS bundles',
              'It disables Firestore limits'
            ],
            correctAnswer: 0,
            explanation: 'Targeted critical roles produce far sharper engineering feedback.'
          },
          {
            id: 'kc_wdi_9_2_2',
            questionText: 'Which JSX pattern opens a Cross-Site Scripting (XSS) hole if passed user-submitted strings?',
            options: [
              'dangerouslySetInnerHTML={{ __html: userInput }}',
              '<p>{userInput}</p>',
              'className="text-sm"',
              'aria-label={title}'
            ],
            correctAnswer: 0,
            explanation: 'React escapes normal {text} bindings automatically, whereas dangerouslySetInnerHTML injects raw HTML/scripts.'
          },
          {
            id: 'kc_wdi_9_2_3',
            questionText: 'What does running `npm run build` confirm that the Vite dev server might skip?',
            options: [
              'Full production bundling, tree-shaking, asset paths, and TypeScript/CSS build health',
              'Live customer clicks',
              'Firebase billing discounts',
              'GitHub password login'
            ],
            correctAnswer: 0,
            explanation: 'Production builds surface bundling and dead-import issues cleanly.'
          }
        ]
      },
      {
        lessonId: 'lesson_wdi_9_3',
        moduleId: 'mod_wdi_9',
        courseId: 'web-development-intermediate',
        title: 'Deploying Your Full-Stack React + Firebase App & Capstone Prep',
        sequence: 3,
        sequenceLabel: 'Lesson 9.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDI-TEST-09'],
        learningObjectives: [
          'Configure production hosting (Firebase Hosting / Vercel / Render) with clean SPA rewrites and authorized domains.',
          'Prepare crisp technical documentation covering architecture, Firestore model, AI usage log, and testing results.',
          'Submit your Intermediate Business Web Application Capstone cleanly.'
        ],
        introduction:
          'Deployment is not the end of engineering—verifying authorized domains in Firebase Auth, deployed firestore.rules, SPA rewrites, and live end-to-end smoke testing completes the cycle.',
        lessonContent: [
          'Production Firebase Checklist: (1) Deploy updated firestore.rules (never leave test mode open). (2) Add your live production domain (e.g., myapp.vercel.app or myapp.web.app) under Firebase Console -> Authentication -> Settings -> Authorized Domains, otherwise Google Sign-In/Auth fails on the live site! (3) Verify SPA fallback rewrite serves index.html.',
          'Documenting AI-Assisted Work Professionally: Include a concise section in your README explaining how AI helped (spec drafting, test edge cases, component scaffolding) and what YOU audited, fixed, and verified manually.',
          'Ready for Track C (Advanced): With React, TypeScript, Tailwind, Firebase, testing, and disciplined AI workflow mastered, Track C takes you into Node.js backend engineering, PostgreSQL/SQL databases, OWASP security, LLM API integration, RAG, tool calling, CI/CD, and scaling!'
        ],
        stepByStepInstructions: [
          'Run `npm run build` and test your production bundle locally with `npm run preview`.',
          'Deploy to Firebase Hosting / Vercel / Netlify and add the live domain to Firebase Auth Authorized Domains.',
          'Test Sign Up -> Create Record -> Refresh -> Update -> Logout on the live HTTPS URL.',
          'Submit your Capstone with GitHub Repo URL, Live App URL, and AI-assisted documentation!'
        ],
        nigerianContextExamples: [
          'Common Live Launch Trap: Deploying a React + Firebase app to Vercel/Netlify and forgetting to add the new domain to Firebase Auth Authorized Domains breaks login immediately on launch day—checking it prevents embarrassment.',
          'Transparent Engineering Portfolios: Showing employers both your live business app and your testing/AI-audit documentation proves true intermediate engineering maturity.'
        ],
        toolsAndResources: ['Firebase Hosting Docs', 'Vercel Vite Deployment Docs'],
        practicalDemonstration:
          'Live Launch Checklist:\n[x] npm run build succeeds cleanly\n[x] firestore.rules deployed (least-privilege)\n[x] Production domain added to Firebase Auth Authorized Domains\n[x] Tested Sign Up, Create, Refresh, Update on live mobile URL',
        handsOnExercise: {
          title: 'Deploy & Smoke-Test Your Intermediate Business App Capstone',
          task: 'Publish your React + TypeScript + Vite + Firebase Business Web Application live and verify all 9 capstone deliverables.',
          steps: [
            'Update README.md with architecture, Firestore data model, and AI verification notes.',
            'Test all CRUD, Auth, and responsive views on the live HTTPS link.',
            'Submit your Intermediate Capstone Project and complete the Final Assessment!'
          ],
          deliverable: 'Live deployed Intermediate Business Web Application.'
        },
        keyTakeaways: [
          'Always add live deployment domains to Firebase Auth Authorized Domains and deploy final firestore.rules.',
          'Document your architecture, tests, and AI-assisted verification steps in README.md.',
          'Always run a live end-to-end smoke test after deploying.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wdi_9_3_1',
            questionText: 'What often breaks Firebase popup/OAuth sign-in immediately after deploying to a new custom or Vercel URL?',
            options: [
              'Forgetting to add the new live domain to Firebase Console -> Authentication -> Authorized Domains',
              'Having too many CSS classes',
              'Including a README.md file',
              'Using TypeScript interfaces'
            ],
            correctAnswer: 0,
            explanation: 'Firebase Auth blocks unrecognized domains unless explicitly authorized.'
          },
          {
            id: 'kc_wdi_9_3_2',
            questionText: 'What should you run on your live deployed HTTPS URL right after deployment finishes?',
            options: [
              'End-to-end smoke test covering auth, creating/reloading data, mobile layout, and console errors',
              'Nothing—if localhost worked, live is guaranteed',
              'Delete .gitignore',
              'Turn off HTTPS'
            ],
            correctAnswer: 0,
            explanation: 'Live smoke testing catches missing env vars, unauthorized domains, and rule mismatches immediately.'
          },
          {
            id: 'kc_wdi_9_3_3',
            questionText: 'What makes AI-assisted engineering documentation stand out positively to technical reviewers?',
            options: [
              'Documenting specs, tests, security checks, and concrete human edits made to verify AI-generated code',
              'Claiming zero code was checked before submission',
              'Pasting raw unedited prompts with API keys',
              'Hiding test results'
            ],
            correctAnswer: 0,
            explanation: 'Engineering accountability and verification prove genuine ownership.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 9 Assignment: Automated Test Suite + Pre-Deploy Audit',
      description: 'Write automated unit/edge-case tests for core business logic, pass `npm run build`, and document your security/performance audit prior to live Capstone launch.',
      deliverables: [
        'Automated unit tests covering normal, boundary, and error paths',
        'Pre-deployment security & performance audit checklist completed'
      ],
      evaluationCriteria: [
        'Test assertions independently verified against business rules',
        'Clean production build (`npm run build`) and live deployment smoke check'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wdi_9_1',
        questionText: 'Why verify expected outputs of AI-generated unit tests manually?',
        options: [
          'AI may copy buggy implementation math into the expected test assertions',
          'Test runners refuse automated assertions',
          'Unit tests cannot run on TypeScript',
          'CSS requires manual math'
        ],
        correctAnswer: 0,
        explanation: 'Independent expectations guarantee tests actually validate requirements.'
      },
      {
        id: 'mc_wdi_9_2',
        questionText: 'Which JSX prop risks XSS vulnerabilities if given raw user-supplied strings?',
        options: ['dangerouslySetInnerHTML', 'className', 'placeholder', 'aria-label'],
        correctAnswer: 0,
        explanation: 'dangerouslySetInnerHTML bypasses React’s built-in text escaping.'
      },
      {
        id: 'mc_wdi_9_3',
        questionText: 'Which Firebase Console setting must include your live Vercel/Netlify/custom domain before Auth sign-in works there?',
        options: ['Authentication -> Authorized Domains', 'CSS Theme Settings', 'Analytics Color Picker', 'GitHub Issues'],
        correctAnswer: 0,
        explanation: 'Firebase rejects unrecognized auth origins unless listed under Authorized Domains.'
      },
      {
        id: 'mc_wdi_9_4',
        questionText: 'What does running `npm run preview` after `npm run build` verify?',
        options: [
          'That the actual compiled dist/ production bundle runs cleanly in the browser',
          'Your Wi-Fi password',
          'GitHub Stars count',
          'SQL server memory'
        ],
        correctAnswer: 0,
        explanation: 'Preview catches production-only build or asset-path regressions before launch.'
      },
      {
        id: 'mc_wdi_9_5',
        questionText: 'If a valid test breaks after an AI-assisted refactor, what is the right engineering action?',
        options: [
          'Diagnose and fix the broken code—never weaken a valid test just to turn CI green',
          'Delete the test file',
          'Add @ts-nocheck',
          'Deploy anyway'
        ],
        correctAnswer: 0,
        explanation: 'Tests exist to catch regressions before users experience them.'
      }
    ]
  }
];
