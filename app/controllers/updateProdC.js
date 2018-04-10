
const { updateProduct, getProduct, getProductsByCreator } = require('../models/ProductsM');
const { getProductId, getProperties } = require('../views/updateProdV');
const { getActiveCustomer } = require('./activeCustC');
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
      prompt.get(getProductId, (error, productId)=>{
        console.log('PRODUCT ID',productId);
        getProduct(productId)
        .then(productObj=>{
          prompt.get(getProperties(productObj), (error, newProperties)=>{
            updateProduct(newProperties)
            .then(prodId=>{
              console.log('SUCCESFULLY POSTED',prodId);
            })
          });
        });
      });
    });
  });
};