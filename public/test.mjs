import t, {f, f3, q} from "./func01.mjs";  //要附檔名不然會跳錯   要顯示要打在這邊喔
// const {f:a, f3: a3} = require("./func01");
import t2, * as t3 from "./func01.mjs";


console.log(f(10));
console.log(t);
console.log(q);
// console.log(a3(4));
// console.log(f3 === a3 );

console.log(t3.f3(5));