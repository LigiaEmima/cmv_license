var express = require('express');
var router = express.Router();

/* GET registru */
router.get('/', function (req, res, next) {
  res.render('articole', { title: 'Articole' });
});

module.exports = router;