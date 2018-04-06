'use strict';

const { assert: {isArray, isObject} } = require('chai');
const { getProductTypes } = require('../app/models/ProductTypesM');

describe('getProductTypes()', () => {
  it('should resolve as an array of objects', () => {
      return getProductTypes()
      .then(response => {
        isArray(response);
        isObject(response[0]);
      })
  });
});