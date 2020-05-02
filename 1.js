const fs = require("fs")

const fileDir = './text/source'

fs.watch(fileDir, (ev, file) => {

    //只要有一个文件发生变化，我们就需要对这个文件夹下的所有文件进行读取，然后合并
    fs.readdir(fileDir, (err, dataList) => {
        let arr = [];
        dataList.forEach((f) => {
            let info = fs.statSync(fileDir + '/' + f)
            console.log(info)
        })

    })
})


const dns = require('dns');

dns.lookup('example.org', (err, address, family) => {
    console.log('地址: %j 地址族: IPv%s', address, family);
});