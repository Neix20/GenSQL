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

const cSharpOrm = require("./csharpOrm");
module.exports = {
    ...cSharpOrm,
}

const devExpressGen = require("./devExpressGen");
module.exports = {
    ...devExpressGen
}