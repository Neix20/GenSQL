-- Logs Table
CREATE TABLE dbo.TVtLogs(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    filePath VARCHAR(100),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TVtLogs_pk PRIMARY KEY (id)
);

-- Camera
CREATE TABLE dbo.TVtCamera(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    latitude DECIMAL(6, 3),
    longitude DECIMAL(6, 3),
    status VARCHAR(100),
    last_active_date DATETIME,
    created_by VARCHAR(100),
    created_date DATETIME,
    CONSTRAINT TVtCamera_pk PRIMARY KEY (id)
);

-- Passerby
CREATE TABLE dbo.TVtPasserby(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    age VARCHAR(100),
    gender VARCHAR(100),
    captured_timestamp DATETIME,
    original_img_path VARCHAR(max),
    modified_img_path VARCHAR(max),
    crop_img_path VARCHAR(max),
    camera_id INT,
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TVtPasserby_pk PRIMARY KEY (id)
);

-- Face Recognizer
CREATE TABLE dbo.TVtFaceRecognizer(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    captured_timestamp DATETIME,
    original_img_path VARCHAR(max),
    crop_img_path VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TVtFaceRecognizer_pk PRIMARY KEY (id)
);

-- Stored Faces
CREATE TABLE dbo.TVtStoredFaces(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    status VARCHAR(100),
    original_img_path VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TVtStoredFaces_pk PRIMARY KEY (id)
);