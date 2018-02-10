var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/cart/cartmongo.js");
var router = express.Router();





//-------------------initializing Cart list----------------------              //Add to cart list
router.get("/initializeCartlist", function (request, response) {
    //console.log("reaching");
    var name = req.body.addresses;
    httpBase.setHeader(response);
   initializeCartlist(function callback(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
function initializeCartlist(callback) {

    mon.update(callback);
}
//---------------------------------------------------------------

module.exports = router;

