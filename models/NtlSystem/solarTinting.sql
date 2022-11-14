-- Window Table
DROP TABLE dbo.TNtlWindow;

CREATE TABLE dbo.TNtlWindow(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    width DECIMAL(10, 6),
    height DECIMAL(10, 6),
    length DECIMAL(10, 6),
    total_usage DECIMAL(10, 6),
    detail_id INT,
    CONSTRAINT window_id_pk PRIMARY KEY (id)
);

-- Window Unit Table
DROP TABLE dbo.TNtlWindowUnit;

CREATE TABLE dbo.TNtlWindowUnit(
    id INT IDENTITY(1, 1) not null,
    window_id INT,
    unit_id INT,
    quantity INT,
    total_usage DECIMAL(10, 6),
    detail_id INT,
    CONSTRAINT window_unit_id_pk PRIMARY KEY (id)
);

-- Unit Type Table
DROP TABLE dbo.TNtlUnitType;

CREATE TABLE dbo.TNtlUnitType(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    detail_id INT,
    CONSTRAINT unit_type_id_pk PRIMARY KEY (id)
);

-- Unit Table
DROP TABLE dbo.TNtlUnit;

CREATE TABLE dbo.TNtlUnit(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(max),
    unit_type_id INT,
    master_unit_id INT,
    quantity INT,
    total_usage DECIMAL(10, 6),
    detail_id INT,
    CONSTRAINT unit_id_pk PRIMARY KEY (id)
);
