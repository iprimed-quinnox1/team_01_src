var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/cart/cartmongo.js");
var router = express.Router();



//--------------------Updating Cart Address------------------                      //Add to cart
 router.post("/updateCartCustomerAddress", function (request, response) {
    //console.log("reaching");
    var name = req.body.addresses;
    httpBase.setHeader(response);
   updateCartCustomerAddress(function callback(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
function updateCartCustomerAddress(callback) {

    mon.update(callback);
}
//---------------------------------------------------------------

module.exports = router;

