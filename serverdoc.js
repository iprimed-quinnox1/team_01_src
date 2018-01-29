var express = require("express");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/Products_data";

var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


app.use("/toDoList", express.static(__dirname));

app.post("/insertList", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p2").update({pid:myobj.pid},{$push:{techspec:myobj.techspec}}), function (err, res) {
            if (err) throw err;
            console.log(myobj.nameOfTheList + " Inserted");
        };
        dbase.close();
    });
});
app.post("/insertList12", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p2").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.pid + " Inserted");
        });
        dbase.close();
    });
});

app.post("/insertList123", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p2").update({pid:myobj.pid},{$push:{review:myobj.review}}), function (err, res) {
            if (err) throw err;
            console.log(myobj.review + " Inserted");
        };
        dbase.close();
    });
});


app.get("/initializeList", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("p2");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("sent");
            res.end();
        });
        database.close();
    });
});

/*app.post('/deleteItemFromList', function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var datab = dbase.db("Products_data");
        var myob = req.body;
        console.log(myob);
        datab.collection("p2").deleteOne({id: myob.id,val:myob.val},function(err,obj){
            if(err) throw err;
            console.log("deleted");
        });
        dbase.close();
    });
});*/

app.post('/deleteItemFromList',function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var datab = database.db("Products_data");
        var myob = request.body;
        //console.log(myob);
        datab.collection("p2").update({pid:myob.pidToRemove},{$pull:{techspec:myob.techSpec}},function(err,result){
            if(err) throw err;
            console.log("deleted");
        });
        
        database.close();
    });
});


app.listen(5000, function () {
    console.log("Server started at 5000");
});
