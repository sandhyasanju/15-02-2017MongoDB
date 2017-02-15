var mongoClient = require("mongo").MongoClient;
var assert = require("assert");

var url = "mongodb://localhost:27017/employee";
mongoClient.connect(url,function(error,db){
    assert.equal(null, error);
    console.log("connected to server");
    db.close();
})