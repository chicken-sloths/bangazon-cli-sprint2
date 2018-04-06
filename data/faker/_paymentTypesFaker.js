"use strict";
const paymentTypeNames = ['Discover', 'American Express', 'Visa', 'Gift Card', 'PayPal', 'MasterCard', 'Bank Transfer', 'Venmo', 'Blood Sacrifice', 'Sexual Favors', 'Ivory Trade', 'Knuckle Sandwich', 'Locket of Meryl Streeps Hair', 'Bitcoin', 'First Born Child', 'Arm and a Leg', 'Good Advice', 'Your Soul', '1 Wish'];

const _generatePaymentTypes = () =>{
  let paymentTypes = [];
  for(let i = 0; i < paymentTypes.length; i++){
    paymentTypes.push({
      payment_type_id: i,
      name: paymentTypeNames[i],
    });
  }
}

module.exports = { _generatePaymentTypes };