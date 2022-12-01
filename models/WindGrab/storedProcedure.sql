-- Generate Sales Report (For Accountant Purpose)   
CREATE OR ALTER VIEW dbo.VNtlSales AS
SELECT
    o.id "id",
    p.name "platform",
    c.name "customer",
    o.name "order",
    o.sub_total_price "sub_total_price",
    o.discount_fee "discount_fee",
    o.extra_charges "extra_charge",
    o.shipping_fee "shipping_fee",
    o.total_price "total_price",
    o.transaction_date "transaction_date",
    o.status "status"
FROM
    dbo.TNtlOrder o
    JOIN dbo.TNtlCustomer c ON o.customer_id = c.id
    JOIN dbo.TNtlPlatform p ON c.platform_id = p.id;
GO

-- Sales Report Item Summary
CREATE OR ALTER VIEW dbo.VNtlSalesItemSummary AS
SELECT
    oi.order_id,
    oi.name,
    oi.sku,
    oi.unit_price,
    CAST(ROUND(oi.quantity, 0) AS INT) "quantity",
    oi.total_price,
    oi.remark
FROM
    dbo.TNtlOrderItem oi;
GO

-- Sales Report
-- Solution: Use Stored Procedure to create temporary table
CREATE OR ALTER PROCEDURE dbo.NSP_NTL_SalesReport AS
BEGIN
    CREATE TABLE #tmp_data (
        name VARCHAR(max),
        sku VARCHAR(max),
        unit_price VARCHAR(max),
        quantity VARCHAR(max),
        total_price VARCHAR(max),
        remark VARCHAR(max),
    );

    DECLARE @cnt INT;
    SET @cnt = (SELECT TOP 1 id FROM dbo.VNtlSales);

	DECLARE @len INT;
	SET @len = (SELECT COUNT(*) + @cnt FROM dbo.VNtlSales);

    WHILE @cnt < @len
    BEGIN
        INSERT INTO #tmp_data 
        SELECT 
            [order], [platform], '', '', '', ''
        FROM 
            dbo.VNtlSales
        WHERE 
            [id] = @cnt;
        INSERT INTO #tmp_data
        SELECT 
            name, 
            sku, 
            unit_price, 
            quantity, 
            total_price,
            remark
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