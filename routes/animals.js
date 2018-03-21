var express = require('express');
var router = express.Router();

/* GET animals listing. */
router.get('/', function (req, res, next) {
  var db = req.con;
	var data = "";
	db.query('SELECT * FROM animal',function (err, rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		console.log(rows);
		res.render('animalsIndex', { title: 'Animal Information', animals: rows });
	});
});


router.get('/update/:id', function(req, res, next) {
	var db = req.con;
	db.query('SELECT * FROM animal WHERE ID = ? ',[req.params.id] ,function(err,rows){
        console.log("results:", rows);
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Error animal deleted', 'raw': JSON.stringify(req.params)}));
		}
		res.render('updateAnimal', { title: 'Update Animal', data: rows});
	});
});

router.put('/update', function(req, res, next) {
	console.log("---"+JSON.stringify(req.body));
	var db = req.con;
	var data = {
			Nume: req.body.Nume,
			Proprietar: req.body.Proprietar
		}
	db.query('UPDATE animal set ? WHERE id = ?',[data, req.body.id] ,function(err,rows){
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Error updating animal', 'raw': JSON.stringify(req.body)}));
		}
		res.send(JSON.stringify({'status': 1, 'msg': 'Animal updated', 'raw': JSON.stringify(req.body)}));
	});
});


module.exports = router;
