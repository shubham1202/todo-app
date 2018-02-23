const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.remove({}).then((result) => {
//	console.log(result);
//});

//Todo.findOneAndRemove({_id: '5a8d949b95a03808354e946a'}).then((result) => {
//	console.log(result);
//});

Todo.findByIdAndRemove({_id: '5a8d949b95a03808354e946a'}).then((result) => {
	console.log(result);
});
