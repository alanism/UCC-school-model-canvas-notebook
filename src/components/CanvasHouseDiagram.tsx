import type { CSSProperties } from 'react';
import type { SchoolModelCanvas, BlockStatus } from '../types';
import { BLOCKS_STATIC_DATA } from '../constants/blocksData';

interface CanvasHouseDiagramProps {
  canvasState: SchoolModelCanvas;
  onBlockClick: (blockId: string) => void;
  activeBlockId?: string;
}

export default function CanvasHouseDiagram({
  canvasState,
  onBlockClick,
  activeBlockId
}: CanvasHouseDiagramProps) {
  const { blocks, educationalVision } = canvasState;

  // Render status badge
  const renderStatusBadge = (status: BlockStatus) => {
    switch (status) {
      case 'empty':
        return <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-400 font-mono font-medium">EMPTY</span>;
      case 'drafted':
        return <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/50 font-mono font-medium">DRAFT</span>;
      case 'reviewed':
        return <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/50 font-mono font-medium">REVIEWED</span>;
      case 'locked':
        return <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-800 text-white font-mono font-medium">LOCKED</span>;
      default:
        return null;
    }
  };

  const getBlockStyle = (blockId: string, status: BlockStatus) => {
    const isSelected = activeBlockId === blockId;
    const staticInfo = BLOCKS_STATIC_DATA[blockId] || { color: '#4EABBC' };
    const accentColor = staticInfo.color;
    
    let borderClass = 'border border-neutral-200 hover:border-neutral-400';
    let bgStyle: CSSProperties = { backgroundColor: '#ffffff' };
    let textMuted = 'text-neutral-500';
    
    if (status === 'drafted') {
      borderClass = 'border-2';
      bgStyle = { 
        backgroundColor: 'var(--nb-surface-1)', 
        borderColor: accentColor 
      };
    } else if (status === 'reviewed') {
      borderClass = 'border-2 shadow-sm';
      bgStyle = { 
        backgroundColor: '#ffffff',
        borderColor: accentColor 
      };
    } else if (status === 'locked') {
      borderClass = 'border-2 shadow';
      bgStyle = { 
        backgroundColor: `${accentColor}12`, // 7% opacity
        borderColor: accentColor
      };
    } else if (status === 'empty') {
      borderClass = 'border border-dashed border-neutral-200 hover:border-neutral-400';
    }

    if (isSelected) {
      borderClass = 'border-2 ring-2 ring-offset-2';
      bgStyle = {
        ...bgStyle,
        borderColor: 'var(--nb-primary)'
      };
    }

    return {
      borderClass,
      bgStyle,
      textMuted
    };
  };

  const renderCell = (id: string, customClasses = '') => {
    const block = blocks[id];
    if (!block) return null;
    const { borderClass, bgStyle } = getBlockStyle(id, block.status);
    
    return (
      <button
        key={id}
        onClick={() => onBlockClick(id)}
        className={`flex flex-col justify-between p-4 rounded-xl text-left cursor-pointer transition-all duration-200 hover:-translate-y-[1px] min-h-[110px] md:min-h-[130px] ${borderClass} ${customClasses}`}
        style={bgStyle}
      >
        <div>
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-neutral-400">
              {BLOCKS_STATIC_DATA[id]?.category.replace('_', ' ')}
            </span>
            {renderStatusBadge(block.status)}
          </div>
          <h4 className="font-semibold text-sm md:text-base tracking-tight mb-1 text-neutral-800">
            {block.label}
          </h4>
        </div>
        <p className="text-[11px] md:text-[12px] leading-snug line-clamp-2 text-neutral-500 font-serif italic">
          {block.userText ? `"${block.userText}"` : 'No answers written yet.'}
        </p>
      </button>
    );
  };

  // Pre-calculate progress
  const completedBlocks = Object.values(blocks).filter(b => b.status !== 'empty').length;

  return (
    <div className="w-full flex flex-col">
      {/* House Roof: Educational Vision */}
      <div className="w-full mb-4 relative">
        {/* Pitch Roof Visual */}
        <div className="absolute inset-x-0 bottom-0 h-4 bg-neutral-200/50 rounded-t-lg -z-10" />
        <button
          onClick={() => onBlockClick('educational_vision')}
          className={`w-full flex flex-col justify-between p-6 rounded-t-3xl border text-left cursor-pointer transition-all duration-300 min-h-[140px] relative overflow-hidden group ${
            educationalVision.locked 
              ? 'border-2 border-[#E9604F] bg-[#E9604F]/5' 
              : 'border-2 border-neutral-300 hover:border-neutral-500 bg-neutral-50/50'
          } ${activeBlockId === 'educational_vision' ? 'ring-2 ring-offset-2 ring-primary border-[#E9604F]' : ''}`}
        >
          {/* Triangular Roof Accent */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#E9604F]/5 rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform duration-300" />
          
          <div className="flex items-center justify-between w-full mb-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] px-2 py-0.5 bg-[#E9604F]/10 text-[#E9604F] font-mono tracking-widest uppercase rounded font-bold">
                ROOF / CAPSTONE
              </span>
              <span className="text-[11px] text-neutral-400 font-mono">
                {completedBlocks}/14 Blocks Complete
              </span>
            </div>
            {educationalVision.locked ? (
              <span className="text-[9px] px-2 py-0.5 rounded bg-[#E9604F] text-white font-mono font-semibold tracking-wider">
                LOCKED
              </span>
            ) : (
              <span className="text-[9px] px-2 py-0.5 rounded bg-neutral-200 text-neutral-600 font-mono font-medium">
                SYNTHESIZES LAST
              </span>
            )}
          </div>

          <div>
            <h3 className="font-bold text-lg md:text-xl text-neutral-800 mb-1 flex items-center gap-2 font-sans tracking-tight">
              Educational Vision
            </h3>
            <p className="text-[12px] md:text-[13px] leading-relaxed max-w-3xl text-neutral-600 font-serif italic">
              {educationalVision.text 
                ? `"${educationalVision.text}"` 
                : 'Your high-level educational vision sentence. This synthesizes at the end once you complete at least 10 foundation and support blocks.'}
            </p>
          </div>
        </button>
      </div>

      {/* House Columns / Body Grid */}
      <div className="grid grid-cols-5 gap-3.5 w-full">
        {/* Row 2 (Columns/Walls) */}
        {renderCell('teaching_approach', 'col-span-3')}
        {renderCell('child_interests', 'col-span-2')}

        {/* Row 3 (Pillars) */}
        {renderCell('learning_materials', 'col-span-1')}
        {renderCell('physical_activities', 'col-span-1')}
        {renderCell('social_efforts', 'col-span-1')}
        {renderCell('communication_style', 'col-span-1')}
        {renderCell('child_learning_style', 'col-span-1')}

        {/* Row 4 & 5 (Foundation / Side Supports) */}
        {renderCell('technology_use', 'col-span-1')}
        {renderCell('enrichment_programs', 'col-span-1')}
        
        {/* Self Confidence - Spans Row 4 & 5 (Tall Center Block) */}
        {renderCell('self_confidence', 'col-span-1 row-span-2 min-h-[235px] md:min-h-[275px]')}

        {renderCell('family_beliefs', 'col-span-1')}
        {renderCell('learning_environment', 'col-span-1')}

        {/* Row 5 (Bottom foundation) */}
        {renderCell('resources_committed', 'col-span-2')}
        {renderCell('parents_expectations', 'col-span-2')}
      </div>

      {/* House Metaphor Legend / Footer */}
      <div className="mt-6 p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-500">
        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center md:justify-start">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#E9604F]" /> Capstone & Foundation</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#4EABBC]" /> Core Structure & Systems</span>
        </div>
        <span className="italic text-center md:text-right">
          "The roof only works if the blocks underneath are clear."
        </span>
      </div>
    </div>
  );
}
