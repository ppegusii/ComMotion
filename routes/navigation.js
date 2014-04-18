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
         req.flash('login', err);
         res.redirect('/');
      }
      else {
         //console.log(req.session.user);
         res.redirect('home');
      }
   });
}

function setSessionForUser(user, pass, req, cb) {
   // dummy stuff
   if(user !== 'commotion' || pass !== 'commotion') {
      cb('Cannot find user', undefined);
   }
   else {
      var user = {
         username: 'commotion',
         id: 500
      };
      req.session.user = user;
      cb(undefined, user);
   }
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


exports.exercise = function(req, res){
     var fl = req.flash('saveexercise');
     var eid = req.query.eid;
     // if accessing exercise creation from Create page, go to blank Create page
     if(!eid) {
         console.log('No eid found');
         res.render('create/exercise', {
             title: 'Exercise',
             err : fl,
             exercise: undefined
         });
     }
     else {
         console.log('Found eid ' + eid);
         getExerciseEntry(eid, function(err, exercise) {
             if(err) {
                 console.log('Error');
                 res.send(500, 'Exercise not found for eid ' + eid);
             }
             else {
                 console.log('Populating text fields');
                 res.render('create/exercise', {
                     title: 'Exercise',
                     err: [],
                     exercise: exercise
                 });
             }
         });
     }

};

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
   //var err = {message: 'Borked'};
   var err = undefined;
   if(err) {
      res.send(400, err.message);
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
    /*
// get exercise info
var query = {
id: req.query.eid
};
data.exerciseInit(query, function(err, exercise) {
if(err) {
console.log(err);
res.redirect('/encyclopedia');
}
else {
res.render('/encyclopedia/exerciseentry', exercise);
}
});
*/
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
