'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

// adds the data relationship between products and orders
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

// returns sum of a customers order
module.exports.getOrderTotal = ( { order_id } ) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT SUM(Product_Orders.product_price) AS OrderTotal
    FROM Product_Orders
    JOIN Orders ON Orders.order_id = Product_Orders.order_id
    WHERE Orders.order_id = ${order_id}`, function(err, result){
      if (err) return reject (err);
      resolve(result);
    })
  })
}


