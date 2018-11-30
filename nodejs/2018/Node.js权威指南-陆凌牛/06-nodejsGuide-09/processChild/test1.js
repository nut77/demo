process.stdout.write(`子进程test1当前工作目录是：${JSON.stringify(process.env)}`);
process.argv.forEach((value, index) => {

    console.log(`test1 ${index}：${value}`); // process.stdout.write
});