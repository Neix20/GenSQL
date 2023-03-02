const cSharpOrm = require("./lib/js2CSharp");

let dict = {"UserId": "INT",
"Username": "NVARCHAR",
"Password": "NVARCHAR",
"MobileNo": "NVARCHAR",
"Email": "NVARCHAR",
"LastUpdateBy": "NVARCHAR",}

let res = cSharpOrm.genParamStr(dict);

res += "\n";

res += cSharpOrm.paramFuncArr(dict);

const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join("output", "cs");

let file_path = path.join(OUTPUT_DIR, "param.cs");

// Check if File exists
try {
    fs.accessSync(file_path, fs.constants.F_OK);
    fs.unlinkSync(file_path);
} catch (err) {
}

fs.writeFileSync(file_path, res);

console.log(`Successfully write to ${file_path}`);