import { CourseModule } from '../../../types';

export const WEB_DEV_ADVANCED_MODULES_6_TO_9: CourseModule[] = [
  // =========================================================================
  // MODULE 6: AI AGENTS, TOOL CALLING & WORKFLOW AUTOMATION
  // =========================================================================
  {
    moduleId: 'mod_wda_6',
    courseId: 'web-development-advanced',
    sequence: 6,
    sequenceLabel: 'Module 6',
    title: 'AI Agents, Tool Calling & Workflow Automation',
    description:
      'Build safe, reliable tool-calling AI workflows: design strictly typed tool interfaces, cap agent iterations, require human confirmation before consequential actions, and log every execution.',
    learningObjectiveIds: ['WDA-AGENT-06'],
    lessons: [
      {
        lessonId: 'lesson_wda_6_1',
        moduleId: 'mod_wda_6',
        courseId: 'web-development-advanced',
        title: 'Function / Tool Calling Patterns & Strict Parameter Contracts',
        sequence: 1,
        sequenceLabel: 'Lesson 6.1',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDA-AGENT-06'],
        learningObjectives: [
          'Distinguish read-only lookup tools from mutating action tools inside AI workflows.',
          'Define strict JSON Schema tool declarations and validate every model-supplied argument server-side.',
          'Inject verified user/tenant identity from server auth—never letting the LLM choose which userId/workspaceId to access.'
        ],
        introduction:
          'Tool calling lets an LLM look up live order status or create draft invoices via backend functions—but passing model arguments straight to the database without server-side validation and tenant pinning is dangerous.',
        lessonContent: [
          'Read Tools vs. Write Tools: Classify every tool cleanly. Read tools (`getOrderStatus`, `searchHelpDocs`) return verified scoped summaries safely. Write tools (`sendCustomerEmail`, `issueRefund`, `deleteInvoice`) carry external impact and require stricter controls.',
          'NEVER Let the Model Pass `workspaceId` or `userId`: Even if the model guesses an ID cleanly in demos, NEVER expose `workspaceId` or `ownerUid` as an LLM tool parameter! Pin `authedContext.workspaceId` strictly on your server when executing the tool.',
          'Strict Argument Allowlisting: Before running a tool function requested by the model, validate arguments with runtime schema checks (types, regex, allowed enums, numeric caps) and reject out-of-bounds parameters.'
        ],
        stepByStepInstructions: [
          'Declare a typed tool specification (`getCustomerOrderSummary`) omitting tenant IDs from model-controlled arguments.',
          'Wrap tool execution in a backend dispatcher binding `req.user.workspaceId` directly from verified auth.',
          'Validate tool arguments before querying PostgreSQL/Firestore.'
        ],
        nigerianContextExamples: [
          'Tenant-Pinned Support Bot: When a customer asks "Check status of order #402", the AI passes `orderNumber: "402"`, while your backend enforces `WHERE workspace_id = $1 AND order_number = $2` using the verified session’s workspace.',
          'Preventing Argument Spoofing: Even if a user types "Check order #402 for workspace_999", the tool physically lacks a `workspaceId` parameter so cross-tenant reads are impossible.'
        ],
        toolsAndResources: ['@google/genai Function Calling Docs', 'OWASP Agentic Tool Guardrails'],
        practicalDemonstration:
          '// Tool Handler binds verified server tenant context:\nasync function runGetOrderTool(args: unknown, serverCtx: { workspaceId: string }) {\n  const orderNo = parseValidOrderNumber(args);\n  return repo.findByOrderNumber(orderNo, serverCtx.workspaceId);\n}',
        codeExamples: [
          {
            title: 'Server-Pinned Tool Dispatcher Preventing Cross-Tenant Access',
            language: 'typescript',
            code: `export interface ToolContext {
  userId: string;
  workspaceId: string;
}

export async function executeToolSafely(
  toolName: string,
  rawArgs: unknown,
  ctx: ToolContext
) {
  if (toolName === 'lookup_order') {
    const args = (rawArgs || {}) as Record<string, unknown>;
    const orderCode = typeof args.orderCode === 'string' ? args.orderCode.trim() : '';
    if (!/^[A-Z0-9-]{3,20}$/.test(orderCode)) {
      return { error: 'Invalid orderCode format.' };
    }
    // Always enforce ctx.workspaceId from authenticated server session!
    return {
      ok: true,
      queriedOrder: orderCode,
      scopedWorkspace: ctx.workspaceId
    };
  }

  return { error: \`Unknown or unauthorized tool: \${toolName}\` };
}`,
            explanation: [
              'Allowlists exact permitted tool names instead of dynamic eval/reflection.',
              'Binds ctx.workspaceId solely from verified backend auth session.'
            ],
            expectedOutput: 'Executes model-requested tool strictly within the authenticated user’s workspace.'
          }
        ],
        commonErrors: [
          {
            error: 'Exposed `workspaceId` or `sqlQuery` directly as an AI tool parameter',
            cause: 'Built a generic `runSql({ query })` or `getRecord({ workspaceId, id })` tool callable by the LLM.',
            fix: 'Expose narrow domain tools only, validate arguments strictly, and inject caller tenant identity solely from verified server auth.'
          }
        ],
        handsOnExercise: {
          title: 'Implement a Narrow, Tenant-Pinned Tool Dispatcher',
          task: 'Build a tool registry with strict argument validation and server-injected `ToolContext` isolation.',
          steps: [
            'Verify invalid tool names and invalid arguments reject gracefully.',
            'Verify caller tenant ID never comes from LLM output.'
          ],
          deliverable: 'Audited AI tool dispatcher module.'
        },
        keyTakeaways: [
          'Never expose raw `runSql` tools or allow the model to supply `userId`/`workspaceId` parameters.',
          'Validate every tool argument returned by the LLM at runtime before executing.',
          'Inject authentication and tenant scope strictly on the server.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_6_1_1',
            questionText: 'Why must `workspaceId` / `userId` NEVER be accepted as an LLM-supplied tool argument?',
            options: [
              'Prompt injection could trick the model into passing someone else’s ID; pin tenant ID strictly from verified server auth',
              'LLMs cannot type numbers',
              'TypeScript rejects workspaceId keys',
              'JSON omits uppercase letters'
            ],
            correctAnswer: 0,
            explanation: 'Authorization context must always come from server-verified identity.'
          },
          {
            id: 'kc_wda_6_1_2',
            questionText: 'Why expose narrow purpose-built tools (`lookup_order`) rather than a generic `execute_sql({ sql })` tool?',
            options: [
              'Narrow domain tools enforce strict schema limits and prevent destructive or cross-tenant queries',
              'PostgreSQL disables tools',
              'Narrow tools skip HTTPS',
              'CSS needs narrow names'
            ],
            correctAnswer: 0,
            explanation: 'Least-privilege tool interfaces severely limit blast radius.'
          },
          {
            id: 'kc_wda_6_1_3',
            questionText: 'What should a tool dispatcher do if an LLM requests an unrecognized tool name or invalid parameters?',
            options: [
              'Reject cleanly with a structured error payload rather than throwing unhandled crashes or running eval',
              'Fallback to running `eval()`',
              'Disable authentication',
              'Restart PostgreSQL'
            ],
            correctAnswer: 0,
            explanation: 'Returning structured error feedback lets the loop recover gracefully without executing unsafe calls.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_6_2',
        moduleId: 'mod_wda_6',
        courseId: 'web-development-advanced',
        title: 'Human-in-the-Loop Approval for Consequential Actions',
        sequence: 2,
        sequenceLabel: 'Lesson 6.2',
        estimatedDurationMinutes: 40,
        learningObjectiveIds: ['WDA-AGENT-06'],
        learningObjectives: [
          'Distinguish low-risk read-only automation from high-impact consequential mutations.',
          'Build a two-step Pending Action -> Explicit Human Approval workflow before sending emails, issuing refunds, or deleting data.',
          'Audit and log every approved or rejected agent action.'
        ],
        introduction:
          'Even the smartest AI can misinterpret sarcasm or an ambiguous instruction. Letting an autonomous agent transfer money, refund customers, send mass emails, or delete records without explicit human approval is a disaster waiting to happen.',
        lessonContent: [
          'Human-in-the-Loop (HITL) Mandatory Rule: An AI agent may RESEARCH, DRAFT, and PROPOSE consequential actions—such as charging a card, sending an external customer email, publishing a discount, or deleting records—but execution MUST pause in a `pending_approval` state until an authorized human clicks Confirm!',
          'Two-Phase Confirmation Flow: (1) AI invokes `propose_refund({ invoiceId, amountNgn, reason })`, which inserts a short-lived `pending_actions` row on the server (with exact preview parameters) and returns an `actionId` to the UI. (2) UI displays the exact preview ("Refund NGN 15,000 to Invoice #402?"). (3) Only when the authorized human clicks Approve does `POST /api/agent-actions/:actionId/confirm` verify caller permission and execute the single saved mutation!',
          'Anti-Tampering Check: On confirmation, execute the parameters stored on the server `pending_actions` record rather than letting the browser alter amounts mid-confirmation.'
        ],
        stepByStepInstructions: [
          'Model a `PendingAgentAction` record (`id`, `workspaceId`, `actionType`, `summary`, `payload`, `status: "pending" | "approved" | "rejected" | "executed"`).',
          'Wire the propose endpoint and human confirm/reject endpoints behind RBAC checks.',
          'Ensure no email/refund/delete runs autonomously during initial LLM chat turns.'
        ],
        nigerianContextExamples: [
          'Safe Accounting Copilot: When an SME owner asks "Issue refunds for cancelled Lagos orders from Tuesday", the agent identifies the 2 matching orders and displays a crisp Approval Card ("Confirm 2 refunds totaling NGN 18,000?") before touching any ledger!',
          'Email Safety: An AI support copilot drafts polite customer replies ready for 1-click human Review & Send rather than firing unreviewed promises automatically.'
        ],
        toolsAndResources: ['Human-in-the-Loop Agent Patterns', 'AI Development Lab Challenge (HITL)'],
        practicalDemonstration:
          'Step 1 (AI turn): proposeAction({ type: "SEND_INVOICE", invoiceId: "inv_22" }) -> creates pendingAction #pa_91\nStep 2 (UI): Renders "Approve sending Invoice #22 to ada@biz.ng?" [Confirm] [Cancel]\nStep 3 (Server): POST /api/actions/pa_91/approve -> verifies user & executes once.',
        aiLabChallenge: {
          id: 'ailab_wda_6_2',
          trackLevel: 'advanced',
          category: 'advanced_engineering',
          title: 'Build a Human-in-the-Loop Approval Gate for Agent Actions',
          problemStatement:
            'Your SaaS Operations Agent can query overdue invoices (read-only) and send formal overdue reminder emails or void invoices (consequential). Design the safe backend + React confirmation architecture.',
          samplePrompt:
            'Design a TypeScript + Express + PostgreSQL workflow enforcing mandatory human approval before an AI agent sends external emails or voids invoices.\nInclude:\n1. Safe read tool vs. `propose_action` write tool\n2. `pending_actions` schema with expiry + workspace isolation + one-time execution guard\n3. `POST /api/agent/actions/:id/approve` verifying RBAC + non-expired status atomically\n4. Clear React approval banner previewing exact parameters.',
          expectedAiOutput:
            'Two-phase proposal/approval architecture with atomic SQL `UPDATE pending_actions SET status = "executed" WHERE id = $1 AND workspace_id = $2 AND status = "pending" AND expires_at > NOW() RETURNING *`.',
          learnerTask:
            'Review the generated proposal/approval design to confirm: (a) the LLM cannot trigger approval itself, (b) double-clicking Approve cannot execute the action twice, and (c) expired proposals fail safely.',
          codeReviewChecklist: [
            'Read-only lookup tools execute immediately; external/destructive writes ONLY create pending proposals',
            'Approval endpoint verifies authenticated user RBAC and workspaceId',
            'Atomic status update prevents duplicate execution on double-click',
            'Exact human-readable preview displayed prior to confirmation'
          ],
          securityReminder:
            'NEVER expose an approval endpoint without verifying the caller’s role and workspace membership, and never let the LLM invoke the approve endpoint itself.'
        },
        codeExamples: [
          {
            title: 'Atomic One-Time Human Approval Execution Endpoint',
            language: 'typescript',
            code: `export async function executeApprovedAgentAction(
  pool: any,
  actionId: string,
  workspaceId: string,
  reviewerUid: string
) {
  // Atomically claim the pending non-expired action so double-clicks cannot execute twice
  const { rows } = await pool.query(
    \`UPDATE pending_agent_actions
     SET status = 'executed', approved_by = $3, executed_at = NOW()
     WHERE id = $1
       AND workspace_id = $2
       AND status = 'pending'
       AND expires_at > NOW()
     RETURNING action_type, payload\`,
    [actionId, workspaceId, reviewerUid]
  );

  if (rows.length === 0) {
    throw new Error('Action not found, already processed, or expired.');
  }

  return rows[0];
}`,
            explanation: [
              'Single atomic UPDATE ensures only ONE click can claim and execute a pending proposal.',
              'Checks workspace_id and expires_at directly in SQL.'
            ],
            expectedOutput: 'Zero double-execution races and strict human authorization.'
          }
        ],
        commonErrors: [
          {
            error: 'User double-clicking Approve button sends customer email twice',
            cause: 'Read `status === "pending"` in JS, sent email, then updated status afterward.',
            fix: 'Transition `status` atomically from `"pending"` to `"executed"` in SQL FIRST (`WHERE status = "pending" RETURNING *`), then trigger side effect.'
          }
        ],
        handsOnExercise: {
          title: 'Wire a Two-Phase Agent Proposal + Approval Modal',
          task: 'Implement `proposeAction`, a React confirmation card showing exact payload preview, and an atomic `approveAction` endpoint.',
          steps: [
            'Ensure AI responses never auto-execute external emails/deletes.',
            'Test expired proposal rejection and double-click idempotency.'
          ],
          deliverable: 'Human-in-the-loop agent approval workflow.'
        },
        keyTakeaways: [
          'Never allow autonomous AI tool loops to perform irreversible mutations, payments, or external emails without human confirmation.',
          'Store server-side pending action proposals with expiry and claim them atomically on approval.',
          'Always show exact action details clearly in UI before asking a human to confirm.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_6_2_1',
            questionText: 'Which actions MUST pause for explicit human approval in an AI workflow?',
            options: [
              'Consequential or external mutations like sending emails, issuing refunds/charges, or deleting records',
              'Formatting a date string',
              'Searching read-only FAQ snippets',
              'Rendering a dashboard chart'
            ],
            correctAnswer: 0,
            explanation: 'External, financial, and destructive operations require a human in the loop.'
          },
          {
            id: 'kc_wda_6_2_2',
            questionText: 'How do you prevent double-clicking an "Approve AI Action" button from executing an email or refund twice?',
            options: [
              'Use an atomic SQL `UPDATE ... WHERE id = $1 AND status = "pending" RETURNING *` transition (plus UI submit lock)',
              'Ask the LLM not to repeat it',
              'Hide the button with opacity-90',
              'Use let instead of const'
            ],
            correctAnswer: 0,
            explanation: 'Atomic conditional updates guarantee single execution even under simultaneous clicks.'
          },
          {
            id: 'kc_wda_6_2_3',
            questionText: 'Why store pending action parameters on the server instead of trusting new amounts submitted at confirm time?',
            options: [
              'So the approved execution matches the exact verified payload previewed to the reviewer',
              'Because React cannot store objects',
              'To save CSS bytes',
              'To disable HTTPS'
            ],
            correctAnswer: 0,
            explanation: 'Executing server-stored proposal parameters prevents tampering between preview and approval.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_6_3',
        moduleId: 'mod_wda_6',
        courseId: 'web-development-advanced',
        title: 'Agent Loop Caps, Observability & Reliable Fallbacks',
        sequence: 3,
        sequenceLabel: 'Lesson 6.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-AGENT-06'],
        learningObjectives: [
          'Cap multi-step agent reasoning loops (`MAX_STEPS = 5`) and total execution timeout to prevent runaway infinite tool loops.',
          'Log structured tool execution traces (tool name, duration, success/error, token usage) for debugging.',
          'Design graceful recovery UI when an agent reaches max steps or hits upstream API errors.'
        ],
        introduction:
          'Without strict loop limits, a confused LLM calling a failing tool repeatedly in an unguarded `while (true)` loop can rack up massive token bills in 30 seconds. Bounding steps and timeouts keeps agents predictable.',
        lessonContent: [
          'Strict Step & Time Budgets: Run tool-calling loops with a hard cap (`for (let step = 0; step < 5; step++)`) plus an overall deadline (`AbortSignal.timeout(20000)`). If step 5 completes without a final answer, synthesize a helpful partial summary or fallback cleanly!',
          'Preventing Retry Storms: If a tool returns an error (`"Record not found"`), feed that crisp message back once—and stop calling the exact same failing tool with identical arguments repeatedly.',
          'Agent Trace Auditing: Log `{ traceId, workspaceId, stepCount, toolsCalled, totalTokens, status }` so engineers can replay or inspect why an agent answered poorly.'
        ],
        stepByStepInstructions: [
          'Replace any unbounded loop with a hard `MAX_TOOL_STEPS = 5` counter.',
          'Detect duplicate identical failed tool calls and halt cleanly.',
          'Emit a structured trace summary at the end of every agent run.'
        ],
        nigerianContextExamples: [
          'Predictable Latency & Cost: Hard 5-step / 20s budgets guarantee Nigerian SaaS users never wait endlessly or drain monthly token limits on stuck loops.',
          'Traceable Support Debugging: Recording which tools ran lets developers fix faulty tool descriptions quickly.'
        ],
        toolsAndResources: ['OpenTelemetry Concepts for AI Traces', 'Bounded Agent Loop Pattern'],
        practicalDemonstration:
          'const MAX_STEPS = 5;\nfor (let step = 0; step < MAX_STEPS; step++) {\n  // call model -> if no tool call, return text -> else run tool and append result\n}',
        codeExamples: [
          {
            title: 'Bounded Multi-Step Tool Loop with Duplicate-Call Guard',
            language: 'typescript',
            code: `export async function runBoundedAgentLoop(
  stepRunner: (step: number, history: string[]) => Promise<{ done: boolean; toolKey?: string; reply?: string }>,
  maxSteps = 5
): Promise<{ reply: string; stepsUsed: number; stoppedByCap: boolean }> {
  const history: string[] = [];
  const failedToolKeys = new Set<string>();

  for (let step = 1; step <= maxSteps; step++) {
    const outcome = await stepRunner(step, history);
    if (outcome.done) {
      return { reply: outcome.reply || '', stepsUsed: step, stoppedByCap: false };
    }
    if (outcome.toolKey) {
      if (failedToolKeys.has(outcome.toolKey)) {
        return {
          reply: 'Stopped early after repeated identical tool request. Please refine your prompt.',
          stepsUsed: step,
          stoppedByCap: true
        };
      }
      failedToolKeys.add(outcome.toolKey);
      history.push(\`Step \${step}: \${outcome.toolKey}\`);
    }
  }

  return {
    reply: 'Reached maximum automated reasoning steps. Please review partial context or ask a narrower question.',
    stepsUsed: maxSteps,
    stoppedByCap: true
  };
}`,
            explanation: [
              'Hard upper bound maxSteps = 5 prevents infinite token burn.',
              'Tracks repeated identical tool signatures to abort spinning loops immediately.'
            ],
            expectedOutput: 'Safe, deterministic termination under all edge cases.'
          }
        ],
        commonErrors: [
          {
            error: 'Agent loops endlessly calling search("xyz") when search returns empty array []',
            cause: 'Used `while (!done)` with no step cap and ambiguous empty-result message.',
            fix: 'Cap `maxSteps = 5` and have search tools return clear guidance `"0 matching records found—answer user directly without retrying same query"`.'
          }
        ],
        handsOnExercise: {
          title: 'Harden an Agent Loop with Step Caps & Structured Traces',
          task: 'Implement `runBoundedAgentLoop` with max 5 steps, duplicate-call stop, and clean trace logging.',
          steps: [
            'Unit-test stopping cleanly at maxSteps.',
            'Unit-test halting when duplicate failing tool call repeats.'
          ],
          deliverable: 'Bounded, traceable agent execution engine.'
        },
        keyTakeaways: [
          'NEVER run an AI tool loop with an uncapped `while (true)` loop—enforce maxSteps and execution timeouts.',
          'Detect repeated identical tool calls and return informative feedback to halt spinning loops.',
          'Log structured agent traces (steps, tools, tokens, latency) without logging raw secrets or PII.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_6_3_1',
            questionText: 'Why must multi-step AI agent loops enforce a hard `MAX_STEPS` cap (e.g., 5 steps)?',
            options: [
              'To prevent infinite tool-calling loops from hanging responses and draining LLM API budgets',
              'Because JavaScript limits arrays to 5 items',
              'To disable TypeScript types',
              'To speed up CSS downloads'
            ],
            correctAnswer: 0,
            explanation: 'Step caps bound worst-case cost and latency strictly.'
          },
          {
            id: 'kc_wda_6_3_2',
            questionText: 'What helps an LLM stop repeatedly calling a search tool that returned zero results?',
            options: [
              'Returning a clear structured message ("0 matching records exist—do not retry identical query") plus duplicate-call detection',
              'Returning an empty crash',
              'Silently retrying 50 times',
              'Hiding errors from the model'
            ],
            correctAnswer: 0,
            explanation: 'Explicit tool responses plus duplicate guards break spin loops cleanly.'
          },
          {
            id: 'kc_wda_6_3_3',
            questionText: 'What metadata belongs in an AI agent execution trace log?',
            options: [
              'traceId, stepsUsed, toolsInvoked, tokenUsage, durationMs, and final status',
              'Raw customer passwords',
              'Private API key strings',
              'Credit card numbers'
            ],
            correctAnswer: 0,
            explanation: 'Operational traces aid debugging and cost optimization while keeping sensitive data scrubbed.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 6 Assignment: Safe Tool-Calling Operations Copilot',
      description: 'Build a multi-step backend AI workflow featuring server-pinned read tools, a two-phase human-in-the-loop proposal/approval flow for consequential writes, and a 5-step loop cap.',
      deliverables: [
        'Tenant-pinned read tool + atomic pending_actions approval mechanism',
        'Bounded 5-step execution loop with structured trace logging'
      ],
      evaluationCriteria: [
        'No LLM-controlled tenant IDs; consequential actions require explicit human confirmation',
        'Loop halts cleanly on step limit or duplicate failing calls'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wda_6_1',
        questionText: 'Who supplies `workspaceId` during AI tool execution?',
        options: [
          'The authenticated server session context—never the LLM tool argument',
          'The user prompt text',
          'The LLM parameter JSON',
          'index.html'
        ],
        correctAnswer: 0,
        explanation: 'Server session guarantees unspoofable tenant isolation.'
      },
      {
        id: 'mc_wda_6_2',
        questionText: 'What is mandatory before an AI workflow sends customer emails, transfers funds, or deletes data?',
        options: [
          'Explicit human review and confirmation of exact action details',
          'Raising LLM temperature to 1.5',
          'Removing input validation',
          'Running `while (true)`'
        ],
        correctAnswer: 0,
        explanation: 'Human-in-the-loop approval prevents costly autonomous errors.'
      },
      {
        id: 'mc_wda_6_3',
        questionText: 'How do you prevent double execution if a human clicks Approve twice rapidly?',
        options: [
          'Atomic SQL `UPDATE pending_actions SET status = "executed" WHERE id = $1 AND status = "pending"`',
          'Using CSS hidden class alone',
          'Waiting 5 seconds with setTimeout',
          'Asking the AI not to repeat'
        ],
        correctAnswer: 0,
        explanation: 'Database-level atomic transition guarantees once-only execution.'
      },
      {
        id: 'mc_wda_6_4',
        questionText: 'Why put a hard `MAX_STEPS` limit on AI agent loops?',
        options: [
          'To bound cost, prevent infinite loops, and ensure predictable response times',
          'To satisfy CSS Grid columns',
          'To bypass authentication',
          'Because JSON supports max 5 keys'
        ],
        correctAnswer: 0,
        explanation: 'Bounded loops guard budget and availability.'
      },
      {
        id: 'mc_wda_6_5',
        questionText: 'What happens if an agent proposes an action using server-stored `pending_actions` with an `expires_at` timestamp?',
        options: [
          'Stale approvals cannot accidentally execute days later against outdated context',
          'Approvals execute automatically without clicking',
          'PostgreSQL drops the table',
          'TypeScript fails to compile'
        ],
        correctAnswer: 0,
        explanation: 'Expiring proposals protect against stale accidental approvals.'
      }
    ]
  },

  // =========================================================================
  // MODULE 7: ADVANCED AI-ASSISTED SOFTWARE ENGINEERING
  // =========================================================================
  {
    moduleId: 'mod_wda_7',
    courseId: 'web-development-advanced',
    sequence: 7,
    sequenceLabel: 'Module 7',
    title: 'Advanced AI-Assisted Software Engineering',
    description:
      'Direct AI at senior-engineer scale: analyze multi-file codebases, craft cross-stack change plans, execute AI-assisted PR and vulnerability reviews, generate thorough test suites, and enforce strict human validation before merge.',
    learningObjectiveIds: ['WDA-AISOFT-07'],
    lessons: [
      {
        lessonId: 'lesson_wda_7_1',
        moduleId: 'mod_wda_7',
        courseId: 'web-development-advanced',
        title: 'Multi-File Codebase Analysis & Architectural Planning with AI',
        sequence: 1,
        sequenceLabel: 'Lesson 7.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-AISOFT-07'],
        learningObjectives: [
          'Map existing architecture, types, routes, and database contracts before planning cross-file changes.',
          'Generate phased multi-file implementation plans with rollback checkpoints and dependency ordering.',
          'Keep shared TypeScript types synchronized across frontend, backend APIs, and SQL/Firestore schemas.'
        ],
        introduction:
          'Senior engineers do not ask AI to rewrite 8 files in one giant blind prompt. They inspect existing contracts first, plan phased edits (Types -> DB/Rules -> Backend -> Frontend -> Tests), and verify each layer sequentially.',
        lessonContent: [
          'Contract-First Multi-File Planning: Before touching code, summarize existing interfaces, API endpoints, and database constraints cleanly. Then ask AI for a phased implementation plan specifying EXACT files to modify and invariants to preserve (e.g., "Do not break existing 7 courses or unauthenticated routes").',
          'Backward-Compatible Schema & API Changes: When adding new fields (like `githubRepoUrl` on submissions), make new fields optional first so existing historical documents in Firestore/PostgreSQL continue loading without crashing older clients!',
          'Small Atomic Commits: Implement and verify Types + DB + Server first, verify compilation, then wire UI views—making Git reviews and bug isolation effortless.'
        ],
        stepByStepInstructions: [
          'Inspect existing contracts in `src/types`, `server.ts`, and `firestore.rules` before modifying a feature.',
          'Draft a phased cross-stack plan (Types -> Rules/Schema -> Backend -> Service -> UI -> Verification).',
          'Verify backward compatibility with existing stored records.'
        ],
        nigerianContextExamples: [
          'Upgrading Live Platforms Without Breaking Users: Adding Web Development Academy to Digital Corps Hub kept all existing 7 courses, quiz banks, and CDS group registration schemas 100% intact via backward-compatible extensions.',
          'Preventing Multi-File Drift: Defining shared interfaces once keeps Express JSON shapes and React form payloads aligned.'
        ],
        toolsAndResources: ['AI Development Lab Challenge (Multi-File Planning)', 'ADR (Architecture Decision Records) Template'],
        practicalDemonstration:
          'Phased Cross-Stack Plan:\nPhase 1: Extend TypeScript interfaces cleanly (optional new fields)\nPhase 2: Update DB schema / firestore.rules allowlists\nPhase 3: Implement & test backend routes\nPhase 4: Build React components & integrate view\nPhase 5: Co-run build, lint, and integration tests',
        aiLabChallenge: {
          id: 'ailab_wda_7_1',
          trackLevel: 'advanced',
          category: 'advanced_engineering',
          title: 'Plan a Backward-Compatible Cross-Stack Feature',
          problemStatement:
            'Your live SaaS invoicing platform needs team workspaces and role-based audit exports without breaking 500 existing single-owner invoices in PostgreSQL.',
          samplePrompt:
            'Act as a Principal Full-Stack Architect. Create a phased multi-file implementation plan to add Team Roles (`owner`, `accountant`, `viewer`) without breaking existing single-owner records.\nSpecify:\n1. Backward-compatible SQL migration & default role backfill\n2. Updated Express RBAC middleware & TypeScript types\n3. Frontend permission-aware UI updates\n4. Automated regression tests & rollback strategy.',
          expectedAiOutput:
            'Sequenced 4-phase engineering plan ensuring existing owners receive default `owner` membership backfill, non-breaking optional DTO fields, and regression checks.',
          learnerTask:
            'Audit the generated plan for backward compatibility: verify zero breaking `NOT NULL` columns are added without defaults, and verify RBAC enforcement sits on the server rather than purely in JSX.',
          codeReviewChecklist: [
            'Existing database records safely preserved/backfilled (zero destructive drops)',
            'Shared TypeScript types updated first to drive backend & frontend alignment',
            'RBAC checks enforced on backend API & database queries, not only UI visibility',
            'Includes rollback/checkpoint plan'
          ],
          securityReminder:
            'Never upload proprietary client codebases or real database dumps containing PII/secrets into untrusted external AI services.'
        },
        handsOnExercise: {
          title: 'Write a Cross-Stack Feature Implementation Plan (ADR)',
          task: 'Document a multi-file implementation plan for one major feature of your Advanced AI SaaS Capstone.',
          steps: [
            'List affected SQL/Firestore schemas, Express endpoints, React views, and verification tests.',
            'Highlight backward compatibility and rollback points.'
          ],
          deliverable: 'Structured Architectural Plan / ADR.'
        },
        keyTakeaways: [
          'Sequence cross-stack changes cleanly: Types -> DB/Rules -> Backend -> Frontend -> Tests.',
          'Keep migrations and DTO changes backward-compatible with existing production records.',
          'Protect existing features with clear constraints and incremental Git commits.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_7_1_1',
            questionText: 'Why make newly introduced document/table fields optional (or provide a SQL DEFAULT) when extending a live production schema?',
            options: [
              'So existing historical rows/documents without the new field continue loading and validating cleanly',
              'Because PostgreSQL bans required columns',
              'To speed up CSS grids',
              'To bypass TypeScript'
            ],
            correctAnswer: 0,
            explanation: 'Backward compatibility prevents crashes on older saved data.'
          },
          {
            id: 'kc_wda_7_1_2',
            questionText: 'What is the safest layer order when implementing a full-stack feature with AI?',
            options: [
              'Types/Contracts -> Database/Rules -> Backend Routes -> Frontend UI -> Verification Tests',
              'UI CSS first -> random backend later -> skip tests',
              'Delete old files first -> write HTML',
              'Deploy before compiling'
            ],
            correctAnswer: 0,
            explanation: 'Shared contracts and backend enforcement anchor UI work cleanly.'
          },
          {
            id: 'kc_wda_7_1_3',
            questionText: 'What is the risk of asking an AI tool to modify 12 files in a single unreviewed batch?',
            options: [
              'Subtle cross-file signature mismatches, overwritten existing features, and hard-to-trace regressions',
              'Faster compilation',
              'Zero Git diffs',
              'Automatic passing tests'
            ],
            correctAnswer: 0,
            explanation: 'Phased edits keep every diff small, testable, and easy to verify.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_7_2',
        moduleId: 'mod_wda_7',
        courseId: 'web-development-advanced',
        title: 'AI-Assisted Pull Request Reviews & Automated Vulnerability Scanning',
        sequence: 2,
        sequenceLabel: 'Lesson 7.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-AISOFT-07'],
        learningObjectives: [
          'Use AI systematically on `git diff` outputs to hunt authorization gaps, SQLi, XSS, and race conditions before merging PRs.',
          'Combine static tooling (TypeScript strict mode, ESLint security rules, `npm audit`) with human + AI code review.',
          'Verify false positives vs. real security defects critically.'
        ],
        introduction:
          'Even solo engineers make silly mistakes at 11 PM—like forgetting `requireAuth` on one new endpoint or skipping an ownership check. Running an adversarial PR diff review catches blind spots before deployment.',
        lessonContent: [
          'Reviewing `git diff` with Adversarial Checklists: Export your PR diff (sanitized of any config/secrets) and instruct AI: "Review ONLY this git diff for: (1) Missing auth/RBAC/IDOR checks, (2) Unparameterized SQL or XSS/unsafe URLs, (3) Unhandled promise rejections/pool leaks, (4) Race conditions or N+1 loops."',
          'Static Tooling First: Automated deterministic tools (`tsc --noEmit`, `eslint`, `npm audit --omit=dev`) catch syntax, dead variables, and known vulnerable npm packages every single time with zero hallucination. AI complements—never replaces—deterministic linters and compilers!',
          'Triaging Findings Responsibly: Verify every AI PR comment against actual surrounding files before changing code; AI can miss context hidden outside the diff.'
        ],
        stepByStepInstructions: [
          'Run `npx tsc --noEmit`, `npm run lint`, and inspect `npm audit` on your Capstone repo.',
          'Run an AI PR Security Review prompt on a sample backend + frontend diff.',
          'Triage findings into True Defects (fix immediately) vs. False Positives.'
        ],
        nigerianContextExamples: [
          'Solo Founder Safety Net: Nigerian indie SaaS builders working solo use deterministic linters + adversarial `git diff` review prompts to emulate a senior security teammate.',
          'Spotting Forgotten Auth Middleware: A 10-second diff scan often spots the single route missing `requireAuth`.'
        ],
        toolsAndResources: ['GitHub Pull Request Diffs', 'npm audit & ESLint Security Guides'],
        practicalDemonstration:
          'Pre-Merge Automated + AI PR Gate:\n1. npx tsc --noEmit (0 errors)\n2. npm run lint (0 errors)\n3. npm test (all suites pass)\n4. Adversarial git diff review (IDOR, XSS, SQLi, pool leaks checked)',
        aiLabChallenge: {
          id: 'ailab_wda_7_2',
          trackLevel: 'advanced',
          category: 'advanced_engineering',
          title: 'Adversarial PR Diff Vulnerability Audit',
          problemStatement:
            'Inspect a Pull Request adding a `PATCH /api/invoices/:id/status` endpoint and a React invoice link preview for hidden OWASP and concurrency flaws.',
          samplePrompt:
            'Perform a strict security PR review on this sanitized TypeScript diff.\nTarget: IDOR/BOLA, mass assignment, unvalidated redirects/URLs, missing transactions, and error leaks.\nDiff:\n```ts\napp.patch("/api/invoices/:id", async (req, res) => {\n  const { status, amountKobo } = req.body;\n  await pool.query(`UPDATE invoices SET status = \'${status}\', total_kobo = ${amountKobo} WHERE id = $1`, [req.params.id]);\n  res.json({ ok: true });\n});\n```',
          expectedAiOutput:
            'Flags Critical SQL injection on `${status}` / `${amountKobo}`, missing `requireAuth`, IDOR (no `workspace_id` check), client-supplied `amountKobo` price tampering, and missing status enum validation.',
          learnerTask:
            'Practice reviewing one of your own feature diffs using the adversarial checklist, and write the hardened replacement code passing all 5 review gates.',
          codeReviewChecklist: [
            'Verified `requireAuth` and tenant ownership scope on route',
            'Eliminated SQL string interpolation completely',
            'Replaced raw `req.body` picks with strict schema + server price authority',
            'Checked error handling & `tsc` / `lint` cleanliness'
          ],
          securityReminder:
            'Sanitize tokens, internal hostnames, and proprietary keys before passing git diffs to external AI tools.'
        },
        handsOnExercise: {
          title: 'Run Full Static + AI Security Review on a Feature Diff',
          task: 'Audit a feature branch diff with `tsc`, `lint`, and an adversarial security review checklist, fixing all genuine issues.',
          steps: [
            'Run `npx tsc --noEmit` and `npm run lint`.',
            'Inspect diff for auth, tenant scoping, XSS, SQLi, and leak safety.'
          ],
          deliverable: 'Audited PR review notes & fixes.'
        },
        keyTakeaways: [
          'Deterministic compilers, linters, and tests come FIRST; AI review complements them.',
          'Run adversarial `git diff` scans specifically hunting IDOR, SQLi, XSS, mass assignment, and resource leaks.',
          'Always verify AI review findings against full source files rather than trusting blindly.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_7_2_1',
            questionText: 'Why must AI code review complement—never replace—TypeScript, ESLint, and automated tests?',
            options: [
              'Compilers and test suites catch deterministic syntax, type, and regression bugs with 100% repeatability whereas LLMs are probabilistic',
              'ESLint deploys websites',
              'TypeScript replaces databases',
              'AI tools cannot read `.ts` files'
            ],
            correctAnswer: 0,
            explanation: 'Deterministic checks form the unyielding baseline gate.'
          },
          {
            id: 'kc_wda_7_2_2',
            questionText: 'In `UPDATE invoices SET status = \'${status}\' WHERE id = $1`, which TWO critical security bugs exist if `req.params.id` lacks tenant scoping and `requireAuth`?',
            options: [
              'SQL Injection (`${status}`) AND IDOR/Unauthenticated write (no auth or `workspace_id` check)',
              'CSS alignment error and dark mode issue',
              'Slow Tailwind compile and missing favicon',
              'Double React render and missing alt text'
            ],
            correctAnswer: 0,
            explanation: 'Never interpolate SQL and always enforce verified caller + tenant ownership.'
          },
          {
            id: 'kc_wda_7_2_3',
            questionText: 'What command checks for known security advisories inside production npm dependencies?',
            options: ['npm audit --omit=dev', 'git status', 'npm start', 'npx vite preview'],
            correctAnswer: 0,
            explanation: 'npm audit reports vulnerable dependency versions across your lockfile.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_7_3',
        moduleId: 'mod_wda_7',
        courseId: 'web-development-advanced',
        title: 'AI-Assisted Test Generation & Validation Gates Before Deploy',
        sequence: 3,
        sequenceLabel: 'Lesson 7.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-AISOFT-07'],
        learningObjectives: [
          'Prompt AI to generate contract, negative/unauthorized (401/403), and edge-case tests.',
          'Detect meaningless "tautology tests" (mocking everything until nothing real is verified).',
          'Enforce strict pre-deploy validation gates (Typecheck + Lint + Unit/API Tests + Production Build).'
        ],
        introduction:
          'A test suite full of mocked return values that passes even when real business logic breaks gives dangerous false confidence. Learn to prompt for real failure-mode tests and verify every test actually catches mutations.',
        lessonContent: [
          'Negative & Security Tests Matter Most: Beyond happy-path tests, ask AI to help write negative tests: unauthenticated 401 calls, cross-tenant 403 IDOR attempts, negative prices, expired approval tokens, and empty arrays.',
          'Spotting Fake AI Tests: Reject tests that assert `expect(true).toBe(true)`, mock the exact function under test, or swallow exceptions silently. A simple verification trick: temporarily break one validation line in your code—if the test STILL passes, the test was useless!',
          'Uncompromising Pre-Deploy Gate: Nothing merges or deploys unless ALL four pass after the final edit: (1) Typecheck, (2) Lint, (3) Automated Tests, (4) `npm run build`.'
        ],
        stepByStepInstructions: [
          'Write positive AND negative security/validation tests for one service and one endpoint.',
          'Verify tests genuinely fail if you introduce an intentional bug, then restore the fix.',
          'Script a single `npm run verify` gate combining typecheck, lint, tests, and build.'
        ],
        nigerianContextExamples: [
          'Mutation Sanity Check: Intentionally breaking a discount check for 5 seconds confirms your test suite actually catches real bugs before going live!',
          'Clean Release Confidence: Running one scripted verification gate before every deploy eliminates broken launches.'
        ],
        toolsAndResources: ['Vitest & Supertest Guide', 'Mutation Testing Concepts'],
        practicalDemonstration:
          '// package.json script:\n"verify": "tsc --noEmit && npm run lint && vitest run && npm run build"',
        codeExamples: [
          {
            title: 'Testing Negative Security & Validation Paths Explicitly',
            language: 'typescript',
            code: `// Example verification checks covering security + edge boundaries
import assert from 'node:assert/strict';
import { sanitizeExternalHref, validateOrderInput } from './validators';

// 1. Happy path
const clean = validateOrderInput({ productId: 'sku_rice_50kg', quantity: 2, role: 'admin' });
assert.deepEqual(clean, { productId: 'sku_rice_50kg', quantity: 2 });
assert.equal((clean as any).role, undefined, 'Mass-assignment role field must be stripped');

// 2. Negative bounds
assert.throws(() => validateOrderInput({ productId: 'sku_1', quantity: -3 }));

// 3. XSS URL defense
assert.equal(sanitizeExternalHref('javascript:alert(1)'), null);
assert.equal(sanitizeExternalHref('https://digitalcorps.example.com/demo'), 'https://digitalcorps.example.com/demo');`,
            explanation: [
              'Verifies both valid output AND explicit rejection of mass-assignment `role` injection, negative qty, and `javascript:` XSS.'
            ],
            expectedOutput: 'Proves validators actively block attack vectors rather than testing only happy paths.'
          }
        ],
        commonErrors: [
          {
            error: 'AI generates tests that mock the module being tested, yielding 100% pass rate on broken code',
            cause: 'Over-mocking replaced real validator/reducer logic with `vi.fn().mockResolvedValue(true)`.',
            fix: 'Test real pure logic and real Express handlers directly; mock only external third-party network boundaries.'
          }
        ],
        handsOnExercise: {
          title: 'Build a `verify` Pre-Deploy Gate with Negative Security Tests',
          task: 'Add negative security/edge-case tests (mass assignment, negative bounds, XSS URLs, RBAC 403) and wire `tsc + lint + test + build`.',
          steps: [
            'Verify at least 3 failure/attack cases throw or reject properly.',
            'Run full `tsc && lint && test && build` sequence.'
          ],
          deliverable: 'Passing pre-deploy validation gate.'
        },
        keyTakeaways: [
          'Always test failure modes, unauthorized roles (401/403), mass assignment, and boundary limits—not only happy paths.',
          'Never mock away the core function you are trying to verify.',
          'Require typecheck + lint + test + build to pass after final code edits before deployment.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_7_3_1',
            questionText: 'How can you quickly spot a useless AI-generated "tautology test" that over-mocked the system?',
            options: [
              'Temporarily introduce an intentional bug in the target code—if the test still passes, the test isn’t verifying real behavior',
              'Check if the filename ends in .ts',
              'Run `git status`',
              'Count the number of spaces'
            ],
            correctAnswer: 0,
            explanation: 'Mutation checks verify tests actually exercise real assertions.'
          },
          {
            id: 'kc_wda_7_3_2',
            questionText: 'What should automated API/validator test suites cover alongside happy paths?',
            options: [
              'Unauthenticated 401, unauthorized 403/IDOR, invalid bounds, and mass-assignment rejection',
              'Only button border colors',
              'Only valid 200 OK inputs',
              'HTML comments'
            ],
            correctAnswer: 0,
            explanation: 'Negative and authorization checks protect critical business invariants.'
          },
          {
            id: 'kc_wda_7_3_3',
            questionText: 'When should final build/lint/test verification run?',
            options: [
              'After the FINAL edit before declaring code ready or deploying',
              'Only on Day 1 before writing features',
              'Only once per year',
              'Skip it if Vite dev server opens'
            ],
            correctAnswer: 0,
            explanation: 'Final post-edit verification catches late regressions cleanly.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 7 Assignment: Multi-File Plan, Adversarial PR Audit & Verify Gate',
      description: 'Execute a complete advanced AI-assisted engineering cycle: ADR plan, adversarial PR security review, negative security test additions, and passing full verification gate.',
      deliverables: [
        'Phased cross-stack plan + PR diff review log',
        'Negative/security tests + clean typecheck/lint/test/build output'
      ],
      evaluationCriteria: [
        'Tests genuinely assert security & boundary failures without over-mocking',
        'Zero TypeScript/lint/build warnings or errors'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wda_7_1',
        questionText: 'Why keep database/schema updates backward-compatible during cross-stack AI refactors?',
        options: [
          'Existing saved records in production must continue loading without crashing',
          'SQL drops all tables on deploy',
          'CSS refuses optional fields',
          'TypeScript skips older files'
        ],
        correctAnswer: 0,
        explanation: 'Additive/defaulted changes prevent downtime on live data.'
      },
      {
        id: 'mc_wda_7_2',
        questionText: 'Which tools run with zero hallucination before AI PR review?',
        options: [
          'TypeScript (`tsc --noEmit`), ESLint, automated tests, and `npm audit`',
          'Tailwind CDN',
          'Browser bookmarks',
          'Manual guessing'
        ],
        correctAnswer: 0,
        explanation: 'Deterministic static and test tools always anchor engineering quality.'
      },
      {
        id: 'mc_wda_7_3',
        questionText: 'What makes a test useless even if it shows green?',
        options: [
          'Over-mocking the real logic under test or asserting tautologies like `expect(true).toBe(true)`',
          'Testing negative numbers',
          'Testing HTTP 403 codes',
          'Using strict equality'
        ],
        correctAnswer: 0,
        explanation: 'Mocks should isolate external dependencies, not replace the function being tested.'
      },
      {
        id: 'mc_wda_7_4',
        questionText: 'What should an adversarial AI diff review prioritize checking?',
        options: [
          'Auth/RBAC/IDOR gaps, SQLi/XSS, mass assignment, race conditions, and leaked secrets',
          'Renaming `i` to `index` everywhere',
          'Adding extra CSS shadows',
          'Deleting README files'
        ],
        correctAnswer: 0,
        explanation: 'Targeted security and concurrency focus uncovers high-impact bugs.'
      },
      {
        id: 'mc_wda_7_5',
        questionText: 'When is a code release genuinely verified?',
        options: [
          'After typecheck, lint, tests, and production build all pass following the final code change',
          'Right after editing, without re-running build/tests',
          'When CSS looks fine on localhost',
          'Before writing migrations'
        ],
        correctAnswer: 0,
        explanation: 'Final post-edit verification proves the releasable state compiles and passes.'
      }
    ]
  },

  // =========================================================================
  // MODULE 8: TESTING, CI/CD AND DEPLOYMENT
  // =========================================================================
  {
    moduleId: 'mod_wda_8',
    courseId: 'web-development-advanced',
    sequence: 8,
    sequenceLabel: 'Module 8',
    title: 'Testing, CI/CD and Production Deployment',
    description:
      'Automate confidence from every pull request to production: write API contract/integration tests, configure GitHub Actions CI/CD pipelines, and run safe zero-downtime cloud deployments.',
    learningObjectiveIds: ['WDA-CICD-08'],
    lessons: [
      {
        lessonId: 'lesson_wda_8_1',
        moduleId: 'mod_wda_8',
        courseId: 'web-development-advanced',
        title: 'API Integration Testing & Contract Verification',
        sequence: 1,
        sequenceLabel: 'Lesson 8.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-CICD-08'],
        learningObjectives: [
          'Write real HTTP integration tests exercising Express middleware, validation, auth guards, and status codes end-to-end.',
          'Verify API contracts so backend response shapes stay compatible with frontend TypeScript expectations.',
          'Isolate test runs cleanly using ephemeral ports or isolated test schemas.'
        ],
        introduction:
          'Unit tests check isolated functions, while integration tests fire real HTTP requests through your Express router, middleware, validator, and response serializers—catching middleware ordering bugs unit tests miss.',
        lessonContent: [
          'Why Integration Tests Catch Real Bugs: Maybe your validator function works in isolation, yet Express forgot `app.use(express.json())` or registered `errorMiddleware` before routes! Starting your Express `app` on an ephemeral port (`0`) or using Supertest verifies the entire HTTP pipeline.',
          'Export `createApp()` Separately from `app.listen()`: Refactor `server.ts` so `createApp()` returns the configured Express instance cleanly without binding port 3000 on import—letting integration test suites spin up isolated test servers cleanly and close them in `afterAll`!',
          'Contract Checks: Assert exact HTTP status codes (`200`, `400`, `401`, `403`, `429`), JSON structure keys, and that sensitive server fields (like `correctAnswer` before quiz submission!) are NEVER leaked in responses.'
        ],
        stepByStepInstructions: [
          'Extract `createApp()` from `app.listen()` cleanly for testability.',
          'Write HTTP integration tests hitting `/api/health` and a protected/validated POST endpoint.',
          'Assert both valid 200 responses and invalid 400/401 rejections.'
        ],
        nigerianContextExamples: [
          'Verifying Anti-Cheat APIs Automatically: Digital Corps Hub tests `/api/academy/start-assessment` in integration checks to prove zero correct answers or explanations are ever included in client payloads before submission!',
          'Preventing Middleware Order Regressions: Automated HTTP tests catch broken error middleware immediately.'
        ],
        toolsAndResources: ['Supertest / Native Node fetch Testing', 'Vitest Integration Guide'],
        practicalDemonstration:
          '// server-test.ts:\nconst server = app.listen(0); // random free port\nconst { port } = server.address() as AddressInfo;\nconst res = await fetch(`http://127.0.0.1:${port}/api/health`);\nassert.equal(res.status, 200);\nserver.close();',
        codeExamples: [
          {
            title: 'Ephemeral-Port Express Integration Test Pattern',
            language: 'typescript',
            code: `import assert from 'node:assert/strict';
import express from 'express';
import type { AddressInfo } from 'node:net';

export async function runApiContractCheck() {
  const app = express();
  app.use(express.json());
  app.post('/api/orders', (req, res) => {
    const qty = Number(req.body?.qty);
    if (!Number.isInteger(qty) || qty <= 0) {
      return res.status(400).json({ success: false, error: 'Positive integer qty required' });
    }
    return res.status(201).json({ success: true, qty });
  });

  const server = app.listen(0);
  try {
    const { port } = server.address() as AddressInfo;
    const base = \`http://127.0.0.1:\${port}\`;

    const bad = await fetch(\`\${base}/api/orders\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty: -5 })
    });
    assert.equal(bad.status, 400);

    const good = await fetch(\`\${base}/api/orders\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ qty: 3 })
    });
    assert.equal(good.status, 201);
  } finally {
    server.close();
  }
}`,
            explanation: [
              'app.listen(0) binds any free OS port so tests never clash with port 3000 dev server.',
              'finally { server.close(); } ensures Node test runner exits cleanly without hanging.'
            ],
            expectedOutput: 'Verifies live HTTP serialization, express.json() parsing, and status codes in <50ms.'
          }
        ],
        commonErrors: [
          {
            error: 'Test suite hangs forever after assertions pass',
            cause: 'Forgot `server.close()` or DB `pool.end()` inside `finally` / `afterAll`.',
            fix: 'Always close HTTP listeners and DB connection pools cleanly on teardown.'
          }
        ],
        handsOnExercise: {
          title: 'Write API Contract Integration Tests',
          task: 'Add integration tests exercising your Express routes across 200/201, 400 validation, and 401/403 auth errors.',
          steps: [
            'Use ephemeral port `0` with `finally { server.close(); }`.',
            'Verify sensitive fields stay stripped from public payloads.'
          ],
          deliverable: 'Passing API integration test script.'
        },
        keyTakeaways: [
          'Separate Express `createApp()` setup from `listen()` so tests can spin up isolated servers.',
          'Bind ephemeral port `0` in tests and always close servers/DB pools in `finally` / `afterAll`.',
          'Assert HTTP status codes, validation rejections, and absence of leaked secrets.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_8_1_1',
            questionText: 'Why separate `createApp()` from `app.listen(PORT)` in a Node/Express backend?',
            options: [
              'So automated integration tests can import and test the Express app without immediately locking port 3000',
              'Because Express forbids calling listen() in server.ts',
              'To disable TypeScript',
              'To speed up Tailwind'
            ],
            correctAnswer: 0,
            explanation: 'Modular app factories allow clean in-process or ephemeral-port testing.'
          },
          {
            id: 'kc_wda_8_1_2',
            questionText: 'What causes a test runner to hang open after all Express integration tests finish?',
            options: [
              'Open HTTP server sockets (`server.close()`) or database pools (`pool.end()`) were not closed on teardown',
              'Too many CSS classes',
              'Using `const` instead of `let`',
              'Using `assert.equal`'
            ],
            correctAnswer: 0,
            explanation: 'Open network handles keep the Node.js event loop alive until closed.'
          },
          {
            id: 'kc_wda_8_1_3',
            questionText: 'What does `app.listen(0)` accomplish during automated testing?',
            options: [
              'Asks the OS to assign any available free ephemeral port, preventing EADDRINUSE conflicts',
              'Disables HTTP completely',
              'Turns off HTTPS',
              'Crashes Node.js'
            ],
            correctAnswer: 0,
            explanation: 'Port 0 avoids collisions with running dev servers or parallel test jobs.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_8_2',
        moduleId: 'mod_wda_8',
        courseId: 'web-development-advanced',
        title: 'GitHub Actions CI/CD Pipelines & Automated Quality Gates',
        sequence: 2,
        sequenceLabel: 'Lesson 8.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-CICD-08'],
        learningObjectives: [
          'Author a clean `.github/workflows/ci.yml` pipeline running `npm ci`, typecheck, lint, tests, and production build on every push and PR.',
          'Use `npm ci` rather than `npm install` in CI for deterministic lockfile installs.',
          'Protect `main` from unverified code by blocking broken builds before deployment.'
        ],
        introduction:
          'Even disciplined engineers occasionally forget to run tests before pushing a quick typo fix. A GitHub Actions CI workflow enforces quality automatically on every commit and pull request.',
        lessonContent: [
          'Why `npm ci` Instead of `npm install`: In CI, `npm ci` installs exact versions pinned inside `package-lock.json` reproducibly and fails cleanly if `package.json` and lockfile drift out of sync.',
          'Core CI Pipeline Steps: (1) `actions/checkout`, (2) `actions/setup-node` with Node 20 + npm cache, (3) `npm ci`, (4) `npx tsc --noEmit`, (5) `npm run lint`, (6) `npm test`, (7) `npm run build`.',
          'Secrets in CI: Never paste API keys into `.github/workflows/ci.yml`! Reference encrypted GitHub Repository Secrets (`${{ secrets.DEPLOY_TOKEN }}`) strictly inside deploy jobs, never exposed on untrusted fork Pull Requests.'
        ],
        stepByStepInstructions: [
          'Create `.github/workflows/ci.yml` triggered on `push` to `main` and `pull_request`.',
          'Configure Node.js 20, npm caching, `npm ci`, typecheck, lint, tests, and `npm run build`.',
          'Verify zero secrets appear in workflow YAML.'
        ],
        nigerianContextExamples: [
          'Hiring-Ready GitHub Green Checks: Seeing green GitHub Actions CI badges on your SaaS Capstone repository shows engineering employers immediate professionalism and rigor.',
          'Lockfile Reliability: `npm ci` guarantees "works on my laptop" matches cloud servers cleanly.'
        ],
        toolsAndResources: ['GitHub Actions Documentation', 'Node.js CI Starter Workflows'],
        practicalDemonstration:
          'on: [push, pull_request]\njobs:\n  verify:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20, cache: npm }\n      - run: npm ci\n      - run: npx tsc --noEmit && npm run lint && npm test && npm run build',
        codeExamples: [
          {
            title: 'Production GitHub Actions CI Pipeline (.github/workflows/ci.yml)',
            language: 'markdown',
            code: `name: Full-Stack CI Verification

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install locked dependencies
        run: npm ci

      - name: TypeScript typecheck
        run: npx tsc --noEmit

      - name: Run linter
        run: npm run lint

      - name: Run tests
        run: npm test

      - name: Production build check
        run: npm run build`,
            explanation: [
              'Runs automatically on every push or PR targeting main.',
              'Combines lockfile install (`npm ci`), types, lint, tests, and build into an automated release gate.'
            ],
            expectedOutput: 'Blocks broken commits automatically and shows green CI status on GitHub.'
          }
        ],
        commonErrors: [
          {
            error: 'CI fails with "package-lock.json is out of sync with package.json"',
            cause: 'Someone hand-edited `package.json` without updating `package-lock.json`.',
            fix: 'Run `npm install` locally once and commit the updated `package-lock.json`.'
          }
        ],
        handsOnExercise: {
          title: 'Add a Complete CI Pipeline to Your Capstone Repository',
          task: 'Create `.github/workflows/ci.yml` running `npm ci`, typecheck, lint, test, and production build.',
          steps: [
            'Pin Node.js 20 and enable npm cache.',
            'Push to GitHub and verify green workflow completion.'
          ],
          deliverable: 'Green `.github/workflows/ci.yml` pipeline.'
        },
        keyTakeaways: [
          'Use `npm ci` in CI for fast, reproducible lockfile installs.',
          'Automate typecheck, lint, tests, and production build on every push and pull request.',
          'Store deploy credentials exclusively inside encrypted GitHub Secrets—never commit keys into workflow YAML.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_8_2_1',
            questionText: 'Why is `npm ci` preferred over `npm install` inside CI/CD workflows?',
            options: [
              '`npm ci` installs exact versions from `package-lock.json` reproducibly and fails if package files drifted out of sync',
              '`npm ci` skips installing dependencies',
              '`npm ci` automatically deploys CSS',
              '`npm ci` deletes tests'
            ],
            correctAnswer: 0,
            explanation: 'Reproducible builds eliminate "works on my laptop" dependency drift.'
          },
          {
            id: 'kc_wda_8_2_2',
            questionText: 'Where should production deployment tokens sit when referenced in GitHub Actions?',
            options: [
              'Inside encrypted GitHub Repository/Environment Secrets (`${{ secrets.KEY }}`)',
              'Committed as plain strings in `ci.yml`',
              'Inside `README.md`',
              'Inside `index.html`'
            ],
            correctAnswer: 0,
            explanation: 'GitHub Secrets mask values in logs and keep credentials out of repository source.'
          },
          {
            id: 'kc_wda_8_2_3',
            questionText: 'What is the main benefit of running CI on `pull_request` events?',
            options: [
              'Catches type, lint, test, or build failures BEFORE broken changes merge into `main`',
              'Slows down developers intentionally',
              'Replaces TypeScript',
              'Eliminates Git commits'
            ],
            correctAnswer: 0,
            explanation: 'Validating PRs keeps the `main` branch consistently deployable.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_8_3',
        moduleId: 'mod_wda_8',
        courseId: 'web-development-advanced',
        title: 'Cloud Deployment, Production Env Vars, Health Checks & Rollbacks',
        sequence: 3,
        sequenceLabel: 'Lesson 8.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-CICD-08'],
        learningObjectives: [
          'Configure full-stack production builds (`npm run build` + `npm start` serving static `dist/` alongside `/api/*`).',
          'Set up production cloud hosting (Cloud Run / Render / Railway / Fly.io + PostgreSQL/Firestore) with proper health checks.',
          'Execute zero-downtime readiness checks and instant rollback plans if a release misbehaves.'
        ],
        introduction:
          'Running `tsx server.ts` in dev mode relies on Vite dev middleware, which should NEVER run in public production. Production builds compile static optimized assets into `dist/` and switch Express to high-speed static serving.',
        lessonContent: [
          'Production vs. Dev Entry Mode: When `NODE_ENV=production`, Express skips creating Vite dev middleware and instead serves compiled `dist/` assets with `express.static(distPath)` + SPA fallback (`app.get("*", ...)` AFTER all `/api/*` routes!). Verify `package.json` has `"build": "vite build"` and `"start": "NODE_ENV=production tsx server.ts"` (or compiled JS).',
          'Health Probes & Zero-Downtime Rolling Deployments: Cloud platforms hit `GET /api/health` before routing live customer traffic to a new container. If the new deploy fails boot or DB health checks, traffic stays safely on the healthy previous version!',
          'Post-Deploy Smoke Verification & Fast Rollback: Immediately verify login, API health, DB read/write, AI proxy, and mobile view on the live URL—and know how to trigger a 1-click platform rollback or `git revert` if metrics spike.'
        ],
        stepByStepInstructions: [
          'Verify `package.json` includes clean `build` and `start` scripts for Node production serving.',
          'Ensure `/api/*` routes are registered BEFORE the SPA catch-all `app.get("*")`.',
          'Configure hosting environment variables cleanly and test `GET /api/health` live.'
        ],
        nigerianContextExamples: [
          'Classic Express SPA Routing Bug: Registering `app.get("*", ...)` BEFORE `/api/health` sends back `index.html` HTML instead of JSON for every API call! Keeping API routes first fixes it permanently.',
          'Safe Launches: Rolling health-checked deployments protect live Nigerian SME customers from 502 outages during updates.'
        ],
        toolsAndResources: ['Cloud Run / Render / Railway Node Deployment Guides', 'Express Production Best Practices'],
        practicalDemonstration:
          '// CRITICAL ROUTE ORDER IN PRODUCTION:\n1. app.use(express.json());\n2. app.get("/api/health", ...);\n3. app.use("/api", apiRouter);\n4. app.use(express.static("dist"));\n5. app.get("*", (_req, res) => res.sendFile("dist/index.html")); // LAST!',
        codeExamples: [
          {
            title: 'Production Express + Static SPA Serving Order',
            language: 'typescript',
            code: `import path from 'node:path';
import express from 'express';

export function configureStaticSpaFallback(app: express.Express) {
  // IMPORTANT: Call this ONLY AFTER registering all /api/* routes!
  if (process.env.NODE_ENV === 'production') {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        return next(); // Never swallow missing /api/* endpoints as index.html!
      }
      return res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }
}`,
            explanation: [
              'Guards `req.path.startsWith("/api/")` so unknown API typos still return clean 404 JSON rather than confusing HTML.',
              'Serves `dist/index.html` cleanly for client-side SPA routes.'
            ],
            expectedOutput: 'Zero HTML-instead-of-JSON API bugs and clean deep-link refresh handling in production.'
          }
        ],
        commonErrors: [
          {
            error: 'API calls return `<!doctype html>` in production even though dev mode worked',
            cause: 'SPA catch-all `app.get("*")` ran before `/api/*` or intercepted an API typo.',
            fix: 'Register `/api/*` routes first AND skip `/api/` inside the SPA wildcard fallback.'
          }
        ],
        handsOnExercise: {
          title: 'Deploy Your Full-Stack AI SaaS Application & Verify Production Scripts',
          task: 'Test `npm run build` followed by `NODE_ENV=production` local run, verify `/api/health` and SPA routing, then deploy live.',
          steps: [
            'Verify `/api/*` routes return JSON and `/nonexistent-api` does not return `index.html`.',
            'Deploy with configured cloud secrets and verify live smoke test.'
          ],
          deliverable: 'Production-deployed full-stack application.'
        },
        keyTakeaways: [
          'Always mount `/api/*` routes BEFORE static/SPA wildcard handlers.',
          'Exclude `/api/` paths inside SPA catch-alls so missing endpoints return 404 JSON rather than `index.html`.',
          'Use `/api/health` probes and tested rollback procedures on every live deployment.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_8_3_1',
            questionText: 'Why must Express register all `/api/*` routes BEFORE `app.get("*", ... res.sendFile("dist/index.html"))`?',
            options: [
              'Otherwise the wildcard catch-all intercepts API requests and returns HTML instead of JSON',
              'Vite deletes `/api/` otherwise',
              'CSS requires wildcard first',
              'HTTPS blocks `/api/` after static middleware'
            ],
            correctAnswer: 0,
            explanation: 'Express matches routes top-to-bottom; wildcard catches everything below it.'
          },
          {
            id: 'kc_wda_8_3_2',
            questionText: 'Why skip Vite dev middleware when `NODE_ENV === "production"`?',
            options: [
              'Production should serve pre-built minified `dist/` assets cleanly without heavy dev-server watchers/compilers',
              'Vite dev middleware breaks HTML tags',
              'Express cannot serve static files in dev',
              'SQL stops running'
            ],
            correctAnswer: 0,
            explanation: 'Compiled static assets load faster and consume far less server CPU/RAM.'
          },
          {
            id: 'kc_wda_8_3_3',
            questionText: 'What is the purpose of a `GET /api/health` endpoint in cloud hosting?',
            options: [
              'Lets load balancers verify the new instance is healthy before switching live traffic onto it',
              'Displays customer invoices publicly',
              'Resets user passwords',
              'Runs database migrations automatically'
            ],
            correctAnswer: 0,
            explanation: 'Health checks enable zero-downtime deployments and fast failure detection.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 8 Assignment: Integration Test Suite + CI/CD Workflow + Production Launch',
      description: 'Automate Express HTTP integration tests, configure `.github/workflows/ci.yml`, verify production static + API serving, and ship your app live.',
      deliverables: [
        'Ephemeral-port API contract tests',
        '`.github/workflows/ci.yml` + verified production `build` & `start` flow'
      ],
      evaluationCriteria: [
        'Tests close handles cleanly; CI validates lockfile install, types, lint, tests, and build',
        'Production SPA routing never hijacks `/api/*` paths'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wda_8_1',
        questionText: 'Why bind port `0` (`app.listen(0)`) inside Express integration tests?',
        options: [
          'The OS picks any free ephemeral port so tests never collide with port 3000 dev servers',
          'Port 0 disables HTTP',
          'Port 0 runs faster SQL',
          'GitHub requires port 0'
        ],
        correctAnswer: 0,
        explanation: 'Dynamic ports make integration tests reliable across CI and local dev.'
      },
      {
        id: 'mc_wda_8_2',
        questionText: 'Which command installs locked dependencies reproducibly in GitHub Actions CI?',
        options: ['npm ci', 'npm update --force', 'npm init -y', 'npm preview'],
        correctAnswer: 0,
        explanation: 'npm ci honors package-lock.json strictly.'
      },
      {
        id: 'mc_wda_8_3',
        questionText: 'Where do production deployment keys belong in GitHub Actions?',
        options: ['Encrypted GitHub Secrets (`${{ secrets.* }}`)', 'Plaintext in `ci.yml`', 'Inside `README.md`', 'Inside `vite.config.ts`'],
        correctAnswer: 0,
        explanation: 'Never commit deploy secrets into version-controlled YAML.'
      },
      {
        id: 'mc_wda_8_4',
        questionText: 'What causes a live React+Express deployment to return `<!doctype html>` on `/api/invoices`?',
        options: [
          'An SPA wildcard `app.get("*")` matched before `/api/invoices`',
          'Using Tailwind CSS',
          'Setting `NODE_ENV=production`',
          'Using `express.json()`'
        ],
        correctAnswer: 0,
        explanation: 'Register `/api/*` routes before SPA index.html fallbacks and exclude `/api/` prefixes.'
      },
      {
        id: 'mc_wda_8_5',
        questionText: 'What keeps the test runner from exiting cleanly after Express API tests finish?',
        options: [
          'Forgetting `server.close()` or `pool.end()` during test teardown',
          'Using strict assertions',
          'Using `fetch()`',
          'Setting `Content-Type: application/json`'
        ],
        correctAnswer: 0,
        explanation: 'Closing servers and DB pools releases open event-loop handles.'
      }
    ]
  },

  // =========================================================================
  // MODULE 9: SCALING, MONITORING, PERFORMANCE AND COST OPTIMIZATION
  // =========================================================================
  {
    moduleId: 'mod_wda_9',
    courseId: 'web-development-advanced',
    sequence: 9,
    sequenceLabel: 'Module 9',
    title: 'Scaling, Monitoring, Performance & Cost Optimization',
    description:
      'Keep live AI SaaS platforms fast, observable, and financially sustainable under real traffic: optimize DB/Firestore costs, cache intelligently, monitor latency/errors, control LLM token spend, and ship your Track C Capstone.',
    learningObjectiveIds: ['WDA-SCALE-09'],
    lessons: [
      {
        lessonId: 'lesson_wda_9_1',
        moduleId: 'mod_wda_9',
        courseId: 'web-development-advanced',
        title: 'Caching, Pagination & Database Read/Query Cost Optimization',
        sequence: 1,
        sequenceLabel: 'Lesson 9.1',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-SCALE-09'],
        learningObjectives: [
          'Replace expensive full-table scans and offset pagination on huge datasets with cursor-based pagination and selective projections.',
          'Apply short-TTL in-memory or Redis caching safely for read-heavy shared data (and avoid caching private cross-tenant responses!).',
          'Control Firestore/Cloud SQL billable reads and connection pool limits under load.'
        ],
        introduction:
          'An app that flies with 50 test rows can crawl or triple your cloud bill at 50,000 rows if every dashboard refresh re-scans all documents without pagination or caching.',
        lessonContent: [
          'Keyset / Cursor Pagination Beats Giant `OFFSET`: `OFFSET 10000` forces PostgreSQL to scan and discard 10,000 rows every page! Cursor pagination (`WHERE (created_at, id) < ($1, $2) ORDER BY created_at DESC, id DESC LIMIT 25`) jumps straight to the next page in constant O(log N) time using your index.',
          'Tenant-Safe Caching Rules: Caching public shared catalogs (like exchange rates or course syllabi) for 60 seconds dramatically drops DB reads. NEVER cache private per-user responses under a non-scoped key like `"dashboard"`—always key strictly by `${workspaceId}:${userId}:${filter}` or keep private caches out of shared CDN headers (`Cache-Control: private, no-store`).',
          'Connection Pool Sizing: Configure explicit `max` connections on `pg.Pool` (e.g., `max: 10`) matching serverless/Cloud SQL limits so sudden bursts queue cleanly instead of crashing Postgres with "too many clients".'
        ],
        stepByStepInstructions: [
          'Convert an unbounded list query into cursor-paginated `LIMIT 25` retrieval.',
          'Add a simple TTL cache utility strictly for non-sensitive shared reference data.',
          'Verify private authenticated endpoints send `Cache-Control: private, no-store` where appropriate.'
        ],
        nigerianContextExamples: [
          'Surviving Campaign Traffic Spikes: During NYSC orientation day when hundreds of corps members open the platform simultaneously, caching static course catalogs + using deterministic 1-doc `getDoc` reads keeps Firebase read bills near zero!',
          'Instant Infinite Scroll: Cursor pagination keeps page 50 just as snappy as page 1.'
        ],
        toolsAndResources: ['Use The Index, Luke: Keyset Pagination', 'HTTP Cache-Control MDN Docs'],
        practicalDemonstration:
          '-- Cursor Pagination (fast at row 500,000!):\nSELECT id, total_kobo, created_at FROM invoices\nWHERE workspace_id = $1 AND created_at < $2\nORDER BY created_at DESC LIMIT 25;',
        codeExamples: [
          {
            title: 'Bounded TTL Memory Cache with Size Cap (No Memory Leak)',
            language: 'typescript',
            code: `export class BoundedTtlCache<T> {
  private store = new Map<string, { value: T; expiresAt: number }>();

  constructor(private readonly maxEntries = 200, private readonly ttlMs = 60_000) {}

  get(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value;
  }

  set(key: string, value: T): void {
    if (this.store.size >= this.maxEntries && !this.store.has(key)) {
      const oldestKey = this.store.keys().next().value;
      if (oldestKey !== undefined) this.store.delete(oldestKey);
    }
    this.store.set(key, { value, expiresAt: Date.now() + this.ttlMs });
  }
}`,
            explanation: [
              'Bounded maxEntries evicts oldest entries so caches never cause Node.js Out-Of-Memory crashes.',
              'Expires stale items deterministically on read.'
            ],
            expectedOutput: 'Safe, leak-free short-TTL cache for shared read-heavy queries.'
          }
        ],
        commonErrors: [
          {
            error: 'Cross-user data leak via shared server/CDN cache',
            cause: 'Cached `/api/profile` under a single key `"profile"` or omitted `Cache-Control: private, no-store`.',
            fix: 'Include tenant/user scope in server cache keys AND mark authenticated user API responses `Cache-Control: private, no-store`.'
          }
        ],
        handsOnExercise: {
          title: 'Implement Cursor Pagination & Bounded TTL Caching',
          task: 'Add cursor pagination on a list endpoint and wire `BoundedTtlCache` onto a public/shared summary lookup.',
          steps: [
            'Verify oldest entry evicts cleanly when maxEntries is reached.',
            'Ensure private user endpoints never cache under global shared keys.'
          ],
          deliverable: 'Scalable paginated & cached data layer.'
        },
        keyTakeaways: [
          'Prefer cursor/keyset pagination over huge `OFFSET` scans on growing tables.',
          'Bound in-memory caches by both TTL and `maxEntries` to prevent RAM leaks.',
          'Never share cache keys across tenants or omit `Cache-Control: private` on authenticated APIs.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_9_1_1',
            questionText: 'Why does cursor/keyset pagination outperform `OFFSET 10000` on large SQL tables?',
            options: [
              '`OFFSET 10000` still scans and discards 10,000 rows per query, whereas a cursor jumps directly via an index',
              'OFFSET deletes rows',
              'Cursor pagination disables WHERE clauses',
              'PostgreSQL limits OFFSET to 100'
            ],
            correctAnswer: 0,
            explanation: 'Indexed keyset filters keep deep pagination latency constant.'
          },
          {
            id: 'kc_wda_9_1_2',
            questionText: 'Why must private user/tenant API responses never share a global cache key like `"orders_list"`?',
            options: [
              'User B would receive User A’s cached private records (severe cross-tenant data leak)',
              'CSS breaks on shared keys',
              'JSON cannot serialize arrays twice',
              'TypeScript rejects strings without colons'
            ],
            correctAnswer: 0,
            explanation: 'Private caches must isolate keys strictly by authenticated user/tenant ID.'
          },
          {
            id: 'kc_wda_9_1_3',
            questionText: 'Why enforce a `maxEntries` limit on an in-memory Node.js `Map` cache?',
            options: [
              'To prevent unbounded memory growth from eventually crashing the server with Out-Of-Memory errors',
              'Because JavaScript Maps limit to 10 keys automatically',
              'To encrypt cached JSON',
              'To speed up CSS flexbox'
            ],
            correctAnswer: 0,
            explanation: 'Bounded eviction keeps server heap usage predictable under heavy traffic.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_9_2',
        moduleId: 'mod_wda_9',
        courseId: 'web-development-advanced',
        title: 'Monitoring, Alerting & LLM / Cloud Cost Controls',
        sequence: 2,
        sequenceLabel: 'Lesson 9.2',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-SCALE-09'],
        learningObjectives: [
          'Track the 4 Golden Signals (Latency, Traffic, Errors, Saturation) cleanly across frontend & Express APIs.',
          'Instrument LLM cost accounting (input/output tokens, model tiering, caching repeated AI classifications) to keep AI unit economics profitable.',
          'Set automated cloud billing budgets and error-rate alerts.'
        ],
        introduction:
          'An AI SaaS charging NGN 5,000/month per business goes bankrupt quickly if every user runs 200 expensive frontier-model calls with giant uncached contexts! Smart model tiering and token monitoring protect unit economics.',
        lessonContent: [
          'Model Tiering & Prompt Efficiency: Route fast/routine tasks (classification, summarization, extraction) to lightweight Flash models (`gemini-2.5-flash`) and reserve heavier reasoning models strictly for deep analysis. Trim verbose redundant prompt boilerplate and cache identical deterministic lookups!',
          'Observing Latency & Error Spikes: Track 5xx error rates, p95 response times, and unhandled client exceptions cleanly. Knowing within 2 minutes when an upstream API starts throwing 503s lets you switch fallbacks or inspect logs before customers complain.',
          'Billing Caps & Per-Tenant Quotas: Set hard monthly cloud budget alerts AND application-level daily/monthly workspace AI usage limits so runaway bugs or abusive signups can never generate catastrophic bills.'
        ],
        stepByStepInstructions: [
          'Add token/latency summary logging on your backend AI gateway service.',
          'Implement workspace daily/monthly usage caps alongside clean upgrade/quota messages.',
          'Configure cloud billing alerts and error tracking checklist for your Capstone.'
        ],
        nigerianContextExamples: [
          'Protecting SaaS Profit Margins in Naira: Computing exact per-request USD token cost converted to Naira ensures your SaaS subscription tiers actually earn healthy profit margins.',
          'Graceful Quota Messaging: Showing "Monthly AI quota reached (50/50) — manual invoicing remains unlimited" keeps the app useful instead of locking users out completely.'
        ],
        toolsAndResources: ['Google Cloud Billing Budgets', 'Gemini Token Counting & Pricing Guide'],
        practicalDemonstration:
          '// Cost-Conscious AI Router:\nconst model = taskType === "quick_classify" ? "gemini-2.5-flash" : "gemini-2.5-pro";\n// Always record token usage per workspace + enforce monthly cap',
        codeExamples: [
          {
            title: 'AI Token Budget & Cost Estimator Utility',
            language: 'typescript',
            code: `export interface WorkspaceAiUsage {
  usedCallsThisMonth: number;
  monthlyLimit: number;
  totalEstimatedTokens: number;
}

export function canExecuteAiCall(usage: WorkspaceAiUsage): {
  allowed: boolean;
  remaining: number;
  reason?: string;
} {
  const remaining = Math.max(0, usage.monthlyLimit - usage.usedCallsThisMonth);
  if (remaining === 0) {
    return {
      allowed: false,
      remaining: 0,
      reason: 'Monthly AI quota reached. Core workspace tools remain fully available.'
    };
  }
  return { allowed: true, remaining };
}`,
            explanation: [
              'Prevents unexpected token spend once a tenant reaches plan capacity.',
              'Reassures users that non-AI core workflows keep working cleanly.'
            ],
            expectedOutput: 'Predictable, margin-safe AI resource governance.'
          }
        ],
        commonErrors: [
          {
            error: 'Massive AI invoice caused by sending entire 50-page document history on every chat turn',
            cause: 'Re-sent huge unchunked PDFs and unbounded message history on every API request.',
            fix: 'Use RAG to inject only top-K relevant chunks, trim conversation window to recent turns, and pick Flash-tier models for routine tasks.'
          }
        ],
        handsOnExercise: {
          title: 'Design Cost Controls & Observability Plan for Your AI SaaS',
          task: 'Add per-tenant AI quota guards, Flash vs. Reasoning model selection logic, and latency/error metric logging.',
          steps: [
            'Estimate unit cost per 1,000 requests on your AI feature.',
            'Document billing alert thresholds and fallback behavior when quota expires.'
          ],
          deliverable: 'AI SaaS Monitoring & Cost Control specification + guard code.'
        },
        keyTakeaways: [
          'Match model tiers to task complexity—use Flash-tier models for fast, cost-effective routine work.',
          'Pair cloud billing alerts with strict per-tenant AI usage limits.',
          'Monitor latency, 5xx errors, and token consumption proactively.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_9_2_1',
            questionText: 'How can you drastically reduce LLM token spend in a document Q&A SaaS without losing accuracy?',
            options: [
              'Retrieve only top-K relevant chunks via RAG and route routine tasks to lightweight Flash models rather than sending entire docs to heavyweight models every turn',
              'Disable HTTPS',
              'Remove input validation',
              'Use `var` in JavaScript'
            ],
            correctAnswer: 0,
            explanation: 'Selective RAG context + smart model tiering optimize both cost and speed.'
          },
          {
            id: 'kc_wda_9_2_2',
            questionText: 'What are the Four Golden Signals of service monitoring?',
            options: [
              'Latency, Traffic, Errors, and Saturation',
              'HTML, CSS, JS, and Git',
              'Colors, Borders, Fonts, and Icons',
              'GET, POST, PUT, and DELETE'
            ],
            correctAnswer: 0,
            explanation: 'Golden Signals pinpoint user-facing slowdowns, failures, and capacity limits early.'
          },
          {
            id: 'kc_wda_9_2_3',
            questionText: 'Why pair cloud provider budget alerts with application-level per-tenant rate limits & quotas?',
            options: [
              'Billing emails arrive AFTER money is spent, whereas app quotas & rate limits block runaway loops in real time',
              'Cloud alerts turn off React',
              'Quotas speed up CSS parsing',
              'To skip authentication'
            ],
            correctAnswer: 0,
            explanation: 'Real-time app enforcement prevents sudden spikes before billing delays catch up.'
          }
        ]
      },
      {
        lessonId: 'lesson_wda_9_3',
        moduleId: 'mod_wda_9',
        courseId: 'web-development-advanced',
        title: 'Track C Capstone Review: Shipping Your AI-Powered SaaS Application',
        sequence: 3,
        sequenceLabel: 'Lesson 9.3',
        estimatedDurationMinutes: 35,
        learningObjectiveIds: ['WDA-SCALE-09'],
        learningObjectives: [
          'Verify all 11 Track C SaaS Capstone deliverables across frontend, backend, DB, auth/RBAC, admin dashboard, AI workflow, CI/CD, security, and live deployment.',
          'Compile clear engineering documentation (architecture diagram, SQL/Firestore schema, security & testing evidence, cost/monitoring controls).',
          'Present your completed AI-Powered SaaS project cleanly for graduation.'
        ],
        introduction:
          'You have progressed from writing your first HTML page in Beginner, through AI-assisted React + Firebase apps in Intermediate, all the way to secure full-stack Node.js, PostgreSQL, RAG/tool-calling, CI/CD, and scalable SaaS engineering. Let us finalize and verify your flagship Capstone.',
        lessonContent: [
          'The Complete SaaS Production Standard: Verify every layer works harmoniously: (1) Accessible mobile-first React + TS frontend with ErrorBoundary; (2) Layered Express backend with rate limits, structured logs, and clean errors; (3) PostgreSQL/Firestore relational/scoped data with ACID safety; (4) Verified auth + RBAC + IDOR defense; (5) Meaningful server-side AI feature (RAG or HITL tool calling) with zero exposed keys; (6) Admin operations dashboard; (7) CI workflow + automated security/unit tests; (8) Live HTTPS URL + README documentation.',
          'Writing Standout Portfolio Case Studies: Summarize the real-world Nigerian/global user problem, show a clean architecture overview, link live demo + GitHub repo, and call out concrete security/testing highlights (such as atomic SQL transactions, human approval gates, and CI verification).',
          'Congratulations on Reaching Full-Stack AI Engineering Readiness: Keep contributing, mentoring junior peers in your CDS or tech hub, and maintaining high engineering standards!'
        ],
        stepByStepInstructions: [
          'Audit every item in the Track C Capstone Deliverables Checklist.',
          'Verify `tsc`, `lint`, `test`, `build`, and live HTTPS smoke test pass completely.',
          'Submit your Capstone with GitHub Repo URL, Live App URL, Admin demo notes, and Security/Testing Summary, then complete the Track C Final Assessment!'
        ],
        nigerianContextExamples: [
          'Flagship Portfolio Proof: A live, tested, security-hardened AI-Powered SaaS application backed by CI/CD and PostgreSQL/Firestore positions you competitively for senior junior-to-mid full-stack roles worldwide.',
          'Zero Hype, Verified Reality: Only claim live features you tested directly after your final deployment.'
        ],
        toolsAndResources: ['Track C Capstone Rubric', 'OWASP Top 10 Final Checklist'],
        practicalDemonstration:
          'Final Track C Launch Verification:\n[x] Frontend + Backend + Database + Auth + Admin Dashboard live\n[x] Server-side AI workflow (RAG / HITL tools / structured output) tested\n[x] Rate limits, quotas, input validation, RBAC verified\n[x] CI pipeline & test suite passing\n[x] Public GitHub repo + Live HTTPS URL submitted',
        handsOnExercise: {
          title: 'Execute Final Track C SaaS Launch & Capstone Submission',
          task: 'Complete end-to-end QA across your AI-Powered SaaS Application and submit all Capstone materials.',
          steps: [
            'Run full automated verification gate (`tsc`, `lint`, `test`, `build`).',
            'Test auth, CRUD, Admin view, and AI feature on live HTTPS deployment.',
            'Submit your Track C Capstone Project and pass the Final Assessment!'
          ],
          deliverable: 'Live, verified AI-Powered SaaS Capstone submission.'
        },
        keyTakeaways: [
          'Production SaaS excellence unites clean architecture, strong security, real tests, AI guardrails, and observability.',
          'Document architecture, security controls, tests, and cost limits clearly in your repository README.',
          'Always run a final verification gate and live smoke test after your final commit.'
        ],
        knowledgeCheck: [
          {
            id: 'kc_wda_9_3_1',
            questionText: 'What proves to a technical hiring lead that an AI-Powered SaaS portfolio project is truly production-engineered?',
            options: [
              'Verified server-side AI boundaries, auth/RBAC/IDOR protection, real automated tests, CI checks, and a working live HTTPS demo',
              'An animated gradient landing page with zero backend logic',
              'Hardcoded fake metrics inside React components',
              'Exposing `.env` keys publicly on GitHub'
            ],
            correctAnswer: 0,
            explanation: 'Working end-to-end architecture, security, tests, and live deployment demonstrate genuine skill.'
          },
          {
            id: 'kc_wda_9_3_2',
            questionText: 'What must remain true about every AI feature inside the Track C SaaS Capstone?',
            options: [
              'API keys stay strictly server-side, schemas/quotas bound usage, and consequential actions require explicit human confirmation',
              'API keys sit in React `VITE_` config',
              'AI runs `DROP TABLE` freely',
              'Errors are hidden silently'
            ],
            correctAnswer: 0,
            explanation: 'Responsible AI systems combine utility with strict security and human accountability.'
          },
          {
            id: 'kc_wda_9_3_3',
            questionText: 'What should you run immediately after deploying the final commit to production?',
            options: [
              'Live smoke testing across auth, core DB flows, AI endpoints, admin dashboard, and mobile responsiveness',
              'Skip checking the live site completely',
              'Delete unit tests',
              'Turn off HTTPS'
            ],
            correctAnswer: 0,
            explanation: 'Post-deploy smoke verification catches environment config mismatches immediately.'
          }
        ]
      }
    ],
    moduleAssignment: {
      title: 'Module 9 Assignment: Scalability, Caching & AI Cost Audit',
      description: 'Optimize a key query with cursor pagination + bounded TTL cache, instrument latency/error logging, and implement tenant AI quota caps.',
      deliverables: [
        'Cursor pagination + bounded cache implementation',
        'Per-tenant AI usage quota check + monitoring/budget doc'
      ],
      evaluationCriteria: [
        'Zero cross-tenant cache leaks; bounded heap usage on in-memory caches',
        'Graceful degraded UX when AI quotas exhaust'
      ]
    },
    knowledgeCheck: [
      {
        id: 'mc_wda_9_1',
        questionText: 'Why replace `OFFSET 20000` with cursor/keyset pagination on busy SaaS tables?',
        options: [
          'Cursor pagination uses indexed comparisons for constant speed instead of scanning and discarding 20,000 rows',
          'OFFSET breaks HTML tables',
          'SQL forbids numbers over 1000',
          'Cursor pagination removes primary keys'
        ],
        correctAnswer: 0,
        explanation: 'Indexed keyset filters keep deep pages fast.'
      },
      {
        id: 'mc_wda_9_2',
        questionText: 'How should private user API responses set HTTP caching headers?',
        options: [
          '`Cache-Control: private, no-store` (never shared public cache)',
          '`Cache-Control: public, max-age=86400`',
          'No headers or shared CDN cache key',
          'Always cache passwords in localStorage'
        ],
        correctAnswer: 0,
        explanation: 'Public/shared caching of authenticated responses leaks private data across users.'
      },
      {
        id: 'mc_wda_9_3',
        questionText: 'Which approach optimizes AI SaaS cost AND speed effectively?',
        options: [
          'Use RAG to send only relevant chunks, cache routine lookups, and route simple tasks to Flash-tier models',
          'Send the whole database on every chat turn to the heaviest reasoning model',
          'Disable rate limits',
          'Remove `maxOutputTokens`'
        ],
        correctAnswer: 0,
        explanation: 'Targeted retrieval and smart model tiering dramatically reduce token costs.'
      },
      {
        id: 'mc_wda_9_4',
        questionText: 'Why pair in-app AI quota checks with cloud billing alerts?',
        options: [
          'App-level quotas stop runaway spending in real time, whereas billing alerts only notify after charges accrue',
          'Billing alerts disable React hooks',
          'App quotas compress CSS',
          'They duplicate TypeScript checks'
        ],
        correctAnswer: 0,
        explanation: 'Real-time limits prevent catastrophic spikes before billing reports catch up.'
      },
      {
        id: 'mc_wda_9_5',
        questionText: 'What should happen to core non-AI SaaS features if a user hits their monthly AI credit limit?',
        options: [
          'Core CRUD, invoicing, and reporting continue functioning normally alongside a clear AI quota notice',
          'Lock the user out of their entire account and delete records',
          'Crash with unhandled 500 error',
          'Disable logout'
        ],
        correctAnswer: 0,
        explanation: 'Graceful degradation protects core business continuity.'
      }
    ]
  }
];
