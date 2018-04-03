const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');
const productTypes = require("../data/json/productTypes.json");

module.exports = () => {
  db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS ProductTypes`);
    db.run(`CREATE TABLE IF NOT EXISTS ProductTypes (
      product_type_id INTEGER PRIMARY KEY,
      title TEXT
      )`,
      ()=>{
        productTypes.forEach(({ 
          product_type_id,
          title
        })=>{
          db.run(`INSERT INTO ProductTypes VALUES(
            ${null},
            "${title}"
          )`);
        });
      }
    );
  });// End of db serialize
};
`product_id`,
        `price`, 
        `title`, 
        `description`, 
        `product_type_id`, 
        `creator_id`