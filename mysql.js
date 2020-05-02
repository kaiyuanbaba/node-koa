const mysql = require("mysql");

// 链接池
let db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', database: '20200305' });
// let db = mysql.createConnection({ host: 'localhost', user: 'root', password: '123456', database: '20171113' });

// 查询
db.query("SELECT * FORM user_table", (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(JOSN.stringify(data))
    }
})
console.log(db)