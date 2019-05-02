let mysql = require("mysql");

let inquirer = require("inquirer");

let connection = mysql.createConnection({

    host: "Localhost",

    user: "root",

    password: "GrandCanyon2019",

    database: "bamazon"

});

connection.connect(function(err) {

    if (err) {

        console.log(err);
        return;
    }

    inquirer.prompt({

        type: "rawlist",
        name: "menu",
        message: "Please select an option from the menu below.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
    .then(answers => {

        if (answers.menu === "View Products for Sale") {


            connection.query("SELECT item_id, product_name, price, stock_quantity FROM bamazon.products", function (error, results, fields) {

                if (error) {
        
                    console.log(error);
        
                    return;
                }
        
                for (let i = 0; i < results.length; i++) {
        
                    console.log(results[i].item_id, results[i].product_name, "$" + results[i].price, results[i].stock_quantity);
        
                };
        
            })
        }

        else if (answers.menu === "View Low Inventory") {

            connection.query("SELECT product_name FROM bamazon.products WHERE stock_quantity < 5", function (error, results, fields) {

                if (error) {
        
                    console.log(error);
        
                    return;
                }

                console.log("All items with an inventory count lower than five: ");
        
                for (let i = 0; i < results.length; i++) {
        
                    console.log(results[i].product_name);
        
                };
        
            })




        }
    })





})

