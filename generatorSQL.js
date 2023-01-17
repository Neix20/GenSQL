const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/js2Sql");

const { genSelectAll } = require("./lib/js2Sql");
const { genInsert, genDelete, genUpdate } = require("./lib/js2Sql");

// Generate Sql Statement String
const path = require("path");
let fileNameDir = path.join(__dirname, 'models');

// Glob When Given Directory
let fileNameArr = ["toGen"];
fileNameArr = fileNameArr
.map(x => `${x}.sql`)
.map(x => path.join("models", x));

const sql_js_str = genSqlStrArr(fileNameArr);

const sql_dict = genSqlDict(sql_js_str);

const table_arr = sql_js_str.match(/CREATE TABLE (.|\n)+?\);/g);

const func_arr = [genInsert, genUpdate, genDelete, genSelectAll];
const comment_arr = ["Insert New Record", "Update Existing Record", "Delete Record", "Select All Record"].map(x => `Stored Procedure: ${x}`);

// const func_arr = [genSelectAll];
// const comment_arr = ["Select All Record"].map(val => `Stored Procedure: ${val}`);

let res = "";

for(let ind in table_arr) {
    
    let table_stmt = table_arr[ind];
    
    let tableName = Object.keys(sql_dict)[ind];
    let tableDict = sql_dict[tableName];

    // res += `DROP TABLE IF EXISTS ${tableName};` + "\n";

    // res += table_stmt + "\n";

    for(let fInd in func_arr) {
        let func = func_arr[fInd];

        // Comment Before Each procedure
        res += `\n-- ${comment_arr[fInd]}` + "\n";

        let str = func(tableName, tableDict);

        // Remove Tab Spaces
        res += str.replace(/\n[ ]{4,}/g, "\n") + "\n";
    }

    res += "\n";
}

const fs = require("fs");

const OUTPUT_DIR = path.join("output", "sql");

let file_path = path.join(OUTPUT_DIR, "output.sql");

// Check if File exists
try {
    fs.accessSync(file_path, fs.constants.F_OK);
    fs.unlinkSync(file_path);
} catch (err) {
}

fs.writeFileSync(file_path, res);

console.log(`Successfully write to ${file_path}!`);