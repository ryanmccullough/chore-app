//chore.js
var mongoose = require('mongoose');

var choreSchema = mongoose.Schema({

    Chore            : {
        text        : String,
        title     : String,
        desc	: String,
        user 	: String
    }

});

module.exports = mongoose.model('Chore', choreSchema);