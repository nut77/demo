// 查看当前应用程序的进程的内存使用量
console.log(`当前应用程序的进程的内存使用量：${JSON.stringify(process.memoryUsage())}`);

// nextTick() 用于将一个函数推迟到代码中所书写的下一个同步方法执行完毕时或异步方法的事件回调函数开始执行时调用
// nextTick()作用与setTimeout(func, 0);相同，但是nextTick方法中指定的函数要比setTimeout调用速度更快
function printHello1() {

    console.log("hello1~");
}
function printHello2() {

    console.log("hello2~");
}
setTimeout(printHello1, 0);
process.nextTick(printHello2); // 先执行
console.log("will print hello~~~ waiting...");

// 使用nextTick方法指定两个耗时操作同步进行
console.log("=======使用nextTick方法指定两个耗时操作同步进行==========");
const fs = require("fs");
function foo() {

    function anotherTask() {

        let file = fs.createReadStream("./processAttr.js");
        file.on("data", data => { // 后执行

            console.log(`process nextTick 读取到${data.length}字节。`);
        });
    }
    process.nextTick(anotherTask);
}

let file = fs.createReadStream("./processAttr.js");
file.on("data", data => { // 先执行

    console.log(`读取到${data.length}字节。`);
});
foo();

// 发生为捕获异常是触发uncaughtException事件
process.on("uncaughtException", err => {

    console.log(`捕获到一个未被处理的错误：${err}`);
});