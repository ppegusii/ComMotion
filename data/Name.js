var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getByEidWid= getByEidWid;
function getByEidWid(query,cb){
  var eid = parseInt(query.eid,10);
  var wid = parseInt(query.wid,10);
  if((eid>0 && wid>0) || (eid<=0 && wid<=0)){
    cb('define eid xor wid',undefined);
    return;
  }
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
