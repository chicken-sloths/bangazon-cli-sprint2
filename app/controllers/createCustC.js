'use strict';

const prompt = require('prompt');
const promptObj = require('../views/createCustV');
const {getCustomerByPhoneNumber, addNewCustomer} = require('../models/CustomersM.js')

module.exports.promptNewCustomer = () => {

  return new Promise((resolve, reject) => {

    prompt.get(promptObj, (error, results) => {
      getCustomerByPhoneNumber(results.phone_number)
      .then(data => {
        if(data){
          reject('This customer already exists!');
        } else {
          return addNewCustomer(results);
        }
      })
      .then(id => {
        if(id) resolve (id);
      })
      .catch(error => {
        reject(error);
      });
    });
  });
};
