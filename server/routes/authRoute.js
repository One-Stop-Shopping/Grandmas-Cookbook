const router = require('express').Router();
const authController = require('../controller/authController');


router.post('/signin', authController.signIn);

router.post('/signup', authController.signUp);

module.exports = router;
