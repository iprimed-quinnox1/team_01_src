var Masters = require('../controller/OrderHistory.server.controller');
module.exports = function (app) {
    // Order History routes
    app.route('/insertOrderhistory').post(Masters.insertOrderhistory);
    app.route('/UpdateOrderhistory').post(Masters.UpdateOrderhistory);
    app.route('/UpdateOrderAddress').post(Masters.UpdateOrderAddress);
    app.route('/RetrievingOrderhistory').post(Masters.RetrievingOrderhistory);
    app.route('/CancelledOrderHistory').post(Masters.CancelledOrderHistory); 
  app.route('/FetchingallOrderhistory').get(Masters.FetchingallOrderhistory);

}
