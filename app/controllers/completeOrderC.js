"use strict";

const prompt = require('prompt'),
      { createPrompt } = require('../views/completeOrderV'),
      { getSingleOrder, patchOrder } = require('../models/OrdersM'),
      //{ getOrderTotal } = require('../models/ProductOrdersM'),
      { getPaymentOptionsForCustomer } = require('../models/PaymentOptionsM');

module.exports.completeOrderPrompt = userId =>
  new Promise((resolve, reject) =>
    checkForActiveOrder(userId)
      .then(order => {
	if (typeof order === 'undefined') resolve('Customer has no active orders');
	return Promise.all([
	  getOrderTotal(order),
	  getPaymentOptionsForCustomer(userId)
	]);
      })
      .then(orderTotal => {
	getPaymentOptionsForCustomer(userId)
	.then(paymentOptions => {
	  prompt.get(createPrompt(orderTotal, paymentOptions), 
	    (err, result) => {
	      resolve(result);
             // patchOrder(paymentOption)
	     // .then(() => resolve())
            }
	  )  	  
	})
	.catch(err => reject(err));
      })
      .catch(err => reject(err))
  );
