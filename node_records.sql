CREATE DATABASE node_records;
USE node_records;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL
);

ALTER TABLE products AUTO_INCREMENT=1000;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Herbie Hancock (LP) by Herbie Hancock', 'Records - Jazz', 12.99, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Toxicity by System Of A Down', 'Records - Rock', 18.99, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Coming Home by Leon Bridges', 'Records - Soul', 17.46, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lazaretto by Jack White', 'Records - Rock', 22.50, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Run the Jewels 3 [Explicit] by Run The Jewels', 'Records - Rap & Hip-Hop ', 199.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('3-Speed USB Turntable', 'Electronics - Record Player', 59.98, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Technica Stereo Turntable', 'Electronics - Record Player', 129.00, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Series II Floorstanding Speaker', 'Electronics - Speakers', 139.99, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Kind of Blue by Miles Davis ', 'Records - Jazz', 21.12, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ('Lady Soul by Aretha Franklin', 'Records - Soul', 21.98, 10);

