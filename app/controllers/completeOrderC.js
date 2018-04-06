"use strict";

const prompt = require('prompt'),
  {
    createPrompt
  } = require('../views/completeOrderV'),
  {
    checkForActiveOrder,
    createNewOrder,
    patchPaymentTypeOntoOrder
  } = require('../models/OrdersM'),
  {
    getOrderTotal
  } = require('../models/ProductOrdersM'),
  {
    getPaymentOptionsForCustomer
  } = require('../models/PaymentOptionsM');

module.exports.completeOrder = userId => {
  return new Promise((resolve, reject) => {
    checkForActiveOrder(userId)
      .then(order => {
        if (typeof order === 'undefined') {
          return reject("This customer has no active orders.");
        }
        Promise.all([
          getOrderTotal(order),
          getPaymentOptionsForCustomer(userId)
        ])
          .then(([{ OrderTotal }, paymentOptions]) => {
            if (typeof paymentOptions === 'undefined') {
              return reject('Customer has no payment options.');
            }

            prompt.get(
              createPrompt(OrderTotal, paymentOptions),
              (err, { checkout, paymentOpt }) => {
                if (checkout === 'N') {
                  return resolve('');
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
