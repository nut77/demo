// nidejs中对文件的操作 -- 利用Buffer缓存区存储二进制数据

const fs = require("fs");

// 用异步方式 新建和写入一个文件
fs.writeFile("./file.txt", "hello nodejs~,今天是2018-06-09 ", (err, data) => {

    console.log(data);
});

// 用异步方式读取一个文件内容
fs.readFile("./file.txt", (err, buf) => {

    console.log(buf.toString());
});

// 打开一个文件 往里面特定位置 写入相关数据
let buf = new Buffer("\n这是写入的第二段数据啊~~~");
fs.open("./file.txt", "a+", (err, fd) => {

    fs.write(fd, buf, 0, 22, null, (err, typeLength, buf) => {

        console.log(typeLength);
        fs.fsyncSync(fd);
        fs.close(fd, () => {});
    });
});