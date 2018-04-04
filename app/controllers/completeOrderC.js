"use strict";

const prompt = require('prompt'),
      { createPrompt } = require('../views/completeOrderV'),
      { getSingleOrder, patchOrder } = require('../models/OrdersM'),
      { getPaymentOptions } = require('../models/PaymentOptionsM');

module.exports.completeOrderPrompt = userId =>
  new Promise((resolve, reject) =>
    Promise.all([getSingleOrder(userId), getPaymentOptions(userId)])
      .then((orderTotal, paymentOptions) => 
        prompt.get(
          createPrompt(orderTotal, paymentOptions), (err, result) => {
	   resolve(result);
           // patchOrder(paymentOption)
	   // .then(() => resolve())
        })
      )
      .catch(err => reject(err))
  );
