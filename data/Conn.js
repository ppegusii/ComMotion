var pg = require('pg');

var conString = process.env.DB_CON_PG;

exports.query = query;

function query(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(err,undefined);
      return;
    }
    client.query(statement,params,function(err,result){
      done();
      if(err){
        console.log('statment = '+statement);
        console.log('params = '+JSON.stringify(params));
        console.log('pg error = '+JSON.stringify(err));
        cb(err,undefined);
        return;
      }
      cb(err,result);
    });
  });
}
function queryTransaction(statement,params,cb){
  pg.connect(conString,function(err,client,done){
    if(err){
      cb(err,undefined);
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
            console.log('statment = '+statement);
            console.log('params = '+JSON.stringify(params));
            console.log('pg error = '+JSON.stringify(err));
            rollback(client,done,cb);
            return;
          }
          client.query('COMMIT',done);
          cb(err,result);
        });
      });
    });
  });
}
function rollback(client,done,cb){
  client.query('ROLLBACK',function(err){
    done(err);
    cb(err,undefined);
  });
}
