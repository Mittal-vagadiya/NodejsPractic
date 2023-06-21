const express = require('express');
const { LoginUser, CurrentUser, RegisterUser, Checking } = require('../Controller/UserController');
const verifyToken = require('../middlewear/tokenVerfication');

const router = express.Router();

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.post('/current', CurrentUser)
router.get('/private', verifyToken, Checking);


module.exports = router;