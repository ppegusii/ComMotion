// set environment variables
require('./config/EnvVariables.js');

/**
 * Module dependencies.
 */

var express = require('express');
var prof = require('./routes/profile');
var nav = require('./routes/navigation');
var results = require('./routes/results');
var entry = require('./routes/entry');
//var routes = require(process.env.ROUTES);
var user = require(process.env.ROUTES_USER);
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
require('simple-errors');

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
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(flash());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
  app.get('/documentation',routes.documentation);
}


app.get('/', user.landing);
app.get('/signup', user.signup);
app.get('/createprofile', user.createprofile);

app.get('/profile/about', prof.profile_about);
app.get('/profile/myposts', prof.profile_posts);
app.get('/profile/mycreations', prof.profile_creations);
app.get('/profile/followers', prof.profile_followers);
app.get('/profile/following', prof.profile_following);

app.get('/home', nav.home);

app.get('/create', nav.create);
app.get('/encyclopedia', nav.encyclopedia);

app.get('/myfavorites', nav.myfavorites);
app.get('/findusers', nav.findusers);

//app.post('/query',routes.query);



app.get('/usersearchresults', results.user_search_results);
app.get('/encyclopediaresults', results.encyclopedia_results);

app.get('/encyclopedia/exercise_entry', entry.encyclopedia_exercise_entry);
app.get('/encyclopedia/workout_entry', entry.encyclopedia_workout_entry);

app.get('/create/exercise', nav.exercise);
app.get('/create/workoutcreator', nav.workoutcreator);

app.post('/create/exercise/save', nav.saveexercise);
app.get('/create/exercise/cancel', nav.cancelexercise);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
