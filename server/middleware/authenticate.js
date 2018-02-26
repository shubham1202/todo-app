var {User} = require('./../models/user');

var authenticate = (req, res, next) => {
	var token = req.header('x-auth');    //req.header -> getting the value

	User.findByToken(token).then((user) => {
		if(!user) {
			return Promise.reject();
		}
		//manipulating req object
		req.user  = user; 
		req.token = token;
		next(); 
	}).catch ((e) => {
		res.status(401).send();
	});
};

module.exports = {authenticate};