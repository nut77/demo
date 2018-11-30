const dgram = require("dgram");
const client = dgram.createSocket("udp4");

let buf = new Buffer("这是一条来自客户端的信息~");
client.send(buf, 0, buf.length, 2000, "localhost", (err,  bytes) => {

    if (err) {

        console.log("客户端数据发送失败");
    } else {

        console.log(`客户端已发送${bytes}字节的数据`);
    }
});

// 当接受相关数据时 触发该事件
client.on("message", (data, sinfo) => {

    console.log(`已接收到服务器端信息是：${data}`);
    console.log("服务器端地址信息是：%j", sinfo);
    client.close();
});

// 当关闭socket端口对象时 触发该事件
client.on("close", () => {

   console.log("socket对象呗关闭");
});