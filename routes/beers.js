var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');

var Beer = require('../models/index.js').Beer;
var Drinkers = require('../models/index.js').Drinkers;

router.get('/',function(req,res, next){
	Beer.findOne({}).then(function(beers) {
		res.send(beers);
	}).then(null, next);
});

router.get('/andrew', function(req, res, next) {
	Drinkers.findOne({personName: 'Andrew'})
		.populate('beer')
		.then(function(drinker) {
			console.log(drinker);
			res.status(200).send(drinker.beer.brand);
		});
});

router.post('/add', function(req, res, next) {
	console.log(req.body);
	// Beer.create([req.body]).then(function() {
	// 	res.json(req.body);
	// }).then(null, next);
	var beerEntry = new Beer({
		name: req.body.name,
		brand: req.body.brand
	})
	beerEntry.save().then(function() {
		res.status(200).send("Beer added.");
	});
})

router.post('/addDrinker', function(req, res, next) {
	console.log(req.body);
	Drinkers.create([req.body]).then(function() {
		res.status(200).send("Drinker added.");
	});
})

router.delete('/delete', function(req, res, next) {
	Beer.remove({name : req.body.name}).then(function() {
		res.status(200).send("deleted: "+req.body.name);
	});
})

router.post('/update', function(req, res, next) {
	Beer.update({ name: req.body.name }, {$set: {brand: req.body.newBrand}}).then(function() {
		res.status(200).send("updated: "+req.body.name+" to "+req.body.newBrand);
	});
});

router.get('/:literallyAnything', function(req, res, next) {
	console.log(req.params.literallyAnything);
	res.send();
	next();
});

console.log(__dirname);







module.exports = router;