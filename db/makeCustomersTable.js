const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');
const customers = require("../data/json/customers.json");

module.exports = () => {
  db.serialize(()=>{
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
          first_name, 
          last_name, 
          account_creation_date,
          street_address, 
          city, 
          state, 
          postal_code, 
          phone_number })=>{
            db.run(`INSERT INTO Customers VALUES(
              ${null},
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
  });// End of db serialize
};
