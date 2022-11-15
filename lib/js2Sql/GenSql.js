const fs = require('fs');
const path = require('path');

/**
 * List all Files in Directory
 * @param {String} fileNameDir
 * @returns {Array}
 */
function readDirArr(fileNameDir) {
    return fs.readdirSync(fileNameDir);
}

/**
 * Reads File and Convert Data into a String
 * @param {String} fileNameDir 
 * @returns {String}
 */
function readFile(fileNameDir) {
    return fs.readFileSync(fileNameDir, 'utf8');
}

/**
 * Stores all Data in SQL File and Concat into a very Large String
 * @param {String} fileNameDir 
 * @returns {String}
 */
function genSqlStr(fileNameDir) {
    const final_str_arr = readDirArr(fileNameDir).map(fileName => readFile(path.join(fileNameDir, fileName)));
    return final_str_arr.join("\r\n")
    .split("\r\n")
    .join("\n")
    .replace(/DECIMAL\(10, (\d)\)/g, "DECIMAL(10,$1)")
    .replace(/IDENTITY\(1, 1\)/g, "IDENTITY(1,1)");
}

function genSqlStrArr(fileNameDir, arr){
    const final_str_arr = arr.map(fileName => readFile(path.join(fileNameDir, fileName)));
    return final_str_arr.join("\r\n")
    .split("\r\n")
    .join("\n")
    .replace(/DECIMAL\(10, (\d)\)/g, "DECIMAL(10,$1)")
    .replace(/IDENTITY\(1, 1\)/g, "IDENTITY(1,1)");
}

/**
 * Generates SQL Dictonary
 * @param {String} str 
 * @returns {Object}
 */
 function genSqlDict(str) {
    /**
     * Key => Table Name
     * Value => List of String ({Param_Name} {Param_DataType})
     */
    let final_dict = {};

    // Capture all text within Create Table Script
    let arr = str.match(/CREATE TABLE (.|\n)+?\);/g);

    // Remove Tab Space To only 1 whitespace
    arr = arr.map(x => x.replace(/[ ]+/g, " "));

    arr.forEach(str => {
        let tmp_arr = str.split("\n");

        // Extract Table name from String format `CREATE TABLE dbo.{table_name}`
        let table_name = tmp_arr[0].slice("CREATE TABLE ".length + 4, -1);

        // Retain only Parameter Variables
        // Then, Remove 1st whitespace character and last comma character
        // Then, For Each Parameter, only Retain Parameter Name and Parameter DataType
        let param_arr = tmp_arr.slice(1, -2)
            .map(x => x.slice(1, -1))
            .map(x => x.split(" ").slice(0, 2).join(" "));

        final_dict[table_name] = param_arr;
    });

    return final_dict;
}

module.exports = {
    genSqlStr,
    genSqlStrArr,
    genSqlDict,
}