var Masters = require('../controller/Cart.server.controller');
//var customeradd=require('../controller/CustomerDetails.server.controller');
//var app=express();
module.exports = function (app) {
  //  app.route('/addressforparticularcustomer').post(customeradd.addressforparticularcustomer);
    app.route('/cartinsert').post(Masters.cartinsert);
    app.route('/UpdateAddresscart').post(Masters.UpdateAddresscart);
    app.route('/initializeListCart').post(Masters.initializeListCart);
    app.route('/deleteItemFromCartListCheckout').post(Masters.deleteItemFromCartListCheckout);
    app.route('/deleteItemFromAddtoCartList').post(Masters.deleteItemFromAddtoCartList);

}
