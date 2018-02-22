 var mongoose = require('mongoose');

//Tell mongoose to use promise
mongoose.Promise = global.Promise;

//Connect mongoose to mongodb database server
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};