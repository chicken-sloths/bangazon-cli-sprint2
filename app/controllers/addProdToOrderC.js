'use strict';
/**
 * A module that connects the Add Products To Order prompt interface to the Product Orders Model
 * and allows the active customer to add products to their shopping cart
 * @module addProductToOrderController 
 */

const prompt = require('prompt');
const promptObj = require('../views/addProdToOrderV');
const { getAllStockedProducts, getQuantityRemaining } = require('../models/ProductsM');
const { getActiveCustomer } = require('../controllers/activeCustC');
const { checkForActiveOrder, createNewOrder } = require('../models/OrdersM.js');
const { addToProductOrders } = require('../models/ProductOrdersM');
const { getProduct } = require('../models/ProductsM');

/**
 * @function addProduct
 * @returns {Promise} 
 * @param {Object} order The whole order object, will eventually extract the order id
 * @param {String} prodId The numerical ID of the product they want to add, which is stored as a string
 * @description This is function's main purpose is to figure out if the active user already has an open order and call other functions accordingly. If they do have an active order, it calls the function addProductToExistingOrder(). If not, it creates a new order and then calls addProductToExistingOrder(). 
 */

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

/**
 * @function addProductToExistingOrder
 * @returns {Promise} 
 * @param {Integer} orderId The id of the active customer's active order
 * @param {String} prodId The numerical ID of the product they want to add, which is stored as a string
 * @description This function assumes that the active customer has an open order. It takes the selected product and adds it to their active order. (To be specific: adding a product to an order means adding a new entry to the Product_Orders table in the Bangazon DB. The Product_Orders table includes product_id, order_id, and current_price),  
 */

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

/**
 * @function createOrder
 * @returns {Promise} 
 * @param {Integer} customerId The id of the active customer
 * @description  Creates a new order (with a null payment id) for the active customer 
 */
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


/**
 * @function addProductToOrder
 * @returns {Promise} 
 * @description  Promises to list all the products, prompt user for a product id to add to their order, check to make sure the selected product isn't sold out, and then call the appropriate functions to add the product to their order.
 */
module.exports.addProductToOrder = () => {

  let customerId = getActiveCustomer();

  return new Promise((resolve, reject) => {
    getAllStockedProducts()
      .then(products => {
        // List all the products with current quantity > 0
        console.log('Here are all the products:');
        products.forEach((product) => {
          console.log(`${product.product_id}. ${product.title}`);
        });
        // Prompt the user to enter a product id  
        prompt.get(promptObj, (err, { prodId }) => {
          if (err) return reject(err);
          //checks the remaining quantity of the product selected, if product quantity <= 0, promise rejects.
          getQuantityRemaining(prodId)
          .then(prodQuantity => { 
            // Check to see if the customer already has an active order
            return checkForActiveOrder(customerId)
          }) 
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
