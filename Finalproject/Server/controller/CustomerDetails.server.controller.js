var mongoose = require('mongoose');
var Item = mongoose.model('Customerdetails');


//save the data of CustomerDetails

exports.insertCustomer = function (req, res, next) {

    var item = new Item(req.body);
    console.log(item);
    item.save(function (err, response) {
        if (err) {
            throw err;
            //res.send({ success: false, msg: 'Failed to save', response: err });
        } else {
            console.log("success");
            //res.json({ success: true, msg: 'Saved Successfully', result: response });
        }
    });
};
//updating the address of Customer

exports.updateAddress = function (req, res, next) {
    console.log("Reaching updated address");
    Item.update({Customer_name:req.body.Customer_name},{$push:{Address:req.body.Address}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log("Updated address in customer");
            console.log(result);
            res.send(result );
        }
        
    });
};

//For fetching the Data from CustomerDetails

exports.retrieveCustomerDetails = function (req, res, next) {
   // var ob=req.body;
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
};
    //For fetching the Data from CustomerDetails for particular person

exports.addressforparticularcustomer = function (req, res, next) {
    var ob=req.body;
    Item.find(ob,function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            console.log("Address is coming");
            res.send(result);
            res.end();
        }
    });
};


  //For fetching the Default address from CustomerDetails

  exports.updateCustomerdefaultAddress = function (req, res, next) {
    Item.update({Customer_name:req.body.Customer_name},{$set:{Default_address:req.body.Default_address}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.send(result);
        }
        
    });
};