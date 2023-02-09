-- User Table
DROP TABLE dbo.TNtlUser;

CREATE TABLE dbo.TNtlUser(
    id INT IDENTITY(1, 1) not null,
    username VARCHAR(max),
    password VARCHAR(max),
    email_address VARCHAR(max),
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

-- Role Table
DROP TABLE dbo.TNtlRole;

CREATE TABLE dbo.TNtlRole(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    CONSTRAINT role_id_pk PRIMARY KEY (id)
);

-- Permission Table
DROP TABLE dbo.TNtlPermission;

CREATE TABLE dbo.TNtlPermission(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    CONSTRAINT permission_id_pk PRIMARY KEY (id)
);

-- User Role Table
DROP TABLE dbo.TNtlUserRole;

CREATE TABLE dbo.TNtlUserRole(
    id INT IDENTITY(1, 1) not null,
    user_id INT,
    role_id INT,
    status VARCHAR(100), 
    CONSTRAINT user_role_id_pk PRIMARY KEY (id)
);

-- Role Permission Table
DROP TABLE dbo.TNtlRolePermission;

CREATE TABLE dbo.TNtlRolePermission(
    id INT IDENTITY(1, 1) not null,
    role_id INT,
    permission_id INT,
    status VARCHAR(100), 
    CONSTRAINT role_permission_id_pk PRIMARY KEY (id)
);
