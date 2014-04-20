var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getAll = getAll;
exports.getByUserId = getByUserId;

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
  conn.query('SELECT a.id,a.name FROM activities AS a, user_activities AS ua WHERE ua.user_id=$1',[uid],function(err,result){
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
