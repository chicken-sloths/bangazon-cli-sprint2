'use strict';

module.exports = [{
  name: 'first_name',
  description: 'Enter customer first name',
  type: 'string',
  pattern: /^[\w]+$/,
  required: true
}, {
  name: 'last_name',
  description: 'Enter customer last name',
  type: 'string',
  pattern: /^[\w]+$/,
  required: true
}, {
  name: 'street_address',
  description: 'Enter street address',
  type: 'string',
  required: true
}, {
  name: 'city',
  description: 'Enter city',
  type: 'string',
  pattern: /^[\w\s-]+$/,
  required: true
}, {
  name: 'state',
  description: 'Enter state (KY)',
  type: 'string',
  pattern: /^[A-Z]{2}$/,
  required: true
}, {
  name: 'postal_code',
  description: 'Enter postal code',
  type: 'string',
  pattern: /^\d{5}$/,
  required: true
}, {
  name: 'phone_number',
  description: 'Enter phone number (xxx-yyy-zzzz)',
  type: 'string',
  pattern: /^\d{0,1}[-\s]*\(*\d{3}\)*[-\s]*\d{3}[-\s]*\d{4}$/,
  required: true
}];