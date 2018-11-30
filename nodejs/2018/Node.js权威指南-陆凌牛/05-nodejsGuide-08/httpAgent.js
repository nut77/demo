const url = require("url");
const http = require("http");
const server = http.createServer();

server.listen(2000, "localhost");
server.on("request", (sreq, sres) => {

    let reqUrl = url.parse(sreq.url);
    let opts = {
      hostname: "www.baidu.com",
      port: 80,
      path: reqUrl.pathname,
      headers: sreq.headers
    };

    let creq = http.get(opts, cres => {

        sres.writeHead(cres.statusCode, cres.headers);
        cres.pipe(sres);
    });

    // 将可写流自动切换到 flowing 模式并将所有数据传给绑定的 Writable
    sreq.pipe(creq);
});