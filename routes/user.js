
/*
 * GET users listing.
 */

exports.landing = function(req, res){
   if(!req.session.user)
      res.render('starter/landing', {title: 'Landing'});
   else
      res.redirect('/home');
};


exports.signup = function(req, res){
  res.render('starter/signup', {title: 'Sign Up'});
};


exports.createprofile = function(req, res){
  res.render('starter/createprofile', {title: 'Create Profile'});
};

