var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

http.createServer(function (req, res)
 {
	res.writeHead(200, {'Content-Type': 'application/json',"Access-Control-Allow-Origin" : "*","Access-Control-Allow-Credentials" : true});
	MongoClient.connect(url,function(err,database)
        {
		if(err) throw err;
		var dbase = database.db("Products_data");
		var res1 = dbase.collection("p2");
		res1.find().toArray(function(err,result)
                {
			if(err) throw err;
			res.write(JSON.stringify(result));
			res.end();
		});
		database.close();
 });
	
}).listen(8000, function(){
	console.log("Server is running on localhost:8000");
});
