var async = require('async');

var validate = require(process.env.VALIDATE);
var model = require(process.env.MODELS);

var conn = require(process.env.DATA_CONN);
var activity = require(process.env.DATA_ACTIVITY);
var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);

exports.getLimitN = getLimitN;
exports.getById = getById;
exports.getByUsernamePassword = getByUsernamePassword;
exports.searchByUsername = searchByUsername;
exports.getIdByUsername = getIdByUsername;
exports.getFollowedUserIdsByFollowingUserId = getFollowedUserIdsByFollowingUserId;
exports.getFollowingUserIdsByFollowedUserId = getFollowingUserIdsByFollowedUserId;
exports.create = create;
exports.updateProfile = updateProfile;
exports.createFavExercise = createFavExercise;
exports.getFollowersUsernameAndAvatars = getFollowersUsernameAndAvatars;
exports.getFollowingUsernameAndAvatars = getFollowingUsernameAndAvatars;
exports.createFollowByUserIdFollowerId = createFollowByUserIdFollowerId;
exports.deleteFollowByUserIdFollowerId = deleteFollowByUserIdFollowerId;
exports.getUsernameAndAvatarsOfPosts = getUsernameAndAvatarsOfPosts;
exports.favExerciseDeleteByUserIdExerciseId = favExerciseDeleteByUserIdExerciseId;

