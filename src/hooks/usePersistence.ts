import { useState, useEffect } from 'react';
import type { SchoolModelCanvas, CanvasBlock, BlockStatus } from '../types';
import { BLOCKS_STATIC_DATA } from '../constants/blocksData';

const LOCAL_STORAGE_KEY = 'ucc-school-model-canvas-state';

const createInitialState = (): SchoolModelCanvas => {
  const blocks: Record<string, CanvasBlock> = {};
  
  Object.keys(BLOCKS_STATIC_DATA).forEach((key) => {
    const staticInfo = BLOCKS_STATIC_DATA[key];
    blocks[key] = {
      id: staticInfo.id,
      label: staticInfo.label,
      category: staticInfo.category,
      explainer: staticInfo.explainer,
      guidingQuestions: staticInfo.guidingQuestions,
      exampleGood: staticInfo.exampleGood,
      exampleWeak: staticInfo.exampleWeak,
      userText: '',
      decisionSelections: [],
      status: 'empty',
      updatedAt: new Date().toISOString(),
    };
  });

  return {
    childName: '',
    childAge: '',
    childGrade: '',
    schoolingContext: '',
    blocks,
    educationalVision: {
      text: '',
      generatedFromBlockIds: [],
      manuallyEdited: false,
      locked: false,
      updatedAt: new Date().toISOString(),
    },
  };
};

export function usePersistence() {
  const [state, setState] = useState<SchoolModelCanvas>(() => {
    if (typeof window === 'undefined') return createInitialState();
    
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure all static blocks are present (in case data model changes)
        const initial = createInitialState();
        const mergedBlocks = { ...initial.blocks };
        
        if (parsed.blocks) {
          Object.keys(parsed.blocks).forEach((key) => {
            if (mergedBlocks[key]) {
              mergedBlocks[key] = {
                ...mergedBlocks[key],
                ...parsed.blocks[key],
              };
            }
          });
        }
        
        return {
          ...initial,
          ...parsed,
          blocks: mergedBlocks,
          educationalVision: {
            ...initial.educationalVision,
            ...(parsed.educationalVision || {}),
          }
        };
      }
    } catch (e) {
      console.error('Error loading state from localStorage:', e);
    }
    
    return createInitialState();
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving state to localStorage:', e);
    }
  }, [state]);

  const updateChildInfo = (info: {
    childName?: string;
    childAge?: string;
    childGrade?: string;
    schoolingContext?: string;
  }) => {
    setState((prev) => ({
      ...prev,
      ...info,
    }));
  };

  const updateBlockText = (blockId: string, text: string) => {
    setState((prev) => {
      const block = prev.blocks[blockId];
      if (!block) return prev;
      
      let status: BlockStatus = block.status;
      if (status === 'empty' && text.trim().length > 0) {
        status = 'drafted';
      } else if (text.trim().length === 0) {
        status = 'empty';
      }

      return {
        ...prev,
        blocks: {
          ...prev.blocks,
          [blockId]: {
            ...block,
            userText: text,
            status,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  const updateBlockStatus = (blockId: string, status: BlockStatus) => {
    setState((prev) => {
      const block = prev.blocks[blockId];
      if (!block) return prev;
      return {
        ...prev,
        blocks: {
          ...prev.blocks,
          [blockId]: {
            ...block,
            status,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  const updateBlockSelections = (blockId: string, selections: string[]) => {
    setState((prev) => {
      const block = prev.blocks[blockId];
      if (!block) return prev;
      return {
        ...prev,
        blocks: {
          ...prev.blocks,
          [blockId]: {
            ...block,
            decisionSelections: selections,
            updatedAt: new Date().toISOString(),
          },
        },
      };
    });
  };

  const updateEducationalVision = (vision: {
    text?: string;
    generatedFromBlockIds?: string[];
    manuallyEdited?: boolean;
    locked?: boolean;
  }) => {
    setState((prev) => ({
      ...prev,
      educationalVision: {
        ...prev.educationalVision,
        ...vision,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const resetState = () => {
    if (window.confirm('Are you sure you want to clear your notebook? All progress will be lost.')) {
      setState(createInitialState());
    }
  };

  return {
    state,
    updateChildInfo,
    updateBlockText,
    updateBlockStatus,
    updateBlockSelections,
    updateEducationalVision,
    resetState,
  };
}
