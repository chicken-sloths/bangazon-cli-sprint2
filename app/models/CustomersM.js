'use strict';
/**
 * A module that access the Customer table in the bangazon.sqlite DB
 * @module customersModel
 */

const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));

/**
 * @function getAllCustomers
 * @returns {Promise} A Promise object that represents the an array of objects. Each object contains customer data.
 * @description Gets all customers if resolves, else returns an error related to the DB
 */
// This will be called in #3- Select Active Customer
module.exports.getAllCustomers = () => {
   return new Promise((resolve, reject) => {
     db.all(`SELECT * FROM Customers`,
       (err, customers) => err ? reject(err) : resolve(customers)
     )
   });
}

/**
 * @function getCustomerByPhoneNumber
 * @param {string} phoneNumber - The phone number of the selected customer
 * @returns {Promise} A Promise object that represents an object containing customer data, if any is found.
 * @description Used to check for duplicates before addNewCustomer is called
 */
module.exports.getCustomerByPhoneNumber = phoneNumber => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM Customers WHERE Customers.phone_number='${phoneNumber}'`,
    (err, customer) => {
      err ? reject(err) : resolve(customer);
    });
  });
}

/**
 * @function addNewCustomer
 * @param {Object} customerObj
 * @param {string} customerObj.first_name - Customer's first name
 * @param {string} customerObj.last_name - Customer's last name
 * @param {string} customerObj.account_creation_date - Creation date, in ISO format, of the customer's account
 * @param {string} customerObj.street_address - Customer's street address (e.g., 123 Main St.)
 * @param {string} customerObj.city - City for the customer's address
 * @param {string} customerObj.postal_code - Postal code for the customer's address
 * @param {string} customerObj.phone_number - Customer's phone number
 * @returns {Promise} A promise that represents the customer_id of a newly added customer
 * @description Adds a customer & their account information to the Customers table in the bangazon.sqlite DB
 */
module.exports.addNewCustomer = ({first_name, last_name, account_creation_date, street_address, city, state, postal_code, phone_number}) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO Customers (
      customer_id,
      first_name,
      last_name,
      account_creation_date,
      street_address,
      city,
      state,
      postal_code,
      phone_number
    ) VALUES (
       null,
       "${first_name}",
       "${last_name}",
       date('now'),
       "${street_address}",
       "${city}",
       "${state}",
       "${postal_code}",
       "${phone_number}"
   )`,
   function(err, data){
    err ? reject(err) : resolve(this.lastID)
   })
  })
}
