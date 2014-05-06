// set environment variables
require('./config/EnvVariables.js');

/**
* Module dependencies.
*/

var express = require('express');
var exer = require('./routes/exercise');
var prof = require('./routes/profile');
var nav = require('./routes/navigation');
var results = require('./routes/results');
var routes = require(process.env.ROUTES);
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
app.use(express.favicon('public/images/logo.png'));
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
  app.get('/tests',routes.tests);
}

app.get('/', user.landing);
app.get('/signup', user.signup);
app.get('/createprofile', user.createprofile);

// filters out "pages" with period; is there a better
// way to not include resources?
app.get('^[^.]+$', nav.checkUser);

app.get('/profile/about', prof.profile_about);
app.get('/profile/about_you', prof.profile_about_reset);
app.get('/profile/myposts', prof.profile_posts);
app.get('/profile/mycreations', prof.profile_creations);
app.get('/profile/followers', prof.profile_followers);
app.get('/profile/following', prof.profile_following);
app.get('/profile/user', prof.other_user_profile_about);

app.get('/home', nav.home);
app.post('/home', nav.home);
app.post('/home/post', nav.post);

app.post('/authenticate', nav.authenticate);

app.get('/create', nav.create);
app.get('/encyclopedia', nav.encyclopedia);
app.get('/encyclopediaindex', nav.encyclopediaindex);


app.get('/myfavorites', nav.myfavorites);
app.get('/findusers', nav.findusers);

app.post('/query',routes.query);


app.get('/findusers/results', results.user_search_results);
app.get('/encyclopedia/results', results.encyclopedia_results);

app.get('/encyclopedia/exercise_entry', exer.encyclopedia_exercise_entry);
app.get('/encyclopedia/exercise_entry/edit', exer.editExercise);
app.get('/encyclopedia/workout_entry', nav.encyclopedia_workout_entry);
app.get('/encyclopedia/workout_entry/edit', nav.editWorkout);

app.get('/create/exercise', exer.createExercise);
app.get('/create/workoutcreator', nav.workoutcreator);
app.get('/create/editWorkout', nav.editWorkout);
app.post('/create/editWorkout/save', nav.saveWorkout);

app.post('/create/exercise/save', exer.saveexercise);
app.get('/create/exercise/cancel', exer.cancelexercise);

app.get('/logout', nav.logout);

// functions accessible in ejs files
app.locals({
   toYoutubeThumb: exer.toYoutubeThumb,
   toEmbedURL: exer.toEmbedURL
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
