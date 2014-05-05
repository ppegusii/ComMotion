var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getAll = getAll;
exports.getById = getById;

function getAll(query,cb){
  conn.query('SELECT * FROM measurements',[],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToMeasurements(result,cb);
  });
}
function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    return cb(Error.create('query.id invalid'),undefined);
  }
  conn.query('SELECT * FROM measurements WHERE id=$1',[id],function(err,result){
    if(err){
      return cb(err,undefined);
    }
    resultToMeasurements(result,cb);
  });
}
function resultToMeasurements(result,cb){
  cb(undefined,result.rows.map(function(row,index,rows){
    return new model.Measurement(row.id.toString(),row.name);
  }));
}
