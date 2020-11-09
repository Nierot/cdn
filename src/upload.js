let settings = require('../settings.json');
let crypto = require('crypto');
const formidable = require('formidable');
const mv = require('mv');

module.exports = {
    upload: (req, res) => {
        const form = new formidable.IncomingForm();

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(files.file)

            if (files.file.type !== 'audio/mpeg') {
                res.status(400).send({
                    status: 400,
                    message: 'not an mp3 file'
                })
            } else {
                const id = crypto.randomBytes(6).toString('base64').replace('/', '-');
                mv(files.file.path, `${settings.paths.music}/${id}.mp3`, err => {
                    if (err) {
                        console.error(err)
                        res.status(500).send({
                            status: 500,
                            message: 'server error',
                            err: err
                        })
                    } else { 
                        res.status(200).send({
                            status: 200,
                            message: 'file processed',
                            id: id
                        })
                    }
                })
            }
        })
    }
}