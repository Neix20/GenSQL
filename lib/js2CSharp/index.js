function addSpacingBeforeCapital(str) {
    return str.replace(/([A-Z])/g, ' $1').trim();
}

function checkLastS(str) {
    return (str.at(-1) === 's') ? str.slice(0, -1) : str;
}

function genPropString(prop) {
    return prop.map((x, ind) => (ind > 0) ? `modelItem.${x} = item.${x};` : `modelItem.${x} = item.${x};`).join("\n");
}

function genInsert(tableName, prop) {
    return `
    public static void ${tableName}Insert(TNtl${checkLastS(tableName)} item, string username)
    {
        DetailInsert($"${tableName}: {item.${prop[1]}}", "", username, username);
        item.detail_id = GetID("TNtlDetail");

        db.NSP_TNtl${tableName}_Insert(${prop.slice(1).map(x => `item.${x}`).join(", ")});
        db.SaveChanges();
    }`.replace(/[ ]{2,}/g, "");
}

function genUpdate(tableName, prop) {
    return `
    public static void ${tableName}Update(TNtl${checkLastS(tableName)} item, string username)
    {
        var modelItem = db.TNtl${checkLastS(tableName)}s.Find(item.id);

        item.detail_id = (int) modelItem.detail_id;
        TNtlDetail detail = db.TNtlDetails.FirstOrDefault(it => it.id == item.detail_id);
        detail.name = $"${tableName}: {item.${prop[1]}}";

        DetailUpdate(detail.id, detail.name, detail.remark, detail.created_by, detail.created_date, username);

        db.NSP_TNtl${tableName}_Update(${prop.map(x => `item.${x}`).join(", ")});
        db.SaveChanges();
    }`.replace(/[ ]{2,}/g, "");
}

function genDelete(tableName) {
    return `
    public static void ${tableName}Delete(int id)
    {
        var modelItem = db.TNtl${checkLastS(tableName)}s.Find(id);

        int detail_id = (int) modelItem.detail_id;
        DetailDelete(detail_id);

        db.NSP_TNtl${tableName}_Delete(id);
        db.SaveChanges();
    }`.replace(/[ ]{2,}/g, "");
}

function genParameter(tableName, prop) {
    return prop.map(x => `item.${x} = (item.${x} == null) ? "${tableName}_${x}" : item.${x};`).join("\n");
}

module.exports = {
    genInsert,
    genUpdate,
    genDelete,
}