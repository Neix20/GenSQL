const fs = require("fs");
const path = require("path");

const rgx = /INT|int|VARCHAR|varchar|nvarchar|NVARCHAR|DECIMAL|decimal|DATETIME|datetime|date/g;

function deInt(name) {
    return `// ${name}
settings.Columns.Add(col =>
{
    col.FieldName = "${name}";
    col.Caption = "${name}";
        
    col.ColumnType = MVCxGridViewColumnType.SpinEdit;
    SpinEditProperties prop = col.PropertiesEdit as SpinEditProperties;
    prop.NumberType = SpinEditNumberType.Integer;
    prop.MinValue = 0;
    prop.MaxValue = 10000000;
    prop.DisplayFormatString = "N0";
});`
}

function deDecimal(name) {
    return `// ${name}
settings.Columns.Add(col =>
{
    col.FieldName = "${name}";
    col.Caption = "${name}";
        
    col.ColumnType = MVCxGridViewColumnType.SpinEdit;
    SpinEditProperties prop = col.PropertiesEdit as SpinEditProperties;
    prop.NumberType = SpinEditNumberType.Float;
    prop.MinValue = 0;
    prop.MaxValue = 10000000;
    prop.Increment = 0.1M;
    prop.DisplayFormatString = "N2";
});`
}

function deString(name) {
    return `// ${name}
settings.Columns.Add(col =>
{
    col.FieldName = "${name}";
    col.Caption = "${name}";
});`
}


function deDateTime(name) {
    return `// ${name}
settings.Columns.Add(col =>
{
    col.FieldName = "${name}";
    col.Caption = "${name}";
    
    col.ColumnType = MVCxGridViewColumnType.DateEdit;
    col.PropertiesEdit.DisplayFormatString = "yyyy-MM-dd";
    
    DateEditProperties prop = col.PropertiesEdit as DateEditProperties;
    prop.DisplayFormatString = "yyyy-MM-dd";
    prop.DisplayFormatInEditMode = true;
});`
}

function genDevExpressCsHtml(dict) {
    let res = "";

    let arr = Object.keys(dict);

    let dataTypeDict = {
        "INT": deInt,
        "int": deInt,
        "DECIMAL": deDecimal,
        "decimal": deDecimal,
        "VARCHAR": deString,
        "varchar": deString,
        "nvarchar": deString,
        "NVARCHAR": deString,
        "DATETIME": deDateTime,
        "datetime": deDateTime,
        "date": deDateTime,
    }

    for (let ind in arr) {
        let key = arr[ind];
        let val = dict[key];

        let match = val.match(rgx);

        let dataType = match[0];

        let cFunc = dataTypeDict[dataType];

        arr[ind] = cFunc(key);
    }
    res = arr.join("\n");
    return res;
}

module.exports = {
    genDevExpressCsHtml
}