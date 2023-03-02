
/**
 * @dev The tests are set up based on the deterministic shuffling
 * of the src_arr to generate the synthetic data. Otherwise,
 * it could be done more (elegantly) programmatically using
 * the indices of the entries and elements: 02 March 2023
 */
const assert = require('assert');
const { extractSyntheticData } = require('./../helpers/synthetic.js');

let src_arr, src_length, input, output, mult;

beforeEach(async () => {
    synth_data = await extractSyntheticData('64923022023.txt');
    src_arr = synth_data.src_arr;
    input = synth_data.input;
    output = synth_data.output;
    mult = synth_data.mult;
    src_length = src_arr.length;
});

describe('> Synthetic Data Test', () => {
    it('1. Input and Output should have identical lengths.', () => {
        assert.equal(input.length, output.length);
    });

    it('2. Final lengths should match.', () => {
        assert.equal(input.length, mult * (src_length));
    });

    it('3. "First-Two" elements should match.', () => {
        const i = parseInt(Math.random() * src_length);
        const first = src_arr[i];
        const first_input = input[i];
        const first_output = output[i];

        console.log('\t> Test index: ' + i);
        console.log('\t', first, first_input, first_output);
        assert.equal(first[0], first_input[0], '> First-Two input: 0');
        assert.equal(first[1], first_input[1], '> First-Two input: 1');

        assert.equal(first[2], first_output[0], '> First-Two output: 0');
        assert.equal(first[3], first_output[1], '> First-Two output: 1');

        assert.equal(first[4], first_output[2], '> First-Two output: 2');
        assert.equal(first[5], first_output[3], '> First-Two output: 3');
    });

    it('4. "Last-Two" elements should match.', () => {
        const i = parseInt(Math.random() * src_length);
        const j = src_length + i;
        const last = src_arr[i];
        const last_input = input[j];
        const last_output = output[j];

        console.log(`\t> Test indices: ${i}, ${j}`);
        console.log('\t', last, last_output, last_input);
        assert.equal(last[4], last_input[0], '> Last-Two input: 0');
        assert.equal(last[5], last_input[1], '> Last-Two input: 1');

        assert.equal(last[0], last_output[0], '> Last-Two output: 0');
        assert.equal(last[1], last_output[1], '> Last-Two output: 1');

        assert.equal(last[2], last_output[2], '> Last-Two output: 2');
        assert.equal(last[3], last_output[3], '> Last-Two output: 3');
    });

    /**
     * TODO
     * Middle-Two
     * Middle-First
     * Middle-Last
     * First-Last
     */

});