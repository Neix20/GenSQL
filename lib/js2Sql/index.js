const { genSqlStr, genSqlStrArr, genSqlDict } = require("./GenSQL");
const { genSelectAll } = require("./GenSelectAll");
const { genSelectByPk } = require("./GenSelectByPk");
const { genInsert } = require("./GenInsert");
const { genUpdate } = require("./GenUpdate");
const { genDelete } = require("./GenDelete");

module.exports = {
    genSqlStr,
    genSqlStrArr,
    genSqlDict,
    genSelectAll,
    genSelectByPk,
    genInsert,
    genUpdate,
    genDelete
}