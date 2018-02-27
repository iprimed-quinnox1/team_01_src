var mongoose = require('mongoose'),
Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost:27017/Products_data');

var AdminSchema=mongoose.Schema({
pid:String,
img:String,
techspec:[],
review:[],
},{collection:'Products_list'}

);

mongoose.model('Products_list',AdminSchema);
