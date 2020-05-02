const http = require("http");

// http.Server
// new http.Server
// http.createServer

const server = http.createServer();

server.on('request', () => {
    console.log("接收到了请求")
})

server.listen("80", '0.0.0.0')