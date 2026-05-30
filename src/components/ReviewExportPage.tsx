import { useState } from 'react';
import type { SchoolModelCanvas } from '../types';
import { BLOCKS_STATIC_DATA } from '../constants/blocksData';

interface ReviewExportPageProps {
  canvasState: SchoolModelCanvas;
  onBackToMap: () => void;
  onClearAll: () => void;
}

export default function ReviewExportPage({
  canvasState,
  onBackToMap,
  onClearAll
}: ReviewExportPageProps) {
  const { childName, childAge, childGrade, schoolingContext, blocks, educationalVision } = canvasState;
  const [copySuccess, setCopySuccess] = useState(false);

  // Generate markdown content
  const buildMarkdown = (): string => {
    let md = `# School Model Canvas — ${childName || 'Student Name'}\n\n`;
    
    // Add Metadata
    md += `* **Age:** ${childAge || 'Not specified'}\n`;
    md += `* **Grade/Stage:** ${childGrade || 'Not specified'}\n`;
    md += `* **Schooling Context:** ${schoolingContext || 'Not specified'}\n`;
    md += `* **Exported Date:** ${new Date().toLocaleDateString()}\n\n`;
    
    md += `## Educational Vision\n\n`;
    md += `${educationalVision.text || 'Not completed'}\n\n`;
    md += `---\n\n`;

    // Loop through blocks in order
    Object.keys(BLOCKS_STATIC_DATA).forEach((key) => {
      const block = blocks[key];
      if (block) {
        md += `## ${block.label}\n\n`;
        md += `${block.userText.trim() || 'Not completed'}\n\n`;
        if (block.decisionSelections && block.decisionSelections.length > 0) {
          md += `*Selections: ${block.decisionSelections.join(', ')}*\n\n`;
        }
      }
    });

    return md;
  };

  const handleCopyMarkdown = () => {
    const md = buildMarkdown();
    navigator.clipboard.writeText(md)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  };

  const handleDownloadMarkdown = () => {
    const md = buildMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    
    const formattedDate = new Date().toISOString().split('T')[0];
    const safeName = (childName || 'Strategy').replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    link.href = url;
    link.setAttribute('download', `UCC-SMC-Playbook-${safeName}-${formattedDate}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400 font-bold">
            SECTION 12 / REVIEW & EXPORT
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-800 mt-2 font-sans tracking-tight">
            Review Canvas
          </h2>
          <p className="text-sm text-neutral-500 font-serif mt-1">
            Review all completed blocks and export your final strategy.
          </p>
        </div>

        {/* Vision Highlight */}
        <div className="p-5 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col gap-2">
          <span className="text-[9px] font-mono tracking-widest uppercase text-[#E9604F] font-bold">
            EDUCATIONAL VISION ONE-LINER
          </span>
          <p className="text-sm text-neutral-800 font-serif italic font-medium leading-relaxed">
            {educationalVision.text ? `"${educationalVision.text}"` : 'Educational vision not generated/locked.'}
          </p>
        </div>

        {/* Scrollable preview of all answers */}
        <div className="flex flex-col gap-4 border border-neutral-200 rounded-2xl p-4 bg-white max-h-[380px] overflow-y-auto notebook-scroll">
          <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
            CANVAS LOG PREVIEW
          </span>
          
          <div className="flex flex-col gap-4 divide-y divide-neutral-100">
            {Object.keys(BLOCKS_STATIC_DATA).map((key) => {
              const block = blocks[key];
              if (!block) return null;
              return (
                <div key={key} className="pt-3 first:pt-0 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-800">{block.label}</span>
                    <span className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded ${
                      block.status === 'empty'
                        ? 'bg-neutral-100 text-neutral-400'
                        : block.status === 'drafted'
                        ? 'bg-amber-50 text-amber-600'
                        : block.status === 'reviewed'
                        ? 'bg-emerald-50 text-emerald-600'
                        : 'bg-neutral-800 text-white'
                    }`}>
                      {block.status}
                    </span>
                  </div>
                  <p className="text-[11px] md:text-xs text-neutral-600 font-serif leading-normal italic">
                    {block.userText.trim() ? `"${block.userText.trim()}"` : 'Not completed.'}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            type="button"
            onClick={handleCopyMarkdown}
            className="flex items-center justify-center gap-2 p-3 border border-neutral-300 hover:bg-neutral-50 rounded-xl text-xs font-semibold cursor-pointer transition-colors text-neutral-700 bg-white shadow-sm"
          >
            <span>{copySuccess ? '✓ Copied!' : '📋 Copy Markdown'}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="flex items-center justify-center gap-2 p-3 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors shadow"
          >
            <span>📥 Download Playbook</span>
          </button>
        </div>

        {/* Reset / Danger Zone */}
        <div className="border-t border-neutral-100 pt-4 flex justify-between items-center">
          <p className="text-[11px] text-neutral-400 font-serif">
            Done with the canvas? You can clear all data to start fresh.
          </p>
          <button
            type="button"
            onClick={onClearAll}
            className="text-[10px] font-mono border border-red-200 text-red-600 hover:bg-red-50/50 px-2.5 py-1.5 rounded-lg cursor-pointer transition-colors font-semibold"
          >
            Reset Canvas
          </button>
        </div>

      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 flex justify-start">
        <button
          type="button"
          onClick={onBackToMap}
          className="text-xs font-semibold text-neutral-600 hover:text-neutral-800 cursor-pointer flex items-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Map View</span>
        </button>
      </div>
    </div>
  );
}
