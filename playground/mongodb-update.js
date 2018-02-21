//connects to mongo server and let issue commands
const {MongoClient, ObjectId}= require('mongodb');

//connect to database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
//	db.collection('Todos').findOneAndUpdate({
//		_id: new ObjectId('5a8d7bbd11f0815b517e6f02'),
//	}, {
//		$set: {
//			completed: true
//		}
//	}	, { 
//  	returnOriginal: false
//	}).then((result) => {
//		console.log(JSON.stringify(result, undefined, 2));mongo
//	});

	db.collection('Users').findOneAndUpdate({
		_id: new ObjectId('5a8d893f11f0815b517e71f9')
	}, {
		$set: {
			name: 'Shubham'
		},
		$inc: {
			age: 1
		}
	}, {
		returnOriginal: false
	}).then((result) => {
		console.log(result);
	});
	
	//db.close();
});