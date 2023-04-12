const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../models/databaseModels');
const refreshTokenGenerator = require('../utils');     

const authController = {};

authController.signUp = async (req, res, next) => {
    const {
        username, 
        password
    } = req.body;

    const newUserQuery = 'INSERT INTO users (username, password) VALUES($1, $2) RETURNING *'
    const hashedPassword = await bcrypt.hash(password, 10);
    const values = [
        username,
        hashedPassword
    ];
    await db.query(newUserQuery, values)
        .then((data) => {
            res.locals.id = data.rows[0].id;
            res.locals.username = data.rows[0].username;
            return next();
        })
        .catch((err) => 
            next({
                log: `Error encountered in authController.signUp, ${err}`,
                message: 'Error encountered when querying the database.',
            })
        )
}

authController.login = async (req, res, next) => {
    const props = ['username', 'password'];
    if(!props.every((prop) => Object.hasOwn(req.body, prop))) {
        return next('Error in authController.login: Missing username or password');
    }

    const {
        username, 
        password
    } = req.body;
    const findExistingUser = 'SELECT * FROM users where username = $1';
    const user = await db.query(findExistingUser, [username]);
    if (user.rows.length === 0) return res.status(401).json({error: "Incorrect username or password"});

    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) return res.status(401).json({error: "Incorrect username or password"});

    res.locals.username = username;
    res.locals.id = user.rows[0].id;
    return next();
}

authController.refreshToken = (req, res, next) => {
    try{
        const refreshToken = req.cookies.refresh_token;
        if (refreshToken === null) return res.status(401).json({error: "null refresh token"});
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({error: err.message})
            };
            let token = refreshTokenGenerator.generateRefreshToken(user);
            res.cookie('refresh_token', token, {httpOnly: true});
            res.locals.refreshToken = token;
            return next();
        });
    } catch (err) {
        return res.status(401).json({error: err.message});
    }
}


module.exports = authController;