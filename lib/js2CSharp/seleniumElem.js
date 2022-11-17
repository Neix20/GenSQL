function genElem(attr, css) {
    return `string ${attr} = "";
IWebElement ${attr}Elem = GetElement("${attr}", ${css});
if (${attr}Elem != null) {
    ${attr} = ${attr}Elem.Text;

    // Remove Whitespace
    ${attr} = ${attr}.Trim();
    ${attr} = Regex.Replace(${attr}, @"\\s+", " ");
}
`;
}

function genDict(dictVar, dict) {
    let res = "";
    for(let key in dict) {
        let obj = dict[key];
        let {attr, css} = obj;
        res += `${dictVar}["${key}"] = ${attr};\n`;
    }
    console.log(res);
}

function genSeleniumElem(dict) {
    Object.values(dict).map(obj => {
        let {attr, css} = obj;
        console.log(genElem(attr, css));
    });
}

function genSeleniumElemDebug(dict) {
    Object.values(dict).map(obj => {
        let {attr, css} = obj;
        console.log(genElem(attr, css));
    });

    let debugArr = [];

    for (let key in dict) {
        let obj = dict[key];
        let {attr, css} = obj;

        debugArr.push(`${key}: {${attr}}`);
    }

    console.log(`Console.WriteLine($"${debugArr.join(", ")}");`);
}

module.exports = {
    genSeleniumElem,
    genSeleniumElemDebug,
    genDict,
}