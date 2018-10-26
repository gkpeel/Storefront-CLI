DROP DATABASE IF EXISTS animals_db;
CREATE DATABASE node_records;
USE node_records;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    product_sales INTEGER(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

ALTER TABLE products AUTO_INCREMENT=1000;

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Herbie Hancock (LP) by Herbie Hancock', 'Records - Jazz', 12.99, 6, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Toxicity by System Of A Down', 'Records - Rock', 18.99, 10, 900);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Coming Home by Leon Bridges', 'Records - Soul', 17.46, 3, 800);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Lazaretto by Jack White', 'Records - Rock', 22.50, 12, 700);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Run the Jewels 3 [Explicit] by Run The Jewels', 'Records - Rap & Hip-Hop ', 199.99, 5, 600);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('3-Speed USB Turntable', 'Electronics - Record Player', 59.98, 2, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Technica Stereo Turntable', 'Electronics - Record Player', 129.00, 4, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Series II Floorstanding Speaker', 'Electronics - Speakers', 139.99, 8, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Kind of Blue by Miles Davis ', 'Records - Jazz', 21.12, 20, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ('Lady Soul by Aretha Franklin', 'Records - Soul', 21.98, 10, 100);


CREATE TABLE departments (
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL,
    over_head_costs INT NOT NULL,
    PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Records - Jazz', 7000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Records - Rock', 10000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Records - Soul', 4000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Records - Rap & Hip-Hop', 13000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Electronics - Record Player', 15000);

INSERT INTO departments (department_name, over_head_costs)
VALUES ('Electronics - Speakers', 20000);

