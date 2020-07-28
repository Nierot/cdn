const app = require('express')();
const settings = require('./settings.json');

const PORT = settings.port;

app.get('/', (req, res) => {
    res.send('oof');
})

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))