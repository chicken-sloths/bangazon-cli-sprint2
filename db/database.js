const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const makeCustomersTable = require('./makeCustomersTable');
const makePaymentOptionsTable = require('./makePaymentOptionsTable');
const makeOrdersTable = require('./makeOrdersTable');
// const makeProductsTable = require('./makeProductsTable');

let db;

const createTables = () =>{
  db.serialize(()=>{
    // call all 4 functions right here.
    makeCustomersTable();
    makePaymentOptionsTable();
    makeOrdersTable();
  });
};

(function createDb() {
  // http://stackoverflow.com/questions/27766734/dealing-with-relative-paths-with-node-js
  db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'), createTables); //you will need to create this callback method
}());
