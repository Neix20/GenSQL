// Concat SQL Code into Javascript String

const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/js2Sql");

// Function to generate procedure
const { genSelectAll, genSelectByPk } = require("./lib/js2Sql");
const { genInsert, genDelete, genUpdate } = require("./lib/js2Sql");

// Generate Sql Statement String
const path = require("path");
let fileNameDir = path.join(__dirname, 'models');

// Glob When Given Directory
let fileNameArr = ["tmp"];
fileNameArr = fileNameArr
.map(x => `${x}.sql`)
.map(x => path.join("models", x));

const sql_js_str = genSqlStrArr(fileNameDir, fileNameArr);

// const sql_js_str = `
// -- Permission Table
// DROP TABLE dbo.TNtlPermission;

// CREATE TABLE dbo.TNtlPermission(
//     id INT IDENTITY(1, 1) not null,
//     name VARCHAR(100),
//     link VARCHAR(100),
//     CONSTRAINT permission_id_pk PRIMARY KEY (id)
// );
// `
// .replace(/DECIMAL\(10, (\d)\)/g, "DECIMAL(10,$1)")
// .replace(/IDENTITY\(1, 1\)/g, "IDENTITY(1,1)");

// Declare Variables to be used
const sql_dict = genSqlDict(sql_js_str);

const table_arr = sql_js_str.match(/CREATE TABLE (.|\n)+?\);/g);

// const func_arr = [genSelectAll, genSelectByPk, genInsert, genUpdate, genDelete];
// const comment_arr = ["Select All", "Select By PK", "Insert New Record", "Update Existing Record", "Delete Record"].map(x => `Stored Procedure: ${x}`);

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
