// 使用之前 需要先运行 cnpm install mysql

const mysql = require('mysql');
const fs = require('fs');

const connetion = mysql.createConnection({
    host: '192.168.66.206',
    port: 3306,
    database: 'test',
    user: 'root',
    password: 'root@mysql'
});

connetion.connect(err => {

    if (err) {

        console.log('与test数据库建立连接失败');
    } else {

        console.log('与test数据库建立连接成功');

        connetion.query('insert into contact SET ?', {name: "Lulu", age: 44}, (err, results) => {

            console.log('给test数据库contact表插入一条数据');
            console.log(err || results);
        });

        /*connetion.query('select * from contact', (err, results) => {

            console.log('查看test数据库contact表内容');
            console.log(err || results);
        });*/
        let file = fs.createWriteStream('./contact.txt');
        let query = connetion.query('select * from contact');
        query.on('fields', fields => {

            fields.forEach(field => {

                file.write(field.name + " ");
            });
            file.write('\r\n');
        }).on('result', row => {

            connetion.pause();
            file.write(`${row.id} ${row.name} ${row.age} ${row.phoneNumber} \r\n`);
            connetion.resume();
        }).on('end', () => {

            connetion.end();
            file.close();
            console.log('数据全部写入完毕');
        });
    }
});

