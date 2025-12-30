typescript
export interface NeuralPattern {
  pattern: number[][];
  label: string;
}

export interface ClassificationResult {
  label: string;
  confidence: number;
}

export interface AnalysisResult {
  pattern: number[][];
  classification: ClassificationResult;
  anomalies: number[];
}