var express = require('express');
var router = express.Router();
var role = require('../middleware/role.js');
var auth = require('../middleware/auth.js');
const userController = require('../controllers/userController.js');

/* GET users listing. */
router.get('/',auth, role(1), userController.index);

router.get('/create',auth, role(1), function(req, res, next) {
  res.render('users/createUser', { user: req.session.user });
});

module.exports = router;
