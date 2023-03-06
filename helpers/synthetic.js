
const { readDataArr, writeData } = require('./readWriteData.js');

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

    /*
        //  MUCH SLOWER, although more elegant it seems: 03 March 2023
        // First sweep of elements - by twos:
        for (let i = 0; i < src_arr.length; i += 2) {
            let data_arr = JSON.parse(JSON.stringify(src_arr));
            data_arr.forEach(set => {
                input.push([set[i], set[i + 1]]);
                set.splice(i, 2);
                output.push(set);
            });
            mult++;
        }
    */

    // Middle-Left two elements:
    data_arr = JSON.parse(JSON.stringify(src_arr));
    data_arr.forEach(set => {
        input.push([set[1], set[2]]);
        set.splice(1, 2);
        output.push(set);
    });
    mult++;

    // Middle-Right two elements:
    data_arr = JSON.parse(JSON.stringify(src_arr));
    data_arr.forEach(set => {
        input.push([set[3], set[4]]);
        set.splice(3, 2);
        output.push(set);
    });
    mult++;

    // First-Last elements:
    data_arr = JSON.parse(JSON.stringify(src_arr));
    data_arr.forEach(set => {
        input.push([set[0], set[5]]);
        set.pop();
        set.shift();
        output.push(set);
    });
    mult++;

    return { src_arr, input, output, mult };
}


async function extractSortedSynthetic(file) {
    const src_arr = await readDataArr(file);
    const sorted_arr = [];
    // forEach is elegant but the classic for loop seems more efficient 
    for (i = 0; i < src_arr.length; i++) {
        let tmp_arr = [];
        let rem_arr = src_arr[i];
        for (let j = 0; j < 6; j++) {
            let max = Math.max(...rem_arr);
            tmp_arr.push(max);
            rem_arr = rem_arr.filter(el => el < max);
        }
        sorted_arr.push(tmp_arr);
    }

    let mult = 0;
    const input = [], output = [];

    // First two elements:
    let data_arr = JSON.parse(JSON.stringify(sorted_arr));
    data_arr.forEach(set => {
        input.push([set[0], set[1]]);
        set.splice(0, 2);
        output.push(set);
        // console.log(`> Input: ${input.length}, Output: ${output.length}`);
    });
    mult++;

    // Last two elements:
    data_arr = JSON.parse(JSON.stringify(sorted_arr));
    data_arr.forEach(set => {
        input.push([set[4], set[5]]);
        set.splice(4, 2);
        output.push(set);
        // console.log(`> Input: ${input.length}, Output: ${output.length}`);
    });
    mult++;

    // Middle two elements:
    data_arr = JSON.parse(JSON.stringify(sorted_arr));
    data_arr.forEach(set => {
        input.push([set[2], set[3]]);
        set.splice(2, 2);
        output.push(set);
    });
    mult++;

    // Middle-Left two elements:
    data_arr = JSON.parse(JSON.stringify(sorted_arr));
    data_arr.forEach(set => {
        input.push([set[1], set[2]]);
        set.splice(1, 2);
        output.push(set);
    });
    mult++;

    // Middle-Right two elements:
    data_arr = JSON.parse(JSON.stringify(sorted_arr));
    data_arr.forEach(set => {
        input.push([set[3], set[4]]);
        set.splice(3, 2);
        output.push(set);
    });
    mult++;

    return { sorted_arr, input, output, mult };
}

module.exports = { extractSyntheticData, extractSortedSynthetic, straightRange };
