const http = require("http");

const options = {
  hostname: "localhost",
  port: 2001,
  path: "/",
  method: "post"
};
// 返回的是http.ClientRequest对象，表示一个客户端请求
const req = http.request(options); // http.get(options)-method为get

req.on("response", res => { // http.IncomingMessage

    console.log(`服务器返回状态码：${res.statusCode}`);
    console.log(`服务器响应头：${JSON.stringify(res.headers)}`);

    // 接受响应数据
    res.on("data", chunk => {

        console.log(`服务器响应内容是：${chunk}`);
    });

    // 接受响应数据
    res.on("end", chunk => {

        console.log(`服务器响应内容已全部接收完毕。`);
    });
});

req.on("error", err => {

    console.log(`在请求过程中发生了错误，错误代码为：${err.code}`);
    req.abort(); // 终止本次请求
});

// 在建立连接的过程中，当为该连接分配端口时 触发http.ClientRequest对象的socket事件
req.on("socket", socket => {

    console.log(`分配socket`);
    socket.setTimeout(1000 * 100, () => {

        req.abort();
    });

    // 向服务器端发送数据
    req.write("这是一条来自客户端的消息");
    req.write("客户端跟你说再见~");
    req.end("客户端跟你说再见"); // 【必须要调用end方法才可以，不然不会发起与服务器端的连接请求】
});