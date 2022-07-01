const db = require(__dirname + '/../modules/mysql-connect');

(async()=>{
    // show databases;
    // use fteam;
    // show tables;
    const [results, fields] = await db.query("SELECT * FROM address_book LIMIT 5");

    console.log(results);
    console.log(fields);
    process.exit();  // 結束行程
})();

