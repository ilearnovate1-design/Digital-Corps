import { AcademyCourse } from '../../../types';
import { WEB_DEV_ADVANCED_MODULES_1_TO_5 } from './webDevAdvancedModules1to5';
import { WEB_DEV_ADVANCED_MODULES_6_TO_9 } from './webDevAdvancedModules6to9';

export const COURSE_WEB_DEV_ADVANCED: AcademyCourse = {
  courseId: 'web-development-advanced',
  categoryId: 'web_development_academy',
  title: 'Advanced – AI-Powered Full-Stack Development',
  subtitle: 'Node.js, PostgreSQL, OWASP Security, RAG, Tool-Calling Agents, CI/CD & Production Scaling',
  description:
    'Engineer production-grade, security-hardened, AI-powered full-stack SaaS applications. Master layered Node.js backends, normalized PostgreSQL & ACID transactions, OWASP RBAC/IDOR defenses, server-side LLM APIs with RAG and human-in-the-loop tool calling, automated CI/CD, and cloud cost/performance optimization.',
  difficulty: 'Advanced',
  level: 'advanced',
  prerequisites: [
    'Intermediate Modern Web Development (React, TypeScript, REST APIs, Firebase/Full-Stack) or strong placement evaluation'
  ],
  targetAudience:
    'Intermediate React/TypeScript developers and corps members aiming for full-stack software engineering, SaaS architecture, and production AI system integration roles.',
  entryRequirements:
    'Strong command of React, TypeScript, Tailwind CSS, REST APIs, Git workflows, and basic full-stack persistence.',
  requirements: [
    'Node.js LTS (v20+), PostgreSQL (local or Cloud SQL/Supabase), and Git',
    'GitHub account for Actions CI/CD workflows',
    'Server-side LLM API key configured exclusively in backend environment secrets (never in client code)'
  ],
  expectedDuration: '10–12 Weeks (Self-Paced)',
  active: true,
  version: '1.0.0',
  themeColor: 'purple',
  iconName: 'ServerCog',
  learningObjectives: [
    {
      id: 'WDA-FE-01',
      code: 'WDA-FE-01',
      title: 'High-Performance & Resilient React UIs',
      description: 'Apply route code-splitting, pure useReducer workflows with optimistic rollback, WCAG AA access, and Error Boundaries.'
    },
    {
      id: 'WDA-BE-02',
      code: 'WDA-BE-02',
      title: 'Production Node.js & Express Architecture',
      description: 'Decouple routes/controllers/services, centralize errors, enforce rate limits/idempotency, and verify HMAC webhooks.'
    },
    {
      id: 'WDA-SQL-03',
      code: 'WDA-SQL-03',
      title: 'PostgreSQL Modeling, Performance & ACID Safety',
      description: 'Build normalized schemas with integer minor currency units, parameterized SQL, composite indexes, and atomic transactions.'
    },
    {
      id: 'WDA-SEC-04',
      code: 'WDA-SEC-04',
      title: 'Auth, Multi-Tenant RBAC & OWASP Defenses',
      description: 'Enforce token verification, tenant-scoped IDOR prevention, allowlist Zod validation, URL sanitization, and audit logs.'
    },
    {
      id: 'WDA-AIAPI-05',
      code: 'WDA-AIAPI-05',
      title: 'Server-Side AI APIs, Structured JSON & RAG',
      description: 'Integrate LLM APIs securely on backend routes using schema validation, tenant-isolated RAG, and prompt-injection guards.'
    },
    {
      id: 'WDA-AGENT-06',
      code: 'WDA-AGENT-06',
      title: 'Bounded AI Agents & Human-in-the-Loop Approvals',
      description: 'Design tenant-pinned tools, mandatory human confirmation for consequential mutations, and step-capped agent traces.'
    },
    {
      id: 'WDA-AISOFT-07',
      code: 'WDA-AISOFT-07',
      title: 'Senior AI-Assisted Software Engineering',
      description: 'Lead multi-file architectural plans, adversarial PR security reviews, negative test generation, and strict verify gates.'
    },
    {
      id: 'WDA-CICD-08',
      code: 'WDA-CICD-08',
      title: 'Integration Testing, GitHub Actions CI/CD & Cloud Deploy',
      description: 'Run automated API contract suites, `npm ci` CI workflows, safe Express SPA routing, and health-checked rollouts.'
    },
    {
      id: 'WDA-SCALE-09',
      code: 'WDA-SCALE-09',
      title: 'Caching, Monitoring & LLM Unit Economics',
      description: 'Implement cursor pagination, tenant-safe bounded caches, Golden Signals monitoring, and AI quota/cost controls.'
    }
  ],
  modules: [...WEB_DEV_ADVANCED_MODULES_1_TO_5, ...WEB_DEV_ADVANCED_MODULES_6_TO_9],
  practicalProjects: [
    {
      id: 'proj_wda_1',
      title: 'REST API Backend with Database Persistence',
      summary: 'Layered Node.js + Express + PostgreSQL API featuring parameterized SQL, centralized errors, and rate limiting.',
      deliverables: ['Normalized schema + controller/service/repo layers + HTTP error middleware']
    },
    {
      id: 'proj_wda_2',
      title: 'Role-Based Authentication System (RBAC + IDOR-Proof)',
      summary: 'Multi-tenant auth system verifying Bearer tokens server-side with owner/admin/member RBAC and append-only audit logs.',
      deliverables: ['Auth + RBAC middleware + cross-tenant IDOR negative integration tests']
    },
    {
      id: 'proj_wda_3',
      title: 'AI Content or Workflow Generator',
      summary: 'Quota-protected server-side `/api/ai/*` endpoint returning schema-validated JSON with deterministic code verification.',
      deliverables: ['Server-only AI gateway + runtime JSON schema validator + quota guard']
    },
    {
      id: 'proj_wda_4',
      title: 'Document Q&A / RAG Prototype',
      summary: 'Tenant-isolated chunking, retrieval, and grounded citation prompt pipeline mitigating indirect prompt injection.',
      deliverables: ['Chunker + workspace-filtered retrieval + delimiter-hardened grounded prompts']
    },
    {
      id: 'proj_wda_5',
      title: 'Full AI-Powered SaaS Capstone Application',
      summary: 'Production-deployed multi-tenant SaaS uniting React, Node.js, DB, auth, admin dashboard, AI tools with human approval, CI/CD, and tests.',
      deliverables: ['All 11 Capstone deliverables live over HTTPS + public GitHub repo + CI badge']
    }
  ],
  starterProjectTemplates: [
    {
      id: 'tpl_wda_saas',
      title: 'Full-Stack AI SaaS Backend + Security Starter Kit',
      description:
        'Modular Node.js + TypeScript Express architecture demonstrating centralized errors, bounded rate limiting, server-only AI gateway scaffolding, and atomic HITL proposal handling.',
      setupCommand: 'npm install express pg zod && npm install -D tsx typescript @types/express',
      files: [
        {
          path: 'server/middleware/errorMiddleware.ts',
          content: `import type { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  constructor(public readonly statusCode: number, message: string) {
    super(message);
  }
}

export function errorMiddleware(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, error: err.message });
  }
  console.error('[UnhandledError]', err);
  return res.status(500).json({ success: false, error: 'Internal server error' });
}`
        },
        {
          path: 'server/middleware/rateLimit.ts',
          content: `import type { Request, Response, NextFunction } from 'express';

export function createRateLimiter(maxRequests: number, windowMs: number) {
  const buckets = new Map<string, { count: number; resetAt: number }>();
  return (req: Request, res: Response, next: NextFunction) => {
    const key = req.ip || 'anon';
    const now = Date.now();
    const current = buckets.get(key);
    if (!current || current.resetAt <= now) {
      buckets.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }
    if (current.count >= maxRequests) {
      return res.status(429).json({ success: false, error: 'Too many requests. Retry shortly.' });
    }
    current.count += 1;
    return next();
  };
}`
        },
        {
          path: '.github/workflows/ci.yml',
          content: `name: Full-Stack Verify
on: [push, pull_request]
jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci
      - run: npx tsc --noEmit && npm run lint && npm test && npm run build`
        }
      ]
    }
  ],
  capstoneProject: {
    title: 'Build an AI-Powered SaaS Application',
    overview:
      'Architect, implement, security-harden, test with CI/CD, and deploy a multi-tenant AI-Powered SaaS web application integrating a React frontend, Node.js backend, relational/document database, authentication & RBAC, admin dashboard, and guarded server-side AI workflows.',
    deliverables: [
      'Accessible React + TypeScript + Tailwind frontend (with code-splitting & ErrorBoundary)',
      'Layered Node.js + Express backend (routes, services, error middleware, rate limiting)',
      'PostgreSQL / Firestore database with normalized/scoped modeling & ACID/atomic guarantees',
      'Server-verified Authentication, RBAC roles, and multi-tenant IDOR protection',
      'Dedicated Admin Operations & Analytics Dashboard',
      'Server-side AI feature (Structured Output / RAG / Tool Calling) with ZERO exposed client keys',
      'Human-in-the-loop confirmation gate on any consequential AI mutations + AI quota limits',
      'Automated unit + HTTP integration/security test suite (covering 401/403/400 negative paths)',
      'GitHub Actions CI workflow (`.github/workflows/ci.yml`) + `.env.example` + README docs',
      'Public GitHub Repository URL',
      'Live Deployed HTTPS Application URL'
    ],
    instructions: [
      'Write a short Architecture Decision Record (ADR) outlining multi-tenant schema, RBAC model, AI guardrails, and cost controls.',
      'Build backend API routes enforcing auth verification, allowlist input validation, rate limiting, and atomic SQL/Firestore operations.',
      'Keep all LLM SDK calls exclusively on backend routes, validating JSON outputs and gating consequential mutations on explicit human approval.',
      'Configure CI verification (`tsc`, `lint`, tests, `build`), deploy live, and verify `/api/health` + end-to-end flows.'
    ],
    assessmentCriteria: [
      'Clean full-stack architecture separating UI, backend services, and persistence',
      'Rigorous OWASP security: auth/RBAC, IDOR prevention, input validation, zero leaked secrets',
      'Safe production AI engineering: server-only keys, structured validation, tenant-scoped RAG or HITL approvals, quotas',
      'Automated tests, GitHub Actions CI pipeline, observability, and live working HTTPS deployment'
    ],
    rubric: [
      {
        id: 'rub_wda_1',
        criterion: 'Full-Stack Architecture & Database Integrity',
        description: 'Layered React + Express + DB engineering, normalized/scoped data, atomic transactions, and Admin dashboard.',
        weight: 25
      },
      {
        id: 'rub_wda_2',
        criterion: 'OWASP Security, Auth & RBAC Enforcement',
        description: 'Server-verified tokens, zero IDOR, strict allowlist validation, safe URLs, and rate limiting.',
        weight: 25
      },
      {
        id: 'rub_wda_3',
        criterion: 'AI Engineering, RAG/Tools & Cost Controls',
        description: 'Server-side AI proxy, schema checks, tenant isolation, human-in-the-loop gates, and quota limits.',
        weight: 25
      },
      {
        id: 'rub_wda_4',
        criterion: 'Testing, CI/CD & Live Deployment',
        description: 'Unit + API integration tests, green CI config, documentation, GitHub repo, and live HTTPS app.',
        weight: 25
      }
    ],
    submissionGuidelines:
      'Submit your Capstone with your public GitHub Repository URL, Live Deployed HTTPS URL, architecture & AI security summary, and test/CI verification evidence.'
  },
  finalAssessment: [
    {
      id: 'fa_wda_1',
      moduleId: 'mod_wda_1',
      questionText: 'How does `React.lazy(() => import("./AdminPanel"))` paired with `<Suspense>` improve performance?',
      options: [
        'Defers downloading heavy secondary route JS chunks until the user actually navigates to them',
        'Executes SQL inside the browser',
        'Eliminates TypeScript compilation',
        'Disables CSS caching'
      ],
      correctAnswer: 0,
      explanation: 'Code splitting shrinks initial mobile bundle downloads cleanly.'
    },
    {
      id: 'fa_wda_2',
      moduleId: 'mod_wda_1',
      questionText: 'When using optimistic UI toggles, what MUST happen inside `catch` if the server request rejects?',
      options: [
        'Roll back state cleanly to the pre-change snapshot and inform the user',
        'Leave the fake optimistic success displayed forever',
        'Clear browser history',
        'Force reload the server'
      ],
      correctAnswer: 0,
      explanation: 'Snapshot rollback ensures client UI never stays out of sync with true server state.'
    },
    {
      id: 'fa_wda_3',
      moduleId: 'mod_wda_2',
      questionText: 'Why must Express centralized error middleware define four parameters `(err, req, res, next)` and stay registered after routes?',
      options: [
        'Express identifies error middleware strictly by its 4-argument signature and invokes it when earlier routes pass/throw errors',
        'Because Express supports max 4 routes',
        'Because JSON requires 4 keys',
        'To enable HTTPS automatically'
      ],
      correctAnswer: 0,
      explanation: 'Omitting the 4th `next` parameter breaks Express error middleware matching.'
    },
    {
      id: 'fa_wda_4',
      moduleId: 'mod_wda_2',
      questionText: 'How should payment gateway webhooks (like Paystack/Stripe) be verified before activating subscriptions?',
      options: [
        'Verify the HMAC cryptographic signature header against the exact raw request body bytes using `timingSafeEqual`',
        'Trust `req.body.status === "success"` directly',
        'Check browser CSS theme',
        'Trust `req.headers["user-agent"]`'
      ],
      correctAnswer: 0,
      explanation: 'Unverified webhooks allow any attacker to POST fake payment confirmations.'
    },
    {
      id: 'fa_wda_5',
      moduleId: 'mod_wda_2',
      questionText: 'What prevents duplicate charges or double record creation when slow 3G retries the exact same POST?',
      options: ['Idempotency-Key deduplication on the server', 'Using `let` variables', 'Adding React Fragments', 'Disabling TLS'],
      correctAnswer: 0,
      explanation: 'Idempotency stores/checks unique client request keys before executing side effects twice.'
    },
    {
      id: 'fa_wda_6',
      moduleId: 'mod_wda_3',
      questionText: 'Which SQL column types prevent floating-point rounding bugs on currency amounts?',
      options: ['BIGINT minor units (kobo/cents) or fixed `NUMERIC(14, 2)`', 'FLOAT / REAL', 'VARCHAR without checks', 'BOOLEAN'],
      correctAnswer: 0,
      explanation: 'Exact integer minor units or fixed NUMERIC avoid IEEE-754 drift.'
    },
    {
      id: 'fa_wda_7',
      moduleId: 'mod_wda_3',
      questionText: 'How do you neutralize SQL Injection across dynamic `ORDER BY` sort columns when `$1` value placeholders cannot bind identifiers?',
      options: [
        'Map user sort keys through a strict server-side allowlist object before building the SQL query',
        'Interpolate `${req.query.sort}` directly',
        'Strip only single quotes in React',
        'Pass `sort` in localStorage'
      ],
      correctAnswer: 0,
      explanation: 'Strict allowlist mapping rejects arbitrary SQL clauses injected via sort params.'
    },
    {
      id: 'fa_wda_8',
      moduleId: 'mod_wda_3',
      questionText: 'Which SQL pattern eliminates race conditions when deducting scarce stock or AI credits concurrently?',
      options: [
        'Atomic `UPDATE ... SET balance = balance - $1 WHERE id = $2 AND balance >= $1 RETURNING balance` inside a transaction',
        'Reading balance in JS, waiting 10ms, then updating blindly',
        'Dropping foreign keys',
        'Running two unrelated SELECTs'
      ],
      correctAnswer: 0,
      explanation: 'Atomic SQL preconditions prevent concurrent overdraws.'
    },
    {
      id: 'fa_wda_9',
      moduleId: 'mod_wda_4',
      questionText: 'How does an API prevent IDOR (Broken Object Level Authorization) on `GET /api/invoices/:id`?',
      options: [
        'Require verified auth identity AND filter the query by the caller’s verified tenant/workspace ownership',
        'Use long UUIDs alone with no ownership check',
        'Hide the edit button in React',
        'Check `req.body.userId` sent by the browser'
      ],
      correctAnswer: 0,
      explanation: 'Every object access must verify caller authorization on the backend.'
    },
    {
      id: 'fa_wda_10',
      moduleId: 'mod_wda_4',
      questionText: 'What security risk does validating `<a href={userUrl}>` strictly for `https:`/`http:` prevent?',
      options: [
        'Stored XSS execution via malicious `javascript:` URIs',
        'SQL injection',
        'Missing `viewport` meta tag',
        'Dead database connections'
      ],
      correctAnswer: 0,
      explanation: 'Protocol checks neutralize executable URI payloads.'
    },
    {
      id: 'fa_wda_11',
      moduleId: 'mod_wda_4',
      questionText: 'Why must spreading `...req.body` directly into a database insert/update be avoided?',
      options: [
        'Attackers can inject unexpected privilege or pricing fields like `role: "admin"` (mass assignment)',
        'Spread syntax fails in Node.js',
        'PostgreSQL forbids JSON keys',
        'Express deletes `req.body`'
      ],
      correctAnswer: 0,
      explanation: 'Validate against strict schemas and pick explicit allowlisted fields.'
    },
    {
      id: 'fa_wda_12',
      moduleId: 'mod_wda_5',
      questionText: 'Where must `@google/genai` API keys and model calls execute in production?',
      options: [
        'Exclusively inside authenticated server `/api/*` endpoints reading `process.env` secrets',
        'Inside client React components using `VITE_` env variables',
        'Inside browser `localStorage`',
        'Inside `index.html` script tags'
      ],
      correctAnswer: 0,
      explanation: 'Keeping LLM keys server-side prevents instant theft and unauthorized billing.'
    },
    {
      id: 'fa_wda_13',
      moduleId: 'mod_wda_5',
      questionText: 'When an LLM extracts structured line items from a receipt, how should financial totals be produced?',
      options: [
        'Recomputed deterministically in backend TypeScript/SQL code from validated line items',
        'Trusted directly from the LLM’s text arithmetic',
        'Estimated in CSS',
        'Ignored completely'
      ],
      correctAnswer: 0,
      explanation: 'Deterministic code guarantees exact math without probabilistic drift.'
    },
    {
      id: 'fa_wda_14',
      moduleId: 'mod_wda_5',
      questionText: 'How must multi-tenant RAG systems prevent Tenant A from seeing Tenant B’s documents?',
      options: [
        'Enforce `WHERE workspace_id = $1` (matching verified caller tenant) directly inside the retrieval query',
        'Politely ask the LLM in the system prompt not to mention other companies',
        'Hide citations with CSS `opacity-0`',
        'Skip authentication on `/api/rag`'
      ],
      correctAnswer: 0,
      explanation: 'Tenant isolation must happen deterministically at the retrieval query boundary.'
    },
    {
      id: 'fa_wda_15',
      moduleId: 'mod_wda_6',
      questionText: 'Why must consequential AI agent actions (sending emails, refunds, deletes) pause for human confirmation?',
      options: [
        'Autonomous prompt-injected or misread tool calls can cause irreversible real-world or financial harm without human oversight',
        'Because Node.js cannot run POST requests twice',
        'To slow down UI CSS transitions',
        'Because PostgreSQL bans triggers'
      ],
      correctAnswer: 0,
      explanation: 'Human-in-the-loop proposals preserve safety and accountability.'
    },
    {
      id: 'fa_wda_16',
      moduleId: 'mod_wda_6',
      questionText: 'Why enforce `MAX_STEPS` caps and timeouts on AI agent tool-calling loops?',
      options: [
        'To prevent runaway infinite loops from exhausting token budgets and hanging server workers',
        'Because TypeScript forbids `for` loops above 5',
        'To disable `ErrorBoundary`',
        'To bypass CORS'
      ],
      correctAnswer: 0,
      explanation: 'Step and latency caps bound cost and failure blast radius.'
    },
    {
      id: 'fa_wda_17',
      moduleId: 'mod_wda_7',
      questionText: 'Why verify AI-generated unit tests by testing whether an intentional bug causes them to fail?',
      options: [
        'Over-mocked or tautological tests pass even when real business logic is broken',
        'Vite crashes unless tests fail once',
        'TypeScript ignores `.test.ts` files otherwise',
        'To delete production logs'
      ],
      correctAnswer: 0,
      explanation: 'Ensuring tests reject broken logic proves they add real regression safety.'
    },
    {
      id: 'fa_wda_18',
      moduleId: 'mod_wda_8',
      questionText: 'What happens in production if `app.get("*", ... sendFile("dist/index.html"))` is registered BEFORE `/api/quotes`?',
      options: [
        'The SPA wildcard catches `/api/quotes` and returns HTML instead of API JSON',
        'PostgreSQL optimizes indexes automatically',
        'GitHub Actions skips `npm ci`',
        'React mounts faster'
      ],
      correctAnswer: 0,
      explanation: 'API routes must always precede wildcard SPA fallbacks.'
    },
    {
      id: 'fa_wda_19',
      moduleId: 'mod_wda_8',
      questionText: 'Why use `npm ci` inside `.github/workflows/ci.yml`?',
      options: [
        'Installs exact pinned lockfile versions reproducibly and fails if `package.json` drifted',
        'Bypasses `node_modules` completely',
        'Auto-rotates secret keys',
        'Deploys directly without building'
      ],
      correctAnswer: 0,
      explanation: 'Reproducible CI installs prevent dependency surprise bugs.'
    },
    {
      id: 'fa_wda_20',
      moduleId: 'mod_wda_9',
      questionText: 'Which combination protects both latency and profit margins in a live multi-tenant AI SaaS?',
      options: [
        'Cursor pagination, tenant-scoped bounded caches, Flash-tier model routing, RAG chunk limits, and per-tenant quotas',
        'Uncached `OFFSET 50000` queries + sending entire databases to heavyweight models with no rate limits',
        'Shared global cache keys across all tenants',
        'Exposing LLM keys in client JS to offload server CPU'
      ],
      correctAnswer: 0,
      explanation: 'Scalable systems unite efficient data access, tenant isolation, smart model tiering, and real-time quotas.'
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
