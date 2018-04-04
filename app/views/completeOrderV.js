"use strict";

const prompt = require('prompt');

module.exports.createPrompt = (total, opts) => {
//  TODO: addCustPaymentOptC calls PaymentOptionsM & OrdersM, which pass in values to this fn.
//  these variables can't be defined until those models are completed
//
 const checkoutMsg = `Your order total is $${total}. Ready to purchase?\n(Y/N)`;
 const optionsMsg = opts.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n');
 const optionsRegEx = new RegExp(`^[1-${opts.length}]$`);

  const checkoutPrompt = [
    {
      name: "checkout",
      description: checkoutMsg,
      message: "Please enter Y or N",
      pattern: /^[NY]$/,
      required: true
    },
    {
      name: "paymentOpt",
      description: `Choose a payment option:\n${optionsMsg}`,
      pattern: optionsRegEx,
      required: true,
      ask: function () {
	       return prompt.history('checkout').value === 'Y'
      }
    }
  ];

  return checkoutPrompt;
}
