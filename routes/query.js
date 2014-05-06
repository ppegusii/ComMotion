var data = require(process.env.DATA);

exports.query = query;

var queries = Array();
queries['exercisesGetLimitN'] = data.exercisesGetLimitN;
queries['exerciseGetById'] = data.exerciseGetById;
queries['exerciseInit'] = data.exerciseInit;
queries['exercisesGetByUserFav'] = data.exercisesGetByUserFav;
queries['exercisesSearchByNameDescriptionMusclegroup'] = data.exercisesSearchByNameDescriptionMusclegroup;
queries['exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId'] = data.exerciseWorkoutsSearchByNameDescriptionFilterByDifficultyId;
queries['difficultyGetById'] = data.difficultyGetById;
queries['musclegroupGetById'] = data.musclegroupGetById;
queries['namesGetByEidWid'] = data.namesGetByEidWid;
queries['videosGetByEidWid'] = data.videosGetByEidWid;
queries['photosGetByEidWid'] = data.photosGetByEidWid;
queries['usersGetLimitN'] = data.usersGetLimitN;
queries['userGetById'] = data.userGetById;
queries['usersSearchByUsername'] = data.usersSearchByUsername;
queries['userGetByUsernamePassword'] = data.userGetByUsernamePassword;
queries['userIdGetByUsername'] = data.userIdGetByUsername;
queries['userCreate'] = data.userCreate;
queries['userUpdateProfile'] = data.userUpdateProfile;
queries['userCreateFavExercise'] = data.userCreateFavExercise;
queries['followedUserIdsGetByFollowingUserId'] = data.followedUserIdsGetByFollowingUserId;
queries['followingUserIdsGetByFollowedUserId'] = data.followingUserIdsGetByFollowedUserId;
queries['followCreateByUserIdFollowerId'] = data.followCreateByUserIdFollowerId;
queries['followDeleteByUserIdFollowerId'] = data.followDeleteByUserIdFollowerId;
queries['favExerciseDeleteByUserIdExerciseId'] = data.favExerciseDeleteByUserIdExerciseId;
queries['activitiesGetAll'] = data.activitiesGetAll;
queries['activitiesGetByUserId'] = data.activitiesGetByUserId;
queries['postsGetByUserId'] = data.postsGetByUserId;
queries['postsOfFollowedUsersGetByFollowingUserId'] = data.postsOfFollowedUsersGetByFollowingUserId;
queries['postInit'] = data.postInit;
queries['measurementsGetAll'] = data.measurementsGetAll;
queries['measurementGetById'] = data.measurementGetById;
queries['timerGetById'] = data.timerGetById;
queries['timersGetByWorkoutId'] = data.timersGetByWorkoutId;
queries['exerciseInstanceGetById'] = data.exerciseInstanceGetById;
queries['exerciseInstancesGetByWorkoutId'] = data.exerciseInstancesGetByWorkoutId;
queries['workoutGetById'] = data.workoutGetById;
queries['workoutsGetLimitN'] = data.workoutsGetLimitN;

function query(req,res){
//console.log('body = '+JSON.stringify(req.body));
	if(queries[req.body.query]===undefined){
		var err = Error.create('req.body.query undefined');
    console.log(Error.toJson(err));
		res.send(err);
		return;
	}
  queries[req.body.query](req.body,function(err,results){
		if(err){
      console.log(Error.toJson(err));
			res.send(err);
		}
		else{
//console.log('results = '+JSON.stringify(results));
			res.contentType('application/json');
			res.send(results);
		}
	});
}
