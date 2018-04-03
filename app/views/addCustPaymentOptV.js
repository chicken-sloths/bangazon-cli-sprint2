module.exports.paymentOptionPrompts = [
  {
    name: 'paymentType',
    description: 'Please enter a payment option (e.g. Visa, Mastercard, etc)',
    required: true,
    type: 'string'
  },
  {
    name: 'accountNumber',
    description: 'Please enter your account number',
    required: true,
    pattern: '^[0-9 ]*$'
  }
]