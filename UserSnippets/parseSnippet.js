let str = `
// Setting Detail Grid
settings.SettingsDetail.AllowOnlyOneMasterRowExpanded = false;
settings.SettingsDetail.ShowDetailRow = true;

settings.SetDetailRowTemplateContent(c =>
{
    Html.RenderAction("ProductComponentGridViewPartial", "ProductComponent", new { product_id = DataBinder.Eval(c.DataItem, "id") });
});
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
