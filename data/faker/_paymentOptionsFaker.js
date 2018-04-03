'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');
const paymentTypes = ['Discover', 'American Express', 'Visa', 'Gift Card', 'PayPal', 'MasterCard', 'Bank Transfer', 'Venmo', 'Blood Sacrifice', 'Sexual Favors', 'Ivory Trade', 'Knuckle Sandwich', 'Locket of Meryl Streeps Hair', 'Bitcoin', 'First Born Child', 'Arm and a Leg', 'Good Advice', 'Your Soul', '1 Wish'];
const _generatePaymentOptions = ({customerAmount}) => {
  let paymentOptions = [];
  
  for (let i = 0; i < customerAmount; i++) {
    const paymentOption = {
      payment_option_id: i,
      type: paymentTypes[randomInt(paymentTypes.length)],
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