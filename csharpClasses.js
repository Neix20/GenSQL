const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/js2Sql");
const { genInsert, genDelete, genUpdate } = require("./lib/js2Sql");

const cSharpOrm = require("./lib/js2CSharp");

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

// let namespace = "NtlSystemPortal.Models";
let project = "NtlSystemPortal";
let dir = "Models";

for (let tableName in sql_dict) {

    let dict = sql_dict[tableName];

    cSharpOrm.genCSharpFile(project, dir, tableName, dict);
}