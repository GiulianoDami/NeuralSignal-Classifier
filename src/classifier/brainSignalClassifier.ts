typescript
export interface NeuralPattern {
  pattern: number[][];
  label: string;
}

export interface ClassificationResult {
  label: string;
  confidence: number;
}

export class BrainSignalClassifier {
  private trainingData: NeuralPattern[] = [];
  private patternDimensions: number;

  constructor() {
    this.patternDimensions = 0;
  }

  /**
   * Analyzes neural activity patterns to detect anomalies
   */
  analyzePattern(data: number[][]): object {
    if (data.length === 0) {
      throw new Error('Neural data cannot be empty');
    }

    // Validate that all rows have the same length
    const firstRowLength = data[0].length;
    for (const row of data) {
      if (row.length !== firstRowLength) {
        throw new Error('All rows in neural data must have the same length');
      }
    }

    this.patternDimensions = firstRowLength;

    // Calculate basic statistics
    const flattenedData = data.flat();
    const mean = flattenedData.reduce((sum, val) => sum + val, 0) / flattenedData.length;
    const variance = flattenedData.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flattenedData.length;
    const stdDev = Math.sqrt(variance);

    // Detect potential anomalies
    const anomalies = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        const zScore = Math.abs((data[i][j] - mean) / (stdDev || 1));
        if (zScore > 2) {
          anomalies.push({ row: i, col: j, value: data[i][j], zScore });
        }
      }
    }

    return {
      dimensions: {
        rows: data.length,
        columns: firstRowLength
      },
      statistics: {
        mean,
        variance,
        standardDeviation: stdDev
      },
      anomalies: anomalies.length > 0 ? anomalies : null
    };
  }

  /**
   * Trains the classifier with known neural patterns
   */
  train(patterns: NeuralPattern[]): void {
    if (patterns.length === 0) {
      throw new Error('Training patterns cannot be empty');
    }

    // Validate patterns
    for (const pattern of patterns) {
      if (!pattern.pattern || !Array.isArray(pattern.pattern)) {
        throw new Error('Each pattern must be an array of arrays');
      }
      
      if (!pattern.label || typeof pattern.label !== 'string') {
        throw new Error('Each pattern must have a valid label string');
      }

      // Check that all rows have the same length
      if (pattern.pattern.length > 0) {
        const firstRowLength = pattern.pattern[0].length;
        for (const row of pattern.pattern) {
          if (row.length !== firstRowLength) {
            throw new Error('All rows in a pattern must have the same length');
          }
        }
      }
    }

    this.trainingData = [...patterns];
  }

  /**
   * Classifies an unknown neural pattern
   */
  classify(pattern: number[][]): ClassificationResult | null {
    if (this.trainingData.length === 0) {
      throw new Error('Classifier must be trained before making classifications');
    }

    if (!pattern || !Array.isArray(pattern)) {
      throw new Error('Pattern must be an array of arrays');
    }

    if (pattern.length === 0) {
      throw new Error('Pattern cannot be empty');
    }

    // Validate pattern dimensions match training data
    const firstRowLength = pattern[0].length;
    for (const row of pattern) {
      if (row.length !== firstRowLength) {
        throw new Error('All rows in pattern must have the same length');
      }
    }

    if (firstRowLength !== this.patternDimensions && this.patternDimensions > 0) {
      throw new Error(`Pattern dimension mismatch. Expected ${this.patternDimensions}, got ${firstRowLength}`);
    }

    // Simple similarity matching based on average values
    const patternMean = pattern.flat().reduce((sum, val) => sum + val, 0) / pattern.flat().length;
    
    let bestMatch: ClassificationResult | null = null;
    let maxSimilarity = -Infinity;

    for (const trainingPattern of this.trainingData) {
      const trainingMean = trainingPattern.pattern.flat().reduce((sum, val) => sum + val, 0) / trainingPattern.pattern.flat().length;
      const similarity = 1 / (1 + Math.abs(patternMean - trainingMean));
      
      if (similarity > maxSimilarity) {
        maxSimilarity = similarity;
        bestMatch = {
          label: trainingPattern.label,
          confidence: similarity
        };
      }
    }

    return bestMatch;
  }
}