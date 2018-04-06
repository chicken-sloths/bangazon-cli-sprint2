"use strict";

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

module.exports.getPaymentOptionsForCustomer = id =>
  new Promise((resolve, reject) =>
    db.all(`SELECT * FROM Payment_Options WHERE customer_id=${id}`, 
      (err, opts) => err ? reject(err) : resolve(opts)
    )
  );

module.exports.addPaymentOption = ({payment_type, account_number, customer_id}) =>
  new Promise((resolve, reject) =>
    db.run(`INSERT INTO Payment_Options(
        payment_option_id,
        payment_type,
        account_number,
        customer_id)
      VALUES(
      	null,
      	${payment_type},
      	"${account_number}",
      	${customer_id}
      )`, function(err) {
      	err ? reject(err) : resolve(this.lastID)
      }
    )
  );
