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

    console.log('\nWelcome, Bamazon Manager.\n');
    console.log('======================\n');
    start();
});

function start(){
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'manager_task',
                message: "What would you like to do?",
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
            }
        ).then(function(answer){
            switch (answer.manager_task) {
                case ('View Products for Sale'):
                    console.log('\n');
                    var query = connection.query(
                        "SELECT * FROM products",
                        function(err, res) {
                            if (err) throw err;

                            console.table(res);
                            start();
                        }
                    );
                    break;

                case ('View Low Inventory'):
                    console.log('\n');
                    var query = connection.query(
                        "SELECT * FROM products WHERE stock_quantity < 5",
                        function(err, res) {
                            if (err) throw err;
    
                            console.table(res);
                            start();
                        }
                    );
                    break;

                case ('Add to Inventory'):
                    console.log('\n');

                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'inventory_id',
                                message: 'What is the Item ID of the inventory you\'re adding to?',
                                filter: function(input) {
                                    return parseInt(input);
                                }
                            },
                            {
                                type: 'input',
                                name: 'inventory_qty',
                                message: 'How much inventory are you adding?',
                                filter: function(input) {
                                    return parseInt(input);
                                }
                            }
                        ]).then(function(answer){
                            // get current stock_quantity
                            var query_1 = connection.query(
                                "SELECT stock_quantity FROM products WHERE item_id = ?",
                                answer.inventory_id, 
                                function(err, res) {
                                    if (err) throw err;
                                    var current_qty = res[0].stock_quantity;

                                    // add manager input to stock_quantity and update database
                                    var query_2 = connection.query(
                                        "UPDATE products SET stock_quantity = ? WHERE item_id = ?",
                                        [current_qty + answer.inventory_qty, answer.inventory_id],
                                        function(err, res) {
                                            if (err) throw err;
                                            console.log('\n');

                                            // prompt manager to continue with more tesks
                                            start();
                                        }
                                    );
                                }
                                
                            );

                        });

                    break;

                case ('Add New Product'):
                    console.log('\n');

                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'newItem_name',
                                message: 'What is the name of the item?',
                            },
                            {
                                type: 'input',
                                name: 'newItem_department',
                                message: 'What department does this item belong to?'
                            },
                            {
                                type: 'input',
                                name: 'newItem_price',
                                message: 'How much does this item cost?'
                            },
                            {
                                type: 'input',
                                name: 'newItem_qty',
                                message: 'What is the starting inventory of this item?'
                            }
                        ]).then(function(answer){
                            var query = connection.query(
                                "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",
                                [answer.newItem_name, answer.newItem_department, answer.newItem_price, + answer.newItem_qty],
                                function(err, res) {
                                    if (err) throw err;
                                    console.log('\n');
                                    start();
                                }
                            )
                        });

                    break;

            }
        });
}
