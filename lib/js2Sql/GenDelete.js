/**
 * Delete Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function procName(table_name) {
    return `NSP_${table_name}_Delete`;
}

/**
 * Delete Procedure
 * @param {String} table_name 
 * @param {Dictionary} dict 
 * @returns {String}
 */
function genDelete(table_name, dict) {
    let pk_str = Object.keys(dict)[0];
    let data_type = dict[pk_str];
    return `If exists (Select * from sysobjects where ID = Object_id('${procName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${procName(table_name)}
    go
    Create Procedure ${procName(table_name)}
    (
    @${pk_str} as ${data_type}
    )
    as
    Delete [${table_name}]
    Where 1=1
    And [${pk_str}] = @${pk_str}
    go`;
}

module.exports = {
    genDelete
}