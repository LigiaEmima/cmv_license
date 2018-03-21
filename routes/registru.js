var express = require('express');
var router = express.Router();

/* GET registru */
router.get('/', function (req, res, next) {
  res.render('registru', { title: 'Registru' });
});

module.exports = router;