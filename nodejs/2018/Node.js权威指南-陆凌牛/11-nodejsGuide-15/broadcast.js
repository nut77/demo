// 需要先运行 cnpm install socket.io
// node broadcast.js
// 客户端（浏览器）访问 localhost：2000  即可看到相关操作
// 广播-可以用来实现多人在线聊天

const http = require('http');
const sockrtIo = require('socket.io'); // ./socket.io
const fs = require('fs');

const server = http.createServer((req, res) => {

   res.writeHead(200, {
       'content-type': 'text/html'
   });
   res.end(fs.readFileSync('./index2.html'));
});
server.listen(2000);

const io = sockrtIo.listen(server);
const names = []; // 当前登录的用户
io.sockets.on('connection', socket => {

    socket.emit('login', names);

    // 自定义事件
    socket.on('login', name => {

        names.push(name);
        io.sockets.emit('login', names); // 等价于<=> socket.emit('login', names); socket.broadcast.emit('login', names);
    });
});
