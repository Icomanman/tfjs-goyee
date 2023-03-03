
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

    it('5. Middle-Two elements should match.', () => {
        const i = parseInt(Math.random() * src_length);
        const j = (2 * src_length) + i;
        const middle = src_arr[i];
        const middle_input = input[j];
        const middle_output = output[j];

        const middle_copy = JSON.parse(JSON.stringify(middle_output));
        middle_copy.splice(2, 0, middle_input);

        console.log(`\t> Test indices: ${i}, ${j}`);
        console.log('\t', middle, middle_copy);
        assert.equal(middle[2], middle_input[0], '> Middle-Two input: 0');
        assert.equal(middle[3], middle_input[1], '> Middle-Two input: 1');

        assert.equal(middle[0], middle_output[0], '> Middle-Two output: 0');
        assert.equal(middle[1], middle_output[1], '> Middle-Two output: 1');

        assert.equal(middle[4], middle_output[2], '> Middle-Two output: 2');
        assert.equal(middle[5], middle_output[3], '> Middle-Two output: 3');
    });

    it('6. Middle-Left elements should match.', () => {
        const i = parseInt(Math.random() * src_length);
        const j = (3 * src_length) + i;
        const midleft = src_arr[i];
        const midleft_input = input[j];
        const midleft_output = output[j];

        const middle_copy = JSON.parse(JSON.stringify(midleft_output));
        middle_copy.splice(1, 0, midleft_input);

        console.log(`\t> Test indices: ${i}, ${j}`);
        console.log('\t', midleft, middle_copy);
        assert.equal(midleft[1], midleft_input[0], '> Middle-Left input: 0');
        assert.equal(midleft[2], midleft_input[1], '> Middle-Left input: 1');

        assert.equal(midleft[0], midleft_output[0], '> Middle-Left output: 0');
        assert.equal(midleft[3], midleft_output[1], '> Middle-Left output: 1');

        assert.equal(midleft[4], midleft_output[2], '> Middle-Left output: 2');
        assert.equal(midleft[5], midleft_output[3], '> Middle-Left output: 3');
    });

    it('7. Middle-Right elements should match.', () => {
        const i = parseInt(Math.random() * src_length);
        const j = (4 * src_length) + i;
        const midright = src_arr[i];
        const midright_input = input[j];
        const midright_output = output[j];

        const middle_copy = JSON.parse(JSON.stringify(midright_output));
        middle_copy.splice(3, 0, midright_input);

        console.log(`\t> Test indices: ${i}, ${j}`);
        console.log('\t', midright, middle_copy);
        assert.equal(midright[3], midright_input[0], '> Middle-Right input: 0');
        assert.equal(midright[4], midright_input[1], '> Middle-Right input: 1');

        assert.equal(midright[0], midright_output[0], '> Middle-Right output: 0');
        assert.equal(midright[1], midright_output[1], '> Middle-Right output: 1');

        assert.equal(midright[2], midright_output[2], '> Middle-Right output: 2');
        assert.equal(midright[5], midright_output[3], '> Middle-Right output: 3');
    });

    it('8. First and Last elements should match.', () => {
        const i = parseInt(Math.random() * src_length);
        const j = (5 * src_length) + i;
        const ends = src_arr[i];
        const ends_input = input[j];
        const ends_output = output[j];

        const ends_copy = JSON.parse(JSON.stringify(ends_output));
        ends_copy.splice(0, 0, [ends_input[0]]);
        ends_copy.splice(5, 0, [ends_input[1]]);

        console.log(`\t> Test indices: ${i}, ${j}`);
        console.log('\t', ends, ends_copy);
        ends_copy.forEach((el, i) => {
            // loose assertion but works: ends_copy contains array elements, first and last (03 March 2023)
            assert.equal(ends[i], ends_copy[i], `> First-Last entry: ${i}`);
        });
    });
});