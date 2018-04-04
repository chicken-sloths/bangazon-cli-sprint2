const { assert: {equal, isArray, isObject, deepEqual} } = require('chai');
const { getAllCustomers, addNewCustomer } = require('../app/models/CustomersM.js')
const CustomersTable = require('../db/makeCustomersTable');
const { generateSqlTable } = require('../db/sqlRunTemplate');


describe('Customers functionality', () => {

  describe('Listing all customers', () => {
    it('Should return an array of objects', () => {
      getAllCustomers()
      .then(customers => {
        isArray(customers);
        isObject(customers[0]);
      })
    });
    it('Should bring back the correct customer objects', () => {
      // First customer from the database, according to our current database schema. If we change the database schema, this test will fail!
      let firstCustomer = {
        customer_id: 0,
        first_name: "Luigi",
        last_name: "McKenzie",
        account_creation_date: "2018-04-04T12:48:11.283Z",
        street_address: "937 Gideon Estate",
        city: "Wittingbury",
        state: "Oklahoma",
        postal_code: "89799",
        phone_number: "1-173-602-3290"
      }
      return getAllCustomers()
      .then(customers => {
        deepEqual(firstCustomer, customers[0])
      })
    })
  })
  afterEach(done => {
    generateSqlTable(CustomersTable)
    .then(() => done());
  })
  describe('Adding a new customer', () => {
    //Dummy Customer Data for practice
    let nicolasCage = {
      first_name: 'Nicolas',
      last_name: 'Cage',
      account_creation_date: 'The dawn of time',
      street_address: 'Rock and Roll Road',
      city: 'Nashville',
      state: 'TN',
      postal_code: '37217',
      phone_number: '888-888-8888'
    }
    // Right now the last customer id in the database is 24, so a new post should auto-increment to 25. If we change our schema to make more than 25 customers, this test will fail!
    it('Should return the id of the customer you just added', () => {
      return addNewCustomer(nicolasCage)
      .then(id => {
        equal(25, id)
      })
    });
  })
});
