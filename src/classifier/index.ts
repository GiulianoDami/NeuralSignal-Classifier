typescript
export class NeuralSignalClassifier {
  private patterns: Array<{ pattern: number[][]; label: string }> = [];

  analyzePattern(data: number[][]): { mean: number; stdDev: number; max: number; min: number } {
    if (data.length === 0) {
      throw new Error("Data cannot be empty");
    }

    const flattened = data.flat();
    const mean = flattened.reduce((sum, val) => sum + val, 0) / flattened.length;
    
    const variance = flattened.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flattened.length;
    const stdDev = Math.sqrt(variance);
    
    const max = Math.max(...flattened);
    const min = Math.min(...flattened);

    return { mean, stdDev, max, min };
  }

  train(patterns: Array<{ pattern: number[][]; label: string }>): void {
    this.patterns = [...patterns];
  }

  classify(input: number[][]): string | null {
    if (this.patterns.length === 0) {
      throw new Error("Classifier must be trained before making classifications");
    }

    const inputStats = this.analyzePattern(input);
    let bestMatch: string | null = null;
    let minDistance = Infinity;

    for (const { pattern, label } of this.patterns) {
      const patternStats = this.analyzePattern(pattern);
      
      // Calculate Euclidean distance between statistical features
      const distance = Math.sqrt(
        Math.pow(inputStats.mean - patternStats.mean, 2) +
        Math.pow(inputStats.stdDev - patternStats.stdDev, 2) +
        Math.pow(inputStats.max - patternStats.max, 2) +
        Math.pow(inputStats.min - patternStats.min, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = label;
      }
    }

    return bestMatch;
  }
}