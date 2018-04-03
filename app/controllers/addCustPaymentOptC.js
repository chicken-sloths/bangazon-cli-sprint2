const prompt = require('prompt');
const { paymentOptionPrompts } = require('../views/addCustPaymentOptV');

module.exports.promptNewPaymentOption = () => {
  prompt.get(paymentOptionPrompts, 
    (err, result) => {
      // build an object of payment type and account #
      let paymentOption = {
        type: result.paymentType,
        account_number: result.account_number,
        customer_id: 'this will be an active cust id'
      }

      err ? reject(err) : resolve(paymentOption);
  })
}

// FOR REFERENCE: this is what the payment option object will look like when it eventually gets sent to the DB
// {
//   "payment_option_id": 0,
//   "type": "withdrawal",
//   "account_number": "12556622",
//   "customer_id": 1
// }