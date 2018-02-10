var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

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




