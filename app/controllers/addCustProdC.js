'use strict';

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');
const { activeCustomer } = require('./activeCustC');

module.exports.addCustomerProduct = () => {
  prompt.get(addCustProdV, (err,results) => {
    // Get customer ID
    console.log(activeCustomer());
    // Then the user should be prompted to enter in all appropriate information for a product
    console.log('product name', results.productName)
    console.log('product price', results.productPrice)
    console.log('product description', results.productDescription)
    console.log('product type', results.productType)
    // And when complete, the product should be added for the active customer
  })
};