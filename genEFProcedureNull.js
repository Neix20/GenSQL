const { genInsertNull, genUpdateNull, genDeleteNull } = require("./lib/js2CSharp/efProcedureNull");

// Concat SQL Code into Javascript String

const { genSqlStr, genSqlStrArr, genSqlDict } = require("./lib/js2Sql/GenSQL");

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

    console.log(genInsertNull(tableName, prop));
    console.log(genUpdateNull(tableName, prop));
    console.log(genDeleteNull(tableName));
}