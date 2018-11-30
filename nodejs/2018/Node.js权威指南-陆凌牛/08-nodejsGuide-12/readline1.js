const readline = require('readline');
const fs = require('fs');

// 使用completer实现tab补全功能
function completer(line) {

    let comletions = 'help aaa bbb quit exit ccc ddd'.split(" ");
    let hits = comletions.filter(c => 0 == c.indexOf(line));

    return [hits, line];
}

// 使用interface对象读取用户输入行数据
let r1 = readline.createInterface({
    input: process.stdin,
    output: fs.createWriteStream('test.txt'),
    completer,
    terminal: true // 显示不出在控制台输入的消息
});

r1.on('line', line => {

   if(/^(quit|exit|q)$/.test(line)) {

       r1.close();
   } else {

       console.log(`您输入了：${line}`);
   }
});

r1.on('close', () => {

    console.log('行数据读取操作被终止');
});