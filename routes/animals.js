var express = require('express');
var router = express.Router();
var util = require("util"); 
var fs = require("fs");
var path = require('path');
var url = require('url');

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

router.get('/addAnimal', function(req, res, next) {
	res.render('addAnimalIndex', { title: 'Add Animal'});
});

router.get('/index', function(req, res, next) {
	var db = req.con;
	var data = "";
	db.query('SELECT * FROM animal',function(err,rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		console.log(rows);
		var data = rows;
		console.log("Outside--"+data.id);
		res.render('animalsIndex', { title: 'Animal Information', dataGet: data });
	});
});

router.get('/search/:searchText', function (req, res, next) {
  var db = req.con;
	var data = "";
	db.query('SELECT * FROM animal WHERE Proprietar = ', [req.params.searchText], function (err, rows){
		//if(err) throw err;
		
		// console.log('Data received from Db:\n');
		console.log(rows);
		res.render('animalsIndex', { title: 'Animal Information', animals: rows });
	});
});

router.get('/update/:id', function(req, res, next) {
	var db = req.con;
    console.log('Buuum');
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
			Proprietar: req.body.Proprietar,
            Specia: req.body.Specia,
            Varsta: req.body.Varsta,
            Sex: req.body.Sex,
            Numar_identificare: req.body.Numar_identificare
		};
	db.query('UPDATE animal set ? WHERE id = ?',[data, req.body.id] ,function(err,rows){
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Error updating animal', 'raw': JSON.stringify(req.body)}));
		}
		res.send(JSON.stringify({'status': 1, 'msg': 'Animal actualizat!', 'raw': JSON.stringify(req.body)}));
	});
});

router.delete('/delete/:id', function(req, res) {
	//var url_parts = url.parse(req.url, true); // Read parameter from url if any
	//console.log("---"+JSON.stringify(url_parts.query));
	console.log("---"+JSON.stringify(req.params));
	var db = req.con;
	db.query('DELETE FROM user WHERE id = ? ',[req.params.id] ,function(err,rows){
		if(err){
			res.send(JSON.stringify({'status': 0, 'msg': 'Error User deleted', 'raw': JSON.stringify(req.params)}));
		}
		res.send(JSON.stringify({'status': 1, 'msg': 'User deleted', 'raw': JSON.stringify(req.params)}));
	});
});



module.exports = router;