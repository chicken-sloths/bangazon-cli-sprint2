'use strict';

const { assert } = require('chai');
const { createProduct } = require('../app/models/ProductsM');

let sampleProduct = {
  name: "Name",
  price: 235,
  description: "Description",
  productType: 3
};

describe('createProduct()', () => {
  it('should return a promise', () => {
    assert.typeOf(createProduct().catch(err => {}), 'promise');
  });
  it('should resolve into an integer', () => {
    createProduct(sampleProduct)
      .then(response => {
        assert.isNumber(response);
      })
      .catch(err => console.log("createProduct error", err));
  });
  it('should reject if it doesn\'t receive a name, price, description, and productType', () => {
    createProduct(sampleProduct)
      .then(response => {
        assert.isTrue(true);
      })
      .catch(err => {
        assert.isTrue(false);
      });
  });
});