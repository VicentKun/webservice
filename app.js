/**************************************************

By Vicent Kun | Web Developer. [www.vicentkun.com]

**************************************************/

// All my app need with requires.

var        express = require('express');              //This require Express Framework [http://expressjs.com/]	   

var           path = require('path');                 //This module contains utilities for handling and transforming file paths.

var         logger = require('morgan');               //This require Morgan, is log request to the console.

var     bodyParser = require('body-parser');          //This is for pull information from HTML.

var methodOverride = require('method-override');      //Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.

var			  jade = require('jade');                 // Default view engine.

var       mongoose = require('mongoose');             // Load Mogoose lib tool for interact with Database.

var       configDB = require('./config/database.js'); // Load info to database connect.


// Create our app! This var contain our app.

const app = express();

// configuration ===============================================================
mongoose.connect(configDB.endPointLocalDatabase); // connect to our database

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Set Up Express FrameWork.

app.use(logger('dev')); // log every request to the console.

app.use(bodyParser.urlencoded({ extended: false })); //Parse application/x-www-form-urlencoded

app.use(bodyParser.json()); //Body object containing the parsed data is populated on the request object after the middleware (i.e. req.body)

app.use(methodOverride()); //Charge, method-override to use HTTP verbs such as PUT or DELETE.

app.use(express.static(__dirname + '/public')); //Set a folder to static resources.


// Set Up Application Routes.

var vHome = require('./controllers/home');
var wsApi = require('./controllers/api');

app.use('/',vHome); // When URL is / go to ./routes/home.js
app.use('/api', wsApi); // When URL is /wsApi go to ./routes/api.js

// Catch 404 and forward to error handler.

app.use((req, res, next) => {
	
	var err = new Error('Not Found :(');
	
	err.status = 404;
	
	next(err);
	
});


// Development error handler | Manejador de errores en modo Desarrollo.
// Here will print stacktrace

if (app.get('env') === 'development') {
	
	app.use(function(err, req, res, next) {
		
		res.status(err.status || 500);
		
		res.render('error/404', {
			error: err,
			message: err.message,
			title: 'ERROR',
			user: req.user
		});
		
	});
	
}


// Production error handler | Manejador de errores en modo Producción.
// No stacktraces leaked to user

app.use(function(err, req, res, next) {
	
	res.status(err.status || 500);
	
	res.render('error/404', {
		error: {},
		message: err.message,
		title: 'ERROR'
	});
	
});

module.exports = app;