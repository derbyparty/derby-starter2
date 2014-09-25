var http = require('http');
var derby = require('derby');
var serverApp = require('./app');

function listenCallback(err) {
  console.log('%d listening. Go to: http://localhost:%d/', process.pid, process.env.PORT);
}

function expressServer(err, expressApp, upgrade) {
  if (err) throw err;

  var server = http.createServer(expressApp);
  server.on('upgrade', upgrade);
  server.listen(process.env.PORT, listenCallback);
}

module.exports = function(app, options) {
  function createServer() {
    serverApp(app, options, expressServer);
  };
  derby.run(createServer);

  process.on('uncaughtException', function(err) {
    console.log('Uncaught exception: ' + err.stack);
  });
};
