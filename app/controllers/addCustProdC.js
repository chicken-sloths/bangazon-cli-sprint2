'use strict';

const prompt = require('prompt');
const { addCustProdV } = require('../views/addCustProdV');

module.exports.addCustomerProduct = () => {
  prompt.get(addCustProdV, (err,results) => {
    console.log('product name', results.productName)
    console.log('product price', results.productPrice)
    console.log('product description', results.productDescription)
    console.log('product type', results.productType)
  })
};