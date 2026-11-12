import React, { useState } from 'react';
import { STARTER_TOOLKIT } from '../data/staticContent';
import {
  BookOpen,
  ClipboardCopy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const ToolkitView: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string>(STARTER_TOOLKIT[0].id);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const categories = [
    { id: 'all', label: 'All 7 Resources' },
    { id: 'prompts', label: 'AI Prompts' },
    { id: 'career', label: 'CV & Interview' },
    { id: 'business', label: 'Business Ideas' },
    { id: 'plan', label: '30-Day Plan' },
    { id: 'security', label: 'Scam Awareness' }
  ];

  const filteredResources = STARTER_TOOLKIT.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900 tracking-tight">
              Digital Corps Starter Toolkit
            </h2>
            <p className="text-xs text-stone-600">
              7 locally stored prompt packs, career guides, and fraud awareness protocols ready to copy.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 7 Resources Accordion */}
      <div className="space-y-4">
        {filteredResources.map((res, idx) => {
          const isExpanded = expandedId === res.id;
          const isCopied = copiedId === res.id;

          return (
            <div
              key={res.id}
              className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? '' : res.id)}
                className="p-5 flex items-start justify-between gap-3 cursor-pointer select-none bg-stone-50/50 hover:bg-stone-50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                      Resource {idx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 capitalize">
                      {res.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-stone-900 text-base leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {res.shortDesc}
                  </p>
                </div>

                <div className="shrink-0 p-1 text-stone-400">
                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="p-5 border-t border-stone-100 space-y-4 bg-white">
                  {/* Action Checklist if available */}
                  {res.actionChecklist && (
                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5 text-xs">
                      <span className="font-bold text-stone-800 uppercase text-[10px] tracking-wide block">
                        Quick Action Steps:
                      </span>
                      {res.actionChecklist.map((step, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{step}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Copy Button & Prompt/Guide Display */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-stone-500 uppercase">
                        Copyable Content:
                      </span>
                      <button
                        onClick={() => handleCopy(res.id, res.copyableContent)}
                        className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs transition-transform active:scale-95 cursor-pointer"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-300" />
                            <span>Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <ClipboardCopy className="w-4 h-4" />
                            <span>Copy Everything</span>
                          </>
                        )}
                      </button>
                    </div>

                    <pre className="p-4 bg-stone-900 text-stone-100 rounded-xl text-xs font-mono leading-relaxed overflow-x-auto max-h-96 whitespace-pre-wrap select-all">
                      {res.copyableContent}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
