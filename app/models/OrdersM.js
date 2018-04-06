const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/bangazon.sqlite');

module.exports.checkForActiveOrder = customer_id => {
  // This will get the order matching the orderId
  // This will be used by #5 and #6 (on the white board)
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

// If a customer HAS an order already that contains products, but that orders payment type
//    is null, then it will add the product to that existing order
// If a customer does not currently have an order (that contains >0 products),
//    then it will create a new order for them
// This function should only be called if a customer has an order with products on it
// but that order does not have a payment_option_id on it
module.exports.patchPaymentTypeOntoOrder = (order, payment_option_id) => {
  // This function will add a payment type to an order using patch-like verb like UPDATE 
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
        resolve(this.changes);
      }
    );
  });
};

// This will INSERT a new order into the Orders table.
// It will be used by #5 (on the white board), adding a product to an order. 

module.exports.createNewOrder = order => {
  // This function will create a new order for a customer wihtout an active order
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
