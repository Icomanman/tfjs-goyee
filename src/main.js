
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tf = require('@tensorflow/tfjs-node');
console.log(tf.config);
const data_path = path.resolve(process.cwd(), 'src/dat');
const src_dat = `${data_path}/64923022023.txt`;
const dat = fs.readFileSync(`${src_dat}`, 'utf-8');

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
                    new_line.push(char);
                    char = '';
                };
            }
            new_line.push(char);
            rows.push(new_line);
        }).on('close', () => {
            resolve(rows);
            console.log('> EOF');
        });
    })
}

(async function main() {
    const data_arr = await readDataArr(src_dat);
    const output = tf.tensor(data_arr);
    console.log(output.shape);
    console.log(output.rank);

    // const model = tf.sequential({
    //     layers: [
    //         tf.layers.dense({ inputShape: [784], units: 32, activation: 'relu' }),
    //         tf.layers.dense({ units: 10, activation: 'softmax' }),
    //     ]
    // });

    // model.summary();
})();