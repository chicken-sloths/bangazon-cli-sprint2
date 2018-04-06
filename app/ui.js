'use strict';

// 3rd party libs
const { red, blue, magenta, green } = require('chalk');
const prompt = require('prompt');
const colors = require('colors/safe');
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue('Bangazon Corp');

// app modules
const {
  setActiveCustomer,
  getActiveCustomer,
  addCustomerProduct,
  addProductToOrder,
  completeOrder,
  deleteProduct,
  newCustomer,
  newPaymentOption,
  saveNewPaymentOption
} = require("./controllers/index");

let options = {
  1: newCustomer,
  2: setActiveCustomer,
  4: addCustomerProduct,
  5: addProductToOrder,
  6: completeOrder,
  7: deleteProduct
};

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let mainMenuHandler = (err, userInput) => {
  // if there is no activeCustomer and there has to be...
  if (userInput.choice != '2' && userInput.choice != '1' && getActiveCustomer() == null) {
    warning("Please select an active customer.");
  } else {
    if (options.hasOwnProperty(userInput.choice)) {
      options[userInput.choice]()
        .then(response => {
          success(response);
        })
        .catch(err => warning(err));
    } else if (userInput.choice == '3') {
      newPaymentOption(getActiveCustomer())
        .then(paymentObj => {
          return saveNewPaymentOption(paymentObj);
        })
        .then((response) => success(response))
        .catch(err => warning(err));
    } /*
    else if (userInput.choice == '5') {
      addProductToOrder()
        .then(data => {
          success();
        })
        .catch(err => warning(err));
    } */
  }
};

const displayWelcome = (active_user_id) => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
  `,
      active_user_id === undefined ? red(`No active customer selected!`) : blue(`Active customer: ${active_user_id}`)

      , `
  ${magenta('1.')} Create a customer account
  ${magenta('2.')} Choose active customer
  ${magenta('3.')} Create a payment option
  ${magenta('4.')} Add product to sell
  ${magenta('5.')} Add product to shopping cart
  ${magenta('6.')} Complete an order
  ${magenta('7.')} Remove customer product
  ${magenta('8.')} Update product information
  ${magenta('9.')} Show stale products
  ${magenta('10.')} Show customer revenue report
  ${magenta('11.')} Show overall product popularity
  ${magenta('12.')} Leave Bangazon`);
    prompt.get([{
      name: 'choice',
      description: 'Please make a selection'
    }], mainMenuHandler);
  });
};

const warning = string => {
  console.log(red(string));
  displayWelcome(getActiveCustomer());
};
const success = string => {
  console.log(green(string));
  displayWelcome(getActiveCustomer());
}

module.exports = displayWelcome(getActiveCustomer());