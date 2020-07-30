const mime = require('mime-types');
const fs = require('fs');
const mongo = require('./mongo');
const files = require('./files');

module.exports = {

    /**
     * Sends the requested file to the client
     */
    serveFile: (res, path) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.error(err)
                res.send('');
            } else {
                res.set('Content-Type', mime.lookup(path));
                res.send(data);
            }
        })
    },

    /**
     * Checks if a file has expired.
     */
    checkExpiration: async id => {
        let file = await mongo.getFile(id);
        return new Promise((resolve, reject) => {
            if (new Date().getTime() > file.date + 24*60*60*1000) { // time at upload + 24 hours
                mongo.deleteFile(id);
                files.deleteFile(id);
                reject(false);
            } else {
                resolve(true);
            }
        })
    }
}