"use strict";

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

module.exports.getPaymentOptionsForCustomer = id =>
  new Promise((resolve, reject) =>
    db.all(`SELECT po.*, pt.name 
      FROM "Payment_Options" po
      JOIN "Payment_Types" pt ON po.payment_type = pt.payment_type_id
      WHERE customer_id=${id}`, 
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
