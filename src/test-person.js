const person = require(__dirname + "./person");


const p1 = new person("Bill", 20);
const p2 = new person("David");

console.log(p1);
console.log("" + p1);
console.log(JSON.stringify(p2, null, 4));
