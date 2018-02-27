var mongoose = require('mongoose'),
Item = mongoose.model('Cart');


//insert items in cart

exports.cartinsert = function (req, res, next) {

    var item = new Item(req.body);
    item.save(function (err, response) {
        if (err) {
            res.send(err );
        } else {
            console.log("I am reaching here");
            res.json( response);
        }
    });
};

//updating the address of Customer in cart

exports.UpdateAddresscart = function (req, res, next) {
    console.log("Update Address reaching");
    Item.update({"Customer_name":req.body.Customer_name,"products.Prod":req.body.products.Prod},{$set:{"products.Add":req.body.products.Add}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.json(result );
        }
    });
};

//-----------------------Fetching data from cart--------------------------------
exports.initializeListCart = function (req, res, next) {
    //var legalentity = req.query.legalentity;
    console.log("Reaching  insert cart");
    var ob= req.body;
    Item.find(ob,function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
        }
    })
}


//-------------------deleting items from cart list----------------------------

exports.deleteItemFromCartListCheckout = function (req, res, next) {
    //console.log('coming to delete')
    Item.remove({Customer_name:req.body.Customer_name, "products.Prod":req.body.products}, 
      function (err, response) {

        if (err) {
            res.send(err);
        } else {
            res.send( response);

        }
    })

}

//--------------------------------------------------------------------------

exports.deleteItemFromAddtoCartList = function (req, res, next) {
    //console.log('coming to delete')
    Item.remove({Customer_name:req.body.Customer_name, "products.Prod":req.body.products.Prod},
        function (err, response) {

        if (err) {
            res.send( err );
        } else {
            res.send( response);

        }
    })

}


// Item.findByIdAndRemove(req.body._id, { $set:{ Customer_name:req.body }},{new:true}, function (err, response) {


