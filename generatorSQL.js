const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/js2Sql");
const { genInsert, genDelete, genUpdate } = require("./lib/js2Sql");

// Generate Sql Statement String
const path = require("path");
let fileNameDir = path.join(__dirname, 'models');

// Glob When Given Directory
let fileNameArr = ["tmp"];
fileNameArr = fileNameArr
.map(x => `${x}.sql`)
.map(x => path.join("models", x));

const sql_js_str = genSqlStrArr(fileNameArr);

const sql_dict = genSqlDict(sql_js_str);

const table_arr = sql_js_str.match(/CREATE TABLE (.|\n)+?\);/g);

const func_arr = [genInsert, genUpdate, genDelete];
const comment_arr = ["Insert New Record", "Update Existing Record", "Delete Record"].map(x => `Stored Procedure: ${x}`);

for(let ind in table_arr) {

    let table_stmt = table_arr[ind];
    console.log(table_stmt);

    let tableName = Object.keys(sql_dict);
    let tableDict = sql_dict[tableName];

    for(let fInd in func_arr) {
        let func = func_arr[fInd];

        // Comment Before Each procedure
        console.log(`\n-- ${comment_arr[fInd]}`)

        let str = func(tableName, tableDict);

        // Remove Tab Spaces
        console.log(str.replace(/\n[ ]{4,}/g, "\n"));
    }
}