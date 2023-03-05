
import * as model_src from './../../src/model.js';
import data_src from './../../dist/data-export.js';

// 05 March 2023
TFJS.DAT = data_src; // Here we have an explicit statement: 'export default'
TFJS.MAIN = model_src.default; // However, here exports are assign to 'default' because of 'module.exports'