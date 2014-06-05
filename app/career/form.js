

var qs = require('querystring');

var process = function (request, response) {
    if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            if (body.length > 1e6)
                req.connection.destroy();
        });
        
        request.on('end', function () {
            var post = qs.parse(body);
            
            console.log("Post Data " + post['email'] );
        });
    }
};

//form  will use by outside
exports.process = process;