
// define basic stuff
var port 		= 4444;
var serverUrl	= "127.0.0.1";
var dirPath		= __dirname ;
 
var http = require("http");
var fs = require("fs");

console.log(" Web-Server is running at " + serverUrl + ":" + port);

// String function define
if ( typeof String.prototype.endsWith != 'function' ) {
	  String.prototype.endsWith = function( str ) {
	    return str.length > 0 && this.substring( this.length - str.length, this.length ) === str;
	  }
	};
	
	

// create server
http.createServer(function(request,response	) {
	
	var filePath = request.url;
	
	var error_file_not_exist = 
		function (filePath,err) 
		{
			console.log(err + '## ' + filePath + ' File is not Exist... :( ');
			
			response.writeHead(500);
			response.end('File is not Exist... :( ');
		};
	
	//logs display on cli
	console.log('web-server initiate');
	
	if	(filePath.endsWith('.js'))	{ //filePath has the pathname, check if it conatins '.js'
		
		
		console.log('load js file' + filePath);
		
	      fs.readFile(dirPath + filePath, function (err, contents) {
	        if (err) { 
	        	error_file_not_exist(dirPath + filePath, err);
	        }
	        
	        response.writeHead(200, {'Content-Type': 'text/javascript'});
	        response.write(contents);
	        response.end();
	      });

	    }
	
	
	if	(filePath.endsWith('.css'))	{	//filePath has the pathname, check if it conatins '.css'
		
		
		console.log('load css file' + filePath);
		
	      fs.readFile(dirPath + filePath, function (err, contents) {
	        if (err) { 
	        	error_file_not_exist(dirPath + filePath, err);
	        }
	        
	        response.writeHead(200, {'Content-Type': 'text/css'});
	        response.write(contents);
	        response.end();
	      });

	    }

	
	
		
	//default : filePath has the pathname, check if it conatins '.html'
	if	(!filePath.endsWith('.css') && !filePath.endsWith('.js'))	{	
		
		filePath = dirPath + '/template/career/index.html';
		
		fs.readFile(filePath, function(err, contents) {
			if(!err) {
				response.setHeader("Content-Length", contents.length);
				response.setHeader("Content-Type", 'text/html');
				response.statusCode = 200;
				response.end(contents);
			} else {
				
				error_file_not_exist(filePath, err);
			}
			});
	}
	
	
	//response.writeHead(200, {'Content-Type': 'text/plain'});
	
    //response.end("it's me, Manish Trivedi");
    
}).listen(port, serverUrl);
