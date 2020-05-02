const http = require('http');
const fs = require("fs");
const url = require("url");
const mysql = require("mysql");
const io = require('socket.io');
// const regs = require('./libs/regs')

// 数据库连接
let db = mysql.createPool({ host: 'localhost', user: 'root', password: '123456', port: '3306', database: '20200305' });



// 1. http服务
const httpServer = http.createServer((req, res) => {
    let { pathname, query } = url.parse(req.url, true)
    fs.readFile(`www${pathname}`, (err, data) => {
            if (err) {
                res.writeHead("404");
                res.write("not found");
            } else {
                res.write(data)
            }
            res.end();
        })
        // db.getConnection((err, connection) => {
        // if (err) {
        //     throw err
        // }
        // let { pathname, query } = url.parse(req.url, true)
        // if (pathname == '/reg') {
        //     let { user, pass } = query;
        //     //1.校验数据
        //     if (!/^\w{6,32}$/.test(user)) {
        //         res.write(JSON.stringify({ code: 1, msg: '用户名不合符规范' }))
        //         res.end();
        //     } else if (!/^.{6,32}$/.test(pass)) {
        //         res.write(JSON.stringify({ code: 1, msg: '密码不合符规范' }))
        //         res.end();
        //     } else {
        //         // 2、校验用户名是否重复
        //         db.query(`SELECT ID FROM user_table WHERE username='${user}'`, (err, data) => {
        //             if (err) {
        //                 console.log(err)
        //                 res.write(JSON.stringify({ code: 1, msg: '数据库错误' }))
        //                 res.end();
        //             } else if (data.length > 0) {
        //                 res.write(JSON.stringify({ code: 1, msg: '此用户已存在' }))
        //                 res.end();
        //             } else {
        //                 // 3、插入
        //                 db.query(`INSERT INTO user_table (username,password,online) VALUES('${user}', '${pass}',0)`, (err) => {
        //                     if (err) {
        //                         console.log(err)
        //                         res.write(JSON.stringify({ code: 1, msg: '数据库错误' }))
        //                         res.end();
        //                     } else {
        //                         res.write(JSON.stringify({ code: 0, msg: '注册成功' }))
        //                         res.end();
        //                     }
        //                 })
        //             }
        //         })
        //     }
        // } else if (pathname == '/login') {
        //     // 登录接口
        //     let { user, pass } = query;
        //     // 1、校验数据
        //     if (!/^\w{6,32}$/.test(user)) {
        //         res.write(JSON.stringify({ code: 1, msg: '用户名不合符规范' }))
        //         res.end();
        //     } else if (!/^.{6,32}$/.test(pass)) {
        //         res.write(JSON.stringify({ code: 1, msg: '密码不合符规范' }))
        //         res.end();
        //     } else {
        //         //取数据
        //         db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`, (err, data) => {
        //                 if (err) {
        //                     res.write(JSON.stringify({ code: 1, msg: '数据库错误' }));
        //                     res.end()
        //                 } else if (data.length == 0) {
        //                     res.write(JSON.stringify({ code: 1, msg: '此用户不存在' }));
        //                     res.end()
        //                 } else if (data[0].password != pass) {
        //                     res.write(JSON.stringify({ code: 1, msg: '用户名和密码有误' }));
        //                     res.end()
        //                 } else {
        //                     db.query(`UPDATE user_table SET online=1 WHERE ID='${data[0].ID}'`, err => {
        //                         if (err) {
        //                             res.write(JSON.stringify({ code: 1, msg: '数据库错误' }));
        //                             res.end()
        //                         } else {
        //                             res.write(JSON.stringify({ code: 0, msg: '登录成功' }));
        //                             res.end()
        //                         }
        //                     })
        //                 }

    //             })
    //             //

    //     }
    // } else {
    //     fs.readFile(`www${pathname}`, (err, data) => {
    //         if (err) {
    //             res.writeHead("404");
    //             res.write("not found");
    //         } else {
    //             res.write(data)
    //         }
    //         res.end();
    //     })
    // }
    // // })
});
httpServer.listen(8080, () => {
    console.log("服务成功--------------")
});

// 2. ws服务
let aSock = [];
const wsServer = io.listen(httpServer);
wsServer.on('connection', socket => {

    aSock.push(socket)

    let cur_username = '';
    let cur_userId = 0;
    // 注册
    socket.on('reg', (user, pass) => {
            // 校验数据
            if (!/^\w{6,32}$/.test(user)) {
                socket.emit('reg_ret', 1, '用户名不符合规范')
            } else if (!/^.{6,32}$/.test(pass)) {
                socket.emit('reg_ret', 1, '密码不符合规范')
            } else {
                // 用户名是否存在
                db.query(`SELECT ID FROM user_table WHERE username='${user}'`, (err, data) => {
                    if (err) {
                        console.log(err)
                        socket.emit('reg_ret', 1, '数据库错误')
                    } else if (data.length > 0) {
                        socket.emit('reg_ret', 1, '用户名已存在')
                    } else {
                        // 插入
                        db.query(`INSERT INTO user_table (username,password,online) VALUES('${user}','${pass}', 0)`, err => {
                            if (err) {
                                console.log(err)
                                socket.emit('reg_ret', 1, '数据库错误')
                            } else {
                                socket.emit('reg_ret', 0, '注册成功')
                            }
                        })
                    }
                })
            }
        })
        // 登录
    socket.on('login', (user, pass) => {
            // 校验数据
            if (!/^\w{6,32}$/.test(user)) {
                socket.emit('login_ret', 1, '用户名不符合规范')
            } else if (!/^.{6,32}$/.test(pass)) {
                socket.emit('login_ret', 1, '密码不符合规范')
            } else {
                // 取数据
                db.query(`SELECT ID,password FROM user_table WHERE username='${user}'`, (err, data) => {
                    if (err) {
                        console.log(err)
                        socket.emit('login_ret', 1, '数据库错误')
                    } else if (data.length == 0) {
                        socket.emit('login_ret', 1, '此用户不存在')
                    } else if (data[0].password != pass) {
                        socket.emit('login_ret', 1, '用户名和密码有误')
                    } else {
                        // 插入
                        db.query(`UPDATE user_table SET online=1 WHERE ID='${data[0].ID}'`, err => {
                            if (err) {
                                console.log(err)
                                socket.emit('login_ret', 1, '数据库错误')
                            } else {
                                socket.emit('login_ret', 0, '登录成功')
                                cur_username = user;
                                cur_userId = data[0].ID
                            }
                        })
                    }
                })
            }
        })
        // 发言
    socket.on('msg', txt => {
            if (!txt) {
                socket.emit('msg_ret', 1, '消息文本不能为空')
            } else {
                aSock.forEach(item => {
                    if (item == socket) return;
                    item.emit('msg', cur_username, txt)
                })
                socket.emit('msg_ret', 0, '发送成功')
            }
        })
        // 离线
    socket.on('disconnect', () => {
        db.query(`UPDATE user_table SET online=0 WHERE ID='${cur_userId}'`, err => {
            if (err) {
                console.log("数据库有误", err)
            }
            cur_userId = 0;
            cur_username = ''
            aSock = aSock.filter(item => item != socket)
        })
    })
})