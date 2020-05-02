const http = require("http");

// http.Server
// new http.Server
// http.createServer

const server = http.createServer();

server.on('request', (req, res) => {
    console.log("接收到了请求")
    switch (req.url) {
        case '/':
            res.writeHead('200', 'ok', {
                "Content-Type": 'text/html;charset=utf8'
            })
            res.write("<h1>Index</h1>")
            break;
        case '/home':
            res.writeHead('200', 'ok', {
                "Content-Type": 'text/html;charset=utf8'
            })
            res.write("<h1>Home</h1>")
            break;
        case '/list':
            res.writeHead('200', 'ok', {
                "Content-Type": 'text/html;charset=utf8'
            })
            res.write("<h1>List</h1>")
            break;
        case '/view':
            res.writeHead('200', 'ok', {
                "Content-Type": 'text/html;charset=utf8'
            })
            res.write("<h1>View</h1>")
            break;
        default:
            // res.writeHead('404', http.STATUS_CODES[404], {
            //     "Content-Type": 'text/html;charset=utf8'
            // })

            res.writeHead('301', http.STATUS_CODES[301], {
                "Content-Type": 'text/html;charset=utf8',
                "Location": 'http://www.baidu.com'
            })
            res.write("<h1>页面不存在</h1>")

    }
    res.end()
})

server.listen("80", '0.0.0.0')