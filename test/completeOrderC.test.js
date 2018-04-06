"use strict";

const { assert: { equal } } = require('chai'),
      { completeOrderPrompt } = require('../app/controllers/completeOrderC');

describe('completeOrder controller module', () => {
  describe('completeOrderPrompt()', () => {
    it('should return the string "Customer has no active orders" if they don\'t', () => {
      return completeOrderPrompt(1)
	.then(resp => equal(resp, 'Customer has no active orders'));
    });
  });
});
