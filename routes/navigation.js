var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

/*
var blankExercise = new models.Exercise(
undefined,
'',
new models.musclegroup(
undefined,
''
),
undefined,
[new models.name(
undefined,
'',
0,
undefined,
undefined
)],
[new models.Video(
undefined,
'',
undefined,
undefined
)],
[new models.Photo(
undefined,
'',
undefined,
undefined
)]
);
*/

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
}

function setSessionForUser(username, pass, req, cb) {
   // dummy stuff; delete when database stuff is complete
//   if(username !== 'dorianYates' || pass !== 'commotion') {
//      cb({ message: 'Please enter "dorianYates" for username and "commotion" for password' }, undefined);
//      return;
//   }

//   var user = {
//      username: username,
//      //password: pass,
//      id: undefined
//   };

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
     res.render('findusers', {title: 'Find Users'});
};

exports.createExercise = function(req, res) {
   console.log('Executing createExercise');
   var flash = req.flash('editExercise');
   //console.log(flash);
   if(flash.length !== 0) {
      var exercise = JSON.parse(flash);
      console.log(exercise);
      console.log(exercise.names);
      res.render('create/exercise', {
         title: 'Edit exercise',
         exercise: exercise
      });
   }
   else {
      res.render('create/exercise', {
         title: 'Create exercise',
         exercise: undefined
      });
   }
}

exports.editExercise = function(req, res) {
   console.log('Executing editExercise');
   var eid = req.query.eid;
   console.log('Found eid ' + eid);
   data.exerciseGetById({id: eid}, function(err, exercise) {
      if(err) {
         console.log(err.message);
         res.send(500, err.message);
      }
      else {
         console.log('Sending exercise ' + JSON.stringify(exercise[0]));
         req.flash('editExercise', JSON.stringify(exercise[0]));
         res.redirect('/create/exercise');
      }
   });
}

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};

function toDifficulty(difficulty) {
   var did = -1;
   if(difficulty === 'Beginner')
      did = 1;
   if(difficulty === 'Intermediate')
      did = 2;
   if(difficulty === 'Advanced')
      did = 3;
   return new models.Difficulty(did, difficulty);
}

function toMusclegroup(musclegroup) {
   var mid = -1;
   if(musclegroup === 'Whole body')
      mid = 1;
   if(musclegroup === 'Upper body')
      mid = 2;
   if(musclegroup === 'Lower body')
      mid = 3;
   if(musclegroup === 'Core')
      mid = 4;
   return new models.Difficulty(mid, musclegroup);
}

// Convert string array to names array
function toNames(namesArray) {
   var ret = Array();
   for(var i = 0; i < namesArray.length; i++) {
      var nameObj = new models.Name(undefined, namesArray[i], undefined, undefined, undefined);
      ret.push(nameObj);
   }
   return ret;
}

function toPhotos(photosArray) {
   var ret = Array();
   for(var i = 0; i < photosArray.length; i++) {
      var photoObj = new models.Photo(undefined, photosArray[i], undefined, undefined);
      ret.push(photoObj);
   }
   return ret;
}

function toVideos(videosArray) {
   var ret = Array();
   for(var i = 0; i < videosArray.length; i++) {
      var videoObj = new models.Video(undefined, videosArray[i], undefined, undefined);
      ret.push(videoObj);
   }
   return ret;
}

exports.saveexercise = function(req, res) {

   var queExercise = {
       names: toNames(req.body.names),
       difficulty: toDifficulty(req.body.difficulty),
       description: req.body.description,
       musclegroup: toMusclegroup(req.body.musclegroup),
       photos: toPhotos(req.body.photos),
       videos: []
   };
   console.log(queExercise);
   data.exerciseInit({exercise: queExercise}, function(err, resExercise) {
      if(err)
         res.send(500, err.message);
      else {
         var goTo = '/encyclopedia/exercise_entry?eid=' + resExercise.id;
         res.send(200, goTo);
      }
   })
//   var err = false;
//   if(req.body.description === 'error')
//      err = true;
//   if(err) {
//      res.send(400, 'Error message');
//   }
//   else {
//      var goTo = '/encyclopedia/exercise_entry?eid=' + '5';
//      res.send(200, goTo);
//   }
};

exports.cancelexercise = function(req, res) {
     var eid = req.query.eid;
     if(eid)
        res.redirect('/encyclopedia/exercise_entry?eid=' + eid);
     else
        res.redirect('/create');
}

exports.encyclopedia_exercise_entry = function(req, res) {
   var eid = req.query.eid;
   console.log('eid = ' + eid);
   data.exerciseGetById({id: eid}, function(err, exercise) {
      if(err) {
         console.log(err.message);
         res.send(500, err.message);
      }
      else {
         res.render('encyclopedia/exerciseentry', exercise[0]);
      }
   });
//     getExerciseEntry(eid, function(err, exercise) {
//         if(err) {
//             console.log(err.message);
//             res.send(404, err.message);
//         }
//         else {
//             res.render('encyclopedia/exerciseentry', exercise);
//         }
//     });
}

exports.encyclopedia_workout_entry = function(req, res) {
     var data = getWorkoutEntry('Get workout id');
     res.render('encyclopedia/workoutentry', data);
}

// Adds exercise to database
function addExercise(data) {

}

// Checks for proper media format (ie. ends in .jpg, .jpeg, .png or includes "youtube.com/watch?v=")
function mediaProperFormat(mediaURL) {
   var threeCharEnd = mediaURL.substring(mediaURL.length-3, mediaURL.length);
   if(threeCharEnd === 'jpg' || threeCharEnd === 'png')
      return true;
   var fourCharEnd = mediaURL.substring(mediaURL.length-4, mediaURL.length);
   if(fourCharEnd === 'jpeg')
      return true;
   if(mediaURL.indexOf('youtube.com/watch?v=') !== -1)
      return true;
   return false;
}

function getExerciseEntry(exerciseId, cb) {
   // dummy stuff
//   if(parseInt(exerciseId) === 5) {
//       var data = new models.Exercise(
//           5,
//           'The id of this exercise is ' + exerciseId,
//           { id: 3, name: 'Advanced'},
//           { id: 3, name: 'Lower body'},
//           undefined,
//           ['A name'],
//           undefined,
//           ['http://i.imgur.com/VvbSZ7x.jpg',
//               'http://i.imgur.com/VvbSZ7x.jpg',
//               'http://i.imgur.com/VvbSZ7x.jpg']
//       );
//       cb(undefined, data);
//   }
//   else {
//       cb('Could not find exercise with id ' + exerciseId, undefined);
//   }
}

function getWorkoutEntry(workoutId) {
   var data = {
      title: 'Workout entry',
      entryName: 'My favorite workout',
      difficulty: 'Beginner',
      description: 'This is my description',
      workout: 'A workout...',
      media: [
        'http://i.imgur.com/VvbSZ7x.jpg',
        'http://i.imgur.com/VvbSZ7x.jpg',
        'http://i.imgur.com/VvbSZ7x.jpg'
      ]
   };
   return data;
}
