var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');

var publicfiles = __dirname + '/public/';
var privatefiles = __dirname + '/private/';

app.get('/', function(req, res){
	res.sendFile(publicfiles + 'index.html');
});

app.get('/auth', function(req, res){
	fs.readFile(privatefiles + 'config.json', { encoding: 'utf-8' }, function(err, data){
		if(err) {
			res.write('Error');
			res.end();
		} else {
			var data = JSON.parse(data);
			res.type('json');
			res.send(data);
			res.end();
		}
	});
});

app.use("*/css", express.static(publicfiles + '/css'));
app.use("*/js", express.static(publicfiles + '/js'));

http.listen(3000, function(){
	console.log('listening on *:3000');
});