/**
 * Delete Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function deleteName(table_name) {
    return `NSP_${table_name}_Delete`;
}

/**
 * Delete Procedure
 * @param {String} table_name 
 * @param {Array} arr 
 * @returns {String}
 */
function genDelete(table_name, arr) {
    let pk_str = arr[0].split(" ")[0], data_type = arr[0].split(" ")[1];

    return `If exists (Select * from sysobjects where ID = Object_id('${deleteName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${deleteName(table_name)}
    go
    Create Procedure ${deleteName(table_name)}
    ( @${pk_str} as ${data_type} )
    as
    Delete [${table_name}]
    Where 1=1
    And [${pk_str}] = @${pk_str}
    go`;
}

module.exports = {
    genDelete
}