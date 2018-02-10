var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/admin/adminmongo.js");
var router = express.Router();



//------------------Initializing Product List-------------------              //Add to product
router.get("/Productlist", function (request, response) {
    //console.log("reaching");
    // var name = req.body.addresses;
    httpBase.setHeader(response);
   initializeProductlist(function (result) {
        console.log("Prod List: \n" + JSON.stringify(result));
        response.send(result);
        response.end();
    });

});
function initializeProductlist(callback) {

    mon.Productlist(callback);
}
//---------------------------------------------------------------

module.exports = router;
