"use strict";

const { assert: { deepEqual, equal, isEmpty } } = require('chai'),
      {
	       getPaymentOptionsForCustomer,
	       addPaymentOption
      } = require('../app/models/PaymentOptionsM'),
      { generateSqlTable } = require('../db/sqlRunTemplate'),
      PaymentOptionsTable = require('../db/makePaymentOptionsTable');

describe('PaymentOptionsModel module', () => {
  describe('getPaymentOptionsForCustomer()', () => {
    it('should get all payment type options for cust id', () => {
      const option = {
        payment_option_id: 15,
        type: "Bitcoin",
        account_number: "54976262",
        customer_id: 11
      };

      return getPaymentOptionsForCustomer(11)
        .then(opts => deepEqual(opts[1], option));
    });

    it('should return an empty array if cust id has no payment options', () => {
      // customer_id: 3 has no payment options
      return getPaymentOptionsForCustomer(3)
	     .then(resp => isEmpty(resp));
      // .then(resp => console.log(resp));
    });
  });

  beforeEach(function(done) {
    generateSqlTable(PaymentOptionsTable)
    .then(() => done());
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
