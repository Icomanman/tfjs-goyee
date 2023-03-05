
const express = require('express');
const child_process = require('child_process');

const app = express();
let view = '';
if ((process.argv).length > 2) {
    view = `${process.argv[2]}.html`;
}
const PORT = process.env.PORT || 8080;
const URL = `http://localhost:${PORT}/${view}`;


app.listen(PORT, () => {
    console.log('Server listening on PORT ' + PORT);
});

app.use('/', express.static('./demo/views'));
app.use('/dist', express.static('./dist'));
app.use('/js', express.static('./demo/js'));
app.use('/modules', express.static('./demo/modules'));
app.use('/css', express.static('./demo/css'));
app.use('/helpers', express.static('./helpers'));

// Open the browser:
let start = "xdg-open";
let kill_comm = "pkill -f chrome";
if (process.platform == "win32") {
    start = "start";
    kill_comm = "'TASKKILL /F /IM chrome.exe /T'";
};

// Kill browser upon node exit
process.on('exit', () => child_process.exec(kill_comm));
child_process.exec(`${start} ${URL}`);