/**
 * Update Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function procName(table_name) {
    return `NSP_${table_name}_Update`;
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
 * Generates String for Update Procedure Values Statement
 * @param {Array} dict 
 * @returns {String}
 */
function valArr(dict) {
    let res = "";
    let arr = Object.keys(dict);
    arr = arr.slice(1);
    res = arr.map(var_name => `[${var_name}] = @${var_name}`).join(",\n");
    return res;
}

/**
 * Update Procedure
 * @param {String} table_name 
 * @param {Dictionary} dict 
 * @returns {String}
 */
function genUpdate(table_name, dict) {
    let pk_str = Object.keys(dict)[0];
    return `If exists (Select * from sysobjects where ID = Object_id('${procName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${procName(table_name)}
    go
    Create Procedure ${procName(table_name)}
    (
    ${paramArr(dict)}
    )
    as
    Update [${table_name}] 
    Set ${
    valArr(dict)
    }
    Where 1=1
    And [${pk_str}] = @${pk_str}
    go`;
}

module.exports = {
    genUpdate
}