var exercise = require('../data/Exercise.js');
var models = require('../models/index.js');

exports.home = function(req, res){
   //res.sendfile('./public/home.html');
	 res.render('home', { title: 'Home' });
};

/*
exports.profile = function(req, res){
   res.render('profile', { title: 'Profile' });
};
*/

exports.create = function(req, res){
   res.render('create', {title: 'Create'});
};

exports.encyclopedia = function(req, res){
      res.render('encyclopedia', {title: 'Encyclopedia'});
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
     res.render('create/exercise', {title: 'Exercise'});
};

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};

exports.saveexercise = function(req, res) {
     var newExercise = new models.Exercise(
         undefined,
         req.body.description,
         req.body.musclegroup,
         undefined,
         [req.body.name],
         undefined,
         [req.body.media]
     );
//     exercise.validate(newExercise, function(err, exercise) {
//         if(err) {
//             //req.flash('saveexercise', err);
//             console.log(err);
//             res.redirect('/create/exercise?err');
//         }
//         else {
//             // add query
//             res.redirect('/encyclopedia/exercise_entry');
//         }
//     });
     res.redirect('create/exercise');
}

exports.cancelexercise = function(req, res) {
     res.redirect('/create');
}

exports.encyclopedia_exercise_entry = function(req, res) {
     var data = getExerciseEntry('Get exercise id');
     res.render('encyclopedia/exerciseentry', data);
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