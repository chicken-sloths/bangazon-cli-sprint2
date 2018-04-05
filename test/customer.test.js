const { assert: {equal, isArray, isObject, deepEqual} } = require('chai');
const { getAllCustomers, addNewCustomer, getCustomerByPhoneNumber } = require('../app/models/CustomersM.js')
const makeCustomersTable = require('../db/makeCustomersTable')


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

  describe('Getting a customer by their phone number', () => {
    let testCustomer = {
      customer_id: 2,
      first_name: 'Isac',
      last_name: 'Torp',
      account_creation_date: '2018-04-03T09:54:37.468Z',
      street_address: '0858 Kozey Meadows',
      city: 'Lillieside',
      state: 'Oregon',
      postal_code: '26261',
      phone_number: '(841) 120-4154'
    }

    it('Should return an object', () => {
      getCustomerByPhoneNumber(testCustomer.phone_number)
        .then(customer => {
          isObject(customer);
        })
    });

    it('Should return the customer with a matching phone number of the one you passed in', () => {
      return getCustomerByPhoneNumber(testCustomer.phone_number)
        .then(customer => {
          deepEqual(testCustomer, customer)
        })
    })
  });


  afterEach(done => {
    makeCustomersTable();
    setTimeout(done, 200);
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
    // add test for checking for duplicates HERE once we figure out our db stuff
  })
});
