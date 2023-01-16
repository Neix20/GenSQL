let str = `
const { getData, addData, updateData, deleteData } = require("./../firebase-wrapper");

const tblName = "\${tblName}";

async function get\${tblName}() {
    const res = await getData(tblName);
    return res;
}

async function add\${tblName}(obj) {
    await addData(tblName, obj);
}

async function update\${tblName}(obj) {
    await updateData(tblName, obj);
}

async function delete\${tblName}(obj) {
    await deleteData(tblName, obj);
}

module.exports = {
    get\${tblName},
    add\${tblName},
    update\${tblName},
    delete\${tblName},
}
`;

// Split Into Array
let arr = str.split("\n");

// Remove First and Last
arr = arr.slice(1, -1);

// Add Slash Before Each Double Quotes
arr = arr.map(val => {
    let rgx;

    // Remove WhiteSpace
    rgx = /\s[4, ]/g;
    val = val.replace(rgx, " ");

    rgx = /\s[2, ]/g;
    val = val.replace(rgx, "\\t");

    rgx = /"/g;
    val = val.replace(rgx, `\\"`);

    return `"${val}"`;
});

let res = "";

res = `[
${arr.join(",\n")}
]`;

console.log(res);
