var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/Products_data');
var CustomerDetailsSchema=mongoose.Schema({
Customer_name:String,
Password:String,
Address:[],
Contact_number: Number,
Email_id: String,
Default_address:String
},{collection:'Customerdetails'}

);
mongoose.model('Customerdetails',CustomerDetailsSchema);

