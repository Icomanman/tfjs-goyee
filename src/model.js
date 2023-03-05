
console.log('> Tensorflow is running using: ' + tf.getBackend());

const LEARNING_RATE = 0.000001;
const OPTIMISER = tf.train.sgd(LEARNING_RATE);

const logProgress = (epoch, logs) => {
    console.log('Data for epoch ' + epoch, Math.sqrt(logs.loss));
    if (epoch == 15) {
        OPTIMISER.setLearningRate(LEARNING_RATE / 2);
    }
};

async function main(INPUT_DATA, OUTPUT_DATA) {
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
        loss: 'meanSquaredError'
    });

    let results = await model.fit(INPUT_TENSOR, OUTPUT_TENSOR, {
        callbacks: { onEpochEnd: logProgress },
        shuffle: true,
        batchSize: 60,
        epochs: 10,
    });

    tf.tidy(function () {
        let newInput = tf.tensor2d([INPUT_DATA[0]]);
        let output = model.predict(newInput);
        output.print();
    });

    OUTPUT_TENSOR.dispose();
    INPUT_TENSOR.dispose();
    model.dispose();
};

module.exports = main;