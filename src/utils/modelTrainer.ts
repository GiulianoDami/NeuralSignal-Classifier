typescript
export class ModelTrainer {
  private model: any;
  private trainingData: Array<{ pattern: number[][]; label: string }> = [];

  constructor() {
    this.model = {
      weights: [],
      bias: 0,
      classes: new Set<string>()
    };
  }

  /**
   * Train the model with labeled neural patterns
   * @param trainingSamples Array of training samples with patterns and labels
   */
  train(trainingSamples: Array<{ pattern: number[][]; label: string }>): void {
    this.trainingData = [...trainingSamples];
    
    // Extract unique classes
    this.trainingData.forEach(sample => {
      this.model.classes.add(sample.label);
    });

    // Initialize weights based on input dimensions
    if (this.trainingData.length > 0 && this.trainingData[0].pattern.length > 0) {
      const inputSize = this.trainingData[0].pattern[0].length;
      this.model.weights = Array(inputSize).fill(0);
    }

    // Simple perceptron training algorithm
    this.perceptronTrain();
  }

  /**
   * Simple perceptron training implementation
   */
  private perceptronTrain(): void {
    const learningRate = 0.01;
    const epochs = 1000;

    for (let epoch = 0; epoch < epochs; epoch++) {
      let totalError = 0;
      
      for (const sample of this.trainingData) {
        const flattenedPattern = this.flattenPattern(sample.pattern);
        const target = this.getLabelIndex(sample.label);
        
        // Forward pass
        const prediction = this.activate(flattenedPattern);
        const error = target - prediction;
        totalError += Math.abs(error);

        // Update weights
        for (let i = 0; i < this.model.weights.length; i++) {
          this.model.weights[i] += learningRate * error * flattenedPattern[i];
        }
        
        this.model.bias += learningRate * error;
      }

      // Early stopping if error is small enough
      if (totalError < 0.01) break;
    }
  }

  /**
   * Flatten 2D pattern array into 1D array
   * @param pattern 2D array of neural data
   * @returns Flattened 1D array
   */
  private flattenPattern(pattern: number[][]): number[] {
    return pattern.flat();
  }

  /**
   * Activation function (step function)
   * @param inputs Input values
   * @returns Binary output
   */
  private activate(inputs: number[]): number {
    let sum = this.model.bias;
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.model.weights[i];
    }
    return sum >= 0 ? 1 : 0;
  }

  /**
   * Get index of label in class list
   * @param label The label to find
   * @returns Index of label
   */
  private getLabelIndex(label: string): number {
    const labels = Array.from(this.model.classes);
    return labels.indexOf(label);
  }

  /**
   * Classify a new neural pattern
   * @param pattern Neural pattern to classify
   * @returns Classification result
   */
  classify(pattern: number[][]): string {
    const flattenedPattern = this.flattenPattern(pattern);
    const prediction = this.activate(flattenedPattern);
    
    const labels = Array.from(this.model.classes);
    return labels[prediction] || 'unknown';
  }

  /**
   * Get model accuracy based on training data
   * @returns Accuracy percentage
   */
  getAccuracy(): number {
    if (this.trainingData.length === 0) return 0;
    
    let correct = 0;
    for (const sample of this.trainingData) {
      const prediction = this.classify(sample.pattern);
      if (prediction === sample.label) correct++;
    }
    
    return (correct / this.trainingData.length) * 100;
  }
}