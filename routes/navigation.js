
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



exports.profile_edit = function(req, res){
   res.render('profile/editprofile', {title: 'Edit Profile'});
};

exports.profile_about = function(req, res){
      res.render('profile/about', {title: 'Profile About'});
};

exports.profile_posts = function(req, res){
      res.render('profile/myposts', {title: 'Profile Posts'});
};

exports.profile_creations = function(req, res){
     res.render('profile/mycreations', {title: 'Profile Creations'});
};

exports.profile_followers = function(req, res){
     res.render('profile/followers', {title: 'Profile Followers'});
};

exports.profile_following = function(req, res){
     res.render('profile/following', {title: 'Profile Following'});
};

exports.encyclopedia_results = function(req, res){
     res.render('encyclopediaresults', {title: 'Encyclopedia Results'});
};

exports.user_search_results = function(req, res){
     res.render('usersearchresults', {title: 'User Results'});
};

exports.exercise = function(req, res){
     // res.render('create/exercise', {
     //    title: 'Exercise',
     //    err: req.flash('saveexercise'),
     // });
     //req.flash('exercise', 'flash! aaa-ah!');
     var eid = req.query.eid;
     // if accessing exercise creation from Create page, go to blank Create page
     if(!eid) {
         console.log('No eid found');
         res.render('create/exercise', {
             title: 'Exercise',
             err: req.flash('saveexercise'),
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
                     err: undefined,
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
exports.get_exwork=function(req,res){
//query database and populate exwork with an array of exercises/workouts
};
exports.get_users=function(req,res){
    //query database and populate users with an array of users
};
exports.saveexercise = function(req, res) {

  var newExercise = {
      names: [req.body.name],
      difficulty: toDifficulty(req.body.difficulty),
      description: req.body.description,
      musclegroup: toMusclegroup(req.body.musclegroup),
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
           { id: 2, name: 'Lower body'},
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
