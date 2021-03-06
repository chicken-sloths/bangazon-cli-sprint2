'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');

const _generatePaymentOptions = ({customerAmount}, paymentTypes) => {
  let paymentOptions = [];
  
  for (let i = 0; i < customerAmount; i++) {
    const paymentOption = {
      payment_option_id: i,
      payment_type: paymentTypes[randomInt(paymentTypes.length)].payment_type_id,
      account_number: faker.finance.account(),
      customer_id: randomInt(customerAmount)
    };
    paymentOptions.push(paymentOption);
  }
    return paymentOptions;
};

module.exports = {
  _generatePaymentOptions
};