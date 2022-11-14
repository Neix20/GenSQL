-- Status Table
DROP TABLE dbo.TNtlStatus;

CREATE TABLE dbo.TNtlStatus(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(50),
    type VARCHAR(100),
    detail_id INT,
    CONSTRAINT status_id_pk PRIMARY KEY(id)
);

-- Detail Table
DROP TABLE dbo.TNtlDetail;

CREATE TABLE dbo.TNtlDetail(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    remark VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT detail_id_pk PRIMARY KEY(id)
);