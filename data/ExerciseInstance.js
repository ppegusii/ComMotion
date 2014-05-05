var async = require('async');

var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);
var exercise = require(process.env.DATA_EXERCISE);

exports.getById = getById;
exports.getByWorkoutId = getByWorkoutId;

function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    return cb(Error.create('query.id invalid'),undefined);
  }
  conn.query('SELECT wc.id,wc.workout_id,wc.seq_order AS order,ei.exercise_id,ei.measurement_id,ei.measurement_value,ei.weight,m.name AS m_name FROM workout_components AS wc, exercise_instances AS ei,measurements AS m WHERE wc.id=$1 AND wc.id=ei.id AND ei.measurement_id = m.id',[id],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToExerciseInstances(result,cb);
  });
}
function getByWorkoutId(query,cb){
  var wid = parseInt(query.workoutId,10);
  if(wid<=0){
    return cb(Error.create('query.workoutId invalid'),undefined);
  }
  conn.query('SELECT wc.id,wc.workout_id,wc.seq_order AS order,ei.exercise_id,ei.measurement_id,ei.measurement_value,ei.weight,m.name AS m_name FROM workout_components AS wc, exercise_instances AS ei,measurements AS m WHERE wc.workout_id=$1 AND wc.id=ei.id AND ei.measurement_id = m.id',[wid],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToExerciseInstances(result,cb);
  });
}
function resultToExerciseInstances(result,cb){
  async.map(result.rows,rowToExerciseInstance,cb);
}
function rowToExerciseInstance(row,cb){
  exercise.getById({id: row.exercise_id},function afterGetExercise(err,exercises){
    if(err){
      return cb(err,undefined);
    }
    var ei = new model.ExerciseInstance(
      row.id.toString(),
      row.workout_id.toString(),
      parseInt(row.order,10),
      exercises[0],
      new model.Measurement(
        row.measurement_id.toString(),
        row.m_name
      ),
      row.measurement_value,
      row.weight
    );
    cb(undefined,ei);
  });
}
