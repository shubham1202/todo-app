//connects to mongo server and let issue commands
const MongoClient = require('mongodb').MongoClient;

//connect to database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
	db.close();
});