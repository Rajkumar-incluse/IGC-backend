//FILENAME : db.js

const MongoClient = require('mongodb').MongoClient
const MONGOURI = "mongodb://localhost:27017/drlnet";
const InitiateMongoServer = async () => {
    MongoClient.connect(MONGOURI, { promiseLibrary: Promise,useUnifiedTopology: true }, (err,client) => {
        if(err){
            console.log("Error in Mongo Connection",err);
        }
        global.db = client.db("drlnet");
        console.log("MongoDB Connection Successfull")
    })
};

module.exports = InitiateMongoServer;

