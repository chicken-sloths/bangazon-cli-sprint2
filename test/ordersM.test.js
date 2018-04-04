
const { assert:{ isFunction , typeOf, isNumber, isUndefined } } = require('chai');
const { checkForActiveOrder, patchPaymentTypeOntoOrder, createNewOrder } = require('../app/models/OrdersM');
const makeOrdersTable = require('../db/makeOrdersTable');

describe("checkForActiveOrder function", ()=>{

  beforeEach(done=>{
    makeOrdersTable();
    setTimeout(done, 200);
  });

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

describe("patchPaymentTypeOntoOrder function: ", ()=>{
  it("should be a function", ()=>{
    isFunction(patchPaymentTypeOntoOrder);
  });
  beforeEach(done=>{
    makeOrdersTable();
    setTimeout(done, 200);
  });
    // NOTE: in the function below, I am actually patching a payment option
      // onto THE EXACT SAME ORDER that is owned by the customer 
      // that is being declared as the customer with an active order 
      // in the test above that has it("should return the order id")
      // around line 19ish
      // SO, this is adding a payment option (thereby, closing the order)
      // to the active order being returned in that test. So if any weird 
      // errors pop up, it could be due to this. But by regenerating the 
      // database in the beforeEach should avoid this conflict.
    let veryRealOrder = {
      order_id: 6,
      customer_id: 4
    }
    let fakeOrder = {
      order_id: 100,
      customer_id: 100
    }
    it("should return a promise", ()=>{
      typeOf(patchPaymentTypeOntoOrder(veryRealOrder, 10),"promise");
      typeOf(patchPaymentTypeOntoOrder(fakeOrder, 100),"promise");
    });
    it("should return the integer id of the added row",()=>{
      patchPaymentTypeOntoOrder(veryRealOrder, 10)
      .then(id=>{
        isNumber(id);
      });
    });
});

describe("createNewOrder function", ()=>{
  it("should be a function",()=>{
    isFunction(createNewOrder);
  });
  let newOrder = {
    order_id: 88,
    customer_id: 88,
    payment_option_id: null
  };
  it("should return a promise", ()=>{
    typeOf(createNewOrder(newOrder), "promise")
  });
});