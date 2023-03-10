
// Generate input numbers from 1 to 20 inclusive.
const INPUTS = [];
for (let n = 1; n <= 20; n++) {
    INPUTS.push(n);
}

// Generate Outputs that are simply each input multiplied by itself,
// to generate some non linear data.
const OUTPUTS = [];
for (let n = 0; n < INPUTS.length; n++) {
    OUTPUTS.push(INPUTS[n] * INPUTS[n]);
}

// Input feature Array is 1 dimensional.
const INPUTS_TENSOR = tf.tensor1d(INPUTS);

// Output can stay 1 dimensional.
const OUTPUTS_TENSOR = tf.tensor1d(OUTPUTS);

// Function to take a Tensor and normalize values
// with respect to each column of values contained in that Tensor.
function normalize(tensor, min, max) {
    const result = tf.tidy(function () {
        // Find the minimum value contained in the Tensor.
        const MIN_VALUES = min || tf.min(tensor, 0);

        // Find the maximum value contained in the Tensor.
        const MAX_VALUES = max || tf.max(tensor, 0);

        // Now subtract the MIN_VALUE from every value in the Tensor
        // And store the results in a new Tensor.
        const TENSOR_SUBTRACT_MIN_VALUE = tf.sub(tensor, MIN_VALUES);

        // Calculate the range size of possible values.
        const RANGE_SIZE = tf.sub(MAX_VALUES, MIN_VALUES);

        // Calculate the adjusted values divided by the range size as a new Tensor.
        const NORMALIZED_VALUES = tf.div(TENSOR_SUBTRACT_MIN_VALUE, RANGE_SIZE);
        return { NORMALIZED_VALUES, MIN_VALUES, MAX_VALUES };
    });
    return result;
}

// Normalize all input feature arrays and then 
// dispose of the original non normalized Tensors.
const FEATURE_RESULTS = normalize(INPUTS_TENSOR);
console.log('Normalized Values:');

FEATURE_RESULTS.NORMALIZED_VALUES.print();

console.log('Min Values:');
FEATURE_RESULTS.MIN_VALUES.print();

console.log('Max Values:');
FEATURE_RESULTS.MAX_VALUES.print();

INPUTS_TENSOR.dispose();

/**
 * 
 */
TFJS.save = async () => {
    await model.save('downloads://exponential-model');
    model.dispose();
};

function evaluate() {
    // Predict answer for a single piece of data.
    tf.tidy(function () {
        let newInput = normalize(tf.tensor1d([7]), FEATURE_RESULTS.MIN_VALUES, FEATURE_RESULTS.MAX_VALUES);
        let output = model.predict(newInput.NORMALIZED_VALUES);
        output.print();
    });

    // Finally when you no longer need to make any more predictions,
    // clean up the remaining Tensors. 
    FEATURE_RESULTS.MIN_VALUES.dispose();
    FEATURE_RESULTS.MAX_VALUES.dispose();
    if (model) model.dispose();

    console.log(tf.memory().numTensors);
}

const LEARNING_RATE = 0.0001; // Choose a learning rate that???s suitable for the data we are using.
const OPTIMIZER = tf.train.sgd(LEARNING_RATE);

function logProgress(epoch, logs) {
    console.log('Data for epoch ' + epoch, Math.sqrt(logs.loss));
    if (epoch == 70) {
        OPTIMIZER.setLearningRate(LEARNING_RATE / 2);
    }
}

async function train() {
    // Compile the model with the defined learning rate and specify a loss function to use.
    model.compile({
        optimizer: OPTIMIZER,
        loss: 'meanSquaredError'
    });

    // Finally do the training itself.
    let results = await model.fit(FEATURE_RESULTS.NORMALIZED_VALUES, OUTPUTS_TENSOR, {
        callbacks: { onEpochEnd: logProgress },
        shuffle: true,  // Ensure data is shuffled in case it was in an order
        batchSize: 2,
        epochs: 200,    // Go over the data 200 times!
    });

    OUTPUTS_TENSOR.dispose();
    FEATURE_RESULTS.NORMALIZED_VALUES.dispose();

    console.log("Average error loss: " + Math.sqrt(results.history.loss[results.history.loss.length - 1]));
    evaluate(); // Once trained evaluate the model.
}

// Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [1], units: 25, activation: 'relu' }));
model.add(tf.layers.dense({ units: 5, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1 }));
model.summary();

TFJS.dispose = model.dispose;
TFJS.eval = evaluate;
TFJS.train = train;

TFJS.trainAsync = async () => {
    console.log('> Training...');
    await train();
}



