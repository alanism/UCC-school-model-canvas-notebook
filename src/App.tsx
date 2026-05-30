import { useState, useEffect } from 'react';
import BookLayout from './components/BookLayout';
import StartPage from './components/StartPage';
import CanvasHouseDiagram from './components/CanvasHouseDiagram';
import BlockWorkbookPage from './components/BlockWorkbookPage';
import VisionSynthesisPage from './components/VisionSynthesisPage';
import ReviewExportPage from './components/ReviewExportPage';
import { usePersistence } from './hooks/usePersistence';
import type { SitePaletteId } from './types';
import { BLOCKS_STATIC_DATA } from './constants/blocksData';

// Tab configuration
interface SectionTab {
  id: string;
  label: string;
  blocks: string[];
}

const TABS: SectionTab[] = [
  { id: 'start', label: 'Start', blocks: [] },
  { id: 'map', label: 'Canvas Map', blocks: [] },
  { id: 'teaching', label: 'Teaching', blocks: ['teaching_approach'] },
  { id: 'child', label: 'Child', blocks: ['child_interests', 'child_learning_style'] },
  { id: 'materials', label: 'Materials', blocks: ['learning_materials', 'technology_use'] },
  { id: 'body_social', label: 'Body & Social', blocks: ['physical_activities', 'social_efforts', 'enrichment_programs', 'self_confidence'] },
  { id: 'environment', label: 'Environment', blocks: ['learning_environment', 'communication_style'] },
  { id: 'beliefs', label: 'Beliefs', blocks: ['family_beliefs'] },
  { id: 'resources', label: 'Resources', blocks: ['resources_committed'] },
  { id: 'expectations', label: 'Expectations', blocks: ['parents_expectations'] },
  { id: 'vision', label: 'Vision', blocks: ['educational_vision'] },
  { id: 'review', label: 'Review & Export', blocks: [] }
];

