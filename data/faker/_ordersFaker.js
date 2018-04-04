'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');

const _generateOrders = ({ orderAmount }, customers, paymentOptions) => {
  let orders = [];

  const doesCustomerHaveOpenOrder = customerId => orders.find(order => order.customer_id === customerId && order.payment_option_id === null) ? true : false;

  for (let i = 0; i < orderAmount; i++) {

    // Selects a customer and their payment
    // so that the order and payment_option will have the same customer_id
    const randomCustomer = customers[randomInt(customers.length)];
    const customerPaymentOptionId = 
      paymentOptions.find(option => option.customer_id === randomCustomer.customer_id)
      ? paymentOptions.find(option => option.customer_id === randomCustomer.customer_id).payment_option_id
      : null;
    
    const order = {
      order_id: i,
      customer_id: randomCustomer.customer_id,
      payment_option_id: customerPaymentOptionId
    };

    const isOrderOpen = order => order.payment_option_id === null ? true : false;

    // If the order is open, then check if there already is another open order.  
    // If there is not another one open, add it.
    // OR if the order is closed, add it.
    if((isOrderOpen(order) && !doesCustomerHaveOpenOrder(randomCustomer.customer_id)) || !isOrderOpen(order)) {
      orders.push(order);
    }
  }

  return orders;
};

module.exports = {
  _generateOrders
};
