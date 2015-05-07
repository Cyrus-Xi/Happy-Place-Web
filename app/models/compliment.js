// Get the mongoose module.
var mongoose = require('mongoose');

// Define the compliment model.
module.exports = mongoose.model('Compliment', {
    author : { type : String, default: '' },
    body : { type : String, default: '' },
    date : { type : Date, default: Date.now }
});
