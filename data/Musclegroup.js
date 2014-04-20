var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getById = getById;

function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    cb(Error.create('query.id invalid'),undefined);
    return;
  }
  conn.query('SELECT * FROM musclegroups WHERE id=$1',[id],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToMusclegroups(result,cb);
  });
}
function resultToMusclegroups(result,cb){
  cb(undefined,result.rows.map(function(musclegroup,index,musclegroups){
    return new model.Musclegroup(row.id.toString(),row.name);
  }));
}
