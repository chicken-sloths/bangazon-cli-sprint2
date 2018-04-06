'use strict';

const prompt = require('prompt');
const promptObj = require('../views/addProdToOrderV');
const { getAllProducts } = require('../models/ProductsM');
const { getActiveCustomer } = require('../controllers/activeCustC');
const { checkForActiveOrder, createNewOrder } = require('../models/OrdersM.js');
const { addToProductOrders } = require('../models/ProductOrdersM');
const { getProduct } = require('../models/ProductsM');

// Promises to add a product to a customer's order
const addProduct = (order, prodId) => {
  console.log('order id in addProduct', orderId);

  // If no order parameter gets passed in, create a new order and grab its id
  if(!order){
    console.log('no order was passed in!');
    createOrder(getActiveCustomer())
    .then(newId => {
      console.log('Shoo! now we have an order id!');
      orderId = newId;
    });
  }

  return new Promise((resolve, reject) => {
    getProduct(prodId)
    .then(productObj => {
      // this takes the whole product obect (rather than just the id) because we have the join table referencing current price
      return addToProductOrders(orderId, productObj)
    })
    .then(changes => {
      changes > 0 ? resolve('Product added') : reject('We couldn\'t add that product.')
    })
    .catch(err => {
      reject('Add to order or get product didn\'t work.');
    })
  })
}

// Creates a new order (with a null payment id) for the active customer and then calls addProduct
const createOrder = (customerId) => {

  const date = new Date();
  const isoDate = date.toISOString();

  let order = {
    order_id: null,
    customer_id: customerId,
    payment_option_id: null,
    creation_date: isoDate
  }

  return new Promise((resolve, reject) => {
    createNewOrder(order)
      .then(orderId => {
        resolve(orderId);
      })
      .catch(err => {
        reject(err);
      })
  })
}


module.exports.addProductToOrder = () => {

  let customerId = getActiveCustomer();

  return new Promise((resolve, reject) => {
    getAllProducts()
      .then(products => {
        // List all the products
        console.log('Here are all the products:');
        products.forEach((product, i) => {
          console.log(`${i}. ${product.title}`);
        });
        // Prompt the user to enter a product id  
        prompt.get(promptObj, (err, { prodId }) => {
          if (err) return reject(err);
          // Check to see if the customer already has an active order
          return checkForActiveOrder(customerId)
          .then(order => {
            console.log('order in getAllProducts for customer 2', order)
            return addProduct(order.order_id, prodId)
          })
          .then((msg) => {
            console.log('msg in getAllProducts', msg);
            resolve(msg);
          })
          .catch(err => {
            reject(err);
          });
        });
    })
  });
};
