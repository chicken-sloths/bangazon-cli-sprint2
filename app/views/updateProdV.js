'use strict';

const colors = require('colors/safe');
const { getProduct } = require("../models/ProductsM");

module.exports.getProductId = [{
  name: 'objectId',
  description: 'Enter the ID of the product you\'d like to update',
  type: 'string',
  required: true
}];

module.exports.getProperties = (product) => {
  return [{
    name: 'productType',
    description: 'Enter Product Category by number',
    pattern: /^[0-9]$/,
    message: colors.red("Selection invalid: product type does not exist, please select a numerical value from the list above"),
    required: true,
    default: product.product_type_id
  }, {
    name: 'productName',
    description: 'Enter product name',
    type: 'string',
    required: true,
    default: product.title
  }, {
    name: 'productPrice',
    description: 'Enter product price',
    pattern: /^\d+\.\d{2}$/,
    message: colors.red("Selection invalid: please use standard price format (e.g., 123.45, 9.99) without the $ sign"),
    required: true,
    default: product.current_price
  }, {
    name: 'productDescription',
    description: 'Enter product description',
    type: 'string',
    required: true,
    default: product.description
  }, {
    name: 'productQuantity',
    description: 'Enter product quantity',
    pattern: /^\d+$/,
    message: colors.red("Please enter a whole, positive integer"),
    required: true,
    default: product.quantity
  }];
};