const { assert: {equal, isArray, isObject, deepEqual} } = require('chai');
const { getAllCustomers, addNewCustomer } = require('../app/models/CustomersM.js')
const makeCustomersTable = require('../db/makeCustomersTable')


describe('Customers functionality', () => {
  describe('Listing all customers', () => {
    it('Should return an array of objects', () => {
      getAllCustomers()
      .then(customers => {
        console.log('first customer', customers[0]);
        isArray(customers);
        isObject(customers[0]);
      })
    });
    it('Should bring back the correct customer objects', () => {
      // First customer from the database, according to our current database schema
      let firstCustomer = {
        customer_id: 0,
        first_name: 'Lennie',
        last_name: 'Kunze',
        account_creation_date: '2018-04-03T15:25:47.270Z',
        street_address: '59842 Earline Gateway',
        city: 'South Whitneyport',
        state: 'Indiana',
        postal_code: '14769-1763',
        phone_number: '1-510-550-0973'
      }
      return getAllCustomers()
      .then(customers => {
        deepEqual(firstCustomer, customers[0])
      })
    })
  })
  afterEach(done => {
    makeCustomersTable();
    setTimeout(done, 200);
  })
  describe('Adding a new customer', () => {
    it('Should return the id of the customer you just added', () => {
      let nicolas = {
        customer_id: 100,
        first_name: 'Nicolas',
        last_name: 'Cage',
        account_creation_date: '100 BC',
        street_address: 'Rock and Roll Road',
        city: 'Nashville',
        state: 'TN',
        postal_code: '37217',
        phone_number: '888-888-8888'
      }
      return addNewCustomer(nicolas)
      .then(id => {
        equal(100, id)
      })
      
    });
  })
});
