'use strict';

// 3rd party libs
const { red, magenta, blue } = require('chalk');
const prompt = require('prompt');
const colors = require('colors/safe');
const path = require('path');
const { Database } = require('sqlite3').verbose();
prompt.message = colors.blue('Bangazon Corp');

// app modules
const { promptNewCustomer } = require('./controllers/createCustC');
const { addProductToOrder } = require('./controllers/addProdToOrderC');
const { deleteProduct } = require('./controllers/deleteProdC');
const { completeOrderPrompt } = require('./controllers/completeOrderC'); 

const db = new Database(path.join(__dirname, '..', 'db', 'bangazon.sqlite'));

prompt.start();

let mainMenuHandler = (err, userInput) => {
  // TODO: check active user here and limit options accordingly
  console.log('user input', userInput);
  if (userInput.choice == '1') {
    promptNewCustomer()
      .then((custData) => {
        // TODO: deal with success: go back to main menu?
      })
      .catch(err => {
        console.log('promptNewCustomer error', err);
      });
  } else if (userInput.choice == '5') {
    addProductToOrder()
      .then(data => {
        // TODO: deal with success: go back to main menu?
      })
      .catch(err => {
        console.log('addProductToOrder error', err);
      });
  } else if (userInput.choice == '6') {
    completeOrderPrompt()
      .then(({checkout, paymentOptions}) => module.exports.displayWelcome())
      .catch(err => {});
  } else if (userInput.choice == '7') {
    deleteProduct()
      .then(data => {
        // TODO: deal with success: go back to main menu?
      })
      .catch(err => {
        console.log('deleteProduct error', err);
      });
  }
};

module.exports.displayWelcome = () => {
  let headerDivider = `${magenta('*********************************************************')}`
  return new Promise((resolve, reject) => {
    console.log(`
  ${headerDivider}
  ${magenta('**  Welcome to Bangazon! Command Line Ordering System  **')}
  ${headerDivider}
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
