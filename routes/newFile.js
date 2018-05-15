var express = require('express');
var router = express.Router();

/* GET examination listing. */
router.get('/', function (req, res, next) {
  var db = req.con;
  var data = "";
	db.query('SELECT * FROM consultatie',function (err, rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		console.log(rows);
		res.render('newFileIndex', { title: 'Animal examination', newFile: rows });
	});
});

module.exports = router;
