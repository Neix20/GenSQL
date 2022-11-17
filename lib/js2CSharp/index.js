const { genInsert, genUpdate, genDelete } = require("./efProcedure");

module.exports = {
    genInsert,
    genUpdate,
    genDelete,
}

const SeleniumElemWrapper = require("./seleniumElem");
module.exports = {
    ...SeleniumElemWrapper,
}