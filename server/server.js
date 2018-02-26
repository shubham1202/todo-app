//library imports
const _          = require('lodash');
const express    = require('express');
const bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

//local imports
var {mongoose} = require('./db/mongoose');
var {Todo}     = require('./models/todo');
var {User}     = require('./models/user');

//Server setup(include express in our application)
var app = express();

//middleware(bodyParser takes Json data and returns function(Javascript object data))
app.use(bodyParser.json());

//400: Bad request
//404: Not found

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


//Query to get todo by id
app.get('/todos/:id', (req, res) => {
	//res.send(req.params);
	var id = req.params.id;
	
	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	
  Todo.findById(id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
});

//delete todo by id
app.delete('/todos/:id', (req, res) => {
	
	var id = req.params.id;
	
	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	
	Todo.findByIdAndRemove(id).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});
	
});

app.patch('/todos/:id', (req, res) => {
	var id   = req.params.id;
	var body = _.pick(req.body, ['text', 'completed']); //To select which properties to update
	
	if(!ObjectId.isValid(id)) {
		return res.status(404).send();
	}
	
	if(_.isBoolean(body.completed) && body.completed) {
		body.completedAt = new Date().getTime();           //body.completedAt will be created when we need 
	} else {
		body.completed   = false;
		body.completedAt = null;
	}
	
	Todo.findByIdAndUpdate(id, {$set: body}, {$new: true}).then((todo) => {
		if(!todo) {
			return res.status(404).send();
		}
		res.send({todo});
	}).catch((e) => {
		res.status(400).send();
	});	  
});

//Create a resource(new User)
app.post('/users', (req, res) => {
	var body = _.pick(req.body, ['email', 'password']);
	console.log(body);
	var user = new User(body);
	
	user.save().then((user) => {
		//res.send({user});
		return user.generateAuthToken();
	}).then((token) => {
		res.header('x-auth', token).send(user);//x-auth is used to indicate custom header,not default.http                                           header
	}).catch((e) => {
		res.status(400).send(e);
	});
});

//Server setup(Listen to port)
app.listen(3000, ()=> {
	console.log('Started on port 3000');
});