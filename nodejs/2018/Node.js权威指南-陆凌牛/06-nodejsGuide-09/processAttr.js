// 在nodejs中使用process对象（全局对象）代表Node.js应用程序  在操作系统中每个应用程序都是一个进程类的实例对象

process.stdin.resume(); // 恢复读取标准输入流数据
process.stdin.on("data", chunk => {

   process.stdout.write(`进程接收到数据：${chunk}`);
});

process.argv.forEach((value, i, arr) => {

   console.log(`${i}：${value}`);
});

console.log(`当前可执行文件的绝对路径：${process.execPath}`);