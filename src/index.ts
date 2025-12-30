typescript
import { NeuralSignalClassifier } from './NeuralSignalClassifier';

// Create a new classifier instance
const classifier = new NeuralSignalClassifier();

// Example neural activity data
const neuralData = [
  [0.1, 0.3, 0.2, 0.8],
  [0.4, 0.6, 0.9, 0.2],
  [0.7, 0.1, 0.5, 0.3]
];

// Analyze the pattern
const result = classifier.analyzePattern(neuralData);
console.log('Analysis Result:', result);

// Train with known patterns
classifier.train([
  { pattern: [[0.1, 0.2, 0.3]], label: 'schizophrenia' },
  { pattern: [[0.9, 0.8, 0.7]], label: 'bipolar' }
]);

// Classify unknown patterns
const classification = classifier.classify([[0.2, 0.3, 0.4]]);
console.log('Classification Result:', classification);