// 使用exec方法开启子进程
// exec方法中使用的回调函数 用于指定进程终止调用时调用的回调函数 是同步的
// 用法类似execFile方法  只是该方法第一个参数是可执行文件（如批处理文件.bat）里面的内容即是相关命令
const childProcess = require("child_process");

let sp1 = childProcess.exec('node test1-3.js one two three', {cwd: './processChild'}, (err, stdout, stderr) => {

    if (err) {

        console.log(`子进程开启失败，${err}。`);
        process.exit();
    } else {

        console.log(`子进程标准输出：${stdout.toString()}`);
        sp2.stdin.write(stdout.toString());
    }
});

let sp2 = childProcess.exec('node test2-3.js', {cwd: './processChild'}, (err, stdout, stderr) => {

    console.log(`我现在要退出进程咯~`);
    process.exit();
});