const app = require('express')();
const settings = require('../settings.json');

const PORT = settings.port;


app.get('/-/*', (req, res) => {
    res.send('/-/*');
})

// If all else fails
app.get('/*', (req, res) => {
    res.send('fails');
})


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`))