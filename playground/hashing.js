const{SHA256} = require('crypto-js');
const jwt     = require('jsonwebtoken');

var data = {
	id: 10
};

var token = jwt.sign(data, 'abc123').toString();  //generate token
console.log(token);

var decoded = jwt.verify(token, 'abc123'); //verify token for authentication
console.log('decoded', decoded);

//var message = 'I am user number 3';
//var hash    = SHA256(message).toString();
//
//console.log(`Message: ${message}`);
//console.log(`Hash: ${hash}`);
//
////Send data from server to user 
//var data = {
//	id: 4
//};
//
////Send token back to user and salting of hash data 
//var token = {
//	data,
//	hash: SHA256(JSON.stringify(data) + 'somesecret').toString() //???(data)
//};
//
//token.data = 5;
//token.hash = SHA256(JSON.stringify(token.data));
//
//var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString(); 
//
//if (resultHash == token.hash) {
//	console.log('Data not changed');
//}
//else {
//	console.log('Data changed.Do not trust...');
//}