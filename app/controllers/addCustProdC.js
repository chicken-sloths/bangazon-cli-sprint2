'use strict';

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');
const { activeCustomer } = require('./activeCustC');

module.exports.addCustomerProduct = () => {
  prompt.get(addCustProdV, (err,results) => {
    // Get customer ID
    // console.log(activeCustomer.id);
    // Then the user should be prompted to enter in all appropriate information for a product
    let newProduct = {
      price: results.productPrice,
      name: results.productName,
      description: results.productDescription,
      productType: results.productType
    };
    console.log(newProduct);
    // And when complete, the product should be added for the active customer
  })
};