var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/customer/customermongo.js");
var router = express.Router();



//----------------initializing Customer List---------------------               //Add to customer 
router.get("/initializeCustomerlist", function (request, response) {
    //console.log("reaching");
    var name = req.body.addresses;
    httpBase.setHeader(response);
   initializeCustomerlist(function callback(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
function initializeCustomerlist(callback) {

    mon.update(callback);
}
//---------------------------------------------------------------


module.exports = router;
