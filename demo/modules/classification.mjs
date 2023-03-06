
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

const PREDICTION_ELEMENT = document.getElementById('prediction');

const CANVAS = document.getElementById('canvas');
const CTX = CANVAS.getContext('2d');

function drawImage(digit) {
    var imageData = CTX.getImageData(0, 0, 28, 28);

    for (let i = 0; i < digit.length; i++) {
        imageData.data[i * 4] = digit[i] * 255;     // Red Channel
        imageData.data[i * 4 + 1] = digit[i] * 255; // Green Channel
        imageData.data[i * 4 + 2] = digit[i] * 255; // Blue Channel
        imageData.data[i * 4 + 3] = 255;            // Alpha Channel
    }

    CTX.putImageData(imageData, 0, 0);

    setTimeout(evaluate, 2000);
}

function evaluate() {
    const OFFSET = Math.floor((Math.random() * INPUTS.length));

    let answer = tf.tidy(function () {
        let newInput = tf.tensor1d(INPUTS[OFFSET]).expandDims();
        let output = model.predict(newInput);
        output.print();
        return output.squeeze().argMax();
    });

    answer.array().then(function (index) {
        PREDICTION_ELEMENT.innerText = index;
        PREDICTION_ELEMENT.setAttribute('class', (index == OUTPUTS[OFFSET] ? 'correct' : 'wrong'));
        answer.dispose();
        drawImage(INPUTS[OFFSET]);
    });
}

function logProgress(epoch, logs) {
    console.log('Data for epoch ' + epoch, Math.sqrt(logs.loss));
    if (epoch >= 49) {
        console.log(`Logs after epoch ${epoch}:`, logs);
        TFJS.LOGS = logs;
    }
}

async function train() {
    // Compile the model with the defined learning rate and specify a loss function to use.
    model.compile({
        optimizer: 'adam',
        loss: 'categoricalCrossentropy',
        metrics: ['accuracy']
    });

    // Finally do the training itself.
    let results = await model.fit(INPUTS_TENSOR, OUTPUTS_TENSOR, {
        batchSize: 512,
        callbacks: { onEpochEnd: logProgress },
        epochs: 50,    // Go over the data 200 times!
        shuffle: true,  // Ensure data is shuffled in case it was in an order
        validationSplit: 0.2
    });

    OUTPUTS_TENSOR.dispose();
    INPUTS_TENSOR.dispose();
    evaluate(); // Once trained evaluate the model.
}

// Model
const model = tf.sequential();
model.add(tf.layers.dense({ inputShape: [784], units: 32, activation: 'relu' }));
model.add(tf.layers.dense({ units: 16, activation: 'relu' }));
model.add(tf.layers.dense({ units: 10, activation: 'softmax' }));
model.summary();

TFJS.dispose = model.dispose;
TFJS.eval = evaluate;
TFJS.train = train;
train();