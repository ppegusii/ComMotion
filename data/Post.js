var validate = require(process.env.VALIDATE);
var model = require(process.env.MODELS);

var conn = require(process.env.DATA_CONN);

exports.getByUserId = getByUserId;
exports.getPostsOfFollowedUsersByFollowingUserId = getPostsOfFollowedUsersByFollowingUserId;

function getByUserId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('SELECT id,user_id,text,created FROM posts WHERE user_id=$1 ORDER BY created DESC',[uid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return resultToPosts(result,cb);
  });
}
function getPostsOfFollowedUsersByFollowingUserId(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  conn.query('SELECT p.id,p.user_id,p.text,p.created FROM posts AS p,followers AS f WHERE f.follower_id=$1 AND f.user_id=p.user_id ORDER BY created DESC',[uid],function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    return resultToPosts(result,cb);
  });
}
function resultToPosts(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    //TODO make created a date object fix in Exercise as well
    return new model.Post(row.id,row.user_id,row.text,row.created);
  }));
}
