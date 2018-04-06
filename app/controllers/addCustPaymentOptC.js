const prompt = require('prompt');
const { paymentOptionPrompts } = require('../views/addCustPaymentOptV');
const { addPaymentOption } = require('../models/PaymentOptionsM');
const paymentTypes = ['Discover', 'American Express', 'Visa', 'Gift Card', 'PayPal', 'MasterCard', 'Bank Transfer', 'Venmo', 'Blood Sacrifice', 'Sexual Favors', 'Ivory Trade', 'Knuckle Sandwich', 'Locket of Meryl Streeps Hair', 'Bitcoin', 'First Born Child', 'Arm and a Leg', 'Good Advice', 'Your Soul', '1 Wish'];

module.exports.promptNewPaymentOption = activeCustomerId => {
  return new Promise((resolve, reject) => {
    
    paymentTypes.forEach((pt, index)=>{
      console.log(index, pt);
    });

    prompt.get(paymentOptionPrompts,
      (err, result) => {
        // build an object of payment type and account #
        let paymentOption = {
          type: paymentTypes[result.paymentType],
          account_number: result.accountNumber,
          customer_id: activeCustomerId
        }
        err ? reject(err) : resolve(paymentOption);
      })
  })
}

module.exports.saveNewPaymentOption = (paymentOptionObject)=>{
  return new Promise((resolve, reject)=>{
    addPaymentOption(paymentOptionObject)
    .then(paymentOptId=>{
      resolve(paymentOptId);
    })
    .catch(err=>{
      reject(err);
    });
  });
};
// FOR REFERENCE: this is what the payment option object will look like when it eventually gets sent to the DB
// {
//   "payment_option_id": 0,
//   "type": "withdrawal",
//   "account_number": "12556622",
//   "customer_id": 1
// }
