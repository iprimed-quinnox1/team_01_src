var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/admin/adminmongo.js");
var router = express.Router();




//------------------Deleting product item------------------------              //Add to Product
router.post("/deleteitem", function (request, response) {
    //console.log("reaching");
    var name = request.body;
   httpBase.setHeader(response);
   mon.deleteitem(name,function(result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});

//mon.deleteitem(name,callback);
    //mon.deleteitem(myob,callback);

//---------------------------------------------------------------


module.exports = router;
