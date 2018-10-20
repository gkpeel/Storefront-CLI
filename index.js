var inquirer = require('inquirer');
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

connection.connect(function(err, res) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
    connection.end();
});

function start() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
    });
}