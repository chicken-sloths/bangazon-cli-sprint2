"use strict";

const { setActiveCustomer, getActiveCustomer } = require('./activeCustC');
const { promptNewPaymentOption } = require('./addCustPaymentOptC');
const { addCustomerProduct } = require('./addCustProdC');
const { addProductToOrder } = require('./addProdToOrderC');
const { completeOrder } = require('./completeOrderC');
const { newCustomer } = require('./createCustC');
const { deleteProduct } = require('./deleteProdC');

module.exports = {
  setActiveCustomer,
  getActiveCustomer,
  addCustomerProduct,
  addProductToOrder,
  completeOrder,
  newCustomer,
  deleteProduct
};