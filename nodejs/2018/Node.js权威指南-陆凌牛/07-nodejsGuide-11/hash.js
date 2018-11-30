// 散列（哈希）算法示例 将该数据模糊化 或者是为一大段数据提供校验码
const crypto = require('crypto');
const fs = require('fs');

let sha1Sum = crypto.createHash('sha1');
let file = fs.ReadStream('hash.js');
file.on('data', data => {

   sha1Sum.update(data);
});

file.on('end', () => {

   let hashCode = sha1Sum.digest('hex');
   console.log(hashCode);
   console.log(hashCode.length);
});