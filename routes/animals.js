var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.con;
	var data = "";
	db.query('SELECT * FROM animal',function(err, rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		console.log(rows);
		res.render('animalsIndex', { title: 'Animal Information', animals: rows });
	});
});

module.exports = router;
