-- Attribute Table
DROP TABLE dbo.TNtlAttribute;

CREATE TABLE dbo.TNtlAttribute(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    detail_id INT,
    CONSTRAINT attribute_id_pk PRIMARY KEY(id)
);

-- Attribute Value Table
DROP TABLE dbo.TNtlAttributeValue;

CREATE TABLE dbo.TNtlAttributeValue(
    id INT IDENTITY(1, 1) not null,
    attribute_id INT,
    value VARCHAR(max),
    CONSTRAINT attribute_value_id_pk PRIMARY KEY(id)
);

-- UOM Table
DROP TABLE dbo.TNtlUom;

CREATE TABLE dbo.TNtlUom(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(50),
    detail_id INT,
    CONSTRAINT uom_id_pk PRIMARY KEY(id)
);

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

-- User Table
DROP TABLE dbo.TNtlUser;

CREATE TABLE dbo.TNtlUser(
    id INT IDENTITY(1, 1) not null,
    username VARCHAR(max),
    password VARCHAR(max),
    email_address VARCHAR(max),
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

-- User Role Table
DROP TABLE dbo.TNtlRole;

CREATE TABLE dbo.TNtlRole(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    CONSTRAINT role_id_pk PRIMARY KEY (id)
);

-- User User Role Table
DROP TABLE dbo.TNtlUserRole;

CREATE TABLE dbo.TNtlUserRole(
    id INT IDENTITY(1, 1) not null,
    user_id INT,
    role_id INT,
    CONSTRAINT user_role_id_pk PRIMARY KEY (id)
);

-- Permission Table
DROP TABLE dbo.TNtlPermission;

CREATE TABLE dbo.TNtlPermission(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    CONSTRAINT permission_id_pk PRIMARY KEY (id)
);

-- Role Permission Table
DROP TABLE dbo.TNtlRolePermission;

CREATE TABLE dbo.TNtlRolePermission(
    id INT IDENTITY(1, 1) not null,
    role_id INT,
    permission_id INT,
    CONSTRAINT role_permission_id_pk PRIMARY KEY (id)
);

