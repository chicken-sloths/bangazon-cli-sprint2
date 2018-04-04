"use strict";

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));

module.exports.createProduct = (product) => {
  return new Promise((resolve, reject) => {
    if (product) {
      let { name, price, description, productType } = product;
      if (name && price && description && productType) {
        resolve({});
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