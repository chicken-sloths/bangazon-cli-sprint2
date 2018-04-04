const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/bangazon.sqlite');
const productOrders = require("../data/json/productOrders.json");

module.exports = () => {
  db.serialize(()=>{
    db.run(`DROP TABLE IF EXISTS Product_Orders`);
    db.run(`CREATE TABLE IF NOT EXISTS Product_Orders (
      product_order_id INTEGER PRIMARY KEY,
      product_id INT,
      order_id INT,
      product_price TEXT,
      FOREIGN KEY (product_id) REFERENCES Products(product_id),
      FOREIGN KEY (order_id) REFERENCES Orders(order_id) ON DELETE CASCADE
      )`,
      ()=>{
        productOrders.forEach(({ 
          product_order_id,
          product_id,
          order_id,
          product_price
        })=>{
          db.run(`INSERT INTO Product_Orders VALUES(
            ${product_order_id == undefined ? null : product_order_id},
            "${product_id}",
            "${order_id}",
            "${product_price}"
          )`);
        });
      }
    );
  });
};