//connects to mongo server and let issue commands
const {MongoClient, ObjectId}= require('mongodb');

//connect to database
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('Connected to MongoDB server');
	
//	db.collection('Todos').find(
//		{_id: new ObjectId('5a8d1b6178cf5d137e1f6373')
//		}).toArray().then((docs) => {
//		console.error('Todos');
//		console.error(JSON.stringify(docs, undefined, 2));
//	});
	
//	db.collection('Todos').find().count().then((count) => {
//		console.log(`Todos count: ${count}`);
//	}, (err) => {
//		if('Unable to count todos', err);
//	});
	
	db.collection('Users').find({name: 'Shubham'}).toArray().then((docs) => {
		console.log('Users with name Shubham:');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to fetch users with given name');
	});

	db.close();
});