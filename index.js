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
                'SELECT DISTINCT department_name, department_id FROM `employee`',
                [],
                function (err, results) {
                    const tableResults = table.getTable(results);
                    console.log(tableResults);
                }
            );
            break
        case "view all roles":
            break
        case "view all employees":
            break
        case "add a department":
            break
        case "add a role":
            break
        case "add an employee":
            break
        case "update an employee role":
            break
    }
    // console.log(answers);
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
    console.log("connected as id " + connection.threadId + "\n");

});

function mainMenu() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            answerProcess(answers);
            mainMenu();
        })
        .catch((error) => {
            console.error(error);
            if (error.isTtyError) {
                // Prompt couldn't be rendered in the current environment
            } else {
                // Something else went wrong
            }
        });
}


mainMenu();
