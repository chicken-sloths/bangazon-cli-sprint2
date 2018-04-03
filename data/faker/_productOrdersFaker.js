'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');

const _generateProductOrders = ({ customerAmount, maxProductsOnOrder, productAmount }, orders) => {
  let productOrders = [];
  let curProductOrderId = 0;

  // Find an order for each customer
  for (let i = 0; i < customerAmount; i++) {

    // Check if a customer has an order
    const randomCustomerId = randomInt(customerAmount);
    const customerOrder = orders.find(order => order.customer_id === randomCustomerId) || null;

    // If there is an order, add a random amount of products to it.
    if (customerOrder !== null) {
      const randomAmountOfProducts = randomInt(maxProductsOnOrder) + 1;

      // Randomly selects randomAmountOfProducts of products
      for (let j = 0; j < randomAmountOfProducts; j++) {
        const randomProductId = randomInt(productAmount);
        const productOrder = {
          product_order_id: curProductOrderId,
          product_id: randomProductId,
          order_id: customerOrder.order_id
        };

        // Increment the current product order id for the next product
        curProductOrderId++;

        productOrders.push(productOrder);
      }
    }
  }

  return productOrders;
};

module.exports = {
  _generateProductOrders
};
