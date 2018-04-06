'use strict';

const payment_options = require("../data/json/paymentOptions.json");

module.exports =
  {
    tableName: `Payment_Options`,
    columns:
    `payment_option_id INTEGER PRIMARY KEY,
    payment_type INTEGER,
    account_number TEXT,
    customer_id INTEGER,
    FOREIGN KEY(customer_id) REFERENCES Customers(customer_id),
    FOREIGN KEY(payment_type) REFERENCES Payment_Types(payment_type_id)`,
    dataToIterateOver: payment_options,
    valuesToInsert: [
      `payment_option_id`,
      `type`,
      `account_number`,
      `customer_id`
    ]
  };
