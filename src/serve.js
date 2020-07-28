const mime = require('mime-types');
const fs = require('fs');

module.exports = {

    /**
     * Sends the requested file to the client
     */
    serveFile: (res, path) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                res.send('');
            } else {
                res.set('Content-Type', mime.lookup(path));
                res.send(data);
            }
        })
    }
}