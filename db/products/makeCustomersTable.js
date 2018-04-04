'use strict';
const { generateSqlTable } = require("../sqlRunTemplate");
const customers = require("../../data/json/customers.json");

module.exports = () => {
  generateSqlTable(
    {
      tableName: `Customers`,
      columns:
      `customer_id INTEGER PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      account_creation_date TEXT,
      street_address TEXT,
      city TEXT,
      state TEXT,
      postal_code TEXT,
      phone_number TEXT`,
      dataToIterateOver: customers,
      valuesToInsert: [
        `customer_id`,
        `first_name`,
        `last_name`,
        `account_creation_date`,
        `street_address`,
        `city`,
        `state`,
        `postal_code`,
        `phone_number`
      ]
    }
  );
}


