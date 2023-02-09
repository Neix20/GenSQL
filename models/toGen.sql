-- User Table
DROP TABLE dbo.TBuahCintaPortalUser;

CREATE TABLE dbo.TBuahCintaPortalUser(
    id INT IDENTITY(1, 1) not null,
    username VARCHAR(max),
    password VARCHAR(max),
    email_address VARCHAR(max),
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

-- Role Table
DROP TABLE dbo.TBuahCintaPortalRole;

CREATE TABLE dbo.TBuahCintaPortalRole(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    CONSTRAINT role_id_pk PRIMARY KEY (id)
);

-- Permission Table
DROP TABLE dbo.TBuahCintaPortalPermission;

CREATE TABLE dbo.TBuahCintaPortalPermission(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    CONSTRAINT permission_id_pk PRIMARY KEY (id)
);

-- User Role Table
DROP TABLE dbo.TBuahCintaPortalUserRole;

CREATE TABLE dbo.TBuahCintaPortalUserRole(
    id INT IDENTITY(1, 1) not null,
    user_id INT,
    role_id INT,
    status VARCHAR(100), 
    CONSTRAINT user_role_id_pk PRIMARY KEY (id)
);

-- Role Permission Table
DROP TABLE dbo.TBuahCintaPortalRolePermission;

CREATE TABLE dbo.TBuahCintaPortalRolePermission(
    id INT IDENTITY(1, 1) not null,
    role_id INT,
    permission_id INT,
    status VARCHAR(100), 
    CONSTRAINT role_permission_id_pk PRIMARY KEY (id)
);