const { assert: {equal, isArray, isObject} } = require('chai');
const { getAllCustomers, addNewCustomer } = require('../app/models/CustomersM.js')


describe('Customers functionality', () => {
  describe('Listing all customers', () => {
    it('Should return an array of objects', () => {
      isArray(getAllCustomers())
      isObject(getAllCustomers()[0])
    });
  })
  describe('Adding a new customer', () => {
    it('Should return the id of the customer you just added', () => {
      let customer = {
        customer_id: 100,
        first_name: 'Nicolas',
        last_name: 'Cage',
        account_creation_date: 'The dawn of time',
        street_address: 'Rock and Roll Road',
        city: 'Nashville',
        state: 'TN',
        postal_code: '37217',
        phone_number: '888-888-8888'
      }
      equal(100, addNewCustomer(customer))
    });
  })
});

// Pro Tip: Remember, we are testing features, not functions. Require whichever modules you need to test a feature
// customer_id INTEGER PRIMARY KEY,
//   first_name TEXT,
//     last_name TEXT,
//       account_creation_date TEXT,
//         street_address TEXT,
//           city TEXT,
//             state TEXT,
//               postal_code TEXT,
//                 phone_number TEXT