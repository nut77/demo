// 使用之前 需要先运行 cnpm install mongoose

const mongoose = require('mongoose');

const db = mongoose.connect("mongodb://127.0.0.1:27017/node-mongo-example");

/*db.connection.on("error", function (error) {

    console.log("数据库连接失败：" + error);

});

db.connection.on("open", function () {

    console.log("------数据库连接成功！------");

});*/

let studentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        default: ''
    }
});

let studentModel = mongoose.model('student', studentSchema);
let stu1 = new studentModel({
    name: "Ada",
    age: 23,
    email: 'sunnynut77@gmail.com'
});

stu1.save(function(error, doc) {

    if (error) {

        console.log("error :" + error);
    } else {

        console.log(doc);
    }
});
