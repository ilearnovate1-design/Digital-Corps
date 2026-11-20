import { AiLabChallenge, WebDevPlacementResult } from '../../../types';

export interface WebDevPlacementQuestion {
  id: string;
  domain: 'HTML' | 'CSS' | 'JavaScript' | 'React' | 'TypeScript' | 'APIs & Backend' | 'Databases & SQL' | 'AI-Assisted Dev';
  tier: 'beginner' | 'intermediate' | 'advanced';
  questionText: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export const WEB_DEV_PLACEMENT_QUESTIONS: WebDevPlacementQuestion[] = [
  // HTML (2)
  {
    id: 'pl_html_1',
    domain: 'HTML',
    tier: 'beginner',
    questionText: 'Which HTML5 landmark wraps the primary unique content of a page for accessibility and SEO?',
    options: ['<div class="wrapper">', '<main>', '<section>', '<body>'],
    correctAnswer: 1,
    explanation: '<main> identifies the primary document content for assistive screen readers.'
  },
  {
    id: 'pl_html_2',
    domain: 'HTML',
    tier: 'beginner',
    questionText: 'What correctly pairs a visible label with <input id="emailInput" /> so screen readers announce it properly?',
    options: [
      '<label for="emailInput">Email</label>',
      '<label name="emailInput">Email</label>',
      '<span target="emailInput">Email</span>',
      '<p id="emailInput">Email</p>'
    ],
    correctAnswer: 0,
    explanation: 'Matching for="..." with the input id links the accessible label and focus target.'
  },

  // CSS (2)
  {
    id: 'pl_css_1',
    domain: 'CSS',
    tier: 'beginner',
    questionText: 'What does `box-sizing: border-box;` ensure when an element has width: 100% and padding: 16px?',
    options: [
      'Padding and border are included inside 100% width instead of expanding wider and causing horizontal scroll',
      'Margins become negative',
      'Flexbox stops wrapping',
      'Text turns bold'
    ],
    correctAnswer: 0,
    explanation: 'border-box prevents padding from breaking responsive mobile widths.'
  },
  {
    id: 'pl_css_2',
    domain: 'CSS',
    tier: 'beginner',
    questionText: 'In CSS Grid, which property creates 3 equal flexible columns inside a responsive gallery?',
    options: [
      'grid-template-columns: repeat(3, 1fr);',
      'display: flex-3;',
      'grid-columns: 33%;',
      'column-count: 3fr;'
    ],
    correctAnswer: 0,
    explanation: 'repeat(3, 1fr) shares available track width proportionally across 3 columns.'
  },

  // JavaScript (2)
  {
    id: 'pl_js_1',
    domain: 'JavaScript',
    tier: 'beginner',
    questionText: 'Why do modern JS developers write `10 === "10"` rather than `10 == "10"`?',
    options: [
      'Strict equality (===) checks both value and data type, returning false instead of implicit string-number coercion',
      'Double equals throws a SyntaxError in Chrome',
      'Triple equals runs loops faster by 50%',
      '== only works inside CSS'
    ],
    correctAnswer: 0,
    explanation: 'Strict equality eliminates sneaky type coercion bugs.'
  },
  {
    id: 'pl_js_2',
    domain: 'JavaScript',
    tier: 'intermediate',
    questionText: 'What happens if `fetch("/api/orders")` receives an HTTP 404 Not Found status from the server?',
    options: [
      'fetch() resolves with response.ok === false, so code must check `if (!response.ok)` before calling `response.json()`',
      'fetch() automatically throws a network exception to catch()',
      'The browser restarts the page',
      'JSON.parse converts 404 into an empty array'
    ],
    correctAnswer: 0,
    explanation: 'fetch() rejects only on network drop, not HTTP 4xx/5xx responses.'
  },

  // React (2)
  {
    id: 'pl_react_1',
    domain: 'React',
    tier: 'intermediate',
    questionText: 'What bug happens in JSX when writing `{items.length && <ItemList items={items} />}` while `items` is empty `[]`?',
    options: [
      'React renders the literal number `0` visibly on screen',
      'React deletes the component',
      'useState crashes',
      'Tailwind disables flex'
    ],
    correctAnswer: 0,
    explanation: 'Always convert to boolean explicitly: `{items.length > 0 && <ItemList />}`.'
  },
  {
    id: 'pl_react_2',
    domain: 'React',
    tier: 'intermediate',
    questionText: 'Why should editable lists use stable unique record IDs (`key={item.id}`) rather than array indices (`key={index}`)?',
    options: [
      'Reordering, filtering, or deleting items shifts array indices and can attach wrong component/input state to other rows',
      'Array indices cause Vite compilation errors',
      'CSS Grid ignores index keys',
      'localStorage deletes array indices'
    ],
    correctAnswer: 0,
    explanation: 'Unique keys preserve row identity cleanly across mutations.'
  },

  // TypeScript (2)
  {
    id: 'pl_ts_1',
    domain: 'TypeScript',
    tier: 'intermediate',
    questionText: 'Why does `const [orders, setOrders] = useState([])` fail later when adding an Order in strict TypeScript?',
    options: [
      'An untyped `[]` is inferred as `never[]`; write `useState<Order[]>([])`',
      'TypeScript forbids empty arrays in React',
      'useState only supports strings',
      'Vite deletes empty state arrays'
    ],
    correctAnswer: 0,
    explanation: 'Provide explicit generic array or union types for empty/nullable initial states.'
  },
  {
    id: 'pl_ts_2',
    domain: 'TypeScript',
    tier: 'intermediate',
    questionText: 'How do you safely read `.message` inside `catch (err: unknown)` in TypeScript?',
    options: [
      'Narrow with `if (err instanceof Error)` before accessing `err.message`',
      'Cast straight to `(err as any).msg.stack`',
      'Ignore catch blocks completely',
      'Pass `err` directly to `JSON.parse()`'
    ],
    correctAnswer: 0,
    explanation: 'Runtime instanceof narrowing prevents crashes when non-Error values are thrown.'
  },

  // APIs & Backend (2)
  {
    id: 'pl_api_1',
    domain: 'APIs & Backend',
    tier: 'intermediate',
    questionText: 'Why must private AI, payment, or third-party API keys NEVER be placed in React `VITE_` client environment variables?',
    options: [
      '`VITE_` variables are embedded into public browser JS bundles where anyone can extract them via DevTools',
      'Vite refuses string variables starting with VITE_',
      'Express cannot connect to port 3000',
      'CSS overrides `VITE_` keys'
    ],
    correctAnswer: 0,
    explanation: 'Secrets belong strictly on backend servers behind `/api/*` endpoints.'
  },
  {
    id: 'pl_api_2',
    domain: 'APIs & Backend',
    tier: 'advanced',
    questionText: 'How does an API prevent IDOR (Insecure Direct Object Reference) on `GET /api/invoices/:id`?',
    options: [
      'Extract caller identity from verified Bearer token/session AND enforce matching workspace/owner membership in the database query',
      'Use random UUID strings with no ownership check',
      'Hide the link inside React UI',
      'Trust `req.body.userId` sent by the browser'
    ],
    correctAnswer: 0,
    explanation: 'Authorization must verify caller ownership on the backend for every object lookup.'
  },

  // Databases & SQL (2)
  {
    id: 'pl_db_1',
    domain: 'Databases & SQL',
    tier: 'advanced',
    questionText: 'Which SQL query pattern neutralizes SQL Injection completely for user filter parameters?',
    options: [
      'Parameterized placeholders (`WHERE workspace_id = $1 AND email = $2`, `[wsId, email]`)',
      'Template strings (`WHERE email = \'${email}\'`)',
      'Checking input length only in React',
      'Encoding spaces with `trim()`'
    ],
    correctAnswer: 0,
    explanation: 'Bound parameters prevent user strings from ever executing as SQL syntax.'
  },
  {
    id: 'pl_db_2',
    domain: 'Databases & SQL',
    tier: 'advanced',
    questionText: 'How should concurrent stock or AI credit deductions work in PostgreSQL to eliminate race conditions?',
    options: [
      'Atomic conditional update inside a transaction: `UPDATE wallets SET credits = credits - $1 WHERE id = $2 AND credits >= $1 RETURNING credits`',
      'Read credits in JS, wait 50ms, then `UPDATE` without checking credits in SQL',
      'Disable foreign key constraints',
      'Use `FLOAT` columns'
    ],
    correctAnswer: 0,
    explanation: 'Atomic conditional updates execute safely under concurrent traffic.'
  },

  // AI-Assisted Dev (2)
  {
    id: 'pl_ai_1',
    domain: 'AI-Assisted Dev',
    tier: 'intermediate',
    questionText: 'Which practice is strictly FORBIDDEN when using public AI coding tools for debugging or app building?',
    options: [
      'Pasting real passwords, `.env` keys, Firebase service account JSONs, or production customer PII into prompts',
      'Asking AI to explain a TypeScript compiler error using sanitized dummy field names',
      'Generating unit test edge cases to verify manually',
      'Drafting a technical architecture plan before coding'
    ],
    correctAnswer: 0,
    explanation: 'Always sanitize secrets and private user records before external AI prompting.'
  },
  {
    id: 'pl_ai_2',
    domain: 'AI-Assisted Dev',
    tier: 'advanced',
    questionText: 'When building an AI operations agent capable of emailing customers or issuing refunds, what safeguard is mandatory?',
    options: [
      'Pause consequential actions in a `pending` state requiring explicit human review & confirmation before execution',
      'Allow an uncapped `while (true)` loop to fire refunds automatically',
      'Let the LLM pass arbitrary SQL strings directly to a `runSql` tool',
      'Trust LLM arithmetic for accounting ledgers without validation'
    ],
    correctAnswer: 0,
    explanation: 'Consequential mutations require human-in-the-loop confirmation and strict server controls.'
  }
];

export function evaluateWebDevPlacement(
  answers: Record<string, number>,
  optionPermutations?: Record<string, number[]>
): WebDevPlacementResult {
  let score = 0;
  let intermediateCorrect = 0;
  let intermediateTotal = 0;
  let advancedCorrect = 0;
  let advancedTotal = 0;

  const domainBreakdown: Record<string, { score: number; total: number }> = {};

  for (const q of WEB_DEV_PLACEMENT_QUESTIONS) {
    if (!domainBreakdown[q.domain]) {
      domainBreakdown[q.domain] = { score: 0, total: 0 };
    }
    domainBreakdown[q.domain].total++;

    if (q.tier === 'intermediate') intermediateTotal++;
    if (q.tier === 'advanced') advancedTotal++;

    const perm = optionPermutations?.[q.id];
    const presentedCorrect = perm ? perm.indexOf(q.correctAnswer) : q.correctAnswer;
    const picked = answers[q.id];
    const isCorrect = picked !== undefined && Number(picked) === presentedCorrect;

    if (isCorrect) {
      score++;
      domainBreakdown[q.domain].score++;
      if (q.tier === 'intermediate') intermediateCorrect++;
      if (q.tier === 'advanced') advancedCorrect++;
    }
  }

  const total = WEB_DEV_PLACEMENT_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  const fundamentalsStrong =
    (domainBreakdown['HTML']?.score ?? 0) >= 1 &&
    (domainBreakdown['CSS']?.score ?? 0) >= 1 &&
    (domainBreakdown['JavaScript']?.score ?? 0) >= 1;

  let recommendedCourseId: WebDevPlacementResult['recommendedCourseId'] = 'web-development-beginner';
  let recommendedLevel: WebDevPlacementResult['recommendedLevel'] = 'beginner';
  let rationale = '';

  if (
    percentage >= 75 &&
    fundamentalsStrong &&
    intermediateCorrect >= Math.ceil(intermediateTotal * 0.7) &&
    advancedCorrect >= Math.ceil(advancedTotal * 0.6)
  ) {
    recommendedCourseId = 'web-development-advanced';
    recommendedLevel = 'advanced';
    rationale = `Strong command across web fundamentals, React/TypeScript, backend APIs, SQL, and AI safety (${score}/${total} — ${percentage}%). You are ready for Advanced AI-Powered Full-Stack Development—though you remain free to revisit Beginner or Intermediate modules anytime.`;
  } else if (
    percentage >= 50 &&
    fundamentalsStrong &&
    intermediateCorrect >= Math.ceil(intermediateTotal * 0.5)
  ) {
    recommendedCourseId = 'web-development-intermediate';
    recommendedLevel = 'intermediate';
    rationale = `Solid HTML, CSS, and JavaScript foundation (${score}/${total} — ${percentage}%). Start with Intermediate – Modern Web Development with AI to master React, TypeScript, Tailwind, Firebase, and disciplined AI workflows.`;
  } else {
    recommendedCourseId = 'web-development-beginner';
    recommendedLevel = 'beginner';
    rationale = `Start with Beginner – Web Development Fundamentals (${score}/${total} — ${percentage}%) to build rock-solid HTML5, CSS3, responsive design, vanilla JS, DOM, and Git skills from scratch before adding frameworks or AI.`;
  }

  return {
    score,
    total,
    percentage,
    recommendedCourseId,
    recommendedLevel,
    rationale,
    domainBreakdown,
    completedAt: new Date().toISOString()
  };
}

export interface AiLabModuleSection {
  id: 'A' | 'B' | 'C';
  code: string;
  title: string;
  subtitle: string;
  keyPrinciples: string[];
  promptTemplates: Array<{
    title: string;
    goal: string;
    template: string;
  }>;
  securityNotice: string;
}

export const AI_LAB_FUNDAMENTALS_SECTIONS: AiLabModuleSection[] = [
  {
    id: 'A',
    code: 'Section A',
    title: 'AI Coding Fundamentals & Safe Prompt Engineering',
    subtitle: 'Structure clear technical context, inspect generated code line by line, and guard secrets.',
    keyPrinciples: [
      'Always state exact stack, TypeScript strictness (no `any`), and security rules BEFORE asking for code.',
      'Supply minimal focused interfaces rather than dumping whole unrelated files.',
      'Inspect every generated import, React key, hook dependency, and error check before pasting.',
      'NEVER paste real passwords, API keys, `.env` secrets, Firebase service accounts, or customer PII into public AI tools.'
    ],
    promptTemplates: [
      {
        title: 'Requirements -> Technical Specification',
        goal: 'Turn an SME business idea into clean TypeScript types & architecture before coding.',
        template:
          'Act as a senior React + TypeScript + Firebase engineer. Convert these requirements into a technical spec with: (1) strict TS interfaces (no `any`), (2) React component hierarchy, (3) owner-scoped Firestore rules (no `if true`), and (4) mobile 360px & loading/error edge cases. Requirements: [DESCRIBE FEATURE WITH DUMMY PLACEHOLDERS ONLY]'
      },
      {
        title: 'Sanitized Root-Cause Debugger',
        goal: 'Diagnose runtime/compiler errors without adopting band-aid hacks.',
        template:
          'Diagnose this error WITHOUT adding `@ts-ignore`, `as any`, or weakening security rules.\nExpected: [EXPECTED]\nActual Error: [EXACT ERROR]\nSanitized Code: [20 RELEVANT LINES WITH NO SECRETS]'
      }
    ],
    securityNotice:
      'Sanitize all API keys, credentials, private URLs, and real customer names/emails before running prompts externally.'
  },
  {
    id: 'B',
    code: 'Section B',
    title: 'AI-Assisted App Building Workflow (Intermediate)',
    subtitle: 'Build forms, dashboards, Tailwind screens, Firestore models, and unit tests systematically.',
    keyPrinciples: [
      'Generate one focused module at a time matching your existing TypeScript interfaces.',
      'Verify controlled form inputs (`htmlFor`, validation, `disabled={saving}` inside `finally`).',
      'Ensure Firestore code strips `undefined`, bounds queries (`limit()`), and mirrors owner rules (`.where("ownerId", "==", uid)`).',
      'Hand-verify expected assertions in every AI-generated unit test.'
    ],
    promptTemplates: [
      {
        title: 'Typed React Form & Table Component',
        goal: 'Scaffold accessible Tailwind UI bound strictly to your interface.',
        template:
          'Given interface [PASTE TS INTERFACE], generate one focused TSX component supporting add + filter.\nRequirements: <label htmlFor> pairings, disabled submit lock inside try/finally, unique item.id keys, static Tailwind classes only, zero `any` or `dangerouslySetInnerHTML`.'
      },
      {
        title: 'Edge-Case Test Suite Generator',
        goal: 'Expand happy-path tests to cover boundaries, empty arrays, and errors.',
        template:
          'Write Vitest unit tests for this pure TS helper covering: (1) normal path, (2) zero/empty input, (3) boundary threshold, and (4) negative/invalid throw cases. Keep assertions exact and deterministic. [PASTE PURE FUNCTION]'
      }
    ],
    securityNotice:
      'Audit generated UI for `dangerouslySetInnerHTML`, unsafe `href` links, and missing `disabled={isSubmitting}` locks.'
  },
  {
    id: 'C',
    code: 'Section C',
    title: 'Advanced AI Engineering & Production Review (Advanced)',
    subtitle: 'Multi-file planning, adversarial PR vulnerability audits, RAG isolation, and human-in-the-loop tool guards.',
    keyPrinciples: [
      'Sequence cross-stack changes cleanly: Types -> DB/Rules -> Backend -> Frontend -> Tests.',
      'Run deterministic `tsc --noEmit`, ESLint, and tests FIRST—then run adversarial `git diff` PR reviews.',
      'Keep LLM API keys exclusively on backend `/api/*` endpoints with rate limits and per-tenant quotas.',
      'Require explicit human approval gates before AI tools execute external emails, refunds, or deletes.'
    ],
    promptTemplates: [
      {
        title: 'Adversarial Git Diff Security Audit',
        goal: 'Scan a PR diff for OWASP API Top 10 & concurrency bugs before merge.',
        template:
          'Act as a strict AppSec auditor reviewing this sanitized `git diff`. Flag ONLY concrete bugs across: IDOR/BOLA, SQL injection, mass assignment, XSS/unsafe URLs, race conditions, DB pool leaks, and exposed secrets. Provide exact hardened code fixes.'
      },
      {
        title: 'Human-in-the-Loop Agent Guardrail Review',
        goal: 'Verify tool-calling loops cannot execute unapproved mutations or leak tenant records.',
        template:
          'Audit this AI tool dispatcher for: (1) server-pinned tenant ID (not LLM-supplied), (2) atomic pending-action human confirmation before mutations, (3) hard MAX_STEPS loop cap, and (4) deterministic math outside LLM.'
      }
    ],
    securityNotice:
      'Never delegate auth checks, SQL filtering, financial arithmetic, or unconfirmed destructive mutations to an LLM.'
  }
];

export const AI_DEVELOPMENT_LAB_CHALLENGES: AiLabChallenge[] = [
  {
    id: 'ailab_chall_1',
    trackLevel: 'intermediate',
    category: 'fundamentals',
    title: 'Challenge 1: Spec-to-Schema for an SME Booking App',
    problemStatement:
      'Convert a Lagos salon/barbershop owner’s request ("Clients keep missing WhatsApp appointments and forgetting deposits") into clean TypeScript types, component layout, and owner-scoped Firestore rules.',
    samplePrompt:
      'Act as a React + TypeScript + Firebase architect. Create a technical spec for a Salon Booking Tracker.\nInclude: TypeScript interfaces (`status: "pending_deposit" | "confirmed" | "completed" | "cancelled"`), 3 core components, owner-scoped Firestore rules (no `if true`), and mobile empty/loading states. Use placeholder sample data only.',
    expectedAiOutput:
      'Clean `BookingRecord` interface, `BookingForm` + `BookingList` + `bookingService.ts`, and `request.auth.uid == resource.data.ownerId` rules.',
    learnerTask:
      'Draft your specification prompt for a local business need, audit the generated TypeScript interfaces (replace any loose strings/`any`), and confirm Firestore rules forbid unauthenticated reads/writes.',
    codeReviewChecklist: [
      'Literal union status types replace loose arbitrary strings',
      'Zero `any` escapes anywhere in interfaces',
      'Firestore rules verify `ownerId == request.auth.uid` and allowlist fields',
      'Zero real customer names, phone numbers, or keys in prompt'
    ],
    securityReminder:
      'Use dummy sample phone numbers like +234-800-000-0000—never paste real client contacts into AI tools.'
  },
  {
    id: 'ailab_chall_2',
    trackLevel: 'intermediate',
    category: 'app_building',
    title: 'Challenge 2: Inspect & Fix Buggy AI-Generated React Code',
    problemStatement:
      'An AI assistant generated this snippet: `items.map((x, idx) => <div key={idx} onClick={deleteItem(x.id)} class="bg-${color}-500">{x.name}</div>)`. Identify and fix all 4 defects.',
    samplePrompt:
      'Review this React TSX snippet and identify every React, TypeScript, Tailwind CSS, and accessibility bug—then output the fixed, strictly typed code:\n`items.map((x, idx) => <div key={idx} onClick={deleteItem(x.id)} class="bg-${color}-500">{x.name}</div>)`',
    expectedAiOutput:
      'Catches: (1) `class=` instead of `className=`, (2) dynamic `bg-${color}-500` stripped by Tailwind build, (3) `onClick={deleteItem(x.id)}` invoking immediately on render instead of `() => deleteItem(x.id)`, (4) `key={idx}` instead of `key={x.id}`, plus clickable `<div>` instead of semantic `<button>`.',
    learnerTask:
      'Write down your own fix BEFORE checking AI, then compare whether the AI caught all 5 defects including accessibility `<button>` semantics.',
    codeReviewChecklist: [
      'Replaced `class=` with `className=`',
      'Replaced dynamic `bg-${color}-500` with complete static Tailwind map',
      'Wrapped click handler as `() => deleteItem(x.id)`',
      'Used unique `key={x.id}` and semantic `<button type="button">`'
    ],
    securityReminder:
      'Never paste generated code into production until you understand every prop, event handler, and class string.'
  },
  {
    id: 'ailab_chall_3',
    trackLevel: 'advanced',
    category: 'advanced_engineering',
    title: 'Challenge 3: Harden an Express + PostgreSQL AI Endpoint Against OWASP Flaws',
    problemStatement:
      'An indie developer wrote a quick `/api/ai/analyze` POST route reading `workspaceId` from `req.body`, querying SQL with string interpolation, and calling Gemini using `VITE_GEMINI_KEY` on the client.',
    samplePrompt:
      'Refactor this architecture to pass an OWASP security audit:\n1. Move AI SDK strictly behind authenticated Express `/api/ai/analyze`\n2. Pin `workspaceId` from server-verified auth membership\n3. Parameterize all SQL queries (`$1, $2`)\n4. Enforce rate limiting, input char caps, and atomic credit deduction.',
    expectedAiOutput:
      'Server-only `process.env.GEMINI_API_KEY` route with `requireAuth`, parameterized SQL, Zod payload validation, rate limiter, and atomic credit reservation.',
    learnerTask:
      'Draft the refactored Express handler and run through every security checklist item below to verify zero remaining gaps.',
    codeReviewChecklist: [
      'Zero `VITE_` AI keys anywhere in client source',
      '`workspaceId` derived strictly from verified auth + membership check (no IDOR)',
      'SQL uses `$1, $2` parameters exclusively',
      'Rate limiter (429) and input length bounds enforced'
    ],
    securityReminder:
      'Client `VITE_` env variables are publicly readable by every browser visitor—keep AI, DB, and payment secrets strictly on Express.'
  },
  {
    id: 'ailab_chall_4',
    trackLevel: 'advanced',
    category: 'advanced_engineering',
    title: 'Challenge 4: Human-in-the-Loop Tool Calling & Atomic Execution',
    problemStatement:
      'Design a safe AI Operations Assistant that answers read-only stock queries immediately while requiring explicit human confirmation before issuing supplier purchase orders.',
    samplePrompt:
      'Design a TypeScript Express + PostgreSQL tool-calling workflow with:\n- Read tool `get_low_stock` (runs immediately, tenant-pinned)\n- Proposal tool `propose_purchase_order` (inserts `pending_agent_actions` with expiry, does NOT send email/payment)\n- `POST /api/actions/:id/confirm` using atomic SQL `WHERE status = "pending" AND expires_at > NOW() RETURNING *`.',
    expectedAiOutput:
      'Clean two-phase proposal/approval architecture preventing prompt-injected autonomous purchases and double-click duplicate executions.',
    learnerTask:
      'Specify and review the pending-action schema, preview card, and atomic confirmation handler in the workspace below.',
    codeReviewChecklist: [
      'Mutating tool creates only a pending proposal (never auto-executes)',
      'Confirm endpoint verifies caller RBAC role and workspace membership',
      'Atomic SQL `WHERE status = "pending"` stops double-click duplicate orders',
      'Loop enforces `MAX_STEPS` cap to stop infinite reasoning loops'
    ],
    securityReminder:
      'Consequential actions (payments, external emails, record deletions) require explicit human confirmation.'
  }
];
