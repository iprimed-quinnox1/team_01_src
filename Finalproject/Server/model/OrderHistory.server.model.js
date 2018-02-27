var mongoose = require('mongoose');
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/Products_data');

var OrderhistorySchema=mongoose.Schema({
Customer_name:String,
products:{img: String,Prod:String,Add:String },
status:String,
Gift: String

},{collection:'Orderhistory'});

mongoose.model('Orderhistory',OrderhistorySchema);