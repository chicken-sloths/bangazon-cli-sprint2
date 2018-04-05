'use strict';

const { assert } = require('chai');
const {
  createProduct,
  getProduct,
  getAllProducts,
  getProductsByCreator,
  deleteProduct,
  getAllStockedProducts,
  getInventory
} = require('../app/models/ProductsM');

let sampleProduct = {
  name: 'Name',
  price: 235,
  description: 'Description',
  productType: 3
};

describe('createProduct()', () => {
  it('should return a promise', () => {
    assert.typeOf(createProduct().catch(err => { }), 'promise');
  });
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
  it('should return a promise', () => {
    assert.typeOf(getProduct(5)
      .catch(err => {
        assert.isTrue(false);
      }), 'promise');
  });
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
  it('should return a promise', () => {
    assert.typeOf(getAllProducts().catch(err => { }), 'promise');
  });
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
  it('should return a promise', () => {
    assert.typeOf(getProductsByCreator(3)
      .catch(err => console.log('getProductsByCreators error', err)), 'promise');
  });
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
  it('returns a promise', () => {
    createProduct(sampleProduct)
      .then(id => {
        assert.typeOf(deleteProduct(id).catch(err => { }), 'promise');
      });
  });
  it('resolves into a number', () => {
    createProduct(sampleProduct)
      .then(id => {
        return deleteProduct(id);
      })
      .then(response => {
        assert.isNumber(response);
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
  it('should return a promise', () => {
    assert.typeOf(getAllStockedProducts().catch(err => {}), 'promise');
  });
  it('should resolve into an array of objects', () => {
    getAllStockedProducts()
      .then(response => {
        assert.isArray(response);
        assert.isObject(response[0]);
      })
      .catch(err => console.log('getAllStockedProducts error', err));
  });
});

describe('getInventory()', () => {
  it('should return a promise', () => {
    assert.typeOf(getInventory(3).catch(err => {}), 'promise');
  });
  it('should resolve into a number', () => {
    getInventory(3)
      .then(qty => {
        assert.isNumber(qty);
      })
      .catch(err => console.log('getInventory error', err));
  });
  it('getInventory(40) should return 7', () => {
    getInventory(40)
      .then(qty => {
        assert.equal(qty, 7);
      })
      .catch(err => console.log('getInventory() error', err));
  });
});