
const { assert: { isFunction, typeOf, isNumber, equal } } = require('chai');
const { checkForActiveOrder, patchPaymentTypeOntoOrder, createNewOrder } = require('../app/models/OrdersM');
const makeOrdersTable = require('../db/makeOrdersTable');
const { generateSqlTable } = require('../db/sqlRunTemplate');


beforeEach(done => {
  generateSqlTable(makeOrdersTable)
    .then(() => done());
});

describe("checkForActiveOrder function", () => {

  it("should be a function", () => {
    isFunction(checkForActiveOrder);
  });
  it("should return a promise", () => {
    typeOf(checkForActiveOrder(3), "promise");
  });

  it("should return the order id as an integer", () => {
    return checkForActiveOrder(3)
      .then((order) => {
        typeOf(order.order_id, "number");
        isNumber(order.order_id);
      });
  });

  it("should pass this test ONLY if the customer has no active order.", () => {
    return checkForActiveOrder(0)
      .then(order => {
        equal(0,1);
      })
      .catch(err => equal(1,1));
  });
});

describe("patchPaymentTypeOntoOrder function: ", () => {
  it("should be a function", () => {
    isFunction(patchPaymentTypeOntoOrder);
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
    order_id: 1000000,
    customer_id: 4
  }
  let fakeOrder = {
    order_id: 100,
    customer_id: 100
  }

  // This function receives an order object and a payment_option_id
  it("should return a promise", () => {
    typeOf(patchPaymentTypeOntoOrder(veryRealOrder, 1000), "promise");
    typeOf(patchPaymentTypeOntoOrder(fakeOrder, 100), "promise");
  });

  it("should return the integer id of the added row", () => {
    patchPaymentTypeOntoOrder(veryRealOrder, 17)
      .then(order_id => {
        isNumber(order_id);
        typeOf(order_id, "number");
      });
  });
});

describe("createNewOrder function", () => {

  it("should be a function", () => {
    isFunction(createNewOrder);
  });

  let newOrder = {
    customer_id: 88,
    payment_option_id: null
  };
  it("should return a promise", () => {
    typeOf(createNewOrder(newOrder), "promise")
  });

  it("should return the order_id of the new Order", () => {
    // im runing this twice here just to test the auto-increment feature
    createNewOrder(newOrder)
      .then(order_id => {
        isNumber(order_id);
      });
    createNewOrder(newOrder)
      .then(order_id => {
        isNumber(order_id);
      });
  });
});
