const zlib = require('zlib');
const fs = require('fs');

let gzip = zlib.createGzip();
let inp = fs.createReadStream('test.txt');
let out = fs.createWriteStream('test.txt.gz');

inp.pipe(gzip).pipe(out);
