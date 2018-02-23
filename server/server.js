//library imports
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectId} = require('mongodb');

//local imports
var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {User}     = require('./models/user');

//Server setup(include express in our application)
var app = express();

//middleware(bodyParser takes Json data and returns function(Javascript object data))
app.use(bodyParser.json());

//Create a resource(new todo)
app.post('/todos', (req, res) => {
	//console.log(req.body);
	//create new instance of Todo
	var todo = new Todo({
		text: req.body.text
	});
  
	//Save todo instance in collection
	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});
});

//Get listing of all todos
app.get('/todos', (req, res) => {
	Todo.find().then((todos) => {
		res.send({todos});
	}, (e) => {
		res.status(400).send(e);
	});
});

app.get('/todos/:id', (req, res) => {
	//res.send(req.params);
	var id = req.params.id;
	
	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	
Todo.findById(id).then((todo) => {
		if(!todo) {
			return res.status(400).send();
		}
		res.send(JSON.stringify({todo}, undefined, 2));
	}).catch((e) => {
		res.status(404).send();
	});
});

//Server setup(Listen to port)
app.listen(3000, ()=> {
	console.log('Started on port 3000');
});