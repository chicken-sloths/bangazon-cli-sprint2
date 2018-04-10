'use strict';
/**
 * A module that guides the user interaction for new customer creation.
 * @module createCustomerController
 */

const prompt = require('prompt');
const promptObj = require('../views/createCustV');
const { getCustomerByPhoneNumber, addNewCustomer } = require('../models/CustomersM.js')

/**
 * @function newCustomer
 * @returns {Promise} A promise that represents the successful construction and insertion into the database of a new customer.
 * @description Creates a new customer based on the results of the promptObj required from the view.
 */
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
