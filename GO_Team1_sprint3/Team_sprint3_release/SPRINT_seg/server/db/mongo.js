var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

//--------------------requiring product update service---------------------
exports.updateProduct = function updateProduct(callback){
 MongoClient.connect(url, function (err, dbase) {
   if (err) throw err;
    var db = dbase.db("Products_data");
    var myobj = req.body;
    console.log(myobj);
     db.collection("Products_list").update({pid:myobj.pid},{$push:{techspec:myobj.techspec}}), function (err, result) {
        if (err) throw err;
        console.log(myobj.nameOfTheList + " Inserted");
     };
     callback(result);
     dbase.close();
 });        
 }
//----------------------------------------------------------------------------

//----------------- requiring insert Product service---------------------------

exports.insertProduct = function insertProduct(name,callback){
MongoClient.connect(url, function (err, dbase) {
    if (err) throw err;
    var db = dbase.db("Products_data");
    var myobj = name;
    console.log(myobj);
    db.collection("Products_list").insertOne(myobj, function (err, result) {
        if (err) throw err;
        console.log(myobj.pid + " Inserted1");
        callback(result)
    });
    
    dbase.close();
});
}
//-----------------------------------------------------------------------------

//---------------------requiring add to Cart service--------------------------
 exports.addtoCart=function addtoCart(callback){
 MongoClient.connect(url, function (err, dbase) {
     console.log("inside PRODUCT_CUST_LIST");
     if (err) throw err;
     var db = dbase.db("Products_data");
     var myobj = req.body;
     console.log(myobj);
     db.collection("Cart").insertOne(myobj, function (err, res) {
         if (err) throw err;
         console.log(myobj.Customer_name + "InsertedDone");
     });
     callback(result);
     dbase.close();
 });
 }
//------------------------------------------------------------------------------

//-------------------requiring new Customer service-----------------------------
 exports.insertCustomer=function insertCustomer(callback){
 MongoClient.connect(url, function (err, dbase) {
     if (err) throw err;
     var db = dbase.db("Products_data");
     var myobj = req.body;
     console.log(myobj);
     db.collection("Customerdetails").insertOne(myobj, function (err, res) {
         if (err) throw err;
         console.log(myobj.Customer_name + " Inserted2");
     });
     callback(result);
     dbase.close();
 });
 }
//----------------------------------------------------------------------------------

//------------------------requiring Address updation service------------------------
 exports.updateCustomerAddress=function updateCustomerAddress(callback){
 MongoClient.connect(url, function (err, dbase) {
     if (err) throw err;
     var db = dbase.db("Products_data");
     var myobj = req.body;
     console.log(myobj);
     db.collection("Customerdetails").update({pid:myobj.pid},{$push:{review:myobj.review}}), function (err, res) {
         if (err) throw err;
         console.log(myobj.review + " Inserted");
     };
     callback(result);
     dbase.close();
 });
 }
//----------------------------------------------------------------------------------

//----------------------requiring Product Address updation service------------------
 exports.updateCartCustomerAddress=function updateCartCustomerAddress(callback){
 MongoClient.connect(url, function (err, dbase) {
         if (err) throw err;
         var db = dbase.db("Products_data");
         var myobj = req.body;
         console.log(myobj);
         db.collection("Cart").update({Customer_name:myobj.Customer_name},{$push:{products:myobj.products}}), function (err, res) {
             if (err) throw err;
             console.log(myobj.review + " Inserted");
         };
         callback(result);
         dbase.close();
     });
 }
//------------------------------------------------------------------------------------

//--------------------initializing Product service------------------------------------
 exports.initializeProductlist=function initializeProductlist(callback){
     MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Products_list");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("sent");
            res.end();
        });
        callback(result);
        database.close();
    });
}
//--------------------------------------------------------------------------------------

//-------------------initializing Customer service--------------------------------------
exports.initializeCustomerlist=function initializeCustomerlist(callback){
MongoClient.connect(url, function (err, database) { //connecting to mongo server
    if (err) throw err;
    var dbase = database.db("Products_data");
    var res1 = dbase.collection("Customerdetails");
    res1.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log("sent");
        res.end();
    });
    callback(result);
    database.close();
});
}
//----------------------------------------------------------------------------------------

//--------------------intializing Cart service--------------------------------------------
exports.initializeCartlist=function initializeCartlist(callback){
MongoClient.connect(url, function (err, database) { //connecting to mongo server
    if (err) throw err;
    var dbase = database.db("Products_data");
    var res1 = dbase.collection("Cart");
    console.log("finding from Cart");
    res1.find().toArray(function (err, result) {
        if (err) throw err;
        res.send(result);
        console.log("sent");
        res.end();
    });
    callback(result);
    database.close();
});
}
//-------------------------------------------------------------------------------------------

//-------------------requiring Product item removal service---------------------------------------
exports.deleteProductitem=function deleteProductitem(callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var datab = database.db("Products_data");
        var myob = request.body;
        //console.log(myob);
        datab.collection("Cart").update({pid:myob.pidToRemove},{$pull:{techspec:myob.techSpec}},function(err,result){
            if(err) throw err;
            console.log("deleted");
        });
        callback(result);
        database.close();
    });
}
//-------------------------------------------------------------------------------------------

//-------------------requiring Cart item removal service---------------------------------------
exports.deleteCartitem=function deleteCartitem(callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var datab = database.db("Products_data");
        var myob = request.body;
        //console.log(myob);
        datab.collection("Cart").update({pid:myob.pidToRemove},{$pull:{techspec:myob.techSpec}},function(err,result){
            if(err) throw err;
            console.log("deleted");
        });
        callback(result);
        database.close();
    });
}
//--------------------------------------------------------------------------------------------------------
