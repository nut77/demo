var events = require("events");
var eventEmitter = new events.EventEmitter();
var connectHandler = function connected() {

	console.log("connect success");
	eventEmitter.emit("data_received");
}

eventEmitter.on("connection", connectHandler);
eventEmitter.on("data_received", function() {

	console.log("get data success");
});

eventEmitter.emit("connection");
console.log("fun aready exe");

eventEmitter.on("test", function() {

	console.log("test");
});

/*setInterval(function () {
	eventEmitter.emit("test");
}, 1000);*/

var buf = new Buffer(2);
buf.fill(97);
console.log(buf.toString());

// 利用管道流实现文件的读写
var fs = require("fs");
var readStream = fs.createReadStream("test.js");
var writeStream = fs.createWriteStream("output.txt");
readStream.pipe(writeStream);
console.log("文件读写完毕");

// 链式流，链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。
// 加压、解压文件
var zlib = require("zlib");
fs.createReadStream("output.txt")
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream("output.txt.gz"));
console.log("output.txt 文件压缩完成");

fs.createReadStream("output.txt.gz")
	.pipe(zlib.createGunzip())
	.pipe(fs.createWriteStream("output1.txt"));
console.log("output.txt.gz 文件解压完成");

function SayHello() {

	this.say = function () {

		console.log("this is test");
	};
}
module.exports = SayHello;

// console.log(_filename + "====" + _dirname); 报错
console.log("string==",199,111);