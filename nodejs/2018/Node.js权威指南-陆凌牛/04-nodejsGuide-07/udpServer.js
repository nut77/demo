const dgram = require("dgram");
const server = dgram.createSocket("udp4");

// 设置监听地址
server.bind(2000, "localhost");

// 当socket端口对象开始监听来自于指定地址及端口号的数据时，触发该事件
server.on("listening", () => {

    let address = server.address();
    console.log("服务器端开始监听。监听地址是：%j", address);
});

// 当接受相关数据时 触发该事件
server.on("message", (data, cinfo) => {

    console.log(`已接收到客户端信息是：${data}`);
    console.log("客户端地址信息是：%j", cinfo);

    let buf = new Buffer("这是一条来自服务器端的信息。");
    server.send(buf, 0, buf.length, cinfo.port, cinfo.address);

    setTimeout(() => {

        // 当不存在与该socket端口对象通信的客户端时 退出运行UDP服务器的应用程序
        server.unref();
    }, 1000 * 10);
});