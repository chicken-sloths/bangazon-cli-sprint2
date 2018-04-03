const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');
const customers = require("../data/json/customers.json");

module.exports = () => {
    db.run(`DROP TABLE IF EXISTS Customers`);
    db.run(`CREATE TABLE IF NOT EXISTS Customers (
      customer_id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      account_creation_date TEXT,
      street_address TEXT,
      city TEXT,
      state TEXT,
      postal_code TEXT,
      phone_number TEXT
      )`,
      ()=>{
        customers.forEach(({ 
          customer_id,
          first_name, 
          last_name, 
          account_creation_date,
          street_address, 
          city, 
          state, 
          postal_code, 
          phone_number })=>{
            db.run(`INSERT INTO Customers VALUES(
              ${customer_id == undefined ? null : customer_id},
              "${first_name}",
              "${last_name}",
              "${account_creation_date}",
              "${street_address}",
              "${city}",
              "${state}",
              "${postal_code}",
              "${phone_number}"
            )`);
          });

      }
    );
};
