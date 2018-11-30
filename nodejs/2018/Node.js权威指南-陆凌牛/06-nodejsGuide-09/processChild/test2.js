const fs = require("fs");

let out = fs.createWriteStream("./message.txt");
process.stdin.on("data", data => {

   out.write(data);
});
process.stdin.on("end", data => {

   console.log(`我现在要退出test2进程咯~${data}`);
   process.exit();
});