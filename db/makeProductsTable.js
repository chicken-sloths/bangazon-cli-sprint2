const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('bangazon.sqlite');
const products = require("../data/json/products.json");

module.exports = () => {
  db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS Products`);
    db.run(`CREATE TABLE IF NOT EXISTS Products (
      product_id INTEGER PRIMARY KEY,
      price TEXT,
      title TEXT,
      description TEXT,
      product_type_id INTEGER,
      creator_id INTEGER,
      FOREIGN KEY (product_type_id) REFERENCES Product_Types(product_type_id),
      FOREIGN KEY (creator_id) REFERENCES Customers(customer_id)
      )`,
      ()=>{
        orders.forEach(({ 
          product_id,
          price,
          title,
          description,
          product_type_id,
          creator_id
        })=>{
          db.run(`INSERT INTO Products VALUES(
            ${null},
            "${price}",
            "${title}"
            "${description}"
            "${product_type_id}"
            "${creator_id}"
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