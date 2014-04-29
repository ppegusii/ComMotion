var conn = require(process.env.DATA_CONN);
var validate = require(process.env.VALIDATE);
var model = require(process.env.MODELS);

exports.getByUserId = getByUserId;
exports.getPostsOfFollowedUsersByFollowingUserId = getPostsOfFollowedUsersByFollowingUserId;
exports.init = init;

//internal only
exports.initNoValidate = initNoValidate;

function getByUserId(query,cb){
  console.log("QUERY: " + query.userId);
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    return cb(Error.create('query.userId invalid'),undefined);
  }
  console.log("UID: " + uid);
  conn.query('SELECT id,user_id,text,created FROM posts WHERE user_id=$1 ORDER BY created DESC',[uid],function afterQuery(err,result){
    if(err){
		console.log("ERROR");
      return cb(err,undefined);
    }
	console.log("RESULT" + result);
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
function init(query,cb){
  if(!query.post){
    return cb(Error.create('query.post undefined'),undefined);
  }
  validate.post(query.post,function afterValidation(err,post){
    if(err){
      return cb(err,undefined);
    }
    initNoValidate(post,cb);
  });
}
function initNoValidate(post,cb){
  if(post.id){
    var statement = 'UPDATE posts SET text=$1 WHERE id=$2 RETURNING id,created';
    var params = [
      post.text,
      post.id
    ];
  }else{
    var statement = 'INSERT INTO posts (user_id,text) VALUES ($1,$2) RETURNING id,created';
    var params = [
      post.userId,
      post.text
    ];
  }
  conn.query(statement,params,function afterQuery(err,result){
    if(err){
      return cb(err,undefined);
    }
    post.id = result.rows[0].id.toString();
    post.created = result.rows[0].created;
    cb(undefined,post);
  });
}
function resultToPosts(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    //TODO make created a date object fix in Exercise as well
    return new model.Post(row.id,row.user_id,row.text,row.created);
  }));
}
