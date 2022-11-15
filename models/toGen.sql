-- Order Item Table
DROP TABLE dbo.TNtlOrderItem;

CREATE TABLE dbo.TNtlOrderItem(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(50),
    sku VARCHAR(50),
    unit_price DECIMAL(10, 6),
    quantity DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    order_id INT,
    product_id INT,
    uom_id INT,
    remark VARCHAR(max),
    detail_id INT,
	CONSTRAINT order_item_id_pk PRIMARY KEY(id)
);