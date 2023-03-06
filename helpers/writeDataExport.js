
const { extractSyntheticData } = require('./synthetic.js');
const { writeData } = require('./readWriteData.js');

(async (node = false, file = '64923022023.txt') => {
    const { input, output } = await extractSyntheticData(file);
    const data = {
        INPUT: input, OUTPUT: output
    };
    if (node) {
        const stream = `const data = ${JSON.stringify(data)}; module.exports = data;`
        writeData(stream, 'data-require.js');
    } else {
        const stream = `const data = ${JSON.stringify(data)}; export default data;`;
        writeData(stream, 'data-export.js');
    }
})(process.argv[2], process.argv[3]);