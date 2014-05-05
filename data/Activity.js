var async = require('async');

var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getAll = getAll;
exports.getByUserId = getByUserId;

//internal
exports.deleteUserActivityByUserId = deleteUserActivityByUserId;
exports.createUserActivityByUserIdActivityId = createUserActivityByUserIdActivityId;

function getAll(query,cb){
  conn.query('SELECT * FROM activities',[],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToActivities(result,cb);
  });
}
function getByUserId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('SELECT a.id,a.name FROM activities AS a, user_activities AS ua WHERE ua.activity_id=a.id AND ua.user_id=$1',[uid],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToActivities(result,cb);
  });
}
function resultToActivities(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    return new model.Activity(row.id.toString(),row.name);
  }));
}
function createUserActivityByUserIdActivityId(query,cb){
  var uid = parseInt(query.userId,10);
  if(isNaN(uid) || uid<=0){
    return cb(Error.create('query.userId undefined or invalid'),undefined);
  }
  var aid = parseInt(query.activityId,10);
  if(isNaN(aid) || aid<=0){
    return cb(Error.create('query.activityId undefined or invalid'),undefined);
  }
  conn.query('INSERT INTO user_activities (activity_id,user_id) VALUES($1,$2) RETURNING id',[aid,uid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    cb(undefined,{id: result.rows[0].id});
  });
}
function deleteUserActivityByUserId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('DELETE FROM user_activities WHERE user_id=$1',[uid],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    cb(undefined,{rowCount: result.rowCount});
  });
}
