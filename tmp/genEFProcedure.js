const { genInsert, genUpdate, genDelete } = require("./lib/js2CSharp/efProcedure");

// Concat SQL Code into Javascript String

const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/js2Sql");

// Generate Sql Statement String
const path = require('path');
let fileNameDir = path.join(__dirname, 'models');

// Glob When Given Directory
let fileNameArr = ["toGen"];
fileNameArr = fileNameArr.map(x => `${x}.sql`);

const sql_js_str = genSqlStrArr(fileNameDir, fileNameArr);

const sql_js_dict = genSqlDict(sql_js_str);

for (let tableName in sql_js_dict) {
    const body = sql_js_dict[tableName];

    const prop = body.map(x => x.split(" ")[0]);

    tableName = tableName.slice(4);

    console.log(genInsert(tableName, prop));
    console.log(genUpdate(tableName, prop));
    console.log(genDelete(tableName));
}