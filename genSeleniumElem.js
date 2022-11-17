const se = require("./lib/js2CSharp");

let orderItemDict = {
    "OrderItemName": {
        attr: `orderItemName`,
        css: `$"{css} .product-title-text"`,
    },
    "OrderItemSKU": {
        attr: `orderItemSku`,
        css: `$"{css} .order-field-seller-sku .order-field-value"`,
    },
    "OrderItemUnitPrice": {
        attr: `orderItemUnitPrice`,
        css: `$"{css} .order-item-price .currency-text-scope"`,
    },
    "OrderItemQuantity": {
        attr: `orderItemQty`,
        css: `$"{css} .order-item-count"`,
    },
}

let customerDict = {
    "CustomerName": {
        attr: `customerName`,
        css: `"div.order-detail-left-panels .buyer-info-panel .buyer-info-box-buyer-name"`,
    },
    "CustomerPhoneNo": {
        attr: `customerPhoneNo`,
        css: `"div.order-detail-left-panels .buyer-info-panel .order-field-customer-phone .show-text"`,
    },
    "CustomerAddress": {
        attr: `customerAddress`,
        css: `"div.order-detail-left-panels .buyer-address-panel .order-field-shipping-address .show-text"`,
    },
}

let orderStartDict = {
    "OrderId": {
        attr: `orderId`,
        css: `$"{cssClass} .order-field-order-number a"`,
    },
    "OrderLink": {
        attr: `orderLink`,
        css: `$"{cssClass} .order-field-order-number a"`,
    },
    "OrderStatus": {
        attr: `orderStatus`,
        css: `$"{cssClass} .order-field-order-status .order-field-value"`,
    },
}

let orderDict = {
    "OrderTransactionDate": {
        attr: `orderTransactionDt`,
        css: `"div.order-detail-left-panels .package-list-panel .order-field-create-time .order-field-value"`,
    },
    "OrderSubTotal": {
        attr: `orderSubTotal`,
        css: `"div.buyer-payment-content .next-list-item:nth-child(1) .currency-text-scope"`,
    },
    "OrderSellerShippingFee": {
        attr: `orderSellerShippingFee`,
        css: `"div.buyer-payment-content .next-list-item:nth-child(2) .currency-text-scope"`,
    },
    "OrderBuyerShippingFee": {
        attr: `orderBuyerShippingFee`,
        css: `"div.buyer-payment-content .next-list-item:nth-child(2) .currency-text-scope"`,
    },
    "OrderDiscountFee": {
        attr: `orderDiscountFee`,
        css: `"div.buyer-payment-content .next-list-item:nth-child(4) .currency-text-scope"`,
    },
    "OrderBuyerTotalPrice": {
        attr: `orderBuyerTotalPrice`,
        css: `"div.buyer-payment-content .next-list-item:last-child .currency-text-scope"`,
    },
}

// se.genDict("tmpDict", orderStartDict);
// se.genSeleniumElem(orderStartDict);

// se.genSeleniumElemDebug(orderItemDict);

se.genSeleniumElemDebug(customerDict);
console.log();
se.genSeleniumElemDebug(orderDict);