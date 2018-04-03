'use strict';

const prompt = require('prompt');
const promptObj = require("../views/addProdToOrderV");

module.exports.addProductToOrder = () => {
  return new Promise((resolve, reject) => {
    console.log("Here are all the products:");
    // TODO: get all Products
    prompt.get(promptObj, (err, results) => {
      if (err) return reject(err);
      // TODO: check if active customer has active order
      // TODO: if not, create new
      // TODO: add product to order
      // TODO: return that promise (resolve/reject based on that promise's results)
      console.log("Id of object to add to order", results);
      resolve(results);
    });
  });
};
