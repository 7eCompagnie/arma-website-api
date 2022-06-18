const database = {}

database.connect = async () => {
    const mongoClient = require('mongodb').MongoClient;
    const mongoUrl = process.env.MONGO_URL;
    const mongoDbName = process.env.MONGO_DB_NAME;
    let db;

    mongoClient.connect(mongoUrl, (err, client) => {
        console.log(`[SUCCESS] => Connected to MongoDB (${mongoDbName}).`);
        db = client.db(mongoDbName);
        database.db = db;
    });
}

module.exports = database;
