"use strict";

const { setActiveCustomer, getActiveCustomer } = require('./activeCustC');
const { newPaymentOption, saveNewPaymentOption } = require('./addCustPaymentOptC');
const { addCustomerProduct } = require('./addCustProdC');
const { addProductToOrder } = require('./addProdToOrderC');
const { completeOrder } = require('./completeOrderC');
const { newCustomer } = require('./createCustC');
const { deleteProduct } = require('./deleteProdC');
const { updateProduct } = require('./updateProdC');

module.exports = {
  setActiveCustomer,
  getActiveCustomer,
  addCustomerProduct,
  addProductToOrder,
  completeOrder,
  deleteProduct,
  newCustomer,
  newPaymentOption,
  saveNewPaymentOption,
  updateProduct
};