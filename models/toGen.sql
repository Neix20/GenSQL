-- Order Table
DROP TABLE dbo.TNtlOrder;

CREATE TABLE dbo.TNtlOrder(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(50),
    code VARCHAR(50),
    transaction_date DATETIME,
    status VARCHAR(50),
    status_id INT,
    platform_id INT,
    customer_id INT,
    sub_total_price DECIMAL(10, 6),
    discount_fee DECIMAL(10, 6),
    extra_charges DECIMAL(10, 6),
    buyer_shipping_fee DECIMAL(10, 6),
    seller_shipping_fee DECIMAL(10, 6),
    buyer_total_price DECIMAL(10, 6),
    seller_total_price DECIMAL(10, 6),
    odoo_sales_id INT,
    odoo_status_id INT,
    odoo_sales_no VARCHAR(50),
    external_ref_no VARCHAR(50),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    remark VARCHAR(max),
    detail_id INT,
	CONSTRAINT order_id_pk PRIMARY KEY(id)
);