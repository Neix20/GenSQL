-- Logs Table
CREATE TABLE dbo.TNtlLogs(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    filePath VARCHAR(100),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TNtlLogs_pk PRIMARY KEY (id)
);

-- Person Counter
CREATE TABLE dbo.TNtlPersonCounter(
    id INT IDENTITY(1, 1) not null,
    age INT,
    gender VARCHAR(100),
    captured_timestamp DATETIME,
    original_img_path VARCHAR(max),
    crop_img_path VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TNtlPersonCounter_pk PRIMARY KEY (id)
);

-- Face Recognizer
CREATE TABLE dbo.TNtlFaceRecognizer(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    captured_timestamp DATETIME,
    original_img_path VARCHAR(max),
    crop_img_path VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TNtlFaceRecognizer_pk PRIMARY KEY (id)
);

-- Stored Faces
CREATE TABLE dbo.TNtlStoredFaces(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    status VARCHAR(100),
    original_img_path VARCHAR(max),
    created_by VARCHAR(100),
    created_date DATETIME,
    last_updated_by VARCHAR(100),
    last_updated_date DATETIME,
    CONSTRAINT TNtlStoredFaces_pk PRIMARY KEY (id)
);