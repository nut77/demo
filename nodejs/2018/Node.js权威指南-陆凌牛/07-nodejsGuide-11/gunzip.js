const zlib = require('zlib');
const fs = require('fs');

let gunzip = zlib.createGunzip();
let inp = fs.createReadStream('test.txt.gz');
let out = fs.createWriteStream('test1.txt');

inp.pipe(gunzip).pipe(out);