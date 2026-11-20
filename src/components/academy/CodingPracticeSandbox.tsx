import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Eye,
  Lightbulb,
  Check,
  AlertTriangle,
  Copy,
  Code2,
  BookOpen
} from 'lucide-react';
import { LessonCodingChallenge } from '../../types';

interface CodingPracticeSandboxProps {
  challenge: LessonCodingChallenge;
  isCompleted?: boolean;
  onMarkCompleted?: () => void;
}

interface ConsoleEntry {
  id: string;
  level: 'log' | 'warn' | 'error' | 'info';
  text: string;
}

function buildSandboxedSrcDoc(code: string, language: LessonCodingChallenge['language'], nonce: string): string {
  const hookScript = `<script>
(function(){
  var NONCE = ${JSON.stringify(nonce)};
  function fmt(arg) {
    if (arg === undefined) return 'undefined';
    if (arg === null) return 'null';
    if (typeof arg === 'string') return arg;
    try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
  }
  function send(level, args) {
    try {
      var parts = [];
      for (var i = 0; i < args.length; i++) parts.push(fmt(args[i]));
      window.parent.postMessage({ source: 'dch-sandbox', nonce: NONCE, level: level, text: parts.join(' ') }, '*');
    } catch(e) {}
  }
  var origLog = console.log, origWarn = console.warn, origErr = console.error;
  console.log = function(){ send('log', arguments); origLog.apply(console, arguments); };
  console.warn = function(){ send('warn', arguments); origWarn.apply(console, arguments); };
  console.error = function(){ send('error', arguments); origErr.apply(console, arguments); };
  window.addEventListener('error', function(ev) {
    send('error', [(ev && ev.message) || 'Runtime error']);
  });
  window.addEventListener('unhandledrejection', function(ev) {
    send('error', ['Unhandled Promise Rejection: ' + ((ev && ev.reason && ev.reason.message) || String(ev && ev.reason))]);
  });
})();
</script>`;

  const trimmed = code.trim();
  const safeUserCode = code.replace(/<\/script>/gi, '<\\/script>');

  if (language === 'javascript' && !trimmed.startsWith('<')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<style>
  body { font-family: ui-sans-serif, system-ui, sans-serif; padding: 14px; margin: 0; color: #0f172a; background: #f8fafc; font-size: 13px; }
  .banner { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: .05em; color: #047857; margin-bottom: 8px; }
  #app { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; min-height: 36px; }
</style>
${hookScript}
</head>
<body>
  <div class="banner">JavaScript Sandbox Runtime</div>
  <div id="app">Script executed. Inspect the Console Output panel for logged values.</div>
  <script>
    try {
      ${safeUserCode}
    } catch (err) {
      console.error(err && err.message ? err.message : String(err));
    }
  </script>
</body>
</html>`;
  }

  if (language === 'css' && !trimmed.startsWith('<')) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
${hookScript}
<style>${code}</style>
</head>
<body>
  <div class="card container">
    <h2>CSS Preview Card</h2>
    <p>Update CSS selectors in the editor and press Run in Sandbox.</p>
  </div>
</body>
</html>`;
  }

  // HTML or mixed HTML+CSS+JS document
  if (/<head[^>]*>/i.test(code)) {
    return code.replace(/<head([^>]*)>/i, `<head$1>${hookScript}`);
  }
  if (/<body[^>]*>/i.test(code)) {
    return code.replace(/<body([^>]*)>/i, `<body$1>${hookScript}`);
  }
  return `<!DOCTYPE html><html><head><meta charset="utf-8" />${hookScript}</head><body>${code}</body></html>`;
}

export const CodingPracticeSandbox: React.FC<CodingPracticeSandboxProps> = ({
  challenge,
  isCompleted = false,
  onMarkCompleted
}) => {
  const [code, setCode] = useState<string>(challenge.starterCode);
  const [srcDoc, setSrcDoc] = useState<string>('');
  const [hasRun, setHasRun] = useState<boolean>(false);
  const [consoleEntries, setConsoleEntries] = useState<ConsoleEntry[]>([]);
  const [showHints, setShowHints] = useState<boolean>(false);
  const [showSolutionSummary, setShowSolutionSummary] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const activeNonceRef = useRef<string>('');

  useEffect(() => {
    setCode(challenge.starterCode);
    setHasRun(false);
    setSrcDoc('');
    setConsoleEntries([]);
    setShowHints(false);
    setShowSolutionSummary(false);
  }, [challenge.id, challenge.starterCode]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const payload = event.data;
      if (
        !payload ||
        typeof payload !== 'object' ||
        payload.source !== 'dch-sandbox' ||
        payload.nonce !== activeNonceRef.current
      ) {
        return;
      }
      setConsoleEntries((prev) => [
        ...prev.slice(-49),
        {
          id: `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          level: payload.level || 'log',
          text: String(payload.text ?? '')
        }
      ]);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const validationResults = useMemo(() => {
    const checks = challenge.validationChecks || [];
    return checks.map((chk) => {
      let passed = false;
      try {
        const regex = new RegExp(chk.pattern, 'is');
        passed = regex.test(code);
      } catch {
        passed = code.toLowerCase().includes(chk.pattern.toLowerCase());
      }
      return { label: chk.label, passed };
    });
  }, [challenge.validationChecks, code]);

  const allChecksPassed =
    validationResults.length === 0 || validationResults.every((c) => c.passed);

  const handleRunSandbox = () => {
    if (!challenge.runnableInBrowser) return;
    const nonce = `${challenge.id}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    activeNonceRef.current = nonce;
    setConsoleEntries([]);
    setSrcDoc(buildSandboxedSrcDoc(code, challenge.language, nonce));
    setHasRun(true);
  };

  const handleReset = () => {
    setCode(challenge.starterCode);
    setConsoleEntries([]);
    setHasRun(false);
    setSrcDoc('');
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(() => {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      });
    }
  };

  return (
    <div className="rounded-2xl border-2 border-indigo-200 bg-slate-950 text-slate-100 overflow-hidden shadow-sm">
      {/* Header Bar */}
      <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Code2 className="w-3.5 h-3.5" />
              <span>Interactive Coding Practice</span>
            </span>
            <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {challenge.language}
            </span>
            {isCompleted && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Practiced
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white">{challenge.title}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">{challenge.prompt}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer border border-slate-700"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy Code'}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Starter</span>
          </button>
          {challenge.runnableInBrowser && (
            <button
              type="button"
              onClick={handleRunSandbox}
              className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Run in Sandbox</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Editor + Output Split */}
      <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
        {/* Left: Code Editor */}
        <div className="p-4 space-y-3 bg-slate-950">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Code Editor (Editable)</span>
            <span>{code.split('\n').length} lines</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            rows={14}
            aria-label={`Code editor for ${challenge.title}`}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 focus:border-indigo-500 focus:outline-none p-3 font-mono text-xs text-emerald-200 leading-relaxed resize-y"
          />

          {/* Pattern Checks */}
          {validationResults.length > 0 && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Requirement Verification ({validationResults.filter((v) => v.passed).length}/{validationResults.length})
              </span>
              <div className="space-y-1.5">
                {validationResults.map((chk, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-xs ${
                      chk.passed ? 'text-emerald-300' : 'text-slate-400'
                    }`}
                  >
                    {chk.passed ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    )}
                    <span>{chk.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sandboxed Live Preview + Console OR Local Setup */}
        <div className="p-4 space-y-3 bg-slate-900/60">
          {challenge.runnableInBrowser ? (
            <>
              <div className="flex items-center justify-between text-[11px] text-slate-300 font-mono">
                <span className="inline-flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Sandboxed Preview (&lt;iframe sandbox="allow-scripts"&gt;)</span>
                </span>
                <span className="text-slate-400">{hasRun ? 'Live' : 'Click Run to execute'}</span>
              </div>

              {hasRun ? (
                <iframe
                  title={`Sandbox output for ${challenge.title}`}
                  sandbox="allow-scripts"
                  srcDoc={srcDoc}
                  className="w-full h-56 rounded-xl bg-white border border-slate-700"
                />
              ) : (
                <div className="w-full h-56 rounded-xl bg-slate-950 border border-dashed border-slate-700 flex flex-col items-center justify-center p-4 text-center space-y-2">
                  <Play className="w-7 h-7 text-emerald-400" />
                  <p className="text-xs text-slate-300 max-w-xs">
                    Edit the code on the left and press <strong>Run in Sandbox</strong> to test your HTML, CSS, or JavaScript safely inside an isolated iframe.
                  </p>
                </div>
              )}

              {/* Console Output Panel */}
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-amber-400" />
                    <span>Console Output</span>
                  </span>
                  {consoleEntries.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setConsoleEntries([])}
                      className="text-[10px] text-slate-400 hover:text-white cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="max-h-28 overflow-y-auto font-mono text-xs space-y-1">
                  {consoleEntries.length === 0 ? (
                    <p className="text-slate-500 italic text-[11px]">
                      {hasRun ? 'No console.log() messages emitted.' : 'Console logs appear here after running.'}
                    </p>
                  ) : (
                    consoleEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className={`px-2 py-1 rounded text-[11px] whitespace-pre-wrap break-words ${
                          entry.level === 'error'
                            ? 'bg-rose-950/70 text-rose-300 border border-rose-800/60'
                            : entry.level === 'warn'
                              ? 'bg-amber-950/60 text-amber-200'
                              : 'bg-slate-900 text-emerald-300'
                        }`}
                      >
                        {entry.level === 'error' ? '✕ ' : '> '}
                        {entry.text}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-3 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase">
                <BookOpen className="w-4 h-4" />
                <span>Local Development Project Practice</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                This full-stack/React challenge runs in your local Vite or Node.js workspace rather than an in-browser iframe. Draft or refine the module code in the editor, download the starter template from the Course Overview, and test locally using these steps:
              </p>
              {challenge.localSetupSteps && challenge.localSetupSteps.length > 0 && (
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-200 font-mono">
                  {challenge.localSetupSteps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              )}
            </div>
          )}

          {challenge.expectedOutput && (
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <span className="text-[11px] font-bold uppercase text-indigo-300 block mb-1">
                Expected Output
              </span>
              <p className="text-slate-300 font-mono text-[11px] whitespace-pre-wrap">
                {challenge.expectedOutput}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions: Hints, Solution Summary, Mark Practiced */}
      <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            {challenge.hints.length > 0 && (
              <button
                type="button"
                onClick={() => setShowHints((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHints ? 'Hide Hints' : `Show Hints (${challenge.hints.length})`}</span>
              </button>
            )}
            {challenge.solutionSummary && (
              <button
                type="button"
                onClick={() => setShowSolutionSummary((prev) => !prev)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold whitespace-nowrap cursor-pointer"
              >
                {showSolutionSummary ? 'Hide Approach Guide' : 'Check Solution Approach'}
              </button>
            )}
          </div>

          {onMarkCompleted && (
            <button
              type="button"
              onClick={onMarkCompleted}
              disabled={isCompleted}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap transition ${
                isCompleted
                  ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700 cursor-default'
                  : allChecksPassed
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isCompleted ? 'Challenge Practiced' : 'Mark Challenge Practiced'}</span>
            </button>
          )}
        </div>

        {showHints && (
          <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/50 text-xs text-amber-100 space-y-1">
            <span className="font-bold text-amber-300 block">Guided Hints:</span>
            <ul className="list-disc pl-5 space-y-1">
              {challenge.hints.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}

        {showSolutionSummary && challenge.solutionSummary && (
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 leading-relaxed">
            <span className="font-bold text-emerald-300 block mb-1">Reference Solution Approach:</span>
            <p className="font-mono text-[11px]">{challenge.solutionSummary}</p>
          </div>
        )}
      </div>
    </div>
  );
};
