const express = require('express');

const router = express.Router();
const home = require('../controller/Auth');
const User = require('../controller/user')


// Register API
router.post('/register',home.register);
router.post('/login',home.login);
router.put('/update',User.update);    
router.delete('/delete', User.delete);


module.exports = router;