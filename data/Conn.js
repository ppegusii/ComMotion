var pg = require('pg');

var conString = process.env.DB_CON_PG;

exports.query = query;

function query(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(err,undefined);
    }
    else{
      client.query(statement,params,function(err,result){
        done();
        if(err){
          console.log('pg error = '+JSON.stringify(err));
        }
        cb(err,result);
      });
    }
  });
}
