'use strict';

const prompt = require('prompt');
const promptObj = require('../views/addProdToOrderV');
const { getAllProducts } = require('../models/ProductsM');
const { getActiveCustomer } = require('../controllers/activeCustC');
const { checkForActiveOrder } = require('../')

// Promises to print all products and in a numbered list to the terminal
const listAllProds = () => {
  return new Promise((resolve, reject) => {
    getAllProducts()
      .then(products => {
        console.log('Here are all the products:');
        products.forEach((product, i) => {
          console.log(`${i}. ${product.title}`)
        });
      });
  })
}



module.exports.addProductToOrder = () => {
  return new Promise((resolve, reject) => {
    listAllProds()
      .then(() => {
        prompt.get(promptObj, (err, results) => {
          if (err) return reject(err);
          let customerId = getActiveCustomer();
          console.log('should be active customer id', customerId);
          return checkForActiveOrder(customerId);
          // TODO: check if active customer has active order
          // TODO: if not, create new
          // TODO: add product to order
          // TODO: return that promise (resolve/reject based on that promise's results)
          console.log('Id of object to add to order', results);
          resolve(results);
        });

    })
  });
};
