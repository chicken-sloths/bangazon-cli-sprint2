const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');
const orders = require("../data/json/orders.json");

module.exports = () => {
  db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS Orders`);
    db.run(`CREATE TABLE IF NOT EXISTS Orders (
      order_id INTEGER PRIMARY KEY,
      customer_id INTEGER,
      payment_option_id INTEGER,
      FOREIGN KEY(customer_id) REFERENCES customers(customer_id),
      FOREIGN KEY(payment_option_id) REFERENCES payment_options(payment_option_id)
      )`,
      ()=>{
        orders.forEach(({ 
          order_id,
          customer_id,
          payment_option_id
        })=>{
          db.run(`INSERT INTO Customers VALUES(
            ${null},
            "${order_id}",
            "${customer_id}",
            "${payment_option_id}",
          )`);
        });

      }
    );
  });// End of db serialize
};
