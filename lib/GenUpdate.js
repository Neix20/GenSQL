/**
 * Update Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function updateName(table_name) {
    return `NSP_${table_name}_Update`;
}

/**
 * Generates String for Procedure parameters
 * @param {Array} arr 
 * @returns {String}
 */
function paramArr(arr) {
    return arr.map(tmp_str => {
        let tmp_arr = tmp_str.split(" ");
        return `@${tmp_arr[0]} as ${tmp_arr[1]}`
    }).join(", ");
}

/**
 * Generates String for Update Procedure Values Statement
 * @param {Array} arr 
 * @returns {String}
 */
function updateValArr(arr) {
    return arr.slice(1).map(x => x.split(" ")[0]).map(x => `[${x}] = @${x}`).join(", ");
}

/**
 * Update Procedure
 * @param {String} table_name 
 * @param {Array} arr 
 * @returns {String}
 */
function genUpdate(table_name, arr) {
    let pk_str = arr[0].split(" ")[0];
    return `If exists (Select * from sysobjects where ID = Object_id('${updateName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${updateName(table_name)}
    go
    Create Procedure ${updateName(table_name)}
    ( ${paramArr(arr)} )
    as
    Update [${table_name}] 
    Set ${updateValArr(arr)}
    \nWhere 1=1
    And [${pk_str}] = @${pk_str}
    go`;
}

module.exports = {
    genUpdate
}