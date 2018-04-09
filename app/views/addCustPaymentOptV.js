module.exports.paymentOptionPrompts = (paymentTypesArray)=>{
  const typesRegEx = new RegExp(`^[0-${paymentTypesArray.length}]$`);
  
  const newPaymentOption =  [
    {
      name: 'paymentType',
      description: 'Please enter a payment option',
      required: true,
      conform: (userInput)=>{
        return (userInput < paymentTypesArray.length) && (userInput >= 0) && Number.isInteger(+userInput) ? true : false;
      }
    },
    {
      name: 'accountNumber',
      description: 'Please enter your account number',
      required: true,
      pattern: '^[0-9 ]*$'
    }
  ];
  return newPaymentOption;
}
