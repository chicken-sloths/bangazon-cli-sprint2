'use strict';
// All functions for building Product Data
const { 
  makeCustomersTable,
  makeOrdersTable,
  makePaymentOptionsTable,
  makeProductOrdersTable,
  makeProductsTable,
  makeProductTypesTable
} = require('./products/index');

makeCustomersTable();
makeOrdersTable();
makePaymentOptionsTable();
makeProductTypesTable();
makeProductsTable();
makeProductOrdersTable();
