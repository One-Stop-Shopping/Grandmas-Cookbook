const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');

const tokenController = {};

tokenController.jwtTokens = (req, res, next) => {
    const { id } = res.locals.id;
    const { username } = res.locals.username;

    const user = {id, username};

    const acessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2m'});
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '5m'});

    res.locals.authenticatedUser = {acessToken, refreshToken};
    res.cookie('refresh_token', refreshToken, {httpOnly: true});

    return next();
}

module.exports = tokenController;