
const { assert:{ isFunction , typeOf, isNumber, isUndefined } } = require('chai');
const { checkForActiveOrder, patchPaymentTypeOntoOrder } = require('../app/models/OrdersM');


describe("checkForActiveOrder function", ()=>{
  it("should be a function",()=>{
    isFunction(checkForActiveOrder);
  });
  it("should return a promise", ()=>{
    typeOf(checkForActiveOrder(4), "promise");
  });
  it("should return the order id", ()=>{
    return checkForActiveOrder(4)
    .then(({order_id})=>{
      typeOf(order_id, "number");
      isNumber(order_id);
    });
  });
  it("should pass this test ONLY if the customer has no active order.",()=>{
    return checkForActiveOrder(5)
    .then(order=>{
      // If customer has no active orders, "undefined" is returned
      typeOf(order, "undefined");
      isUndefined(order);
    });
  });
});

describe(" patchPaymentTypeOntoOrder function: ", ()=>{
  it("should be a function", ()=>{
    isFunction(patchPaymentTypeOntoOrder);
  });
});