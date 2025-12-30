typescript
export class AnomalyDetector {
  private thresholds: Map<string, number> = new Map();
  private referencePatterns: Map<string, number[][]> = new Map();

  constructor() {
    this.initializeThresholds();
  }

  private initializeThresholds(): void {
    this.thresholds.set('schizophrenia', 0.7);
    this.thresholds.set('bipolar', 0.65);
    this.thresholds.set('control', 0.5);
  }

  public detectAnomalies(data: number[][], patternType: string): boolean {
    const threshold = this.thresholds.get(patternType) || 0.5;
    
    // Calculate average deviation from expected patterns
    const deviations = this.calculateDeviations(data, patternType);
    const avgDeviation = this.calculateAverage(deviations);
    
    return avgDeviation > threshold;
  }

  private calculateDeviations(data: number[][], patternType: string): number[] {
    const reference = this.referencePatterns.get(patternType) || [];
    const deviations: number[] = [];

    for (let i = 0; i < Math.min(data.length, reference.length); i++) {
      const dataPoint = data[i];
      const refPoint = reference[i];
      
      if (dataPoint && refPoint) {
        const deviation = this.calculateEuclideanDistance(dataPoint, refPoint);
        deviations.push(deviation);
      }
    }

    return deviations;
  }

  private calculateEuclideanDistance(point1: number[], point2: number[]): number {
    if (point1.length !== point2.length) {
      throw new Error("Points must have the same dimensions");
    }

    let sum = 0;
    for (let i = 0; i < point1.length; i++) {
      sum += Math.pow(point1[i] - point2[i], 2);
    }

    return Math.sqrt(sum);
  }

  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  public setReferencePattern(patternType: string, pattern: number[][]): void {
    this.referencePatterns.set(patternType, pattern);
  }

  public getAnomalyScore(data: number[][], patternType: string): number {
    const deviations = this.calculateDeviations(data, patternType);
    return this.calculateAverage(deviations);
  }
}