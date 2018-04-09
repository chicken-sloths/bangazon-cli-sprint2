"use strict";

// This is where we'll store all of our paymentTypes.
// If we ever need to add/remove one, do it directly in this array
const paymentTypeNames = ['Discover', 'American Express', 'Visa', 'Gift Card', 'PayPal', 'MasterCard', 'Bank Transfer', 'Venmo', 'Blood Sacrifice', 'Sexual Favors', 'Ivory Trade', 'Knuckle Sandwich', 'Locket of Meryl Streeps Hair', 'Bitcoin', 'First Born Child', 'Arm and a Leg', 'Good Advice', 'Your Soul', '1 Wish'];

const _generatePaymentTypes = () =>{
  let paymentTypes = [];
  for(let i = 0; i < paymentTypeNames.length; i++){
    paymentTypes.push({
      payment_type_id: i,
      name: paymentTypeNames[i],
    });
  }
  return paymentTypes;
}

module.exports = { _generatePaymentTypes };