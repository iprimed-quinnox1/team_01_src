var url = "mongodb://localhost:27017";
var MongoClient = require('mongodb').MongoClient;

//--------------------requiring product update service---------------------
 exports.updates = function (update,callback){
  MongoClient.connect(url, function (err, dbase) {
    if (err) throw err;
     var db = dbase.db("Products_data");
     //var myobj = req.body;
     console.log(JSON.stringify(update));
      db.collection("Products_list").updateOne({pid:update.pid},{$push:{techspec:update.techspec}}), function (err, result) {
         if (err) throw err;
         console.log(" Inserted");
        
      };
      callback(true);
      dbase.close();
  });        
  }
//----------------------------------------------------------------------------

//----------------- requiring insert Product service---------------------------

exports.insert = function insert(name,callback){
MongoClient.connect(url, function (err, dbase) {
    if (err) throw err;
    var db = dbase.db("Products_data");
   // var myobj = name;
    //console.log(myobj);
    db.collection("Products_list").insertOne(name, function (err, result) {
        if (err) throw err;
        console.log(name.pid + " Inserted1");
        callback(result)
    });
    
    dbase.close();
});
}
//-----------------------------------------------------------------------------

//--------------------initializing Product service------------------------------------
 exports.Productlist=function Productlist(callback){
     MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Products_list");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            //res.send(result);
            console.log("sent");
            callback(result);
        });
        
        database.close();
    });
}
//--------------------------------------------------------------------------------------

//-------------------requiring Product item removal service---------------------------------------
 exports.deleteitem=function (deleteitem,callback){
     MongoClient.connect(url,function(err,database){
         if(err) throw err;
         var datab = database.db("Products_data");
         //var myob = request.body;
         //console.log(myob);
         console.log(JSON.stringify([{pid:deleteitem.pidToRemove},{$pull:{techspec:deleteitem.techSpec}}]));
         datab.collection("Products_list").updateOne({pid:deleteitem.pidToRemove},{$pull:{techspec:deleteitem.techSpec}},function(err,result){
             if(err) throw err;
             console.log("deleted");
        
         callback(result); 
        });
         database.close();
     });
 }
//-------------------------------------------------------------------------------------------


