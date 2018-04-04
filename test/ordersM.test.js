const { assert:{ isFunction , typeOf } } = require('chai');
const { checkForActiveOrder } = require('../app/models/OrdersM');


describe("checkForActiveOrder function", ()=>{
  it("should be a function",()=>{
    isFunction(checkForActiveOrder);
  });
  it("should ")
});