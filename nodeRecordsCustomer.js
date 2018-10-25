// Required packages
var cTable = require('console.table');
var inquirer = require('inquirer');
var mysql = require('mysql');
var total = 0;

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

    console.log('\nWelcome to Node Records!');
    console.log('======================\n');
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'enter_exit',
                message: 'Would you like to enter?',
                choices: ['Enter', 'Leave'],
                default: 0
            }
        ).then(function(answer){
            if (answer.enter_exit === 'Enter') {
                total = 0;
                start();
            } else {
                console.log('\nHave a great day.\n');
                connection.end();
            }
        });
});

// Start customer interaction with Bamazon Storefront
function start() {

    // Print All Bamazon Items for Sale
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        choicesArray = [];
        res.forEach(function(result){
            itemString = 'ID: ' + result.item_id + '\tName: ' + result.product_name + ' -> $' + result.price;
            choicesArray.push(itemString);
        });

        // Ask user what/how much they want to purchase
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'purchase_item',
                    message: 'Which product you would like to buy?',
                    choices: choicesArray
                },
                {
                    type: 'input',
                    name: 'purchase_qty',
                    message: 'How many items would you like to purchase?',

                    // check to make sure is a number
                    validate: function(input) {
                        if (isNaN(input) === false) {
                            return true;
                        }
                        return false;
                    }
                }
            ]).then(function(user_input){

                // determine user selected item via initial db query & item_ID
                user_input_id = user_input.purchase_item.substr(4,5);
                var selectedItem;
                for (var i=0; i<res.length; i++) {
                    if ( parseInt(user_input_id) === res[i].item_id ) {
                        selectedItem = res[i];
                    }
                }

                // check purchase qty against products db stock_quantity
                if (selectedItem.stock_quantity - parseInt(user_input.purchase_qty) >= 0) {

                    // if enough stock_quantity, update products db
                    var newQty = selectedItem.stock_quantity - parseInt(user_input.purchase_qty);
                    var salePrice = parseFloat(user_input.purchase_qty*selectedItem.price);
                    var itemRev = parseFloat(selectedItem.product_sales);
                    var sql = "UPDATE products SET ?, ? WHERE ? ";
                    var inserts = [{ stock_quantity: newQty}, { product_sales: itemRev + salePrice }, { item_id: selectedItem.item_id}];

                    var query = connection.query( sql, inserts,
                        function(err, res) {
                            if (err) throw err;

                            total += salePrice;

                            console.log('Thank you for your purchase!\nYour total is: $' + total);
                            inquirer
                                .prompt(
                                    {
                                        type: 'confirm',
                                        name: 'continue_shopping',
                                        message: 'Would you like to continue shopping?',
                                        default: true
                                    }
                                ).then(function(answer){
                                    if (answer.continue_shopping) {
                                        start();
                                    } else {
                                        console.log('\nThanks for shopping at Bamazon!\nPlease mail your total of $' + total + ' plus tax (no we don\'t calculate that for you) to:\n\n55 Notarealroad Dr.\nBopeka, West Dakota 00000\n\nWe\'ll send you your items after. Have a great day');
                                        connection.end();
                                    }
                                });
                        }
                    );
                } else {

                    // if not enough to complete purchase, provide next step options depending on db stock_quantity
                    var available_amt = selectedItem.stock_quantity;

                    // check to see if any items are avaialable for sale
                    if (available_amt > 0) {
                        console.log('\nInsufficient quantity! Can only purchase ' + available_amt + ' units.\n');
                        choicesArray = ['Buy ' + available_amt + ' units.', 'Buy a different item', 'Leave store'];
                    } else {
                        console.log('\nSold Out! No more units available for purchase.\n');
                        choicesArray = ['Buy a different item', 'Leave store'];
                    }

                    // asks user what they want to do
                    inquirer
                        .prompt(
                            {
                                type: 'list',
                                name: 'buy_option',
                                message: 'What would you like to do?',
                                choices: choicesArray,
                                filter: function(input) {
                                    for (var i=0; i<choicesArray.length; i++) {
                                        if (choicesArray[i] === input) {
                                            if (choicesArray.length === 2) {
                                                return i+1;
                                            }
                                            return i;
                                        }
                                    }
                                }
                            }
                        ). then(function(answer){
                            switch (parseInt(answer.buy_option)) {
                                case (0):       
                                    var newQty = 0;
                                    var salePrice = parseFloat(available_amt*selectedItem.price);
                                    var itemRev = parseFloat(selectedItem.product_sales);
                                    var sql = "UPDATE products SET ?, ? WHERE ? ";
                                    var inserts = [{ stock_quantity: newQty}, { product_sales: itemRev + salePrice }, { item_id: selectedItem.item_id}];
                
                                    var query = connection.query( sql, inserts,
                                        function(err, res) {
                                            if (err) throw err;

                                                total += salePrice;
                                                console.log('Thank you for your purchase!\nYour total is: $' + total);
                                                inquirer
                                                    .prompt(
                                                        {
                                                            type: 'confirm',
                                                            name: 'continue_shopping',
                                                            message: 'Would you like to continue shopping?',
                                                            default: true
                                                        }
                                                    ).then(function(answer){
                                                        if (answer.continue_shopping) {
                                                            start();
                                                        } else {
                                                            console.log('\nThanks for shopping at Bamazon!\nPlease mail your total of $' + total + ' plus tax (no we don\'t calculate that for you) to:\n\n55 Notarealroad Dr.\nBopeka, West Dakota 00000\n\nWe\'ll send you your items after. Have a great day');
                                                            connection.end();
                                                        }
                                                    });
                                            }
                                        );
                                    break;

                                case (1):
                                    start();
                                    break;

                                case (2):
                                    total = 0;
                                    return connection.end();

                            }

                        });
                }
            });
    });
}