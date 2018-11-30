const http = require("http");

process.on('message', (msg, server) => {

    if ('server' == msg) {

        console.log(`子进程中的服务已创建。`);
        let httpServer = http.createServer();
        httpServer.on('request', (req, res) => {

            if ("favicon.ico" !== req.url) {

                let sum = 0;
                for (let i = 0; i < 1000000; i++) {

                    sum += i;
                }
                res.write("客户端请求在子进程中被处理。");
                res.end(`sum = ${sum}`);
            }
        });
        httpServer.listen(server);
    }
});