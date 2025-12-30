typescript
export class DataProcessor {
  /**
   * Normalizes neural data to a standard range
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
   * Calculates statistical features from neural data
   * @param data - Neural data array
   * @returns Object containing statistical features
   */
  static calculateFeatures(data: number[][]): Record<string, number> {
    if (data.length === 0) return {};
    
    const flattened = data.flat();
    const mean = flattened.reduce((sum, val) => sum + val, 0) / flattened.length;
    
    // Calculate variance
    const variance = flattened.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / flattened.length;
    const stdDev = Math.sqrt(variance);
    
    // Find min and max
    const min = Math.min(...flattened);
    const max = Math.max(...flattened);
    
    // Calculate average change between consecutive values
    let avgChange = 0;
    if (flattened.length > 1) {
      let totalChange = 0;
      for (let i = 1; i < flattened.length; i++) {
        totalChange += Math.abs(flattened[i] - flattened[i-1]);
      }
      avgChange = totalChange / (flattened.length - 1);
    }
    
    return {
      mean,
      variance,
      stdDev,
      min,
      max,
      avgChange
    };
  }
  
  /**
   * Filters out noise from neural data using a simple moving average
   * @param data - Raw neural data
   * @param windowSize - Size of the moving average window
   * @returns Filtered data
   */
  static filterNoise(data: number[][], windowSize: number = 3): number[][] {
    if (data.length === 0 || windowSize <= 0) return data;
    
    return data.map(row => {
      if (row.length <= windowSize) return row;
      
      const filteredRow: number[] = [];
      
      // Apply moving average to each element
      for (let i = 0; i < row.length; i++) {
        let sum = 0;
        let count = 0;
        
        // Calculate average over window
        for (let j = Math.max(0, i - Math.floor(windowSize/2)); 
             j <= Math.min(row.length - 1, i + Math.floor(windowSize/2)); 
             j++) {
          sum += row[j];
          count++;
        }
        
        filteredRow.push(sum / count);
      }
      
      return filteredRow;
    });
  }
}