export default function App() {
  const {
    state: canvasState,
    updateChildInfo,
    updateBlockText,
    updateBlockStatus,
    updateBlockSelections,
    updateEducationalVision,
    resetState
  } = usePersistence();

  const [activeTabId, setActiveTabId] = useState<string>('start');
  const [activeBlockId, setActiveBlockId] = useState<string>('teaching_approach');
  const [activePaletteId, setActivePaletteId] = useState<SitePaletteId>('blossom');

  // Load palette from localStorage on init
  useEffect(() => {
    const stored = localStorage.getItem('ucc-smc-palette') as SitePaletteId;
    if (stored && ['blossom', 'cobalt', 'sage', 'neutral'].includes(stored)) {
      setActivePaletteId(stored);
    }
  }, []);

  // Update theme class on HTML element when palette changes
  useEffect(() => {
    localStorage.setItem('ucc-smc-palette', activePaletteId);
    
    // Remove other theme classes
    const html = document.documentElement;
    html.classList.remove('theme-blossom', 'theme-cobalt', 'theme-sage', 'theme-neutral');
    html.classList.add(`theme-${activePaletteId}`);
  }, [activePaletteId]);

  // Navigate to block from house click
  const handleBlockClickFromMap = (blockId: string) => {
    if (blockId === 'educational_vision') {
      setActiveTabId('vision');
      setActiveBlockId('educational_vision');
      return;
    }

    // Find tab containing this block
    const tab = TABS.find(t => t.blocks.includes(blockId));
    if (tab) {
      setActiveTabId(tab.id);
      setActiveBlockId(blockId);
    }
  };

  // Navigate to the next screen sequence
  const handleNextSequence = () => {
    const currentIndex = TABS.findIndex(t => t.id === activeTabId);
    
    // If active tab has multiple blocks and we aren't on the last block of the tab
    const tabConfig = TABS[currentIndex];
    if (tabConfig && tabConfig.blocks.length > 1) {
      const activeBlockIndex = tabConfig.blocks.indexOf(activeBlockId);
      if (activeBlockIndex < tabConfig.blocks.length - 1) {
        // Go to next block in same tab
        setActiveBlockId(tabConfig.blocks[activeBlockIndex + 1]);
        return;
      }
    }

    // Otherwise, go to next tab
    if (currentIndex < TABS.length - 1) {
      const nextTab = TABS[currentIndex + 1];
      setActiveTabId(nextTab.id);
      
      // Auto-select first block of next tab
      if (nextTab.blocks.length > 0) {
        setActiveBlockId(nextTab.blocks[0]);
      }
    }
  };

  // Header render
  const renderHeader = () => {
    return (
      <header className="w-full max-w-6xl mx-auto mb-6 px-4 flex flex-col md:flex-row items-center justify-between gap-4 py-2 border-b border-desk-rule/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono uppercase font-bold text-xs">
            <span className="text-neutral-800">UCC</span>
            <span className="text-[#4EABBC]">SMC</span>
          </div>
          <span className="w-[1px] h-4 bg-neutral-300 hidden md:inline" />
          <h1 className="text-sm font-semibold text-neutral-700 tracking-tight">
            School Model Canvas Guided Notebook
          </h1>
        </div>

        {/* Theme select & Reset */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-semibold">Palette:</span>
            <div className="flex gap-1.5 bg-neutral-200/50 p-1 rounded-lg">
              {(['blossom', 'cobalt', 'sage', 'neutral'] as SitePaletteId[]).map((pal) => {
                const colors: Record<SitePaletteId, string> = {
                  blossom: '#E3B1B8',
                  cobalt: '#4A72B8',
                  sage: '#7FAF8A',
                  neutral: '#7c7267'
                };
                return (
                  <button
                    key={pal}
                    onClick={() => setActivePaletteId(pal)}
                    title={pal.toUpperCase()}
                    className={`w-4 h-4 rounded-full border cursor-pointer transition-transform ${
                      activePaletteId === pal ? 'border-neutral-800 scale-110 shadow-sm' : 'border-transparent hover:scale-105'
                    }`}
                    style={{ backgroundColor: colors[pal] }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </header>
    );
  };

  // LEFT page content based on tab
  const getLeftPageContent = () => {
    switch (activeTabId) {
      case 'start':
        return (
          <div className="flex flex-col justify-between h-full py-2">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">INTRO</span>
              <div>
                <h2 className="text-4xl font-extrabold font-sans text-neutral-800 leading-tight tracking-tight">
                  School Model Canvas
                </h2>
                <p className="text-sm font-serif italic text-neutral-500 mt-2">
                  "A simple way to design your child's learning system before choosing curriculum, tutors, apps, or schools."
                </p>
              </div>

              <div className="w-full overflow-hidden rounded-xl border border-neutral-100 shadow-[0_4px_12px_rgba(40,30,30,0.04)] bg-white p-1">
                <img 
                  src="/smc-ionic-greek-villa.png" 
                  alt="School Model Canvas Greek Villa Metaphor" 
                  className="w-full max-h-[220px] object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col gap-4 text-xs text-neutral-600 font-serif leading-relaxed">
                <p>
                  Before you commit budget to subscriptions, hire educators, or buy textbooks, you need a blueprint. 
                </p>
                <div className="p-4 rounded-xl border border-neutral-100 bg-neutral-50/50 flex flex-col gap-2">
                  <h4 className="font-mono uppercase font-bold text-[10px] text-neutral-500">The House Metaphor</h4>
                  <p className="text-[11px] leading-relaxed">
                    Your <strong>Educational Vision</strong> is the roof. The other blocks are the structural walls, supports, and foundation holding it up.
                  </p>
                  <span className="text-[11px] font-semibold text-neutral-600 italic">
                    "The roof only works if the blocks underneath are clear."
                  </span>
                </div>
              </div>
            </div>
            
            <div className="font-mono text-[10px] text-neutral-400">
              UnCommon Core • Interactive Playbook v1.0
            </div>
          </div>
        );

      case 'map':
        const completedCount = Object.values(canvasState.blocks).filter(b => b.status !== 'empty').length;
        return (
          <div className="flex flex-col justify-between h-full py-2">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">ORIENT</span>
              <div>
                <h2 className="text-3xl font-extrabold font-sans text-neutral-800 leading-tight tracking-tight">
                  The Canvas Map
                </h2>
                <p className="text-sm font-serif italic text-neutral-500 mt-1">
                  View and navigate your strategy blocks.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs text-neutral-600 font-serif leading-relaxed">
                <p>
                  The canvas is arranged in building layers from foundation (beliefs and expectations) up to structural frames, systems, and child supports.
                </p>
                <p>
                  Click into any block in the house diagram on the right page to write your answers. Complete at least 10 blocks to unlock your Capstone Educational Vision.
                </p>
                
                <div className="mt-4 p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col gap-1 font-mono text-[11px]">
                  <div className="flex justify-between">
                    <span>Completed Blocks:</span>
                    <span className="font-bold text-neutral-700">{completedCount} / 14</span>
                  </div>
                  <div className="w-full bg-neutral-200 h-1 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className="bg-primary h-1 rounded-full transition-all duration-300"
                      style={{ width: `${(completedCount / 14) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="font-mono text-[10px] text-neutral-400">
              UCC-SMC Playbook • Interactive Workbook
            </div>
          </div>
        );

      case 'vision':
        return (
          <div className="flex flex-col justify-between h-full py-2">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#E9604F] font-bold">CAPSTONE</span>
              <div>
                <h2 className="text-3xl font-extrabold font-sans text-neutral-800 leading-tight tracking-tight">
                  Educational Vision
                </h2>
                <p className="text-sm font-serif italic text-neutral-500 mt-1">
                  Synthesize the capstone one-liner.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs text-neutral-600 font-serif leading-relaxed">
                <p>
                  The vision statement is the roof of your house. It represents the operating sentence for your child's learning model.
                </p>
                <p>
                  Once generated, this statement should be clean, specific to {canvasState.childName || 'your child'}, and free of inspirational boilerplate text.
                </p>
                <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200 text-[11px] leading-relaxed text-amber-800">
                  <strong>Guardrails:</strong> Maintain the statement under 180 characters. Avoid therapy-speak and vague buzzwords like "empower", "nurture", or "unlock potential".
                </div>
              </div>
            </div>
            
            <div className="font-mono text-[10px] text-neutral-400">
              Capstone synthesis • Locked last
            </div>
          </div>
        );

      case 'review':
        return (
          <div className="flex flex-col justify-between h-full py-2">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">COMPLETE</span>
              <div>
                <h2 className="text-3xl font-extrabold font-sans text-neutral-800 leading-tight tracking-tight">
                  Playbook Archive
                </h2>
                <p className="text-sm font-serif italic text-neutral-500 mt-1">
                  Your strategy is saved and ready.
                </p>
              </div>

              <div className="flex flex-col gap-4 text-xs text-neutral-600 font-serif leading-relaxed">
                <p>
                  You have successfully designed a personalized educational system for <strong>{canvasState.childName || 'your child'}</strong>.
                </p>
                <p>
                  The choices you've documented across teaching methods, technology ratios, physical balance, and family virtues should serve as a daily compass.
                </p>
                <p>
                  Export the files as raw markdown to store them locally or share them with tutors, spouses, or coaches.
                </p>
              </div>
            </div>
            
            <div className="font-mono text-[10px] text-neutral-400">
              Strategy complete • Offline saved
            </div>
          </div>
        );

      default:
        // Render block copywriting details on the left page
        const blockInfo = BLOCKS_STATIC_DATA[activeBlockId];
        if (!blockInfo) return null;
        return (
          <div className="flex flex-col justify-between h-full py-2">
            <div className="flex flex-col gap-5">
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                GUIDE / {blockInfo.category.replace('_', ' ')}
              </span>
              <div>
                <h2 className="text-3xl font-extrabold font-sans text-neutral-800 leading-tight tracking-tight">
                  {blockInfo.label}
                </h2>
                <p className="text-xs font-serif italic text-neutral-500 mt-1">
                  {blockInfo.explainer}
                </p>
              </div>

              {/* Good/Weak Examples */}
              <div className="flex flex-col gap-3 text-[11px] font-sans">
                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/30">
                  <span className="font-mono font-bold text-[9px] text-emerald-700 block mb-1">✓ STRONG CHOICE STATEMENT</span>
                  <p className="text-neutral-700 font-serif italic">"{blockInfo.exampleGood}"</p>
                </div>
                <div className="p-3 rounded-xl border border-rose-100 bg-rose-50/30">
                  <span className="font-mono font-bold text-[9px] text-rose-700 block mb-1">✗ VAGUE STATEMENT</span>
                  <p className="text-neutral-700 font-serif italic">"{blockInfo.exampleWeak}"</p>
                </div>
              </div>

              {/* Guiding Questions */}
              <div className="flex flex-col gap-2 font-serif text-xs text-neutral-600">
                <span className="font-mono font-bold text-[9px] text-neutral-400 uppercase tracking-wider block">GUIDING QUESTIONS</span>
                <ul className="list-disc pl-4 flex flex-col gap-1.5">
                  {blockInfo.guidingQuestions.map((q, idx) => (
                    <li key={idx} className="leading-snug">{q}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="font-mono text-[10px] text-neutral-400">
              UCC School Model Canvas
            </div>
          </div>
        );
    }
  };

  // RIGHT page content based on tab
  const getRightPageContent = () => {
    switch (activeTabId) {
      case 'start':
        return (
          <StartPage
            canvasState={canvasState}
            onUpdateInfo={updateChildInfo}
            onStart={() => setActiveTabId('map')}
          />
        );

      case 'map':
        return (
          <CanvasHouseDiagram
            canvasState={canvasState}
            onBlockClick={handleBlockClickFromMap}
            activeBlockId={activeBlockId}
          />
        );

      case 'vision':
        return (
          <VisionSynthesisPage
            canvasState={canvasState}
            onUpdateVision={updateEducationalVision}
            onBackToMap={() => setActiveTabId('map')}
            onNext={() => setActiveTabId('review')}
          />
        );

      case 'review':
        return (
          <ReviewExportPage
            canvasState={canvasState}
            onBackToMap={() => setActiveTabId('map')}
            onClearAll={() => {
              resetState();
              setActiveTabId('start');
            }}
          />
        );

      default:
        // Workbook block view
        const block = canvasState.blocks[activeBlockId];
        if (!block) return <div>Block state not found</div>;
        
        // Find TABS config to see if we should render sub-tabs for multiple blocks in this section
        const tabConfig = TABS.find(t => t.id === activeTabId);
        
        return (
          <div className="flex flex-col h-full justify-between">
            {/* Render sub-tabs if multiple blocks are grouped in this section */}
            {tabConfig && tabConfig.blocks.length > 1 && (
              <div className="flex gap-1.5 border-b border-neutral-100 pb-2 mb-3 overflow-x-auto notebook-scroll">
                {tabConfig.blocks.map((bId) => {
                  const bState = canvasState.blocks[bId];
                  const staticB = BLOCKS_STATIC_DATA[bId];
                  if (!bState || !staticB) return null;
                  
                  return (
                    <button
                      key={bId}
                      onClick={() => setActiveBlockId(bId)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg cursor-pointer transition-all ${
                        activeBlockId === bId
                          ? 'bg-neutral-800 text-white font-bold'
                          : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {staticB.label}
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          bState.status === 'empty' 
                            ? 'bg-neutral-300' 
                            : bState.status === 'locked' 
                            ? 'bg-neutral-800' 
                            : 'bg-primary'
                        }`} />
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
            
            <BlockWorkbookPage
              block={block}
              onUpdateText={updateBlockText}
              onUpdateSelections={updateBlockSelections}
              onUpdateStatus={updateBlockStatus}
              onNext={handleNextSequence}
              onBackToMap={() => setActiveTabId('map')}
              childName={canvasState.childName}
            />
          </div>
        );
    }
  };

  // Convert tab configuration into BookLayout tabs format
  const bookTabs = TABS.map((tab) => ({
    id: tab.id,
    label: tab.label,
    isActive: activeTabId === tab.id,
    onClick: () => {
      setActiveTabId(tab.id);
      // Auto select the first block in the tab if blocks exist
      if (tab.blocks.length > 0) {
        setActiveBlockId(tab.blocks[0]);
      }
    }
  }));

  // Mobile selection header
  const renderMobileNav = () => {
    return (
      <div className="w-full flex flex-col gap-2 p-3 bg-white rounded-xl border border-neutral-100 shadow-sm">
        <label htmlFor="mobile-tab-select" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold block">
          Navigate Section
        </label>
        <select
          id="mobile-tab-select"
          value={activeTabId}
          onChange={(e) => {
            const nextTabId = e.target.value;
            setActiveTabId(nextTabId);
            const tab = TABS.find(t => t.id === nextTabId);
            if (tab && tab.blocks.length > 0) {
              setActiveBlockId(tab.blocks[0]);
            }
          }}
          className="w-full p-2.5 rounded-lg border border-neutral-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-neutral-800 font-sans"
        >
          {TABS.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    );
  };

  return (
    <div className={`theme-${activePaletteId} w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen relative`}>
      {renderHeader()}
      
      <main className="w-full flex-1 flex justify-center items-center">
        <BookLayout
          leftPage={getLeftPageContent()}
          rightPage={getRightPageContent()}
          tabs={bookTabs}
          mobileNav={renderMobileNav()}
        />
      </main>
    </div>
  );
}
