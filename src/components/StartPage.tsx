import type React from 'react';
import type { SchoolModelCanvas } from '../types';

interface StartPageProps {
  canvasState: SchoolModelCanvas;
  onUpdateInfo: (info: {
    childName?: string;
    childAge?: string;
    childGrade?: string;
    schoolingContext?: string;
  }) => void;
  onStart: () => void;
}

export default function StartPage({
  canvasState,
  onUpdateInfo,
  onStart
}: StartPageProps) {
  const { childName, childAge, childGrade, schoolingContext } = canvasState;

  const handleStartSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) {
      alert('Please enter your child\'s name to personalize the canvas.');
      return;
    }
    onStart();
  };

  const contexts = [
    'Homeschooling',
    'Traditional school + supplementing',
    'Hybrid schooling',
    'Considering a change',
    'Other'
  ];

  return (
    <form onSubmit={handleStartSubmit} className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400 font-bold">
            SECTION 01 / START
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-800 mt-2 font-sans tracking-tight">
            Child Profile
          </h2>
          <p className="text-sm text-neutral-500 font-serif mt-1">
            Let's personalize your School Model Canvas strategy notebook.
          </p>
        </div>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="childName" className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-1">
              Child's Name <span className="text-[#E9604F]">*</span>
            </label>
            <input
              type="text"
              id="childName"
              value={childName}
              onChange={(e) => onUpdateInfo({ childName: e.target.value })}
              placeholder="e.g. Aria"
              required
              className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-800 text-sm font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="childAge" className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Age
              </label>
              <input
                type="text"
                id="childAge"
                value={childAge || ''}
                onChange={(e) => onUpdateInfo({ childAge: e.target.value })}
                placeholder="e.g. 8"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-800 text-sm font-sans"
              />
            </div>
            <div>
              <label htmlFor="childGrade" className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-1">
                Grade / Stage
              </label>
              <input
                type="text"
                id="childGrade"
                value={childGrade || ''}
                onChange={(e) => onUpdateInfo({ childGrade: e.target.value })}
                placeholder="e.g. 3rd Grade"
                className="w-full px-4 py-2.5 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-800 text-sm font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-semibold mb-2">
              Your Current Situation
            </label>
            <div className="grid grid-cols-1 gap-2">
              {contexts.map((ctx) => (
                <button
                  key={ctx}
                  type="button"
                  onClick={() => onUpdateInfo({ schoolingContext: ctx })}
                  className={`px-4 py-3 text-left text-sm rounded-lg border transition-all duration-200 flex items-center justify-between ${
                    schoolingContext === ctx
                      ? 'border-primary bg-primary/5 text-primary font-medium'
                      : 'border-neutral-200 hover:border-neutral-300 text-neutral-600 bg-white'
                  }`}
                >
                  <span>{ctx}</span>
                  <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                    schoolingContext === ctx 
                      ? 'border-primary bg-primary' 
                      : 'border-neutral-300'
                  }`}>
                    {schoolingContext === ctx && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-end">
        <button
          type="submit"
          disabled={!childName.trim()}
          className="px-6 py-3 font-semibold text-sm bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>Start the Canvas</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
