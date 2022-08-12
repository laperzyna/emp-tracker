require('dotenv').config();
const mysql = require('mysql2');
const inquirer = require("inquirer");
const table = require("console.table");
const questions = [{
    type: "list",
    message: "Select an Option:",
    name: "options",
    choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role"
    ]
}];

function answerProcess(answers) {
    const options = answers.options;
    switch (options) {
        case "view all departments":
            connection.query(
                'SELECT * FROM department',
                function (err, results) {
                    console.log(table.getTable(results));
                    mainMenu();
                }
            );
            break
        case "view all roles":
            viewAllRoles();
            break
        case "view all employees":
            viewEmployees();
            break
        case "add a department":
            addDepartment();
            break
        case "add a role":
            addRole();
            break
        case "add an employee":
            addEmployee();
            break
        case "update an employee role":
            updateEmployeeRole();
            break
    }
}

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(function (err) {
    if (err) throw err;

});

function mainMenu() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            answerProcess(answers);
        })
        .catch((error) => {
            if (error.isTtyError) {
                prompt('choices could not be rendered');
            } else {
                console.error("error was thrown", error);
            }
        });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.log(table.getTable(data));
        mainMenu();
    })
}

function viewAllRoles() {
    connection.query("SELECT * FROM role", function (err, data) {
        console.log(table.getTable(data));
        mainMenu();
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.log(table.getTable(data));
        mainMenu();
    })
}

function addEmployee() {
    inquirer.prompt([{
        type: "input",
        name: "firstName",
        message: "What is the employees first name?"
    },
    {
        type: "input",
        name: "lastName",
        message: "What is the employees last name?"
    },
    {
        type: "number",
        name: "roleId",
        message: "What is the employees role ID"
    },
    {
        type: "number",
        name: "managerId",
        message: "What is the employees manager's ID?"
    }
    ]).then(function (res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function (err, data) {
            if (err) throw err;
            console.log("Successfully Inserted");
            mainMenu();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    },]).then(function (res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function (err, data) {
            if (err) throw err;
            console.log("Successfully Inserted");
            mainMenu();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO role (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.log("Successfully Inserted");
            mainMenu();
        })
    })

}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.log("Successfully Inserted");
            mainMenu();
        })
    })

}

mainMenu();
