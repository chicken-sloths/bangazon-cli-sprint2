
"use strict";

const prompt = require('prompt'),
  { createPrompt } = require('../views/completeOrderV'),
  {
    checkForActiveOrder,
    createNewOrder,
    patchPaymentTypeOntoOrder
  } = require('../models/OrdersM'),
  { getOrderTotal } = require('../models/ProductOrdersM'),
  { getPaymentOptionsForCustomer } = require('../models/PaymentOptionsM'),
  { getActiveCustomer } = require('./activeCustC');

module.exports.completeOrder = () => {
  return new Promise((resolve, reject) => {
    let userId = getActiveCustomer();
    checkForActiveOrder(userId)
      .then(order => {
        Promise.all([
          getOrderTotal(order),
          getPaymentOptionsForCustomer(userId)
        ])
          .then(([{ OrderTotal }, paymentOptions]) => {
            if (!paymentOptions || paymentOptions.length == 0) {
              return reject('Customer has no payment options.');
            }

            prompt.get(
              createPrompt(OrderTotal, paymentOptions),
              (err, { checkout, paymentOpt }) => {
                if (err) return reject(err);
                if (checkout === 'N') {
                  return resolve(`Order not completed.`);
                }

                patchPaymentTypeOntoOrder(
                  order,
                  paymentOptions[paymentOpt - 1].payment_option_id
                )
                  .then(id => resolve(`Order ${order.order_id} closed.`))
                  .catch(err => reject(err));
              }
            );
          })
          .catch(err => reject(err));
      })
      .catch(err => reject("This customer has no active orders."));
  });
};
