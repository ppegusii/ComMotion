var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');
var data = require(process.env.DATA);

exports.home = function(req, res){
	 res.render('home', { title: 'Home' });
};

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
     // res.render('create/exercise', {
     //    title: 'Exercise',
     //    err: req.flash('saveexercise'),
     // });
     //req.flash('exercise', 'flash! aaa-ah!');
     res.render('create/exercise', {
         title: 'Exercise',
         err: req.flash('saveexercise')
     });
};

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};

exports.saveexercise = function(req, res) {

  var newExercise = {
      names: [req.body.name],
      difficulty: req.body.difficulty,
      description: req.body.description,
      musclegroup: req.body.musclegroup,
      photos: [req.body.media],
      videos: []
  };
  data.exerciseInit({exercise: newExercise},function afterSave(err,exercise){
    if(err){
      console.log(Error.toJson(err));
      req.flash('saveexercise',err.message);
      //not sure how I should alter the err parameter below
      res.redirect('/create/exercise?err=badNameOrBody');
      return;
    }
    console.log('saveexercise exercise = '+JSON.stringify(exercise));
    req.flash('exercise',exercise);
    //make this route check flash?
    res.redirect('/encyclopedia/exercise_entry?eid=' + exercise.id);
  });
};

exports.cancelexercise = function(req, res) {
     res.redirect('/create');
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

function getExerciseEntry(exerciseId) {
   var data = {
      title: 'Exercise entry',
      entryName: 'Bicycle crunches',
      difficulty: 'Beginner',
      description: 'This is my description',
      musclegroup: 'Upper body',
      media: [
        'http://i.imgur.com/VvbSZ7x.jpg',
        'http://i.imgur.com/VvbSZ7x.jpg',
        'http://i.imgur.com/VvbSZ7x.jpg'
      ]
   };
   return data;
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
