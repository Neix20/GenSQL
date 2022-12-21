DROP TABLE TNtlTest;
CREATE TABLE dbo.TNtlTest(
    id INT IDENTITY(1,1) not null,
    productId INT,
    product_price DECIMAL(10,6),
    productName VARCHAR(100),
    transaction_dt DATETIME,
    CONSTRAINT TNtlTest_pk PRIMARY KEY (id)
);

-- Stored Procedure: Insert New Record
If exists (Select * from sysobjects where ID = Object_id('NSP_TNtlTest_Insert') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure NSP_TNtlTest_Insert
go
Create Procedure NSP_TNtlTest_Insert
( @productId as INT,
@product_price as DECIMAL(10,6),
@productName as VARCHAR(100),
@transaction_dt as DATETIME )
as
Insert into  [TNtlTest]
( [productId],
[product_price],
[productName],
[transaction_dt] )
Values
( @productId,
@product_price,
@productName,
@transaction_dt )
go

-- Stored Procedure: Update Existing Record
If exists (Select * from sysobjects where ID = Object_id('NSP_TNtlTest_Update') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure NSP_TNtlTest_Update
go
Create Procedure NSP_TNtlTest_Update
( @id as INT,
@productId as INT,
@product_price as DECIMAL(10,6),
@productName as VARCHAR(100),
@transaction_dt as DATETIME )
as
Update [TNtlTest]
Set [productId] = @productId,
[product_price] = @product_price,
[productName] = @productName,
[transaction_dt] = @transaction_dt

Where 1=1
And [id] = @id
go

-- Stored Procedure: Delete Record
If exists (Select * from sysobjects where ID = Object_id('NSP_TNtlTest_Delete') And OBJECTPROPERTY(id, N'IsProcedure') = 1)
drop procedure NSP_TNtlTest_Delete
go
Create Procedure NSP_TNtlTest_Delete
( @id as INT )
as
Delete [TNtlTest]
Where 1=1
And [id] = @id
go