const colors = require('colors/safe');


module.exports.addCustProdV = [{
  name: 'productType',
  description: 'Enter product category by number',
  pattern: /^[0-9 ]$/,
  message: colors.red("Selection invalid: product type does not exist, please select a numerical value from the list above"),
  required: true
}, {
  name: 'productName',
  description: 'Enter product name',
  type: 'string',
  required: true
}, {
  name: 'productPrice',
  description: 'Enter product price',
  pattern: /^\d+\.\d{2}$/,
  message: colors.red("Selection invalid: please use standard price format (e.g., 123.45, 9.99) without the $ sign"),
  required: true
}, {
  name: 'productDescription',
  description: 'Enter product description',
  type: 'string',
  required: true
}, {
  name: 'productQuantity',
  description: 'Enter product quantity',
  pattern: /^\d+$/,
  message: colors.red("Please enter a whole, positive integer"),
  required: true
}];
