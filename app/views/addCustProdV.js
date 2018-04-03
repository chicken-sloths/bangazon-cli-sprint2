const colors = require('colors/safe');

module.exports.addCustProdV = [{
  name: 'productName',
  description: 'Enter Product name',
  type: 'string',
  required: true
}, {
  name: 'productPrice',
  description: 'Enter product price',
  pattern: /^[0-9 ]*$/,
  message: colors.red("Selection invalid: price must only include integers"),
  required: true
}, {
  name: 'productDescription',
  description: 'Enter product description',
  type: 'string',
  required: true
}, {
  name: 'productType',
  description: 'Choose a product type',
  type: 'string',
  required: true
}]