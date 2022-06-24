require("dotenv").config();

const express = require("express");
const app = express();
const multer = require("multer");
const upload = multer({dest: "tmp-uploads"});


app.set("view engine", "ejs")

// Top-level middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

// middleware: 中介軟體 (function)
// const bodyParser = express.urlencoded({extended: false});
app.post('/try-post', (req, res)=>{
    res.json(req.body);
});


app.route('/try-post-form')
    .get((req, res)=>{
        res.render('try-post-form');
    })
    .post((req, res)=>{
        const {email, password} = req.body;
        res.render('try-post-form', {email, password});
    });



app.use(express.static("public"));
app.use("/bootstrap", express.static("node_modules/bootstrap/dist/"));
// http://localhost:3600/bootstrap/css/bootstrap.css


app.get("/", function (req, res){
    // res.send(`<h2>泥11好</h2>
    // <img src="/imgs/cat.jpg" alt="" width="500">`);
    res.render("main", {name: 00000000});  //會把值帶到main.ejs的name (很像PHP)
});

app.get("/a.html", function (req, res){
    res.send(`<h2>！！！！！！！</h2><img src="/imgs/cake.jpg" alt="" width="500">`);
});
// ----------------404-------------------
app.use( function (req, res){
    res.send(`<h2>找不到頁面QQ 404</h2>`);
});


app.listen(process.env.PORT, ()=> {
    console.log(`server started: ${process.env.PORT}`);
    console.log({NODE_ENV: process.env.NODE_ENV });
    
})