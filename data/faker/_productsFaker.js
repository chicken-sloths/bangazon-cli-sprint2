'use strict';
const faker = require('faker');
const randomInt = require('../randomInt');

const _generateProducts = ({ productAmount, customerAmount, productTypesAmount }) => {
  let products = [];

  for (let i = 0; i < productAmount; i++) {
    const product = {
      product_id: i,
      price: faker.commerce.price(),
      title: faker.commerce.productName(),
      description: faker.commerce.productAdjective(),
      product_type_id: randomInt(productTypesAmount),
      creator_id: randomInt(customerAmount)
    };

    products.push(product);
  }

  return products;
};

module.exports = {
  _generateProducts
};