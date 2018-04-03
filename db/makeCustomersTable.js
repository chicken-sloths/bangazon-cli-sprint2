const db = new sqlite3.Database('bangazon.sqlite');
const customers = require("../../data/json/customers.json");

module.exports = () => {
  db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS Customers`);
    db.run(`CREATE TABLE IF EXISTS Customers (
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
          firstName, 
          lastName, 
          addressStreet, 
          addressCity, 
          addressState, 
          addressZip, 
          accountCreationDate })=>{
            db.run(`INSERT INTO Customers VALUES(
              ${null},
              "${firstName}",
              "${lastName}",
              "${addressStreet}",
              "${addressCity}",
              "${addressState}",
              "${addressZip}",
              "${accountCreationDate}"
            )`);
          });

      }
    );
  });// End of db serialize
};
