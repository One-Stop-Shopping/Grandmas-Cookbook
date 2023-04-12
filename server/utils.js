const jwt = require('jsonwebtoken');

const refreshToken = {};

refreshToken.generateRefreshToken = ({id, username}) => {
    const user = {id, username};
    const newRefreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});
    return newRefreshToken;
}

module.exports = refreshToken;