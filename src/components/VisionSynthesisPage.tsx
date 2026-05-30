import { useEffect, useState } from 'react';
import type { SchoolModelCanvas } from '../types';

interface VisionSynthesisPageProps {
  canvasState: SchoolModelCanvas;
  onUpdateVision: (vision: {
    text?: string;
    generatedFromBlockIds?: string[];
    manuallyEdited?: boolean;
    locked?: boolean;
  }) => void;
  onBackToMap: () => void;
  onNext: () => void;
}

export default function VisionSynthesisPage({
  canvasState,
  onUpdateVision,
  onBackToMap,
  onNext
}: VisionSynthesisPageProps) {
  const { blocks, educationalVision, childName } = canvasState;
  const [localText, setLocalText] = useState(educationalVision.text);
  const [isLocked, setIsLocked] = useState(educationalVision.locked);

  useEffect(() => {
    setLocalText(educationalVision.text);
    setIsLocked(educationalVision.locked);
  }, [educationalVision.text, educationalVision.locked]);

  // Count completed blocks (excluding educational_vision)
  const completedBlocksList = Object.values(blocks).filter(b => b.status !== 'empty');
  const completedCount = completedBlocksList.length;
  const isReady = completedCount >= 10;

  const generateDeterministicVision = () => {
    const name = childName.trim() || 'our child';

    // 1. Get virtue from family beliefs
    const familyBeliefsSelections = blocks.family_beliefs?.decisionSelections || [];
    let virtue = 'curious, capable';
    if (familyBeliefsSelections.includes('Agency')) virtue = 'self-directed, capable';
    else if (familyBeliefsSelections.includes('Curiosity')) virtue = 'curious, self-reliant';
    else if (familyBeliefsSelections.includes('Excellence')) virtue = 'resilient, high-achieving';
    else if (familyBeliefsSelections.includes('Service')) virtue = 'service-minded, capable';

    // 2. Get success type from parent expectations
    const expectationsSelections = blocks.parents_expectations?.decisionSelections || [];
    let role = 'learner';
    if (expectationsSelections.includes('Future Self')) role = 'adult';
    else if (expectationsSelections.includes('Academic')) role = 'student';
    else if (expectationsSelections.includes('Wholeness')) role = 'balanced learner';

    // 3. Get learning method from teaching approach
    const teachingSelections = blocks.teaching_approach?.decisionSelections || [];
    let model = 'structured study';
    if (teachingSelections.includes('Guided Choice')) model = 'guided-choice learning';
    else if (teachingSelections.includes('Student Led')) model = 'student-led projects';
    else if (teachingSelections.includes('Collaborative')) model = 'collaborative dialogue';

    // 4. Get primary resource from learning materials
    const materialsSelections = blocks.learning_materials?.decisionSelections || [];
    let material = 'quality materials';
    if (materialsSelections.includes('Physical Books')) material = 'books';
    else if (materialsSelections.includes('Digital Core')) material = 'curated apps';
    else if (materialsSelections.includes('First-Hand')) material = 'nature and primary sources';
    else if (materialsSelections.includes('Hybrid')) material = 'hybrid tools';

    // 5. Get character focus from self confidence
    const confidenceSelections = blocks.self_confidence?.decisionSelections || [];
    let target = 'core strengths';
    if (confidenceSelections.includes('Grit')) target = 'mental grit';
    else if (confidenceSelections.includes('Competence')) target = 'competence';
    else if (confidenceSelections.includes('Encouragement')) target = 'confidence';

    // Combine into sentence
    let result = `We are helping ${name} become a ${virtue} ${role} through ${model}, utilizing ${material} to build ${target}.`;

    // Strict guardrails: Max 180 characters, no buzzwords
    if (result.length > 180) {
      result = `We help ${name} become a ${virtue} ${role} using ${model} to build ${target}.`;
    }

    setLocalText(result);
    onUpdateVision({
      text: result,
      generatedFromBlockIds: completedBlocksList.map(b => b.id),
      manuallyEdited: false
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setLocalText(text);
    onUpdateVision({
      text,
      manuallyEdited: true
    });
  };

  const handleToggleLock = () => {
    const nextLocked = !isLocked;
    setIsLocked(nextLocked);
    onUpdateVision({ locked: nextLocked });
  };

  return (
    <div className="flex flex-col justify-between h-full w-full">
      <div className="flex flex-col gap-6">
        <div>
          <span className="text-[10px] tracking-widest uppercase font-mono text-[#E9604F] font-bold">
            SECTION 11 / CAPSTONE
          </span>
          <h2 className="text-3xl font-extrabold text-neutral-800 mt-2 font-sans tracking-tight">
            Educational Vision
          </h2>
          <p className="text-sm text-neutral-500 font-serif mt-1">
            Synthesize all other blocks into a single plain-spoken organizing sentence.
          </p>
        </div>

        {/* Readiness Check */}
        {!isReady ? (
          <div className="p-5 rounded-2xl border border-dashed border-amber-300 bg-amber-50/50 flex flex-col gap-3">
            <h4 className="font-semibold text-amber-800 text-sm flex items-center gap-1.5 font-sans">
              ⚠️ Vision Engine Locked
            </h4>
            <p className="text-xs text-amber-700 font-serif leading-relaxed">
              To synthesize a valid vision, you need a critical mass of background choices. Please complete at least <strong>10 of the 14</strong> supporting canvas blocks.
            </p>
            <div className="w-full bg-neutral-200 rounded-full h-1.5 mt-1 overflow-hidden">
              <div 
                className="bg-[#E9604F] h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(completedCount / 10) * 100}%` }}
              />
            </div>
            <div className="flex justify-between font-mono text-[10px] text-amber-800">
              <span>{completedCount} blocks complete</span>
              <span>10 required</span>
            </div>
            
            <button
              type="button"
              onClick={onBackToMap}
              className="mt-2 text-center text-xs font-semibold bg-white border border-amber-300 text-amber-800 py-2.5 rounded-lg hover:bg-amber-100/50 transition-colors cursor-pointer"
            >
              Back to Map to Complete Blocks
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                VISION SYNTHESIS FORMULA
              </span>
              <p className="text-xs text-neutral-500 font-serif leading-normal">
                "We are helping <strong>[child]</strong> become <strong>[kind of person]</strong> by using <strong>[learning model]</strong> to build <strong>[skills/character]</strong>."
              </p>
              
              {!localText && (
                <button
                  type="button"
                  onClick={generateDeterministicVision}
                  className="mt-2 text-xs bg-neutral-800 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer self-start flex items-center gap-1"
                >
                  ⚡ Synthesize One-Liner
                </button>
              )}
            </div>

            {localText && (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="visionText" className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      Synthesized Statement (One sentence, max 180 chars)
                    </label>
                    <span className={`text-[10px] font-mono ${localText.length > 180 ? 'text-red-500 font-bold' : 'text-neutral-400'}`}>
                      {localText.length}/180 chars
                    </span>
                  </div>
                  
                  <textarea
                    id="visionText"
                    rows={4}
                    value={localText}
                    onChange={handleTextChange}
                    disabled={isLocked}
                    className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary/20 text-neutral-800 text-sm font-sans leading-relaxed ${
                      isLocked 
                        ? 'bg-neutral-50 border-neutral-200 text-neutral-500 cursor-not-allowed' 
                        : 'border-neutral-200 focus:border-primary'
                    }`}
                  />
                  {localText.length > 180 && (
                    <p className="text-[10px] text-red-500 font-mono">
                      ⚠️ Statement exceeds the 180-character maximum limit. Please condense.
                    </p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={generateDeterministicVision}
                    disabled={isLocked}
                    className="text-xs bg-neutral-100 hover:bg-neutral-200 disabled:opacity-50 text-neutral-700 font-semibold py-2.5 px-4 rounded-lg cursor-pointer transition-colors"
                  >
                    Regenerate
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleLock}
                    disabled={localText.length > 180}
                    className={`flex-1 text-xs font-semibold py-2.5 px-4 rounded-lg cursor-pointer transition-colors text-center border ${
                      isLocked
                        ? 'bg-[#E9604F] border-[#E9604F] text-white hover:bg-[#d85040]'
                        : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                    }`}
                  >
                    {isLocked ? '🔓 Unlock Final Vision' : '🔒 Lock Educational Vision'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
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
          <span>Review & Export</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
