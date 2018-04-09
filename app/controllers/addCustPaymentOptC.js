const prompt = require('prompt');
const { paymentOptionPrompts } = require('../views/addCustPaymentOptV');
const { addPaymentOption } = require('../models/PaymentOptionsM');
const { getAllPaymentTypes } = require('../models/PaymentTypesM');

module.exports.newPaymentOption = (activeCustomerId) => {
  return new Promise((resolve, reject) => {
    getAllPaymentTypes()
    .then(allPaymentTypes=>{
      allPaymentTypes.forEach(pt=>{
        console.log(pt.payment_type_id, pt.name);
      });
      prompt.get(paymentOptionPrompts,
        (err, result) => {
          if(+result.paymentType>= allPaymentTypes.length || +result.paymentType < 0){
            reject("That is not a valid payment type, ya jabroni!")
          }
          // build an object of payment type and account #
          let paymentOption = {
            payment_type: result.paymentType,
            account_number: result.accountNumber,
            customer_id: activeCustomerId
          }
          err ? reject(err) : resolve(paymentOption);
        });
    });
  });
}

module.exports.saveNewPaymentOption = (paymentOptionObject)=>{
  return new Promise((resolve, reject)=>{
    addPaymentOption(paymentOptionObject)
    .then(paymentOptId=>{
      resolve("Your payment option has been added.");
    })
    .catch(err=>{
      reject(err);
    });
  });
};

