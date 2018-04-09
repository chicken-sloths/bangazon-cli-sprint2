'use strict';

/**
 * A module that accesses the Orders table in the bangazon.sqlite DB
 * @module ordersModel
 */
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

/**
 * @function checkForActiveOrder
 * @param {number} customer_id - The customer ID of the customer whose active order status is requested
 * @returns {Promise} A promise representing an object containing all the properties of the currently active order. An empty object if no active order
 * @description Checks Orders for any orders with the given customer_id & which have not had a payment option added to the order (meaning the order is still active)
 */
module.exports.checkForActiveOrder = customer_id => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT *
        FROM Orders
        WHERE customer_id = ${customer_id}
        AND payment_option_id IS null;
        `,
      (err, order) => {
        if (err) {
          reject(err);
        } else {
          resolve(order);
        }
      }
    );
  });
};

/**
 * @function patchPaymentTypeOntoOrder
 * @param {object} order - Contains all properties: order_id, customer_id & creation_date
 * @param {number} payment_option_id - The ID of the payment option to be added to the order (thus closing it)
 * @returns {Promise} A promise representing the number of changes made to the Orders table (1 if successful)
 * @description Changes the payment_option_id on an order from null to the specified ID, thus making the order 'closed'. NOTE: If the customer has no active orders, this will create a new order for the customer
 */
module.exports.patchPaymentTypeOntoOrder = (order, payment_option_id) => {
  return new Promise((resolve, reject) => {
    db.run(
      `REPLACE INTO Orders (
        order_id,
        customer_id,
        payment_option_id,
        creation_date
      )
      VALUES (
        ${order.order_id},
        ${order.customer_id},
        ${payment_option_id},
        "${order.creation_date}"
      )`,
      function (err) {
        if (err) return reject(err);
        resolve(this.changes);
      }
    );
  });
};

/**
 * @function createNewOrder
 * @param {object} order
 * @param {number} order.customer_id - Customer's ID
 * @param {number} order.payment_option_id - will be null
 * @param {string} order.creation_date - Date, in ISO format, of the order's creation
 * @returns {Promise} A promise representing the ID of the order after its successful addition to the Orders table
 * @description Creates a new, empty & active order for a customer to be able to add products to
 */
module.exports.createNewOrder = order => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO Orders(
        order_id,
        customer_id,
        payment_option_id,
        creation_date
      )
      VALUES (
        ${null},
        ${order.customer_id},
        ${order.payment_option_id},
        '${order.creation_date}'
      )`,
      function (err) {
        resolve(this.lastID);
      }
    );
  });
};
