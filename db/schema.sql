DROP DATABASE IF EXISTS business_db;

CREATE DATABASE business_db;

CREATE TABLE
    employee(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        role_id int,
        first_name TEXT,
        last_name TEXT,
        manager_id int
    );

CREATE TABLE
    department(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        name TEXT
    );

CREATE TABLE
    role(
        id int NOT NULL PRIMARY KEY AUTO_INCREMENT COMMENT 'Primary Key',
        title TEXT,
        salary int,
        department_id int
    );