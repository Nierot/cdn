const { MongoClient } = require('mongodb');
const settings = require('../settings.json');
var db = undefined;
var mongo = undefined;


module.exports = {

    /**
     * Connect to the mongodb database
     */
    connect: async () => {
        let mongoClient = new MongoClient(settings.mongo_uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        try {
            await mongoClient.connect();
        } catch (e) {
            console.error(e);
        }
        let database = mongoClient.db('file-upload');
        mongo = mongoClient;
        db = database;
        return {
            mongo: mongoClient,
            db: database
        }
    },

    /**
     * Queries the database for a file
     */
    getFile: async id => {
        return new Promise(async (resolve, reject) => {
            await db.collection('files').findOne({ user_id: id }, async (err, res) => {
                if (err) {
                    console.error(err);
                    reject(err);
                }
                resolve(await res);
            })
        });
    },

    /**
     * Deletes a file from the database
     */
    deleteFile: async id => {
        await db.collection('files').deleteOne({ user_id: id }, async (err, res) => {
            if (err) console.error(err);
            console.log(`Document ${id}: deleted`)
        })
    },
    
    /**
     * Insert a file (document) into the database
     */
    insertFile: (db, file) => {
        db.collection('files').insertOne(file, (err, res) => {
            if (err) console.error(err);
            console.log("Inserted a file document");
        })
    },
}