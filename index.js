
// define basic stuff
var port 		= 4444;
var serverUrl	= "127.0.0.1";
var dirPath		= __dirname + '/app/' ;
 
var http	= require("http");
var fs		= require("fs");
var url 	= require("url");
var qs = require('querystring');

console.log(" Web-Server is running at " + serverUrl + ":" + port);

// String function define
if ( typeof String.prototype.endsWith != 'function' ) {
	  String.prototype.endsWith = function( str ) {
	    return str.length > 0 && this.substring( this.length - str.length, this.length ) === str;
	  }
	};
	
	

// create server
http.createServer(function(request,response	) {
	
	var filePath =   request.url;
	
	var pathname 	= 	url.parse(filePath).pathname;
	var get_var		=	url.parse(filePath, true).query;
	
	//console.log(get_var);
	
	console.error("TODO:: Pathname"+ pathname);
	console.error(get_var['form']);
	
	if ('/career' === pathname && get_var['form']) {
		response.writeHead(200, {'content-type': 'text/plain'});
		var objToJson = { };
		objToJson.response = 'Yo buddy!good job';
		response.write(JSON.stringify(objToJson));
		response.end();
		return
	}
	
	//logs display on cli
	console.log('web-server initiate and req-url is :'+ filePath);

	var error_file_not_exist = 
		function (filePath,err) 
		{
			console.log(err + '## ' + filePath + ' File is not Exist... :( ');
			
			response.writeHead(500);
			response.end(' File is not Exist... :( ');
		};
		
	//default stuff
	var file_type = 'html';
	var content_type = 'text/html';
	
	
	if	(filePath.endsWith('.js'))	{
		file_type = 'js';	
	}
	
	if	(filePath.endsWith('.css'))	{
		file_type = 'css';	
	}
	
	if	(filePath.endsWith('.jpg') || filePath.endsWith('.png') || filePath.endsWith('.jepg') ||filePath.endsWith('.gif'))	{
		file_type = 'img';	
	}
	
	filePath = dirPath + filePath;
	
	switch (file_type)
	{
		case 'js' :
			content_type = 'text/javascript';
			break;
		case 'css' :
			content_type = 'text/css';
			break;
		case 'img' :
			content_type = 'text/gif';
			break;
		case 'html' :
		default:
			filePath = dirPath + '/career/index.html';
			content_type = 'text/html';
			break;
	}
	
	
	fs.readFile(filePath, function (err, contents) {
        if (err) { 
        	error_file_not_exist(filePath, err);
        }
        
        response.writeHead(200, {'Content-Type': content_type});
        response.write(contents);
        response.end();
      });
    
	
}).listen(port, serverUrl);
