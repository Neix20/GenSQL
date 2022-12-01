let customerDict = {
    "customerName": {
        value: `$"{addressBilling["first_name"]} {addressBilling["last_name"]}"`
    },
    "customerPhone": {
        value: `$"{addressBilling["phone"]}"`
    },
    "customerAddress": {
        value: ``
    },
};

let orderDict = {
    "orderName": {
        value: `$"{_order["order_number"]}"`
    },
    "orderCode": {
        value: `$"{_order["order_number"]}"`
    },
    "orderStatus": {
        value: `$"{_order["statuses"][0]}"`
    },
    "orderTransactionDate": {
        value: `$"{_order["created_at"]}"`
    },
}

let orderDictII = {
    "orderSubTotal": {
        value: `$"{_order["price"]}"`,
    },
    "orderDiscountFee": {
        value: `$"{_order["voucher"]}"`,
    },
    "orderExtraCharge": {
        value: `"0"`,
    },
    "orderShippingFee": {
        value: `$"{_order["shipping_fee"]}"`,
    },
    "orderTotalPrice": {
        value: `$"{_order["price"]}"`,
    },
}

let orderItemDict = {
    "orderItemName": {
        value: `$"{orderItem["name"]}"`
    },
    "orderItemSku": {
        value: `$"{orderItem["sku"]}"`
    },
    "orderItemUnitPrice": {
        value: `$"{orderItem["item_price"]}"`
    },
    "oiQuantity": {
        value: ``
    },
    "oiTotalPrice": {
        value: ``
    }
}

function caps(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Generate Output
function genOutput(dict) {
    for(let key in dict) {
        let {value} = dict[key];
        console.log(`string ${key} = ${value}.Trim();`);
    }
}

function genOutputDebug(dict) {
    for(let key in dict) {
        let {value} = dict[key];
        console.log(`string ${key} = ${value}.Trim();`);
    }

    let res = [];
    for(let key in dict) {
        res.push(`${caps(key)}: {${key}}`);
    }

    console.log(`Console.WriteLine($"${res.join("\\n")}");`);
}

function _test(dict) {
    // for(let key in dict) {
    //     let {value} = dict[key];
    //     console.log(`string ${key} = orderItem["${key}"];`);
    // }

    let res = [];
    for(let key in dict) {
        res.push(`${caps(key)}: {${key}}`);
    }
    console.log(`Log.Information($"${res.join("\\n")}");`);
}


// genOutputDebug(customerDict);
// genOutputDebug(orderDict);
// genOutputDebug(orderItemDict);
// genOutputDebug(orderDictII);
// _test(orderItemDict);

_test(orderItemDict);