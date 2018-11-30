const http = require("http");
const server = http.createServer();

server.listen(2001, "localhost", () => {

    console.log("服务器开始监听。");
});

server.on("connection", socket => {

    console.log(`客户端连接已建立`);
});

server.on("request", (req, res) => { // http.IncomingMessage http.ServerResponse

    console.log(`客户端请求方法：${req.method}`);
    console.log(`客户端请求url路径：${req.url}`);
    console.log(`客户端请求头对象：%j`, req.headers);
    console.log(`客户端请求HTTP版本：${req.httpVersion}`);

    if ("/favicon.ico" !== req.url) {

        // 接受客户端发送的数据
        req.on("data", data => { // 要post请求才可以

            console.log(`客户端发送的数据为：${decodeURIComponent(data)}`);

            res.writeHead(200, {"Content-Type":  "text/html"});
            // res.setHeader("Content-Type", "text/html");
        });

        req.on("end", () => {

            console.log(`客户端请求数据已全部接收完毕。`);

            // 给客户端发送数据
            res.write(`<!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <title>temp</title>
                        <script src="../AMD-require.js/scripts/lib/jquery.js"></script>
                    </head>`);
            res.write(`<body><h3>hello~</h3></body>`);
            res.end("响应数据已发送完毕");
        });
    }
});

server.setTimeout(1000 * 10, socket => {

   console.log(`服务器超时`);
   // console.log(socket);
});

server.on("error", e => {

   console.log(`http连接出错了${e.code}`);
});

server.on("close", () => {

    console.log(`http服务器已关闭`);
});