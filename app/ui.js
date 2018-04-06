'use strict';

// 3rd party libs
const { red, magenta, blue } = require('chalk');
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
  newCustomer,
  deleteProduct
} = require("./controllers/index");

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let mainMenuHandler = (err, userInput) => {
  if (userInput.choice == '1') {
    newCustomer()
      .then(custId => {
        console.log(`You just added a customer with the id of ${custId}`);
      })
      .catch(errMsg => {
        console.log(errMsg);
      })
  } else if (userInput.choice === '2') {
    setActiveCustomer()
      .then(active_user_id => {
        console.log(`You just selected this customer id: id!`);
        module.exports.displayWelcome(getActiveCustomer());
      })
      .catch(err => {
        console.log('error: ', err);
      });
  } else if (userInput.choice == '3') {
    promptNewPaymentOption()
      .then(paymentObj => {
        console.log('payment option to save', paymentObj)
        // TODO: save paymentObj to db
      })
      .then((custData) => {
        // TODO: deal with success: go back to main menu?
      })
      .catch(err => {
        console.log('newCustomer error', err);
      });
  } else if (userInput.choice == '4') {
    addCustomerProduct()
  }
  else if (userInput.choice == '5') {
    addProductToOrder()
      .then(data => {
        // TODO: deal with success: go back to main menu?
      })
      .catch(err => { });
  } else if (userInput.choice == '6') {
    completeOrder()
      .then(({ checkout, paymentOptions }) => module.exports.displayWelcome(getActiveCustomer()))
      .catch(err => { });
  } else if (userInput.choice == '7') {
    deleteProduct()
      .then(data => {
        // TODO: deal with success: go back to main menu?
      })
      .catch(err => console.log(`${red(err.message)}`));
  }
};

module.exports.displayWelcome = (active_user_id) => {
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
