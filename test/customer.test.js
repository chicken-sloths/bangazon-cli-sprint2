"use strict"
const { assert: {equal, isArray, isObject, deepEqual, notEqual, isNumber } } = require('chai');
const { getAllCustomers, addNewCustomer, getCustomerByPhoneNumber } = require('../app/models/CustomersM.js');
const { newCustomer } = require('../app/controllers/createCustC.js');
const CustomersTable = require('../db/makeCustomersTable');
const { generateSqlTable } = require('../db/sqlRunTemplate');


describe('Customers functionality', () => {
  let testCustomer = {
    customer_id: 0,
    first_name: "Gayle",
    last_name: "O'Connell",
    account_creation_date: "2018-04-06T08:04:16.002Z",
    street_address: "46301 Renner Crossroad",
    city: "Port Elizabethborough",
    state: "Delaware",
    postal_code: "49029",
    phone_number: "(960) 532-9058 x902"
  };

  describe('Listing all customers', () => {
    it('Should return an array of objects', () => {
      getAllCustomers()
      .then(customers => {
        isArray(customers);
        isObject(customers[0]);
      });
    });
    it('Should bring back the correct customer objects', () => {
      // First customer from the database, according to our current database schema. If we change the database schema, this test will fail!
      
      return getAllCustomers()
      .then(customers => {
        deepEqual(testCustomer, customers[0])
      });
    });
  });

  describe('Getting a customer by their phone number', () => {

    it('Should return an object', () => {
      getCustomerByPhoneNumber(testCustomer.phone_number)
        .then(customer => {
          isObject(customer);
        });
    });

    it('Should return the customer with a matching phone number of the one you passed in', () => {
      return getCustomerByPhoneNumber(testCustomer.phone_number)
        .then(customer => {
          deepEqual(testCustomer, customer)
        });
    });
  });


  afterEach(done => {
    generateSqlTable(CustomersTable)
    .then(() => done());
  });
  describe('Adding a new customer', () => {
    //Dummy Customer Data
    let nicolasCage = {
      first_name: 'Nicolas',
      last_name: 'Cage',
      account_creation_date: 'The dawn of time',
      street_address: 'Rock and Roll Road',
      city: 'Nashville',
      state: 'TN',
      postal_code: '37217',
      phone_number: '888-888-8888'
    };

    // Right now the last customer id in the database is 49, so a new post should auto-increment to 50. If we change our schema to make more than 50 customers, this test will fail!
    it('Should return the id of the customer you just added', () => {
      return addNewCustomer(nicolasCage)
      .then(id => {
        isNumber(id);
      })
    });
  })
});
