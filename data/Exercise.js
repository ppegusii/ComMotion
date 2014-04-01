var pg = require('pg');
var async = require('async');

var exerciseModel = require(process.env.MODELS_EXERCISE);

var conString = process.env.DB_CON_PG;

/*
var query = 'SELECT e.id,e.description,e.modified,n.name,v.url,p.filename,d.name,m.name '+
  'FROM exercises as e,names as n, videos as v, photos as p, difficulties as d, musclegroups as m '+
  'WHERE e.id = n.exercise_id AND e.id = v.exercise_id AND e.id = p.exercise_id AND e.difficulty_id = d.id AND e.musclegroup_id = m.id '+
  'ORDER BY e.id, n.votes LIMIT $1';
*/

exports.getExercises = function(n,cb){
  select('SELECT * FROM exercises LIMIT $1',[n],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      resultToExercises(result,cb);
    }
  });
};


exports.getDifficulty = getDifficulty;
function getDifficulty(id,cb){
  select('SELECT * FROM difficulties WHERE id=$1',[id],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      var row = result.rows[0];
      rowToDifficulty(row,cb)
    }
  });
}

function select(query,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(err,undefined);
    }
    else{
      client.query(query,params,function(err,result){
        done();
        cb(err,result);
      });
    }
  });
}

function resultToExercises(result,cb){
  async.map(result.rows,rowToExercise,cb);
}

function rowToExercise(row,cb){
  exercise = new exerciseModel.Exercise(row.id.toString(),row.description);
  async.parallel({
    difficulty: function(callback){
      getDifficulty(exercise.id,callback);
    }
  },
  function(err,results){
    exercise.difficulty = results.difficulty;
    cb(err,exercise);
  });
}

function rowToDifficulty(row,cb){
  cb(undefined,new exerciseModel.Difficulty(row.id.toString(),row.name));
}
