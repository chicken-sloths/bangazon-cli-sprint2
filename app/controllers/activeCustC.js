'use strict';	
const { activeCustomerPrompt } = require('../views/activeCustV');
const prompt = require('prompt');

const activeCustomer = {
  id: null
}	

const setActiveId = id => {
  activeCustomer.id = id;
}

module.exports.getActiveCustomer = () => activeCustomer;

module.exports.setActiveCustomer = () => {
  return new Promise ((resolve, reject) => {

    console.log('Here are all the customers:');
    console.log('pretend like this is a long list of customers.');

    prompt.get(activeCustomerPrompt,
    (err, result) => {
      setActiveId(result.custId);
      err ? reject(err) : resolve(result.custId);
    });
  });
};