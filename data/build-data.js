"use strict";

const { generateProductData } = require("./faker/index");
const fs = require('fs');
const path = require("path");

let jsonDir = __dirname+"/json";

// checks if data/json/ folder exists
fs.exists(jsonDir, folderExists => {
  if (folderExists) {
    writeJson(jsonDir);
  } else {
    // makes it if it doesn't
    fs.mkdir(jsonDir, err => {
      if (err) {
        console.log("mkdir error:",err);
      } else {
        writeJson(jsonDir);
      }
    });
  }
});

const writeJson = (jsonDir) => {
  let {
    customers,
    productTypes,
    products,
    paymentOptions,
    orders,
    productOrders
  } = generateProductData();

  fs.createWriteStream(jsonDir+"/customers.json").write(JSON.stringify(customers));
  
  fs.createWriteStream(jsonDir+"/productTypes.json").write(JSON.stringify(productTypes));

  fs.createWriteStream(jsonDir+"/products.json").write(JSON.stringify(products));

  fs.createWriteStream(jsonDir+"/paymentOptions.json").write(JSON.stringify(paymentOptions));

  fs.createWriteStream(jsonDir+"/orders.json").write(JSON.stringify(orders));

  fs.createWriteStream(jsonDir+"/productOrders.json").write(JSON.stringify(productOrders));

};
