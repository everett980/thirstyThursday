var express = require('express');
var app = express(); 
var routes = require('./routes/beers.js');

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use("/",function(req,res,next){

	console.log("Req method: ", req.method);
	next();

})

app.use('/beers/',routes);

// app.use('/beers/:Reallyfuntime',brands)


app.use(function(err, req, res, next) {
	if (err)
		console.error(err.message);
	res.sendStatus(500);
	next();
})



app.listen(3000, function(){
	console.log("Listening on 3000");
});
















// var express = require('express');
// var app = express();

// var morgan = require('morgan');
// var bodyParser = require('body-parser');
// var swig = require('swig');
// require('./filters')(swig);
// var path = require('path');
// module.exports = app;

// app.set('views', path.join(__dirname, './views'));
// app.set('view engine', 'html');
// app.engine('html', swig.renderFile);
// swig.setDefaults({ cache: false });

// app.use(morgan('dev'));
// app.use(express.static(path.join(__dirname, './public')));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.use('/wiki', require('./routes/wiki'));
// app.use('/users', require('./routes/users'));

// app.get('/', function (req, res) {
//    res.render('index');
// });

// app.use(function (err, req, res, next) {
//     console.error(err);
//     res.status(500).send(err.message);
// });
