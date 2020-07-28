const fs = require('fs');

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
    }
}