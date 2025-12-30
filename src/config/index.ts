typescript
export const CONFIG = {
  MODEL_PATH: './models/neural-model.json',
  TRAINING_DATA_PATH: './data/training-data.json',
  MAX_ITERATIONS: 1000,
  LEARNING_RATE: 0.01,
  TOLERANCE: 1e-6,
  INPUT_SIZE: 4,
  HIDDEN_LAYERS: [10, 5],
  OUTPUT_SIZE: 2,
  VALIDATION_SPLIT: 0.2,
  BATCH_SIZE: 32,
  EPOCHS: 50
};