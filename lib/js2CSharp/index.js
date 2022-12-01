const { genInsert, genUpdate, genDelete } = require("./efProcedure");

module.exports = {
    genInsert,
    genUpdate,
    genDelete,
};

const { genInsertNull, genUpdateNull, genDeleteNull } = require("./efProcedureNull");

module.exports = {
    genInsertNull, 
    genUpdateNull, 
    genDeleteNull
};

const SeleniumElemWrapper = require("./seleniumElem");
module.exports = {
    ...SeleniumElemWrapper,
};