// *******************************************************
// expressjs template
//
// assumes: npm install express
// defaults to jade engine, install others as needed
//
// assumes these subfolders:
//   public/
//   public/javascripts/
//   public/stylesheets/
//   views/
//
var express = require('express');
var app = express();
var routes = require('./routes');
var fs = require('fs');
var logger = require('./log');
var config = require('./config');

// services
var MetadataService = require('./services/MetadataService').MetadataService;

var expressLogFile = fs.createWriteStream(config.settings.express_log, {flags: 'a'}); 
//var viewEngine = 'jade'; // modify for your view engine
// Configuration
app.configure(function(){
  //app.set('views', __dirname + '/views');
  //app.set('view engine', viewEngine);
  app.use(express.logger({stream: expressLogFile}));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});
app.configure('production', function(){
  app.use(express.errorHandler());
});

var services = {
  metadata: new MetadataService()
};

function start() {
  logger.info('setting up routes ...');
  routes.setup(app, services);
  //var port = process.env.PORT || 8888;
  app.listen(config.settings.server_port);
  logger.info("Express server listening on port %d in %s mode", config.settings.server_port, app.settings.env);
}

start();

// *******************************************************
exports.start = start;
exports.app = app;
