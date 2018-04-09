"use strict";

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

module.exports.getAllPaymentTypes = () =>
  new Promise((resolve, reject) =>
    db.all(`SELECT * FROM Payment_Types`, 
      (err, types) => err ? reject(err) : resolve(types)
    )
  );