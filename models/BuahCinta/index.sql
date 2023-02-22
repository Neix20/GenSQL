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

CREATE TABLE dbo.MParameter(
    id INT IDENTITY(1, 1) not null,
    KeyType nvarchar(100) NOT NULL,
    KeyValue nvarchar(4000) NULL,
    Remark nvarchar(500) NULL,
    CreatedBy nvarchar(50) NULL,
    CreatedDate datetime NULL,
    LastUpdateBy nvarchar(50) NULL,
    CONSTRAINT MParameter_pk PRIMARY KEY (id)
);