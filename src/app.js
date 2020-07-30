const app = require('express')();
const settings = require('../settings.json');
const files = require('./files');
const serve = require('./serve');
const dbHelper = require('./mongo');
const e = require('express');

const PORT = settings.port;
var db = undefined;
var mongo = undefined;


app.get(settings.endpoints.standard + "*", (req, res) => {
    serve.serveFile(res, `${settings.paths.standard}/${req.url.split('/')[2]}`)
})

app.get(settings.endpoints.media + "*", (req, res) => {
    serve.serveFile(res, `${settings.paths.media}/${req.url.split('/')[2]}`)
})

app.get(settings.endpoints.file_share + "*", async (req, res) => {
    await serve.checkExpiration(decodeURI(req.url.split(settings.endpoints.file_share)[1].split('/')[0]))
        .then(() =>
            serve.serveFile(res, `${settings.paths.file_share}/${decodeURI(req.url.split(settings.endpoints.file_share)[1])}`)
        ).catch(err =>
            res.send('This file has expired, ask the uploader to reupload')
        )
})

app.get('/*', (req, res) => {
    res.send('<h1>cdn</h1>');
})

app.listen(PORT, async () => {
    let obj = await dbHelper.connect();
    db = obj.mongo;
    mongo = obj.mongo;
    console.log(`Listening on http://localhost:${PORT}`);
});