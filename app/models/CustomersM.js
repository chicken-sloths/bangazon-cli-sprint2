'use strict';
const { Database } = require('sqlite3').verbose();
const path = require('path');
const db = new Database(path.join(__dirname, '../..', 'db', 'bangazon.sqlite'));


// This will be called in #3- Select Active Customer
module.exports.getAllCustomers = () => {
   return new Promise((resolve, reject) => {
     db.all(`SELECT * FROM Customers`,
       (err, customers) => err ? reject(err) : resolve(customers)
     )
   });
}


// This will be called in option #1 - Create Customer Account
// Needs to check for duplicates before it posts
module.exports.addNewCustomer = ({customer_id, first_name, last_name, account_creation_date, street_address, city, state, postal_code, phone_number}) => {
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
       ${customer_id == undefined ? null : customer_id},
       "${first_name}",
       "${last_name}",
       "${account_creation_date}",
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
