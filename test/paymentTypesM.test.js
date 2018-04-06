
const { assert: { isFunction, isArray } } = require('chai');
const { getAllPaymentTypes } = require('../app/models/PaymentTypesM');
const makePaymentTypesTable = require('../db/makePaymentTypesTable');
const { generateSqlTable } = require('../db/sqlRunTemplate');


beforeEach(done => {
  generateSqlTable(makePaymentTypesTable)
    .then(() => done());
});

describe("getAllPaymentTypes function ", ()=>{
  it("should be a function", ()=>{
    isFunction(getAllPaymentTypes);
  });
  
  it("should return an array of the payment types", ()=>{
    getAllPaymentTypes()
    .then(paymentTypes=>{
      isArray(paymentTypes);
    });
  });
})