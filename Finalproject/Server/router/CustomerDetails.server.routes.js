var Masters = require('../controller/CustomerDetails.server.controller');
module.exports = function (app) {
    // Product master routes
    app.route('/insertCustomer').post(Masters.insertCustomer);
    app.route('/updateAddress').post(Masters.updateAddress);
    app.route('/updateCustomerdefaultAddress').post(Masters.updateCustomerdefaultAddress);
  app.route('/addressforparticularcustomer').post(Masters.addressforparticularcustomer);
  app.route('/retrieveCustomerDetails').get(Masters.retrieveCustomerDetails);

}
