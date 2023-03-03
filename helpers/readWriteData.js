
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const data_path = path.resolve(process.cwd(), 'src/dat');

const readDataArr = async file => {
    const f = `${data_path}/${file}`;
    const rows = [];
    const rl = readline.createInterface({
        input: fs.createReadStream(f),
        output: process.stdout,
        terminal: false,
    });
    return await new Promise(resolve => {
        rl.on('line', line => {
            const new_line = [];
            let char = '';
            for (let s = 0; s < line.length; s++) {
                if (line[s] != '\t') {
                    char = char.concat(line[s]);
                } else {
                    new_line.push(parseInt(char));
                    char = '';
                };
            }
            new_line.push(parseInt(char));
            rows.push(new_line);
        }).on('close', () => {
            resolve(rows);
            // console.log('> EOF');
        });
    })
};

const writeData = (data, file) => {
    try {
        fs.writeFileSync(`${process.cwd()}/dist/${file}`, data, { encoding: 'utf-8', flag: 'w+' });
    } catch {
        fs.createWriteStream(`./../dist/${file}`).end();
        fs.writeFileSync(`${process.cwd()}/dist/${file}`, data, { encoding: 'utf-8', flag: 'w+' });
    }
};

module.exports = { readDataArr, writeData };