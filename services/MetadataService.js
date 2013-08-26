var logger = require('../log');

var MetadataProvider = require('../metadataProvider-mongodb').MetadataProvider;
var metadataProvider = new MetadataProvider();

MetadataService = function() {
	this.GetAllMetadata = handleGetAllMetadataRequest;
	this.GetMetadataByMessage = handleGetAllMetadataByMessageRequest;
	this.CreateMetadata = handleCreateMetadataRequest;
	this.UpdateMetadata = handleUpdateMetadataRequest;
	this.DeleteMetadata = handleDeleteMetadataRequest;
};

function handleGetAllMetadataRequest(req, res) {
	debugger;
	logger.info('In MetadataService.handleGetAllMetadataRequest()');
	metadataProvider.fetchAllMetadata(function(err, data) {
		logger.debug('succesfully returned from metadataProvider.fetchAllMetadata(): data (%s)', data);
		if (err) {
			res.json(500, { error: err.message });
		} else {
			res.json(200, data);
		}
	});
}

function handleGetAllMetadataByMessageRequest(req, res) {
	logger.info('In MetadataService.handleGetAllMetadataByMessageRequest(): message = (%s)', req.params.id);
	metadataProvider.fetchMetadata(req.params.id, function(err, data) {
		logger.debug('succesfully returned from metadataProvider.fetchMetadata(): data (%s)', data);
		if (err) {
			res.json(500, { error: err.message });
		} else {
			res.json(200, data);
		}
	});
}

function handleCreateMetadataRequest(req, res) {
	logger.info('In MetadataService.handleCreateMetadataRequest(): message (%s), hiker (%s)', req.params.id, req.params.hiker);
	metadataProvider.createMetadata(req.params.id, req.params.hiker, function(err, data) {
		logger.debug('succesfully returned from metadataProvider.createMetadata(): data (%s)', data);
		if (err) {
			res.json(500, { error: err.message });
		} else {
			res.json(200, data);
		}
	});
}

function handleUpdateMetadataRequest(req, res) {
	logger.info('In MetadataService.handleUpdateMetadataRequest(): message (%s), hiker (%s)', req.params.id, req.params.hiker);
	metadataProvider.updateMetadata(req.params.id, req.params.hiker, function(err, data) {
		logger.debug('succesfully returned from metadataProvider.updateMetadata(): data (%s)', data);
		if (err) {
			res.json(500, { error: err.message });
		} else {
			res.json(200, data);
		}
	});
}

function handleDeleteMetadataRequest(req, res) {
	logger.info('In MetadataService.handleDeleteMetadataRequest(): message (%s)', req.params.id);
	metadataProvider.deleteMetadata(req.params.id, function(err, data) {
		logger.debug('succesfully returned from metadataProvider.deleteMetadata(): data (%s)', data);
		if (err) {
			res.json(500, { error: err.message });
		} else {
			res.json(200, data);
		}
	});
}

exports.MetadataService = MetadataService;
