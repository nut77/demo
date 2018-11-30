// 使用之前 需要先运行 cnpm install mongodb
// 然后再运行 node mongo1.js

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'node-mongo-example';

MongoClient.connect(url, {useNewUrlParser: true}, (err, client) => {

    console.log("Connected successfully to server");
    const db = client.db(dbName);

    insertDocuments(db, function() {
        findDocuments(db, function() {
            client.close();
        });
    });
});


// 插入一条记录
const insertDocuments = function(db, callback) {

    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
        {a : 1}, {a : 2}, {a : 3}
    ], function(err, result) {

        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
};

// Find All Documents
const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {

        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    });
};