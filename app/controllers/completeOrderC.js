'use strict';
/**
 * A module that guides the user interaction for order completion.
 * @module completeOrderController
 */

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

/**
 * @function completeOrder
 * @returns {Promise} A promise that represents the successful completion and update of an order in the database.
 * @description Confirms the customer's willingness to pay the order total and updates the payment type of an active order, completing it.
 */
module.exports.completeOrder = () => {
  return new Promise((resolve, reject) => {
    let userId = getActiveCustomer();
    checkForActiveOrder(userId)
      .then(order => {
        if (!order) return reject('This customer has no active orders.');
        Promise.all([
          getOrderTotal(order),
          getPaymentOptionsForCustomer(userId)
        ])
        .then(([{ orderTotal }, paymentOptions]) => {
          if (!paymentOptions || paymentOptions.length == 0) {
            return reject('Customer has no payment options.');
          }
          console.log(paymentOptions);

          prompt.get(
            createPrompt(orderTotal, paymentOptions),
            (err, { checkout, paymentOpt }) => {
              if (err) return reject(err);
              if (checkout === 'N' || checkout === 'n') {
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
      .catch(err => reject('This customer has no active orders.'));
  });
};
