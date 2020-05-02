const http = require("http");
const fs = require("fs");

// http.Server
// new http.Server
// http.createServer

// 创建一个客户端（能发http请求）的对象
let client = http.request({
    // tcp
    host: '127.0.0.1',
    port: 80,

    // http
    protocol: 'http:',
    method: 'get',
    path: '/home'
}, res => {
    // let content = '';
    // let content = Buffer.alloc(0)
    res.on("data", data => {
        console.log(data.toString())
            // content += data.toString();
            // content = Buffer.concat([content, data], content.length + data.length)

    })

    // res.on('end', () => {
    //     fs.writeFileSync('./baidu.png', content)
    // })
})

client.write("")
client.end();