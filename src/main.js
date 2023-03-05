

global.tf = require('@tensorflow/tfjs-node');

const model = require('./model.js');
const { extractSyntheticData, straightRange } = require('../helpers/synthetic.js');

(async () => {
    // const straight_data = await straightRange('64923022023.txt');
    const synthetic_data = await extractSyntheticData('64923022023.txt');
    const INPUT_DATA = synthetic_data.input;
    const OUTPUT_DATA = synthetic_data.output;
    model(INPUT_DATA, OUTPUT_DATA);
})();
