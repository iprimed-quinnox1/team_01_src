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


app.use("/P", express.static(__dirname));
app.post("/updateinsideProductitem", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Products_list").update({pid:myobj.pid},{$push:{techspec:myobj.techspec}}), function (err, res) {
            if (err) throw err;
            console.log(myobj.nameOfTheList + " Inserted updateinsideProductitem");
        };
        dbase.close();
    });
});
app.post("/insertproduct_item", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Products_list").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.pid);
        });
        dbase.close();
    });
});
app.post("/cartinsert", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        console.log("inside cartinsert");
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Cart").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + "InsertedDone");
        });
        dbase.close();
    });
});
app.post("/Customertinsert", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Customerdetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + " Inserted2");
        });
        dbase.close();
    });

});
app.post("/updateCustomerAddress", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);

        db.collection("Customerdetails"
    ).update({Customer_name:myobj.Customer_name},{$push:{Address:myobj.Address}}, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + " Updated Address");
        });
        dbase.close();
    });

});

app.post("/addingreviews", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Products_list").update({pid:myobj.pid},{$push:{review:myobj.review}}), function (err, res) {
            if (err) throw err;
            console.log(myobj.review + " addingreviews");
        };
        dbase.close();
    });
});
app.post("/UpdateAddress", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Cart").update({"Customer_name":myobj.Customer_name,"products.Prod":myobj.products.Prod},{$set:{"products.Add":myobj.products.Add}}, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + " UpdateAddress");
        });
        dbase.close();
    });
});

//Inserting data into order history
app.post("/initializeListOrderhistory", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        console.log("inside initializeListOrderhistory");
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Orderhistory").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + "initializeListOrderhistory");
        });
        dbase.close();
    });
});
//Updating order history of status from logistic department
app.post("/UpdateOrderhistory", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        console.log("inside UpdateOrderhistory");
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);
        db.collection("Orderhistory").update({"Customer_name":myobj.Customer_name,"products.Prod":myobj.products.Prod,"products.Add":myobj.products.Add},{$set:{"status":myobj.status}}, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + "UpdateOrderhistory");
        });
        dbase.close();
    });
});
//Updating order history of Address from logistic department
app.post("/UpdateOrderhistoryAdd", function (req, res) {
    MongoClient.connect(url, function (err, dbase) {
        console.log("inside UpdateOrderhistory");
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = req.body;
        console.log(myobj);   
		db.collection("Orderhistory").update({"Customer_name":myobj.Customer_name,"products.Prod":myobj.products.Prod},{$set:{"products.Add":myobj.products.Add}}, function (err, res) {
            if (err) throw err;
            console.log(myobj.Customer_name + "UpdateOrderhistory");
        });
        dbase.close();
    });
});
app.get("/initializeListProducts_list", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Products_list");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("initializeListProducts_list");
            res.end();
        });
        database.close();
    });
});
app.get("/initializeListCustomerdetails", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Customerdetails");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("initializeListCustomerdetails");
            res.end();
        });
        database.close();
    });
});
/*app.get("/initializeListCart", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .

    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Cart");
        console.log("finding from Cart");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("initializeListCart");
            res.end();
        });
        database.close();
    });
});*/

//Retrieving the  Cartdetails from database for particular user
app.post("/initializeListCart", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Cart"); 
        var ob= req.body;
        console.log(ob);
        res1.find(ob).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("initializeListCart");
            res.end();
        });
        database.close();
    });
});
//Retrieving the  orderhistory from database for particular user
app.post("/RetrievingOrderhistory", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Orderhistory"); 
        var ob= req.body;
        console.log(ob);
        res1.find(ob).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("RetrievingOrderhistory");
            res.end();
        });
        database.close();
    });
});
//Retrieving all the  data from order history for the logistics department
app.get("/RetrievingOrderhistory", function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .

    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Orderhistory");
        console.log("finding from Orderhistory");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            console.log("Orderhistory found");
            res.end();
        });
        database.close();
    });
});
app.post('/OrderCancelledHistory',function(request,response)
{
    MongoClient.connect(url, function (err, dbase) {
       // console.log("inside initializeListOrderhistory");
        if (err) throw err;
        var db = dbase.db("Products_data");
        var myobj = request.body;
        console.log(myobj);
  db.collection("Orderhistory").update({"Customer_name":myobj.Customer_name,"products.Prod":myobj.products.Prod,"products.Add":myobj.products.Add},{$set:{"status":myobj.status}}, function (err, res) {
            if (err) throw err;
           console.log(myobj.Customer_name + "OrderCancelledHistory");
        });
        dbase.close();
    });
});

app.get('/retrieveOrderCancelledhistory', function(request,response)
{
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header .
    MongoClient.connect(url, function (err, database) { //connecting to mongo server
        if (err) throw err;
        var dbase = database.db("Products_data");
        var res1 = dbase.collection("Orderhistory");
        console.log("finding from Order");
        res1.find().toArray(function (err, result) {
            if (err) throw err;
            response.send(result);
            console.log("initializeListOrder");
            response.end();
        });
        database.close();
    });
});
app.post('/deleteItemFromList',function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var datab = database.db("Products_data");
        var myob = request.body;
        //console.log(myob);
        datab.collection("Products_list").update({pid:myob.pidToRemove},{$pull:{techspec:myob.techSpec}},function(err,result){
            if(err) throw err;
            console.log("deleted");
        });
        
        database.close();
    });
});
app.post('/deleteItemFromCartList',function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var datab = database.db("Products_data");
        var myob = request.body;
		console.log("Entering deleteItemFromCartList ");
        console.log(myob);
        datab.collection("Cart").remove({Customer_name:myob.Customer_name, "products.Prod":myob.products},function(err,result){
            if(err) throw err;
            console.log("deleted from cart");
        });
        
        database.close();
    });
});



app.listen(5000, function () {
    console.log("staring...");
    console.log("Server started at 5000");
});

