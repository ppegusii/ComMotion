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
   if(username !== 'dorianYates' || pass !== 'commotion') {
      cb({ message: 'Please enter "dorianYates" for username and "commotion" for password' }, undefined);
      return;
   }

   var user = {
      username: username,
      //password: pass,
      id: undefined
   };

   data.userIdGetByUsername({username: username, password: pass}, function (err, id){
      if(err) {
         cb(err, undefined);
      }
      else {
         console.log("ID: " + id.id);

         user.id = id.id;
         console.log("USERID: " + user.id);

         req.session.user = user;
         console.log(user);
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
     res.render('myfavorites', {title: 'My favorites'});
};

exports.findusers = function(req, res){
     res.render('findusers', {title: 'Find Users'});
};

exports.createExercise = function(req, res) {
   console.log('Executing createExercise');
   var flash = req.flash('editExercise');
   console.log(flash);
   if(flash.length !== 0) {
      var exercise = JSON.parse(flash);
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
   getExerciseEntry(eid, function(err, exercise) {
      if(err) {
         console.log('Error');
         res.send(500, 'Exercise not found for eid ' + eid);
      }
      else {
         console.log('Sending exercise ' + JSON.stringify(exercise));
         req.flash('editExercise', JSON.stringify(exercise));
         res.redirect('/create/exercise');
      }
   });
}

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};

function toDifficulty(difficulty) {
    return new models.Difficulty(1, difficulty);
}

function toMusclegroup(musclegroup) {
    return new models.Musclegroup(1, musclegroup);
}

exports.saveexercise = function(req, res) {

  var newExercise = {
      names: [req.body.name],
      difficulty: toDifficulty(req.body.difficulty),
      description: req.body.description,
      musclegroup: toMusclegroup(req.body.musclegroup),
      photos: [req.body.media],
      videos: []
  };
//  data.exerciseInit({exercise: newExercise},function afterSave(err,exercise){
//    if(err){
//      console.log(Error.toJson(err));
//      /*
//      req.flash('saveexercise',err.message);
//      //not sure how I should alter the err parameter below
//      res.redirect('/create/exercise?err=badNameOrBody');
//      return;
//      */
//      res.send(400, err.message);
//    }
//    else {
//       var goTo = '/encyclopedia/exercise_entry?eid=' + exercise.id;
//       res.send(200, goTo);
//    }
//  });
   var err = false;
   if(req.body.description === 'error')
      err = true;
   if(err) {
      res.send(400, 'Error message');
   }
   else {
      var goTo = '/encyclopedia/exercise_entry?eid=' + '5';
      res.send(200, goTo);
   }
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
     getExerciseEntry(eid, function(err, exercise) {
         if(err) {
             console.log('Couldnt find exercise ' + eid);
             res.send(404, 'Exercise not found');
         }
         else {
             res.render('encyclopedia/exerciseentry', exercise);
         }
     });
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
   if(parseInt(exerciseId) === 5) {
       var data = new models.Exercise(
           5,
           'The id of this exercise is ' + exerciseId,
           { id: 3, name: 'Advanced'},
           { id: 3, name: 'Lower body'},
           undefined,
           ['A name'],
           undefined,
           ['http://i.imgur.com/VvbSZ7x.jpg',
               'http://i.imgur.com/VvbSZ7x.jpg',
               'http://i.imgur.com/VvbSZ7x.jpg']
       );
       cb(undefined, data);
   }
   else {
       cb('Could not find exercise with id ' + exerciseId, undefined);
   }

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
