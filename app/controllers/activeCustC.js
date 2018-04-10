'use strict';	
/**
 * A module that sets and gets the active customer for the Bangazon CLI
 * @module activeCustomerController
 */


const { createPrompt } = require('../views/activeCustV');
const { getAllCustomers } = require('../models/CustomersM');
const prompt = require('prompt');

/** 
 * @constant activeCustomer
 * @type {Object}
 * @default
 * @description Stores the active customer id, which can be accessed in other modules through the the exported function [getActiveCustomer function]{@link getActiveCustomer}
*/
const activeCustomer = {
  id: null
}	

/**
 * @function setActiveId
 * @param {string} customerId accepts the id of the customer to be activated (Prompt returns it as a string, but it's a numerical id)
 * @description Called internally in [setActiveCustomer]{@link function:setActiveCustomer} and sets the id property of [the activeCustomer object]{@link constant:activeCustomer}
 */
const setActiveId = id => {
  activeCustomer.id = id;
}

/**
 * @function getActiveCustomer
 * @returns {string} Returns the customer id, which is stored as a string
 */
module.exports.getActiveCustomer = () => activeCustomer.id;

/**
 * @function setActiveCustomer
 * @returns {Promise} 
 * @description Called in ui.js in option two, promises to a) list all the customers, b) prompt the user for a customer id to activate, and c) set the given customer as active by calling [setActiveId]{@link setActiveId}
 */
module.exports.setActiveCustomer = () => {
  return new Promise ((resolve, reject) => {    
    getAllCustomers()
    .then(customers=>{
      console.log('Here are all the customers:');
      customers.forEach(c=>{
        console.log(c.customer_id, c.first_name, c.last_name);
      });
      prompt.get(createPrompt(customers.length),
        (err, result) => {
          setActiveId(result.custId);
          err ? reject(err) : resolve(`You just selected this customer id: ${result.custId}.`);
        });
    });
  });
};


