
const readDataArr = require('./readData.js');

async function extractSyntheticData(file) {
    const data_arr = await readDataArr(file);
    const synthetic_data = [];

    return synthetic_data;
}

module.exports = extractSyntheticData;
