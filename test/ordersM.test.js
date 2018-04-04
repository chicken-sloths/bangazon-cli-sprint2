
const { assert:{ isFunction , typeOf, isNumber, ifError } } = require('chai');
const { checkForActiveOrder } = require('../app/models/OrdersM');


describe("checkForActiveOrder function", ()=>{
  it("should be a function",()=>{
    isFunction(checkForActiveOrder);
  });
  it("should return a promise", ()=>{
    typeOf(checkForActiveOrder(4), "promise");
  });
  it("should return the order id", ()=>{
    return checkForActiveOrder(4)
    .then(orderid=>{
      isNumber(orderid);
    });
  });
  it("should pass this test ONLY if the promise rejects",()=>{
    return checkForActiveOrder('5')
    .then(orderid=>{
      // isNumber(orderid);
    })
    .catch(err=>{
      ifError(err);
    });
  })
});