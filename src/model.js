
console.log('> Tensorflow is running using: ' + tf.getBackend());

const LEARNING_RATE = 0.0001;
const OPTIMISER = tf.train.adam(LEARNING_RATE);

const logProgress = (epoch, logs) => {
    console.log('Data for epoch ' + epoch, Math.sqrt(logs.loss));
    if (epoch == 19) {
        // OPTIMISER.setLearningRate(LEARNING_RATE / 2);
        console.log(logs);
    }
};

function evaluate(model, input) {
    tf.tidy(function () {
        let newInput = tf.tensor2d([input]);
        let output = model.predict(newInput);
        output.print();
        newInput.print();
    });
};

async function train(INPUT_DATA, OUTPUT_DATA) {
    const INPUT_TENSOR = tf.tensor2d(INPUT_DATA);
    const OUTPUT_TENSOR = tf.tensor2d(OUTPUT_DATA);

    const model = tf.sequential({
        layers: [
            tf.layers.dense({ inputShape: [2], units: 12, activation: 'relu' }),
            tf.layers.dense({ units: 18, activation: 'relu' }),
            tf.layers.dense({ units: 4 }),
        ]
    });

    model.summary();
    model.compile({
        optimizer: OPTIMISER,
        loss: 'meanSquaredError',
        // metrics: ['accuracy']
    });

    let results = await model.fit(INPUT_TENSOR, OUTPUT_TENSOR, {
        batchSize: 120,
        callbacks: { onEpochEnd: logProgress },
        epochs: 20,
        shuffle: true,
        validationSplit: 0.2
    });

    OUTPUT_TENSOR.dispose();
    INPUT_TENSOR.dispose();
    // model.dispose();
    return model;
};

module.exports = { train, evaluate };