"use strict";

const prompt = require('prompt'),
  { green } = require('colors');

module.exports.createPrompt = (total, opts) => {
  const checkoutMsg = `Your order total is ${green('$' + total)}. Ready to purchase?\n(Y/N)`;
  const optionsMsg = opts.map((opt, idx) => `${idx + 1}. ${opt.name}`).join('\n');
  const optionsRegEx = new RegExp(`^[1-${opts.length}]$`);

  const checkoutPrompt = [
    {
      name: "checkout",
      description: checkoutMsg,
      message: "Please enter Y or N",
      pattern: /^[NY]$/i,
      required: true
    },
    {
      name: "paymentOpt",
      description: `\nAvailable Payment Options:\n${optionsMsg}\nChoose a payment option:`,
      pattern: optionsRegEx,
      required: true,
      ask: function () {
        return prompt.history('checkout').value === 'Y' || prompt.history('checkout').value === 'y'
      }
    }
  ];

  return checkoutPrompt;
}
