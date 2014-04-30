var conn = require(process.env.DATA_CONN);

exports.deleteByExerciseIdAndIdNotInSet = deleteByExerciseIdAndIdNotInSet;

function deleteByExerciseIdAndIdNotInSet(query,statement,cb){
  var eid = parseInt(query.exerciseId,10);
  if(eid<=0){
    return cb(Error.create('query.exerciseId invalid'),undefined);
  }
  if(!query.set){
    return cb(Error.create('query.set undefined'),undefined);
  }
  var ids = [];
  for(var i=0; i<query.set.length; i++){
    var id = parseInt(query.set[i].id,10);
    if(id<=0){
      return cb(Error.create('query.set contains an invalid id'),undefined);
    }
    if(!isNaN(id)){
      ids.push(id);
    }
  }
  conn.query(statement,[eid,ids.toString()],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    cb(undefined,{rowCount: result.rowCount});
  });
}
