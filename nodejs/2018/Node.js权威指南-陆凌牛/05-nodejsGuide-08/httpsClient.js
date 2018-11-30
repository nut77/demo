const https = require("https");

const options = {
  hostname: "www.npmjs.com",
  port: 443,
  path: "/",
  method: "get"
};
// 返回的是https.ClientRequest对象，表示一个客户端请求
const req = https.request(options); // https.get(options)-method为get

req.on("response", res => { // https.IncomingMessage

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

// 在建立连接的过程中，当为该连接分配端口时 触发https.ClientRequest对象的socket事件
req.on("socket", socket => {

    console.log(`分配socket`);
    socket.setTimeout(1000 * 100, () => {

        req.abort();
    });

    req.end();
});