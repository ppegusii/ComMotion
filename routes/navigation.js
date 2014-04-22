var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.home = function(req, res){
   console.log("HOME ID: " + req.session.user.id);
   res.render('home', { user:req.session.user });
}

exports.checkUser = function(req, res, next) {
   var user = req.session.user;
   if(!user) {
      res.redirect('/');
   }
   else {
      next();
   }
}

exports.authenticate = function(req, res) {
   console.log(req.body.username);
   console.log(req.body.password);
   var username = req.body.username;
   var password = req.body.password;
//   setSessionForUser(username, password, req, function(err, user) {
//      if(err) {
//         req.flash('login', err.message);
//         res.redirect('/');
//      }
//      else {
//         //console.log(req.session.user);
//         res.redirect('home');
//      }
//   });
   var user = new models.User(1,'username','password',undefined,'www',undefined,undefined,undefined,undefined,undefined,undefined);
    req.session.user = user;
    res.redirect('home');
}

function setSessionForUser(username, pass, req, cb) {
   data.userGetByUsernamePassword({username: username, password: pass}, function (err, users){
      if(err) {
         cb(err, undefined);
      }
      else if(users.length === 0) {
         cb({message: 'Wrong username or password'}, undefined);
      }
      else {
         var user = users[0];
         console.log(user);
         req.session.user = user;
         cb(undefined, user);
      }
   });
}

exports.logout = function(req, res) {
   req.session.destroy(function() {
      res.redirect('/');
   });
}

exports.create = function(req, res){
   res.render('create', {title: 'Create'});
};

exports.encyclopedia = function(req, res){
  data.exercisesGetLimitN({n:10},function afterGet(err,exercises){
    res.render('encyclopedia',
      {
        title: 'Encyclopedia',
        exercises: exercises,
        err: err
      });
  });
};

exports.encyclopediaindex = function(req, res){
  res.render('encyclopediaindex', {title: 'Encyclopedia Index'});
};

exports.myfavorites = function(req, res){
	userId = req.session.user.id;
	data.exercisesGetByUserFav( {userId: userId},function afterGet(err, exercises){
    res.render('myfavorites',
      {
        title: 'My Favorites',
        exercises: exercises,
        err: err
      });
  });

};

exports.findusers = function(req, res){

    //data.searchByNameDescriptionMusclegroup()
     res.render('findusers', {title: 'Find Users'});
};

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};

exports.encyclopedia_workout_entry = function(req, res) {
     var data = getWorkoutEntry('Get workout id');
     res.render('encyclopedia/workoutentry', data);
}
