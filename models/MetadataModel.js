var mongoose = require('mongoose/');
var config = require('../config');
var logger = require('../log');

Schema = mongoose.Schema;

// create a schema for our data
var MetadataSchema = new Schema({
	message: String,
	hiker: String,
	date: Date
});

// use the schema to register model
mongoose.model('messages', MetadataSchema);
var MetadataMongooseModel = mongoose.model('messages');	// just to emphasize this isn't a Backbone Model

exports.MetadataModel = MetadataMongooseModel;
