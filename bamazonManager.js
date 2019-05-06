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

    else {

        listOptions();



    }

});



function listOptions() {


    inquirer.prompt({

        type: "rawlist",
        name: "menu",
        message: "Please select an option from the menu below.",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    })
        .then(answers => {

            if (answers.menu === "View Products for Sale") {

                viewProducts();
                connection.end();

            }

            else if (answers.menu === "View Low Inventory") {

                viewLowInventory();
                connection.end();



            }

            else if (answers.menu === "Add to Inventory") {


                addToInventory();


            }

            else {

                addNewProduct();
            }

        })
};

function viewProducts() {


    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (error, results, fields) {

        if (error) {

            console.log(error);

            return;
        }

        for (let i = 0; i < results.length; i++) {

            console.log(results[i].item_id, results[i].product_name, "$" + results[i].price, results[i].stock_quantity);

        };

    })
};

function viewLowInventory() {



    connection.query("SELECT product_name FROM products WHERE stock_quantity < 5", function (error, results, fields) {

        if (error) {

            console.log(error);

            return;
        }



        else {

            if (results.length === 0) {

                console.log("There are no items in stock with an inventory count lower than five.")
            }

            else {
                console.log("All items with an inventory count lower than five: ");
                for (let i = 0; i < results.length; i++) {

                    console.log(results[i].product_name);

                }
            }

        }

    })




};

function addToInventory() {

    inquirer.prompt({
        type: "rawlist",
        name: "product_list",
        message: "Please select an item from the list below and remember its ID number.",
        choices: ["cool shades", "sneakers", "tanktops", "jeans", "purses", "pearl necklaces", "diamond earrings", "sandals", "platform shoes", "striped t-shirts"]
    })
        .then(answers => {

            let chosenItem = answers.product_list;

            inquirer.prompt([
                {

                    type: "input",
                    name: "itemID",
                    message: "Please enter the ID number of your chosen item."


                },


                {

                    type: "input",
                    name: "add",
                    message: "Please enter the number of " + answers.product_list + " you would like to add."

                }])

                .then(answers => {

                    let chosenID = answers.itemID;

                    let numberToAdd = answers.add;

                    connection.query("SELECT stock_quantity FROM products WHERE item_id = " + chosenID, function (error, results, fields) {


                        if (error) {

                            console.log(error);
                            return;
                        }

                        else {

                            let newStockQuantity = results[0].stock_quantity + parseInt(numberToAdd);

                            connection.query("UPDATE products SET stock_quantity = " + newStockQuantity + " WHERE item_id = " + chosenID, function (error, results, fields) {

                                if (error) {

                                    console.log(error);
                                    return;
                                }

                                else {

                                    connection.query("SELECT stock_quantity FROM products WHERE item_id = " + chosenID, function (error, results, fields) {

                                        if (error) {

                                            console.log(error);
                                            return;
                                        }

                                        else {

                                            console.log("Updated stock quantity of this item: " + results[0].stock_quantity);
                                            connection.end();
                                        }


                                    })
                                }





                            });

                        }




                    })


                })
        })
};

function addNewProduct() {

    inquirer.prompt([{

        type: "input",
        name: "newName",
        message: "Please enter the new product's name."



    },
    {

        type: "input",
        name: "newDept",
        message: "Please enter the product's department name."
    },
    {
        type: "input",
        name: "newPrice",
        message: "Please enter the product's price, with no dollar sign and no more than 2 digits after the decimal point."

    },
    {
        type: "input",
        name: "initialQuantity",
        message: "Please enter the product's stock quantity."
    }
    ])
        .then(answers => {

            connection.query("INSERT INTO products SET ?", {product_name: answers.newName, department_name: answers.newDept, 
            price: answers.newPrice, stock_quantity: answers.initialQuantity}, function(error, results, fields) {

                if (error) {

                    console.log(error);
                    return;
                }

                else {

                    let newProductID = results.insertId;

                    connection.query("SELECT * FROM products WHERE item_id = " + newProductID, function(error, results, fields) {

                        if (error) {

                            console.log(error);
                            return;
                        }

                        else {

                            console.log("Your new product has been added. \nID number: " + results[0].item_id + "\nProduct name: " + 
                            results[0].product_name + "\nDepartment name: " + results[0].department_name + "\nPrice: $" + results[0].price + 
                            "\nStock quantity: " + results[0].stock_quantity); 

                            connection.end();
                        }



                    }) 
                }




            }) 

        })



    



};


