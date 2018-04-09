'use strict';
/**
 * A module that accesses the productOrders table in the bangazon.sqlite DB
 * @module productOrdersModel
 */
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

/**
 * @function addToProductOrders
 * @param {number} order_id - ID of the order that the product is being added to the order
 * @param {object} product
 * @param {number} product.product_id - ID of the product that is being added to the order
 * @param {string} product.current_price - Current price of the product
 * @returns {Promise} A promise representing the number of changes to Product_Orders (if successful, should be 1)
 * @description Adds a order to a product by adding a new entry to the Product_Orders table with all the requisite data detailing that relationship. product.current_price saves the price at which the product was actually added to their cart
 */
module.exports.addToProductOrders = (order_id, product) => {
  return new Promise( (resolve, reject) => {
    db.run(`INSERT INTO product_orders
    VALUES(null,  ${product.product_id}, ${order_id}, "${product.current_price}")`,
    function(err) {
      if (err) return reject (err);
      resolve(this.changes);
    })
  })
}

/**
 * @function getOrderTotal
 * @param {object} order
 * @param {number} order_id - ID of the order to be totalled
 * @returns {Promise} A promise representing the total cost of the order as a string
 * @description Sums the prices for each product associated with the given order id
 */
// returns sum of a customers order
module.exports.getOrderTotal = ( { order_id } ) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT SUM(Product_Orders.product_price) AS orderTotal
    FROM Product_Orders
    JOIN Orders ON Orders.order_id = Product_Orders.order_id
    WHERE Orders.order_id = ${order_id}`, function(err, result){
      if (err) return reject (err);
      resolve(result);
    })
  })
}
