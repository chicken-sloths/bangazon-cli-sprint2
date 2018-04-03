'use strict';
const { _generateCustomers } = require('./_customersFaker');
const { _generateOrders } = require('./_ordersFaker');
const { _generatePaymentOptions } = require('./_paymentOptionsFaker');
const { _generateProductOrders } = require('./_productOrdersFaker');
const { _generateProducts } = require('./_productsFaker');
const { _generateProductTypes } = require('./_productTypesFaker');

module.exports.generateProductData = () => {
  const fakerSpecs = {
    customerAmount: 25,
    orderAmount: 35,
    productAmount: 45,
    productTypesAmount: 10,
    maxProductsOnOrder: 5
  };
 
  const customers = _generateCustomers(fakerSpecs),
        productTypes = _generateProductTypes(fakerSpecs),
        products = _generateProducts(fakerSpecs),
        paymentOptions = _generatePaymentOptions(fakerSpecs),
        orders = _generateOrders(fakerSpecs, customers, paymentOptions),
        productOrders = _generateProductOrders(fakerSpecs, orders, products);

  return {customers, productTypes, products, paymentOptions, orders, productOrders};
};
