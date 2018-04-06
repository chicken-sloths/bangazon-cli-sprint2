'use strict';

const paymentTypes = require("../data/json/paymentTypes.json");

module.exports =
  {
    tableName: `Payment_Types`,
    columns:
    `payment_type_id INTEGER PRIMARY KEY,
    title TEXT`,
    dataToIterateOver: productTypes,
    valuesToInsert: [
      `payment_type_id`,
      `title`
    ]
  };
