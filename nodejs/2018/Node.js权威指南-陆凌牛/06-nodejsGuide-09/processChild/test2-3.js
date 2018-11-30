const fs = require("fs");

let out = fs.createWriteStream("./message3.txt");
process.stdin.on("data", data => {

   out.write(data);
   process.exit();
});