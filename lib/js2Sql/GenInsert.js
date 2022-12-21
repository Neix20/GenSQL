/**
 * Insert Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function procName(table_name) {
    return `NSP_${table_name}_Insert`;
}

/**
 * Generates String for Procedure parameters
 * @param {Dictionary} dict 
 * @returns {String}
 */
function paramArr(dict) {
    let res = "";
    let arr = [];
    for(let key in dict) {
        let val = dict[key];
        arr.push(`@${key} as ${val}`);
    }
    res = arr.join(",\n");
    return res;
}

/**
 * Generates String for Procedure Statement
 * @param {Dictionary} dict
 * @returns {String}
 */
function paramStmt(dict) {
    let res = "";
    let arr = Object.keys(dict);
    res = arr.map(var_name => `[${var_name}]`).join(",\n");
    return res;
}

/**
 * Generates String for Procedure Values Statement
 * @param {String} pk_str 
 * @param {String} dict
 * @returns {String}
 */
function valArr(dict) {
    let res = "";
    let arr = Object.keys(dict);
    res = arr.map(var_name => `@${var_name}`).join(",\n");
    return res;
}

/**
 * Insert Procedure
 * @param {String} table_name 
 * @param {Dictionary} Dict 
 * @returns {String}
 */
function genInsert(table_name, dict) {
    return `If exists (Select * from sysobjects where ID = Object_id('${procName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${procName(table_name)}
    go
    Create Procedure ${procName(table_name)}
    (
    ${paramArr(dict)}
    )
    as
    Insert into  [${table_name}]
    (
    ${paramStmt(dict)}
    )
    Values
    (
    ${valArr(dict)}
    )
    go`;
}

module.exports = {
    genInsert,
}