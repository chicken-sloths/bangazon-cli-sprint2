"use strict";

const { assert: { deepEqual, equal, isEmpty, isNumber } } = require('chai'),
      {
	       getPaymentOptionsForCustomer,
	       addPaymentOption
      } = require('../app/models/PaymentOptionsM'),
      { generateSqlTable } = require('../db/sqlRunTemplate'),
      PaymentOptionsTable = require('../db/makePaymentOptionsTable');
      // ^^^ Lord have mercy on this syntax, my dudes ^^^

describe('PaymentOptionsModel module', () => {
  describe('getPaymentOptionsForCustomer()', () => {
    it('should get all payment type options for cust id', () => {
      const option = {
        payment_option_id: 20,
        payment_type: 15,
        account_number: "25617724",
        customer_id: 12 
      };

      return getPaymentOptionsForCustomer(12)
               .then(opts => deepEqual(opts[0], option));
    });

    it('should return an empty array if cust id has no payment options', () => {
      // customer_id: 1 has no payment options
      return getPaymentOptionsForCustomer(1)
	       .then(resp => isEmpty(resp));
    });
  });

  beforeEach(function(done) {
    generateSqlTable(PaymentOptionsTable)
    .then(() => done());
  });

  describe('addPaymentOption()', () => {
    it('should add a payment option for the given customer id', () => {
      const fakePaymentOption = {
      	payment_type: 3,
      	account_number: "17251823",
      	customer_id: 23
      };

    
      return addPaymentOption(fakePaymentOption)
	     .then(payOptId => isNumber(payOptId));
    });
  });
});
