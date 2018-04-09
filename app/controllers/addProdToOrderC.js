'use strict';

const prompt = require('prompt');
const promptObj = require('../views/addProdToOrderV');
const { getAllStockedProducts } = require('../models/ProductsM');
const { getActiveCustomer } = require('../controllers/activeCustC');
const { checkForActiveOrder, createNewOrder } = require('../models/OrdersM.js');
const { addToProductOrders } = require('../models/ProductOrdersM');
const { getProduct } = require('../models/ProductsM');


// Promises to add a product to a customer's order
const addProduct = (order, prodId) => {
  return new Promise((resolve, reject) => {
    // Declare an empty variable that we'll define once we figure out if there's an order or not
    let orderId = null;

    // If no order parameter gets passed in, create a new order and grab its id
    if (!order) {
      createOrder(getActiveCustomer())
        .then(newId => {
          orderId = newId;
          return addProductToExistingOrder(orderId, prodId)
        })
        .catch(err => {
          reject('Failed to create a new order. Please try again later.');
        })
        .then(msg => {
          resolve(msg);
        });
    } else {
      // If they already have an order, grab its id
      orderId = order.order_id;
      return addProductToExistingOrder(orderId, prodId)
        .then(msg => {
          resolve(msg);
        })
        .catch(err => {
          reject('Failed to create a new order. Please try again later.');
        });
    }
  });
};

const addProductToExistingOrder = (orderId, prodId) => {
  return new Promise((resolve, reject) => {
    getProduct(prodId)
      .then(productObj => {
        // addToProductOrders takes the whole product obect (rather than just the id) because we have the join table referencing current price
        return addToProductOrders(orderId, productObj)
      })
      .then(changes => {
        changes > 0 ? resolve('Product added') : reject('We couldn\'t add that product.')
      })
      .catch(err => {
        reject('Add to order or get product didn\'t work.');
      });
  });
};

// Creates a new order (with a null payment id) for the active customer and then calls addProduct
const createOrder = (customerId) => {

  const date = new Date();
  const isoDate = date.toISOString();

  let order = {
    order_id: null,
    customer_id: customerId,
    payment_option_id: null,
    creation_date: isoDate
  };

  return new Promise((resolve, reject) => {
    createNewOrder(order)
      .then(orderId => {
        resolve(orderId);
      })
      .catch(err => {
        reject(err);
      });
  });
};

module.exports.addProductToOrder = () => {

  let customerId = getActiveCustomer();

  return new Promise((resolve, reject) => {
    getAllStockedProducts()
      .then(products => {
        // List all the products
        console.log('Here are all the products:');
        products.forEach((product, i) => {
          console.log(`**${product.title}**`);
          console.log(`Purchase Code: ${product.product_id}`);
          console.log("          ");
        });
        // Prompt the user to enter a product id  
        prompt.get(promptObj, (err, { prodId }) => {
          if (err) return reject(err);
          // Check to see if the customer already has an active order
          checkForActiveOrder(customerId)
            .then(order => {
              return addProduct(order, prodId)
            })
            .then((msg) => {
              return resolve(msg);
            })
            .catch(err => {
              return reject(err);
            });
        });
      });
  });
};
