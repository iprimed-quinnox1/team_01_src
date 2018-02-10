var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

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



