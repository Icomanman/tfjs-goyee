
import * as model_src from './../../src/model.js';
import data_src from './../../dist/sorted-export.js';
// import Histogram from './histogram.mjs';

TFJS.DAT = data_src; // Here we have an explicit statement: 'export default'
TFJS.model_src = model_src;
/**
 * However, 'default' whatever is in 'module.exports'. If it is a single module,
 * then 'default' would contain that single module (i.e., model_src.default) 
 */
TFJS.train = model_src.train;
TFJS.eval = model_src.evaluate;
TFJS.run = async () => {
    TFJS.model = await model_src.train(data_src.INPUT, data_src.OUTPUT);
    console.log('> Model instantiated.')
};

const dat = [];
for (let i = 0; i < (data_src.INPUT).length; i++) {
    dat.push(data_src.INPUT[i][0]);
}

// const chart = Histogram(dat, {
//     value: d => d,
//     label: "Number Distribution",
//     color: "steelblue"
// });
