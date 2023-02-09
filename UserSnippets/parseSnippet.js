let str = `
-- User Table
DROP TABLE dbo.T\${tblName}User;

CREATE TABLE dbo.T\${tblName}User(
    id INT IDENTITY(1, 1) not null,
    username VARCHAR(max),
    password VARCHAR(max),
    email_address VARCHAR(max),
    CONSTRAINT user_id_pk PRIMARY KEY (id)
);

-- Role Table
DROP TABLE dbo.T\${tblName}Role;

CREATE TABLE dbo.T\${tblName}Role(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    CONSTRAINT role_id_pk PRIMARY KEY (id)
);

-- Permission Table
DROP TABLE dbo.T\${tblName}Permission;

CREATE TABLE dbo.T\${tblName}Permission(
    id INT IDENTITY(1, 1) not null,
    name VARCHAR(100),
    link VARCHAR(100),
    CONSTRAINT permission_id_pk PRIMARY KEY (id)
);

-- User Role Table
DROP TABLE dbo.T\${tblName}UserRole;

CREATE TABLE dbo.T\${tblName}UserRole(
    id INT IDENTITY(1, 1) not null,
    user_id INT,
    role_id INT,
    status VARCHAR(100), 
    CONSTRAINT user_role_id_pk PRIMARY KEY (id)
);

-- Role Permission Table
DROP TABLE dbo.T\${tblName}RolePermission;

CREATE TABLE dbo.T\${tblName}RolePermission(
    id INT IDENTITY(1, 1) not null,
    role_id INT,
    permission_id INT,
    status VARCHAR(100), 
    CONSTRAINT role_permission_id_pk PRIMARY KEY (id)
);
`;

// Split Into Array
let arr = str.split("\n");

// Remove First and Last
arr = arr.slice(1, -1);

// Add Slash Before Each Double Quotes
arr = arr.map(val => {
    let rgx;

    // Remove WhiteSpace
    rgx = /\s[4, ]/g;
    val = val.replace(rgx, " ");

    rgx = /\s[2, ]/g;
    val = val.replace(rgx, "\\t");

    rgx = /"/g;
    val = val.replace(rgx, `\\"`);

    return `"${val}"`;
});

let res = "";

res = `[
${arr.join(",\n")}
]`;

console.log(res);
