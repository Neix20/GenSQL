const fs = require("fs");
const path = require("path");

/**
 * Generates Array of Parameters
 * @param {Dictioanry} dict 
 * @returns Array
 */
function valArr(dict) {
    let res = "";
    let arr = Object.keys(dict);
    arr = arr.slice(1);

    let rgx = /INT|VARCHAR|DECIMAL|DATETIME/g;

    let dataTypeDict = {
        "INT": "Nullable<int>",
        "DECIMAL": "Nullable<decimal>",
        "VARCHAR": "string",
        "DATETIME": "Nullable<System.DateTime>"
    }

    for(let ind in arr) {
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

/**
 * Generate A New Csharp Class
 * @param {String} namespace 
 * @param {String} tableName 
 * @param {Dictionary} dict 
 * @returns String
 */
function genCSharpStr(namespace, tableName, dict) {
    let pk_str = Object.keys(dict)[0];
    let res = `using System;
using Newtonsoft.Json;

namespace ${namespace}
{
    public partial class ${tableName}
    {
        public int ${pk_str} { get; set; }
        ${
        valArr(dict)
        }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}`;
    return res;
}

function genCSharpStrEmpty(namespace, tableName) {
    let res = `using System;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;

namespace ${namespace}
{
    public partial class ${tableName}
    {
        static string fstrPageName = "${tableName}";


    }
}`;
    return res;
}

function genCSharpFile(namespace, tableName, dict) {
    let res = "";
    let filePath = "";
    
    res = genCSharpStr(namespace, tableName, dict);
    filePath = path.join("output", `${tableName}.cs`);

    fs.writeFileSync(filePath, res);

    console.log(`Successfully Generated ${filePath}!`);

    res = genCSharpStrEmpty(namespace, tableName);
    filePath = path.join("output", `${tableName}_cus_neix.cs`);

    fs.writeFileSync(filePath, res);

    console.log(`Successfully Generated ${filePath}!`);
}

module.exports = {
    genCSharpFile
}