'use strict';	
const { createPrompt } = require('../views/activeCustV');
const { getAllCustomers } = require('../models/CustomersM');
const prompt = require('prompt');


const activeCustomer = {
  id: null
}	

const setActiveId = id => {
  activeCustomer.id = id;
}

module.exports.getActiveCustomer = () => activeCustomer.id;

module.exports.setActiveCustomer = () => {
  return new Promise ((resolve, reject) => {    
    getAllCustomers()
    .then(customers=>{
      console.log('Here are all the customers:');
      customers.forEach(c=>{
        console.log(c.customer_id, c.first_name, c.last_name);
      });
      console.log('customers.length', customers.length);
      prompt.get(createPrompt(customers.length),
        (err, result) => {
          setActiveId(result.custId);
          err ? reject(err) : resolve(`You just selected this customer id: ${result.custId}.`);
        });
    });
  });
};


