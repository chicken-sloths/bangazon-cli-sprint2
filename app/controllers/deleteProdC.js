'use strict';

const prompt = require('prompt');
const { createDeletePrompt } = require('../views/deleteProdV');
const {
  getProductsByCreator,
  updateProduct,
  deleteProduct
} = require("../models/ProductsM");
const { getActiveCustomer } = require("../controllers/activeCustC");
const { red, magenta, blue } = require('chalk');

module.exports.deleteProduct = () => {
  return new Promise((resolve, reject) => {
    getProductsByCreator(getActiveCustomer())
      .then(products => {
        console.log('Here is a list of your products:');

        if (products.length == 0) reject("This customer has no products.");

        products.map(p => {
          console.log(`${p.product_id}. ${p.title}`);
        });

        const validIds = products.map(({product_id}) => product_id);

        prompt.get(createDeletePrompt(validIds), (err, {objectId}) => {
          if (err) return reject(err);

          const productToCheck = products.find(({product_id}) => product_id === objectId);
          const canDelete = productToCheck.quantity_sold === 0 ? true : false;

          if (canDelete) {
            deleteProduct(objectId)
              .then(changes =>
                changes ? resolve("Successfully removed product from available products") : reject("Something went wrong. Product not successfully removed")
            )
            .catch(err => reject(err));
          } else {
            productToCheck.quantity = productToCheck.quantity_sold;

            updateProduct(objectId, productToCheck)
            .then(changes =>
              changes ? resolve("Successfully removed product from available products") : reject("Something went wrong. Product not successfully removed")
            )
            .catch(err => reject(err));
          }

        });
      })
      .catch(err => reject(err));
  });
};
