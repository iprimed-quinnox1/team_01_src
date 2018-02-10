var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/cart/cartmongo.js");
var router = express.Router();



//----------------Adding to cart-----------                              //Add to Cart folder
router.post("/addtoCart", function (request, response) {
    //console.log("reaching");
    var name = req.body.addresses;
    httpBase.setHeader(response);
   addtoCart(function callback(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});

module.exports = router;
