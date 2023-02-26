
import {
    TRAINING_DATA
} from 'https://storage.googleapis.com/jmstore/TensorFlowJS/EdX/TrainingData/mnist.js';

// Input feature pairs (House size, Number of Bedrooms)
const INPUTS = TRAINING_DATA.inputs;

// Current listed house prices in dollars given their features above 
// (target output values you want to predict).
const OUTPUTS = TRAINING_DATA.outputs;

// Shuffle the two arrays in the same way so inputs still match outputs indexes.
tf.util.shuffleCombo(INPUTS, OUTPUTS);

// Input feature Array of Arrays needs 2D tensor to store.
const INPUTS_TENSOR = tf.tensor2d(INPUTS);

// Output can stay 1 dimensional.
const OUTPUTS_TENSOR = tf.oneHot(tf.tensor1d(OUTPUTS, 'int32'), 10);

