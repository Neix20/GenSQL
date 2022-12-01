CREATE OR ALTER PROCEDURE [dbo].[NSP_TTransaction_GetJobDetails]
(
	@InstallerId INT,
    @TransactionId INT
)
AS
    SELECT a.[TransactionId], b.[InstallerId],
    d.[ProductImage], d.[ProductName],
    '' AS [WindowImage], c.[Highlight] AS [WindowHighlight], 
	c.[SQM] AS [WindowSize], c.[Qty] AS [WindowQty],
    b.[IsGrill] AS [WindowIsGrill], b.[IsTinted] AS [WindowIsTinted],
    ISNULL(b.[InstallationDate], GETDATE()) AS [InstallationDate], ISNULL(b.[SlotNo], 1) AS [InstallationSlotNo],
    b.[InstallationAddress] AS [InstallationAddress], b.[InstallationNote] AS [InstallationRemarks],
    b.[TotalAmount] AS [InstallationTotalAmount], b.[Status] AS [InstallationStatus], 
	(b.[TotalSF] / b.[TotalAmount]) AS [InstallationPricePerFt],
    b.[FullName] AS [CustomerName], b.[MobileNo] AS [CustomerMobileNo],
    f.[Description] AS [PaymentStatus], a.[Remarks] AS [PaymentRemarks]
    FROM [dbo].[TTransaction] a with (nolock)
    JOIN [dbo].[TTransactionInstallation] b with (nolock)
    ON a.[TransactionId] = b.[TransactionId]
    JOIN [dbo].[TTransactionDetails] c with (nolock)
    ON a.[TransactionId] = c.[TransactionId]
    JOIN [dbo].[MProduct] d with (nolock)
    ON c.[ProductId] = d.[ProductId]
    JOIN [dbo].[TPropertyWindow] e with (nolock)
    ON c.[RefId] = e.WindowId
    JOIN [dbo].[MStatus] f with (nolock)
    ON a.[Status] = f.[StatusId]
    WHERE 1=1
    AND f.[StatusType] = 'Transaction'
	AND a.[TransactionId] = @TransactionId
	AND b.[InstallerId] = @InstallerId;
GO
-- EXEC [dbo].[NSP_TTransaction_GetJobDetails] 3, 1

-- Date: "2022-11-09T10:52:25.19",
-- BookingTimeStatus: 0,
-- Address: "12, Block B Floor 10, Residensi Evo, Seksyen 9, 43650 Bandar Baru Bangi, Selangor",
-- Remarks: "If possible pls start earlier in morning, i need to run errands by 12pm, thanks",
-- PricePerFt: 2.50,
-- TotalPrice: 450,
-- CompletionStatus: 0,

-- CustomerName
-- CustomerMobileNo
SELECT * 
FROM [dbo].[TTransactionInstallation]
WHERE 1=1;