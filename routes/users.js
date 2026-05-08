var express = require('express');
var router = express.Router();
var role = require('../middleware/role.js');

/* GET users listing. */
router.get('/', role('user'), function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
