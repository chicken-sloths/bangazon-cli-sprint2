const { assert: {equal, isArray, isObject} } = require('chai');
const { getAllCustomers } = require('../app/models/CustomersM.js')

// Placed here to confirm test file runs properly
describe('customers functionality', () => {
  it('should return an array of objects', () => {
    isArray(getAllCustomers())
    isObject(getAllCustomers()[0])
  });
});

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
