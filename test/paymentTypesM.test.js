
const { assert: { isFunction, isArray, isObject } } = require('chai');
const { getAllPaymentTypes } = require('../app/models/PaymentTypesM');
const makePaymentTypesTable = require('../db/makePaymentTypesTable');
const { generateSqlTable } = require('../db/sqlRunTemplate');


beforeEach(done => {
  generateSqlTable(makePaymentTypesTable)
    .then(() => done());
});

describe("getAllPaymentTypes() ", ()=>{
  it("should be a function", ()=>{
    isFunction(getAllPaymentTypes);
  });
  
  it("should return an array of the payment types object", ()=>{
    getAllPaymentTypes()
    .then(paymentTypes=>{
      isArray(paymentTypes);
      isObject(paymentTypes[0]);
    });
  });
})