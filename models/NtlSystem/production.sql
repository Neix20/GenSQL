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

-- Product Template Table (Intentionally Left Out)

-- Product Variant Combination (Intentionally Left Out)

-- Product Categories Table
DROP TABLE dbo.TNtlProductCategory;

CREATE TABLE dbo.TNtlProductCategory(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    CONSTRAINT product_category_id_pk PRIMARY KEY (id)
);

-- Product Sub-categories Table
DROP TABLE dbo.TNtlProductSubCategory;

CREATE TABLE dbo.TNtlProductSubCategory(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    sub_category_id INT,
    CONSTRAINT product_sub_category_id_pk PRIMARY KEY (id)
);

-- Product Attribute Value Table
DROP TABLE dbo.TNtlProductAttributeValue;

CREATE TABLE dbo.TNtlProductAttributeValue(
    id INT IDENTITY(1, 1) not null,
    product_id INT,
    attribute_value_id INT,
    detail_id INT,
    CONSTRAINT product_attribute_value_id_pk PRIMARY KEY(id)
);

-- Product Component Table
DROP TABLE dbo.TNtlProductComponent;

CREATE TABLE dbo.TNtlProductComponent(
    id INT IDENTITY(1, 1) not null,
    master_product_id INT,
    sub_product_id INT,
    quantity INT,
    remarks VARCHAR(100),
    detail_id INT,
    CONSTRAINT product_component_id_pk PRIMARY KEY(id)
);

-- Stock Warehouse
DROP TABLE dbo.TNtlStockWarehouse;

CREATE TABLE dbo.TNtlStockWarehouse(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    email_address VARCHAR(50),
    phone_number VARCHAR(20),
    address_line_1 VARCHAR(50),
    address_line_2 VARCHAR(50),
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code INT,
    country VARCHAR(20),
    detail_id INT,
    CONSTRAINT stock_warehouse_id_pk PRIMARY KEY(id)
);

-- Stock Item Table
DROP TABLE dbo.TNtlStockItem;

CREATE TABLE dbo.TNtlStockItem(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    description VARCHAR(max),
    quantity DECIMAL(10, 6),
    product_id INT,
    uom_id INT,
    stock_warehouse_id INT,
    remarks VARCHAR(max),
    detail_id INT,
    CONSTRAINT stock_item_id_pk PRIMARY KEY(id)
);

-- Production Table
DROP TABLE dbo.TNtlProduction;

CREATE TABLE dbo.TNtlProduction(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    code VARCHAR(50),
    description VARCHAR(max),
    staff_name VARCHAR(100),
    created_date DATETIME,
    total_usage DECIMAL(10, 6),
    status_id INT,
    remark VARCHAR(100),
    detail_id INT,
    CONSTRAINT production_id_pk PRIMARY KEY (id)
);

-- Production Item Table
DROP TABLE dbo.TNtlProductionItem;

CREATE TABLE dbo.TNtlProductionItem(
    id INT IDENTITY(1, 1) not null,
    product_id INT,
    uom_id INT,
    quantity DECIMAL(10, 6),
    manufactured_date DATETIME,
    expiry_date DATETIME,
    production_id INT,
    remarks VARCHAR(100),
    detail_id INT,
    CONSTRAINT production_item_id_pk PRIMARY KEY (id)
);

-- Supplier Table
DROP TABLE dbo.TNtlSupplier(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    code VARCHAR(50),
    country VARCHAR(20),
    poc_name VARCHAR(max),
    poc_email_address VARCHAR(50),
    poc_phone_number VARCHAR(50),
    detail_id INT,
    CONSTRAINT supplier_id_pk PRIMARY KEY (id)
);

-- Supplier Shipment Table
DROP TABLE dbo.TNtlSupplierShipment;

CREATE TABLE dbo.TNtlSupplierShipment(
    id INT IDENTITY(1, 1) not null,
    received_date DATETIME,
    supplier_tracking_id VARCHAR(50),
    NTL_tracking_id VARCHAR(50),
    supplier_id INT,
    product_id INT,
    remarks VARCHAR(max),
    detail_id INT,
    CONSTRAINT supplier_shipment_id_pk PRIMARY KEY (id)
);