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
    var statement = 'SELECT * FROM photos WHERE exercise_id=$1';
  }else{
    var statement = 'SELECT * FROM photos WHERE workout_id=$1';
  }
  conn.query(statement,[eid],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      resultToPhotos(result,cb);
    }
  });
}
function resultToPhotos(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    return new model.Photo(row.id,row.url,row.exercise_id,row.workout_id);
  }));
}
function init(query,cb){
  if(!query.photo){
    cb(Error.create('query.photo undefined'),undefined);
    return;
  }
  validate.photo(query.photo,function afterValidation(err,photo){
    if(err){
      cb(err,undefined);
      return;
    }
    initNoValidate(photo,cb);
  });
}
function initNoValidate(photo,cb){
    if(photo.id){
      var statement = 'UPDATE photos SET url=$1,exercise_id=$2,workout_id=$3 WHERE id=$4 RETURNING id';
      var params = [
        photo.url,
        photo.exerciseId,
        photo.workoutId,
        photo.id
      ];
    }else{
      var statement = 'INSERT INTO photos (url,exercise_id,workout_id) VALUES($1,$2,$3) RETURNING id';
      var params = [
        photo.url,
        photo.exerciseId,
        photo.workoutId,
      ];
    }
    conn.query(statement,params,function afterUpdateOrInsert(err,result){
      if(err){
        cb(err,undefined);
        return;
      }
      photo.id = result.rows[0].id.toString();
      cb(undefined,photo);
    });
}
function deleteByExerciseIdAndIdNotInSet(query,cb){
  var table = 'photos';
  common.deleteByExerciseIdAndIdNotInSet(query,table,cb);
}
