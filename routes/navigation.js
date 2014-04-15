var data = require(process.env.DATA);

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
     res.render('create/exercise', {title: 'Exercise'});
};

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};

exports.saveexercise = function(req, res) {
  //assuming req.body is an exercise object
  data.exerciseInit({exercise: req.body},function afterSave(err,exercise){
    if(err){
console.log('saveexercis err = '+err);
      req.flash('saveexercise',err);
      //not sure how I should alter the err parameter below
      res.redirect('/create/exercise?err=badNameOrDesc');
      return;
    }
console.log('saveexercise exercise = '+JSON.stringify(exercise));
    req.flash('exercise',exercise);
    //make this route check flash?
    res.redirect('/encyclopedia/exercise_entry');
  });
  /*
     var data = {
        name: req.body.name,
        difficulty: req.body.difficulty,
        description: req.body.description,
        musclegroup: req.body.musclegroup,
        media: req.body.media
     };
     console.log(data);
     console.log(mediaProperFormat(data.media));
     // handle errors
     if(data.name === "" || data.description === "") {
        // flash error
        //req.flash('saveexercise', 'Must provide name and description');
        res.redirect('/create/exercise?err=badNameOrDesc');
     }
     else if(data.media !== "" && !mediaProperFormat(data.media)) {
        // flash error
        //req.flash('saveexercise', 'Media URL format is incorrect. Please use ' +
        //  'a Youtube URL or an image with a .jpg, .jpeg, or .png extension');
        res.redirect('/create/exercise?err=badMedia');
     }
     else {
        // add exercise to database
        addExercise(data);
        // redirect to created entry
        res.redirect('/encyclopedia/exercise_entry');
     }
     */
};

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
