'use strict';

const prompt = require('prompt');
const promptObj = require("../views/createCustV");

module.exports.promptNewCustomer = () => {
  return new Promise((resolve, reject) => {
    prompt.get(promptObj, (err, results) => {
      if (err) return reject(err);
      // TODO: post customer data
      // TODO: return this promise
      console.log('customer data to save', results);
      resolve(results);
    })
  });
};
