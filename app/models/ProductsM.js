"use strict";

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));
const activeCustomer = require("../controllers/activeCustC");

module.exports.createProduct = (product) => {
  return new Promise((resolve, reject) => {
    if (product) {
      let { name, price, description, productType } = product;
      if (name && price && description && productType) {
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
        )`, function(err) {
          if (err) return reject(err);
          resolve(this.lastID);
        });
      } else {
        let err = new Error("Please provide a name, price, description, and productType.");
        reject(err);
      }
    } else {
      let err = new Error("Please provide a name, price, description, and productType.");
      reject(err);
    }
  });
};