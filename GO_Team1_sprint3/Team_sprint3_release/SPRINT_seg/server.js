// requires
var serverPort = 5000;

var bodyParser = require('body-parser');

var express = require('express');
var app = express();

var multer=require('multer');
var upload=multer();

//express logic
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


// Link: static HTML/angular pages 
//app.use(express.static("../"));
app.use("",express.static(__dirname+"../client/admin"));
app.use("/",express.static(__dirname));
app.use("",express.static(__dirname+"../client/customer"));

// Link : Cart service
var addtoCart = require("./server/service/cart/addtoCart.js");
app.use("/addtoCart", addtoCart);

var deleteCartitem = require("./server/service/cart/deleteCartitem.js");
app.use("/deleteCartitem", deleteCartitem);

var initializeCart = require("./server/service/cart/initializeCart.js");
app.use("/initializeCartlist", initializeCart);

var updateCartAddress = require("./server/service/cart/updateCartAddress.js");
app.use("/updateCartCustomerAddress", updateCartAddress);

// Link : Customer service
var initializeCustomerlist = require("./server/service/customer/initializeCustomerlist.js");
app.use("/initializeCustomerlist", initializeCustomerlist);

var insertCustomer = require("./server/service/customer/insertCustomer.js");
app.use("/insertCustomer", insertCustomer);

var updateCustomerAddress = require("./server/service/customer/updateCustomerAddress.js");
app.use("/updateCustomerAddress", updateCustomerAddress);

// Link : Product service for admin
var deleteProductitem = require("./server/service/admin/deleteProductitem.js");
app.use("/deleteProductitem", deleteProductitem);

var initializeProductlist = require("./server/service/admin/initializeProductlist.js");
app.use("/initializeProductlist", initializeProductlist);

var insertProduct = require("./server/service/admin/insertProduct.js");
app.use("/insertProduct", insertProduct);

var updateProductlist = require("./server/service/admin/updateProductlist.js");
app.use("/updateProduct", updateProductlist);


// web server 

app.listen(serverPort, function(){
	console.log("server running " + serverPort )
}); 

