const express = require('express');
const app = express();
const path = require('path');
var port = 3001;

app.use('/static', 
	express.static(__dirname + '/style'),
	express.static(__dirname + '/src'), 
	express.static(__dirname + '/node_modules'),
	express.static(__dirname + '/temp')
);

app.use('/public', 
	express.static(__dirname + '/images')
);

app.use('/mock',
	express.static(__dirname + '/mock')
);

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(port);