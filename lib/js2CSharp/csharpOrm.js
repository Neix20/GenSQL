const fs = require("fs");
const path = require("path");

const rgx = /INT|int|VARCHAR|varchar|nvarchar|DECIMAL|decimal|DATETIME|datetime|date/g;

/**
 * Generates Array of Parameters
 * @param {Dictioanry} dict 
 * @returns Array
 */
function valArr(dict) {
    let res = "";

    let arr = Object.keys(dict);
    arr = arr.slice(1);

    let dataTypeDict = {
        "INT": "Nullable<int>",
        "int": "Nullable<int>",
        "DECIMAL": "Nullable<decimal>",
        "decimal": "Nullable<decimal>",
        "VARCHAR": "string",
        "varchar": "string",
        "nvarchar": "string",
        "DATETIME": "Nullable<System.DateTime>",
        "datetime": "Nullable<System.DateTime>",
        "date": "Nullable<System.DateTime>",
    }




    for (let ind in arr) {
        let key = arr[ind];
        let val = dict[key];

        let match = val.match(rgx);

        let dataType = match[0];

        let cDataType = dataTypeDict[dataType];

        arr[ind] = `public ${cDataType} ${key} { get; set; }`;
    }
    res = arr.join("\n");
    return res;
}

function paramFuncArr(dict) {

    let res = []

    let arr = Object.keys(dict);

    let dataTypeDict = {
        "INT": "int",
        "int": "int",
        "DECIMAL": "decimal",
        "decimal": "decimal",
        "VARCHAR": "string",
        "varchar": "string",
        "nvarchar": "string",
        "DATETIME": "DateTime",
        "datetime": "DateTime",
        "date": "DateTime"
    }

    for (let ind in arr) {
        let key = arr[ind];
        let val = dict[key];

        let match = val.match(rgx);

        let dataType = match[0];

        let cDataType = dataTypeDict[dataType];

        arr[ind] = `${cDataType} ${key}`;
    }

    res = arr.join(",\n");
    return res;
}

function genParam(name, dataType) {
    return `
Param = new SqlParameter();
Param.ParameterName = "${name}";
Param.SqlDbType = SqlDbType.${dataType};
Param.Direction = ParameterDirection.Input;
Param.Value = ${name};
command.Parameters.Add(Param);`;
}

function genParamStr(dict) {
    let res = []

    let arr = Object.keys(dict);

    let dataTypeDict = {
        "INT": "Int",
        "int": "Int",
        "DECIMAL": "Decimal",
        "decimal": "Decimal",
        "VARCHAR": "VarChar",
        "nvarchar": "VarChar",
        "DATETIME": "DateTime",
        "datetime": "DateTime",
        "date": "DateTime"
    }

    for (let ind in arr) {
        let key = arr[ind];
        let val = dict[key];

        let match = val.match(rgx);

        let dataType = match[0];

        let cDataType = dataTypeDict[dataType];

        arr[ind] = genParam(key, cDataType);
    }

    res = arr.join("\n");
    return res;
}

function genDataTblBool(tableName, dict, func_type) {
    let paramFunc = paramFuncArr(dict)
    let paramStr = genParamStr(dict);
    return `public static bool ${func_type}${tableName}(
            ${paramFunc}
        )
        {
            try
            {
                using (SqlConnection Conn = new SqlConnection(clsConst.SysDBConnString()))
                {
                    Conn.Open();
                    using (SqlCommand command = new SqlCommand("NSP_${tableName}_${func_type}", Conn))
                    {
                        SqlParameter Param = new SqlParameter();
                        command.CommandType = CommandType.StoredProcedure;
                        ${paramStr}

                        command.ExecuteNonQuery();
                        command.Dispose();
                    }
                    return true;
                }
            }
            catch (SqlException ex)
            {
                clsLogger.ErrorLog(fstrPageName, ex);
            }
            return false;
        }`;
}

function genDataTbl(tableName, dict, func_type) {
    let paramFunc = paramFuncArr(dict)
    let paramStr = genParamStr(dict);
    return `public static DataTable ${func_type}Dt(
            ${paramFunc}
        )
        {
            DataTable result = null;

            try
            {
                result = new DataTable();

                using (SqlConnection Conn = new SqlConnection(clsConst.SysDBConnString()))
                {
                    Conn.Open();
                    using (SqlCommand command = new SqlCommand("NSP_${tableName}_${func_type}", Conn))
                    {
                        SqlParameter Param = new SqlParameter();
                        command.CommandType = CommandType.StoredProcedure;
                        ${paramStr}

                        SqlDataReader SQLReader = command.ExecuteReader();
                        result.Load(SQLReader);
                        SQLReader.Close();
                        SQLReader = null;
                    }
                }
            }
            catch (SqlException ex)
            {
                clsLogger.ErrorLog(fstrPageName, ex);
            }
            return result;
        }`;
}

