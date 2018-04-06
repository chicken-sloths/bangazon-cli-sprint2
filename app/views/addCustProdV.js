const colors = require('colors/safe');


module.exports.addCustProdV = [{
  name: 'productType',
  description: 'Enter Product Category by number',
  pattern: /^[0-9 ]*$/,
  message: colors.red("Selection invalid: product type does not exist, please select a numerical value from the list above"),
  required: true
}, {
  name: 'productName',
  description: 'Enter Product name',
  type: 'string',
  required: true
},{
  name: 'productPrice',
  description: 'Enter product price',
  pattern: /^\d+\.\d{2}$/,
  message: colors.red("Selection invalid: price must only include integers"),
  required: true
}, {
  name: 'productDescription',
  description: 'Enter product description',
  type: 'string',
  required: true
},
{
  name: 'productQuantity',
  description: 'Enter Product Quantity',
  type: 'integer',
  required: true
}]