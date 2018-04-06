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
  newPaymentOption
} = require("./controllers/index");

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

const warning = string => {
  console.log(red(string));
  module.exports.displayWelcome(getActiveCustomer());
};
const success = string => {
  console.log(green(string));
  module.exports.displayWelcome(getActiveCustomer());
}

let mainMenuHandler = (err, userInput) => {
  if (userInput.choice == '1') {
    newCustomer()
      .then(custId => {
        success(`You just added a customer with the id of ${custId}`);
      })
      .catch(err => warning(err));
  } else if (userInput.choice === '2') {
    setActiveCustomer()
      .then(id => {
        success(`You just selected this customer id: ${id}`);
      })
      .catch(err => warning(err));
  } else if (userInput.choice == '3') {
    promptNewPaymentOption(getActiveCustomer())
      .then(paymentObj => {
        return saveNewPaymentOption(paymentObj);
      })
      .then((data) => {
        success(data);
      })
      .catch(err => warning(err));
  } else if (userInput.choice == '4') {
    addCustomerProduct()
      .then(response => {
        success("You have added the product.");
      })
      .catch(err => warning(err));
  }
  else if (userInput.choice == '5') {
    addProductToOrder()
      .then(data => {
        success("You have added the product to your cart.");
      })
      .catch(err => warning(err));
  } else if (userInput.choice == '6') {
    completeOrder(getActiveCustomer())
      .then(data => {
        success(data);
      })
      .catch(err => warning(err));
  } else if (userInput.choice == '7') {
    deleteProduct()
      .then(data => {
        data ? success("You have successfully deleted the product.") : warning("The product was not deleted. Try again later.");
      })
      .catch(err => warning(err));
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
