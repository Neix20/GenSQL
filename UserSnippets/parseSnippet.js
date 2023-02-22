let str = `
remark VARCHAR(100),
status VARCHAR(100),
created_by VARCHAR(100),
created_date DATETIME,
last_updated_by VARCHAR(100),
last_updated_date DATETIME,
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
