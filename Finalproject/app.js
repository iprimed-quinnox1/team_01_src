var express = require("express");
var formidable = require("formidable");
var fs = require('fs');
var mongoose = require("mongoose");
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


mongoose.connect('mongodb://localhost:27017/Products_data');
app.use("/",express.static(__dirname));
//app.use(express.static(__dirname));
require("./Server/model/Admin.server.model");
require("./Server/router/Admin.server.router")(app);
require("./Server/model/CustomerDetails.server.model");
require("./Server/model/Cart.server.model");
require("./Server/router/CustomerDetails.server.routes")(app);
require("./Server/router/Cart.server.routes")(app);
require("./Server/model/OrderHistory.server.model");
require("./Server/router/OrderHistory.server.routes")(app);

app.listen(5000,function(){
    console.log("Server started running at 5000");
});
