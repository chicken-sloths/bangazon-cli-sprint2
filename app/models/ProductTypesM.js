'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

module.exports.getProductTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Product_Types`, (err, productTypes) => {
      if (err) return reject(err);
      console.log(productTypes);
      resolve(productTypes);
    });
  });
};