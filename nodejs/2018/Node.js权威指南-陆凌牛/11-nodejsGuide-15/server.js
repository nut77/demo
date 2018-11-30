// 需要先运行 cnpm install socket.io - 下载socket.io模块
// node server.js
// 客户端（浏览器）访问 localhost：2000  即可看到相关操作

const http = require('http');
const socketIo = require('socket.io'); // ./socket.io
const fs = require('fs');

const server = http.createServer((req, res) => {

   res.writeHead(200, {
       'content-type': 'text/html'
   });
   res.end(fs.readFileSync('./index.html'));
});
server.listen(2000);

const socket = socketIo.listen(server);
socket.on('connection', socket => {

    console.log('服务端：与客户端建立连接成功。');
    socket.send('hello~~~');

    // 连接成功后 监听才生效 ----不在connection中执行会默认是广播
    socket.on('message', msg => {

        console.log(`服务端：接收客户端消息-${msg}`);
    });

    socket.on('disconnect', () => {

        console.log(`服务端：客户端断开连接。`);
    });

    // 自定义事件
    socket.on('serverEvent', (data, fn) => {

        console.log(`服务端：服务端接收数据${JSON.stringify(data)}`);
        fn('client~');
    });

    // 触发客户端事件
    socket.emit('clientEvent', {name: 'server'}, (data) => {

        console.log(data);
    });
});
