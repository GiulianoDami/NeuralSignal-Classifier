typescript
export class NeuralSimulator {
  private readonly noiseLevel: number;
  private readonly baseFrequency: number;

  constructor(noiseLevel: number = 0.05, baseFrequency: number = 10) {
    this.noiseLevel = noiseLevel;
    this.baseFrequency = baseFrequency;
  }

  /**
   * Generates simulated neural activity data
   * @param duration Duration of simulation in seconds
   * @param samplingRate Samples per second
   * @returns Array of neural activity readings
   */
  public generateNeuralActivity(duration: number, samplingRate: number): number[][] {
    const totalSamples = duration * samplingRate;
    const data: number[][] = [];
    
    for (let i = 0; i < totalSamples; i++) {
      // Generate base neural activity with some randomness
      const baseActivity = Math.sin(2 * Math.PI * this.baseFrequency * (i / samplingRate));
      
      // Add noise to simulate real neural signals
      const noise = (Math.random() - 0.5) * this.noiseLevel;
      
      // Simulate different neural patterns based on time
      let patternFactor = 1;
      if (i > totalSamples * 0.3 && i < totalSamples * 0.7) {
        patternFactor = 1.5; // Increased activity
      } else if (i > totalSamples * 0.8) {
        patternFactor = 0.5; // Decreased activity
      }
      
      const activity = (baseActivity + noise) * patternFactor;
      
      // Create multi-channel data (4 channels typical for neural recordings)
      data.push([
        activity,
        activity * 0.8 + (Math.random() - 0.5) * 0.1,
        activity * 0.6 + (Math.random() - 0.5) * 0.15,
        activity * 0.9 + (Math.random() - 0.5) * 0.05
      ]);
    }
    
    return data;
  }

  /**
   * Generates simulated neural activity for a specific psychiatric condition
   * @param condition The condition to simulate ('schizophrenia', 'bipolar', or 'healthy')
   * @param duration Duration of simulation in seconds
   * @param samplingRate Samples per second
   * @returns Array of neural activity readings
   */
  public generateConditionData(condition: string, duration: number, samplingRate: number): number[][] {
    const totalSamples = duration * samplingRate;
    const data: number[][] = [];
    
    for (let i = 0; i < totalSamples; i++) {
      let activity: number[];
      
      switch (condition) {
        case 'schizophrenia':
          // Simulate irregular firing patterns
          const irregularity = Math.sin(2 * Math.PI * 2 * (i / samplingRate)) * 0.3;
          activity = [
            0.5 + irregularity + (Math.random() - 0.5) * 0.2,
            0.3 + irregularity * 0.5 + (Math.random() - 0.5) * 0.15,
            0.7 + irregularity * 0.8 + (Math.random() - 0.5) * 0.25,
            0.4 + irregularity * 0.3 + (Math.random() - 0.5) * 0.1
          ];
          break;
          
        case 'bipolar':
          // Simulate oscillating patterns
          const oscillation = Math.sin(2 * Math.PI * 0.5 * (i / samplingRate)) * 0.4;
          activity = [
            0.3 + oscillation + (Math.random() - 0.5) * 0.1,
            0.8 - oscillation + (Math.random() - 0.5) * 0.15,
            0.6 + oscillation * 0.5 + (Math.random() - 0.5) * 0.2,
            0.2 - oscillation * 0.3 + (Math.random() - 0.5) * 0.1
          ];
          break;
          
        default: // healthy
          // Simulate regular, stable patterns
          const stable = Math.sin(2 * Math.PI * 0.2 * (i / samplingRate)) * 0.2;
          activity = [
            0.5 + stable + (Math.random() - 0.5) * 0.1,
            0.5 - stable + (Math.random() - 0.5) * 0.1,
            0.5 + stable * 0.8 + (Math.random() - 0.5) * 0.15,
            0.5 - stable * 0.6 + (Math.random() - 0.5) * 0.12
          ];
      }
      
      data.push(activity);
    }
    
    return data;
  }
}