const crypto = require('crypto');
const bcryptjs = require('bcryptjs');
const sessionTokens = {};

const createSecurityHash = (password) => {
    const salt = bcryptjs.genSaltSync();
    const hash = bcryptjs.hashSync(password, salt);
    return {salt, hash};
}

const verifySecurityHash = (password, userSalt, userHash) => {
    const hash = bcryptjs.hashSync(password, userSalt);
    for(let i=0; i<hash.length; i++)
        if(hash[i] != userHash[i]) return false;

    return true;
}

const createToken = () => {
    return crypto.randomBytes(30).toString('hex');
}

module.exports = {
    sessionTokens,
    createSecurityHash,
    verifySecurityHash,
    createToken
}