import { useEffect, useState } from 'react';
import type { CanvasBlock, BlockStatus } from '../types';
import { BLOCKS_STATIC_DATA } from '../constants/blocksData';

interface BlockWorkbookPageProps {
  block: CanvasBlock;
  onUpdateText: (blockId: string, text: string) => void;
  onUpdateSelections: (blockId: string, selections: string[]) => void;
  onUpdateStatus: (blockId: string, status: BlockStatus) => void;
  onNext: () => void;
  onBackToMap: () => void;
  childName: string;
}

export default function BlockWorkbookPage({
  block,
  onUpdateText,
  onUpdateSelections,
  onUpdateStatus,
  onNext,
  onBackToMap,
  childName
}: BlockWorkbookPageProps) {
  const staticInfo = BLOCKS_STATIC_DATA[block.id];
  const [localText, setLocalText] = useState(block.userText);

  // Sync state if block changes
  useEffect(() => {
    setLocalText(block.userText);
  }, [block.id, block.userText]);

  if (!staticInfo) {
    return <div className="p-4 text-red-500">Error: Block not found</div>;
  }

  // Auto-Draft Generation Logic
  const handleGenerateDraft = () => {
    if (!staticInfo.grids) return;
    
    let draft = staticInfo.templateFormat || '';
    
    staticInfo.grids.forEach((grid) => {
      // Find if an option in this grid is selected
      const selectedOption = grid.options.find(opt => 
        block.decisionSelections.includes(opt.label)
      );
      
      const placeholderKey = getPlaceholderKeyForGrid(grid.title);
      const textToInsert = selectedOption 
        ? selectedOption.label.toLowerCase() 
        : `[${placeholderKey}]`;
        
      draft = draft.replace(`[${placeholderKey}]`, textToInsert);
    });

    // Replace placeholder student name if childName is entered
    if (childName) {
      draft = draft.replace(/this child/gi, childName);
      draft = draft.replace(/the student/gi, childName);
    }

    setLocalText(draft);
    onUpdateText(block.id, draft);
  };

  const getPlaceholderKeyForGrid = (title: string): string => {
    switch (title) {
      case 'Content Control': return 'control';
      case 'Feedback Method': return 'feedback';
      case 'Pacing': return 'pacing';
      case 'Output of Interest': return 'output';
      case 'Interest Mapping': return 'interests';
      case 'Choice Level': return 'choice';
      case 'Primary Medium': return 'medium';
      case 'Input Quality': return 'quality';
      case 'Curation Philosophy': return 'philosophy';
      case 'Activity Type': return 'type';
      case 'Discipline Level': return 'discipline';
      case 'Mental Connection': return 'connection';
      case 'Peer Group': return 'group';
      case 'Frequency': return 'frequency';
      case 'Skill Focus': return 'skill';
      case 'Feedback Loop': return 'loop';
      case 'Conflict Strategy': return 'conflict';
      case 'Authority Tone': return 'tone';
      case 'Input Preference': return 'preference';
      case 'Processing Environment': return 'env';
      case 'Novelty Seeking': return 'novelty';
      case 'Device Role': return 'role';
      case 'Consumption Ratio': return 'consumption';
      case 'AI Integration': return 'ai';
      case 'Focus Area': return 'focus';
      case 'Mentor Source': return 'mentor';
      case 'Intensity': return 'intensity';
      case 'Growth Driver': return 'driver';
      case 'Risk Level': return 'risk';
      case 'Risk Tolerance': return 'risk';
      case 'Self-Talk & Reflection': return 'talk';
      case 'Primary Virtue': return 'virtue';
      case 'Motivation Source': return 'motivation';
      case 'Spatial Vibe': return 'vibe';
      case 'Sensory Input': return 'sensory';
      case 'Ownership': return 'ownership';
      case 'Financial Priority': return 'priority';
      case 'Parent\'s Time': return 'time';
      case 'Energy Source & Focus': return 'energy';
      case 'Success Timeline': return 'timeline';
      case 'Involvement': return 'involvement';
      case 'Output Standard': return 'standard';
      default: return 'value';
    }
  };

  const handleChipClick = (label: string, gridTitle: string) => {
    if (!staticInfo.grids) return;
    
    // Find options in the active grid to ensure mutual exclusivity per category grid
    const targetGrid = staticInfo.grids.find(g => g.title === gridTitle);
    if (!targetGrid) return;
    
    const otherLabelsInGrid = targetGrid.options.map(o => o.label);
    
    // Remove any previously selected options from the same grid category
    const cleanSelections = block.decisionSelections.filter(
      sel => !otherLabelsInGrid.includes(sel)
    );
    
    // If it wasn't already selected, add it
    const isAlreadySelected = block.decisionSelections.includes(label);
    let newSelections = cleanSelections;
    if (!isAlreadySelected) {
      newSelections = [...cleanSelections, label];
    }
    
    onUpdateSelections(block.id, newSelections);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalText(val);
    onUpdateText(block.id, val);
  };

  const setStatus = (status: BlockStatus) => {
    onUpdateStatus(block.id, status);
  };

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-5">
        
        {/* Header and Nav */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] tracking-widest uppercase font-mono text-neutral-400 font-bold">
                GUIDED WORKBOOK / BLOCK
              </span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: staticInfo.color }} />
            </div>
            <h3 className="text-2xl font-bold text-neutral-800 font-sans tracking-tight">
              {block.label}
            </h3>
          </div>
          
          <button 
            type="button"
            onClick={onBackToMap}
            className="text-[11px] font-mono border border-neutral-200 hover:bg-neutral-50 px-2.5 py-1.5 rounded-lg text-neutral-600 cursor-pointer flex items-center gap-1 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Map</span>
          </button>
        </div>

        {/* Option Chips Grids */}
        {staticInfo.grids && staticInfo.grids.length > 0 && (
          <div className="flex flex-col gap-4">
            {staticInfo.grids.map((grid) => {
              const selectedLabel = grid.options.find(o => block.decisionSelections.includes(o.label))?.label;
              
              return (
                <div key={grid.title} className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                    {grid.title}
                  </span>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {grid.options.map((opt) => {
                      const isSelected = block.decisionSelections.includes(opt.label);
                      return (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => handleChipClick(opt.label, grid.title)}
                          title={opt.text}
                          className={`p-2.5 text-center text-xs rounded-lg border transition-all duration-200 cursor-pointer flex flex-col justify-center items-center min-h-[48px] ${
                            isSelected
                              ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm'
                              : 'border-neutral-200 hover:border-neutral-300 text-neutral-600 bg-white'
                          }`}
                        >
                          <span className="line-clamp-1">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                  {selectedLabel && (
                    <p className="text-[11px] text-neutral-400 italic font-serif">
                      Selected: "{grid.options.find(o => o.label === selectedLabel)?.text}"
                    </p>
                  )}
                </div>
              );
            })}

            <div className="flex justify-start">
              <button
                type="button"
                onClick={handleGenerateDraft}
                className="text-[11px] font-mono bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 py-1.5 rounded-lg font-medium cursor-pointer transition-colors"
              >
                ⚡ Auto-Draft from Chips
              </button>
            </div>
          </div>
        )}

        {/* Text Area */}
        <div className="flex flex-col gap-2">
          <label htmlFor="userText" className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
            Workbook Statement Draft
          </label>
          <textarea
            id="userText"
            rows={4}
            value={localText}
            onChange={handleTextChange}
            placeholder={`e.g. ${block.exampleGood}`}
            className="w-full px-4 py-3 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-neutral-800 text-sm font-sans"
          />
        </div>

        {/* Status Settings */}
        <div className="flex flex-col gap-2">
          <span className="block text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
            Block Status
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setStatus('drafted')}
              className={`flex-1 py-2 text-center text-xs rounded-lg border transition-all duration-200 cursor-pointer ${
                block.status === 'drafted'
                  ? 'bg-amber-50 text-amber-700 border-amber-300 font-semibold'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Draft
            </button>
            <button
              type="button"
              onClick={() => setStatus('reviewed')}
              className={`flex-1 py-2 text-center text-xs rounded-lg border transition-all duration-200 cursor-pointer ${
                block.status === 'reviewed'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Reviewed
            </button>
            <button
              type="button"
              onClick={() => setStatus('locked')}
              className={`flex-1 py-2 text-center text-xs rounded-lg border transition-all duration-200 cursor-pointer ${
                block.status === 'locked'
                  ? 'bg-neutral-800 text-white border-neutral-800 font-semibold'
                  : 'bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50'
              }`}
            >
              Lock Block
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between">
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

        <button
          type="button"
          onClick={onNext}
          className="px-5 py-2.5 font-semibold text-xs bg-neutral-800 hover:bg-neutral-900 text-white rounded-lg transition-colors cursor-pointer shadow flex items-center gap-1.5"
        >
          <span>Next Block</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
