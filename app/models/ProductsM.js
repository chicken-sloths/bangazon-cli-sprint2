"use strict";

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));
const activeCustomer = require("../controllers/activeCustC");

module.exports.createProduct = (product) => {
  console.log('ready to add', product);
  return new Promise((resolve, reject) => {
    let { name, price, description, productType, quantity } = product;
    console.log("name, price, description, productType", name, price, description, productType);
    db.run(`INSERT INTO Products (
      product_id,
      current_price,
      title,
      description,
      product_type_id,
      creator_id,
      creation_date,
      quantity
    ) VALUES (
      null,
      "${price}",
      "${name}",
      "${description}",
      ${productType},
      ${activeCustomer.getActiveCustomer()},
      date('now'),
      ${quantity}
    )`, function (err) {
        if (err) return reject(err);
          resolve(this.lastID);
        });
    });
};

module.exports.getProduct = id => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Products WHERE product_id = ${id}`, (err, data) => {
      if (err) return reject(err);
      data ? resolve(data) : reject(new Error("This product doesn't exist."));
    });
  });
};

module.exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Products`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports.getProductsByCreator = creator_id => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Products WHERE creator_id = ${creator_id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

module.exports.deleteProduct = id => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Products WHERE product_id = ${id}`, function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};

module.exports.getAllStockedProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT
      p.*,
      COUNT(*) as quantity_sold
    FROM Products p
    LEFT JOIN Product_Orders po
      ON po.product_id = p.product_id
    GROUP BY p.product_id
    HAVING p.quantity > quantity_sold`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

// returns number of buyable products with the given id
  // (buyable products = original quantity - number sold)
module.exports.getQuantityRemaining = product_id => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT quantity FROM Products WHERE product_id = ${product_id}`, (err, maxQty) => {
      if (err) return reject(err);
      db.all(`SELECT COUNT(*) as count FROM Product_Orders WHERE product_id = ${product_id}`, (err, data) => {
        if (err) return reject(err);
        resolve(maxQty[0].quantity - data[0].count);
      });
    });
  });
};