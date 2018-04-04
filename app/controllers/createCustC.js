'use strict';

const prompt = require('prompt');
const promptObj = require('../views/createCustV');
const {getCustomerByPhoneNumber, addNewCustomer} = require('../models/CustomersM.js')

module.exports.promptNewCustomer = () => {
  return new Promise((resolve, reject) => {
    prompt.get(promptObj, (err, results) => {
      if (err) return reject(err);
      getCustomerByPhoneNumber(results.phone_number)
      .then(data => {
        if(data){
          return console.log('Sorry, this customer already exists!');
          // go back to the main menu?
        } else {
          return addNewCustomer(results);
        }
      })
      .then(id => {
        if(id) console.log(`Congrats! You just added a customer with the id of ${id}`)    
      })
    })
  });
};
