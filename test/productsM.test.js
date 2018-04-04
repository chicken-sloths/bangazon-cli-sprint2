'use strict';

const { assert } = require('chai');
const {
  createProduct,
  getProduct,
  getAllProducts
} = require('../app/models/ProductsM');

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

describe("getProduct(id)", () => {
  it("should return a promise", () => {
    assert.typeOf(getProduct(5)
      .catch(err => {
        assert.isTrue(false);
      }), "promise");
  });
  it("should resolve into an object", () => {
    getProduct(5)
      .then(response => {
        assert.isObject(response);
      })
      .catch(err => {
        console.log("getProduct error", err);
      });
  });
  it("should return false if it doesn't exist", () => {
    getProduct(-1)
      .then(response => {
        assert.isFalse(true);
      })
      .catch(err => {
        assert.isTrue(true);
      });
  });
});

describe("getAllProducts()", () => {
  it("should return a promise", () => {
    assert.typeOf(getAllProducts().catch(err => {}), "promise");
  });
  it("should resolve into an array of objects", () => {
    getAllProducts()
      .then(response => {
        assert.isArray(response);
        assert.isObject(response[0]);
      })
      .catch(err => console.log("getAllProducts error", err));
  });
});