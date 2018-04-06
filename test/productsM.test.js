'use strict';

const { assert } = require('chai');
const {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByCreator,
  deleteProduct,
  getAllStockedProducts,
  getQuantityRemaining
} = require('../app/models/ProductsM');

let sampleProduct = {
  name: 'Name',
  price: 235,
  description: 'Description',
  productType: 3,
  quantity: 4
};
const { generateSqlTable } = require('../db/sqlRunTemplate');
const makeProductsTable = require('../db/makeProductsTable');

describe('createProduct()', () => {
  it('should resolve into an integer', () => {
    createProduct(sampleProduct)
      .then(response => {
        assert.isNumber(response);
      })
      .catch(err => console.log('createProduct error', err));
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

describe('getProduct(id)', () => {
  it('should resolve into an object', () => {
    getProduct(5)
      .then(response => {
        assert.isObject(response);
      })
      .catch(err => {
        console.log('getProduct error', err);
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
    getAllProducts()
      .then(response => {
        assert.isArray(response);
        assert.isObject(response[0]);
      })
      .catch(err => console.log('getAllProducts error', err));
  });
});

describe('getProductsByCreator', () => {
  it('should resolve into an array of objects', () => {
    getProductsByCreator(2)
      .then(products => {
        assert.isArray(products);
        assert.isObject(products[0]);
      })
      .catch(err => console.log('getProductsByCreator error', err));
  });
  it('creator 2 should have 6 products', () => {
    getProductsByCreator(2)
      .then(response => {
        assert.equal(response.length, 6);
      })
      .catch(err => console.log('getProductsByCreator error', err));
  });
});

describe('deleteProduct()', () => {
  it('resolves into a nonzero number', () => {
    createProduct(sampleProduct)
      .then(id => {
        return deleteProduct(id);
      })
      .then(response => {
        assert.isNumber(response);
        assert.isAbove(response, 0);
      })
      .catch(err => console.log('deleteProduct error', err));
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
    getAllStockedProducts()
      .then(response => {
        assert.isArray(response);
        assert.isObject(response[0]);
      })
      .catch(err => console.log('getAllStockedProducts error', err));
  });
  it('should have a length of 43', () => {
    getAllStockedProducts()
      .then(response => {
        assert.equal(response.length, 43);
      })
      .catch(err => console.log('getAllStockedProducts error', err));
  });
});

describe('getQuantityRemaining()', () => {
  it('should resolve into a number', () => {
    getQuantityRemaining(3)
      .then(qty => {
        assert.isNumber(qty);
      })
      .catch(err => console.log('getQuantityRemaining error', err));
  });
  it('getQuantityRemaining(40) should return 7', () => {
    getQuantityRemaining(40)
      .then(qty => {
        assert.equal(qty, 7);
      })
      .catch(err => console.log('getQuantityRemaining() error', err));
  });
});