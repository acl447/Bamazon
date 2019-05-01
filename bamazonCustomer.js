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

    console.log("connected");

    showAllItems();

    promptUser();
});

function showAllItems() {

    console.log("Welcome to Bamazon! Here are all of the items currently on sale: ");

    connection.query("SELECT item_id, product_name, price FROM bamazon.products", function (error, results, fields) {

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
        message: "What is the ID of the product you would like to buy?"



        //validate:
    }, {

        type: "input",
        name: "units",
        message: "How many units of the product would you like to buy?"
    }])
    .then(answers => {


        console.log(answers.ID, answers.units);
    });

    connection.end();
}

