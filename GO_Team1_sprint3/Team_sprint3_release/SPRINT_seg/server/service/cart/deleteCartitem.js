var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/cart/cartmongo.js");
var router = express.Router();






//------------------Deleting Cart item---------------------------                 //Add to Cart
 router.post("/deleteCartitem", function (request, response) {
     console.log("reaching");
     var name = req.body.addresses;
     httpBase.setHeader(response);
    deleteCartitem(function callback(result) {
    console.log(res);
         response.send(result);
        response.end();
    });

});
function deleteCartitem(callback) {

    mon.update(callback);
}
//---------------------------------------------------------------


module.exports = router;
