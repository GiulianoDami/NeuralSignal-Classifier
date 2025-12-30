typescript
export class DataProcessor {
  /**
   * Normalizes neural data to a 0-1 range
   * @param data - Raw neural data array
   * @returns Normalized data array
   */
  static normalize(data: number[][]): number[][] {
    if (data.length === 0) return [];
    
    // Find min and max values across all data points
    let min = Infinity;
    let max = -Infinity;
    
    for (const row of data) {
      for (const value of row) {
        if (value < min) min = value;
        if (value > max) max = value;
      }
    }
    
    // Avoid division by zero
    const range = max - min || 1;
    
    // Normalize each value
    return data.map(row => 
      row.map(value => (value - min) / range)
    );
  }
  
  /**
   * Calculates mean of each column in the data
   * @param data - Neural data array
   * @returns Array of means for each column
   */
  static calculateMeans(data: number[][]): number[] {
    if (data.length === 0) return [];
    
    const means: number[] = [];
    const numColumns = data[0].length;
    
    for (let i = 0; i < numColumns; i++) {
      let sum = 0;
      for (let j = 0; j < data.length; j++) {
        sum += data[j][i];
      }
      means.push(sum / data.length);
    }
    
    return means;
  }
  
  /**
   * Calculates standard deviation for each column
   * @param data - Neural data array
   * @param means - Pre-calculated means for each column
   * @returns Array of standard deviations for each column
   */
  static calculateStandardDeviations(data: number[][], means: number[]): number[] {
    if (data.length === 0) return [];
    
    const stdDevs: number[] = [];
    const numColumns = data[0].length;
    
    for (let i = 0; i < numColumns; i++) {
      let sumSquaredDiff = 0;
      for (let j = 0; j < data.length; j++) {
        const diff = data[j][i] - means[i];
        sumSquaredDiff += diff * diff;
      }
      const variance = sumSquaredDiff / data.length;
      stdDevs.push(Math.sqrt(variance));
    }
    
    return stdDevs;
  }
  
  /**
   * Standardizes data using z-score normalization
   * @param data - Neural data array
   * @returns Standardized data array
   */
  static standardize(data: number[][]): number[][] {
    if (data.length === 0) return [];
    
    const means = this.calculateMeans(data);
    const stdDevs = this.calculateStandardDeviations(data, means);
    
    return data.map(row => 
      row.map((value, index) => {
        const stdDev = stdDevs[index] || 1;
        return (value - means[index]) / stdDev;
      })
    );
  }
}