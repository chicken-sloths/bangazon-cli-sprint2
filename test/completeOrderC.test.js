"use strict";

const { assert: { equal } } = require('chai'),
      { completeOrder } = require('../app/controllers/completeOrderC');

describe('completeOrder controller module', () => {
  describe('completeOrder()', () => {
    it('should return the string "Customer has no active orders" if they don\'t', () => {
      return completeOrder(2)
	      .then(response => {
          equal(0,1);
        })
        .catch(err => {
          equal(err, "This customer has no active orders.")
        });
    });
  });
});
