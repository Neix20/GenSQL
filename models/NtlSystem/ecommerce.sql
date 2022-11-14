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

-- Customer Chat Table
DROP TABLE dbo.TNtlCustomerChat;

CREATE TABLE dbo.TNtlCustomerChat(
    id INT IDENTITY(1, 1) not null,
    message VARCHAR(max),
    created_date DATETIME,
    msg_type VARCHAR(50),
    sender_type VARCHAR(50),
    customer_id INT,
    user_id INT,
    status_id INT,
    platform_id INT,
    CONSTRAINT customer_chat_id_pk PRIMARY KEY(id)
);

-- Quotation Table

-- Order Table
DROP TABLE dbo.TNtlOrder;

CREATE TABLE dbo.TNtlOrder(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    code VARCHAR(50),
    sub_total_price DECIMAL(10, 6),
    tax_price DECIMAL(10, 6),
    discount_fee DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    voucher_no VARCHAR(50),
    odoo_sales_id INT,
    odoo_sales_no VARCHAR(50),
    external_ref_no VARCHAR(50),
    odoo_status_id INT,
    status_id INT,
    customer_id INT,
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
    name VARCHAR(50),
    sku VARCHAR(50),
    unit_price DECIMAL(10, 6),
    quantity DECIMAL(10, 6),
    sub_total_price DECIMAL(10, 6),
    tax_price DECIMAL(10, 6),
    discount_fee DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    voucher_no VARCHAR(50),
    order_id INT,
    product_id INT,
    unit_id INT,
    total_usage DECIMAl(10, 6),
    uom_id INT,
    remark VARCHAR(max),
    detail_id INT,
	CONSTRAINT order_item_id_pk PRIMARY KEY(id)
);

-- Order Item Refund Status Table (Intentionally Left Out)

-- Invoice Table
-- Created is when payment is complete
-- Completed is when packing is complete
-- Created Date will be auto generated
-- Completed Date will be auto selected
-- When an invoice is generated, it represents that customer already made payment
-- Invoice Status is to signify that packing is complete for Production
DROP TABLE dbo.TNtlInvoice;

CREATE TABLE dbo.TNtlInvoice(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    code VARCHAR(100),
    details VARCHAR(max),
    created_date DATETIME,
    completed_date DATETIME,
    shipping_fee DECIMAL(10, 2),
    customer_address_line_1 VARCHAR(50),
    customer_address_line_2 VARCHAR(50),
    customer_city VARCHAR(50),
    customer_state VARCHAR(50),
    customer_zip_code INT,
    customer_country VARCHAR(20),
    payment_method_id INT,
    status_id INT,
    customer_id INT,
    order_id INT,
    remark VARCHAR(max),
    detail_id INT,
	CONSTRAINT invoice_id_pk PRIMARY KEY (id)
);

-- Payment Method Table (Intentionally Left Out)
DROP TABLE dbo.TNtlPaymentMethod;

CREATE TABLE dbo.TNtlPaymentMethod(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    detail_id INT,
	CONSTRAINT payment_method_id_pk PRIMARY KEY (id)
);
-- Voucher Table
DROP TABLE dbo.TNtlVoucher;

CREATE TABLE dbo.TNtlVoucher(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    code VARCHAR(50),
    description VARCHAR(max),
    discount_fee DECIMAL(10, 6),
    start_date DATETIME,
    expiry_date DATETIME,
    CONSTRAINT voucher_id_pk PRIMARY KEY (id)
);

-- Product Voucher Table
DROP TABLE dbo.TNtlProductVoucher;

CREATE TABLE dbo.TNtlProductVoucher(
    id INT IDENTITY(1, 1) not null,
    voucher_id INT,
    product_id INT,
    CONSTRAINT product_voucher_id_pk PRIMARY KEY (id)
);

-- Customer Voucher Table
DROP TABLE dbo.TNtlCustomerVoucher;

CREATE TABLE dbo.TNtlCustomerVoucher(
    id INT IDENTITY(1, 1) not null,
    voucher_id INT,
    customer_id INT,
    CONSTRAINT customer_voucher_id_pk PRIMARY KEY (id)
);
