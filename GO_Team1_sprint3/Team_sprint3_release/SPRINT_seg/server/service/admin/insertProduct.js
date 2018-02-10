var express = require("express");
var httpBase = require("../http-base");
var mon = require("../../db/admin/adminmongo.js");
var router = express.Router();



//------------inserting Product--------------------                      //Add to product folder
router.post("/insert", function (request, response) {
    //console.log("reaching");
    var name = request.body;
    //httpBase.setHeader(response);
    insertProduct(name,function (result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});

function insertProduct(name,callback) {

    mon.insert(name,callback);
}
//------------------------------------------------------------

module.exports = router;
