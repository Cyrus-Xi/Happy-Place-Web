// Get the mongoose module.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Define the Compliment schema and make it a model.
var ComplimentSchema = new Schema({
    author : { type : String, default: '' },
    body : { type : String, default: '' },
    date : { type : Date, default: Date.now }
});

module.exports = mongoose.model('Compliment', ComplimentSchema);
