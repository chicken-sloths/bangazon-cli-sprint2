const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');
const products = require("../data/json/products.json");

module.exports = () => {
    db.run(`DROP TABLE IF EXISTS Products`);
    db.run(`CREATE TABLE IF NOT EXISTS Products (
      product_id INTEGER PRIMARY KEY,
      current_price TEXT,
      title TEXT,
      description TEXT,
      product_type_id INTEGER,
      creator_id INTEGER,
      FOREIGN KEY (product_type_id) REFERENCES Product_Types(product_type_id),
      FOREIGN KEY (creator_id) REFERENCES Customers(customer_id)
      )`,
      ()=>{
        products.forEach(({ 
          product_id,
          current_price,
          title,
          description,
          product_type_id,
          creator_id
        })=>{
          db.run(`INSERT INTO Products VALUES(
            ${product_id == undefined ? null : product_id},
            "${current_price}",
            "${title}",
            "${description}",
            "${product_type_id}",
            "${creator_id}"
          )`);
        });
      }
    );
};
