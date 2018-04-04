'use strict';

const productTypes = require("../data/json/productTypes.json");

module.exports =
  {
    tableName: `Product_Types`,
    columns:
    `product_type_id INTEGER PRIMARY KEY,
    title TEXT`,
    dataToIterateOver: productTypes,
    valuesToInsert: [
      `product_type_id`,
      `title`
    ]
  };
