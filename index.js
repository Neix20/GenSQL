// Concat SQL Code into Javascript String

const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/GenSQL");

// Generate Sql Statement String
const path = require('path');
let fileNameDir = path.join(__dirname, 'models', 'WindGrab');

// Glob When Given Directory
let fileNameArr = ["odoo_temp_data"];
fileNameArr = fileNameArr.map(x => `${x}.sql`);

const sql_js_str = genSqlStr(fileNameDir, fileNameArr);

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

// Function to generate procedure
const { genSelectAll } = require("./lib/GenSelectAll");
const { genSelectByPk } = require("./lib/GenSelectByPk");
const { genInsert } = require("./lib/GenInsert");
const { genUpdate } = require("./lib/GenUpdate");
const { genDelete } = require("./lib/GenDelete");

// Declare Variables to be used
const sql_dict = genSqlDict(sql_js_str);

const table_arr = sql_js_str.match(/CREATE TABLE (.|\n)+?\);/g);

// const func_arr = [genSelectAll, genSelectByPk, genInsert, genUpdate, genDelete];
// const comment_arr = ["Select All", "Select By PK", "Insert New Record", "Update Existing Record", "Delete Record"].map(x => `Stored Procedure: ${x}`);

const func_arr = [genInsert, genUpdate, genDelete];
const comment_arr = ["Insert New Record", "Update Existing Record", "Delete Record"].map(x => `Stored Procedure: ${x}`);

// Lambda
f = x => {
    return x.split("TNtl")[1].replace(/([a-z])([A-Z])/g, '$1 $2');
};

for (let ind in Object.keys(sql_dict)) {
    let key = Object.keys(sql_dict)[ind];
    let table_stmt = table_arr[ind];
    let table_name = key;
    let arr = sql_dict[table_name];

    // console.log(`${+ind + 1}. ${f(table_name)}`);

    console.log(`DROP TABLE ${table_name};`);

    console.log(table_stmt);

    func_arr.forEach((func, ind) => {

        // Comment Before Each procedure
        console.log(`\n-- ${comment_arr[ind]}`)

        let str = func(table_name, arr);

        // Remove Tab Spaces
        console.log(str.replace(/\n[ ]{4,}/g, "\n"));
    });

    console.log();

    // console.log(`DELETE FROM dbo.${table_name};`);
}
