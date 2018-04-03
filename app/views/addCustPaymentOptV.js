module.exports.customerPaymentOptions = [
  {
    name: 'paymentOptions',
    message: 'Please enter a payment option (e.g. Visa, Mastercard, etc)',
    required: true,
    pattern: '/^[a-zA-Z\s\-]+$/'
  },
  {
    name: "paymentOptions",
    message: "Please enter a payment option (e.g. Visa, Mastercard, etc)",
    required: true,
    pattern: '^[0-9 ]*$'
  }

]