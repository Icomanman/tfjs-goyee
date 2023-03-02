
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
    const src_arr = await readDataArr(file);
    const input = [], output = [];

    /**
    * Indices can be constant since the src_arr length is constant = 6; and
    * is always known.
    */
    // First two elements:
    let data_arr = JSON.parse(JSON.stringify(src_arr));
    data_arr.forEach(set => {
        input.push([set[0], set[1]]);
        set.splice(0, 2);
        output.push(set);
        // console.log(`> Input: ${input.length}, Output: ${output.length}`);
    });
    mult++;

    // Last two elements:
    data_arr = JSON.parse(JSON.stringify(src_arr));
    data_arr.forEach(set => {
        input.push([set[4], set[5]]);
        set.splice(4, 2);
        output.push(set);
        // console.log(`> Input: ${input.length}, Output: ${output.length}`);
    });
    mult++;

    // Middle two elements:
    data_arr = JSON.parse(JSON.stringify(src_arr));
    data_arr.forEach(set => {
        input.push([set[2], set[3]]);
        set.splice(2, 2);
        output.push(set);
    });
    mult++;

    return { src_arr, input, output, mult };
}

module.exports = { extractSyntheticData, straightRange };
