var path = require('path');
var coffeeify = require('coffeeify');
var derby = require('derby');
var express = require('express');
var session = require('express-session');
var serveFavicon = require('serve-favicon');
var serveStatic = require('serve-static');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var MongoStore = require('connect-mongo')(session);
var liveDbMongo = require('livedb-mongo');
var racerHighway = require('racer-highway');

derby.use(require('racer-bundle'));

module.exports = function(app, options, done) {
  var publicDir = path.dirname(app.filename) + '/public';
  var sessionStore = new MongoStore({url: process.env.MONGO_URL});
  var sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    saveUninitialized: true
  });

  var store = derby.createStore({
    db: liveDbMongo(process.env.MONGO_URL + '?auto_reconnect', {safe: true})
  });
  store.on('bundle', function(browserify) {
    browserify.transform({global: true}, coffeeify);
    var pack = browserify.pack;
    browserify.pack = function(opts) {
      var detectTransform = opts.globalTransform.shift();
      opts.globalTransform.push(detectTransform);
      return pack.apply(this, arguments);
    };
  });
  var handlers = racerHighway(store);

  var expressApp = express()
    .use(compression())
    .use(serveFavicon(publicDir + '/favicon.ico'))
    .use(serveStatic(publicDir))
    .use(cookieParser(process.env.SESSION_SECRET))
    .use(sessionMiddleware).use(handlers.middleware)
    .use(store.modelMiddleware());

  if (options.middleware) options.middleware(expressApp, store);

  expressApp.use(app.router());

  if (options.setup) options.setup(store, app, expressApp, derby);

  expressApp.all('*', function(req, res, next) {
    return next('403: ' + req.url);
  });

  return app.writeScripts(store, publicDir, {extensions: ['.coffee']}, function(err) {
    return done(err, expressApp, handlers.upgrade);
  });
};
