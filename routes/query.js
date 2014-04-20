var data = require(process.env.DATA);

exports.query = query;

var queries = Array();
queries['exercisesGetLimitN'] = data.exercisesGetLimitN;
queries['exerciseGetById'] = data.exerciseGetById;
queries['exerciseInit'] = data.exerciseInit;
queries['exercisesGetByUserFav'] = data.exercisesGetByUserFav;
queries['difficultyGetById'] = data.difficultyGetById;
queries['musclegroupGetById'] = data.musclegroupGetById;
queries['namesGetByEidWid'] = data.namesGetByEidWid;
queries['videosGetByEidWid'] = data.videosGetByEidWid;
queries['photosGetByEidWid'] = data.photosGetByEidWid;
queries['usersGetLimitN'] = data.usersGetLimitN;
queries['userGetById'] = data.userGetById;
queries['userIdGetByUsername'] = data.userIdGetByUsername;
queries['followedUserIdsGetByFollowingUserId'] = data.followedUserIdsGetByFollowingUserId;
queries['followingUserIdsGetByFollowedUserId'] = data.followingUserIdsGetByFollowedUserId;
queries['activitiesGetAll'] = data.activitiesGetAll;
queries['activitiesGetByUserId'] = data.activitiesGetByUserId;

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
