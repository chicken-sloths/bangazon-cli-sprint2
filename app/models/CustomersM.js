'use strict';
// const { Database } = require('sqlite3').verbose();
// const path = require('path');
// const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("bangazon.sqlite");


module.exports.getAllCustomers = () => {
  return [{}];
  // db.all(`SELECT * FROM Customers`, (customerArray) => {
  //   console.log(customerArray)
  // });
}

