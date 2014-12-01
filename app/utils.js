

module.exports.unset = function (variable) {
    return variable === null || typeof variable === 'undefined' || variable === undefined || trim(variable) === '';
}

module.exports.hasRouteAccess = function (accessToken, request, response) {
    if (unset(accessToken)) throw 'accessToken not set';
    if (unset(request.session.accessToken)) throw 'session has no accessToken';
    
    if (request.session.accessToken != accessToken) {
        response.json({ result: 'failure', reason: 'incorrect access token' });
        return true;
    }
    
    return false;
}

module.exports.hasParameters = function (request, params) {
    for (var i = 0; i < params.length; i++) {
        if (unset(request.query[params[i]])){
            return false;
        }
    }
    
    return true;
}

module.exports.isLoggedIn = function (req, res, next) {
    
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
    
    // if they aren't redirect them to the home page
    res.redirect('/');
}
