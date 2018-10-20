CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT=1000,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lawn Mower', 'Garden & Outdoor', $58.70, 135);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Bar Cart', 'Home & Kitchen', 235.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('KitchenAid 3-Speed Hand Blender', 'Home & Kitchen', 41.46, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Modern Upholstered Loveseat', 'Home & Kitchen', 670.25, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Alyee i11 Bluetooth Earpieces wtih Mic', 'Electronics', 199.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Marvel’s Spider-Man - PlayStation 4', 'Electronics', 59.88, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Fire Sense Large Yakatori Charcoal Grill', 'Garden & Outdoor', 38.42, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('1000 Piece Jigsaw Puzzle', 'Toys & Games', 13.99, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Straight-Leg Jeans', "Men's Clothing", 82.00, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Regular Fit Golf Polo', "Men's Clothing", 43.38, 100);

