var async = require('async');

var validate = require(process.env.VALIDATE);
var model = require(process.env.MODELS);

var conn = require(process.env.DATA_CONN);
var activity = require(process.env.DATA_ACTIVITY);
var exercise = require(process.env.DATA_EXERCISE);
var difficulty = require(process.env.DATA_DIFFICULTY);

exports.getLimitN = getLimitN;
exports.getById = getById;
exports.getFollowedUserIdsByFollowingUserId = getFollowedUserIdsByFollowingUserId;
exports.getFollowingUserIdsByFollowedUserId = getFollowingUserIdsByFollowedUserId;

function getLimitN(query,cb){
  var n = parseInt(query.n,10);
  if(n<=0){
    return cb(Error.create('query.n invalid'),undefined);
  }
  conn.query('SELECT u.id,u.username,u.password,u.difficulty_id,u.avatar_url,u.bio,d.name AS d_name FROM users AS u,difficulties AS d WHERE u.difficulty_id=d.id LIMIT $1',[n],function afterQuery(err,result){
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
  conn.query('SELECT u.id,u.username,u.password,u.difficulty_id,u.avatar_url,u.bio,d.name AS d_name FROM users AS u,difficulties AS d WHERE u.difficulty_id=d.id AND u.id=$1',[id],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    rowToUser(result.rows[0],cb);
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
      row.password,
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
