// 使用spawn方法开启子进程
const childProcess = require("child_process");

let sp1 = childProcess.spawn("node", ['test1.js', 'one', 'two', 'three'], {
    cwd: './processChild'
});

let sp2 = childProcess.spawn('node', ['test2.js'], {
    cwd: './processChild',
    stdio: 'pipe'
});

sp1.stdout.on('data', data => {

    console.log(`子进程标准输出：${data}`);
    sp2.stdin.write(data);
});

sp1.on('exit', (code, signal) => {

   console.log(`子进程退出，退出代码为：${code} signal：${signal}`);
   process.exit();
});

sp1.on(`error`, err => {

    console.log(`子进程sp1开启失败：${err}`);
    process.exit();
});