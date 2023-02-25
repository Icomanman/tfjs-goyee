
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tf = require('@tensorflow/tfjs-node');

console.log('> Tensorflow is running using: ' + tf.getBackend());

const data_path = path.resolve(process.cwd(), 'src/dat');
const src_dat = `${data_path}/64923022023.txt`;
const dat = fs.readFileSync(`${src_dat}`, 'utf-8');

const LEARNING_RATE = 0.000001;
const OPTIMISER = tf.train.sgd(LEARNING_RATE);

const logProgress = (epoch, logs) => {
    console.log('Data for epoch ' + epoch, Math.sqrt(logs.loss));
    if (epoch == 15) {
        OPTIMISER.setLearningRate(LEARNING_RATE / 2);
    }
}

const readDataArr = async (file) => {
    const rows = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        output: process.stdout,
        terminal: false,
    });
    return await new Promise(resolve => {
        rl.on('line', line => {
            const new_line = [];
            let char = '';
            for (let s = 0; s < line.length; s++) {
                if (line[s] != '\t') {
                    char = char.concat(line[s]);
                } else {
                    new_line.push(parseInt(char));
                    char = '';
                };
            }
            new_line.push(parseInt(char));
            rows.push(new_line);
        }).on('close', () => {
            resolve(rows);
            console.log('> EOF');
        });
    })
}

(async function main() {
    // Base input:
    const BASE = 49;
    const base_arr = [];
    for (let i = 0; i < BASE; i++) {
        base_arr.push(i + 1);
    }

    const data_arr = await readDataArr(src_dat);
    const INPUT_DATA = [];
    for (let i = 0; i < data_arr.length; i++) {
        const new_arr = JSON.parse(JSON.stringify(base_arr));
        tf.util.shuffle(new_arr)
        INPUT_DATA.push(new_arr);
        // INPUT_DATA.push(base_arr);
    }

    const INPUT_TENSOR = tf.tensor2d(INPUT_DATA);
    const OUTPUT_TENSOR = tf.tensor2d(data_arr);

    const model = tf.sequential({
        layers: [
            tf.layers.dense({ inputShape: [BASE], units: 28, activation: 'relu' }),
            tf.layers.dense({ units: 28, activation: 'relu' }),
            tf.layers.dense({ units: 6 }),
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
        batchSize: 10,
        epochs: 30,
    });

    tf.tidy(function () {
        let newInput = tf.tensor2d([INPUT_DATA[0]]);
        let output = model.predict(newInput);
        output.print();
    });

    OUTPUT_TENSOR.dispose();
    INPUT_TENSOR.dispose();
    model.dispose();
})();