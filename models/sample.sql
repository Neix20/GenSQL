-- Selenium Table
DROP TABLE dbo.TNtlSeleniumLog;

CREATE TABLE dbo.TNtlSeleniumLog(
    id INT IDENTITY(1, 1) not null,
    log_name VARCHAR(100),
    start_date DATETIME,
    end_date DATETIME,
    platform VARCHAR(100),
    platform_id INT,
    status VARCHAR(100),
    status_id INT,
    remarks VARCHAR(max),
    CONSTRAINT selenium_log_id_pk PRIMARY KEY (id)
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
