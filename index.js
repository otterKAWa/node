require("dotenv").config();

const express = require("express");
const app = express();
const multer = require("multer");
const { propfind } = require("./routes/admins");
// const upload = multer({dest: "tmp-uploads"});
const upload = require(__dirname + "/modules/upload-images");
const session = require("express-session");
const moment = require("moment-timezone");

const db = require(__dirname + "/modules/mysql-connect");
const MysqlStore = require("express-mysql-session")(session);
const sessionStore = new MysqlStore({}, db);  //跟資料庫的sessions有關，沒代到21行就沒東西



app.set("view engine", "ejs")
app.set("case sensitive routing", true); //url區分大小寫

app.use(session ({
    saveUninitialized: false,
    resave: false,
    secret: 'fkhdkflfs43f5d4s3f5ds',
    store: sessionStore,
    cookie: {
        maxAge: 1800000, //20分鐘，單位毫秒
    }
}));

// Top-level middlewares
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use((req, res, next) => {
    res.locals.Hello = "哈囉ㄅ";
    next();
});

app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

app.get('/try-params1/:action/:id', (req, res)=>{
    res.json({code:2, params: req.params});
});

app.get('/try-params1/:action', (req, res)=>{
    res.json({code:2, params: req.params});
});

app.get('/try-params1/:action?/:id?', (req, res)=>{
    res.json({code:2, params: req.params});
});

app.get(/^\/hi\/?/i, (req, res) => {
    res.send({url: req.url});
});

app.get(["/aaa", "/bbb"], (req, res) => {
    res.send({url: req.url, code:"array"});
});

app.get("/try-session", (req, res) => {
    req.session.my_var = req.session.my_var || 0 ;
    req.session.my_var++;
    res.json({
        my_var: req.session.my_var,
        session: req.session
    });
});

app.get('/try-json', (req, res)=>{
    const data = require(__dirname + "/data/data01");
    console.log(data);
    // res.json(data);
    res.locals.rows = data;
    res.render("try-json");
});

app.get('/try-moment', (req, res)=>{
    const fm = "YYYY-MM-DD HH:mm:ss";
    const m1 = moment();
    const m2 = moment("2022-02-28");

    res.json({
        m1: m1.format(fm),
        m1a: m1.tz("Europe/London").format(fm),
        m2: m1.format(fm),
        m2a: m1.tz("Europe/London").format(fm),
    })
});




// app.use('/admins', require(__dirname + '/routes/admins'));
const adminsRouter = require(__dirname + '/routes/admins');
// prefix 前綴路徑
app.use("/admins", adminsRouter);
app.use(adminsRouter);

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

app.post('/try-upload', upload.single('avatar'), (req, res)=>{
    res.json(req.file);
});

app.post('/try-uploads', upload.array('photos'), (req, res)=>{
    res.json(req.files);
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