CREATE TABLE dbo.TVtVisionTest(
    id INT IDENTITY(1, 1) not null,
    productId INT,
    product_price DECIMAL(10, 6),
    productName VARCHAR(100),
    transaction_dt DATETIME,
    CONSTRAINT TNtlTest_pk PRIMARY KEY (id)
);