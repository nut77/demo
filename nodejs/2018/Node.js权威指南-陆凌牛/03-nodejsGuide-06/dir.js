const fs = require("fs");

fs.mkdir("./test", (err) => {

    console.log(err ? "创建文件目录失败" : "创建文件目录成功");
});

fs.readdir("./test", (err, files) => {

    console.log(err ? "读取文件目录失败" : files);
});