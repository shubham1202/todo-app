const {ObjectId} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


//var id = '5a8d949b95a03808354e946a';
//
//if (!ObjectId.isValid(id)) {
//	console.log('Invalid Id');
//} 		

//Todo.find({
//	_id: id       //mongoose automatically converts string id to ObjectId
//}).then((todos) => {
//	console.log('Todos', todos);
//});
//
//Todo.findOne({
//	_id: id
//}).then((todo) => {
//	console.log('Todo', todo);
//});

//Todo.findById(id).then((todo) => {
//	if (!todo) {
//		return console.log('Id not found');
//	}
//	console.log('Todo', todo);
//}).catch((e) =>{console.log(e);})

var id = '5a8dbbefc91bc9593a6754b2';
 
User.findById(id).then((user) => {
	if(!user) {
		return console.log('Id not found');
	}
	console.log(user);
}, (e)  => {
	console.log(e);
});