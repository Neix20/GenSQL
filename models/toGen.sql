CREATE TABLE dbo.MService(
    id INT IDENTITY(1, 1) not null,
    Code nvarchar(50),
    Name nvarchar(200),
    MDR decimal(18,4),
    SupplierId int,
    type int,
    MetaData nvarchar(max),
    Status int,
    Remarks nvarchar(200),
    CreatedBy varchar(200),
    CreatedDate datetime,
    LastUpdateBy varchar(200),
    LastUpdateDate datetime,
    Code01 nvarchar(50),
    CONSTRAINT MService_pk PRIMARY KEY (id)
);