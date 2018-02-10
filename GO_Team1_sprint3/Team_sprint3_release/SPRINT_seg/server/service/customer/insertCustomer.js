var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/customer/customermongo.js");
var router = express.Router();




//------------------inserting customer----------------------- 
router.post("/insertCustomer", function (request, response) {               //Add to customer
    //console.log("reaching");
    var name = req.body.addresses;
    httpBase.setHeader(response);
   insertCustomer(function callback(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
function insertCustomer(callback) {

    mon.update(callback);
}
//-------------------------------------------------------------------

module.exports = router;
