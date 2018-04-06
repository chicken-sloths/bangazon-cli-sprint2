'use strict';

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');
const { activeCustomer } = require('./activeCustC');
const { getProductTypes } = require('../models/ProductTypesM');
const { createProduct } = require('../models/ProductsM');

module.exports.addCustomerProduct = () => {
  return new Promise( (resolve, reject) => {
    getProductTypes()
    .then( (prodTypes) => {
      console.log('Please select a product category from the list below:');
      prodTypes.map( (pt) => {
        console.log(`${pt.product_type_id}. ${pt.title}`);
      })
      prompt.get(addCustProdV, (err,results) => {
        if (err) return reject(err);
        let newProduct = {
          price: results.productPrice,
          name: results.productName,
          description: results.productDescription,
          productType: results.productType
        };
        console.log('in ctrl', newProduct);
        return createProduct(newProduct)
        .then( (newProd) => {
          console.log(newProd);
        })
        .catch(err => reject(err));
      })
    })
    .catch(err => reject(err));
  })
};

// in this module I need to get the customers input, but in the middle of the prompt I need to list the product types so they can select a product type and then add that input to the new product object