
var express = require("express");
var httpBase = require('/http-base');
var mon = require("./db/customer.js");
var router = express.Router()




// router.post('/save', function(req, res){
// 	var addresses = req.body.addresses;
// 	console.log("saving...  array = " + JSON.stringify(addresses));
// 	httpBase.setHeader(res);
// 	saveAddresses(addresses, function(result){
// 		console.log("saved " + result);
// 		res.send(result); //send the response
// 	});
// });


// //----------Name list controller------------------------------
// router.get("/NAME_LIST", function (request, response) {
//     var name = req.body.addresses;
//     //console.log("reaching");
//     httpBase.setHeader(response);
//     namelistupdate(name,function (result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function namelistupdate(callback) {

//     mon.update(callback);
// }

//-----------------------------------------------------------

//------------Insert one item controller--------------------
router.post("/INSERT_ONE_ITEM", function (request, response) {
    //console.log("reaching");
    var name = request.body;
    //httpBase.setHeader(response);
   insertoneitem(name,function (result) {
        //console.log(res);
        response.send(result);
        response.end();
    });

});
function insertoneitem(name,callback) {

    mon.update(name,callback);
}
//------------------------------------------------------------

// //-----------------Product customer list controller-----------
// app.post("/PRODUCT_CUST_LIST", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    product_cust_list(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function product_cust_list(callback) {
   
//     mon.update(callback);
// }
// //--------------------------------------------------------------

// //------------------Register list controller-----------------------
// app.post("/REGISTERLIST", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    registerlist(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function registerlist(callback) {

//     mon.update(callback);
// }
// //-------------------------------------------------------------------

// //-------------------Review list controller--------------------------
// app.post("/REVIEWLIST", function (remodule.exports = router;quest, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    reviewlist(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function reviewlist(callback) {

//     mon.update(callback);
// }module.exports = router;
// //--------------------------------------------------------------------
// //--------------------Edited list controller--------------------------
// app.post("/EDITEDLIST", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    editedlist(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function editedlist(callback) {

//     mon.update(callback);
// }
// //----------------------------------------------------------------------
// //------------------Initial list controller------------------------------
// app.post("/INITIALLIST", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    initiallist(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();module.exports = router;
//     });

// });
// function initiallist(callback) {

//     mon.update(callback);
// }
// //-----------------------------------------------------------------------
// //------------------------Login list controller--------------------------
// app.get("/LOGINLIST", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    loginlist(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function loginlist(callback) {

//     mon.update(callback);
// }
// //------------------------------------------------------------------------
// //---------------------Final list controller------------------------------
// app.get("/FINALLIST", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    finallist(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function finallist(callback) {

//     mon.update(callback);
// }
// //---------------------------------------------------------------------------

// //-------------------------Delete list item----------------------------------
// app.post("/DELETE_LIST_ITEM", function (request, response) {
//     //console.log("reaching");
//     var name = req.body.addresses;
//     httpBase.setHeader(response);
//    deletelistitem(function callback(result) {
//         //console.log(res);
//         response.send(result);
//         response.end();
//     });

// });
// function deletlistitem(callback) {

//     mon.update(callback);
// }
//---------------------------------------------------------------------------------
module.exports = router;