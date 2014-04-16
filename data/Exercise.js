var async = require('async');

var validate = require(process.env.VALIDATE);
var model = require(process.env.MODELS);

var conn = require(process.env.DATA_CONN);
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
    cb(Error.create('query.n invalid'),undefined);
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
    if(err){
      cb(err,undefined);
      return;
    }
    var exercise = new model.Exercise(
      row.id.toString(),
      row.description,
      results.difficulty,
      results.musclegroup,
      row.created,
      results.names,
      results.videos,
      results.photos
    );
    cb(err,exercise);
  });
}
function init(query,cb){
  if(!query.exercise){
    cb(Error.create('query.exercise undefined'),undefined);
    return;
  }
  validate.exercise(query.exercise,function afterValidation(err,exercise){
    if(err){
      cb(err,undefined);
      return;
    }
    if(exercise.id){
      var statement = 'UPDATE exercises SET description=$1,difficulty_id=$2,musclegroup_id=$3 WHERE id=$4 RETURNING id,created';
      var params = [
        exercise.description,
        exercise.difficulty.id,
        exercise.musclegroup.id,
        exercise.id
      ];
    }else{
      var statement = 'INSERT INTO exercises (description,difficulty_id,musclegroup_id) VALUES($1,$2,$3) RETURNING id,created';
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
      exercise.id = result.rows[0].id.toString();
      exercise.created = result.rows[0].created;
      //TODO init child objects
      async.parallel({
        names: function(callback){
          var names = exercise.names.map(function(name,index,names){
            name.exerciseId = exercise.id;
            return {name: name};
          });
         async.map(names,name.init,callback);
        },
        videos: function(callback){
          var videos = exercise.videos.map(function(video,index,videos){
            video.exerciseId = exercise.id;
            return {video: video};
          });
         async.map(videos,video.init,callback);
        },
        photos: function(callback){
          var photos = exercise.photos.map(function(photo,index,photos){
            photo.exerciseId = exercise.id;
            return {photo: photo};
          });
         async.map(photos,photo.init,callback);
        }
      },
      function afterChildObjectInit(err,results){
        if(err){
          cb(err,undefined);
          return;
        }
        exercise.names = results.names;
        exercise.videos = results.videos;
        exercise.photos = results.photos;
        cb(undefined,exercise);
      });
    });
  });
}
