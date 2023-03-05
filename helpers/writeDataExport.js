
const { extractSyntheticData } = require('./synthetic.js');
const { writeData } = require('./readWriteData.js');

(async () => {
    const { input, output } = await extractSyntheticData('64923022023.txt');
    const data = {
        INPUT: input, OUTPUT: output
    };
    const stream = `const data = ${JSON.stringify(data)}; export default data;`;
    writeData(stream, 'data-export.js');
})();