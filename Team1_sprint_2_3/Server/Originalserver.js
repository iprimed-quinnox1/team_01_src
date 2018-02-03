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


app.use("/INDEX", express.static(__dirname));

app.post("/NAME_LIST", function (req, res) {
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
app.post("/INSERT_ONE_ITEM", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p2").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.pid + " Inserted1");
        });
        dbase.close();
    });
});
app.post("/PRODUCT_CUST_LIST", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        console.log("inside PRODUCT_CUST_LIST");
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p4").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + "InsertedDone");
        });
        dbase.close();
    });
});
app.post("/REGISTERLIST", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p3").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + " Inserted2");
        });
        dbase.close();
    });Shoes

});

app.post("/REVIEWLIST", function (req, res) {
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
app.post("/EDITED_LIST", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p3").update({Customer_name:myobj.Customer_name},{$push:{products:myobj.products}}), function (err, res) {
            if (err) throw err;
            console.log(myobj.review + " Inserted");
        };
        dbase.close();
    });
});
/*app.post("/insertList22", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("p3").update({Customer_name:myobj.Customer_name},{$push:{products:myobj.products}}), function (err, res) {
            if (err) throw err;
            console.log(myobj.review + " Inserted");
        };
        dbase.close();
    });
});*/


app.get("/INITIALLIST", function (req, res) {
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
app.get("/LOGINLIST", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("p3");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("sent");
            res.end();
        });
        database.close();
    });
});
app.get("/FINALLIST", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("p4");
        console.log("finding from p4");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("sent");
            res.end();
        });
        database.close();
    });
});

/*app.post('/DELETE_LIST_ITEM', function (req, res) {
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

app.post('/DELETE_LIST_ITEM',function(request,response){
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
    console.log("staring...");
    console.log("Server started at 5000");
});
