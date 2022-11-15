/**
 * Select By Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function selectByPkName(table_name) {
    return `NSP_${table_name}_SelectByPK`;
}

/**
 * Select By Primary Key Procedure
 * @param {String} table_name 
 * @param {Array} arr 
 * @returns {String}
 */
function genSelectByPk(table_name, arr) {

    let pk_str = arr[0].split(" ")[0], data_type = arr[0].split(" ")[1];

    return `If exists (Select * from sysobjects where ID = Object_id('${selectByPkName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${selectByPkName(table_name)}
    go
    Create Procedure ${selectByPkName(table_name)}
    ( @${pk_str} as ${data_type} )
    as
        Select * 
        From [${table_name}] with (nolock)
        Where 1=1
        And [${pk_str}] = @${pk_str}
    go`;
}

module.exports = {
    genSelectByPk,
}