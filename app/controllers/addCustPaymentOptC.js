const prompt = require('prompt');
const { paymentOptionPrompts } = require('../views/addCustPaymentOptV');
const { paymentTypes } = require('../../data/faker/_paymentOptionsFaker');


module.exports.promptNewPaymentOption = () => {
  return new Promise((resolve, reject) => {
    
    paymentTypes.forEach((pt, index)=>{
      console.log(index, pt);
    });
    prompt.get(paymentOptionPrompts,
      (err, result) => {
        // build an object of payment type and account #
        let paymentOption = {
          type: result.paymentType,
          account_number: result.accountNumber,
          customer_id: 'this will be an active cust id'
        }
        err ? reject(err) : resolve(paymentOption);
      })
  })
}

// FOR REFERENCE: this is what the payment option object will look like when it eventually gets sent to the DB
// {
//   "payment_option_id": 0,
//   "type": "withdrawal",
//   "account_number": "12556622",
//   "customer_id": 1
// }
