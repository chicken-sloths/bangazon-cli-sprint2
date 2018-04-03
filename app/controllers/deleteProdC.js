'use strict';

const prompt = require('prompt');
const promptObj = require('../views/deleteProductV');

module.exports.deleteProduct = () => {
  return new Promise((resolve, reject) => {
    console.log('Here is a list of your products:');
    // TODO: display all active customer's products
    prompt.get(promptObj, (err, results) => {
      if (err) return reject(err);
      // TODO: check if product exists
      // TODO: delete the product
      // TODO: return that promise
      console.log('Id of product to delete', results);
      resolve(results);
    })
  });
};
