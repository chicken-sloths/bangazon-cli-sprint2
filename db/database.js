const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const makeCustomersTable = require('./makeCustomersTable');
const makePaymentOptionsTable = require('./makePaymentOptionsTable');
const makeOrdersTable = require('./makeOrdersTable');
const makeProductsTable = require('./makeProductsTable');
const makeProductTypesTable = require('./makeProductTypesTable');
const makeProductOrdersTable = require('./makeProductOrdersTable');

const db = new sqlite3.Database('db/bangazon.sqlite');
db.configure('busyTimeout', 1500);
let array = [];
const createTables = () =>{
  makeCustomersTable();
  setTimeout(makePaymentOptionsTable, 2000);
  setTimeout(makeOrdersTable, 4000);
  setTimeout(makeProductTypesTable, 6000);
  setTimeout(makeProductsTable, 8000);
  setTimeout(makeProductOrdersTable, 10000);
};
createTables();
// (function createDb() {
//   // http://stackoverflow.com/questions/27766734/dealing-with-relative-paths-with-node-js
//   db = new sqlite3.Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'), createTables); //you will need to create this callback method
// }());
