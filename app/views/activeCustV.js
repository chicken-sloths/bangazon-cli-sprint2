'use strict';

module.exports.createPrompt = numberOfCustomers => {
    const digits = (numberOfCustomers-1).toString().split('');
    const customersRegEx = new RegExp(`^[1-${digits[0]}][1-${digits[1]}]$`);

    const activeCustomerPrompt = [{
        name: 'custId',
        description: 'Please choose a customer from the list.',
        required: true,
        pattern: customersRegEx
    }]

    return activeCustomerPrompt;
}


