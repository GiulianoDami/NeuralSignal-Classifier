typescript
export class NeuralSignalClassifier {
  private trainedPatterns: Array<{ pattern: number[][]; label: string }> = [];

  analyzePattern(data: number[][]): { mean: number; stdDev: number; max: number; min: number } {
    if (data.length === 0) {
      throw new Error('Neural data cannot be empty');
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
    this.trainedPatterns = [...patterns];
  }

  classify(pattern: number[][]): string | null {
    if (this.trainedPatterns.length === 0) {
      throw new Error('Classifier must be trained before making classifications');
    }

    const analyzedPattern = this.analyzePattern(pattern);
    let bestMatch: string | null = null;
    let minDistance = Infinity;

    for (const { pattern: trainedPattern, label } of this.trainedPatterns) {
      const analyzedTrained = this.analyzePattern(trainedPattern);
      
      // Calculate Euclidean distance between statistical features
      const distance = Math.sqrt(
        Math.pow(analyzedPattern.mean - analyzedTrained.mean, 2) +
        Math.pow(analyzedPattern.stdDev - analyzedTrained.stdDev, 2) +
        Math.pow(analyzedPattern.max - analyzedTrained.max, 2) +
        Math.pow(analyzedPattern.min - analyzedTrained.min, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        bestMatch = label;
      }
    }

    return bestMatch;
  }
}