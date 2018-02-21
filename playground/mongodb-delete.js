//connects to mongo server and let issue commands
const {MongoClient, ObjectId}= require('mongodb');

//connect to database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
//db.collection('Todos').deleteMany({text: 'buy biscuits'}).then((result) => {
//	console.log(result);
//});

//	db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
//		console.log(result);
//	});
	
//	db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
//		console.log(result);
//	});

//	db.collection('Users').deleteMany({name: 'Shubham'}).then((result) => {
//		console.log(result);
//	});
	
	db.collection('Users').findOneAndDelete({
		_id: new ObjectId('5a8d1d3fb2be1413d23c3949')
	}).then((result) => {
		console.log(JSON.stringify(result, undefined, 2));
	});
	//db.close();
});