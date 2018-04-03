const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');
const paymentOptions = require("../data/json/paymentOptions.json");

module.exports = () => {
  db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS Payment_Options`);
    db.run(`CREATE TABLE IF NOT EXISTS Payment_Options (
      payment_option_id INTEGER PRIMARY KEY,
      type TEXT,
      account_number TEXT,
      customer_id INTEGER,
      FOREIGN KEY(customer_id) REFERENCES Customers(customer_id)
      )`,
      ()=>{
        paymentOptions.forEach(({ 
          payment_option_id,
          type,
          account_number,
          customer_id
        })=>{
          db.run(`INSERT INTO Payment_Options VALUES(
            ${payment_option_id == undefined ? null : payment_option_id},
            "${type}",
            "${account_number}",
            "${customer_id}"
          )`);
        });
      }
    );
  });// End of db serialize
};
