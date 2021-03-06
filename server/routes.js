'use strict';

var index = require('./controllers'),
    webapi = require('./controllers/api'),
    loginLocal = require('./controllers/login/local-routes');


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
var ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
};

/**
 * Application routes
 */
module.exports = function (app) {

    app.get('/partials/*', index.partials);
    app.get('/awesomeThings', webapi.awesomeThings);
    app.get('/test/', webapi.awesomeThings);

    loginLocal.useStrategy();

    loginLocal.userIsLogged(app);
    loginLocal.login(app);
    loginLocal.signup(app);
    loginLocal.logout(app);
};