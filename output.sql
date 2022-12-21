DECLARE @platform VARCHAR(200) = 'Shopee';

CREATE TABLE [NewList] (
    order_date VARCHAR(100),
    myob_records VARCHAR(100),
    order_id VARCHAR(100),
    order_status VARCHAR(100),
    sales_amount VARCHAR(100),
    test VARCHAR(100),
    shipping_fee VARCHAR(100),
    discount_fee VARCHAR(100),
    extra_charges VARCHAR(100),
    amount_to_receive VARCHAR(100),
	stock_item_meter VARCHAR(100),
    product_name VARCHAR(max),
    meter VARCHAR(100),
    sqm VARCHAR(100)
);

INSERT INTO NewList
SELECT 'Order Date',
'MYOB RECORDS',
'Order ID',
'Sales Amount (RM)',
' Shipping fee received from buyer (RM) ',
' Shipping fee paid by seller (RM) ',
' Discount apply (RM) ',
' Lazada charges (RM) ',
' Amount to Received (RM) '
, 'STOCK ITEM (METER)', 'STOCK TYPE', ' METER ', ' CONVERT TO SQUARE METER '

DECLARE @platform_id INT = -1;

SET @platform_id = (
	SELECT TOP 1 id
	FROM dbo.TNTLPlatform
	WHERE 1 = 1
	AND [name] = @platform
);

DECLARE @ind INT = (
	SELECT TOP 1 o.[id]
	FROM [dbo].[TNtlOrder] o
	WHERE 1 = 1
	AND o.[platform_id] = @platform_id
	ORDER BY o.[transaction_date] ASC
);

DECLARE @limit INT = (
	SELECT TOP 1 o.[id]
	FROM [dbo].[TNtlOrder] o
	WHERE 1 = 1
	AND o.[platform_id] = @platform_id
	ORDER BY o.[transaction_date] DESC
);

WHILE (@ind <= @limit)
BEGIN

	INSERT INTO NewList
    SELECT TOP 1 FORMAT(o.[transaction_date], 'dd/MM/yyyy') AS [Order Date], '' AS [MYOB RECORDS],
    o.[name] AS [Order ID],
    o.[sub_total_price] AS [Sales Amount (RM)],
    0, o.[shipping_fee] AS [Shipping Fee],
    o.[discount_fee] AS [Discount],
    o.[extra_charges] AS [Extra Charges],
    o.[total_price] AS [Amount To Receive]
    , oi.[width] / 100., oi.[name], oi.[height] / 100. * oi.[quantity], oi.[width] / 100. *  oi.[height] / 100. * oi.[quantity]
    FROM [dbo].[TNtlOrder] o
	JOIN [dbo].[TNtlOrderItem] oi
	ON o.[id] = oi.[order_id]
    WHERE 1 = 1
	AND o.[id] = @ind
	AND o.[platform_id] = @platform_id;

	DECLARE @start INT = (
        SELECT TOP 1 [id]
        FROM [TNtlOrderItem]
        WHERE 1 = 1
        AND [order_id] = @ind
    );

	SET @start = @start + 1;

    DECLARE @end INT = (
        SELECT TOP 1 [id]
        FROM [TNtlOrderItem]
        WHERE 1 = 1
        AND [order_id] = @ind
        ORDER BY [id] DESC
    );

    WHILE (@start <= @end)
    BEGIN
		INSERT INTO NewList
		SELECT '', '', o.[name], '', '', '', '', '', ''
		, oi.[width] / 100., oi.[name], oi.[height] / 100. * oi.[quantity], oi.[width] / 100. *  oi.[height] / 100. * oi.[quantity]
		FROM [TNtlOrderItem] oi
		JOIN [TNtlOrder] o
		ON oi.[order_id] = o.[id]
		WHERE 1 = 1
		AND oi.[id] = @start
		AND o.[platform_id] = @platform_id;

        SET @start = @start + 1;
    END

	SET @ind = @ind + 1;
END

SELECT * FROM NewList;

DROP TABLE NewList;
