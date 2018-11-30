const net = require("net");
const client = new net.Socket();

client.setEncoding("utf-8");
client.connect(2000, "localhost");
client.on("connect", () => {

    console.log("客户端已连接到服务器。");
    client.write("你好。")
});

// 服务器端发送数据时触发
client.on("data", data => {

    console.log(`已接收到服务器端数据：${data}`);
});

client.on("error", err => {

    console.log(`连接失败：${err.code}`);
    client.destroy();
});

// 定时由客户端关闭TCP连接
setTimeout(() => {

    client.end("我要关闭连接咯~~");
}, 1000 * 10);
