// 使用fork方法开启子进程
const childProcess = require("child_process");
const http = require("http");
const net = require("net");
const fs = require("fs");

let child = childProcess.fork("./processChild/test1-2.js");
let server = net.createServer(); // 创建TCP服务器
server.listen(2000, "localhost", () => {

    child.send("server", server); // 给子进程发送消息
    console.log("父进程中的服务器已创建~~");

    let httpServer = http.createServer();
    httpServer.on("request", (req, res) => {

       if ("favicon.ico" !== req.url) {

           let sum = 0;
           for (let i = 0; i < 1000000; i++) {

               sum += i;
           }
           res.write("客户端请求在父进程中被处理。");
           res.end(`sum = ${sum}`);
       }
    });
    httpServer.listen(server);
});

child.on('exit', (code, signal) => {

   console.log(`子进程退出，退出代码为：${code} signal：${signal}`);
   process.exit();
});

child.on(`error`, err => {

    console.log(`子进程child开启失败：${err}`);
    process.exit();
});