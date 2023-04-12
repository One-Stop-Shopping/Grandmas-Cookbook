const jwt = require('jsonwebtoken')

const sessionController = {};

sessionController.authorizeSession = (req, res, next) => {
    const refreshToken = req.cookies.refresh_token;
    // const token = authHeader && authHeader.split(" ")[1];

    if(refreshToken === null) return res.status(401).json({error: "Null token"});

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({error: error.message});
        req.user = user;
        return next();
    });
}

module.exports = sessionController;