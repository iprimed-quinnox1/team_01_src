var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;




// exports.namelist = function namelist(callback){
// MongoClient.connect(url, function (err, dbase) {
//     if (err) throw err;
//     var db = dbase.db("Products_data");
//     var myobj = req.body;
//     console.log(myobj);
//     db.collection("p2").update({pid:myobj.pid},{$push:{techspec:myobj.techspec}}), function (err, result) {
//         if (err) throw err;
//         console.log(myobj.nameOfTheList + " Inserted");
//     };
//     callback(result);
//     dbase.close();
// });addresses
// }

exports.insertoneitem = function insertoneitem(name,callback){
MongoClient.connect(url, function (err, dbase) {
    if (err) throw err;
    var db = dbase.db("Products_data");
    var myobj = name;
    console.log(myobj);
    db.collection("p2").insertOne(myobj, function (err, result) {
        if (err) throw err;addresses
        console.log(myobj.pid + " Inserted1");
        callback(result)
    });
    
    dbase.close();
});
}

// exports.product_cust_list=function product_cust_list(callback){
// MongoClient.connect(url, function (err, dbase) {
//     console.log("inside PRODUCT_CUST_LIST");
//     if (err) throw err;
//     var db = dbase.db("Products_data");
//     var myobj = req.body;
//     console.log(myobj);
//     db.collection("p4").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log(myobj.Customer_name + "InsertedDone");
//     });
//     callback(result);
//     dbase.close();
// });
// }

// exports.registerlist=function registerlist(callback){
// MongoClient.connect(url, function (err, dbase) {
//     if (err) throw err;
//     var db = dbase.db("Products_data");
//     var myobj = req.body;
//     console.log(myobj);
//     db.collection("p3").insertOne(myobj, function (err, res) {
//         if (err) throw err;
//         console.log(myobj.Customer_name + " Inserted2");
//     });
//     callback(result);
//     dbase.close();
// });
// }

// exports.reviewlist=function reviewlist(callback){
// MongoClient.connect(url, function (err, dbase) {
//     if (err) throw err;
//     var db = dbase.db("Products_data");
//     var myobj = req.body;
//     console.log(myobj);
//     db.collection("p2").update({pid:myobj.pid},{$push:{review:myobj.review}}), function (err, res) {
//         if (err) throw err;
//         console.log(myobj.review + " Inserted");
//     };
//     callback(result);
//     dbase.close();
// });
// }

// exports.editedlist=function editedlist(callback){
// MongoClient.connect(url, function (err, dbase) {
//         if (err) throw err;
//         var db = dbase.db("Products_data");
//         var myobj = req.body;
//         console.log(myobj);
//         db.collection("p3").update({Customer_name:myobj.Customer_name},{$push:{products:myobj.products}}), function (err, res) {
//             if (err) throw err;
//             console.log(myobj.review + " Inserted");
//         };
//         callback(result);
//         dbase.close();
//     });
// }

// exports.initiallist=function initiallist(callback){
//     MongoClient.connect(url, function (err, database) { //connecting to mongo server
//         if (err) throw err;
//         var dbase = database.db("Products_data");
//         var res1 = dbase.collection("p2");
//         res1.find().toArray(function (err, result) {
//             if (err) throw err;
//             res.send(result);
//             console.log("sent");
//             res.end();
//         });
//         callback(result);
//         database.close();
//     });
// }

// exports.loginlist=function loginlist(callback){
// MongoClient.connect(url, function (err, database) { //connecting to mongo server
//     if (err) throw err;
//     var dbase = database.db("Products_data");
//     var res1 = dbase.collection("p3");
//     res1.find().toArray(function (err, result) {
//         if (err) throw err;
//         res.send(result);
//         console.log("sent");
//         res.end();
//     });
//     callback(result);
//     database.close();
// });
// }

// exports.finallist=function finallist(callback){
// MongoClient.connect(url, function (err, database) { //connecting to mongo server
//     if (err) throw err;
//     var dbase = database.db("Products_data");
//     var res1 = dbase.collection("p4");
//     console.log("finding from p4");
//     res1.find().toArray(function (err, result) {
//         if (err) throw err;
//         res.send(result);
//         console.log("sent");
//         res.end();
//     });
//     callback(result);
//     database.close();
// });
// }

// exports.deletelistitem=function deletelistitem(callback){
//     MongoClient.connect(url,function(err,database){
//         if(err) throw err;
//         var datab = database.db("Products_data");
//         var myob = request.body;
//         //console.log(myob);
//         datab.collection("p2").update({pid:myob.pidToRemove},{$pull:{techspec:myob.techSpec}},function(err,result){
//             if(err) throw err;
//             console.log("deleted");
//         });
//         callback(result);
//         database.close();
//     });
// }