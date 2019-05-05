DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (

	item_id integer auto_increment not null,
    
    product_name varchar(30) not null,
    
    department_name varchar(30) not null,
    
    price decimal(8, 2) not null,
    
    stock_quantity integer not null,
    
    primary key(item_id)

);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("cool shades", "fashion accessories", 20.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("sneakers", "shoes", 30.00, 200);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("tanktops", "clothing", 20.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("jeans", "clothing", 40.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("purses", "fashion accessories", 50.00, 250);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("pearl necklaces", "fashion accessories", 100.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("diamond earrings", "fashion accessories", 200.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("sandals", "shoes", 35.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("platform shoes", "shoes", 50.00, 150);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES("striped t-shirts", "clothing", 20.00, 150);

SELECT * FROM products;