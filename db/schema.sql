DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

CREATE TABLE employee(  
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
    department_name TEXT,
    department_id int,
    role_id int,
    job_title TEXT,
    role_salary FLOAT,
    first_name TEXT,
    last_name TEXT,
    managers TEXT
);