function getLimitN(query,cb){
  var n = parseInt(query.n,10);
  if(n<=0){
    return cb(Error.create('query.n invalid'),undefined);
  }
  conn.query('SELECT u.id,u.username,u.difficulty_id,u.avatar_url,u.bio,d.name AS d_name FROM users AS u,difficulties AS d WHERE u.difficulty_id=d.id LIMIT $1',[n],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToUsers(result,cb);
  });
}
function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    return cb(Error.create('query.id invalid'),undefined);
  }
  conn.query('SELECT u.id,u.username,u.difficulty_id,u.avatar_url,u.bio,d.name AS d_name FROM users AS u,difficulties AS d WHERE u.difficulty_id=d.id AND u.id=$1',[id],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return resultToUsers(result,cb);
  });
}
function getByUsernamePassword(query,cb){
  if(!query.username || query.username===''){
    return cb(Error.create('query.username undefined or blank'),undefined);
  }
  if(!query.password || query.password===''){
    return cb(Error.create('query.password undefined or blank'),undefined);
  }
  conn.query('SELECT u.id,u.username,u.difficulty_id,u.avatar_url,u.bio,d.name AS d_name FROM users AS u,difficulties AS d WHERE u.difficulty_id=d.id AND u.username=$1 AND u.password=$2',[query.username,query.password],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return resultToUsers(result,cb);
  });
}
function getIdByUsername(query,cb){
  var un = query.username;
  if(!un){
    return cb(Error.create('query.username undefined'),undefined);
  }
  conn.query('SELECT id FROM users WHERE username=$1',[un],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(err,result.rows.map(function(row,index,rows){
      return row.id;
    }));
  });
}
function searchByUsername(query,cb){
  if(!query.search){
    return cb(Error.create('query.search undefined'),undefined);
  }
  query.search = '%'+query.search+'%';
  conn.query('SELECT DISTINCT u.id,u.username,u.difficulty_id,u.avatar_url,u.bio,d.name AS d_name FROM users AS u,difficulties AS d WHERE u.difficulty_id=d.id AND u.username LIKE $1',[query.search],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return resultToUsers(result,cb);
  });
}
function getFollowedUserIdsByFollowingUserId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('SELECT user_id FROM followers WHERE follower_id=$1',[uid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(err,result.rows);
  });
}
function getFollowingUserIdsByFollowedUserId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('SELECT follower_id FROM followers WHERE user_id=$1',[uid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(err,result.rows);
  });
}
function createFollowByUserIdFollowerId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  var fid = parseInt(query.followerId,10);
  if(fid<=0){
    return cb(Error.create('query.followerId invalid'),undefined);
  }
  if(uid===fid){
    return cb(Error.create('user cannot follow itself'),undefined);
  }
  conn.query('INSERT INTO followers (user_id,follower_id) VALUES($1,$2)',[uid,fid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(err,{rowCount: result.rowCount});
  });
}
function deleteFollowByUserIdFollowerId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  var fid = parseInt(query.followerId,10);
  if(fid<=0){
    return cb(Error.create('query.followerId invalid'),undefined);
  }
  if(uid===fid){
    return cb(Error.create('user does not follow itself'),undefined);
  }
  conn.query('DELETE FROM followers WHERE user_id=$1 AND follower_id=$2',[uid,fid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(err,{rowCount: result.rowCount});
  });
}
function createFavExercise(query,cb){
  uid = parseInt(query.userId,10);
  eid = parseInt(query.exerciseId,10);
  if(isNaN(eid) || eid<=0){
    return cb(Error.create('query.exerciseId invalid'),undefined);
  }
  if(isNaN(uid) || uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('INSERT INTO fav_exercises (user_id,exercise_id) VALUES ($1,$2);',[uid,eid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(undefined,result.rows);
  });
}
function favExerciseDeleteByUserIdExerciseId(query,cb){
  uid = parseInt(query.userId,10);
  eid = parseInt(query.exerciseId,10);
  if(isNaN(eid) || eid<=0){
    return cb(Error.create('query.exerciseId invalid'),undefined);
  }
  if(isNaN(uid) || uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('DELETE FROM fav_exercises WHERE user_id=$1 AND exercise_id=$2;',[uid,eid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return cb(undefined,{rowCount: result.rowCount});
  });
}
function resultToUsers(result,cb){
  async.map(result.rows,rowToUser,cb);
}
function rowToUser(row,cb){
  var uid = row.id;
  async.parallel({
    activities: function(callback){
      activity.getByUserId({userId: uid},callback);
    },
    fav_exercises: function(callback){
      exercise.getByUserFav({userId: uid},callback);
    },
    follows: function(callback){
      getFollowedUserIdsByFollowingUserId({userId: uid},callback);
    },
    followers: function(callback){
      getFollowingUserIdsByFollowedUserId({userId: uid},callback);
    }
  },function(err,results){
    if(err){
      return cb(err,undefined);
    }
    var user = new model.User(
      row.id.toString(),
      row.username,
      //row.password,
      undefined,
      new model.Difficulty(row.difficulty_id,row.d_name),
      row.avatar_url,
      row.bio,
      results.activities,
      results.fav_exercises,
      undefined,//holder for fav_workouts
      results.follows,
      results.followers
    );
    cb(undefined,user);
  });
}
function create(query,cb){
  if(!query.user){
    return cb(Error.create('query.user undefined'),undefined);
  }
  validate.user(query.user,function afterValidation(err,user){
    if(err){
      return cb(err,undefined);
    }
    var statement = 'INSERT INTO users (username,password,difficulty_id) VALUES ($1,$2,1) RETURNING id';
    var params = [
      query.user.username,
      query.user.password
    ];
    conn.query(statement,params,function afterQuery(err,result){
      if(err){
        return cb(err,undefined);
      }
      user.id = result.rows[0].id.toString();
      user.password = undefined;
      return cb(undefined,user);
    });
  });
}
function updateProfile(query,cb){
  if(!query.user){
    return cb(Error.create('query.user undefined'),undefined);
  }
  if(!query.user.id){
    return cb(Error.create('query.user.id undefined'),undefined);
  }
  validate.user(query.user,function afterValidation(err,user){
    if(err){
      return cb(err,undefined);
    }
    activity.deleteUserActivityByUserId({userId: user.id},function afterActivityDeletion(err,rowCount){
      if(err){
        return cb(err,undefined);
      }
      var statement = 'UPDATE users SET difficulty_id=$1,avatar_url=$2,bio=$3';
      var params = [
        user.difficulty.id,
        user.avatar_url,
        user.bio
      ];
      conn.query(statement,params,function afterQuery(err,result){
        if(err){
          return cb(err,undefined);
        }
        var uidAids = user.activities.map(function(activity,index,activities){
          return {userId: user.id,activityId: activity.id};
        });
        async.map(uidAids,activity.createUserActivityByUserIdActivityId,function afterActivityCreation(err,userActivityIds){
          if(err){
            return cb(err,undefined);
          }
          return cb(undefined,user);
        });
      });
    });
  });
}


function getFollowersUsernameAndAvatars(query,cb){
  var uid = query.userId

  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
	conn.query('SELECT id, username, avatar_url FROM users WHERE id IN (SELECT follower_id FROM followers WHERE user_id=$1)',[uid], function afterQuery(err, result){

    if(err){
      return cb(err,undefined);
    }

    return cb(undefined, result.rows);
  });
}


function getFollowingUsernameAndAvatars(query,cb){
  var uid = query.userId

  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
	conn.query('SELECT id, username, avatar_url FROM users WHERE id IN (SELECT user_id FROM followers WHERE follower_id=$1)',[uid], function afterQuery(err, result){
    if(err){
      return cb(err,undefined);
    }

    return cb(undefined, result.rows);
  });
}


function getUsernameAndAvatarsOfPosts(query,cb){
	var userId = query.userId;

  if(userId<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }

	conn.query('SELECT u.id,u.username, u.avatar_url FROM users AS u WHERE id in (SELECT p.user_id FROM posts AS p,followers AS f WHERE f.follower_id=$1 AND f.user_id=p.user_id ORDER BY created DESC)', [userId], function afterQuery(err,result){

    if(err){
      return cb(err,undefined);
    }
    return resultToUsers(result,cb);
  });

}


