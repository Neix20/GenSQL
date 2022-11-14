/**
 * Select All Procedure Name
 * @param {String} table_name 
 * @returns {String}
 */
 function selectAllName(table_name) {
    return `NSP_${table_name}_SelectAll`;
}

/**
 * Select All Primary Key Procedure
 * @param {String} table_name 
 * @param {Array} arr 
 * @returns {String}
 */
function genSelectAll(table_name, arr) {
    let pk_str = arr[0].split(" ")[0], data_type = arr[0].split(" ")[1];

    return `If exists (Select * from sysobjects where ID = Object_id('${selectAllName(table_name)}') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
    drop procedure ${selectAllName(table_name)}
    go
    Create Procedure ${selectAllName(table_name)}
    ( @${pk_str} as ${data_type} )
    as
        Select * 
        From [${table_name}] with (nolock)
        Where 1=1 
        and case when @${pk_str} = -1 then @${pk_str} else [${pk_str}] end = @${pk_str} 
        Order by [${pk_str}]
    go`;
}

module.exports = {
    genSelectAll,
}