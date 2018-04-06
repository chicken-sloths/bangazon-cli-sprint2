'use strict';

const prompt = require('prompt');
const promptObj = require('../views/deleteProdV');
const model = require("../models/ProductsM");
const { getActiveCustomer } = require("../controllers/activeCustC");
const { red, magenta, blue } = require('chalk');

module.exports.deleteProduct = () => {
  return new Promise((resolve, reject) => {
    model.getProductsByCreator(getActiveCustomer())
      .then(products => {
        console.log('Here is a list of your products:');
        if (products.length == 0) reject("This customer has no products.");
        products.map(p => {
          console.log(`${p.product_id}. ${p.title}`);
        });
        prompt.get(promptObj, (err, data) => {
          if (err) return reject(err);
          model.getProduct(data.objectId)
            .then(product => {
              if (product && product.creator_id == getActiveCustomer()) {
                return model.deleteProduct(product.product_id);
              } else {
                reject("This product doesn't belong to you.");
              }
            })
            .then(changed => {
              changed ? resolve("You have successfully deleted the product.") : reject("Something went wrong. This product was not deleted.");
            })
            .catch(err => reject(err));
        });
      })
      .catch(err => reject(err));
  });
};
