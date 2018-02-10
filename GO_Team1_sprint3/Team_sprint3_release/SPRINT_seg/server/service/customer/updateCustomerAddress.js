var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/customer/customermongo.js");
var router = express.Router();




//-------------------updating Customer Address---------------              //Add to customer
router.post("/updateCustomerAddress", function (request, response) {
    //console.log("reaching");
    var name = req.body.addresses;
    httpBase.setHeader(response);
   updateCustomerAddress(function callback(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
function updateCustomerAddress(callback) {

    mon.update(callback);
}
//---------------------------------------------------------------

module.exports = router;


