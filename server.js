var http = require('http');
var formidable = require('formidable');
var util = require('util');
var uuid = require('node-uuid');
var express = require('express');
var mongoDbConnnection = require('./mongoDbConnection');

var app = express();

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
        var data = [{               
                    "id": uuid.v1(),
                    "name": "Noordwijk uit",
                    "date": "19 Augustus, 2016",
                    "description": "Uit tegen Noordwijk",
                    "participantType": "rijder",
                    "nrOfSeats": 3
                    },
                    {
                    "id": uuid.v1(),
                    "name": "ASC uit",
                    "date": "18 September, 2016",
                    "description": "Uit tegen ASC",
                    "participantType": "meerijder",
                    "nrOfSeats": 1
        }];

        var responseData = JSON.stringify(data);
        res.end(responseData);
        console.log("get: ", responseData);
        return;
});

app.post('/ride', function(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        console.log('posted fields:\n');
        console.log(fields);

        var db = new mongoDbConnnection();
        var data = db.insert(fields);        
        res.end(data);
    });
})

app.listen(3100);
console.log('Express-server gestart op http://localhost:3100');

/*

var server = http.createServer(function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');

    if (req.method.toLowerCase() == 'post') {
        processForm(req, res);
        return;
    }

    if (req.method.toLowerCase() == 'get') {
        var data = [{               
                    "id": uuid.v1(),
                    "name": "Noordwijk uit",
                    "date": "19 Augustus, 2016",
                    "description": "Uit tegen Noordwijk",
                    "participantType": "rijder",
                    "nrOfSeats": 3
                    },
                    {
                    "id": uuid.v1(),
                    "name": "ASC uit",
                    "date": "18 September, 2016",
                    "description": "Uit tegen ASC",
                    "participantType": "meerijder",
                    "nrOfSeats": 1
        }];

        var responseData = JSON.stringify(data);
        res.end(responseData);
        console.log("get: ", responseData);
        return;
    }
    res.end();
});

function processForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields) {

        res.writeHead(200, {
            'content-type': 'text/plain'
        });

        var data = JSON.stringify({
            fields: fields
        });
        
        res.end(data);

        console.log('posted fields:\n');
        console.log(data);
    });
}

var port = 3100;
server.listen(port);
console.log('server listening on port' + port);
*/