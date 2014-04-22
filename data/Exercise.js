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
exports.getById = getById;
exports.init = init;
exports.getByUserFav = getByUserFav;
exports.searchByNameDescriptionMusclegroup = searchByNameDescriptionMusclegroup;

function getLimitN(query,cb){
  var n = parseInt(query.n,10);
  if(n<=0){
    cb(Error.create('query.n invalid'),undefined);
    return;
  }
  conn.query('SELECT e.id,e.description,e.difficulty_id,e.musclegroup_id,e.created,d.name AS d_name,m.name AS m_name FROM exercises AS e,difficulties AS d,musclegroups AS m WHERE e.difficulty_id=d.id AND e.musclegroup_id=m.id LIMIT $1',[n],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToExercises(result,cb);
  });
}
function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    cb(Error.create('query.id invalid'),undefined);
    return;
  }
  conn.query('SELECT e.id,e.description,e.difficulty_id,e.musclegroup_id,e.created,d.name AS d_name,m.name AS m_name FROM exercises AS e,difficulties AS d,musclegroups AS m WHERE e.difficulty_id=d.id AND e.musclegroup_id=m.id AND e.id=$1',[id],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    return resultToExercises(result,cb);
  });
}
function searchByNameDescriptionMusclegroup(query,cb){
  if(!query.search){
    cb(Error.create('query.search undefined'),undefined);
    return;
  }
  query.search = '%'+query.search+'%';
  //TODO update with regex
  //http://www.postgresql.org/docs/9.1/static/functions-matching.html#FUNCTIONS-POSIX-REGEXP
  conn.query('SELECT DISTINCT e.id,e.description,e.difficulty_id,e.musclegroup_id,e.created,d.name AS d_name,m.name AS m_name FROM exercises AS e,difficulties AS d,musclegroups AS m,names AS n WHERE e.difficulty_id=d.id AND e.musclegroup_id=m.id AND (e.description LIKE $1 OR (n.name LIKE $1 AND n.exercise_id=e.id) OR m.name LIKE $1)',[query.search],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToExercises(result,cb);
  });
}
function getByUserFav(query,cb){
  var uid = parseInt(query.userId,10);
  if(uid<=0){
    cb(Error.create('query.userId invalid'),undefined);
    return;
  }
  conn.query('SELECT e.id,e.description,e.difficulty_id,e.musclegroup_id,e.created,d.name AS d_name,m.name AS m_name FROM exercises AS e,difficulties AS d,musclegroups AS m, fav_exercises AS f WHERE e.difficulty_id=d.id AND e.musclegroup_id=m.id AND f.exercise_id=e.id AND f.user_id=$1',[uid],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToExercises(result,cb);
  });
}
function resultToExercises(result,cb){
  async.map(result.rows,rowToExercise,cb);
}
function rowToExercise(row,cb){
  var eid = row.id.toString();
  async.parallel({
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
      return cb(err,undefined);
    }
    var exercise = new model.Exercise(
      row.id.toString(),
      row.description,
      new model.Difficulty(row.difficulty_id,row.d_name),
      new model.Musclegroup(row.musclegroup_id,row.m_name),
      row.created,
      results.names,
      results.videos,
      results.photos
    );
    cb(undefined,exercise);
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
      async.parallel({
        names: function(callback){
          var names = exercise.names.map(function(name,index,names){
            name.exerciseId = exercise.id;
            return name;
          });
         async.map(names,name.initNoValidate,callback);
        },
        videos: function(callback){
          var videos = exercise.videos.map(function(video,index,videos){
            video.exerciseId = exercise.id;
            return video;
          });
         async.map(videos,video.initNoValidate,callback);
        },
        photos: function(callback){
          var photos = exercise.photos.map(function(photo,index,photos){
            photo.exerciseId = exercise.id;
            return photo;
          });
         async.map(photos,photo.initNoValidate,callback);
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
