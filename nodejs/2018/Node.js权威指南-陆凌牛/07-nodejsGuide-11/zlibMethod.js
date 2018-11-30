const zlib = require('zlib');

let input = 'abcdefghijk你好啊~';
console.log(`原数据为：${input}`);
zlib.gzip(input, (err, buf) => {

    console.log(`gzip压缩后的数据为：${buf}`);
    zlib.gunzip(buf, (err, buf) => {

        console.log(`gzip解压缩后的数据为：${buf}`);
    });
});