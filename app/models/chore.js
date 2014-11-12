//chore.js
var mongoose = require('mongoose');

var choreSchema = {
	text : String,
	
}

module.exports = mongoose.model('Chore', {
	text : String,
	done : Boolean
});