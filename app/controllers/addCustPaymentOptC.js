const prompt = require('prompt');
const { paymentOptionPrompts } = require('../views/addCustPaymentOptV');
const {
  addPaymentOption,
  getPaymentOptionsForCustomer
} = require('../models/PaymentOptionsM');
const { getAllPaymentTypes } = require('../models/PaymentTypesM');
const { getActiveCustomer } = require('./activeCustC');

module.exports.newPaymentOption = () => {
  return new Promise((resolve, reject) => {
    getAllPaymentTypes()
    .then(paymentTypes=>{
      paymentTypes.forEach(pt=>{
        console.log(pt.payment_type_id, pt.name);
      });

      prompt.get(paymentOptionPrompts(allPaymentTypes),
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

// Checks that customer does not have a payment type of the kind
// input already. E.g., customer can't have two 'Visa' payment options
const payOptCheck = (array, check) =>
  array.find(({payment_type}) => payment_type === check);
