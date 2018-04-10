
const { updateProduct, getProduct, getProductsByCreator } = require('../models/ProductsM');
const { getProductId, getProperties } = require('../views/updateProdV');
const { getActiveCustomer } = require('./activeCustC');
const { getProductTypes } = require('../models/ProductTypesM');
const { green } = require('colors');
const prompt = require('prompt');


/*
  1. call the getProductsByCreator function and print them out
  1. call the getProductId prompt, which is an object
  2. call the getProduct model function
  3. pass the product object to the getProperties prompt
  4. receive the new data and pass it to the updateProduct model function

*/

module.exports.updateProduct = () => {
  return new Promise((resolve, reject)=>{
    getProductsByCreator(getActiveCustomer())
    .then(theirProds=>{
      theirProds.forEach(prod=>{
        console.log(`${prod.product_id}. ${prod.title}`);
      });
      
      prompt.get(getProductId, (error, results)=>{
        getProductTypes()
        .then(prodTypes=>{
        console.log(green('Please select a product category from the list below:'));
        prodTypes.map( (pt) => {
          console.log(`${pt.product_type_id}. ${pt.title}`);
        });
        let updatedProductId = results.objectId;
        getProduct(updatedProductId)
        .then(productObj=>{
          prompt.get(getProperties(productObj), (error, 
            {
              product_id,
              current_price,
              title,
              description,
              product_type_id,
              quantity,
            })=>{
            const newProductObject = {
              product_id: updatedProductId,
              current_price,
              title,
              description,
              product_type_id,
              quantity,
              creator_id: getActiveCustomer(),
              
            }
            updateProduct(updatedProductId, newProductObject)
            .then(prodId=>{
              console.log('SUCCESFULLY POSTED',prodId);
            })
          });
          
        });
        });
      });
    });
  });
};