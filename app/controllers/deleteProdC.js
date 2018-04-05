'use strict';

const prompt = require('prompt');
const promptObj = require('../views/deleteProdV');
const model = require("../models/ProductsM");
const { getActiveCustomer } = require("../controllers/activeCustC");

module.exports.deleteProduct = () => {
  return new Promise((resolve, reject) => {
    console.log('Here is a list of your products:');
    model.getProductsByCreator(getActiveCustomer())
      .then(products => {
        products.map(p => {
          console.log(`\n${p.product_id}. ${p.title}`);
        })
      })
      .catch(err => console.log(err));
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
