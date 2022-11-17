-- Generate Sales Report (For Accountant Purpose)   
CREATE OR ALTER VIEW dbo.VNtlSales AS
SELECT
    p.name "Platform",
    c.name "Customer",
    o.name "Order",
    o.sub_total_price "Sub Total Price",
    o.discount_fee "Discount / Voucher",
    o.extra_charges "Extra Charge",
    o.seller_shipping_fee "Shipping Fee",
    o.seller_total_price "Total Price",
    o.transaction_date "Order Date",
    o.status "Status"
FROM
    dbo.TNtlOrder o
    JOIN dbo.TNtlCustomer c ON o.customer_id = c.id
    JOIN dbo.TNtlPlatform p ON c.platform_id = p.id
GO

-- Sales Report Item Summary
CREATE OR ALTER VIEW dbo.VNtlSalesItemSummary AS
SELECT
    oi.order_id,
    oi.name,
    oi.sku,
    oi.unit_price,
    CAST(ROUND(oi.quantity, 0) AS INT) "quantity",
    oi.total_price
FROM
    dbo.TNtlOrderItem oi;
GO

-- Sales Report
-- Solution: Use Stored Procedure to create temporary table
CREATE OR ALTER PROCEDURE dbo.NSP_NTL_SalesReport AS
BEGIN
    CREATE TABLE #tmp_data (
        name VARCHAR(100),
        sku VARCHAR(100),
        unit_price VARCHAR(100),
        quantity VARCHAR(100),
        total_price VARCHAR(100)
    );

    DECLARE @cnt INT;
    SET @cnt = (SELECT TOP 1 id FROM dbo.TNtlOrder);

	DECLARE @len INT;
	SET @len = (SELECT COUNT(*) + @cnt FROM dbo.TNtlOrder);

    WHILE @cnt < @len
    BEGIN
        INSERT INTO #tmp_data 
        SELECT 
            o.name, p.name, '', '', '' 
        FROM 
            dbo.TNtlOrder o
            JOIN dbo.TNtlPlatform p ON o.platform_id = p.id
        WHERE 
            o.id = @cnt;
        INSERT INTO #tmp_data
        SELECT 
            name, 
            sku, 
            unit_price, 
            quantity, 
            total_price 
        FROM dbo.VNtlSalesItemSummary 
        WHERE order_id = @cnt;
		SET @cnt = @cnt + 1;
    END

    SELECT * FROM #tmp_data;

	DROP TABLE #tmp_data;
END;

-- Usage
SELECT * FROM dbo.VNtlSales;
SELECT * FROM dbo.VNtlSalesItemSummary;
EXEC dbo.NSP_NTL_SalesReport;