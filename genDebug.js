let str = `customerName
customerPhone
customerAddress`;

function caps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

let arr = str.split("\n");

arr = arr.map(x => `${caps(x)}: {${x}}`);

console.log(`Console.WriteLine($"${arr.join("\\n")}");`);