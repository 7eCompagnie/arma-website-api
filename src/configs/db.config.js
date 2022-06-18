const dotenv = require('dotenv').config();
const { MongoClient } = require('mongodb');
const mongoUrl = process.env.MONGO_URL;
const mongoDbName = process.env.MONGO_DB_NAME;
const client = new MongoClient(mongoUrl);

client.connect();
console.log(`[SUCCESS] => Connected to MongoDB (${mongoDbName})`);
const db = client.db(mongoDbName);

module.exports = db;
