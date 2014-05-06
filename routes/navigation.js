var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.home = function(req, res){
	userId = req.session.user.id;

	data.postsOfFollowedUsersGetByFollowingUserId( {userId: userId}, function(err, posts){
      if(err) {
         console.log(err);
      }
      else {
         data.userGetUsernameAndAvatarsOfPosts({userId: userId}, function(err2, users) {
            if(err) {
               console.log(err2);
            }
            else {
               console.log(users);
               res.render('home', {
                  posts: posts,
                  user: req.session.user,
                  users: users
               });
            }

         });
      }
//		data.userGetUsernameAndAvatarsOfPosts({userId: userId}, function afterGet2(err, users){
//
//		res.render('home',
//		  {
//		    title: 'Locker',
//			posts: posts,
//			user: req.session.user,
//			users: users,
//		    err: err
//		  });
//
//	  });

	});
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
   setSessionForUser(username, password, req, function(err, user) {
      if(err) {
         req.flash('login', err.message);
         res.redirect('/');
      }
      else {
         //console.log(req.session.user);
         res.redirect('home');
      }
   });
//   var user = new models.User(1,'username','password',undefined,'www',undefined,undefined,undefined,undefined,undefined,undefined);
//    req.session.user = user;
//    res.redirect('home');
}

exports.authenticate_signup = function(req, res) {
   console.log(req.body.username);
   console.log(req.body.password);
   var username = req.body.username;
   var password = req.body.password;
   setSessionForUser(username, password, req, function(err, user) {
      if(err) {
         req.flash('login', err.message);
         res.redirect('/');
      }
      else {
         //console.log(req.session.user);
         res.redirect('home');
      }
   });
//   var user = new models.User(1,'username','password',undefined,'www',undefined,undefined,undefined,undefined,undefined,undefined);
//    req.session.user = user;
//    res.redirect('home');
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
         req.session.user = user;
		 req.session.userContextID = user.id;
		 console.log(req.session.userContextID);
         cb(undefined, user);
      }
   });
}

exports.logout = function(req, res) {
   req.session.destroy(function() {
      res.redirect('/');
   });
}

exports.post = function(req, res) {
   var uid = req.session.user.id;
   var text = req.body.text;
   console.log(uid + '/////' + text);
   var myPost = new models.Post(undefined, uid, text, undefined);
   data.postInit({post: myPost}, function(err, post) {
      if(err) {
         res.send(500, err.message);
      }
      else {
         res.send(200, JSON.stringify(post));
      }
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
    data.exercisesGetLimitN({n:100},function afterGet(err,exercises){
       if(err) {
          res.send(500, err.message);
       }
       else {
          data.workoutsGetLimitN({n:100}, function(err2, workouts) {
             if(err2) {
                res.send(500, err2.message);
             }
             else {
                res.render('encyclopediaindex',
                   {
                      title: 'Encyclopedia Index',
                      exercises: exercises,
                      workouts: workouts,
                      err: err
                   });
             }
          })
       }

  });
};

exports.myfavorites = function(req, res){
	userId = req.session.user.id;
	data.exercisesGetByUserFav( {userId: userId},function afterGet(err, exercises){
      if(err) {
         res.send(500, err.message);
      }
      else {
         res.render('myfavorites',
            {
               title: 'My Favorites',
               exercises: exercises,
               workouts: [],
               err: err
            });
//         data.workoutsGetByUserFav( {userId: userId},function(err2, workouts){
//            if(err2) {
//               res.send(500, err2.message);
//            }
//            else {
//               res.render('myfavorites',
//                  {
//                     title: 'My Favorites',
//                     exercises: exercises,
//                     workouts: workouts,
//                     err: err
//                  });
//            }
//         });
      }

   });

}

/*
//{userId: number, exerciseId: number}
exports.userCreateFavExercise = user.createFavExercise;


exports.saveFavoriteExercise = function(req, res){

	userId = req.session.user.id;
	exerciseId = req.query.exerciseId;
	
	data.userCreateFavExercise( {userId: userId, exerciseId:  


};
*/


exports.findusers = function(req, res){

    data.usersGetLimitN({n: 10}, function(err, users) {
       if(err) {
          res.send(500, err.message);
       }
       else {
          res.render('findusers', {title: 'Find Users', users: users});
       }
    });
};

exports.workoutcreator = function(req, res){
   console.log('Executing workoutcreator');
   var flash = req.flash('editWorkout');
   if(flash.length !== 0) {
      console.log(JSON.parse(flash));
      var workout = JSON.parse(flash);
      res.render('create/workoutcreator', {
         title: 'Workout Creator',
         workout: workout
      });
   }
   else {
      res.render('create/workoutcreator', {
         title: 'Workout Creator',
         workout: undefined
      });
   }
};


exports.encyclopedia_workout_entry = function(req, res) {
   var wid = req.query.wid;
   data.workoutGetById({id: wid}, function(err, workout) {
      if(err)
         res.send(500, err.message);
      else if(workout.length === 0) {
         console.log('Empty results');
         res.send(500, 'No workout found for id ' + wid);
      }
      else {
         console.log(workout);
         res.render('encyclopedia/workoutentry', { workout: workout[0] });
      }
   })
}

exports.editWorkout = function(req, res) {
   console.log('Executing editWorkout');
   var wid = req.query.wid;
   console.log('Found eid ' + wid);
   data.workoutGetById({id: wid}, function(err, workout) {
      if(err) {
         console.log('err');
      }
      else if(workout.length === 0) {
         console.log('length 0');
      }
      else {
         res.render('create/editWorkout', {workout: workout[0]});
      }
   });
}

exports.saveWorkout = function(req, res) {

   console.log('Executing saveWorkout');
   var queWorkout = req.body;
   console.log(queWorkout);
   data.workoutInit({workout: queWorkout}, function(err, resWorkout) {
//   fakeDataSend({workout: queWorkout}, function(err, resWorkout) {
      if(err)
         res.send(500, err.message);
      else {
         var goTo = '/encyclopedia/workout_entry?wid=' + resWorkout.id;
         res.send(200, goTo);
      }
   });
};

function fakeDataSend(query, cb) {
   data.workoutGetById({id: query.workout.id}, function(err, workout) {
      cb(err, workout[0]);
   });
}

var pURL = 'http://i.imgur.com/gxtji6F.jpg';
var vURL = 'https://www.youtube.com/watch?v=JOCtdw9FG-s';
var fakeWorkout = new models.Workout(5, 'My workout', {name: 'Intermediate'}, 1, 'Description',
   [{url: pURL}],
   [{url: vURL},{url: vURL}],
   []);
