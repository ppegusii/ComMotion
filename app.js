// set environment variables
require('./config/EnvVariables.js');
/**
 * Module dependencies.
 */

var express = require('express');
var nav = require('./routes/navigation');
var routes = require(process.env.ROUTES);
var user = require(process.env.ROUTES_USER);
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', user.landing);
app.get('/signup', user.signup);
app.get('/home', nav.home);

app.get('/create', nav.create);
app.get('/workoutplayer', nav.workoutplayer);
app.get('/encyclopedia', nav.encyclopedia);
app.get('/workoutcreator', nav.workoutcreator);
app.get('/myfavorites', nav.myfavorites);
app.post('/query',routes.query);

app.get('/profile/editprofile', nav.profile_edit);
app.get('/profile/about', nav.profile_about);
app.get('/profile/myposts', nav.profile_posts);
app.get('/profile/mycreations', nav.profile_creations);
app.get('/profile/followers', nav.profile_followers);

app.get('/encyclopediaresults', nav.encyclopedia_results);
app.get('/exercise', nav.exercise);

app.get('/graph', nav.graph);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
