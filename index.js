
var http = require("http");


// create server
http.createServer(function(request,response	) {
	console.log('web-server initiate');
	
	response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end("it's me, Manish Trivedi");
    
}).listen(4444, 'localhost');
