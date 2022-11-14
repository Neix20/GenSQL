-- Shipment Table
DROP TABLE dbo.TNtlShipment;

CREATE TABLE dbo.TNtlShipment(
    id INT IDENTITY(1, 1) not null,
    start_address_line_1 VARCHAR(50),
    start_address_line_2 VARCHAR(50),
    start_city VARCHAR(50),
    start_state VARCHAR(50),
    start_zip_code INT,
    start_country VARCHAR(20),
    dest_address_line_1 VARCHAR(50),
    dest_address_line_2 VARCHAR(50),
    dest_city VARCHAR(50),
    dest_state VARCHAR(50),
    dest_zip_code INT,
    dest_country VARCHAR(20),
    tracking_no VARCHAR(20),
    created_date DATETIME,
    expected_date DATETIME,
    due_date DATETIME,
    invoice_id INT,
    carrier_id INT,
    status_id INT,
    remark VARCHAR(100),
    detail_id INT,
    CONSTRAINT shipment_id_pk PRIMARY KEY (id)
);

-- Carrier Table
DROP TABLE dbo.TNtlCarrier;

CREATE TABLE dbo.TNtlCarrier(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    detail_id INT,
    CONSTRAINT carrier_id_pk PRIMARY KEY (id)
);