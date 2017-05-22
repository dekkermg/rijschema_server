var http = require('http');
var formidable = require('formidable');
var bodyParser = require('body-parser');
var util = require('util');
var uuid = require('node-uuid');
var express = require('express');
var mongoDbConnnection = require('./mongoDbConnection');

var app = express();
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    next();
});

app.get('/', function(req, res) {
    var msg = '<h1>Rijschema api</h1>';
    msg += '<p>Gebruik /rides voor een lijst met ritten.</p>';
    res.send(msg);
});

app.get('/rides', function(req, res) {
        console.log("entered rides");
        var db = new mongoDbConnnection();
        //var data = db.findAll();
        var data = [{               
                    "id": uuid.v1(),
                    "name": "Noordwijk uit",
                    "date": "19 Augustus, 2016",
                    "description": "Uit tegen Noordwijk",
                    "participantType": "rijder",
                    "drivers": [{"name": "Adriaan", "nrOfSeats": 3}],
                    "companions": [{"name": "Martin", "remarks": "geen"}]
                    },
                    {
                    "id": uuid.v1(),
                    "name": "ASC uit",
                    "date": "18 September, 2016",
                    "description": "Uit tegen ASC",
                    "participantType": "meerijder",
                    "drivers": [{"name": "Adriaan", "nrOfSeats": 3}],
                    "companions": [{"name": "Martin", "remarks": "geen"}]
        }];
        
        var responseData = JSON.stringify(data);
        res.end(responseData);
        console.log("get responseData: ", responseData);
        return;
});

app.post('/ride', jsonParser, function(req, res) {
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        var jsonRide = JSON.stringify(req.body, null, 2);

        console.log('posted ride in JSON:\n');
        console.log(jsonRide);

        var db = new mongoDbConnnection();
        var data = db.insert(req.body);        
        res.end(jsonRide);
})

app.listen(3100);
console.log('Express-server gestart op http://localhost:3100');