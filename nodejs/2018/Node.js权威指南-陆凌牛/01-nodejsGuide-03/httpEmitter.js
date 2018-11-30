// 用来验证nodejs的事件处理机制

const http = require("http");
const server = http.createServer();

let reqCallback = (req, res) => {

    console.log(`${req.url}请求了我~`);
};
server.on("request", reqCallback);
server.on("request", reqCallback);
server.on("request", reqCallback);

server.setMaxListeners(3);
server.on("request", (req, res) => {

    console.log(`${req.url}又请求了我~`);
});

console.log(server.listenerCount("request"));
server.listen(3000, "127.0.0.1");