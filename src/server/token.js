const jwt = require('jsonwebtoken');


const createAccessToken = (adminId) => {
    return jwt.sign({adminId},  process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn: '1d'});
}

const createRefreshToken = (adminId) => {
    return jwt.sign({adminId},  process.env.REFRESH_TOKEN_SECRET_KEY, {expiresIn: '1d'});
}

module.exports = {
    createAccessToken,
    createRefreshToken
}