'use strict';
// All functions for building Product Data
const OrdersTable = require('./makeOrdersTable'),
      CustomersTable = require('./makeCustomersTable'),
      PaymentTypesTable = require('./makePaymentTypesTable'),
      PaymentOptionsTable = require('./makePaymentOptionsTable'),
      ProductsTable = require('./makeProductsTable'),
      ProductTypesTable = require('./makeProductTypesTable'),
      ProductOrdersTable = require('./makeProductOrdersTable'),
      { generateSqlTable } = require('./sqlRunTemplate');

generateSqlTable(CustomersTable)
generateSqlTable(OrdersTable);
generateSqlTable(PaymentTypesTable);
generateSqlTable(PaymentOptionsTable);
generateSqlTable(ProductTypesTable);
generateSqlTable(ProductsTable);
generateSqlTable(ProductOrdersTable);
