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
    sales_no VARCHAR(50),
    sub_total_price DECIMAL(10, 6),
    extra_charge DECIMAL(10, 6),
    discount_fee DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    shipping_fee DECIMAL(10, 6),
    transaction_date DATETIME,
    status_id INT,
    customer_id INT,
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