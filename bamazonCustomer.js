let mysql = require("mysql");

let inquirer = require("inquirer");

let connection = mysql.createConnection({



    host: "Localhost",

    user: "root",

    password: "GrandCanyon2019",

    database: "bamazon"
});

connection.connect(function (err) {


    if (err) {

        console.log(err);

        return;
    }

    showAllItems();

    promptUser();

});

function showAllItems() {

    console.log("Welcome to Bamazon! Here are all of the items currently on sale: ");

    connection.query("SELECT item_id, product_name, price FROM products", function (error, results, fields) {

        if (error) {

            console.log(error);

            return;
        }

        for (let i = 0; i < results.length; i++) {

            console.log(results[i].item_id, results[i].product_name, "$" + results[i].price);

        };

    })

};

function promptUser() {



    inquirer.prompt([{
        type: "input",
        name: "ID",
        message: "What is the ID of the product you would like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }

    }, {

        type: "input",
        name: "units",
        message: "How many units of the product would you like to buy?",
        validate: function (value) {
            if (isNaN(value) === false) {
                return true;
            }
            return false;
        }
    }])
        .then(answers => {

            let chosenProductID = answers.ID;

            connection.query("SELECT stock_quantity FROM products WHERE item_id = " + chosenProductID, function (error, results, fields) {

                if (error) {

                    console.log(error);

                    return;
                }

                else {

                    if (results[0].stock_quantity >= answers.units) {

                        let remainingQuantity = results[0].stock_quantity - answers.units;

                        connection.query("UPDATE products SET stock_quantity = " + remainingQuantity, function (error, results, fields) {


                            if (error) {

                                console.log(error);
                                return;
                            }

                            else {

                                connection.query("SELECT price FROM products WHERE item_id = " + answers.ID, function (error, results, fields) {


                                    if (error) {

                                        console.log(error);
                                        return;
                                    }

                                    else {

                                        console.log("Total cost of your purchase: $" + (results[0].price * answers.units))
                                        connection.end();
                                    }



                                })

                            }

                        })

                    }

                    else {

                        console.log("Insufficient quantity!");
                        connection.end();
                    }
                }




            });

        });

}

