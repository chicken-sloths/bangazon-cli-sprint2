'use strict';

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');
const { activeCustomer } = require('./activeCustC');

module.exports.addCustomerProduct = () => {
  prompt.get(addCustProdV, (err,results) => {
    // Get customer ID
    // console.log(activeCustomer.id);
    // Then the user should be prompted to enter in all appropriate information for a product (customer is displayed with list of their own product types)
    let newProduct = {
      price: results.productPrice,
      name: results.productName,
      description: results.productDescription,
      product_type_id: results.productType,
      productType: results.productType
    };
    console.log(newProduct);
    // And when complete, the product should be added for the active customer
  })
};

// in this module I need to get the customers input, but in the middle of the prompt I need to list the product types so they can select a product type and then add that input to the new product object