function listParam(dict) {
    let res = []

    let arr = Object.keys(dict);


    let dataTypeDict = {

        "INT": "clsCommon.ToInt",
        "int": "clsCommon.ToInt",
        "DECIMAL": "clsCommon.ToDecimal",
        "decimal": "clsCommon.ToDecimal",
        "VARCHAR": "clsCommon.ToStr",
        "nvarchar": "clsCommon.ToStr",
        "DATETIME": "clsCommon.ToDateTime",
        "datetime": "clsCommon.ToDateTime",
        "date": "clsCommon.ToDateTime"

    }

    for (let ind in arr) {
        let key = arr[ind];
        let val = dict[key];

        let match = val.match(rgx);

        let dataType = match[0];

        let cDataType = dataTypeDict[dataType];

        arr[ind] = `item.${key} = ${cDataType}(row["${key}"]);`;
    }

    res = arr.join("\n");
    return res;
}

function genDtRowToObj(tableName, dict) {
    return `public static TTransaction ConvertDtRowToObj(DataRow row)
        {
            ${tableName} item = new ${tableName}();
            try
            {
                ${listParam(dict)}
            }
            catch (Exception ex)
            {
                clsLogger.ErrorLog(fstrPageName, ex);
            }
            return item;
        }`
}

function genList(tableName) {
    return `public static List<${tableName}> SelectAllList(int id)
        {
            List<${tableName}> resList = new List<${tableName}>();
            DataTable dt = SelectAllDt(id);
            foreach (DataRow row in dt.Rows)
            {
                ${tableName} item = ConvertDtRowToObj(row);
                resList.Add(item);
            }
            return resList;
        }`;
}

/**
 * Generate A New Csharp Class
 * @param {String} namespace 
 * @param {String} tableName 
 * @param {Dictionary} dict 
 * @returns String
 */
function genCSharpStr(project, dir, tableName, dict) {
    let namespace = `${project}.${dir}`;
    let pk_str = Object.keys(dict)[0];
    let res = `using System;
using Newtonsoft.Json;

namespace ${namespace}
{
    public partial class ${tableName}
    {
        public int ${pk_str} { get; set; }
        ${valArr(dict)
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}`;
    return res;
}

function genCSharpStrFunction(project, dir, tableName, dict) {
    let namespace = `${project}.${dir}`;
    let insertDict = {};

    for (let key of Object.keys(dict).slice(1)) {
        insertDict[key] = dict[key];
    }

    let updateDict = dict;
    let deleteDict = { "id": "INT" };
    let selectAllDict = { "id": "INT" };
    let res = `using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using ${project}.Utility;

namespace ${namespace}
{
    public partial class ${tableName}
    {
        static string fstrPageName = "${tableName}";

        // Convert To Obj
        ${genDtRowToObj(tableName, dict)}

        // List
        ${genList(tableName)}

        // Select All
        ${genDataTbl(tableName, selectAllDict, "SelectAll")}

        // Insert
        ${genDataTblBool(tableName, insertDict, "Insert")}

        // Update
        ${genDataTblBool(tableName, updateDict, "Update")}

        // Delete
        ${genDataTblBool(tableName, deleteDict, "Delete")}
    }
}`;
    return res;
}

function genCSharpStrFunctionCustom(project, dir, tableName, dict) {
    let namespace = `${project}.${dir}`;
    let insertDict = {};

    for (let key of Object.keys(dict).slice(1)) {
        insertDict[key] = dict[key];
    }

    let updateDict = dict;
    let deleteDict = { "id": "INT" };
    let selectAllDict = { "id": "INT" };
    let res = `using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using ${project}.Utility;

namespace ${namespace}
{
    public partial class ${tableName}
    {
        static string fstrPageName = "${tableName}";

        // Convert To Obj
        ${genDtRowToObj(tableName, dict)}

        // List
        ${genList(tableName)}

    }
}`;
    return res;
}

const OUTPUT_DIR = path.join("output", "cs");

function genCSharpFile(project, dir, tableName, dict) {
    let res = "";
    let filePath = "";

    res = genCSharpStr(project, dir, tableName, dict);
    filePath = path.join(OUTPUT_DIR, `${tableName}.cs`);

    fs.writeFileSync(filePath, res);

    console.log(`Successfully Generated ${filePath}!`);

    // res = genCSharpStrFunction(project, dir, tableName, dict);
    res = genCSharpStrFunctionCustom(project, dir, tableName, dict);
    filePath = path.join(OUTPUT_DIR, `${tableName}_cus_neix.cs`);

    fs.writeFileSync(filePath, res);

    console.log(`Successfully Generated ${filePath}!`);
}

module.exports = {
    genCSharpFile
}