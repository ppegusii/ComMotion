var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getByEidWid = getByEidWid;
function getByEidWid(eid,wid,cb){
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
    return new model.Photo(row.id,row.filename,row.exercise_id,row.workout_id);
  }));
}
