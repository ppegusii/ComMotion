exports.home = function(req, res){
   //res.sendfile('./public/home.html');
	 res.render('home', { title: 'Home' });
};

exports.profile = function(req, res){
   res.render('profile', { title: 'Profile' });
};

exports.create = function(req, res){
   res.render('create', {title: 'Create'});
};

exports.workoutplayer = function(req, res){
      res.render('workoutplayer', {title: 'Workout Player'});
};

exports.encyclopedia = function(req, res){
      res.render('encyclopedia', {title: 'Encyclopedia'});
};

exports.workoutcreator = function(req, res){
     res.render('workoutcreator', {title: 'Workout Creator'});
};

exports.myfavorites = function(req, res){
     res.render('myfavorites', {title: 'My favorites'});
};
