-- User Table
DROP TABLE dbo.TVtUser;

CREATE TABLE dbo.TVtUser(
    id INT IDENTITY(1, 1) not null,
    username VARCHAR(max),
    password VARCHAR(max),
    email_address VARCHAR(max),
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

-- User Role Table
DROP TABLE dbo.TVtRole;

CREATE TABLE dbo.TVtRole(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    CONSTRAINT role_id_pk PRIMARY KEY (id)
);

-- User User Role Table
DROP TABLE dbo.TVtUserRole;

CREATE TABLE dbo.TVtUserRole(
    id INT IDENTITY(1, 1) not null,
    user_id INT,
    role_id INT,
    status VARCHAR(100), 
    CONSTRAINT user_role_id_pk PRIMARY KEY (id)
);

-- Permission Table
DROP TABLE dbo.TVtPermission;

CREATE TABLE dbo.TVtPermission(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    CONSTRAINT permission_id_pk PRIMARY KEY (id)
);

-- Role Permission Table
DROP TABLE dbo.TVtRolePermission;

CREATE TABLE dbo.TVtRolePermission(
    id INT IDENTITY(1, 1) not null,
    role_id INT,
    permission_id INT,
    status VARCHAR(100), 
    CONSTRAINT role_permission_id_pk PRIMARY KEY (id)
);