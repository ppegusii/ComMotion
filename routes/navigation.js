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
    res.render('encyclopediaindex',
      {
        title: 'Encyclopedia Index',
        exercises: exercises,
        err: err
      });
  });
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

    //data.searchByNameDescriptionMusclegroup()
     res.render('findusers', {title: 'Find Users'});
};

exports.workoutcreator = function(req, res){

 res.render('create/workoutcreator', {title: 'Workout Creator'});

};


exports.encyclopedia_workout_entry = function(req, res) {
   var wid = req.query.wid;
   // fake workout object
   if(parseInt(wid) === 5)
      res.render('encyclopedia/workoutentry', fakeWorkout);
   else
      res.send(500, 'Couldnt find workout');
}

exports.editWorkout = function(req, res) {
   console.log('Executing editWorkout');
   var wid = req.query.wid;
   console.log('Found eid ' + wid);
   /*
   data.exerciseGetById({id: eid}, function(err, exercise) {
      if(err) {
         console.log(err.message);
         res.send(500, err.message);
      }
      else {
         //console.log('Sending exercise ' + JSON.stringify(exercise[0]));
         req.flash('editExercise', JSON.stringify(exercise[0]));
         res.redirect('/create/exercise');
      }
   });
   */
   req.flash('editWorkout', JSON.stringify(fakeWorkout));
   res.redirect('/create/workoutcreator');

}

var fakeWorkout = new models.Workout(5, 'My workout', undefined, 'Description', {name: 'Advanced'}, 'http://i.imgur.com/VSxZ1KI.jpg');

//exports.encyclopedia_exercise_entry = function(req, res) {
//   var eid = req.query.eid;
//   data.exerciseGetById({id: eid}, function(err, exercise) {
//      if(err) {
//         console.log(err.message);
//         res.send(500, err.message);
//      }
//      else if(exercise.length === 0) {
//         console.log('Empty results');
//         res.send(500, 'No exercise found for id ' + eid);
//      }
//      else {
//         console.log(exercise);
//         res.render('encyclopedia/exerciseentry', exercise[0]);
//      }
//   });
//}