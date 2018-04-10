'use strict';

/**
 * A module that connects the Customer Payment Option prompt interface to the Payment Option Model
 * and allows users to add a new payment option for the active customer
 * @module addCustomerPaymentOptionController
 */

const prompt = require('prompt');
const { paymentOptionPrompts } = require('../views/addCustPaymentOptV');
const {
  addPaymentOption,
  getPaymentOptionsForCustomer
} = require('../models/PaymentOptionsM');
const { getAllPaymentTypes } = require('../models/PaymentTypesM');
const { getActiveCustomer } = require('./activeCustC');

/**
 * @function newPaymentOption
 * @returns {Promise} 
 * @description Promises to list all payment types, prompt the user to create a new payment option, and then send their new payment option to the Payment Option Module
 */

module.exports.newPaymentOption = () => {
  return new Promise((resolve, reject) => {
    getAllPaymentTypes()
    .then(paymentTypes=>{
      paymentTypes.forEach(pt=>{
        console.log(pt.payment_type_id, pt.name);
      });

      prompt.get(paymentOptionPrompts(paymentTypes),
        (err, {paymentType, accountNumber}) => {
          if (err) return reject(err);
          // build an object of payment type and account #
          const paymentOption = {
            payment_type: paymentType,
            account_number: accountNumber,
            customer_id: getActiveCustomer()
          };

          getPaymentOptionsForCustomer(paymentOption.customer_id)
            .then(options => {
              if (payOptCheck(options, +paymentType)) {
                return reject("Customer already has a payment type of that kind");
              }
              return addPaymentOption(paymentOption)
            })
            .then(paymentOptId => {
              resolve("Your payment option has been added.");
            })
            .catch(err => reject(err));
        });
    });
  });
};


/**
 * @function payOptCheck
 * @returns {Boolean} 
 * @description Checks that the customer doesn't already have a payment option of the same type (i.e. they can't have two Visa payment options)
 */

const payOptCheck = (array, check) =>
  array.find(({payment_type}) => payment_type === check);
