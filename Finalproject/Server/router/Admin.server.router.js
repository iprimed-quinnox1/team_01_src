var Masters = require('../controller/Admin.server.controller');
module.exports = function (app) {
    // Product master routes
    app.route('/insertproduct_item').post(Masters.insertProducts);
    app.route('/deleteItemFromList').post(Masters.deleteproductspecification);
    app.route('/updateinsideProductitem').post(Masters.updateproducts);
    app.route('/productitemdelete').post(Masters.deleteproductsId);
   app.route('/addingreviews').post(Masters.addingreviews);
  app.route('/initializeListProducts_list').get(Masters.retrievingproducts);

}