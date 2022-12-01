let _str = `
-- Create Table For Output
CREATE TABLE [NewList] (
    @InstallationDate DATETIME,
    @SlotNo1 INT,
    @SlotNo2 INT,    
);
`;

// Parse String, Get Variable Name and DataType
function getTable(str) {
    let rgx = "";

    rgx = /(.|\n)*CREATE TABLE (.*)\(((.|\n)*?),\s+CONSTRAINT(.|\n)*/;

    let tableName = str.replace(rgx, "$2");

    let tableParam = str.replace(rgx, "$3");

    // Remove WhiteSpace
    rgx = /\t/g;
    tableParam = tableParam.replace(rgx, "");
    tableParam = tableParam.trim();

    return [tableName, tableParam];
}

// 4 DataTypes
// int, decimal, varchar, DateTime
function genSqlArr(str) {
    let rgx = "";
    let arr = [];

    // Parse String
    arr = str.split("\n");

    rgx = /\[(.*)\] \[(.*)\].*/g;

    arr = arr.map((val) => {

        let title = val.replace(rgx, "$1");
        let dataType = val.replace(rgx, "$2");

        return {
            Title: title,
            DataType: dataType,
        };
    });

    // Sort The Variables by DataType
    // arr = arr.sort((objA, objB) => objA.DataType.localeCompare(objB.DataType));

    return arr;
}

// Function To Return Corresponding Output
function genOutputType(dataType) {
    let dict = {
        "Int": {
            Regex: /int|INT|INTEGER|integer/g,
            Output: "0",
        },
        "Decimal": {
            Regex: /decimal|DECIMAL/g,
            Output: "0"
        },
        "DateTime": {
            Regex: /datetime|DATETIME/g,
            Output: "'2022-08-18T00:00:00'"
        },
        "String": {
            Regex: /nvarchar|varchar|VARCHAR|NVARCHAR/g,
            Output: "''"
        },
    };

    // Loop Through All of The Dict Regex

    for (let key in dict) {
        let val = dict[key];

        const { Regex, Output } = val;

        let arr = dataType.match(Regex);

        if (arr !== null) {
            return Output;
        }
    }

    return "''";
}

function genOutputRes(tableName, sqlArr) {

    const formatArr = (arr) => {
        let res = arr.join(",");
        if (arr.length > 6) {
            let oArr = [];
            for (let i = 0; i < arr.length / 6; i++) {
                let start = 6 * i;
                let end = 6 * (i + 1);
                end = (arr.length < end) ? arr.length : end;
                let tArr = arr.slice(start, end);
                oArr.push(tArr.join(","));
            }
            res = oArr.join(",\n");
        }
        return res;
    }

    let titleArr = sqlArr.map(x => x.Title);

    titleArr = titleArr.map(x => `[${x}]`);

    formatArr(titleArr);

    let dataTypeArr = sqlArr.map(x => x.DataType);

    dataTypeArr = dataTypeArr.map(x => genOutputType(x));

    let template = `
Insert into ${tableName}
(${formatArr(titleArr)})
Values
(${formatArr(dataTypeArr)});
    `;

    return template;
}

// let sqlDict = genSqlDict(_str);

// sqlDict.map(obj => obj.DataType).forEach(val => {
//     console.log(genOutputType(val));
// });

let [tableName, tableParam] = getTable(_str);

let sqlArr = genSqlArr(tableParam);

// Remove ID
sqlArr = sqlArr.slice(1);

let res = genOutputRes(tableName, sqlArr);

console.log(res);