var data = require(process.env.DATA);

exports.profile_about_reset = function(req, res){
	userId = req.session.user.id;
	req.session.userContextID = userId;
	userContextId = userId;

	otherUserId = req.param("otherUserId");

	var activities
	data.activitiesGetByUserId({id: userContextId}, function aftergetActivities(err, retActivities){
	activities = retActivities;
	});

	data.userGetById( {id: userContextId},function afterGet(err, user){
    res.render('profile/about',
      {
        title: 'Profile About',
        user: user,
		myId: userId,
		activities: activities,
        err: err
      });
  });
};

exports.profile_about = function(req, res){
	userId = req.session.user.id;
	userContextId = req.session.userContextID;

	otherUserId = req.param("otherUserId");

	var activities
	data.activitiesGetByUserId({id: userContextId}, function aftergetActivities(err, retActivities){
	activities = retActivities;
	});

	data.userGetById( {id: userContextId},function afterGet(err, user){
    res.render('profile/about',
      {
        title: 'Profile About',
        user: user,
		activities: activities,
		myId: userId,
        err: err
      });
  });
};


exports.other_user_profile_about = function(req, res){
	myId = req.session.user.id;
	req.session.userContextID = req.param("currentUser");
	userContextId = req.session.userContextID;
	userId = req.param("currentUser");
    var activities;
	data.activitiesGetByUserId({id: userContextId}, function aftergetActivities(err, retActivities){
	activities = retActivities;
	});

	data.userGetById( {id: userContextId},function afterGet(err, user){
	console.log(userId);
	
    res.render('profile/about',
      {
        title: 'Profile About',
        user: user,
		activities: activities,
		myId: myId,
        err: err
      });
  });
};

exports.profile_posts = function(req, res){
	userId = req.session.user.id;
	userContextId = req.session.userContextID;

   console.log("USER CONTEXT ID: "+ userContextId);

	data.postsGetByUserId( {userId: userContextId}, function afterGet(err, posts){

	data.userGetById( {id: userContextId},function afterGet2(err, user){
    res.render('profile/myposts',
      {
        title: 'Profile Posts',
        user: user,
		myId: userId,
		posts: posts,
        err: err
      });
  });

	});
};

exports.profile_creations = function(req, res){
	userId = req.session.user.id;
	userContextId = req.session.userContextID;

	data.userGetById( {id: userContextId},function afterGet(err, user){
    res.render('profile/mycreations',
      {
        title: 'Profile Creations',
        user: user,
		myId: userId,
        err: err
      });
  });
     
};

exports.profile_followers = function(req, res){

	userContextId = req.session.userContextID;
	userId = req.session.user.id;

	data.userGetById( {id: userContextId},function afterGet(err, user){

		data.usergetFollowersUsernameAndAvatars({userId: userContextId}, function afterGet2(err, followers){

		res.render('profile/followers',
   	   {
        title: 'Profile Followers',
        user: user,
		followers: followers,
		myId: userId,
        err: err
     	 });
		});

  });

};

exports.profile_following = function (req, res){
	userId = req.session.user.id;
	userContextId = req.session.userContextID;

	data.userGetById( {id: userContextId},function afterGet(err, user){
		console.log("USER: " + user);
		data.usergetFollowingUsernameAndAvatars({userId: userContextId}, function afterGet2(err, follows){
			console.log("FOLLOWS: " + follows);
			res.render('profile/following',
			  {
				title: 'Profile Following',
				user: user,
				follows: follows,
				myId: userId,
				err: err
			  });

		});
  });

};
