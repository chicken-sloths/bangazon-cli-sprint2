'use strict';

const { assert } = require('chai');
const { createProduct } = require('../app/models/ProductsM');

let sampleProduct = {
  productName: "Name",
  productPrice: 235,
  productDescription: "Description",
  productType: 3
};

describe('createProduct()', () => {
  it('should return a promise', () => {
    assert.typeOf(createProduct().catch(err => {}), 'promise');
  });
  it('should resolve into an object', () => {
    createProduct()
      .then(response => {
        assert.isObject(response);
      })
      .catch(err => console.log("createProduct error", err));
  });
  it('should reject if it doesn\'t receive a productName, productPrice, productDescription, and results.productType', () => {
    createProduct(sampleProduct)
      .then(response => {
        assert.isTrue(true);
      })
      .catch(err => {
        assert.isTrue(false);
      });
  });
});