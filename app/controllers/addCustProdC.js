'use strict';

/**
 * A module that connects the Add Customer Product prompt interface to the Product Model
 * Allows the active customer to add a new product to sell
 * @module addCustomerProductController
 */

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');
const { getActiveCustomer } = require('./activeCustC');
const { getProductTypes } = require('../models/ProductTypesM');
const { createProduct } = require('../models/ProductsM');
const { red, green } = require('chalk');

/**
 * @function addCustomerProduct
 * @returns {Promise} 
 * @description Promises to list all product types, then prompt the customer to enter info about their new product, then pass the new product info along to the Products Model
 */

module.exports.addCustomerProduct = () => {
  return new Promise( (resolve, reject) => {
    // presents user with a list of possible product categories to choose from
    getProductTypes()
    .then( (prodTypes) => {
      console.log(green('Please select a product category from the list below:'));
      prodTypes.map( (pt) => {
        console.log(`${pt.product_type_id}. ${pt.title}`);
      })
      // initiates prompt for entering product information
      prompt.get(addCustProdV, (err,results) => {
        if (err) return reject(err);
        let newProduct = {
          id: getActiveCustomer(),
          price: results.productPrice,
          name: results.productName,
          description: results.productDescription,
          productType: results.productType,
          quantity: results.productQuantity
        };
        // sends newProduct object to controller for adding to DB
        return createProduct(newProduct)
        .then( (added) => {
          resolve('Success! Your product has been added.');
        })
        .catch( (err) => {
          reject('Oh No! Something went wrong - your product was not added');
        })
      });
    })
    .catch(err => reject(err));
  })
};
