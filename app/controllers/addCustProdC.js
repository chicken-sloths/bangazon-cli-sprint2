'use strict';

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');
const { activeCustomer } = require('./activeCustC');
const { getProductTypes } = require('../models/ProductTypesM');
const { createProduct } = require('../models/ProductsM');
const { red, green } = require('chalk');

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