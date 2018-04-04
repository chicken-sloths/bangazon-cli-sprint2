'use strict';

const { generateSqlTable } = require(`../sqlRunTemplate`);
const productOrders = require(`../../data/json/productOrders`);

module.exports = () =>
  generateSqlTable(
    {
      tableName: `Product_Orders`,
      columns:
        `product_order_id INTEGER PRIMARY KEY,
        product_id INT,
        order_id INT,
        FOREIGN KEY (product_id) REFERENCES Products(product_id),
        FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE`,
      dataToIterateOver: productOrders,
      valuesToInsert: [
        `product_order_id`,
        `product_id`,
        `order_id`
      ]
    }
  );

