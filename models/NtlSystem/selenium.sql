-- Selenium Table
DROP TABLE dbo.TNtlSeleniumLog;

CREATE TABLE dbo.TNtlSeleniumLog(
    id INT IDENTITY(1, 1) not null,
    log_name VARCHAR(100),
    type INT,
    start_date DATETIME,
    end_date DATETIME,
    platform_id INT,
    status VARCHAR(20),
    remarks VARCHAR(max),
    CONSTRAINT selenium_log_id_pk PRIMARY KEY (id)
);
