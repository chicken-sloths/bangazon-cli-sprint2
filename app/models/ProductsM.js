"use strict";

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));
const activeCustomer = require("../controllers/activeCustC");

module.exports.createProduct = (product) => {
  return new Promise((resolve, reject) => {
    let { name, price, description, productType } = product;
    db.run(`INSERT INTO Products (
      product_id,
      current_price,
      title,
      description,
      product_type_id,
      creator_id
    ) VALUES (
      null,
      "${price}",
      "${name}",
      "${description}",
      ${productType},
      ${activeCustomer.getActiveCustomer().id}
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
      data ? resolve(data) : reject(false);
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
      resolve(id);
    });
  });
};

module.exports.getAllStockedProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Products WHERE quantity > 0`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};