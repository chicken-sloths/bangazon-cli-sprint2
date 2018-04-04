'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));


// Lists all customers in DB
// Will be called in #3- Select Active Customer
module.exports.getAllCustomers = () => {
  return [{}];
}


// create new customer
// will be called in option #1 - Create Customer Account
// Needs to check for duplicates before it posts
module.exports.addNewCustomer = () => {
  return 100
}
