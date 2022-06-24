const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res)=> {
    fs.writeFile(
        __dirname + "/../data/header01.txt",
        JSON.stringify(req.headers),
        (err) => {

            if (err) {
                console.log(err);
                res.end("發生錯誤");
            } else {
                res.end("成功了，寫檔完成");
            }
        }
    );
});


server.listen(3000);