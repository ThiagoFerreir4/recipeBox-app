'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

/*
I've got an app and a server listening ... which is which? what makes them different?
*/

app.listen(8080, function() {
	console.log("The server is running on port 8080.");
});

//use body parser middleware
app.use(bodyParser());

//static assets? app.use?
app.use(express.static('public'));

//routes - where does the user go when they visit the app?
//this takes them to an HTML page.
app.get('/', function(req, res) {
	res.sendFile('./public/index.html');
});

//view engine set up
app.set('views', path.join(__dirname, 'server/views'));


//app.use('/api', router);

var recipes = require('./server/routes/recipes');
app.use('/recipes', recipes);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/recipeSample');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {"Hello Mongoose"});