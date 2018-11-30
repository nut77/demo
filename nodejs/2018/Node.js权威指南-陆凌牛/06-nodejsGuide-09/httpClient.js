const http = require('http');

let ops = {
  hostname: 'localhost',
  port: 2000,
  path: '/',
  method: 'get'
};

for (let i = 0; i < 10; i++) {

    let req = http.request(ops, res => {

       res.on('data', chunk => {

          console.log(`服务器端响应内容是：${chunk}`);
       });
    });
    req.end();
}