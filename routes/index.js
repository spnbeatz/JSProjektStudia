var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth.js');
var authController = require('../controllers/authController.js');
var userController = require('../controllers/userController.js');
var homeController = require('../controllers/homeController.js');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

/* GET home page. */
router.get('/', auth, homeController.index);

router.get('/login', authController.showLoginPage);
router.get('/register', function(req, res) {
    res.render("register");
});
router.post('/register', userController.createUser);

module.exports = router;
