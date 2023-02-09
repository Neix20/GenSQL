-- Platform Table
DROP TABLE dbo.TNtlPlatform;

CREATE TABLE dbo.TNtlPlatform(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    detail_id INT,
    CONSTRAINT platform_id_pk PRIMARY KEY(id)
);

-- Customer Table
DROP TABLE dbo.TNtlCustomer;

CREATE TABLE dbo.TNtlCustomer(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    email_address VARCHAR(50),
    phone_number VARCHAR(50),
    address VARCHAR(max),
    platform_id INT,
    detail_id INT,
	CONSTRAINT customer_id_pk PRIMARY KEY(id)
);

-- UOM Table
DROP TABLE dbo.TNtlUom;

CREATE TABLE dbo.TNtlUom(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(50),
    detail_id INT,
    CONSTRAINT uom_id_pk PRIMARY KEY(id)
);

-- Products Table
DROP TABLE dbo.TNtlProduct;

CREATE TABLE dbo.TNtlProduct(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    description VARCHAR(max),
    SKU VARCHAR(50),
    SKU2 VARCHAR(50),
    buy_price DECIMAL(10, 2),
    sell_price DECIMAL(10, 2),
    product_category_id INT,
    product_sub_category_id INT,
    uom_id INT,
    remarks VARCHAR(100),
    detail_id INT,
    CONSTRAINT product_id_pk PRIMARY KEY(id)
);

-- Selenium Table
DROP TABLE dbo.TNtlSeleniumLog;

CREATE TABLE dbo.TNtlSeleniumLog(
    id INT IDENTITY(1, 1) not null,
    log_name VARCHAR(100),
    start_date DATETIME,
    end_date DATETIME,
    platform VARCHAR(100),
    platform_id INT,
    status VARCHAR(100),
    status_id INT,
    remarks VARCHAR(max),
    CONSTRAINT selenium_log_id_pk PRIMARY KEY (id)
);


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
    shipping_fee DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
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

-- Order Item Table
DROP TABLE dbo.TNtlOrderItem;

CREATE TABLE dbo.TNtlOrderItem(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    sku VARCHAR(50),
    unit_price DECIMAL(10, 6),
    quantity DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    width INT,
    height INT,
    order_id INT,
    product_id INT,
    uom_id INT,
    remark VARCHAR(max),
    detail_id INT,
	CONSTRAINT order_item_id_pk PRIMARY KEY(id)
);
-- Detail Table
DROP TABLE dbo.TNtlDetail;

CREATE TABLE dbo.TNtlDetail(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    remark VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT detail_id_pk PRIMARY KEY(id)
);