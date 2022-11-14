-- Job Batch Table
DROP TABLE dbo.TNtlJobBatch;

CREATE TABLE dbo.TNtlJobBatch(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    batch_no VARCHAR(50),
    created_date DATETIME,
    completed_date DATETIME,
    staff_name VARCHAR(100),
    status_id INT,
    detail_id INT,
    CONSTRAINT job_batch_id_pk PRIMARY KEY (id)
);

-- Job Order Table (Create as a View)
DROP TABLE dbo.TNtlJobOrder;

CREATE TABLE dbo.TNtlJobOrder(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    code VARCHAR(100),
    created_date DATETIME,
    client_order_ref VARCHAR(100),
    sub_total_price DECIMAL(10, 6),
    discount_fee DECIMAL(10, 6),
    tax_price DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    customer_id INT,
    customer_name VARCHAR(100),
    customer_street VARCHAR(max),
    customer_street2 VARCHAR(max),
    customer_zip_code INT,
    customer_city VARCHAR(100),
    customer_state VARCHAR(100),
    customer_country VARCHAR(100),
    odoo_sales_id INT,
    odoo_status_id INT,
    status_id INT,
    batch_id INT,
    detail_id INT,
    CONSTRAINT job_order_id_pk PRIMARY KEY(id)
);

-- Job Order Item Table
DROP TABLE dbo.TNtlJobOrderItem;

CREATE TABLE dbo.TNtlJobOrderItem(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    sku VARCHAR(50),
    uom VARCHAR(50),
    unit_price DECIMAL(10, 6),
    quantity DECIMAL(10, 6),
    length DECIMAL(10, 6),
    width DECIMAL(10, 6),
    height DECIMAL(10, 6),
    sub_total_price DECIMAL(10, 6),
    discount_fee DECIMAL(10, 6),
    tax_price DECIMAL(10, 6),
    total_price DECIMAL(10, 6),
    order_id INT,
    detail_id INT,
    CONSTRAINT job_order_item_id_pk PRIMARY KEY (id)
);

-- Summary Listing Table
DROP TABLE dbo.TNtlSummaryItem;

CREATE TABLE dbo.TNtlSummaryItem(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    sku VARCHAR(50),
    quantity DECIMAL(10, 6),
    length DECIMAL(10, 6),
    width DECIMAL(10, 6),
    height DECIMAL(10, 6),
    created_date DATETIME,
    completed_date DATETIME,
    status_id INT,
    detail_id INT,
    CONSTRAINT summary_item_id_pk PRIMARY KEY (id)
);

DELETE FROM dbo.TNtlJobBatch;
DELETE FROM dbo.TNtlJobOrder;
DELETE FROM dbo.TNtlJobOrderItem;


