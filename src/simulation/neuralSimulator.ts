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
  generateNeuralActivity(duration: number, samplingRate: number): number[][] {
    const totalSamples = Math.floor(duration * samplingRate);
    const activityData: number[][] = [];
    
    for (let i = 0; i < totalSamples; i++) {
      // Generate base neural firing pattern with some randomness
      const neuron1 = this.generateNeuronActivity(i, 0.1, 0.3);
      const neuron2 = this.generateNeuronActivity(i, 0.2, 0.7);
      const neuron3 = this.generateNeuronActivity(i, 0.4, 0.5);
      
      activityData.push([neuron1, neuron2, neuron3]);
    }
    
    return activityData;
  }

  /**
   * Generates activity for a single neuron
   * @param time Time step
   * @param amplitude Amplitude factor
   * @param frequency Frequency factor
   * @returns Neuron activity value
   */
  private generateNeuronActivity(time: number, amplitude: number, frequency: number): number {
    // Base sine wave with added noise
    const baseValue = Math.sin(2 * Math.PI * frequency * time / 100) * amplitude;
    const noise = (Math.random() - 0.5) * this.noiseLevel;
    return Math.max(0, Math.min(1, baseValue + noise));
  }

  /**
   * Simulates abnormal neural patterns for psychiatric conditions
   * @param condition Condition type ('schizophrenia', 'bipolar', or 'healthy')
   * @param duration Duration of simulation
   * @param samplingRate Sampling rate
   * @returns Simulated neural data with condition-specific patterns
   */
  simulateCondition(condition: string, duration: number, samplingRate: number): number[][] {
    const totalSamples = Math.floor(duration * samplingRate);
    const activityData: number[][] = [];
    
    for (let i = 0; i < totalSamples; i++) {
      let neuron1, neuron2, neuron3;
      
      switch(condition) {
        case 'schizophrenia':
          // Irregular firing patterns
          neuron1 = this.generateIrregularActivity(i, 0.1, 0.3);
          neuron2 = this.generateIrregularActivity(i, 0.2, 0.7);
          neuron3 = this.generateIrregularActivity(i, 0.4, 0.5);
          break;
          
        case 'bipolar':
          // High amplitude fluctuations
          neuron1 = this.generateFluctuatingActivity(i, 0.1, 0.8);
          neuron2 = this.generateFluctuatingActivity(i, 0.2, 0.6);
          neuron3 = this.generateFluctuatingActivity(i, 0.4, 0.7);
          break;
          
        default: // healthy
          neuron1 = this.generateNeuronActivity(i, 0.1, 0.3);
          neuron2 = this.generateNeuronActivity(i, 0.2, 0.7);
          neuron3 = this.generateNeuronActivity(i, 0.4, 0.5);
      }
      
      activityData.push([neuron1, neuron2, neuron3]);
    }
    
    return activityData;
  }

  /**
   * Generates irregular neural activity
   */
  private generateIrregularActivity(time: number, amplitude: number, frequency: number): number {
    const irregularity = Math.sin(time * 0.1) * 0.1;
    const baseValue = Math.sin(2 * Math.PI * frequency * time / 100) * amplitude + irregularity;
    const noise = (Math.random() - 0.5) * this.noiseLevel;
    return Math.max(0, Math.min(1, baseValue + noise));
  }

  /**
   * Generates fluctuating neural activity
   */
  private generateFluctuatingActivity(time: number, amplitude: number, maxAmplitude: number): number {
    const fluctuation = Math.sin(time * 0.05) * 0.3;
    const baseValue = Math.sin(2 * Math.PI * this.baseFrequency * time / 100) * maxAmplitude + fluctuation;
    const noise = (Math.random() - 0.5) * this.noiseLevel;
    return Math.max(0, Math.min(1, baseValue + noise));
  }
}