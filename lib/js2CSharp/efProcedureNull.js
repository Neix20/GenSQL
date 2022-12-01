function addSpacingBeforeCapital(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
}

function genPropString(prop) {
    return prop.map((x, ind) => (ind > 0) ? `modelItem.${x} = item.${x};` : `modelItem.${x} = item.${x};`).join("\n");
}

function genParameter(tableName, prop) {
    return prop.map(x => `item.${x} = (item.${x} == null) ? "${tableName}_${x}" : item.${x};`).join("\n");
}

function checkLastS(str) {
    return (str.at(-1) === 's') ? str.slice(0, -1) : str;
}

function genInsertNull(tableName, prop) {
    return `
    public static void ${tableName}Insert(TNtl${checkLastS(tableName)} item, string username)
    {
        item.detail_id = null;

        db.NSP_TNtl${tableName}_Insert(${prop.slice(1).map(x => `item.${x}`).join(", ")});
        db.SaveChanges();
    }`.replace(/[ ]{2,}/g, "");
}

function genUpdateNull(tableName, prop) {
    return `
    public static void ${tableName}Update(TNtl${checkLastS(tableName)} item, string username)
    {
        item.detail_id = null;

        db.NSP_TNtl${tableName}_Update(${prop.map(x => `item.${x}`).join(", ")});
        db.SaveChanges();
    }`.replace(/[ ]{2,}/g, "");
}

function genDeleteNull(tableName) {
    return `
    public static void ${tableName}Delete(int id)
    {
        db.NSP_TNtl${tableName}_Delete(id);
        db.SaveChanges();
    }`.replace(/[ ]{2,}/g, "");
}

module.exports = {
    genInsertNull,
    genUpdateNull,
    genDeleteNull,
}