'use strict';

const prompt = require('prompt');
const promptObj = require('../views/addProdToOrderV');
const { getAllProducts } = require('../models/ProductsM');
const { getActiveCustomer } = require('../controllers/activeCustC');
const { checkForActiveOrder, createNewOrder } = require('../models/OrdersM.js');
const { addToProductOrders } = require('../models/ProductOrdersM');
const { getProduct } = require('../models/ProductsM');

// Promises to print all products and in a numbered list to the terminal
const listAllProds = () => {
  return new Promise((resolve, reject) => {
    getAllProducts()
      .then(products => {
        console.log('Here are all the products:');
        products.forEach((product, i) => {
          console.log(`${i}. ${product.title}`)
        });
      });
  })
}

// Promises to add a product to a customer's order
const addProduct = (order, prodId) => {
  return new Promise((resolve, reject) => {
    getProduct(prodId)
    .then(productObj => {
      return addToProductOrders(order_id, productObj)
    })
    .then(changes => {
      resolve(changes);
    })
    .catch(err => {
      reject(err);
    })
  })
}

// Creates a new order (with a null payment id) for the active customer and then calls addProduct
const createNewThenAdd = (customerId, prodId) => {
  let order = {
    order_id: null,
    customer_id: customerId,
    payment_option_id: null
  }
  return new Promise((resolve, reject) => {
    createNewOrder(order)
      .then(orderId => {
        return addProduct(orderId)
      })
  })
}


module.exports.addProductToOrder = () => {
  let customerId = getActiveCustomer();
  console.log('active customer id', customerId);
  return new Promise((resolve, reject) => {
    listAllProds()
      .then(() => {
        prompt.get(promptObj, (err, prodId) => {
          console.log('product id', prodId);
          if (err) return reject(err);
          return checkForActiveOrder(customerId)
          .then(order => {
            if (order){
              return addProduct(order);
            } else {
              return createNewThenAdd(customerId, prodId)
            }
          })
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
        });
    })
  });
};
