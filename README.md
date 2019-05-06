# Bamazon

Bamazon is an Amazon-like storefront with a customer view and a manager view. As a customer, you can order items and deplete stock from the store's inventory. As a manager, you can view all products in stock or those low in inventory, add more of an item in stock, or add a new product to the inventory. 

To use the Bamazon app, first clone the project to your computer.

Then, in the project folder, be sure to install the required packages by typing "npm install" in your terminal/bash window.

Then, in your terminal/bash window:

To start the app as a customer, type "node bamazonCustomer.js". You will see a list of all items in stock:






Follow the prompts to order an item and see the total cost of your purchase: 






To start the app as a manager, type "node bamazonManager.js". You will see a set of menu options: 




If you select "View Products for Sale", you will see a list of every available item -- the item IDs, names, prices, and quantities in stock:




If you select "View Low Inventory", you will see a list of all items with an inventory count lower than five:




If you select "Add to Inventory", follow the prompts to add more of any item currently in the store:





If you select "Add New Product", follow the prompts to add a completely new product to the store:
