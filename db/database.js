const sqlite3 = require('sqlite3').verbose();
const path = require('path');
// const { customers } = require('../data/customers');
const makeCustomersTable = require('./makeCustomersTable');
// const { makeProductsTable } = require('./makeProductsTable');
// const { makeOrdersTable } = require('./makeOrdersTable');
// const { makeOptionsTable } = require('./makePaymentOptionsTable');

let db;

const createTables = () =>{
  db.serialize(()=>{
    // call all 4 functions right here.
    makeCustomersTable();
  });
};

(function createDb() {
  // http://stackoverflow.com/questions/27766734/dealing-with-relative-paths-with-node-js
  db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'), createTables); //you will need to create this callback method
}());
