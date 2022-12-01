CREATE TABLE dbo.TNtlCustomer(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    total_price DECIMAL(10, 6),
    created_date DATETIME,
    platform_id INT,
	CONSTRAINT customer_id_pk PRIMARY KEY(id)
);

SELECT * 
FROM [dbo].[TInstaller]
WHERE 1=1;

INSERT INTO  [dbo].[TInstaller]
(
)
VALUES
(
);

UPDATE [dbo].[TInstaller] 
SET Name = 'Gay'
WHERE 1=1;

DELETE [dbo].[TInstaller]
WHERE 1=1
AND InstallerId = 1;