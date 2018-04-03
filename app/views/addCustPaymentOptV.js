module.exports.paymentOptionPrompts = [
  {
    name: 'paymentType',
    message: 'Please enter a payment option (e.g. Visa, Mastercard, etc)',
    required: true,
    pattern: '/^[a-zA-Z\s\-]+$/'
  },
  {
    name: 'accountNumber',
    message: 'Please enter a payment option (e.g. Visa, Mastercard, etc)',
    required: true,
    pattern: '^[0-9 ]*$'
  }
]