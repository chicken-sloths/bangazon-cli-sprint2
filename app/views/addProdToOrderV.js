'use strict';

module.exports = {
  name: 'prodId',
  description: 'Enter the Purchase Code of the product you\'d like to add to this order',
  required: true,
  pattern: '^[0-9]*$'
};