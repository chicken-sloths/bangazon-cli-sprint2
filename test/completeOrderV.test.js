"use strict";

const { assert: { deepEqual, equal } } = require('chai'),
      { green } = require('colors'),
      { createPrompt } = require('../app/views/completeOrderV');

describe('completeOrder view module', () => {
  describe('createPrompt()', () => {
    const checkout = {
          description: `Your order total is ${green('$180')}. Ready to purchase?\n(Y/N)`
        },
        payment = {
          description: 'Choose a payment option:\n1. AmEx\n2. Visa',
          pattern: new RegExp('^[1-2]$'),
        };
    const [a, b] = createPrompt(180, [{type:'AmEx'}, {type:'Visa'}]);

    it('should create a description with the order total included', () => {
             equal(a.description, checkout.description);
    });
    it('should create a description with the customer\'s payment options', () => {
             equal(b.description, payment.description);
    });
    it('should create a RegEx for payment that only allows the number of payment options a customer has', () => {
             deepEqual(b.pattern, payment.pattern);
    });
  });
});
