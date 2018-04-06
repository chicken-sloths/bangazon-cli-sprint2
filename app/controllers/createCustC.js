'use strict';

const prompt = require('prompt');
const promptObj = require('../views/createCustV');
const { getCustomerByPhoneNumber, addNewCustomer } = require('../models/CustomersM.js')

module.exports.newCustomer = () => {
  return new Promise((resolve, reject) => {
    prompt.get(promptObj, (error, customerObj) => {
      getCustomerByPhoneNumber(customerObj.phone_number)
        .then(data => {
          if (data) {
            reject('This customer already exists!');
          } else {
            return addNewCustomer(customerObj);
          }
        })
        .then(id => resolve(`You just added a customer with the id of ${id}!`))
        .catch(err => reject('We couldn\'t add that customer, sorry!'));
    });
  });
};
