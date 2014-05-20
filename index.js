
// define basic stuff
var port 		= 4444;
var serverUrl	= "127.0.0.1";
var filePath	= __dirname + '/template/mani/index.html';
 
var http = require("http");
var fs = require("fs");

console.log(" Web-Server is running at " + serverUrl + ":" + port);

// create server
http.createServer(function(request,response	) {
	//logs display on cli
	console.log('web-server initiate');
	
	fs.readFile(filePath, function(err, contents) {
		if(!err) {
			response.setHeader("Content-Length", contents.length);
			response.setHeader("Content-Type", 'text/html');
			response.statusCode = 200;
			response.end(contents);
		} else {
			response.writeHead(500);
			response.end();
		}
		});
	
	
	//response.writeHead(200, {'Content-Type': 'text/plain'});
	
    //response.end("it's me, Manish Trivedi");
    
}).listen(port, serverUrl);
