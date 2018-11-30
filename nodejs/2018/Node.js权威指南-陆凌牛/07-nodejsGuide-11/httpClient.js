const zlib = require('zlib');
const fs = require('fs');
const http = require('http');

let opts = {
    hostname: 'localhost',
    port: 2000,
    path: '/',
    headers: {
        'accept-encoding': 'gzip,deflate'
    }
};
http.get(opts, res => {

    let out = fs.createWriteStream('test2.txt');

    switch (res.headers['content-encoding']) {

        case 'deflate':
            res.pipe(zlib.createInflate()).pipe(out);
            break;
        case 'gzip':
            res.pipe(zlib.createGunzip()).pipe(out);
            break;
        default:
            res.pipe(out);
            break;
    }
});