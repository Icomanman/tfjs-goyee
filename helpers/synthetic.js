
const readDataArr = require('./readData.js');

async function straightRange(file) {
    const output = await readDataArr(file);
    // Base input:
    const BASE = 49;
    const base_arr = [];
    const input = [];

    for (let i = 0; i < BASE; i++) {
        base_arr.push(i + 1);
    }

    for (let i = 0; i < data_arr.length; i++) {
        // assign the reference to the base_arr
        input.push(base_arr);
    }

    return { input, output };
}


async function extractSyntheticData(file) {
    let mult = 0;
    const data_arr = await readDataArr(file);
    const input = [], output = [];
    // First and last twos:
    for (let i = 0; i < 2; i++) {
        data_arr.forEach(set => {
            const input_row = [];
            const output_row = [];
            for (let j = 0; j < 2; j++) {
                if (i == 0) {
                    input_row.push(set.shift());
                } else {
                    input_row.push(set.pop());
                }
            }
            output_row.push(set);

            input.push(input_row);
            output.push(output_row);
            // console.log(`> Input: ${input.length}, Output: ${output.length}`);
            // console.log('> set');
        });
        mult++;
    }

    // Middle two:
    data_arr.forEach(set => {
        input.push([set[2], set[3]]);
        set.splice(2, 2);
        output.push(set);
    });
    mult++;

    return { data_arr, input, output, mult };
}

module.exports = { extractSyntheticData, straightRange };
