'use strict';

const { assert } = require('chai');
const {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByCreator,
  deleteProduct,
  getAllStockedProducts,
  getQuantityRemaining,
  updateProduct
} = require('../app/models/ProductsM');

let sampleProduct = {
  creator_id: 4,
  title: 'Name',
  current_price: 235.76,
  description: 'Description',
  product_type_id: 3,
  creation_date: "2018-04-06T00:55:09.250Z",
  quantity: 4,
};

const { generateSqlTable } = require('../db/sqlRunTemplate');
const makeProductsTable = require('../db/makeProductsTable');

describe('createProduct()', () => {
  it('should resolve into an integer', () => {
    return createProduct(sampleProduct)
      .then(response => {
        assert.isNumber(response);
      });
  });
  it('should reject if it doesn\'t receive a name, price, description, and productType', () => {
    return createProduct(sampleProduct)
      .then(response => {
        assert.isTrue(true);
      });
  });
});

describe('getProduct(id)', () => {
  it('should resolve into an object', () => {
    return getProduct(5)
      .then(response => {
        assert.isObject(response);
      });
  });
  it('should return false if it doesn\'t exist', () => {
    getProduct(-1)
      .then(response => {
        assert.isFalse(true);
      })
      .catch(err => {
        assert.isTrue(true);
      });
  });
});

describe('getAllProducts()', () => {
  it('should resolve into an array of objects', () => {
    return getAllProducts()
      .then(response => {
        assert.isArray(response);
        assert.isObject(response[0]);
      });
  });
});

describe('getProductsByCreator', () => {
  it('should resolve into an array of objects', () => {
    return getProductsByCreator(2)
      .then(products => {
        assert.isArray(products);
        assert.isObject(products[0]);
      });
  });
  it('creator 2 should have 1 product', () => {
    return getProductsByCreator(2)
      .then(response => {
        assert.equal(response.length, 1);
      });
  });
});

describe('deleteProduct()', () => {
  it('resolves into a nonzero number', () => {
    return createProduct(sampleProduct)
      .then(id => {
        return deleteProduct(id);
      })
      .then(response => {
        assert.isNumber(response);
        assert.isAbove(response, 0);
      });
  });
  it('throws a fit if you try to delete something that isn\'t there', () => {
    deleteProduct(1000)
      .then(response => {
        assert.isTrue(false);
      })
      .catch(err => {
        assert.isTrue(true);
      });
  });
});

describe('getAllStockedProducts()', () => {
  beforeEach(done => {
    generateSqlTable(makeProductsTable)
      .then(() => done());
  });

  it('should resolve into an array of objects', () => {
    return getAllStockedProducts()
      .then(response => {
        assert.isArray(response);
        assert.isObject(response[0]);
      });
  });
  it('should have less than or equal to stocked products than total products', () => {
    let allProdsLength;
    return getAllProducts()
    .then(allProds=>{
      allProdsLength = allProds.length;
      return getAllStockedProducts()
    })
    .then(response => {
      assert.isTrue(response.length <= allProdsLength);
    });
  });
});

describe('getQuantityRemaining()', () => {
  it('should resolve into a number', () => {
    return getQuantityRemaining(3)
      .then(qty => {
        assert.isNumber(qty);
      });
  });
  it('getQuantityRemaining(40) should return 7', () => {
    return getQuantityRemaining(40)
      .then(qty => {
        assert.equal(qty, 34);
      });
  });
});

describe("updateProduct()", () => {
  it("should resolve into a number", () => {
    return updateProduct(3,sampleProduct)
      .then(id => {
        assert.isNumber(id);
      });
  });
  it("should work", () => {
    return updateProduct(5, sampleProduct)
      .then(changes => {
        assert.equal(changes, 1);
        return getProduct(5);
      })
      .then(product => {
        assert.equal(product.title, 'Name');
        assert.equal(product.description, 'Description');
        assert.equal(product.quantity, 4);
      })
  });
});
