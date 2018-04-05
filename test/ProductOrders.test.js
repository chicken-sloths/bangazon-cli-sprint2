const { assert: {equals, deepEqual, isArray, isObject} } = require('chai');
const { addToProductOrders, getOrderTotal } = require('../app/models/ProductOrdersM');

describe('ProductOrdersM', () => {
  let product = {"product_id":1,"current_price":"356.00","title":"Gorgeous Wooden Fish","description":"Tasty","product_type_id":2,"creator_id":12};
  describe('addProdsToOrder()', () => {
    it('should return an object', () => {
      return addToProductOrders(1, product)
      .then( (prodAdded) => {
        isObject(prodAdded);
        deepEqual({ productsAdded: 1 }, prodAdded, "this.changes should reflect one product should be added");
      })
    });
  })
  describe('getOrderTotal()', () => {
    it('should return an object', () => {
      return getOrderTotal({ order_id: 2 })
      .then( (orderTotal) => {
        isObject(orderTotal);
        deepEqual({ OrderTotal: 3377 }, orderTotal);
      })
    })
  })
})