var http = require("http");
http.createServer(function (request, response) {

	response.writeHead(200, {"Content-Type": "text/plain"});
	response.end("hello\n");
}).listen(2000);
console.log('Server running at http://127.0.0.1:2000/');

var SayHello = require("./test1");
var sayHello= new SayHello();
sayHello.say();