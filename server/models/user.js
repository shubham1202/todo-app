const mongoose  = require('mongoose');
const validator = require('validator');
const jwt       = require('jsonwebtoken');
const _         = require('lodash');
const bcrypt         = require('bcryptjs');

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
 
//Methods used to override the default Schema(here we pick only id, email to show nd ignore psw,token values )
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
  user.tokens.push({access: access, token: token});    //tokens is an empty array, so can use regular                                                          array methods
 
  return user.save().then(() => {       //return token value as a success case to be used in server.js
		return token;                       // to chained then() call, generally we return a promise to 
	});                                   // chained then() see promise-2.js example for reference
}

UserSchema.statics.findByToken = function(token) {
	var User = this;
	var decoded;
	//try-catch is used because jwt.verify throws error so we need to catch it if we use wrong secret key/token value is manipulated
	try{
		decoded = jwt.verify(token, 'abc123');
	} catch (e) {
		return Promise.reject();
	}
	
	//Promise is returned
	return User.findOne({  //Querying nested object properties,we use quotes because we use nested  object                         properties 
		'_id': decoded._id,                
		'tokens.token': token,
		'tokens.access': 'auth'
	});
}

//Mongoose middleware,'save' = run middleware before we save doc to User model 
UserSchema.pre('save', function(next) {
	var user = this;
	
	if(user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {	
			bcrypt.hash(user.password, salt, (err, hash) => {	
				user.password = hash;
				next();
		  });
		});
	}
	else{
		next();
	}
});
//User model
var User = mongoose.model('User', UserSchema);

module.exports = {User};