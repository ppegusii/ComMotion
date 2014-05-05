var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getById = getById;
exports.getByWorkoutId = getByWorkoutId;

function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    return cb(Error.create('query.id invalid'),undefined);
  }
  conn.query('SELECT wc.id,wc.workout_id,wc.seq_order AS order,t.seconds FROM workout_components AS wc, timers AS t WHERE wc.id=$1 AND wc.id=t.id',[id],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToTimers(result,cb);
  });
}
function getByWorkoutId(query,cb){
  var wid = parseInt(query.workoutId,10);
  if(wid<=0){
    return cb(Error.create('query.workoutId invalid'),undefined);
  }
  conn.query('SELECT wc.id,wc.workout_id,wc.seq_order AS order,t.seconds FROM workout_components AS wc, timers AS t WHERE wc.workout_id=$1 AND wc.id=t.id',[wid],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToTimers(result,cb);
  });
}
function resultToTimers(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    return new model.Timer(
      row.id.toString(),
      row.workout_id.toString(),
      parseInt(row.order,10),
      parseInt(row.seconds,10)
    );
  }));
}
