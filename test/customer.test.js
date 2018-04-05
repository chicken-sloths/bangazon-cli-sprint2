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
        first_name: "Rosie",
        last_name: "Waters",
        account_creation_date: "2018-04-05T07:56:00.279Z",
        street_address: "4763 Kenny Turnpike",
        city: "Huberttown",
        state: "Georgia",
        postal_code: "17176",
        phone_number: "792.555.3469 x367"
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
    // Right now the last customer id in the database is 49, so a new post should auto-increment to 50. If we change our schema to make more than 50 customers, this test will fail!
    it('Should return the id of the customer you just added', () => {
      return addNewCustomer(nicolasCage)
      .then(id => {
        equal(50, id)
      })
    });
  })
});
