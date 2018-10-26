// Required packages
var cTable = require('console.table');
var inquirer = require('inquirer');
var mysql = require('mysql');

// Create database connection
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'node_records'
});

// Connect to database
connection.connect(function(err, res) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);

    console.log('\nWelcome, NodeRecords Supervisor.\n');
    console.log('======================\n');
    start();
});

function start() {
    var choicesArray = ['View Product Sales by Department', 'Create New Department', 'Exit'];
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'supervisor_task',
                message: 'What would you like to do?',
                choices: choicesArray,
                filter: function(input){
                    for (var i=0; i<choicesArray.length; i++) {
                        if (choicesArray[i] === input) {
                            return parseInt(i);
                        }
                    }  
                }
            }
        ]).then(function(answer) {
            console.log(answer);
            switch (answer.supervisor_task) {
                case (0):
                    var query = connection.query(
                        "SELECT * FROM departments INNER JOIN products ON departments.department_name = products.department_name",
                        function(err, data) {
                            if (err) throw err;
                            console.table(data);
                        }
                    )

                    break;
                case (1):
                    console.log('b');
                    break;
                case (2):
                    return connection.end();
            }
        });
}


