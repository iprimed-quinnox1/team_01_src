var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/admin/adminmongo.js");
var router = express.Router();




//----------Updating product list------------------------------    //Add to product folder
router.post("/update", function (request, response) {
   
    console.log( "reaching");
    var name = request.body;
    httpBase.setHeader(response);
    mon.updates(name,function (result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
/*function updateProduct(callback) {

    mon.update(callback);
}*/

module.exports = router;
