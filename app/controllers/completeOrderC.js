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

<<<<<<< HEAD
module.exports.completeOrder = userId =>
  new Promise((resolve, reject) =>
    Promise.all([getSingleOrder(userId), getPaymentOptions(userId)])
      .then((orderTotal, paymentOptions) => 
        prompt.get(
          createPrompt(orderTotal, paymentOptions), (err, result) => {
	   resolve(result);
           // patchOrder(paymentOption)
	   // .then(() => resolve())
=======
module.exports.completeOrderPrompt = userId => {
  return new Promise((resolve, reject) => {
    checkForActiveOrder(userId)
      .then(order => {
        if (typeof order === 'undefined') {
          return resolve('Customer has no active orders');
        }

        Promise.all([
          getOrderTotal(order),
          getPaymentOptionsForCustomer(userId)
        ])
        .then(([{OrderTotal}, paymentOptions]) => {
          if (typeof paymentOptions === 'undefined') {
            return resolve('Customer has no payment options');
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
              .then(id => resolve(`Order ${order.order_id} closed`))
              .catch(err => reject(err));
            }
          );
>>>>>>> ba12eced0e303aaa0410e5f6f0710b6d8609078f
        })
        .catch(err => reject(err));
      })
      .catch(err => reject(err));
  });
};
