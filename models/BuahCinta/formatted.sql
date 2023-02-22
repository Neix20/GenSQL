CREATE TABLE dbo.TUser(
    UserId int IDENTITY(1, 1) NOT NULL,
    MobileNo nvarchar(200),
    Email nvarchar(200),
    Password nvarchar(200),
    FirstName nvarchar(200),
    LastName nvarchar(200),
    DOB date,
    Gender nvarchar(50),
    Status int,
    Remarks nvarchar(200),
    CreatedBy nvarchar(200),
    CreatedDate datetime,
    LastUpdateBy nvarchar(200),
    LastUpdateDate datetime,
    ShopeeName nvarchar(200),
    CONSTRAINT TUser_pk PRIMARY KEY (id)
);

CREATE TABLE dbo.TOTP(
    LogId int IDENTITY(1, 1) NOT NULL,
    CampaignID int,
    MobileNo nvarchar(50),
    OTP nvarchar(50),
    Status int,
    LastUpdateDate datetime,
    LastUpdateBy nvarchar(50),
    CONSTRAINT TOTP_pk PRIMARY KEY (id)
);

CREATE TABLE dbo.MProduct(
    product_code nvarchar(50) NOT NULL,
    product_name nvarchar(200),
    product_type nvarchar(50),
    SellingPrice decimal(18, 2),
    PrimaryValue decimal(18, 2),
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
    CONSTRAINT MProduct_pk PRIMARY KEY (id)
);

CREATE TABLE dbo.TBuahCinta_V2(
    LogId int IDENTITY(1, 1) NOT NULL,
    ReferenceNo nvarchar(50),
    SessionId uniqueidentifier,
    VoucherCode nvarchar(200),
    RecipientNo nvarchar(50),
    SenderNo nvarchar(50),
    Message nvarchar(2000),
    IsSpecial int,
    SoundCode nvarchar(50),
    Photo nvarchar(200),
    ExpiredDate date,
    TID int,
    Amount decimal(18, 2),
    ProductCode nvarchar(50),
    Status int,
    Remarks nvarchar(200),
    CreatedBy nvarchar(200),
    CreatedDate datetime,
    LastUpdateBy nvarchar(200),
    LastUpdateDate datetime,
    CONSTRAINT TBuahCinta_V2_pk PRIMARY KEY (id)
);