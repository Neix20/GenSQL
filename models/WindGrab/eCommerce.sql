-- Platform Table
DROP TABLE dbo.TNtlPlatform;

CREATE TABLE dbo.TNtlPlatform(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    remark VARCHAR(max),
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
    remark VARCHAR(max),
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
    platform_id INT,
    customer_id INT,
    user_id INT,
    status_id INT,
    remark VARCHAR(max),
    CONSTRAINT customer_chat_id_pk PRIMARY KEY(id)
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
    name VARCHAR(50),
    sku VARCHAR(50),
    unit_price DECIMAL(10, 6),
    quantity DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    order_id INT,
    remark VARCHAR(max),
    detail_id INT,
    CONSTRAINT order_item_id_pk PRIMARY KEY(id)
);