
/*
 * GET users listing.
 */

exports.landing = function(req, res){
   res.render('starter/landing', {
      title: 'Landing',
      err: req.flash('login')
   });
};


exports.signup = function(req, res){
  res.render('starter/signup', {title: 'Sign Up'});
};


exports.createprofile = function(req, res){
  res.render('starter/createprofile', {title: 'Create Profile'});
};

