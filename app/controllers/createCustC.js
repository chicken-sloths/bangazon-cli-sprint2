'use strict';

const prompt = require('prompt');
const { createCustV } = require('../views/createCustV');

module.exports.promptNewCustomer = () => {
  return new Promise( (resolve, reject) => {
    prompt.get(createCustV, function(err, results) {
      if (err) return reject(err);
      resolve(results);
    })
  });
};
