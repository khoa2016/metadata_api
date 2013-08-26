var mongoose = require('mongoose/');
var config = require('./config');
var logger = require('./log');
var MetadataModel = require('./models/MetadataModel').MetadataModel;

var mongoURI = ( process.env.PORT ) ? config.creds.mongoose_auth_jitsu : config.creds.mongoose_auth_local;

logger.debug('mongo URI (%s)', mongoURI);
var db = mongoose.connect(mongoURI);

MetadataProvider = function() {
	
	this.fetchMetadata = function(message, cb) {
		logger.info('In metadataProvider-mongodb.fetchMetadata(): message = %s', message);
		MetadataModel.find({"message":message}).execFind(function(err, data) {
			if (err) {
				cb(err, null);
			} else {
				logger.debug('got metadata from MongoDb: data = (%s)', data);
				cb(err, data);
			}
		});
	};
	
	this.fetchAllMetadata = function(cb) {
		logger.info('In metadataProvider-mongodb.fetchAllMetadata()');
		MetadataModel.find().execFind(function(err, data) {
			if (err) {
				cb(err, null);
			} else {
				logger.debug('got all metadata from MongoDb: data = (%s)', data);
				cb(err, data);
			}
		});
	};

	this.createMetadata = function(message, hiker, cb) {
		logger.info('In metadataProvider-mongodb.createMetadata()');
		var obj = new MetadataModel();
		obj.message = message;
		obj.hiker = hiker;
		obj.date = new Date();
		obj.save(function() {
			cb(null, {message: message, hiker: hiker});
		});
	};
	
	this.updateMetadata = function(message, hiker, cb) {
		logger.info('In metadataProvider-mongodb.updateMetadata()');
		var obj = new MetadataModel();
		obj.message = message;
		obj.hiker = hiker;
		obj.date = new Date();
		obj.save(function() {
			cb(null, {message: message, hiker: hiker});
		});
	};
	
	this.deleteMetadata = function(message, cb) {
		logger.info('In metadataProvider-mongodb.deleteMetadata()');
		MetadataModel.find({"message":message}).remove(function(err, data) {
			cb(null, {message: message });
		});
	};
	
	this.fetchUserById = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.findOne({
					_id:users.db.bson_serializer.ObjectID.createFromHexString(id)
				}, function(error, result) {
					cb(error, result);
				});
			}
		});
	};
	
	this.insertUser = function(user, cb) {
		logger.info('inserting user: %s', user);
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.insert([user], function() {
					cb(null, user);
				});
			}
		});
	};
	
	this.updateUser = function(user, cb) {
		logger.info('updateUser');
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.update({_id:users.db.bson_serializer.ObjectID.createFromHexString(user._id)}, 
					{name:user.name, state:user.state, city:user.city}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
	
	this.deleteUser = function(id, cb) {
		this.db.collection(usersTable, function(error, users) {
			if (error) {
				cb(error, null);
			} else {
				users.remove({_id:users.db.bson_serializer.ObjectID.createFromHexString(id)}, 
					function(error, result) {
						cb(error, result);
				});
			}
		});
	};
};

exports.MetadataProvider = MetadataProvider;
