const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const Password = require("../middleware/Password")


router.post('/signup', Password,  userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/getPseudo/:email', userCtrl.getPseudo);

module.exports = router;