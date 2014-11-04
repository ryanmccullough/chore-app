var mongoose = require('mongoose');

module.exports = mongoose.model('Chore', {
	text : String,
	done : Boolean
});