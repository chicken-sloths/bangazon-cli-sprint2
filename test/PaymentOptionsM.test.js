"use strict";

const { assert: { deepEqual, equal, isEmpty } } = require('chai'),
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

    it('should return an empty array if cust id has no payment options', () => {
      // customer_id: 4 has no payment options
      return getPaymentOptionsForCustomer(4)
	.then(resp => isEmpty(resp)); 
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
