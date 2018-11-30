const net = require("net");
const file = require("fs").createWriteStream("./msg.txt");

let server = net.createServer((socket) => {

    console.log(`创建TCP服务器成功。`);
    server.getConnections((err, count) => {

        console.log(`当前存在${count}个客户端连接。`);
    });
});

server.listen("2000", "localhost");
server.on("listening", () => {

    // telnet localhost 2000 建立与被创建的TCP服务器之间的连接
    console.log(`TCP连接监听中...`);
    console.log(`被监听的地址信息是：${server.address()}`);
});
server.on("connection", (socket) => {

    console.log('socket端口对象的地址信息为：%j', socket.address());
    socket.pipe(file, {end: false});
    socket.setEncoding("utf-8");

    // 客服端发送数据是触发
    socket.on("data", data => {

        console.log(`已接收到客户端数据：${data}`);
        socket.write(`确认数据：${data}`);
    });

    socket.on("error", err => {

        console.log(`连接失败：${err.code}`);
        socket.destroy();
    });

    socket.on("end", () => {

        console.log(`客户端连接被关闭。`);
        server.unref(); // 退出应用程序
    });

    socket.on("close", hadError => {

        if (hadError) {

            console.log(`由于一个错误socket端口被关闭。`);
            server.unref(); // 退出应用程序
        } else {

            console.log(`TCP服务器被正常关闭。`);
        }
    });
});
server.on("error", (err) => {

    console.log(`创建TCP连接失败${err}。`);
});
server.on("close", () => {

    console.log("TCP服务器被  关闭。");
});
setTimeout(() => {

    server.close();
}, 1000 * 60);