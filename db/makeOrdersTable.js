'use strict';

const orders = require("../data/json/orders.json");

module.exports =
  {
    tableName: `Orders`,
    columns:
      `order_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      payment_option_id INTEGER,
      creation_date TEXT,
      FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY(payment_option_id) REFERENCES payment_options(payment_option_id)`,
    dataToIterateOver: orders,
    valuesToInsert: [
      `order_id`,
      `customer_id`,
      `payment_option_id`,
      `creation_date`
    ]
  };
