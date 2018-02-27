var mongoose = require('mongoose');
var formidable = require("formidable");
var fs = require("fs");
var Item = mongoose.model('Products_list');


//save the data in products_list

exports.insertProducts = function (req, res, next) {

    var item = new Item(req.body);
    console.log(item);
    var form=new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(files)
        console.log(files);
        var oldPath=files.file.path;
        console.log(oldPath);
        var newPath=__dirname+"/../../Client/Images/"+files.file.name;
        console.log(newPath);
        fs.rename(oldPath,newPath,function(err)
    {
    var insert={pid:fields.pid,img:files.file.name};
    item=new Item(insert);
    //console.log(insert);
    item.save(function (err, response) {
        if (err) {
            throw err;
            //res.send({ success: false, msg: 'Failed to save', response: err });
        } else {
            console.log("success");
            //res.json({ success: true, msg: 'Saved Successfully', result: response });
        }
      });
    });
});
};

//updating the technical specification for products 

exports.updateproducts = function (req, res, next) {
    Item.update({pid:req.body.pid},{$push:{techspec:req.body.techspec}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.json({ success: true, msg: 'Updated Successfully', item: result });
        }
    });
};

//adding review for the product

exports.addingreviews = function (req, res, next) {
    Item.update({pid:req.body.pid},{$push:{review:req.body.review}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.json(result);
        }
    });
};


//To delete the technical specification for particular products 

exports.deleteproductspecification = function (req, res, next) {
    Item.update({pid:req.body.pidToRemove},{$pull:{techspec:req.body.techSpec}}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.json({ success: true, msg: 'req.bodyUpdated Successfully', item: result });
        }
    });
};

//To delete the products in the Products_list

exports.deleteproductsId = function (req, res, next) {
    Item.remove({pid:req.body.pid}, function (err, result) {
        if (err) {
            res.send({ success: false, msg: 'Failed To Update', response: err });
        } else {
            console.log(result);
            res.json({ success: true, msg: 'Updated Successfully', item: result });
        }
    });
};

//For fetching the Data from products_list

exports.retrievingproducts = function (req, res, next) {
    Item.find(function (err, result) {
        if (err) {
            res.send(err);
        } else {
            console.log(result);
            res.send(result);
            res.end();
            //console.log('party list')
            //console.log(result)
            //res.send({ success: true, response: result });
        }
    });
}
