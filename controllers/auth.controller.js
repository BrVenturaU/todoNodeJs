const {request, response} = require('express');
const securityManager = require('../helpers/security-manager');
const Alert = require('../models/alert');
const User = require('../models/user');

const create = (req = request, res = response) => {
    return res.render('../views/auth/register', {layout: 'guest'});
}

const register = async (req = request, res = response) => {
    try{
        const {name, email, password, passwordConfirmation} = req.body;
        if(password != passwordConfirmation)
            return res.render('../views/auth/register', {layout: 'guest', alert: new Alert('Las claves de acceso no coinciden.')} );

        const existsUser = await User.findOne({email:email});
        if(existsUser)
            return res.render('../views/auth/register', {layout: 'guest', alert: new Alert(`El usuario ${name} ya existe.`)});

        const {salt, hash} = securityManager.createSecurityHash(password);
        const user = new User({'name': name, 'email':email, 'passwordSalt': salt, 'passwordHash': hash});
        await user.save();

        return res.render('../views/auth/login', {layout: 'guest', alert: new Alert(`Usuario ${user.name} creado con exito.`, 'success')});
    }catch (err){
        console.log(err);
    }
}

const login = (req = request, res = response) => {
    return res.render('../views/auth/login', {layout: 'guest'});
}

const authenticate = async (req = request, res = response) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email:email});
        if(!user)
            return res.render('../views/auth/login', {layout: 'guest', alert: new Alert('Su usuario no coincide con ningun registro.')});
        if(!securityManager.verifySecurityHash(password, user.passwordSalt, user.passwordHash))
            return res.render('../views/auth/login', {layout: 'guest', alert: new Alert('Su clave de acceso es incorrecta.')});
        
        const sessionToken = securityManager.createToken();
        securityManager.sessionTokens[sessionToken] = user.toJSON();
        res.cookie('_token', sessionToken);
        return res.redirect('/home');
    } catch (error) {
        console.log(error);
    }
}

const logout = (req = request, res = response) => {
    res.clearCookie('_token');
    return res.redirect('/auth/login');
}

module.exports = {
    create,
    login,
    authenticate,
    register,
    logout
}

