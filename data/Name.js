var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getByEidWid= getByEidWid;
function getByEidWid(eid,wid,cb){
  if(eid){
    var statement = 'SELECT * FROM names WHERE exercise_id=$1 ORDER BY votes DESC';
  }else{
    var statement = 'SELECT * FROM names WHERE workout_id=$1 ORDER BY votes DESC';
  }
  conn.query(statement,[eid],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      resultToNames(result,cb);
    }
  });
}
function resultToNames(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    return new model.Name(row.id,row.name,row.votes,row.exercise_id,row.workout_id);
  }));
}
