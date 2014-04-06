var async = require('async');

var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);
var difficulty = require(process.env.DATA_DIFFICULTY);
var musclegroup = require(process.env.DATA_MUSCLEGROUP);
var name = require(process.env.DATA_NAME);
var video = require(process.env.DATA_VIDEO);
var photo = require(process.env.DATA_PHOTO);

exports.getLimitN = getLimitN;
exports.init = init;

function getLimitN(query,cb){
  var n = parseInt(query.n,10);
  if(n<=0){
    cb('invalid n',undefined);
    return;
  }
  conn.query('SELECT * FROM exercises LIMIT $1',[n],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      resultToExercises(result,cb);
    }
  });
}
function resultToExercises(result,cb){
  async.map(result.rows,rowToExercise,cb);
}
function rowToExercise(row,cb){
  var eid = row.id.toString();
  var did = row.difficulty_id;
  var mid = row.musclegroup_id;
  async.parallel({
    difficulty: function(callback){
      difficulty.getById({id:did},callback);
    },
    musclegroup: function(callback){
      musclegroup.getById({id:mid},callback);
    },
    names: function(callback){
      name.getByEidWid({eid:eid,wid:undefined},callback);
    },
    videos: function(callback){
      video.getByEidWid({eid:eid,wid:undefined},callback);
    },
    photos: function(callback){
      photo.getByEidWid({eid:eid,wid:undefined},callback);
    }
  },
  function(err,results){
    var exercise = new model.Exercise(
      row.id.toString(),
      row.description,
      results.difficulty,
      results.musclegroup,
      row.modified,
      results.names,
      results.videos,
      results.photos
    );
//console.log(JSON.stringify(exercise));
    cb(err,exercise);
  });
}
function init(query,cb){
  if(!query.exercise){
    cb('exercise undefined',undefined);
    return;
  }
  validate(query.exercise,function afterValidation(err,exercise){
    if(err){
      cb('invalid exercise',undefined);
      return;
    }
    if(exercise.id){
      var statement = 'UPDATE exercises SET description=$1,difficulty_id=$2,musclegroup_id=$3,modified=now WHERE id=$4 RETURNING id,modified';
      var params = [
        exercise.description,
        exercise.difficulty.id,
        exercise.musclegroup.id,
        exercise.id
      ];
    }else{
      var statement = 'INSERT INTO exercises (description,difficulty_id,musclegroup_id) VALUES($1,$2,$3) RETURNING id,modified';
      var params = [
        exercise.description,
        exercise.difficulty.id,
        exercise.musclegroup.id
      ];
    }
    conn.query(statement,params,function afterUpdateOrInsert(err,result){
      if(err){
        cb(err,undefined);
        return;
      }
      resultToExercises(result,cb);
      exercise.id = result.rows[0].id.toString();
      exercise.modified = result.rows[0].modified;
      //TODO init child objects
      cb(undefined,exercise);
    });
  });
}
function validate(exercise,cb){
  if(exercise.id){
    var eid = parseInt(exercise.id,10);
    if(eid<=0){
      cb('invalid exercise id',undefined);
      return;
    }
    exercise.id = eid;
  }
  if(!exercise.description || exercise.description===''){
    cb('undefined or blank description',undefined);
    return;
  }
  if(!exercise.difficulty.id){
    cb('undefined difficulty id',undefined);
    return;
  }
  var did = parseInt(exercise.difficulty.id,10);
  if(did<=0){
    cb('invalid difficulty id',undefined);
    return;
  }
  exercise.difficulty.id = did;
  if(!exercise.musclegroup.id){
    cb('undefined musclegroup id',undefined);
    return;
  }
  var mid = parseInt(exercise.musclegroup.id,10);
  if(mid<=0){
    cb('invalid musclegroup id',undefined);
    return;
  }
  exercise.musclegroup.id = mid;
  //TODO validate child objects
  cb(undefined,exercise);
}
