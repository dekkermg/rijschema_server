var http = require('http');
var formidable = require('formidable');
var util = require('util');
var uuid = require('node-uuid');

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