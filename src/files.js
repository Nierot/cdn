const fs = require('fs');
const settings = require('../settings.json');

module.exports = {
    
    /**
     * Returns a list of all files
     */
    getAll: async path => {
        let list = []
        await fs.readdir(path, (err, files) => {
            if (err) console.log(err);
            files.forEach(file => list.push(file))
        })
        await new Promise(r => setTimeout(r, 1)); // Great language
        return list
    },

    /**
     * Deletes a user folder from the hard drive
     */
    deleteFile: async id => {
        await fs.rmdir(`${settings.paths.file_share}/${id}`, { recursive: true }, err => {
            console.log(`File ${id}: deleted`)
            if (err) console.error(err);
        })
    }
}