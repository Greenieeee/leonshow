export type WasteCategory =
  | 'plastic'
  | 'glass'
  | 'metal'
  | 'foodWaste'
  | 'mixed'
  | 'paper'
  | 'electronics'
  | 'noDetection'
  | 'unrecyclable'
  | 'deposit'
  | 'packaging'
  | 'textiles';

export interface FoundWaste {
  category: WasteCategory;
  desc: string;
  reason?: string;
}

export type TRAnalyzingState =
  | { type: 'nothingDetected' }
  | { type: 'analyzing' }
  | { type: 'finishedAnalyzing'; foundWaste: FoundWaste }
  | { type: 'correctThrow' }
  | { type: 'incorrectThrow' };