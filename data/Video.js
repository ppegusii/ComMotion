var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getByEidWid = getByEidWid;
function getByEidWid(query,cb){
  var eid = parseInt(query.eid,10);
  var wid = parseInt(query.wid,10);
  if((eid>0 && wid>0) || (eid<=0 && wid<=0)){
    cb('define eid xor wid',undefined);
    return;
  }
  if(eid){
    var statement = 'SELECT * FROM videos WHERE exercise_id=$1';
  }else{
    var statement = 'SELECT * FROM videos WHERE workout_id=$1';
  }
  conn.query(statement,[eid],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      resultToVideos(result,cb);
    }
  });
}
function resultToVideos(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    return new model.Video(row.id,row.url,row.exercise_id,row.workout_id);
  }));
}
