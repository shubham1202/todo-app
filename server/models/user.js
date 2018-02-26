const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');

//User schema(Schema is used because we want to use custom methods like generateAuthToken(); taht cannot be used on model)
var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlenght: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,          //returns true or false
			message: '{VALUE} is not a valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlenght: 6,
	},
	tokens: [{
		access: {
			type: String,
			required: true
		},
		token: {
			type: String,
			required: true
		}
	}],
	
},{usePushEach: true});
 
//Methods used to override the default Schema
UserSchema.methods.toJSON = function() {
	var user = this;
	var userObject = user.toObject();
	return _.pick(userObject, ['_id', 'email']);
}

//UserSchema.methods -> Object on which we can create custom instance methods(generateAuthToken)
UserSchema.methods.generateAuthToken = function() {
	var user = this; //this can access individual documents
	
	//Creating individual user token by getting access and token value
	var access = 'auth';
	var token  = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString(); //returns object so                                                                                      used .toString()
                                                                                 //toHexString:coneverts
                                                                                 //ObjectId to string
  user.tokens.push({access: access, token: token});    //tokens is an empty array, so can use regular array methods
 
  return user.save().then(() => {       //return token value as a success case to be used in server.js
		return token;                       // to chained then() call, generally we return a promise to 
	});                                   // chained then() see promise-2.js example for reference
}                                                                                    				                                                                                              
//User model
var User = mongoose.model('User', UserSchema);

module.exports = {User};