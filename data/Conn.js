var pg = require('pg');

var conString = process.env.DB_CON_PG;

exports.query = query;

function query(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(Error.create('pg conn error',undefined,err),undefined);
      return;
    }
    client.query(statement,params,function(err,result){
      done();
      if(err){
        cb(Error.create('pg query error',{statement: statement,params: params},err),undefined);
        return;
      }
      cb(undefined,result);
    });
  });
}
function queryTransaction(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(Error.create('pg conn error',undefined,err),undefined);
      return;
    }
    client.query('BEGIN', function(err){
      if(err){
        rollback(client,done,cb);
        return;
      }
      process.nextTick(function(){
        client.query(statement,params,function(err,result){
          if(err){
            rollback(client,done,cb);
            return;
          }
          client.query('COMMIT',done);
          cb(undefined,result);
        });
      });
    });
  });
}
function rollback(client,done,cb){
  client.query('ROLLBACK',function(err){
    done(err);
    cb(Error.create('pg rollback',undefined,err),undefined);
  });
}
