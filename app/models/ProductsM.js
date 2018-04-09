"use strict";
/**
 * A module that accesses the Products table in the bangazon.sqlite DB
 * @module productsModel
 */

/**
 * This module requires sqlite3
 */
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));

/**
 * @function createProduct
 * @param {object} product - An object containing all responses from the prompt
 * @param {number} product.id - The active customer's id
 * @param {string} product.price - A floating point integer, saved as a string for SQLite's restrictions on data types
 * @param {string} product.name - Name of the product
 * @param {string} product.description - Description of the product
 * @param {number} product.productType - ID of the product type
 * @param {number} product.quantity - Initial quantity of the product
 * @returns {Promise} A promise representing the product_id of the product added to the database
 * @description Adds a new product to the Products table
 */
module.exports.createProduct = (product) => {
  return new Promise((resolve, reject) => {
    let { id, name, price, description, productType, quantity } = product;
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
      ${id},
      date('now'),
      ${quantity}
    )`, function (err) {
        if (err) return reject(err);
          resolve(this.lastID);
        });
    });
};

/**
 * @function getProduct
 * @param {number} id - The product_id
 * @return {Promise} A promise representing an object with all the product data for the given product_id
 * @description Gets all properties of a product based upon the provided ID
 */
module.exports.getProduct = id => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Products WHERE product_id = ${id}`, (err, data) => {
      if (err) return reject(err);
      data ? resolve(data) : reject(new Error("This product doesn't exist."));
    });
  });
};

/**
 * @function getAllProducts
 * @return {Promise} A promise representing an array of objects with all the product data for every product in the Products table
 * @description Gets all products in the Products table
 */
module.exports.getAllProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Products`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

/**
 * @function getProductsByCreator
 * @param {number} creator_id - The ID of the customer whose products are requested
 * @return {Promise} A promise representing an array of objects with all the product data for every product created by the specified customer
 */
module.exports.getProductsByCreator = creator_id => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM Products WHERE creator_id = ${creator_id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
};

/**
 * @function deleteProduct
 * @param {number} id - The ID of the product to be deleted
 * @returns {Promise} A promise representing the number of products deleted from the Products table (should equal 1)
 * @description Deletes the product with the given ID from Products
 */
module.exports.deleteProduct = id => {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM Products WHERE product_id = ${id}`, function(err) {
      if (err) return reject(err);
      resolve(this.changes);
    });
  });
};

/**
 * @function getAllStockedProducts
 * @returns {Promise} A promise representing an array of objects, each containing the data for every stocked product
 * @description Gets all products in the Products table whose quantity is greater than the number of appearances of its ID on the Product_Orders table. In other words, gets products that are still available for purchase
 */
module.exports.getAllStockedProducts = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT
      p.*,
      COUNT(po.order_id) as quantity_sold
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

/**
 * @function getQuantityRemaining
 * @param {number} product_id - The ID of the product whose remaining quantity is requested
 * @returns {Promise} A promise representing a number, i.e., the quantity of products remaining for the given product
 */
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
