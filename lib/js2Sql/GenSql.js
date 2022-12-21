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
    let  res = "";
    res = readDirArr(fileNameDir).map(fileName => readFile(path.join(fileNameDir, fileName)));
    res = res.join("");
    res = res.replace(/\r/g, "");
    return res;
}

function genSqlStrArr(arr){
    let res = "";
    res = arr.map(fileName => readFile(fileName));
    res = res.join("");
    res = res.replace(/\r/g, "");
    return res;
}

/**
 * Generates SQL Dictonary
 * @param {String} str 
 * @returns {Object}
 */
function genSqlDict(str) {
    str = str
    .replace(/dbo\.(.*?)\(/g, "$1(")
    .replace(/DECIMAL\((\d+), (\d+)\)/g, "DECIMAL($1,$2)")
    .replace(/IDENTITY\(1, 1\)/g, "IDENTITY(1,1)");

    let dict = {};

    let rgx = "";

    // 1. Split Into Respective Tables
    let arr = str.match(/CREATE TABLE (.|\n)+?\);/g);

    // 2. Split SQL Structure
    for(let tbl of arr) {
        
        // Replace All Whitespace Characters in Table
        tbl = tbl.replace(/[ ][2, ]/g, "");

        // Get Table Name
        rgx = /CREATE TABLE (.*)\(((.|\n)*?)\);/g;

        let tblName = tbl.replace(rgx, "$1");

        let tblBody = tbl.replace(rgx, "$2");

        // Remove First 2 Lines and First 4 Lines
        tblBody = tblBody.split("\n").slice(1, -2);

        let paramDict = {};

        for(let param of tblBody) {
            let paramArr = param.split(" ");

            let key = paramArr[0];
            let val = paramArr[1];

            val = val.replace(/,/g, "");
            
            paramDict[key] = val;
        }

        dict[tblName] = paramDict;
    }

    return dict;
}

module.exports = {
    genSqlStr,
    genSqlStrArr,
    genSqlDict,
}