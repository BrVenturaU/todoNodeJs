const {request, response} = require('express');
const Alert = require('../models/alert');
const securityManager = require('../helpers/security-manager');

const validateSessionToken = (req = request, res = response, next) => {
    const sessionToken = req.cookies['_token'];
    if(!sessionToken){
        return res.render('../views/auth/login', {layout: 'guest', alert: new Alert('Por favor inicie sesión antes de continuar.')});
    }
    
    req.user = securityManager.sessionTokens[sessionToken];
    next();
}

module.exports = {
    validateSessionToken
}
