var mongoose = require('mongoose');
var Item = mongoose.model('Orderhistory');


//------------------inserting into order history----------------------- 
exports.insertOrderhistory = function (req, res, next) {

    var item = new Item(req.body);
    console.log(item);
    item.save(function (err, response) {
        if (err) {
            throw err;
            res.send('Failed to save');
        } else {
            console.log("success");
            res.json(response);
        }
    });
};

//------------------Updating order history----------------------- 
exports.UpdateOrderhistory = function (req, res, next) {

    Item.update({"Customer_name":req.body.Customer_name,"products.Prod":req.body.products.Prod,"products.Add":req.body.products.Add},{$set:{"status":req.body.status}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.json(result );
        }
    });

};

//------------------Updating  order history Address ----------------------- 

exports.UpdateOrderAddress = function (req, res, next) {
    
    Item.update({"_id":req.body._id,"products.Prod":req.body.products.Prod},{$set:{"products.Add":req.body.products.Add}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update Address', response: err });
        } else {
            console.log(result);
            res.json(result );
        }
    });
};

//------------------Retrieving from Orderhistory ----------------------- 

exports.RetrievingOrderhistory = function (req, res, next) {
    var ob=req.body;
    Item.find(ob,function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
          //  console.log("aa rha hu  mai");
            res.send(result);
            res.end();
        }
    });
};
//------------------Cancelled order history----------------------- 

exports.CancelledOrderHistory = function (req, res, next) {
    Item.update({"Customer_name":req.body.Customer_name,"products.Prod":req.body.products.Prod,"products.Add":req.body.products.Add},{$set:{"status":req.body.status}}
    , function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To cancel order', response: err });
        } else {
            console.log(result);
            res.json(result );
        }
    });
};

//----------------Fetching Customer List---------------------  

exports.FetchingallOrderhistory = function (req, res, next) {
    Item.find(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            console.log("aa rha hu  mai");
            res.send(result);
            res.end();
        }
    });
}