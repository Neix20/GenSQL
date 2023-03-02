CREATE TABLE dbo.MProduct(
product_code nvarchar(50) NOT NULL,
product_name nvarchar(200),
product_type nvarchar(50),
PrimaryValue decimal(18, 2),
OriginalPrice decimal(18, 2),
DiscountRate decimal(18, 2),
SellingPrice decimal(18, 2),
BonusValue decimal(18, 2),
status int,
remarks nvarchar(200),
createdby nvarchar(200),
createddate datetime,
lastupdateby nvarchar(200),
lastupdatedate datetime,
productimage nvarchar(200),
productimage2 nvarchar(200),
productinfo nvarchar(200),
code nvarchar(200),
qty int,
MerchantId int,
CONSTRAINT MProduct_pk PRIMARY KEY (id)
);