const zlib = require('zlib');
const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {

   let [raw, encoding] = [fs.createReadStream('test.txt'), req.headers['accept-encodeing'] || ''];

   if (/\bdeflate\b/.test(encoding)) {

       res.writeHead(200, {
          'content-encoding': 'deflate'
       });
       raw.pipe(zlib.createDeflate()).pipe(res);
   } else if (/\bgzip\b/.test(encoding)) {

       res.writeHead(200, {
           'content-encoding': 'gzip'
       });
       raw.pipe(zlib.createGzip()).pipe(res);
   } else {

       res.writeHead(200);
       raw.pipe(res);
   }
}).listen(2000, 'localhost');