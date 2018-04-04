'use strict';
const products = require("../data/json/products.json");

module.exports =
  {
    tableName: `Products`,
    columns:
      `product_id INTEGER PRIMARY KEY,
      current_price TEXT,
      title TEXT,
      description TEXT,
      product_type_id INTEGER,
      creator_id INTEGER,
      creation_date TEXT,
      FOREIGN KEY (product_type_id) REFERENCES Product_Types(product_type_id),
      FOREIGN KEY (creator_id) REFERENCES Customers(customer_id)`,
    dataToIterateOver: products,
    valuesToInsert: [
      `product_id`,
      `current_price`,
      `title`,
      `description`,
      `product_type_id`,
      `creator_id`,
      `creation_date`
    ]
  };
