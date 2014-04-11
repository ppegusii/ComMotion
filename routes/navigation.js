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
     res.render('create/exercise', {title: 'Exercise'});
};

exports.workoutcreator = function(req, res){
     res.render('create/workoutcreator', {title: 'Workout Creator'});
};
