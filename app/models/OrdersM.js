module.exports.getSingleOrder = orderId => {
  // This will get the order matching the orderId
  // This will be used by the 
  new Promise((resolve, reject) =>{
    db.get(
        `SELECT * FROM Orders WHERE order_id = ${id}`,
        (err, order) => err ? reject(err) : resolve(order)
      );
  });
};

module.exports.patchOrder = obj => {
  // This function will add a payment type to an order

};

// This will INSERT a new order into the Orders table.
// It will be used by #5 (on the white board), adding a product to an order. 
// 2 scenarios:
// If a customer HAS an order already that contains products, but that orders payment type
//    is null, then it will add the product to that existing order
// If a customer does not currently have an order (that contains >0 products),
//    then it will create a new order for them
const createNewOrder = obj => {
  // This function will create a new order for a customer wihtout an active order

};
