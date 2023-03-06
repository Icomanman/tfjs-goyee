
import * as model_src from './../../src/model.js';
import data_src from './../../dist/sorted-export.js';

TFJS.DAT = data_src; // Here we have an explicit statement: 'export default'
TFJS.model_src = model_src;
/**
 * However, 'default' whatever is in 'module.exports'. If it is a single module,
 * then 'default' would contain that single module (i.e., model_src.default) 
 */
TFJS.train = model_src.train;
TFJS.eval = model_src.evaluate;
(async () => {
    TFJS.model = await model_src.train(data_src.INPUT, data_src.OUTPUT);
})();

