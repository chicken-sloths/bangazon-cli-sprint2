"use strict";
/**
 * A module that accesses the Payment_Options table in the bangazon.sqlite DB
 * @module paymentOptionsModel
 */

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('db/bangazon.sqlite');

/**
 * @function getPaymentOptionsForCustomer
 * @param {number} id - The ID of the active customer
 * @returns {Promise} A promise representing an array of all payment options that are associated with the customer
 * @description Gets all payment options available for the active customer
 */
module.exports.getPaymentOptionsForCustomer = id =>
  new Promise((resolve, reject) =>
    db.all(`SELECT * FROM Payment_Options WHERE customer_id=${id}`,
      (err, opts) => err ? reject(err) : resolve(opts)
    )
  );

/**
 * @function addPaymentOption
 * @param {Object} paymentOption
 * @param {string} paymentOption.type - The name of payment type
 * @param {string} paymentOption.account_number - The account number for that payment type
 * @param {number} paymentOption.customer_id - The customer id of the active customer
 * @returns {Promise} A Promise that represents the payment_option_id of the newly added payment option
 * @description Adds a payment option for the active customer to the Payment_Options table in the baganzon.sqlite DB
 */

module.exports.addPaymentOption = ({type, account_number, customer_id}) =>
  new Promise((resolve, reject) =>
    db.run(`INSERT INTO Payment_Options(
        payment_option_id,
        type,
        account_number,
        customer_id)
      VALUES(
      	null,
      	"${type}",
      	"${account_number}",
      	${customer_id}
      )`, function(err) {
      	err ? reject(err) : resolve(this.lastID)
      }
    )
  );
