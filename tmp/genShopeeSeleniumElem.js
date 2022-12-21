const se = require("./lib/js2CSharp");

let shipmentDict = {
    "ShipmentTabLabel": {
        attr: `shipmentTabLabel`,
        css: `"div[class='shopee-tabs__nav-tab']:nth-child(3) .tab-label"`,
    },
};

let orderStartDict = {
    "OrderNo": {
        attr: `orderNo`,
        css: `$"{cssClass} .order-sn"`,
    },
    "OrderLink": {
        attr: `orderLink`,
        css: `$"{cssClass} .order-sn"`,
    },
    "OrderStatus": {
        attr: `orderStatus`,
        css: `$"{cssClass} .item-status .main-text"`,
    },
}

let orderDict = {
    "OrderTransactionDate": {
        attr: `orderTransactionDate`,
        css: `".od-log:last-child .time"`,
    },
    "CustomerInfo": {
        attr: `customerInfo`,
        css: `".shopee-card__content .section:nth-child(2) .body div:nth-child(1)"`,
    },
    "CustomerAddress": {
        attr: `customerAddress`,
        css: `".shopee-card__content .section:nth-child(2) .body div:nth-child(2)"`,
    }
}

let orderItemDict = {
    "OrderItemName": {
        attr: `orderItemName`,
        css: `$"{cssClass} .product-name"`,
    },
    "OrderItemSku": {
        attr: `orderItemSku`,
        css: `$"{cssClass} .product-meta"`,
    },
    "OrderItemUnitPrice": {
        attr: `orderItemUnitPrice`,
        css: `$"{cssClass} .price"`,
    },
    "OrderItemQuantity": {
        attr: `orderItemQuantity`,
        css: `$"{cssClass} .qty"`,
    },
}

let orderInfoDict = {
    "OrderSubTotal": {},
    "OrderDiscountFee": {},
    "OrderBuyerShippingFee": {},
    "OrderSellerShippingFee": {},
    "OrderBuyerTotalPrice": {},
    "OrderSellerTotalPrice": {},
}

// se.genSeleniumElemDebug(shipmentDict);

// se.genSeleniumElemDebug(orderStartDict);

se.genSeleniumElemDebug(orderDict);

// se.genSeleniumElemDebug(orderItemDict);