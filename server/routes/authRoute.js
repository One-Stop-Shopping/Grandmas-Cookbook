const router = require('express').Router();
const authController = require('../controller/authController');
const tokenController = require('../controller/tokenController');
const db = require('../models/databaseModels');
const authToken = require('../controller/sessionController');

router.post('/signup', authController.signUp, tokenController.jwtTokens, (req, res) => {
    res.status(200).send(res.locals.authenticatedUser);
});

router.post('/login', authController.login, tokenController.jwtTokens, (req, res) => {
    res.status(200).send(res.locals.authenticatedUser);
});

router.get('/allusers', authToken.authorizeSession, async (req,res) => {
    db.query('SELECT * from users')
      .then(users => {
        res.json({user: users.rows});
      
      })
      .catch(err => {
        res.status(500).json({error: err.message});
      })
  })

router.get('/refresh_token', authController.refreshToken, (req, res) =>{
    res.json(res.locals.refreshToken);
});
module.exports = router;
