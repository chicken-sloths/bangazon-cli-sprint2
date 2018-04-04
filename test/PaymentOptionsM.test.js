"use strict";

const { assert: { deepEqual, equal } } = require('chai'),
      {
	getPaymentOptionsForCustomer,
	addPaymentOption
      } = require('../app/models/PaymentOptionsM'),
      makePayOptTable = require('../db/makePaymentOptionsTable');

describe('PaymentOptionsModel module', () => {
  describe('getPaymentOptionsForCustomer()', () => {
    it('should get all payment type options for cust id', () => {
      const option = {
        payment_option_id: 22,
        type: "Blood Sacrifice",
        account_number: "22034383",
        customer_id: 23
      };

      return getPaymentOptionsForCustomer(23)
        .then(opts => deepEqual(opts[1], option));
    });
  });
  
  beforeEach(done => {
    makePayOptTable();
    setTimeout(done, 200);
  });

  describe('addPaymentOption()', () => {
    it('should add a payment option for the given customer id', () => {
      const obj = {
	type: "American Express",
	account_number: "17251823",
	customer_id: 23
      };

      return addPaymentOption(obj)
	.then(payOptId => equal(payOptId, 25));
    }); 
  });
});
