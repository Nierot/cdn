const app = require('express')();
const settings = require('../settings.json');
const files = require('./files');
const serve = require('./serve');

const PORT = settings.port;


app.get(settings.endpoints.standard + "*", (req, res) => {
    serve.serveFile(res, `${settings.paths.standard}/${req.url.split('/')[2]}`)
})

app.get(settings.endpoints.media + "*", (req, res) => {
    serve.serveFile(res, `${settings.paths.media}/${req.url.split('/')[2]}`)
})

app.get(settings.endpoints.file_share + "*", (req, res) => {
    serve.serveFile(res, `${settings.paths.media}/${req.url.split('/')[2]}`)
})

app.get('/*', (req, res) => {
    res.send('<h1>cdn</h1>');
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))