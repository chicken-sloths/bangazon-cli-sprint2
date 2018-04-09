'use strict';

module.exports.createPrompt = numberOfCustomers => {

    const activeCustomerPrompt = [{
        name: 'custId',
        description: 'Please choose a customer from the list.',
        required: true,
        conform: userChoice => userChoice >= 0 && userChoice < numberOfCustomers && Number.isInteger(+userChoice) ? true : false
        
    }]
    return activeCustomerPrompt;
}


