'use strict';
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("db/cli-sprint.sqlite");

/*
EXAMPLE FUNCTION CALL

generateSqlTable(
  {
    tableName: `commputers`,
    columns: 
      `computer_id INTEGER PRIMARY KEY,
      purchase_date TEXT,
      decommission_date TEXT,
      a_number INTEGER,
      thirty_seven INTEGER`,
    dataToIterateOver: computers,
    valuesToInsert: [
      null,
      `purchaseDate`, 
      `decommissionDate`, 
      `aNumber`, 
      37]
  }
);
*/

const escapeSingleQuotes = value => 
  typeof value === 'string' 
    ? value.replace("'", "''") 
    : value;

// Drops the table if exists, then creates it and inserts the data from dataToIterateOver.
// Values to Insert is what properties on each peice of data to iterate over that should be extracted
const generateSqlTable = ({ tableName, columns, dataToIterateOver, valuesToInsert }) => {
  db.serialize(() => {
    db.run(`DROP TABLE IF EXISTS ${tableName}`);

    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`);

    dataToIterateOver.forEach(object => {
      let SqlValues = "";

      // Iterate over the SqlValues to insert and turn them into sql code
      for (let i = 0; i < valuesToInsert.length; i++) {
        const value = valuesToInsert[i];

        // If the valueToInsert itself is a number, add that literal number.
        if (Number.isInteger(value)) {
          SqlValues += `${value}`;
        }

        // If the value on the object is an integer, add the number without quotes.  
        else if (Number.isInteger(object[value])) {
          SqlValues += `${object[value]}`;
        }
        else if (value === null) {
          SqlValues += `${null}`
        }

        // Else it considers it a string
        else {
          SqlValues += `'${escapeSingleQuotes(object[value])}'`;
        }
        
        // Add a comma to the string if it is not the final value
        const shouldAddComma = i < valuesToInsert.length - 1 ? "," : "";
        SqlValues += `${shouldAddComma}`;
        
      }

      db.run(`INSERT INTO ${tableName} VALUES (${SqlValues})`);
    });
  });
};

module.exports = { generateSqlTable };
