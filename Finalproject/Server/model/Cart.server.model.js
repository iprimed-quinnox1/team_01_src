var mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/Products_data');

var CartSchema=mongoose.Schema({
Customer_name:String,
products:{
    img:String,
    Prod:String, 
    Add:String}

},{collection:'Cart'});

mongoose.model('Cart',CartSchema);
