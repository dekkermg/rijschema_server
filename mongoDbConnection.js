var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;

module.exports = function() {   
  this.insert = function(insertObject) {
    var db;
    console.log("start verbinding met db");
    // Set up the connection to the local db
    return MongoClient.connect("mongodb://localhost:27017/rijschema", function(err, database){
      if(err) console.log("er gaat iets mis met mongo connectie maken")
      else console.log("verbinding met mongodb gemaakt")
      db = database;
      console.log("start collection insert");
    
      return database.collection('rides').insert(insertObject, {w: 1}, function(err, records) {
          console.log("Record added");
        return records;
      });
    });
  };

  this.findAll = function() {
    var rides;
    console.log("start verbinding met db");
    // Set up the connection to the local db
    var records = MongoClient.connect("mongodb://localhost:27017/rijschema", function(err, database){
      if(err) console.log("er gaat iets mis met mongo connectie maken")
      else console.log("verbinding met mongodb gemaakt")
      console.log("start findAll");
      rides = database.collection('rides').find().toArray(function(err, docs){
        //console.log(JSON.stringify(docs));
        return docs;
      });
      console.log(JSON.stringify(rides));
    });
    return rides;
  };
};