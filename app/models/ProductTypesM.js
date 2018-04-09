'use strict';
/**
 * A module that accesses the Products_Types table in the bangazon.sqlite DB
 * @module productTypesModel
 */
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

/**
 * @function getProductTypes
 * @returns {Promise} A promise representing an array of objects; each object has all the product type data for it
 */
module.exports.getProductTypes = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Product_Types`, (err, productTypes) => {
      if (err) return reject(err);
      resolve(productTypes);
    });
  });
};
