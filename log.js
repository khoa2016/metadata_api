var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ json: false, timestamp: true, level: 'info' }),
    new winston.transports.File({ filename: __dirname + '/logs/debug.log', json: false, level: 'info' })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    new winston.transports.File({ filename: __dirname + '/logs/exceptions.log', json: false })
  ],
  exitOnError: false
});

module.exports = logger;
