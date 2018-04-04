'use strict';

const { generateSqlTable } = require("../sqlRunTemplate");
const payment_options = require("../../data/json/paymentOptions.json");

module.exports = () => {
  generateSqlTable(
    {
      tableName: `Payment_Options`,
      columns:
      `payment_option_id INTEGER PRIMARY KEY,
      type TEXT,
      account_number TEXT,
      customer_id INTEGER,
      FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)`,
      dataToIterateOver: payment_options,
      valuesToInsert: [
        `payment_option_id`,
        `type`,
        `account_number`,
        `customer_id`
      ]
    }
  );
}