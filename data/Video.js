var conn = require(process.env.DATA_CONN);
var common = require(process.env.DATA_COMMON);
var model = require(process.env.MODELS);
var validate = require(process.env.VALIDATE);

exports.getByEidWid = getByEidWid;
exports.init = init;

//internal only
exports.initNoValidate = initNoValidate;
exports.deleteByExerciseIdAndIdNotInSet = deleteByExerciseIdAndIdNotInSet;

function getByEidWid(query,cb){
  var eid = parseInt(query.eid,10);
  var wid = parseInt(query.wid,10);
  if((eid>0 && wid>0) || (eid<=0 && wid<=0)){
    cb(Error.create('define query.eid xor query.wid'),undefined);
    return;
  }
  if(eid){
    var statement = 'SELECT * FROM videos WHERE exercise_id=$1';
    var id = eid;
  }else{
    var statement = 'SELECT * FROM videos WHERE workout_id=$1';
    var id = wid;
  }
  conn.query(statement,[id],function(err,result){
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
function init(query,cb){
  if(!query.video){
    return cb(Error.create('query.video undefined'),undefined);
  }
  validate.video(query.video,function afterValidation(err,video){
    if(err){
      return cb(err,undefined);
    }
    initNoValidate(video,cb);
  });
}
function initNoValidate(video,cb){
  if(video.id){
    var statement = 'UPDATE videos SET url=$1,exercise_id=$2,workout_id=$3 WHERE id=$4 RETURNING id';
    var params = [
      video.url,
      video.exerciseId,
      video.workoutId,
      video.id
    ];
  }else{
    var statement = 'INSERT INTO videos (url,exercise_id,workout_id) VALUES($1,$2,$3) RETURNING id';
    var params = [
      video.url,
      video.exerciseId,
      video.workoutId,
    ];
  }
  conn.query(statement,params,function afterUpdateOrInsert(err,result){
    if(err){
      return cb(err,undefined);
    }
    video.id = result.rows[0].id.toString();
    cb(undefined,video);
  });
}
function deleteByExerciseIdAndIdNotInSet(query,cb){
  var table = 'videos';
  common.deleteByExerciseIdAndIdNotInSet(query,table,cb);
}
