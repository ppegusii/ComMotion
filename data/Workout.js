var async = require('async');

var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);
var exerciseInstance = require(process.env.DATA_EXERCISEINSTANCE);
var timer = require(process.env.DATA_TIMER);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);

exports.getById = getById;

function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    return cb(Error.create('query.id invalid'),undefined);
  }
  conn.query('SELECT w.id,w.name,w.description,w.difficulty_id,w.creator_id,w.created,d.name AS d_name FROM workouts AS w,difficulties AS d WHERE w.difficulty_id=d.id AND w.id=$1',[id],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToWorkouts(result,cb);
  });
}
function resultToWorkouts(result,cb){
  async.map(result.rows,rowToWorkout,cb);
}
function rowToWorkout(row,cb){
  var wid = row.id.toString();
  async.parallel({
    videos: function(callback){
      video.getByEidWid({eid: undefined,wid: wid},callback);
    },
    photos: function(callback){
      photo.getByEidWid({eid: undefined,wid: wid},callback);
    },
    exerciseInstances: function(callback){
      exerciseInstance.getByWorkoutId({workoutId: wid},callback);
    },
    timers: function(callback){
      timer.getByWorkoutId({workoutId: wid},callback);
    }
  },
  function(err,results){
    if(err){
      return cb(err,undefined);
    }
    var sequence = results.exerciseInstances.concat(results.timers);
    sequence.sort(function(wc1,wc2){
      if(wc1.order < wc2.order){
        return -1;
      }else if(wc1.order > wc2.order){
        return 1;
      }
      return 0;
    });
    var workout = new model.Workout(
      wid,
      row.name,
      new model.Difficulty(row.difficulty_id,row.d_name),
      row.creator_id.toString(),
      row.created,
      row.description,
      results.photos,
      results.videos,
      sequence
    );
    cb(undefined,workout);
  });
}
