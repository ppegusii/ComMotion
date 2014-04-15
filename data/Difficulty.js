var conn = require(process.env.DATA_CONN);
var model = require(process.env.MODELS);

exports.getById = getById;
function getById(query,cb){
  var id = parseInt(query.id,10);
  if(id<=0){
    cb('query.id invalid\n'+__stack,undefined);
    return;
  }
  conn.query('SELECT * FROM difficulties WHERE id=$1',[id],function(err,result){
    if(err){
      cb(err,undefined);
    }
    else{
      var row = result.rows[0];
      rowToDifficulty(row,cb)
    }
  });
}
function rowToDifficulty(row,cb){
  cb(undefined,new model.Difficulty(row.id.toString(),row.name));
}
