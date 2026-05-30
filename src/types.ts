export type BlockStatus = "empty" | "drafted" | "reviewed" | "locked";

export type CanvasBlock = {
  id: string;
  label: string;
  category: string;
  explainer: string;
  guidingQuestions: string[];
  exampleGood: string;
  exampleWeak: string;
  userText: string;
  decisionSelections: string[]; // Options chosen from the decision grid
  status: BlockStatus;
  updatedAt: string;
};

export type SchoolModelCanvas = {
  childName: string;
  childAge?: string;
  childGrade?: string;
  schoolingContext?: string;
  blocks: Record<string, CanvasBlock>;
  educationalVision: {
    text: string;
    generatedFromBlockIds: string[];
    manuallyEdited: boolean;
    locked: boolean;
    updatedAt: string;
  };
};

export type SitePaletteId = 'blossom' | 'cobalt' | 'sage' | 'neutral';

export interface SitePalette {
  id: SitePaletteId;
  name: string;
  code: string;
  swatchColors: [string, string, string, string];
  vars: Record<string, string>;
}
