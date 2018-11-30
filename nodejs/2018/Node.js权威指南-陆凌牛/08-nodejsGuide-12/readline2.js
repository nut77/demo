const readline = require('readline');
const fs = require('fs');

// 使用interface对象逐行读取文件
let inp = fs.createReadStream('test2.txt');
let out = fs.createWriteStream('test.txt');

let r1 = readline.createInterface({
   input: inp,
   output: out
});

let index = 1;
r1.on('line', line => {

    out.write(`line: ${index++}：${line}\r\n`);
});

inp.on('end', () => {

   console.log(`文件已读取完毕。`);
   r1.close();
});

r1.on('close', () => {

    console.log('行数据读取操作被终止'); 
});