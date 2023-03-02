
const assert = require('assert');
const { extractSyntheticData } = require('./../helpers/synthetic.js');

let data_arr, input, output, mult;

beforeEach(async () => {
    synth_data = await extractSyntheticData('64923022023.txt');
    data_arr = synth_data.data_arr;
    input = synth_data.input;
    output = synth_data.output;
    mult = synth_data.mult;
});

describe('> Synthetic Data Test', () => {
    it('1. Should match the length of both arrays.', () => {
        assert.equal(input.length, output.length);
    });

    it('2. Should match the final length.', () => {
        assert.equal(input.length, mult * (data_arr.length));
    });

    it('3. Entries should match.', () => {

    });
});