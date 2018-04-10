
const { updateProduct, getProduct } = require('../models/ProductsM');
const { getProductId, getProperties } = require('../views/updateProdV');
const prompt = require('prompt');


/*

  1. call the getProductId prompt, which is an object
  2. call the getProduct model function
  3. pass the product object to the getProperties prompt
  4. receive the new data and pass it to the updateProduct model function

*/

module.exports.updateProd = () => {
  return new Promise((resolve, reject)=>{
    prompt.get(getProductId, (error, productId)=>{
      console.log('PRODUCT ID',productId);
      getProduct(productId)
      .then(productObj=>{
        prompt.get(getProperties(productObj), ()=>{

        });
      });
    });
  });
};