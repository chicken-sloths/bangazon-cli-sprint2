'use strict';

module.exports.createDeletePrompt = ids => {
  return [{
    name: 'objectId',
    description: 'Enter the ID of the product you\'d like to delete',
    type: 'integer',
    required: true,
    conform: function(input) {
      return ids.some(id => id === input);
    },
    message: 'Please select an ID from the listed products'

  }];
};
